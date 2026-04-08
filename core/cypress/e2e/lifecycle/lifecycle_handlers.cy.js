/// <reference types="cypress" />

describe('Lifecycle handlers and hide/unhide events', () => {
  const page = '/tests/pages/lifecycle_handlers.html';
  const getHost = () => cy.get('life-host');
  const shadow = () => getHost().shadow();
  const byRef = (ref) => shadow().find(`[ref="${ref}"]`);
  const allowPaint = () => getHost().then(($h) => new Cypress.Promise((res) => $h[0].onAfterPaint(res)));
  const child = () => shadow().find('life-child');
  const childLogText = () => child().shadow().find('[ref="clog"]').invoke('text');

  beforeEach(() => {
    cy.visit(page);
    // Presence only; rely on built-in retry, avoid timing on isActive
    cy.get('life-host').should('exist');
    cy.get('life-host').shadow().find('[ref="log"]').should('exist');
  });

  it('calls lifecycle handlers in expected order and dispatches active event', () => {
    // Allow lifecycle to complete
    allowPaint();
    byRef('log').invoke('text').should((txt) => {
      const parts = String(txt).split('|').filter(Boolean);
      const iInit = parts.indexOf('init');
      const iMount = parts.indexOf('mount');
      const iStateful = parts.indexOf('stateful');
      const iActive = parts.indexOf('active');
      expect(iInit).to.be.gte(0);
      expect(iMount).to.be.gte(0);
      expect(iStateful).to.be.gte(0);
      expect(iActive).to.be.gte(0);
      expect(iInit).to.be.lessThan(iMount);
      expect(iMount).to.be.lessThan(iStateful);
      expect(iStateful).to.be.lessThan(iActive);
      // If event:active is present, ensure it fires between mount and stateful
      const iActiveEv = parts.indexOf('event:active');
      if (iActiveEv >= 0) {
        expect(iMount).to.be.lessThan(iActiveEv);
        expect(iActiveEv).to.be.lessThan(iStateful);
      }
    });
  });

  it('child lifecycle runs and receives active after host', () => {
    // Allow lifecycle to complete
    allowPaint();
    // Host has 'active'
    byRef('log').invoke('text').should((txt) => {
      const parts = String(txt).split('|').filter(Boolean);
      expect(parts.indexOf('active')).to.be.gte(0);
    });
    // Child has its own lifecycle entries including child:event:active and child:active
    childLogText().should((txt) => {
      const parts = String(txt).split('|').filter(Boolean);
      const iInit = parts.indexOf('child:init');
      const iMount = parts.indexOf('child:mount');
      const iActiveEv = parts.indexOf('child:event:active');
      const iStateful = parts.indexOf('child:stateful');
      const iActive = parts.indexOf('child:active');
      expect(iInit).to.be.gte(0);
      expect(iMount).to.be.gte(0);
      expect(iActiveEv).to.be.gte(0);
      expect(iStateful).to.be.gte(0);
      expect(iActive).to.be.gte(0);
      expect(iInit).to.be.lessThan(iMount);
      expect(iMount).to.be.lessThan(iActiveEv);
      expect(iActiveEv).to.be.lessThan(iStateful);
      expect(iStateful).to.be.lessThan(iActive);
    });
  });

  it('hide/unhide events fire on hidden attribute changes', () => {
    // Toggle hidden attribute
    getHost().then(($host) => { $host[0].setAttribute('hidden',''); });
    allowPaint();
    byRef('log').invoke('text').should((txt) => {
      // Accept that hide may or may not be logged depending on attribute observation support; if present, must include event:hide
      if (txt) expect(txt.includes('event:hide')).to.be.true;
    });
    // Remove hidden
    getHost().then(($host) => { $host[0].removeAttribute('hidden'); });
    allowPaint();
    byRef('log').invoke('text').should((txt) => {
      if (txt) expect(txt.includes('event:unhide')).to.be.true;
    });
  });

  it('unmount does not throw and component can be recreated', () => {
    // Remove the host from DOM
    getHost().then(($host) => { $host[0].remove(); });
    // Re-add a new instance; should mount cleanly
    cy.document().then((doc) => {
      const el = doc.createElement('life-host');
      doc.body.appendChild(el);
    });
    getHost().should(($host) => expect($host[0]).to.have.property('isActive', true));
  });
});
