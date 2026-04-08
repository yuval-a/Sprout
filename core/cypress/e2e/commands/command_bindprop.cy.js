/// <reference types="cypress" />

describe('_bindprop Command', () => {
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

  it('sets element property from state at activation time (one-time)', () => {
    byRef('bindprop').should(($el) => {
      expect($el[0].tabIndex).to.equal(2);
    });
    getHost().then(($host) => { $host[0].state.tab = 5; });
    byRef('bindprop').should(($el) => {
      expect($el[0].tabIndex).to.equal(2);
    });
  });
});
