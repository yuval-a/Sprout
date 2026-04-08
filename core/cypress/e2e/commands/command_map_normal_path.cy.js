/// <reference types="cypress" />

// Stress the reconcile "normal path" (no lastOperation) using only index assignments
// and nested field mutations. Verifies both identity (keys) and content (labels)
// across base and SSH-derived lists.

describe('reconcile normal path (no lastOperation)', () => {
  const page = '/tests/pages/commands_map_stable.html';

  const getHost = () => cy.get('map-host');
  const shadow = () => getHost().shadow();
  const byRef = (ref) => shadow().find(`[ref="${ref}"]`);
  const listItems = (ref) => byRef(ref).find('li > item-el');
  const labelAt = (ref, i) => listItems(ref).eq(i).shadow().find('[ref="label"]');

  // Wait for next paint cycle using the component's onAfterPaint hook
  const afterPaint = () => getHost().then(($host) => new Cypress.Promise((res) => $host[0].onAfterPaint(res)));
  const allowPaint = () => afterPaint();

  // DOM readers
  const readDomKeys = (ref) =>
    byRef(ref).find('> li').then(($lis) => [...$lis].map((li) => li.stateKey));

  const readDomLabels = (ref) =>
    listItems(ref).then(($els) =>
      Cypress._.map($els, (el) => el.shadowRoot.querySelector('[ref="label"]').textContent)
    );

  // Expected readers (from state arrays behind each ref)
  function expectedKeys($host, ref) {
    const st = $host[0].state;
    switch (ref) {
      case 'listNormal': return st.itemsNormal.map((it) => it.key);
      case 'listSshYes': return st.itemsSshStateMap.map((it) => it.key);
      case 'listSshMapYes': return st.itemsMapSshStateMap.map((it) => it.key);
      case 'listSshSliceYes': return st.itemsSliceSshStateMap.map((it) => it.key);
      case 'listSshFilterYes': return st.itemsFilterSshStateMap.map((it) => it.key);
      default: throw new Error(`Unhandled ref for expectedKeys: ${ref}`);
    }
  }

  function expectedLabels($host, ref) {
    const st = $host[0].state;
    const toS = (v) => String(v);
    switch (ref) {
      case 'listNormal': return st.itemsNormal.map((it) => toS(it.label));
      case 'listSshYes': return st.itemsSshStateMap.map((it) => toS(it.label));
      case 'listSshMapYes': return st.itemsMapSshStateMap.map((it) => toS(it.label));
      case 'listSshSliceYes': return st.itemsSliceSshStateMap.map((it) => toS(it.label));
      case 'listSshFilterYes': return st.itemsFilterSshStateMap.map((it) => toS(it.label));
      default: throw new Error(`Unhandled ref for expectedLabels: ${ref}`);
    }
  }

  function assertDomMatchesState($host, refs) {
    refs.forEach((ref) => {
      // Ensure reconciliation has flushed for each ref before asserting
      allowPaint().then(() => {
        const expKeys = expectedKeys($host, ref);
        const expLabels = expectedLabels($host, ref);
        // Assert on live subjects so Cypress retries until DOM matches
        byRef(ref).find('> li').should(($lis) => {
          const keys = [...$lis].map((li) => li.stateKey);
          expect(keys, `${ref} keys`).to.deep.equal(expKeys);
        });
        listItems(ref).should(($els) => {
          const labels = Cypress._.map($els, (el) => el.shadowRoot.querySelector('[ref="label"]').textContent);
          expect(labels, `${ref} labels`).to.deep.equal(expLabels);
        });
      });
    });
  }

  const baseRefs = ['listNormal', 'listSshYes', 'listSshMapYes'];

  // Suppress expected app-thrown errors from non-stateful SSH lists defined on the test page
  let uncaughtErrors = [];
  beforeEach(() => {
    uncaughtErrors = [];
    cy.on('uncaught:exception', (err) => { uncaughtErrors.push(err); return false; });
    cy.visit(page);
    allowPaint();
  });

  it('direct index replacement (same key) updates content and preserves order', () => {
    getHost().then(($host) => {
      const st = $host[0].state;
      const k = st.itemsNormal[0].key;
      st.itemsNormal[0] = { key: k, label: 'X' }; // same key, new object
    });
    allowPaint().then(() => getHost()).then(($host) => {
      assertDomMatchesState($host, baseRefs);
    });
  });

  it('nested field mutation updates derived content', () => {
    getHost().then(($host) => { $host[0].state.itemsNormal[0].label = 'XX'; });
    allowPaint().then(() => getHost()).then(($host) => {
      assertDomMatchesState($host, baseRefs);
    });
  });

  it('same-key replacement storm (many indices, one frame)', () => {
    getHost().then(($host) => {
      const arr = $host[0].state.itemsNormal;
      for (let i = 0; i < arr.length; i++) {
        const key = arr[i].key;
        arr[i] = { key, label: `S${i}` };
      }
    });
    allowPaint().then(() => getHost()).then(($host) => {
      assertDomMatchesState($host, baseRefs);
    });
  });

  it('nested-field storm (many label edits, one frame)', () => {
    getHost().then(($host) => {
      const arr = $host[0].state.itemsNormal;
      for (let i = 0; i < arr.length; i++) {
        arr[i].label = `N${i}`;
      }
    });
    allowPaint().then(() => getHost()).then(($host) => {
      assertDomMatchesState($host, baseRefs);
    });
  });

  it('manual swap via index assignment reorders correctly', () => {
    getHost().then(($host) => {
      const arr = $host[0].state.itemsNormal;
      const a = arr[1]; const b = arr[3];
      arr[1] = b; arr[3] = a; // two index sets => normal path
    });
    allowPaint().then(() => getHost()).then(($host) => {
      assertDomMatchesState($host, baseRefs);
    });
  });

  it('chain re-keys (3-cycle) in same frame', () => {
    getHost().then(($host) => {
      const arr = $host[0].state.itemsNormal;
      const i = 0, j = 1, k = 2;
      const ki = arr[i].key, kj = arr[j].key, kk = arr[k].key;
      const li = arr[i].label, lj = arr[j].label, lk = arr[k].label;
      arr[i] = { key: kj, label: li };
      arr[j] = { key: kk, label: lj };
      arr[k] = { key: ki, label: lk };
    });
    allowPaint().then(() => getHost()).then(($host) => {
      assertDomMatchesState($host, baseRefs);
    });
  });

  it('key plus label change on the same item', () => {
    getHost().then(($host) => {
      const arr = $host[0].state.itemsNormal;
      const i = 0;
      const newKey = `rk-${Date.now()}`;
      arr[i] = { key: newKey, label: 'KL' };
    });
    allowPaint().then(() => getHost()).then(($host) => {
      assertDomMatchesState($host, baseRefs);
    });
  });

  it('filter toggle via nested change (include, exclude) without length change', () => {
    // Flip first item from 'A' -> 'AA' -> 'A' to test filter derived list
    const filterRefs = ['listSshFilterYes'];
    getHost().then(($host) => { $host[0].state.itemsNormal[0].label = 'AA'; });
    allowPaint().then(() => getHost()).then(($host) => {
      assertDomMatchesState($host, filterRefs);
    });
    getHost().then(($host) => { $host[0].state.itemsNormal[0].label = 'A'; });
    allowPaint().then(() => getHost()).then(($host) => {
      assertDomMatchesState($host, filterRefs);
    });
  });

  it('slice sensitivity around window via index reassignments', () => {
    const sliceRefs = ['listSshSliceYes'];
    getHost().then(($host) => {
      const arr = $host[0].state.itemsNormal;
      // Rotate left by 1 via index writes
      const first = arr[0];
      for (let i = 0; i < arr.length - 1; i++) arr[i] = arr[i + 1];
      arr[arr.length - 1] = first;
    });
    allowPaint().then(() => getHost()).then(($host) => {
      assertDomMatchesState($host, sliceRefs);
    });
  });

  it('multi-op mix in a single frame', () => {
    getHost().then(($host) => {
      const arr = $host[0].state.itemsNormal;
      // same-key replacements
      for (let i = 0; i < Math.min(arr.length, 3); i++) {
        const key = arr[i].key;
        arr[i] = { key, label: `M${i}` };
      }
      // nested edits
      if (arr[3]) arr[3].label = 'MN3';
      if (arr[4]) arr[4].label = 'MN4';
      // re-keys
      if (arr.length >= 3) {
        const k0 = arr[0].key, k1 = arr[1].key, l0 = arr[0].label, l1 = arr[1].label;
        arr[0] = { key: k1, label: l0 };
        arr[1] = { key: k0, label: l1 };
      }
    });
    allowPaint().then(() => getHost()).then(($host) => {
      assertDomMatchesState($host, baseRefs);
    });
  });
});
