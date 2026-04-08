/// <reference types="cypress" />

describe('Custom Commands', () => {
  const page = '/tests/pages/custom_commands.html';

  const getHost = () => cy.get('custom-cmd-host');
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

  it('runs app-scope commands on reactive elements', () => {
    byRef('appOnly').should('have.attr', 'data-ping', 'A');
  });

  it('runs component-scope commands on reactive elements', () => {
    byRef('compOnly').should('have.attr', 'data-mark', 'B');
  });

  it('runs both app-scope and component-scope commands on the same element', () => {
    byRef('both').should('have.attr', 'data-ping', 'X');
    byRef('both').should('have.attr', 'data-mark', 'Y');
  });

  it('applies component and app commands on the host element', () => {
    getHost().should('have.attr', 'data-mark', 'HOSTCMD');
    getHost().should('have.attr', 'data-ping', 'HOSTAPP');
  });
});

