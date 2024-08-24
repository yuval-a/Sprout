

// This is the script that takes Template elements from the page and defines Reactive Custom Elements
export default function(appScope, appName) {

    // Create custom elements from templates
    async function defineElementFromTemplate(template, elemName, globalStyle) {
        const templateContent = document.importNode(template.content, true);
        const style = templateContent.querySelector('style');
        if (style) templateContent.removeChild(style);
        const runtime = templateContent.querySelector('script');
        if (runtime) templateContent.removeChild(runtime);
        customElements.define(
            elemName, 
            class extends appScope.ReactiveElement {
                constructor() {
                    super(templateContent, runtime, style?.textContent, globalStyle?.textContent);
                }
            }
        );
    }

    function build() {
        const globalStyle = document.querySelector(`head > style[app="${appName}"]`);
        Array.prototype.forEach.call(document.querySelectorAll(`template[app="${appName}"]`), template => {
            defineElementFromTemplate(template, template.getAttribute('for'), globalStyle);
        });
        if (typeof globalThis[`${appName}_runtime`] === 'function') {
            const globalRuntimeFunction = globalThis[`${appName}_runtime`];
            globalRuntimeFunction.call(appScope);
        }
    }

    build();
}