/// <reference types="cypress" />

describe('Events matrix (Sprout single host listener mapping)', () => {
  const page = '/tests/pages/events_matrix.html';
  const getHost = () => cy.get('events-matrix-host');
  const shadow = () => getHost().shadow();
  const byRef = (ref) => shadow().find(`[ref="${ref}"]`);
  const resetLog = () => getHost().then(($h)=> { $h[0].state.log = []; });

  beforeEach(() => {
    cy.visit(page);
    getHost().should(($host) => expect($host[0]).to.have.property('isActive', true));
    resetLog();
  });

  function dispatchOn(ref, ev) {
    getHost().then(($host) => {
      const el = $host[0].shadowRoot.querySelector(`[ref="${ref}"]`);
      el.dispatchEvent(ev);
    });
  }

  it('bubbling + composed: click on inner maps to inner then alpha', () => {
    dispatchOn('inner', new MouseEvent('click', { bubbles: true, composed: true }));
    byRef('log').invoke('text').should((txt) => {
      expect(txt.startsWith('click@inner')).to.be.true;
      expect(txt.includes('click@alpha')).to.be.true;
    });
  });

  it('non-bubbling focus/blur: child does not map; host does', () => {
    dispatchOn('inner', new FocusEvent('focus', { bubbles: false, composed: true }));
    byRef('log').should('have.text', '');
    resetLog();
    dispatchOn('alpha', new FocusEvent('focus', { bubbles: false, composed: true }));
    byRef('log').should('have.text', '');
    resetLog();
    dispatchOn('inner', new FocusEvent('focusin', { bubbles: true, composed: true }));
    byRef('log').invoke('text').should((txt) => {
      // Allow possible duplicate delivery; require at least one mapping
      expect(txt.includes('focusin@alpha')).to.be.true;
    });
  });

  it('composed:false does not cross shadow', () => {
    dispatchOn('inner', new MouseEvent('click', { bubbles: true, composed: false }));
    byRef('log').should('have.text', '');
  });

  it('keyboard events map with key info', () => {
    dispatchOn('alpha', new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
    dispatchOn('alpha', new KeyboardEvent('keyup', { key: 'Escape', bubbles: true, composed: true }));
    byRef('log').invoke('text').should((txt) => {
      expect(txt.includes('keydown@alpha:Enter')).to.be.true;
      expect(txt.includes('keyup@alpha:Escape')).to.be.true;
    });
  });

  it('input/change on input element', () => {
    dispatchOn('txt', new Event('input', { bubbles: true, composed: true }));
    dispatchOn('txt', new Event('change', { bubbles: true, composed: true }));
    byRef('log').invoke('text').should((txt) => {
      expect(txt.includes('input@txt')).to.be.true;
      expect(txt.includes('change@txt')).to.be.true;
    });
  });

  it('form submit prevented in handler', () => {
    dispatchOn('form', new Event('submit', { bubbles: true, composed: true, cancelable: true }));
    byRef('log').invoke('text').should((txt) => {
      expect(txt.includes('submit@form')).to.be.true;
    });
  });
});
