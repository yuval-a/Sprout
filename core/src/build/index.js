

// This is the script that takes Template elements from the page and defines Reactive Custom Elements
export default function(appScope, appName) {

    // Create custom elements from templates
    async function defineCustomElementFromTemplate(template, elemName, globalStylesheet) {
        const templateContent = document.importNode(template.content, true);
        const style = templateContent.querySelector('style');
        if (style) templateContent.removeChild(style);
        const runtime = templateContent.querySelector('script');
        if (runtime) templateContent.removeChild(runtime);

        customElements.define(
            elemName, 
            class extends appScope.ReactiveCustomElement {
                constructor() {
                    super(templateContent, runtime, style?.textContent, globalStylesheet);
                }
            }
        );
    }

    function build() {
        let globalStylesheet;
        const globalStyle = document.querySelector(`head > style[app="${appName}"]`);
        if (globalStyle) {
            globalStylesheet = new CSSStyleSheet();
            globalStylesheet.replaceSync(globalStyle.textContent);
        }
        Array.prototype.forEach.call(document.querySelectorAll(`template[app="${appName}"]`), template => {
            defineCustomElementFromTemplate(template, template.getAttribute('for'), globalStylesheet);
        });
        if (typeof globalThis[`${appName}_runtime`] === 'function') {
            const globalRuntimeFunction = globalThis[`${appName}_runtime`];
            globalRuntimeFunction.call(appScope);
        }
    }
    build();
}