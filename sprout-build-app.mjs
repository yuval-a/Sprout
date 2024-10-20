import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import virtual from '@rollup/plugin-virtual';
import alias from '@rollup/plugin-alias';
import { minify } from 'html-minifier-terser';
import fs from 'fs';
import path from 'path';

const minifyOn = process.argv.includes("--minify");

const customElementsPolyfillScript = 
`!function(){"use strict";var e=function(e,t){var n=function(e){for(var t=0,n=e.length;t<n;t++)r(e[t])},r=function(e){var t=e.target,n=e.attributeName,r=e.oldValue;t.attributeChangedCallback(n,r,t.getAttribute(n))};return function(o,a){var l=o.constructor.observedAttributes;return l&&e(a).then((function(){new t(n).observe(o,{attributes:!0,attributeOldValue:!0,attributeFilter:l});for(var e=0,a=l.length;e<a;e++)o.hasAttribute(l[e])&&r({target:o,attributeName:l[e],oldValue:null})})),o}};function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function n(e,n){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(e))||n&&e&&"number"==typeof e.length){r&&(e=r);var o=0,a=function(){};return{s:a,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,i=!0,c=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){c=!0,l=e},f:function(){try{i||null==r.return||r.return()}finally{if(c)throw l}}}}` +
`var r=!0,o=!1,a="querySelectorAll",l="querySelectorAll",i=self,c=i.document,u=i.Element,s=i.MutationObserver,f=i.Set,d=i.WeakMap,h=function(e){return l in e},v=[].filter,p=function(e){var t=new d,i=function(n,r){var o;if(r)for(var a,l=function(e){return e.matches||e.webkitMatchesSelector||e.msMatchesSelector}(n),i=0,c=y.length;i<c;i++)l.call(n,a=y[i])&&(t.has(n)||t.set(n,new f),(o=t.get(n)).has(a)||(o.add(a),e.handle(n,r,a)));else t.has(n)&&(o=t.get(n),t.delete(n),o.forEach((function(t){e.handle(n,r,t)})))},p=function(e){for(var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=0,r=e.length;n<r;n++)i(e[n],t)},y=e.query,g=e.root||c,m=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:MutationObserver,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:["*"],c=function t(o,l,i,c,u,s){var f,d=n(o);try{for(d.s();!(f=d.n()).done;){var h=f.value;(s||a in h)&&(u?i.has(h)||(i.add(h),c.delete(h),e(h,u)):c.has(h)||(c.add(h),i.delete(h),e(h,u)),s||t(h[a](l),l,i,c,u,r))}}catch(e){d.e(e)}finally{d.f()}},u=new l((function(e){if(i.length){var t,a=i.join(","),l=new Set,u=new Set,s=n(e);try{for(s.s();!(t=s.n()).done;){var f=t.value,d=f.addedNodes,h=f.removedNodes;c(h,a,l,u,o,o),c(d,a,l,u,r,o)}}catch(e){s.e(e)}finally{s.f()}}})),s=u.observe;return(u.observe=function(e){return s.call(u,e,{subtree:r,childList:r})})(t),u}(i,g,s,y),w=u.prototype.attachShadow;return w&&(u.prototype.attachShadow=function(e){var t=w.call(this,e);return m.observe(t),t}),y.length&&p(g[l](y)),{drop:function(e){for(var n=0,r=e.length;n<r;n++)t.delete(e[n])},flush:function(){for(var e=m.takeRecords(),t=0,n=e.length;t<n;t++)p(v.call(e[t].removedNodes,h),!1),p(v.call(e[t].addedNodes,h),!0)},observer:m,parse:p}},y=self,g=y.document,m=y.Map,w=y.MutationObserver,b=y.Object,E=y.Set,S=y.WeakMap,A=y.Element,M=y.HTMLElement,O=y.Node,N=y.Error,C=y.TypeError,T=y.Reflect,q=b.defineProperty,D=b.keys,I=b.getOwnPropertyNames,P=b.setPrototypeOf,k=!self.customElements,L=function(e){for(var t=D(e),n=[],r=new E,o=t.length,a=0;a<o;a++){n[a]=e[t[a]];try{delete e[t[a]]}catch(e){r.add(a)}}return function(){for(var a=0;a<o;a++)r.has(a)||(e[t[a]]=n[a])}};if(k){var x=function(){var e=this.constructor;if(!$.has(e))throw new C("Illegal constructor");var t=$.get(e);if(W)return F(W,t);var n=H.call(g,t);return F(P(n,e.prototype),t)},H=g.createElement,$=new m,_=new m,j=new m,R=new m,V=[],U=p({query:V,handle:function(e,t,n){var r=j.get(n);if(t&&!r.isPrototypeOf(e)){var o=L(e);W=P(e,r);try{new r.constructor}finally{W=null,o()}}var a="".concat(t?"":"dis","connectedCallback");a in r&&e[a]()}}).parse,W=null,B=function(e){if(!_.has(e)){var t,n=new Promise((function(e){t=e}));_.set(e,{$:n,_:t})}return _.get(e).$},F=e(B,w);self.customElements={define:function(e,t){if(R.has(e))throw new N('the name "'.concat(e,'" has already been used with this registry'));$.set(t,e),j.set(e,t.prototype),R.set(e,t),V.push(e),B(e).then((function(){U(g.querySelectorAll(e))})),_.get(e)._(t)},get:function(e){return R.get(e)},whenDefined:B},q(x.prototype=M.prototype,"constructor",{value:x}),self.HTMLElement=x,g.createElement=function(e,t){var n=t&&t.is,r=n?R.get(n):R.get(e);return r?new r:H.call(g,e)},"isConnected"in O.prototype||q(O.prototype,"isConnected",{configurable:!0,get:function(){return!(this.ownerDocument.compareDocumentPosition(this)&this.DOCUMENT_POSITION_DISCONNECTED)}})}else if(k=!self.customElements.get("extends-br"))try{var z=function e(){return self.Reflect.construct(HTMLBRElement,[],e)};z.prototype=HTMLLIElement.prototype;var G="extends-br";self.customElements.define("extends-br",z,{extends:"br"}),k=g.createElement("br",{is:G}).outerHTML.indexOf(G)<0;var J=self.customElements,K=J.get,Q=J.whenDefined;self.customElements.whenDefined=function(e){var t=this;return Q.call(this,e).then((function(n){return n||K.call(t,e)}))}}catch(e){}if(k){var X=function(e){var t=ae.get(e);ve(t.querySelectorAll(this),e.isConnected)},Y=self.customElements,Z=g.createElement,ee=Y.define,te=Y.get,ne=Y.upgrade,re=T||{construct:function(e){return e.call(this)}},oe=re.construct,ae=new S,le=new E,ie=new m,ce=new m,ue=new m,se=new m,fe=[],de=[],he=function(e){return se.get(e)||te.call(Y,e)},ve=p({query:de,handle:function(e,t,n){var r=ue.get(n);if(t&&!r.isPrototypeOf(e)){var o=L(e);we=P(e,r);try{new r.constructor}finally{we=null,o()}}var a="".concat(t?"":"dis","connectedCallback");a in r&&e[a]()}}).parse,pe=p({query:fe,handle:function(e,t){ae.has(e)&&(t?le.add(e):le.delete(e),de.length&&X.call(de,e))}}).parse,ye=A.prototype.attachShadow;ye&&(A.prototype.attachShadow=function(e){var t=ye.call(this,e);return ae.set(this,t),t});var ge=function(e){if(!ce.has(e)){var t,n=new Promise((function(e){t=e}));ce.set(e,{$:n,_:t})}return ce.get(e).$},me=e(ge,w),we=null;I(self).filter((function(e){return/^HTML.*Element$/.test(e)})).forEach((function(e){var t=self[e];function n(){var e=this.constructor;if(!ie.has(e))throw new C("Illegal constructor");var n=ie.get(e),r=n.is,o=n.tag;if(r){if(we)return me(we,r);var a=Z.call(g,o);return a.setAttribute("is",r),me(P(a,e.prototype),r)}return oe.call(this,t,[],e)}q(n.prototype=t.prototype,"constructor",{value:n}),q(self,e,{value:n})})),g.createElement=function(e,t){var n=t&&t.is;if(n){var r=se.get(n);if(r&&ie.get(r).tag===e)return new r}var o=Z.call(g,e);return n&&o.setAttribute("is",n),o},Y.get=he,Y.whenDefined=ge,Y.upgrade=function(e){var t=e.getAttribute("is");if(t){var n=se.get(t);if(n)return void me(P(e,n.prototype),t)}ne.call(Y,e)},Y.define=function(e,t,n){if(he(e))throw new N("'".concat(e,"' has already been defined as a custom element"));var r,o=n&&n.extends;ie.set(t,o?{is:e,tag:o}:{is:"",tag:e}),o?(r="".concat(o,'[is="').concat(e,'"]'),ue.set(r,t.prototype),se.set(e,t),de.push(r)):(ee.apply(Y,arguments),fe.push(r=e)),ge(e).then((function(){o?(ve(g.querySelectorAll(r)),le.forEach(X,[r])):pe(g.querySelectorAll(r))})),ce.get(e)._(t)}}}();`
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
 
    const injectPolyfillIfNeeded =
`<script>
    customElements.define(
        "sprout-custom-div", 
        class SproutCustomDiv extends HTMLDivElement {},
        { extends: "div" }
    );

    // Check if supports custom native elements (Safari doesn't (October 2024)).
    // If it doesn't, inject polyfill
    const rDiv = document.createElement('div', {is: 'sprout-custom-div'});
    if (rDiv.constructor.name !== "SproutCustomDiv") {
        ${customElementsPolyfillScript}
    }
</script>
`;
    let html;

    const coreScriptSrc = `lib/${minifyOn ? 'sprout-core.min.js' : 'sprout-core.js'}`;
    // Safari doesn't support 'custom native elements' (using the 'is' attribute and 'extends' attribute)
    // Load a polyfill for this case
if (!process.argv.includes("--component")) {
    html = `
<!DOCTYPE html>
<html>
<head>
${injectPolyfillIfNeeded}
${styleContent ? `<style app="${appName}">` + styleContent + '</style>' : ""}
${global_runtime_script}
<link rel="preload" as="script" href=${coreScriptSrc}>
<script src="${coreScriptSrc}" ${process.argv.includes("--allowAppScopeAccess") ? 'allowappscopeaccess' : ''}></script>
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
`${injectPolyfillIfNeeded}
<div>
${styleContent ? `<style for="${appName}">` + styleContent + '</style>' : ""}
${global_runtime_script}
<link rel="preload" as="script" href=${coreScriptSrc}>
<script src="${coreScriptSrc}" ${process.argv.includes("--allowAppScopeAccess") ? 'allowappscopeaccess' : ''}></script>
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

        const dist_dir = "./dist";

        if (fs.existsSync(path.join(dist_dir,"sprout-core.js")))
            fs.copyFileSync(path.join(dist_dir,"sprout-core.js"), path.join(lib_dir,"sprout-core.js"));
        if (fs.existsSync(path.join(dist_dir,"sprout-core.min.js")))
            fs.copyFileSync(path.join(dist_dir,"sprout-core.min.js"), path.join(lib_dir,"sprout-core.min.js"));
        if (fs.existsSync(path.join(dist_dir,"sprout-core.js.map")))
            fs.copyFileSync(path.join(dist_dir,"sprout-core.js.map"), path.join(lib_dir,"sprout-core.js.map"));
        if (fs.existsSync(path.join(dist_dir,"sprout-core.min.js.map")))
            fs.copyFileSync(path.join(dist_dir,"sprout-core.min.js.map"), path.join(lib_dir,"sprout-core.min.js.map"));


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
        if (minifyOn) {
            console.log ("Minifying...");
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
