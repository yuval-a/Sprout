/// <reference types="cypress" />

describe('Global State Attributes', () => {
  const page = '/tests/pages/reactive_attributes_global.html';

  const getHost = () => cy.get('attr-global-host');
  const getByRef = (ref) => getHost().shadow().find(`[ref="${ref}"]`);

  const waitForActiveHost = () =>
    getHost().should(($host) => {
      expect($host[0]).to.have.property('isActive', true);
      expect($host[0]).to.have.property('shadowRoot');
    });

  const withGlobal = (fn) =>
    cy.window().then((win) => fn(win.sproutApps['sprout-tests'].SproutGlobalState));

  beforeEach(() => {
    cy.visit(page);
    waitForActiveHost();
  });

  it('binds string attribute via :attr to global state and updates on change', () => {
    getByRef('str').should('have.attr', 'title', 'Hello');
    withGlobal((g) => {
      g.title = 'World';
    });
    getByRef('str').should('have.attr', 'title', 'World');
  });

  it('handles boolean attribute presence/absence from global state', () => {
    getByRef('bool').should('not.have.attr', 'hidden');
    getByRef('bool').should('be.visible');
    withGlobal((g) => {
      g.isHidden = true;
    });
    getByRef('bool').should('have.attr', 'hidden');
    getByRef('bool').should('not.be.visible');
    withGlobal((g) => {
      g.isHidden = false;
    });
    getByRef('bool').should('not.have.attr', 'hidden');
    getByRef('bool').should('be.visible');
  });

  it('supports negation syntax !value for boolean attributes from global state', () => {
    getByRef('neg').should('not.have.attr', 'hidden');
    getByRef('neg').should('be.visible');
    withGlobal((g) => {
      g.isVisible = false;
    });
    getByRef('neg').should('have.attr', 'hidden');
    getByRef('neg').should('not.be.visible');
  });

  it('supports equality syntax is_value for boolean attributes from global state', () => {
    getByRef('eq').should('not.have.attr', 'hidden');
    getByRef('eq').should('be.visible');
    withGlobal((g) => {
      g.status = 'done';
    });
    getByRef('eq').should('have.attr', 'hidden');
    getByRef('eq').should('not.be.visible');
  });

  it('supports ternary check?whenTrue:whenFalse for string attributes from global state', () => {
    getByRef('tern').should('have.attr', 'data-mode', 'on');
    withGlobal((g) => {
      g.check = false;
    });
    getByRef('tern').should('have.attr', 'data-mode', 'off');
  });

  it('single-branch ternary retains last value when falsy (does not remove)', () => {
    getByRef('ternOnly').should('have.attr', 'data-flag', 'on');
    withGlobal((g) => {
      g.check = false;
    });
    getByRef('ternOnly').should('have.attr', 'data-flag', 'on');
  });

  it('binds string attribute via getter to global state and updates on change', () => {
    // getter: titleUpper -> :title
    getByRef('getStr').should('have.attr', 'title', 'HELLO');
    withGlobal((g) => { g.title = 'World'; });
    getByRef('getStr').should('have.attr', 'title', 'WORLD');
  });

  it('boolean getter from global state controls presence/absence', () => {
    getByRef('getBool').should('not.have.attr', 'hidden');
    withGlobal((g) => { g.status = 'done'; });
    getByRef('getBool').should('have.attr', 'hidden');
  });
});
