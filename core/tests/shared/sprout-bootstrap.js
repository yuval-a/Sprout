import '../../dist/sprout-core.js';
// Expose a helper to init an app after DOM is ready
export function initSproutTestsApp() {
  const build = globalThis.SproutInitApp('sprout-tests');
  build();
}
