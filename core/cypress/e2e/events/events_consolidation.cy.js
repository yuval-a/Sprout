/// <reference types="cypress" />

describe('Events consolidation to next paint', () => {
  const page = '/tests/pages/events_consolidation.html';

  const getHost = () => cy.get('events-cons-host');
  const shadow = () => getHost().shadow();
  const byRef = (ref) => shadow().find(`[ref="${ref}"]`);
  const allowPaint = () => getHost().then(($h) => new Cypress.Promise((res) => $h[0].onAfterPaint(res)));

  beforeEach(() => {
    cy.visit(page);
    getHost().should(($host) => {
      expect($host[0]).to.have.property('isActive', true);
    });
  });

  it('two different events in same tick coalesce into one paint', () => {
    byRef('outA').should('have.text', '');
    byRef('outB').should('have.text', '');
    byRef('outC').should('have.text', ':');
    getHost().then(($host) => {
      const root = $host[0].shadowRoot;
      root.querySelector('[ref="alpha"]').dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      root.querySelector('[ref="beta"]').dispatchEvent(new KeyboardEvent('keydown', { key: 'x', bubbles: true, composed: true }));
    });
    byRef('outA').should('have.text', '');
    byRef('outB').should('have.text', '');
    byRef('outC').should('have.text', ':');
    allowPaint();
    byRef('outA').should('have.text', 'A1');
    byRef('outB').should('have.text', 'B1');
    byRef('outC').should('have.text', 'A1:B1');
  });

  it('last write wins within same tick (handler chains)', () => {
    // Fire events that write A1/B1, then override to A2/B2 synchronously in same tick
    getHost().then(($host) => {
      const inst = $host[0];
      const root = inst.shadowRoot;
      root.querySelector('[ref="alpha"]').dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      inst.state.a = 'A2';
      root.querySelector('[ref="beta"]').dispatchEvent(new KeyboardEvent('keydown', { key: 'x', bubbles: true, composed: true }));
      inst.state.b = 'B2';
    });
    allowPaint();
    byRef('outA').should('have.text', 'A2');
    byRef('outB').should('have.text', 'B2');
    byRef('outC').should('have.text', 'A2:B2');
  });
});
