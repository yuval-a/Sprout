#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { input, confirm } from '@inquirer/prompts';
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
        // Copy default-app contents to the new project directory
        const defaultAppPath = path.join(__dirname, 'default-app');
        await fs.copy(defaultAppPath, path.join(projectPath, '/src'));
        await fs.copy(path.join(__dirname, 'vite.config.js'), path.join(projectPath, 'vite.config.js'));
        console.log(`\nSuccess! Created ${projectName} at ${projectPath}`);
        console.log('Run the following commands to get started:\n');
        console.log(`cd ${projectName}`);
        console.log('npm install');
        console.log("npm build: to build a 'development' version of your app into 'dist' folder");
        console.log("npm build-prod: to build a 'production' version of your app into 'dist' folder");
        console.log("npm serve: to build a 'development' version of your app into 'dist' folder and serve it using a Vite server.");
        console.log("npm serve-prod: to build a 'production' version of your app into 'dist' folder and serve it using a Vite server.");
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