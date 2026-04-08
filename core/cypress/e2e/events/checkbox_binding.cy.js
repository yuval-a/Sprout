/// <reference types="cypress" />

describe('Checkbox binding (_bind checked:<state>)', () => {
  const page = '/tests/pages/checkbox_binding.html';
  const getHost = () => cy.get('chk-host');
  const shadow = () => getHost().shadow();
  const byRef = (ref) => shadow().find(`[ref="${ref}"]`);
  const allowPaint = () => getHost().then(($h) => new Cypress.Promise((res) => $h[0].onAfterPaint(res)));

  beforeEach(() => {
    cy.visit(page);
    getHost().should(($host) => expect($host[0]).to.have.property('isActive', true));
  });

  it('state -> checkbox (initial render)', () => {
    byRef('chk').should('not.be.checked');
    byRef('flagText').should('have.text', 'false');
  });

  it('state -> checkbox (reactivity): toggling state flips checked and attr', () => {
    getHost().then(($host) => { $host[0].state.flag = true; });
    allowPaint();
    byRef('chk').should('be.checked');
    getHost().then(($host) => { $host[0].state.flag = false; });
    allowPaint();
    byRef('chk').should('not.be.checked');
  });
});
