// Capture browser console.log and write to a file via cy.task('writeLog')

// Also capture test-runner (spec) console.log lines so logs from the spec's before/beforeEach appear.
const __RUNNER_LOG_QUEUE__ = [];
const __RUNNER_ORIGINAL_CONSOLE_LOG__ = console.log.bind(console);
const RUNNER_MAX_ARRAY_ITEMS = 50;
const RUNNER_MAX_STRING_LEN = 500;
const runnerTruncate = (s) => (s.length > RUNNER_MAX_STRING_LEN ? s.slice(0, RUNNER_MAX_STRING_LEN) + '…' : s);
const runnerSeenAll = new WeakSet();
function runnerToSafeString(v, depth = 0) {
  const t = typeof v;
  if (v && t === 'object') {
    try { if (runnerSeenAll.has(v)) return '[Circular]'; runnerSeenAll.add(v); } catch(_) {}
  }
  if (t === 'string') return runnerTruncate(v);
  if (t === 'number' || t === 'boolean' || v == null) return String(v);
  if (t === 'bigint') return v.toString() + 'n';
  if (t === 'symbol') return v.toString();
  if (t === 'function') return `[Function ${v.name || 'anonymous'}]`;
  if (typeof Element !== 'undefined' && v instanceof Element) {
    const id = v.id ? `#${v.id}` : ''; return `<${v.tagName?.toLowerCase?.() || 'element'}${id}>`;
  }
  if (typeof NodeList !== 'undefined' && v instanceof NodeList) return `[NodeList(${v.length})]`;
  if (typeof HTMLCollection !== 'undefined' && v instanceof HTMLCollection) return `[HTMLCollection(${v.length})]`;
  if (typeof Event !== 'undefined' && v instanceof Event) return `[Event ${v.type}]`;
  if (v && v.window === v) return '[Window]';
  if (v instanceof Map) return `[Map(${v.size})]`;
  if (v instanceof Set) return `[Set(${v.size})]`;
  if (v instanceof Error) return `[${v.name}] ${v.message}`;
  if (Array.isArray(v)) {
    const shown = Math.min(v.length, RUNNER_MAX_ARRAY_ITEMS);
    const parts = [];
    for (let i = 0; i < shown; i++) { try { parts.push(runnerToSafeString(v[i], depth+1)); } catch(_) { parts.push('[Unserializable]'); } }
    const suffix = v.length > shown ? ', …' : '';
    return `[${parts.join(', ')}${suffix}]`;
  }
  try {
    const seen = new WeakSet();
    const json = JSON.stringify(v, (key, val) => {
      if (typeof val === 'object' && val !== null) { if (seen.has(val)) return '[Circular]'; seen.add(val); }
      return val;
    });
    return runnerTruncate(json);
  } catch(_) {
    try { return String(v); } catch(_) { return '[Unserializable]'; }
  }
}

console.log = (...args) => {
  try {
    const parts = [];
    for (const arg of args) { try { parts.push(runnerToSafeString(arg)); } catch(_) { parts.push('[Unserializable]'); } }
    __RUNNER_LOG_QUEUE__.push(parts.join(' '));
  } catch(_) {
    __RUNNER_LOG_QUEUE__.push('[Runner log capture error]');
  }
  __RUNNER_ORIGINAL_CONSOLE_LOG__(...args);
}

// Buffer logs per test to avoid spamming tasks mid-test
Cypress.on('window:before:load', (win) => {
  const original = win.console && win.console.log ? win.console.log.bind(win.console) : () => {};
  const queue = [];
  const MAX_ARRAY_ITEMS = 50;
  const MAX_STRING_LEN = 500;
  const truncate = (s) => (s.length > MAX_STRING_LEN ? s.slice(0, MAX_STRING_LEN) + '…' : s);
  const seenAll = new WeakSet();
  const toSafeString = (v, depth = 0) => {
    const t = typeof v;
    if (v && t === 'object') {
      try {
        if (seenAll.has(v)) return '[Circular]';
        seenAll.add(v);
      } catch (_) {}
    }
    if (t === 'string') return truncate(v);
    if (t === 'number' || t === 'boolean' || v == null) return String(v);
    if (t === 'bigint') return v.toString() + 'n';
    if (t === 'symbol') return v.toString();
    if (t === 'function') return `[Function ${v.name || 'anonymous'}]`;
    // DOM elements
    if (typeof Element !== 'undefined' && v instanceof Element) {
      const id = v.id ? `#${v.id}` : '';
      return `<${v.tagName.toLowerCase()}${id}>`;
    }
    if (typeof NodeList !== 'undefined' && v instanceof NodeList) return `[NodeList(${v.length})]`;
    if (typeof HTMLCollection !== 'undefined' && v instanceof HTMLCollection) return `[HTMLCollection(${v.length})]`;
    if (typeof Event !== 'undefined' && v instanceof Event) return `[Event ${v.type}]`;
    if (v && v.window === v) return '[Window]';
    if (v instanceof Map) return `[Map(${v.size})]`;
    if (v instanceof Set) return `[Set(${v.size})]`;
    if (v instanceof Error) return `[${v.name}] ${v.message}`;
    if (Array.isArray(v)) {
      const shown = Math.min(v.length, MAX_ARRAY_ITEMS);
      const parts = [];
      for (let i = 0; i < shown; i++) {
        try { parts.push(toSafeString(v[i], depth + 1)); } catch (_) { parts.push('[Unserializable]'); }
      }
      const suffix = v.length > shown ? ', …' : '';
      return `[${parts.join(', ')}${suffix}]`;
    }
    try {
      const seen = new WeakSet();
      const json = JSON.stringify(v, (key, val) => {
        if (typeof val === 'object' && val !== null) {
          if (seen.has(val)) return '[Circular]';
          seen.add(val);
        }
        return val;
      });
      return truncate(json);
    } catch (_) {
      try { return String(v); } catch (_) { return '[Unserializable]'; }
    }
  };

  win.console.log = (...args) => {
    try {
      const parts = [];
      for (const arg of args) {
        try {
          parts.push(toSafeString(arg, 0));
        } catch (_) {
          parts.push('[Unserializable]');
        }
      }
      const line = parts.join(' ');
      queue.push(line);
    } catch (_) {
      // As a last resort, don't drop the entry
      queue.push('[Log capture error]');
    }
    original(...args);
  };
  // expose the queue so tests/support can flush after each test
  win.__sprout_log_queue__ = queue;
});

// Global uncaught exception capture (runner side) so early errors are suppressed and inspectable
const __SPROUT_UNCAUGHT_ERRORS__ = [];
Cypress.on('uncaught:exception', (err) => {
  try { __SPROUT_UNCAUGHT_ERRORS__.push(err); } catch(_) {}
  // prevent Cypress from failing the test due to app-thrown errors we expect
  return false;
});

// Helper commands to inspect and reset captured uncaught exceptions
Cypress.Commands.add('getUncaughtErrors', () => {
  return cy.wrap(__SPROUT_UNCAUGHT_ERRORS__.slice());
});
Cypress.Commands.add('clearUncaughtErrors', () => {
  __SPROUT_UNCAUGHT_ERRORS__.length = 0;
  return null;
});

afterEach(() => {
  // Flush any collected console lines to file
  cy.window({ log: false }).then((w) => {
    const q = w.__sprout_log_queue__ || [];
    // Write each AUT line; suppress Cypress command log noise
    if (q.length) {
      q.forEach((line) => cy.task('writeLog', { file: 'command_map.console.log', message: line }, { log: false }));
      w.__sprout_log_queue__ = [];
    }
  });
  // Flush runner lines
  if (__RUNNER_LOG_QUEUE__.length) {
    const copy = __RUNNER_LOG_QUEUE__.splice(0, __RUNNER_LOG_QUEUE__.length);
    copy.forEach((line) => cy.task('writeLog', { file: 'command_map.console.log', message: line }, { log: false }));
  }
});

// Also mark test boundaries in the captured log for readability
beforeEach(function () {
  const title = this.currentTest && this.currentTest.fullTitle ? this.currentTest.fullTitle() : '';
  if (!title) return;
  // Write explicit marker to file regardless of AUT capture
  cy.task('writeLog', { file: 'command_map.console.log', message: `BEGIN TEST: ${title}` }, { log: false });
  // Also put marker in AUT console (captured by our hook)
  cy.window({ log: false }).then((w) => {
    if (w && w.console && typeof w.console.log === 'function') {
      w.console.log(`BEGIN TEST: ${title}`);
    }
  });
});

afterEach(function () {
  const title = this.currentTest && this.currentTest.fullTitle ? this.currentTest.fullTitle() : '';
  if (!title) return;
  // If the test failed, write a clear failure line with the first error line
  const state = this.currentTest && this.currentTest.state;
  if (state === 'failed') {
    const err = (this.currentTest.err && (this.currentTest.err.message || this.currentTest.err.stack)) || 'Unknown error';
    const firstLine = String(err).split('\n')[0];
    cy.task('writeLog', { file: 'command_map.console.log', message: `FAILED TEST: ${title} :: ${firstLine}` }, { log: false });
  }
  // Write explicit marker to file regardless of AUT capture
  cy.task('writeLog', { file: 'command_map.console.log', message: `END TEST: ${title}` }, { log: false });
  // Also put marker in AUT console (captured by our hook)
  cy.window({ log: false }).then((w) => {
    if (w && w.console && typeof w.console.log === 'function') {
      w.console.log(`END TEST: ${title}`);
    }
  });
});
