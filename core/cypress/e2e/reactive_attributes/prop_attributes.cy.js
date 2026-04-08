/// <reference types="cypress" />

describe('Prop Attributes', () => {
  const page = '/tests/pages/prop_attributes.html';

  const getHost = () => cy.get('props-host');
  const getByRef = (ref) => getHost().shadow().find(`[ref="${ref}"]`);

  const waitForActiveHost = () =>
    getHost().should(($host) => {
      expect($host[0]).to.have.property('isActive', true);
      expect($host[0]).to.have.property('shadowRoot');
    });

  beforeEach(() => {
    cy.visit(page);
    waitForActiveHost();
  });

  it('binds string props initially (static only)', () => {
    // Initial bind (prop attributes are static)
    getByRef('klass').should('have.attr', 'class', 'alpha beta');
    getByRef('title').should('have.attr', 'title', 'Hello');
  });

  it('fans out one prop to multiple attributes (static)', () => {
    // Initial values (prop attributes are static)
    getByRef('fan1').should('have.attr', 'data-shared', 'X');
    getByRef('fan2').should('have.attr', 'data-shared', 'X');
  });
});
