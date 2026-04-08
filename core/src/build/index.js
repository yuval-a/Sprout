import { SPROUT_FROZEN_CLASS_CSS } from "../shared/consts";

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


// This is the script that takes Template elements from the page and defines Reactive Custom Elements
export default function(appScope, appName) {

    async function defineCustomElementFromScript(elemName, globalStylesheet) {
        const runtimeFnName = `SPROUT_${toCamelCase(elemName)}_Runtime`;
        const runtimeFn = globalThis[runtimeFnName];
        customElements.define(
            elemName, 
            class extends appScope.ReactiveCustomElement {
                constructor() {
                    super(undefined, runtimeFn, undefined, globalStylesheet);
                }
            }
        );

        // Also define the -dsd variation - to support Declartive Shadow DOM
        customElements.define(
            `${elemName}-dsd`, 
            class extends appScope.ReactiveCustomElement {
                constructor() {
                    super(undefined, runtimeFn, undefined, globalStylesheet);
                }
            }
        );

        delete window[runtimeFnName];

    }

    // Create custom elements from templates
    async function defineCustomElementFromTemplate(template, elemName, globalStylesheet) {
        let templateContent, style, runtime;
        templateContent = template.content;
        style = templateContent.querySelector('style');
        if (style) templateContent.removeChild(style);
        const runtimeScript = templateContent.querySelector('script');
        if (runtimeScript) {
            const runtimeCode = runtimeScript.textContent;
            // Remove from template so it won't be stamped into the DOM
            templateContent.removeChild(runtimeScript);
            if (runtimeCode && runtimeCode.trim().length !== 0) {
                try {
                    runtime = Function(runtimeCode)();
                } catch (e) {
                    console.warn(`Failed to evaluate runtime for ${elemName} from template script`, e);
                }
            }
        }

        customElements.define(
            elemName, 
            class extends appScope.ReactiveCustomElement {
                constructor() {
                    super(templateContent, runtime, style?.textContent, globalStylesheet);
                }
            }
        );

        // Also define the -dsd variation - to support Declartive Shadow DOM
        customElements.define(
            `${elemName}-dsd`, 
            class extends appScope.ReactiveCustomElement {
                constructor() {
                    super(templateContent, runtime, null, globalStylesheet, true);
                }
            }
        );
    }

    function build() {
        
        let globalStylesheet = new CSSStyleSheet();
        const globalStyle = document.querySelector(`head > style[app="${appName}"]`);
        if (globalStyle) {
            globalStylesheet.replaceSync(globalStyle.textContent);
        }
        else {
            // Compile-mode fallback: use in-memory compiled global styles if present
            const compiledStyle = globalThis.SPROUT_COMPILED_STYLES?.[appName];
            globalStylesheet.replaceSync(compiledStyle || "");
        }
        // This is used when mutating the children of a DOM parent (on-the-fly),
        // the parent is "frozen" first - to not trigger events etc.
        // Used when handling changes to State Maps
        globalStylesheet.insertRule(SPROUT_FROZEN_CLASS_CSS);
        if (typeof globalThis[`${appName}_runtime`] === 'function') {
            const globalRuntimeFunction = globalThis[`${appName}_runtime`];
            globalRuntimeFunction.call(appScope);
        }

        /*
        if (appScope.SPROUT_CONFIG.useDSD) {
            Array.prototype.forEach.call(document.querySelectorAll(`script[app="${appName}"]`), script => {
                defineCustomElementFromTemplate(script, script.getAttribute('for'), globalStylesheet);
            });
        }
        else {
        */
        const compiledTemplates = globalThis.SPROUT_COMPILED_TEMPLATES?.[appName];
        if (compiledTemplates && typeof compiledTemplates.forEach === 'function') {
            compiledTemplates.forEach((templateEl, componentName) => {
                if (componentName && templateEl) {
                    defineCustomElementFromTemplate(templateEl, componentName, globalStylesheet);
                }
            });
        }
        else {
            Array.prototype.forEach.call(document.querySelectorAll(`template[app="${appName}"]`), template => {
                const componentName = template.getAttribute('for');
                if (componentName) {
                    defineCustomElementFromTemplate(template, componentName, globalStylesheet);
                }
            });
        }

        //}
    }
    build();
}
