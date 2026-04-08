/// <reference types="cypress" />

describe('State Attributes', () => {
  // When running from the core project root and using the local test server,
  // pages are served from the core directory. So don't prefix with '/core/'.
  const page = '/tests/pages/reactive_attributes.html';

  const getHost = () => cy.get('attr-host');
  // Use Cypress's built-in shadow() + find() to leverage retries
  const getByRef = (ref) => getHost().shadow().find(`[ref="${ref}"]`);

  const waitForActiveHost = () =>
    getHost().should(($host) => {
      expect($host[0]).to.have.property('isActive', true);
      expect($host[0]).to.have.property('shadowRoot');
    });

  beforeEach(() => {
    cy.visit(page);
    // Ensure the component upgraded, rendered, and activated
    waitForActiveHost();
  });

  it('binds string attribute via :attr to state and updates on change', () => {
    getByRef('str').should('have.attr', 'title', 'Hello');
    getHost().then(($host) => {
      $host[0].state.title = 'World';
    });
    getByRef('str').should('have.attr', 'title', 'World');
  });

  it('handles boolean attribute presence/absence', () => {
    getByRef('bool').should('not.have.attr', 'hidden');
    getByRef('bool').should('be.visible');
    getHost().then(($host) => {
      $host[0].state.isHidden = true;
    });
    getByRef('bool').should('have.attr', 'hidden');
    getByRef('bool').should('not.be.visible');
    getHost().then(($host) => {
      $host[0].state.isHidden = false;
    });
    getByRef('bool').should('not.have.attr', 'hidden');
    getByRef('bool').should('be.visible');
  });

  it('supports negation syntax !value for boolean attributes', () => {
    // isVisible starts true -> neg hidden should be absent
    getByRef('neg').should('not.have.attr', 'hidden');
    getByRef('neg').should('be.visible');
    getHost().then(($host) => {
      $host[0].state.isVisible = false;
    });
    getByRef('neg').should('have.attr', 'hidden');
    getByRef('neg').should('not.be.visible');
  });

  it('supports equality syntax is_value for boolean attributes', () => {
    // status starts 'open' -> eq hidden should be absent
    getByRef('eq').should('not.have.attr', 'hidden');
    getByRef('eq').should('be.visible');
    getHost().then(($host) => {
      $host[0].state.status = 'done';
    });
    getByRef('eq').should('have.attr', 'hidden');
    getByRef('eq').should('not.be.visible');
  });

  it('supports ternary check?whenTrue:whenFalse for string attributes', () => {
    // check starts true -> data-mode should be 'on'
    getByRef('tern').should('have.attr', 'data-mode', 'on');
    getHost().then(($host) => {
      $host[0].state.check = false;
    });
    getByRef('tern').should('have.attr', 'data-mode', 'off');
  });

  it('single-branch ternary retains last value when falsy (does not remove)', () => {
    // check starts true -> data-flag should be 'on'
    getByRef('ternOnly').should('have.attr', 'data-flag', 'on');
    // Set false: expected to retain previous value (not remove / not unset)
    getHost().then(($host) => {
      $host[0].state.check = false;
    });
    // Should still have attribute and keep its last non-empty value
    getByRef('ternOnly').should('have.attr', 'data-flag', 'on');
  });

  it('binds string attribute via getter and updates on dependency change', () => {
    // getter: titleUpper -> :title
    getByRef('getStr').should('have.attr', 'title', 'HELLO');
    getHost().then(($host) => {
      $host[0].state.title = 'World';
    });
    getByRef('getStr').should('have.attr', 'title', 'WORLD');
  });

  it('binds string attribute via getter from object and updates on dependency change', () => {
    // getter: titleUpper -> :title
    getByRef('getObjStr').should('have.attr', 'title', 'HELLO');
    getHost().then(($host) => {
      $host[0].state.obj.title = 'World';
    });
    getByRef('getObjStr').should('have.attr', 'title', 'WORLD');
  });

  it('binds string attribute via getter from array and updates on dependency change', () => {
    // getter: titleUpper -> :title
    getByRef('getArrStr').should('have.attr', 'title', 'HELLO');
    getHost().then(($host) => {
      $host[0].state.arr[0] = 'World';
    });
    getByRef('getArrStr').should('have.attr', 'title', 'WORLD');
  });

  it('boolean getter controls presence/absence of attribute', () => {
    // getter: isDone depends on status
    getByRef('getBool').should('not.have.attr', 'hidden');
    getHost().then(($host) => { $host[0].state.status = 'done'; });
    getByRef('getBool').should('have.attr', 'hidden');
  });

  it('boolean getter from object controls presence/absence of attribute', () => {
    getByRef('getObjBool').should('not.have.attr', 'hidden');
    getHost().then(($host) => { $host[0].state.obj.isHidden = true; });
    getByRef('getObjBool').should('have.attr', 'hidden');
  });

  it('boolean getter from array controls presence/absence of attribute', () => {
    getByRef('getArrBool').should('not.have.attr', 'hidden');
    getHost().then(($host) => { $host[0].state.arr[1] = true; });
    getByRef('getArrBool').should('have.attr', 'hidden');
  });

});
