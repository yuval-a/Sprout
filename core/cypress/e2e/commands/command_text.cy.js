/// <reference types="cypress" />

describe('_text Command', () => {
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

  it('binds and updates text content for strings', () => {
    byRef('txt').should('have.text', 'Hello');
    getHost().then(($host) => { $host[0].state.title = 'World'; });
    byRef('txt').should('have.text', 'World');
  });

  it('coerces non-strings to text and handles empty string', () => {
    getHost().then(($host) => { $host[0].state.title = 42; });
    byRef('txt').should('have.text', '42');
    getHost().then(($host) => { $host[0].state.title = false; });
    byRef('txt').should('have.text', 'false');
    getHost().then(($host) => { $host[0].state.title = ''; });
    byRef('txt').should('have.text', '');
  });
});
