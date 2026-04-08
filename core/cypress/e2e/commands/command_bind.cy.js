/// <reference types="cypress" />

describe('_bind Command', () => {
  const page = '/tests/pages/commands.html';

  const getHost = () => cy.get('commands-host');
  const shadow = () => getHost().shadow();
  const byRef = (ref) => shadow().find(`[ref="${ref}"]`);

  const waitForActiveHost = () =>
    getHost().should(($host) => {
      expect($host[0]).to.have.property('isActive', true);
      expect($host[0]).to.have.property('shadowRoot');
    });

  beforeEach(() => {
    cy.visit(page);
    waitForActiveHost();
  });

  it('checkbox: user change updates bound state', () => {
    byRef('chkText').should('have.text', 'false');
    byRef('chk').click({ force: true });
    byRef('chkText').should('have.text', 'true');
    byRef('chk').click({ force: true });
    byRef('chkText').should('have.text', 'false');
  });

  it('value: attribute change updates bound state', () => {
    byRef('inputValText').should('have.text', 'start');
    byRef('txtInput').invoke('attr', 'value', 'next');
    byRef('inputValText').should('have.text', 'next');
  });
});
