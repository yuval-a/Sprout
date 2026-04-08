/// <reference types="cypress" />

describe('ReactiveElement public methods: getState, findElement', () => {
  const page = '/tests/pages/reactive_element_methods.html';

  const getHost = () => cy.get('re-methods-host');
  const shadow = () => getHost().shadow();
  const byRef = (ref) => shadow().find(`[ref="${ref}"]`);

  const waitActive = () => getHost().should(($host) => {
    expect($host[0]).to.have.property('isActive', true);
    expect($host[0]).to.have.property('shadowRoot');
  });

  beforeEach(() => {
    cy.visit(page);
    waitActive();
  });

  describe('getState (local)', () => {
    it('returns local value and state object when requested', () => {
      getHost().then(($host) => {
        const el = $host[0];
        const valOnly = el.getState('localA');
        expect(valOnly).to.equal('LA');
        const [val, theState] = el.getState('localA', true);
        expect(val).to.equal('LA');
        expect(theState).to.equal(el.state);
      });
    });

    it('works from child reactive elements as well', () => {
      byRef('alpha').then(($alpha) => {
        const child = $alpha[0];
        const [val, theState] = child.getState('localA', true);
        expect(val).to.equal('LA');
        // State object should be the host component state
        getHost().then(($host) => expect(theState).to.equal($host[0].state));
      });
    });
  });

  describe('getState (global fallback)', () => {
    beforeEach(() => {
      // Set global state via app scope
      cy.window().then((w) => {
        const app = w.sproutApps['sprout-tests'];
        app.setGlobalState({ gA: 'GA', localA: 'SHOULD_NOT_OVERRIDE_LOCAL' });
      });
    });

    it('returns global when local missing', () => {
      getHost().then(($host) => {
        const el = $host[0];
        const [val, theState] = el.getState('gA', true);
        expect(val).to.equal('GA');
        // theState should be a (global) state object different from local host.state
        expect(theState, 'returned state object').to.exist;
        expect(theState).to.have.property('_isStateManager', true);
        expect(theState).to.not.equal(el.state);
      });
    });

    it('prefers local over global when both present', () => {
      getHost().then(($host) => {
        const el = $host[0];
        const val = el.getState('localA');
        expect(val).to.equal('LA');
      });
    });
  });

  describe('getState (missing)', () => {
    it('returns [undefined, undefined] when not found anywhere', () => {
      getHost().then(($host) => {
        const [val, theState] = $host[0].getState('nope', true);
        expect(val).to.equal(undefined);
        expect(theState).to.equal(undefined);
      });
    });
  });

  describe('getState (arrays)', () => {
    it('returns a stateful array from host', () => {
      getHost().then(($host) => {
        const el = $host[0];
        const [arr, st] = el.getState('itemsLocal', true);
        expect(Array.isArray(arr), 'is array').to.be.true;
        expect(arr).to.have.property('_isStatefulArray', true);
        expect(st).to.equal(el.state);
        expect(arr[0]).to.have.property('label', 'A');
      });
    });

    it('returns a stateful array from child reactive element', () => {
      byRef('alpha').then(($alpha) => {
        const child = $alpha[0];
        const [arr, st] = child.getState('itemsLocal', true);
        expect(Array.isArray(arr)).to.be.true;
        expect(arr).to.have.property('_isStatefulArray', true);
        getHost().then(($host) => expect(st).to.equal($host[0].state));
        expect(arr[1]).to.have.property('label', 'B');
      });
    });
  });

  describe('getState (computed getters)', () => {
    it('returns getter values and tracks dependencies', () => {
      getHost().then(($host) => {
        const el = $host[0];
        const len1 = el.getState('itemsLocalLen');
        expect(len1).to.equal(2);
      });
      // Push one more item and expect the computed getter to reflect the change
      getHost().then(($host) => {
        $host[0].state.itemsLocal.push({ key: 'k3', label: 'C' });
      });
      // Allow paint/state propagation
      cy.wrap(null).then(() => new Cypress.Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));
      getHost().then(($host) => {
        const el = $host[0];
        const len2 = el.getState('itemsLocalLen');
        expect(len2).to.equal(3);
      });
    });
  });

  describe('findElement', () => {
    it('finds element by ref in host shadow', () => {
      getHost().then(($host) => {
        const el = $host[0];
        const alpha = el.findElement('alpha');
        byRef('alpha').then(($alpha) => {
          expect(alpha).to.equal($alpha[0]);
        });
      });
    });

    it('finds element by ref from a child reactive element', () => {
      byRef('alpha').then(($alpha) => {
        const child = $alpha[0];
        const beta = child.findElement('beta');
        shadow().find('[ref="beta"]').then(($beta) => {
          expect(beta).to.equal($beta[0]);
        });
      });
    });

    it('returns null for missing ref', () => {
      getHost().then(($host) => {
        const el = $host[0];
        const missing = el.findElement('zzz_missing');
        expect(missing).to.equal(null);
      });
    });

    it('returns null for missing ref from child as well', () => {
      byRef('gamma').then(($gamma) => {
        const child = $gamma[0];
        const missing = child.findElement('zzz_missing_child');
        expect(missing).to.equal(null);
      });
    });

    it('host vs child ref scoping: host.findElement("alpha") resolves host alpha, child.findElement("alpha") resolves child alpha', () => {
      getHost().then(($host) => {
        const hostEl = $host[0];
        const hostAlpha = hostEl.findElement('alpha');
        // Get explicit elements to compare identity
        byRef('alpha').then(($alphaHost) => {
          expect(hostAlpha).to.equal($alphaHost[0]);
        });
      });
      // Now from the child component instance
      shadow().find('re-child').then(($child) => {
        const childEl = $child[0];
        const childAlpha = childEl.findElement('alpha');
        // Query child's shadow root for its alpha
        const childShadowAlpha = childEl.shadowRoot.querySelector('[ref="alpha"]');
        expect(childAlpha).to.equal(childShadowAlpha);
      });
    });

    it('deeper scoping: grandchild.findElement("alpha") resolves its own alpha, not child or host alpha', () => {
      // grandchild instance
      shadow().find('re-child').shadow().find('re-grandchild').then(($grand) => {
        const grand = $grand[0];
        const grandAlpha = grand.findElement('alpha');
        const grandShadowAlpha = grand.shadowRoot.querySelector('[ref="alpha"]');
        expect(grandAlpha).to.equal(grandShadowAlpha);
      });
      // Ensure distinct from host alpha
      getHost().then(($host) => {
        const hostEl = $host[0];
        const hostAlpha = hostEl.findElement('alpha');
        shadow().find('[ref="alpha"]').then(($hostAlpha) => {
          expect(hostAlpha).to.equal($hostAlpha[0]);
        });
      });
    });
  });

  describe('getState (nested object props)', () => {
    it('returns reactive object and nested changes propagate host→child and child→host', () => {
      // Host mutates nested
      getHost().then(($host) => { $host[0].state.localObj.nested.bar = 'B2'; });
      // Allow propagation
      cy.wrap(null).then(() => new Cypress.Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));
      // Read from child reactive element
      byRef('alpha').then(($alpha) => {
        const child = $alpha[0];
        const objFromChild = child.getState('localObj');
        expect(objFromChild.nested.bar).to.equal('B2');
      });

      // Child mutates top-level
      byRef('alpha').then(($alpha) => {
        const child = $alpha[0];
        const obj = child.getState('localObj');
        obj.foo = 'F2';
      });
      cy.wrap(null).then(() => new Cypress.Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res))));
      // Read back from host
      getHost().then(($host) => {
        const objFromHost = $host[0].getState('localObj');
        expect(objFromHost.foo).to.equal('F2');
      });
    });
  });

  describe('getState (global arrays)', () => {
    beforeEach(() => {
      cy.window().then((w) => {
        const app = w.sproutApps['sprout-tests'];
        app.setGlobalState({ gArr: [ { key: 'g1', label: 'G1' }, { key: 'g2', label: 'G2' } ] });
      });
    });

    it('returns a stateful array from global when local missing (host)', () => {
      getHost().then(($host) => {
        const host = $host[0];
        const [arr, st] = host.getState('gArr', true);
        expect(Array.isArray(arr)).to.be.true;
        expect(arr).to.have.property('_isStatefulArray', true);
        expect(arr.length).to.equal(2);
        expect(st, 'returned state object').to.exist;
        expect(st).to.have.property('_isStateManager', true);
        expect(st).to.not.equal(host.state);
      });
    });

    it('returns a stateful array from global when local missing (child reactive el)', () => {
      byRef('alpha').then(($alpha) => {
        const child = $alpha[0];
        const [arr, st] = child.getState('gArr', true);
        expect(Array.isArray(arr)).to.be.true;
        expect(arr).to.have.property('_isStatefulArray', true);
        expect(st, 'returned state object').to.exist;
        expect(st).to.have.property('_isStateManager', true);
        getHost().then(($host) => expect(st).to.not.equal($host[0].state));
      });
    });
  });
});
