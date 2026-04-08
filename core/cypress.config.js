/* eslint-env node */
// Cypress E2E config for Sprout core
const fs = require('fs');
const path = require('path');

module.exports = {
  e2e: {
    baseUrl: 'http://localhost:5177',
    // specPattern is resolved from the project root (this folder)
    // so we should not prefix with 'core/'.
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // Truncate the primary log file at the beginning of each Cypress run
      on('before:run', () => {
        try {
          const logsDir = path.join(__dirname, 'cypress', 'logs');
          if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
          const outPath = path.join(logsDir, 'command_map.console.log');
          fs.writeFileSync(outPath, '', 'utf8');
        } catch (e) {
          // ignore
        }
      });

      on('task', {
        writeLog({ file, message }) {
          try {
            const logsDir = path.join(__dirname, 'cypress', 'logs');
            if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
            const outPath = path.join(logsDir, file || 'console.log');
            const ts = new Date().toISOString();
            const line = `[${ts}] ${String(message)}`;
            fs.appendFileSync(outPath, line + '\n', 'utf8');
          } catch (e) {
            // swallow errors; return null for Cypress tasks
          }
          return null;
        }
      });
      return config;
    }
  }
};
