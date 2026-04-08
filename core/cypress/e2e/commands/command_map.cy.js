/// <reference types="cypress" />

describe('_map Command', () => {
  const page = '/tests/pages/commands_map_stable.html';

  const getHost = () => cy.get('map-host');
  const shadow = () => getHost().shadow();
  const byRef = (ref) => shadow().find(`[ref="${ref}"]`);
  const listItems = (ref) => byRef(ref).find('li > item-el');
  const labelAt = (ref, i) => listItems(ref).eq(i).shadow().find('[ref="label"]');
  // Single paint-cycle allowance helper
  const allowPaint = () => afterPaint();

  // Wait for next paint cycle using the component's onAfterPaint hook
  const afterPaint = () => getHost().then(($host) => new Cypress.Promise((res) => $host[0].onAfterPaint(res)));

  // (Diagnostics test removed; no longer needed after framework fix)

  // Log the test description before each test runs
  beforeEach(function() {
    // eslint-disable-next-line no-console
    console.log(`TEST: ${this.currentTest.fullTitle()}`);
  });

  // (Removed redundant diagnostics test)
  
  // Capture uncaught errors thrown by the runtime during mapping of non-stateful arrays
  let uncaughtErrors = [];

  beforeEach(() => {
    uncaughtErrors = [];
    cy.on('uncaught:exception', (err) => {
      uncaughtErrors.push(err);
      // Prevent Cypress from failing the test due to the expected error
      return false;
    });
    cy.visit(page);
    // Allow one paint cycle for activation
    allowPaint();
  });

  const baseLists = [
    { name: 'normal', ref: 'listNormal' },
    { name: 'sshStateMap', ref: 'listSshYes' },
  ];

  it('renders all supported data types and wraps items with <li> for all base arrays', () => {
    const expected = ['A', '42', '0', 'true', 'false', '', 'null', 'undefined'];
    baseLists.forEach(({ ref }) => {
      listItems(ref).should('have.length', 8);
      byRef(ref).find('> li').should('have.length', 8);
      expected.forEach((txt, i) => labelAt(ref, i).should('have.text', txt));
    });
  });
  

  it('throws for SSH without stateMap', () => {
    // Visit the error-only page and assert per-list errors
    cy.clearUncaughtErrors();
    cy.visit('/tests/pages/commands_map_non_stateful_error.html');
    allowPaint();
    const names = [
      'itemsSshNoStateMap',
      'itemsFilterSshNoStateMap',
      'itemsMapSshNoStateMap',
      'itemsSliceSshNoStateMap',
    ];
    cy.getUncaughtErrors().then((errs) => {
      const messages = errs.map((e) => String(e && (e.message || e)));
      names.forEach((name) => {
        expect(messages.some((m) => m.includes(name)), `error includes ${name}`).to.be.true;
      });
    });
  });

  it('push appends at tail', () => {
    getHost().then(($host) => { $host[0].state.itemsNormal.push({ key: 'k9', label: 'Z' }); });
    allowPaint()
      .then(() => getHost())
      .then(() => {
        baseLists.forEach(({ ref }) => {
          listItems(ref).should('have.length', 9);
          labelAt(ref, 8).should('have.text', 'Z');
        });
      });
  });

  it('pop removes from tail', () => {
    getHost().then(($host) => { $host[0].state.itemsNormal.pop(); });
    allowPaint()
      .then(() => {
        baseLists.forEach(({ ref }) => listItems(ref).should('have.length', 7));
      });
  });

  it('unshift then shift updates head', () => {
    getHost().then(($host) => { $host[0].state.itemsNormal.unshift({ key: 'k0', label: 'U' }); });
    allowPaint().then(() => {
      baseLists.forEach(({ ref }) => labelAt(ref, 0).should('have.text', 'U'));
    });
    getHost().then(($host) => { $host[0].state.itemsNormal.shift(); });
    allowPaint().then(() => {
      baseLists.forEach(({ ref }) => labelAt(ref, 0).should('have.text', 'A'));
    });
  });

  it('splice insert at index 2', () => {
    getHost().then(($host) => { $host[0].state.itemsNormal.splice(2, 0, { key: 'ki', label: 'I' }); });
    allowPaint().then(() => {
      baseLists.forEach(({ ref }) => labelAt(ref, 2).should('have.text', 'I'));
    });
  });

  it('splice replace at index 3', () => {
    getHost().then(($host) => { $host[0].state.itemsNormal.splice(3, 1, { key: 'kr', label: 'R' }); });
    allowPaint().then(() => {
      baseLists.forEach(({ ref }) => labelAt(ref, 3).should('have.text', 'R'));
    });
  });

  it('splice delete 2 starting at index 1', () => {
    getHost().then(($host) => { $host[0].state.itemsNormal.splice(1, 2); });
    allowPaint().then(() => {
      baseLists.forEach(({ ref }) => listItems(ref).should('have.length', 6));
    });
  });

  it('reverse reflects reversed baseline', () => {
    getHost().then(($host) => { $host[0].state.itemsNormal.reverse(); });
    allowPaint()
      .then(() => getHost())
      .then(($host) => {
        const expectedKeys = $host[0].state.itemsNormal.map((it) => it.key);
        baseLists.forEach(({ ref }) => {
          byRef(ref)
            .find('> li')
            .should(($lis) => {
              expect($lis, `${ref} length`).to.have.length(expectedKeys.length);
              const keys = [...$lis].map((li) => li.stateKey);
              // Suppress noisy console logs in CI; rely on assertion diff below
              expect(keys, `${ref} order`).to.deep.equal(expectedKeys);
            });
        });
      });
  });

  it('sort orders numeric labels ascending', () => {
    // Ensure host is active and state is available before mutating
    getHost().should(($host) => {
      expect($host[0], 'host element').to.exist;
      expect($host[0].state, 'host.state must exist').to.exist;
    });
    getHost().then(($host) => {
      const arr = $host[0].state.itemsNormal;
      arr.splice(0, arr.length,
        { key: 'n3', label: 3 },
        { key: 'n1', label: 1 },
        { key: 'n2', label: 2 },
      );
    });
    getHost().then(($host) => { $host[0].state.itemsNormal.sort((a, b) => a.label - b.label); });
    allowPaint().then(() => {
      baseLists.forEach(({ ref }) => ['1', '2', '3'].forEach((txt, i) => labelAt(ref, i).should('have.text', txt)));
    });
  });

  it('copyWithin + re-key duplicates then rekeys', () => {
    getHost().then(($host) => {
      const arr = $host[0].state.itemsNormal;
      arr.splice(0, arr.length,
        { key: 'a', label: 'A' },
        { key: 'b', label: 'B' },
        { key: 'c', label: 'C' },
      );
      arr.copyWithin(1, 0, 1);
      arr[1] = { key: 'a1', label: 'A' };
    });
    allowPaint().then(() => {
      baseLists.forEach(({ ref }) => ['A', 'A', 'C'].forEach((txt, i) => labelAt(ref, i).should('have.text', txt)));
    });
  });

  it('fill range + re-key updates labels', () => {
    getHost().then(($host) => {
      const arr = $host[0].state.itemsNormal;
      arr.splice(0, arr.length,
        { key: 'a', label: 'A' },
        { key: 'b', label: 'B' },
        { key: 'c', label: 'C' },
      );
      arr.fill({ key: 'f', label: 'F' }, 1, 3);
      arr[1] = { key: 'f1', label: 'F' };
      arr[2] = { key: 'f2', label: 'F' };
    });
    allowPaint().then(() => {
      baseLists.forEach(({ ref }) => ['A', 'F', 'F'].forEach((txt, i) => labelAt(ref, i).should('have.text', txt)));
    });
  });

  it('direct index assignment and nested field mutation reflect across all lists', () => {
    getHost().then(($host) => { $host[0].state.itemsNormal[0] = { key: 'kx', label: 'X' }; });
    afterPaint().then(() => {
      baseLists.forEach(({ ref }) => labelAt(ref, 0).should('have.text', 'X'));
    });
    getHost().then(($host) => { $host[0].state.itemsNormal[0].label = 'XX'; });
    afterPaint().then(() => {
      baseLists.forEach(({ ref }) => labelAt(ref, 0).should('have.text', 'XX'));
    });
  });

  describe('derived arrays: getter vs SSH (no stateMap / stateMap) using filter', () => {
    const derivedYes = [
      { name: 'sshYes', ref: 'listSshFilterYes' },
    ];

    it('initially filters out items with label === "A"', () => {
      // Only the SSH with stateMap: true renders
      derivedYes.forEach(({ ref }) => listItems(ref).should('have.length', 7));
    });

    it('updates derived lists when source changes', () => {
      // Change first item label from 'A' -> 'AA' so it should appear in filtered list
      getHost().then(($host) => { $host[0].state.itemsNormal[0].label = 'AA'; });
      allowPaint().then(() => {
        derivedYes.forEach(({ ref }) => listItems(ref).should('have.length', 8));
      });
      // Revert to 'A' to drop again
      getHost().then(($host) => { $host[0].state.itemsNormal[0].label = 'A'; });
      allowPaint().then(() => {
        derivedYes.forEach(({ ref }) => listItems(ref).should('have.length', 7));
      });
    });

    it('rejects non-stateful filter lists (getter/sshNo) with an error', () => {
      cy.clearUncaughtErrors();
      cy.visit('/tests/pages/commands_map_non_stateful_error.html');
      allowPaint();
      cy.getUncaughtErrors().then((errs) => {
        const messages = errs.map((e) => String(e && (e.message || e)));
        expect(messages.some((m) => m.includes('itemsFilterSshNoStateMap')), 'error includes itemsFilterSshNoStateMap').to.be.true;
      });
    });
  });

  describe('derived arrays: getter vs SSH (no/stateMap) using map', () => {
    const derivedYes = [
      { name: 'sshYes', ref: 'listSshMapYes' },
    ];

    it('initially maps labels with prefix', () => {
      const expected = ['M:A', 'M:42', 'M:0', 'M:true', 'M:false', 'M:', 'M:null', 'M:undefined'];
      derivedYes.forEach(({ ref }) => {
        listItems(ref).should('have.length', expected.length);
        expected.forEach((txt, i) => labelAt(ref, i).should('have.text', txt));
      });
    });

    it('updates mapped lists when source changes', () => {
      getHost().then(($host) => { $host[0].state.itemsNormal[0].label = 'AA'; });
      allowPaint().then(() => {
        derivedYes.forEach(({ ref }) => labelAt(ref, 0).should('have.text', 'M:AA'));
      });
    });

    it('rejects non-stateful mapped lists (getter/sshNo) with an error', () => {
      cy.clearUncaughtErrors();
      cy.visit('/tests/pages/commands_map_non_stateful_error.html');
      allowPaint();
      cy.getUncaughtErrors().then((errs) => {
        const messages = errs.map((e) => String(e && (e.message || e)));
        expect(messages.some((m) => m.includes('itemsMapSshNoStateMap')), 'error includes itemsMapSshNoStateMap').to.be.true;
      });
    });
  });

  describe('derived arrays: getter vs SSH (no/stateMap) using slice', () => {
    const derivedYes = [
      { name: 'sshYes', ref: 'listSshSliceYes' },
    ];

    it('initially slices items 1..4', () => {
      const expected = ['42', '0', 'true', 'false'];
      derivedYes.forEach(({ ref }) => {
        listItems(ref).should('have.length', expected.length);
        expected.forEach((txt, i) => labelAt(ref, i).should('have.text', txt));
      });
    });

    it('updates slice when source head changes (unshift)', () => {
      getHost().then(($host) => { $host[0].state.itemsNormal.unshift({ key: 'k0', label: 'U' }); });
      allowPaint();
      const expected = ['A', '42', '0', 'true'];
      derivedYes.forEach(({ ref }) => {
        listItems(ref).should('have.length', expected.length);
        expected.forEach((txt, i) => labelAt(ref, i).should('have.text', txt));
      });
    });

    it('rejects non-stateful sliced lists (getter/sshNo) with an error', () => {
      cy.clearUncaughtErrors();
      cy.visit('/tests/pages/commands_map_non_stateful_error.html');
      allowPaint();
      cy.getUncaughtErrors().then((errs) => {
        const messages = errs.map((e) => String(e && (e.message || e)));
        expect(messages.some((m) => m.includes('itemsSliceSshNoStateMap')), 'error includes itemsSliceSshNoStateMap').to.be.true;
      });
    });
  });
});
