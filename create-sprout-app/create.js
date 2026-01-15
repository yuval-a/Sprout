#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { input, confirm, select } from '@inquirer/prompts';
import { fileURLToPath } from 'url';
import getAppPackageJson from './app-package.mjs';

// Set up equivalent of __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createSproutAppTemplate() {
    let projectName = await input(
        {
            name: 'projectName',
            message: 'Enter your project name (spaces and dashes will be converted to underscores):',
            default: 'sprout_app'
        }
    );

    projectName = projectName.replaceAll(/\s|-/g,'_');
    const projectPath = path.join(process.cwd(), projectName);
    const srcPath = path.join(projectPath, 'src');
  
     // Check if the folder already exists
  if (fs.existsSync(projectPath)) {
    const shouldOverride  = await confirm(
      {
        name: 'shouldOverride',
        message: `The folder "${projectName}" already exists. Do you want to override it? (warning: everything in that folder will be deleted!)`,
        default: true
      }
    );     
    if (!shouldOverride) {
        console.log('Aborting project creation.');
        process.exit(0);
        } else {
            // Remove the existing folder before continuing
            await fs.remove(projectPath);
        }
    }
    // Create project directory
    await fs.ensureDir(projectPath);

    const packageJson = getAppPackageJson(projectName);

    await fs.writeFile(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJson, null, 2)
    );

    try {
        // Ask which template to create
        const appType = await select({
            message: 'What type of app do you want to create?',
            choices: [
                { name: 'Default demo app', value: 'demo' },
                { name: 'Blank app', value: 'blank' }
            ],
            default: 'demo'
        });

        // Ensure src directory exists
        await fs.ensureDir(srcPath);

        if (appType === 'demo') {
            // Copy default demo app contents into src
            const defaultAppPath = path.join(__dirname, 'default_app');
            await fs.copy(defaultAppPath, srcPath);
        } else {
            // Create a blank app scaffold under src
            await fs.ensureDir(path.join(srcPath, 'components'));

            // index.js
            const indexJs = `// The global runtime script of your app\n// Global state initialization\nconst initState = {};\nthis.setGlobalState(initState);\n`;
            await fs.writeFile(path.join(srcPath, 'index.js'), indexJs);

            // index.html
            const indexHtml = `<!-- Root HTML template for your app -->\n`;
            await fs.writeFile(path.join(srcPath, 'index.html'), indexHtml);

            // index.css (very basic html,body reset)
            const indexCss = `html, body {\n  margin: 0;\n  padding: 0;\n  height: 100%;\n}\n`;
            await fs.writeFile(path.join(srcPath, 'index.css'), indexCss);

            // head.html
            const headHtml = `<!-- Extra markup to put inside your app's <head> -->\n`;
            await fs.writeFile(path.join(srcPath, 'head.html'), headHtml);
        }

        await fs.copy(path.join(__dirname, 'vite.config.js'), path.join(projectPath, 'vite.config.js'));
        console.log(`\nSuccess! Created ${projectName} at ${projectPath}`);
        console.log('Run the following commands to get started:\n');
        console.log(`cd ${projectName}`);
        console.log('npm install');
        console.log("npm build: to build a 'development' version of your app into 'dist' folder");
        console.log("npm build-min: to build a minified 'development' version of your app into 'dist' folder");
        console.log("npm build-strict: to build a 'strict' (no console warnings/errors) version of your app into 'dist' folder");
        console.log("npm build-strict-min: to build a minified 'strict' (no console warnings/errors) version of your app into 'dist' folder");
        console.log("npm serve: to build a 'development' version of your app into 'dist' folder and serve it using a Vite server.");
        console.log("npm serve-min: to build a 'development' version of your app into 'dist' folder and serve it using a Vite server.");
        console.log("npm serve-strict: to build a 'strict' version of your app into 'dist' folder and serve it using a Vite server.");
        console.log("npm serve-strict-min: to build a minified 'strict' version of your app into 'dist' folder and serve it using a Vite server.");
    } catch (error) {
        console.error('Error creating app:', error);
        process.exit(1);
    }
}

// Execute the function
createSproutAppTemplate()
.catch((error) => {
  console.error('Error creating app:', error);
  process.exit(1);
});
