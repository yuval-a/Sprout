#!/usr/bin/env node
/*
 Summarize the last command_map console log to a readable FAILED-tests-only report.

 Usage:
   node cypress/scripts/summarize-command-map-log.mjs [inputLog] [outputFile]

 Defaults:
   inputLog   = core/cypress/logs/command_map.console.log
   outputFile = core/cypress/logs/command_map.failed.summary.log
*/

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Script lives in core/cypress/scripts; core dir is two levels up
const coreDir = path.join(__dirname, '..', '..');
const defaultIn = path.join(coreDir, 'cypress', 'logs', 'command_map.console.log');
const defaultOut = path.join(coreDir, 'cypress', 'logs', 'command_map.failed.summary.log');

const inFile = process.argv[2] ? path.resolve(process.argv[2]) : defaultIn;
const outFile = process.argv[3] ? path.resolve(process.argv[3]) : defaultOut;

function readLines(file) {
  try {
    const data = fs.readFileSync(file, 'utf8');
    return data.split(/\r?\n/);
  } catch (e) {
    console.error(`[summarize] Could not read ${file}: ${e.message}`);
    process.exit(1);
  }
}

function parseLog(lines) {
  const results = [];
  let current = null;

  const beginRe = /BEGIN TEST: (.+)$/;
  const endRe = /END TEST: (.+)$/;
  const failedRe = /FAILED TEST: (.+?) :: (.+)$/;
  const lastOpRe = /\[RECONCILE\] LAST OPERATION:\s*(.+)$/;
  // New detailed after line with ref, keys and labels
  const afterNewRe = /\[RECONCILE\]\s+after\s*\(ref=([^\)]+)\),\s*EXPECTED KEYS:\s*(\[[^\]]*\])\s+EXISTING KEYS\s+(\[[^\]]*\])\s+EXPECTED LABELS\s+(\[[^\]]*\])\s+EXISTING LABELS\s+(\[[^\]]*\])/;
  // Legacy after line with only keys
  const afterOldRe = /\[RECONCILE\]\s+after,\s*EXPECTED:\s*(\[[^\]]*\])\s+EXISTING\s+(\[[^\]]*\])/;

  for (const line of lines) {
    if (!line) continue;
    const beginM = line.match(beginRe);
    if (beginM) {
      // close previous
      if (current) results.push(current);
      current = { title: beginM[1], failed: false, failMsg: '', lastOp: '', afterExpected: '', afterExisting: '' };
      continue;
    }
    const endM = line.match(endRe);
    if (endM) {
      if (current) {
        // Only keep failed; we'll filter later too
        results.push(current);
        current = null;
      }
      continue;
    }
    const failM = line.match(failedRe);
    if (failM && current) {
      current.failed = true;
      current.failMsg = failM[2];
      continue;
    }
    const opM = line.match(lastOpRe);
    if (opM && current) {
      current.lastOp = opM[1].trim();
      continue;
    }
    const aftNew = line.match(afterNewRe);
    if (aftNew && current) {
      const [, ref, expK, exK, expL, exL] = aftNew;
      if (!current.byRef) current.byRef = {};
      current.byRef[ref] = { expKeys: expK.trim(), exKeys: exK.trim(), expLabels: expL.trim(), exLabels: exL.trim() };
      continue;
    }
    const aftOld = line.match(afterOldRe);
    if (aftOld && current) {
      if (!current.byRef) current.byRef = {};
      // Unknown ref; group under 'unknown'
      current.byRef.unknown = { expKeys: aftOld[1].trim(), exKeys: aftOld[2].trim(), expLabels: '', exLabels: '' };
      continue;
    }
  }
  // push dangling
  if (current) results.push(current);
  // filter only failed tests
  return results.filter(r => r.failed);
}

function formatSummary(failed) {
  if (!failed.length) return 'No failed tests found.\n';
  const parts = [];
  parts.push('FAILED TESTS SUMMARY');
  parts.push('=====================');
  for (const r of failed) {
    parts.push('');
    parts.push(`TEST: ${r.title}`);
    parts.push(`ERROR: ${r.failMsg}`);
    if (r.lastOp) parts.push(`LAST OP: ${r.lastOp}`);
    const groups = r.byRef ? Object.entries(r.byRef) : [];
    const showGroup = (g) => {
      const { expKeys, exKeys, expLabels, exLabels } = g;
      const keysMismatch = expKeys && exKeys && expKeys !== exKeys;
      const labelsMismatch = expLabels && exLabels && expLabels !== exLabels;
      return keysMismatch || labelsMismatch;
    }
    if (groups.length) {
      for (const [ref, g] of groups) {
        if (!showGroup(g)) continue;
        parts.push(`RECONCILE (after) ref=${ref}:`);
        if (g.expKeys || g.exKeys) {
          parts.push(`  KEYS   EXPECTED: ${g.expKeys || ''}`);
          parts.push(`  KEYS   EXISTING: ${g.exKeys || ''}`);
        }
        if (g.expLabels || g.exLabels) {
          parts.push(`  LABELS EXPECTED: ${g.expLabels || ''}`);
          parts.push(`  LABELS EXISTING: ${g.exLabels || ''}`);
        }
      }
    }
  }
  parts.push('');
  return parts.join('\n');
}

function ensureDir(p) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const lines = readLines(inFile);
const failed = parseLog(lines);
const out = formatSummary(failed);
ensureDir(outFile);
fs.writeFileSync(outFile, out, 'utf8');
console.log(`[summarize] Wrote ${failed.length} failed test(s) to ${outFile}`);

