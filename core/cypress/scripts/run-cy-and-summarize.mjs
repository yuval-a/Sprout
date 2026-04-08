#!/usr/bin/env node
/*
 Run a Cypress spec and emit a concise failed-tests summary.

 Usage:
   node cypress/scripts/run-cy-and-summarize.mjs <spec-path>

 Behavior:
 - Starts the static test server on port 5177 (core/tests/server.mjs).
 - Runs Cypress for the given spec.
 - Writes captured browser/runner logs to core/cypress/logs/command_map.console.log
   (configured via core/cypress.config.js + support/e2e.js)
 - Summarizes only the failed tests into
   core/cypress/logs/command_map.failed.summary.log
 - Prints the summary path and exits with Cypress exit code.
*/

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:net';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Script lives in core/cypress/scripts; core dir is two levels up
const coreDir = path.join(__dirname, '..', '..');

const specArg = process.argv[2];
if (!specArg) {
  console.error('Usage: node cypress/scripts/run-cy-and-summarize.mjs <spec-path>');
  console.error('Example: node cypress/scripts/run-cy-and-summarize.mjs cypress/e2e/commands/command_map.cy.js');
  process.exit(1);
}

const logsDir = path.join(coreDir, 'cypress', 'logs');
const summaryFile = path.join(logsDir, 'command_map.failed.summary.log');

function exists(p) {
  try { fs.accessSync(p); return true; } catch { return false; }
}

function ensureDir(p) {
  const d = path.dirname(p);
  if (!exists(d)) fs.mkdirSync(d, { recursive: true });
}

function whichCypressBin() {
  const bin = path.join(coreDir, 'node_modules', '.bin', process.platform === 'win32' ? 'cypress.cmd' : 'cypress');
  return exists(bin) ? bin : null;
}

function getFreePort() {
  return new Promise((resolve) => {
    const s = createServer();
    s.listen(0, () => {
      const port = s.address().port;
      s.close(() => resolve(port));
    });
  });
}

async function startServer(port) {
  return new Promise((resolve) => {
    const server = spawn(process.execPath, [path.join(coreDir, 'tests', 'server.mjs')], {
      cwd: coreDir,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, PORT: String(port) },
    });
    let resolved = false;
    const onReady = () => { if (!resolved) { resolved = true; resolve(server); } };
    const readyRe = new RegExp(`Static server listening on http://localhost:${port}`);
    server.stdout.on('data', (d) => {
      const s = String(d);
      process.stdout.write(s);
      if (readyRe.test(s)) onReady();
    });
    server.stderr.on('data', (d) => process.stderr.write(String(d)));
    server.on('error', (err) => {
      if (err && (err.code === 'EADDRINUSE' || err.code === 'EACCES')) {
        console.warn(`[server] ${err.code} on :${port} — assuming another server is running.`);
        onReady();
      }
    });
    // Fallback: if not detected within 2s, continue anyway
    setTimeout(onReady, 2000);
  });
}

async function runCypress(spec, port) {
  return new Promise((resolve) => {
    const cypressBin = whichCypressBin();
    if (!cypressBin) {
      console.error('[run] Cypress binary not found in core/node_modules/.bin');
      console.error('      Run `npm install` inside `core/` and try again.');
      process.exit(1);
    }
    // Ensure logs dir exists and truncate the main log file pre-run
    ensureDir(summaryFile);
    try { fs.writeFileSync(path.join(logsDir, 'command_map.console.log'), '', 'utf8'); } catch {}

    const browser = process.env.CYPRESS_BROWSER || 'chrome';
    const args = ['run', '--browser', browser, '--e2e', '--spec', spec, '--config', `baseUrl=http://localhost:${port}`];
    console.log(`[run] Ensuring Cypress is installed (may download once)...`);
    const env = { ...process.env, CYPRESS_CACHE_FOLDER: path.join(coreDir, 'cypress', '.cache') };
    const install = spawn(cypressBin, ['install'], { cwd: coreDir, stdio: 'inherit', env });
    install.on('close', () => {
      console.log(`[run] Cypress ${args.join(' ')}\n`);
      const cp = spawn(cypressBin, args, { cwd: coreDir, stdio: 'inherit', env });
      cp.on('close', (code) => resolve(code || 0));
    });
  });
}

async function summarize() {
  return new Promise((resolve) => {
    const script = path.join(__dirname, 'summarize-command-map-log.mjs');
    const cp = spawn(process.execPath, [script], { cwd: coreDir, stdio: 'inherit' });
    cp.on('close', () => resolve());
  });
}

(async () => {
  const port = process.env.PORT ? Number(process.env.PORT) : await getFreePort();
  const server = await startServer(port);
  const code = await runCypress(specArg, port);
  await summarize();
  try { server.kill(); } catch {}
  console.log(`\n[done] Summary written to: ${summaryFile}`);
  process.exit(code);
})();
