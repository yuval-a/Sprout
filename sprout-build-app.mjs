import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import virtual from '@rollup/plugin-virtual';
import alias from '@rollup/plugin-alias';
import { minify } from 'html-minifier-terser';
import fs from 'fs';
import path from 'path';

function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return letters[Math.floor(Math.random() * letters.length)];
  }
  
function generateRandomString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += getRandomLetter();
    }
    return result;
}

const appName = process.argv.includes('--app') ? process.argv[process.argv.indexOf('--app') + 1] : generateRandomString(8);

async function bundleRuntime(modulePath, outputName) {
    // Create a bundle
    const bundle = await rollup({
        input: modulePath, // specify your entry file here
        plugins: [
            alias({
                entries: [
                  { find: './modules', replacement: path.join(app_dir, 'modules') }
                ]
            }),
            resolve({
                extensions: ['.js', '.mjs'],
                modulesOnly: true, // Ensure that only ES modules are resolved
            }), // allows Rollup to find external modules in node_modules
            commonjs(), // converts CommonJS modules to ES6
            terser()
        ],
    });
    // Generate the bundle as a string
    const { output } = await bundle.generate({
        format: 'iife',    // Use IIFE format to wrap the code in a function
        name: outputName, // name for the global variable
    });

    // Extract the bundled code
    const bundledCode = output[0].code;
    // Close the bundle
    await bundle.close();

    return bundledCode;
}


function toCamelCase(str) {
    return str
        .toLowerCase() // Convert the string to lower case
        .split(/[\s-_]+/) // Split by spaces, hyphens, or underscores
        .map((word, index) => {
            if (index === 0) {
                return word; // Return the first word as is (in lower case)
            }
            // Capitalize the first letter of each subsequent word
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(''); // Join all words together
}

console.log ("Building Sprout App...");

const app_dir = process.argv[2];
const build_dir = process.argv[3];

if (!app_dir || !build_dir) {
    console.log ("Usage: node sprout-build-app [app_src_directory] [app_build_directory] <--app [app name]> <--minify>");
    process.exit(0);
}
const components_dir = path.join(app_dir, 'components');

if (!fs.existsSync(build_dir)) {
    fs.mkdirSync(build_dir,  { recursive: true });
}
if (!fs.existsSync(components_dir)) {
    throw new Error(`Components directory not found at path: ${components_dir}`);
}

const templates = [];

function processComponentTemplate(templatePath, stylePath, runtimeScript, componentName) {
    try {
        const templateHTML = fs.readFileSync(templatePath, 'utf8');
        let style = "";
        if (fs.existsSync(stylePath)) {
            style = fs.readFileSync(stylePath, 'utf8');
        }
        let template = `<template app="${appName}" for="${componentName}">` + runtimeScript + `<style>${style}</style>` + templateHTML + '</template>';
        templates.push(template);

    } catch (err) {
        console.error("Error: ", err);
    }
}

async function getRuntimeScript(runtimePath, runtimeVariableName) {
    try {
        const runtimeScript = await bundleRuntime(runtimePath, runtimeVariableName);

        return `<script> ${runtimeScript} return ${runtimeVariableName}; </script>`;

    } catch (error) {
        console.warn(`Error reading runtime file: ${runtimePath}`, error);
        return "";
    }
}

async function buildComponents() {
    console.log ("Building components...");
    const componentFolders = fs.readdirSync(components_dir);

    return new Promise ( (resolve, reject)=> {
        const processPromises = componentFolders.map(async folder => {
            const componentName = folder;
            console.log(`Processing component ${componentName}...`);
            const folderPath = path.join(components_dir, folder);
      
            if (fs.statSync(folderPath).isDirectory()) {
              const templatePath = path.join(folderPath, 'template.html');
              const runtimePath = path.join(folderPath, 'runtime.js');
              const stylePath = path.join(folderPath, 'style.css');
              const runtimeScript = await getRuntimeScript(runtimePath, toCamelCase(componentName) + "Runtime");
              processComponentTemplate(templatePath, stylePath, runtimeScript, componentName);
            }
        });
      
        Promise.all(processPromises).then(() => {
            resolve();
        }).catch(reject);
    });
}

buildComponents()
.then(async ()=> {
    const html_path = path.join(app_dir, 'index.html');
    const head_path = path.join(app_dir, 'head.html');
    const style_path = path.join(app_dir, 'index.css');
    if (!fs.existsSync(html_path)) {
        throw new Error(`index.html file not found on app directory!`);
    }
    const htmlContent  = fs.readFileSync(html_path, 'utf8');

    let headContent = '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
    if (fs.existsSync(head_path)) {
        headContent  = fs.readFileSync(head_path, 'utf8');
    }
    let styleContent = "";
    if (fs.existsSync(style_path)) {
        styleContent = fs.readFileSync(style_path, 'utf8');
    }
    let global_runtime_script = "";
    const global_script_path = path.join (app_dir, "index.js");
    if (fs.existsSync(global_script_path)) {
        const scriptData = fs.readFileSync(global_script_path, 'utf8');
        const bundle = await rollup({
            input: 'entry', // specify your entry file here
            plugins: [
                alias({
                    entries: [
                      { find: './modules', replacement: path.join(app_dir, 'modules') }
                    ]
                }),
                virtual({
                    entry: scriptData, // specify your script data here
                }),
                resolve({
                    extensions: ['.js', '.mjs'],
                    modulesOnly: true, // Ensure that only ES modules are resolved
                }), // allows Rollup to find external modules in node_modules
                commonjs(), // converts CommonJS modules to ES6
                terser(),
            ]
        });
        // Generate the bundle as a string
        const { output } = await bundle.generate({
            format: 'es'
        })
        // Extract the bundled code
        let globalRuntimeScript = output[0].code;
        globalRuntimeScript = globalRuntimeScript.replace("(void 0)", "this");
        // Close the bundle
        await bundle.close();
        global_runtime_script = `<script app="${appName}"> ${appName}_runtime = function() { ${globalRuntimeScript} }</script>`;
    }
   

    console.log ("Building app HTML...");

    let html;
if (!process.argv.includes("--component")) {
    html = `
<!DOCTYPE html>
<html>
<head>
${styleContent ? `<style app="${appName}">` + styleContent + '</style>' : ""}
${global_runtime_script}
<script src="lib/sprout-core.js"></script>
<script>const build_${appName}App = SproutInitApp("${appName}");</script>
${templates.join("\n")}
${headContent}
<script>build_${appName}App();</script>
</head>
<body>
${htmlContent}
</body>
</html>
`;
}
else {
    html =
`<div>
${styleContent ? `<style for="${appName}">` + styleContent + '</style>' : ""}
${global_runtime_script}
<script src="lib/sprout-core.js"></script>
<script>const build_${appName}App = SproutInitApp("${appName}");</script>
${templates.join("\n")}
<script>build_${appName}App();</script>
${htmlContent}
`
}
    try {
        console.log ("Copying Sprout lib script files...");
        const lib_dir = path.join(build_dir, "lib");
        if (!fs.existsSync(lib_dir)) {
            fs.mkdirSync(lib_dir,  { recursive: true });
        }
        // TODO: add ability to config dist files location
        // fs.copyFileSync("./dist/sprout-build.js", path.join(lib_dir,"sprout-build.js"));
        // fs.copyFileSync("./dist/sprout-build.js.map", path.join(lib_dir,"sprout-build.js.map"));
        fs.copyFileSync("./dist/sprout-core.js", path.join(lib_dir,"sprout-core.js"));
        fs.copyFileSync("./dist/sprout-core.js.map", path.join(lib_dir,"sprout-core.js.map"));

        const modules_dir = path.join(app_dir, "modules");

        if (fs.existsSync(modules_dir)) {
            const targetModulesDir = path.join(build_dir, 'modules');
            // Create the target directory if it doesn't exist
            fs.mkdirSync(targetModulesDir, { recursive: true });

            fs.readdir(modules_dir, (err, files) => {
                if (err) {
                    console.error('Error reading modules directory:', err);
                    return;
                }

                // Filter and copy .mjs files
                files.forEach(file => {
                    if (path.extname(file) === '.mjs') {
                        const sourceFile = path.join(modules_dir, file);
                        const targetFile = path.join(targetModulesDir, file);

                        // Copy the file
                        fs.copyFile(sourceFile, targetFile, err => {
                            if (err) {
                                console.error('Error copying file:', err);
                            }
                        });
                    }
                });
            });
        }
        console.log ("Writing main HTML...");
        if (process.argv.includes("--minify")) {
            console.log ("Minifying");
            html = await minify(html, {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true
              });
        }
        fs.writeFileSync(path.join(build_dir, "index.html"), html);

        console.log ("App built successfully!");
    }
    catch (error) {
        console.error ("Error writing main HTML file:", error);
    }
});
