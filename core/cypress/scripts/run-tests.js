#!/usr/bin/env node
/*
 Run Cypress tests for a specific spec and write JSON results to [test-name]_results.json
 Usage:
   npm run test:run -- cypress/e2e/path/to/spec.cy.js
*/

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const [, , specArg] = process.argv;

if (!specArg) {
  console.error('Usage: npm run test:run -- <spec-path>');
  process.exit(1);
}

// Script lives in core/cypress/scripts; core dir is two levels up
const coreDir = path.join(__dirname, '..', '..');
const resultsDir = path.join(coreDir, 'cypress', 'results');
if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir, { recursive: true });

const base = path.basename(specArg).replace(/\.[^/.]+$/, '');
const outFile = path.join(resultsDir, `${base}_results.json`);

const args = [
  'run',
  '--browser', 'chrome',
  '--e2e',
  '--spec', specArg,
  '--reporter', 'json',
];

console.log(`[test:run] Running Cypress with spec: ${specArg}`);
console.log(`[test:run] Writing results to: ${outFile}`);

const cypressBin = path.join(coreDir, 'node_modules', '.bin', process.platform === 'win32' ? 'cypress.cmd' : 'cypress');
const env = { ...process.env, CYPRESS_CACHE_FOLDER: path.join(coreDir, 'cypress', '.cache') };
const cp = spawn(cypressBin, args, {
  cwd: coreDir,
  stdio: ['ignore', 'pipe', 'inherit'],
  env,
});

let stdout = '';
cp.stdout.on('data', (chunk) => {
  const str = chunk.toString();
  process.stdout.write(str);
  stdout += str;
});

cp.on('close', (code) => {
  try {
    // Try to parse JSON; if it fails, write raw output
    let data = stdout.trim();
    // Cypress json reporter outputs a single JSON object
    // Find the last occurrence of '{' to avoid any leading logs
    const firstBrace = data.indexOf('{');
    if (firstBrace > 0) data = data.slice(firstBrace);
    fs.writeFileSync(outFile, data, 'utf8');
    console.log(`[test:run] Wrote results to ${outFile}`);
  } catch (e) {
    console.error('[test:run] Failed writing JSON results:', e.message);
  }
  console.log(`[test:run] Cypress exited with code ${code}`);
  process.exit(code);
});
