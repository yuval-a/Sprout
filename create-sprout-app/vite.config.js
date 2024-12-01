import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const npmRunCommand = process.env.npm_lifecycle_event;

// Set up equivalent of __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const builderScriptPath = path.resolve(__dirname, 'node_modules/sprout-build-app/sprout-build-app.mjs');
const projectName = path.basename(process.cwd())
const buildArgs = ['./src', './dist', '--app', projectName];
if (npmRunCommand === "serve-prod") buildArgs.push('--minify');
if (npmRunCommand === "serve") buildArgs.push("--allowAppScopeAccess");
if (npmRunCommand === "serve-prod") buildArgs.push(" --minify");

export default defineConfig({
  root: path.resolve(__dirname, 'dist'),  // Set root to the dist folder
  server: {
    watch: {
      ignored: [
        '**/dist/**',   // Ignore dist directory
      ],
    }
  },  
  plugins: [
    {
      name: 'rebuild-onSource-change',
      configureServer(server) {
        server.watcher.add( path.resolve(__dirname, './src'));
        server.watcher.on('change', ()=> {
          const buildProcess = spawn('node', [builderScriptPath, ...buildArgs], {
            stdio: 'inherit'
          });
          buildProcess.on('close', (code) => {
            if (code === 0) {
              console.log('Build completed successfully. Triggering full reload...');
              server.ws.send({
                type: 'full-reload',
                path: '*'
              });            
            } else {
              console.error(`Build script failed with code ${code}`);
            }
            buildProcess.on('error', (error) => {
              console.error('Build process error:', error);
            });
          });
        });
      }
    }
  ]
});