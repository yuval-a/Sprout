import { COMMANDS as COMMAND_ATTRIBUTES } from "./commands.js";
import { BOOLEAN_ATTRIBUTES, SUPPORTED_ATTRIBUTES_FOR_BINDING, GLOBAL_STATE_FUNCTION_NAME, DEFAULT_TEMPLATE_DOM } from "./consts.js";
import { setAttribute, setStateAttribute, setStateText } from "./state_utils.js";
import StateManager from "./StateManager.js";
import { queueActivate, queueBindEvents } from "./paint_utils.js";
import { extendElementClassWithReactiveElementClass } from './ReactiveElement.js';

export function getReactiveCustomElementClass(appScope = window) {
    const ReactiveHTMLElement = extendElementClassWithReactiveElementClass(HTMLElement, appScope);
    const StateManager = appScope.SPROUT_CONFIG.stateManagerClass;
    class ReactiveCustomElement extends ReactiveHTMLElement {
        // Should contain the "root" DOM element containing this element
        host = null

        #wasMounted = false

        // Callback function for when the element is connected to a DOM tree on the page and rendered
        #onMount
        // Callback function for when the element is connected to a DOM tree on the page, just before render
        #beforeRender
        // Callback function for when the element is connected to a DOM tree on the page, just after render,
        // before state/reactivity activation
        #afterRender
        // Should only be used on non native custom elements
        #templateContent
        #stylesheet
        #globalStylesheet
        // This will be an object where keys are element "ref" names,
        // and the value is either a "click" event handler (if it's a function),
        // or an object with DOM event names as keys and event handlers as functions.
        // Only relevant for non native custom elements - event bubbling from child elements will be used
        events

        // Name of events that are bound to the main event handler function
        #boundEventNames = [];
        // Main event handler function 
        #eventHandler

        propAttributes = new Map();
        constructor(template=null, runtimeScript, style, globalStylesheet) {
            super();
            const isFrameworkElement = this.tagName === "CONDITIONAL-ELEMENT";
            if (isFrameworkElement) return;

            if (runtimeScript) {
                const dynamicRuntimeFn = new Function(runtimeScript.textContent);
                const runtime = dynamicRuntimeFn();
                this.#setRuntime(runtime);
            }

            if (style) {
                const stylesheet = new CSSStyleSheet();
                stylesheet.replaceSync(style);
                this.#stylesheet = stylesheet;
            }
            if (globalStylesheet) {
                this.#globalStylesheet = globalStylesheet;
            }

            this.#templateContent = 
                template?.cloneNode(true) ||
                DEFAULT_TEMPLATE_DOM.cloneNode();
            // Maps "ref names" to actual elements in the component DOM tree,
            // for fast access.
            this.ref = {};
        }

        #setRuntime(runtime) {
            if (runtime.events) {
                this.events = runtime.events;
                if (this.isConnected) this.#bindEvents();
            }
            if (runtime.state) {
                this.setInitialState(runtime.state);
                // If this is not mounted yet, #setStateFromInitialState will be called from onConnected callback
                if (this.isConnected) this.#setActiveStateFromInitialState();
            }
            if (runtime.onMount) {
                this.#onMount = runtime.onMount;
            }
            if (runtime.beforeRender) {
                this.#beforeRender = runtime.beforeRender;
            }
        }

        setInitialState(initState) {
            if (this.initialState) {
                Object.assign(this.initialState, initState);
            }
            else {
                this.initialState = initState;
            }
        }

        #setActiveStateFromInitialState() {
            if (!this.initialState) return;
            const initialState = this.initialState;
            if (initialState._stateManager) {
                this.state = initialState._stateManager.state;
            }
            else {
                this.state = new StateManager(initialState, undefined, undefined, false, appScope).state;
            }
            delete this.initialState;
        }

        #renderTemplate() {
            if (appScope.SPROUT_CONFIG.useShadow) {
                const shadowRoot = this.attachShadow({ mode: "open" });
                this.shadowRoot.adoptedStyleSheets = [];
                if (this.#globalStylesheet) this.shadowRoot.adoptedStyleSheets.push(this.#globalStylesheet);
                if (this.#stylesheet) this.shadowRoot.adoptedStyleSheets.push(this.#stylesheet);
                shadowRoot.appendChild(this.#templateContent);
            }
            else {
                const fragment = new DocumentFragment();
                fragment.appendChild(this.#templateContent);
                this.appendChild(fragment);
            }
        }

        #unbindEvents() {
            if (!this.#boundEventNames.length) return;
            const thiselement = this;
            this.#boundEventNames.forEach(eventName=> {
                thiselement.removeEventListener(eventName, this.#eventHandler, false);
            });

        }
        #bindEvents() {
            if (!this.events) return;
            const eventRefNames = Object.keys(this.events);
            const clickActions = {};
            const otherActions = {};
            eventRefNames.forEach(refName=> {
                const value = this.events[refName];
                if (typeof value === 'function') {
                    clickActions[refName] = value;
                }
                else if (typeof value === 'object') {
                    const eventNames = Object.keys(value);
                    eventNames.forEach(eventName=> {
                        if (eventName === 'click') {
                            clickActions[refName] = value[eventName];
                        }
                        else {
                            if (!otherActions[eventName]) otherActions[eventName] = {};
                            otherActions[eventName][refName] = value[eventName];
                        }
                    });
                }
            });
            const globalState = appScope[GLOBAL_STATE_FUNCTION_NAME]();
            this.#eventHandler = function(event) {
                const start = performance.now();
                const elementsPath = event.composedPath();
                let target;
                if (elementsPath) {
                    target = elementsPath.find(element => element.hasAttribute && element.hasAttribute('ref') && (element.getAttribute('ref') in this.events));
                }
                else {
                    target = (event.target.hasAttribute && event.target.hasAttribute('ref') && (event.target.getAttribute('ref') in this.events)) ? event.target : null;
                }
                if (target) {
                    const ref = target.getAttribute('ref');
                    const eventName = event.type;
                    if (eventName === "click") {
                        const clickEvent = typeof this.events[ref] === "function" ? this.events[ref] : null;
                        clickEvent?.call(target, event, event.target, globalState);
                    }
                    else {
                        this.events[ref][eventName]?.call(target, event, event.target, globalState);
                    }
                }
            }

            const thiselement = this;
            if (Object.keys(clickActions).length) {
                thiselement.addEventListener('click', this.#eventHandler);
                this.#boundEventNames.push('click');
            }
            const eventNames = Object.keys(otherActions);
            for (const eventName of eventNames)
                thiselement.addEventListener(eventName, this.#eventHandler);
            this.#boundEventNames.push(...eventNames);
        }

        disconnectedCallback() {
            this.#unbindEvents();
            this.state = undefined;
        }

        activate() {
            const attributeNames = this.getAttributeNames();
            for (const attrName of attributeNames) {
                const attrValue = this.getAttribute(attrName);
                // This also resolves "State attributes"
                this.initialSetAttribute(attrName, attrValue);
            }

            queueBindEvents(this, ()=> this.#bindEvents());
            if (this.#onMount) queueMicrotask(()=> this.#onMount.call(this, appScope[GLOBAL_STATE_FUNCTION_NAME]()));
        }
        connectedCallback() {
            if (this.#wasMounted) return;
            // IMPORTANT: THIS *CAN* be NULL, DO NOT CHANGE IT!
            // It is part of the way a check is made to see if an element is part of ShadowDOM!
            // host will be null if the element is part of the DOM === the "root" custom element will have null in .host
            // THIS SHOULD BE THE FIRST THING THAT HAPPENS!
            this.host = this.getRootNode().host;
            if (this.#beforeRender) this.#beforeRender.call(this, appScope[GLOBAL_STATE_FUNCTION_NAME]());
            this.#renderTemplate();
            if (this.#afterRender) this.#afterRender.call(this, appScope[GLOBAL_STATE_FUNCTION_NAME]());

            queueMicrotask(()=> {
                this.#setActiveStateFromInitialState();
                this.dispatchEvent(
                    new CustomEvent("connected"),
                );
                this.activate();
            });
            this.#wasMounted = true;
        }

        attributeChangedCallback(attributeName, oldValue, newValue) {
            if (oldValue === newValue) return;
            if (this.propAttributes.has(attributeName)) {
                const propAttributeNodes = this.propAttributes.get(attributeName);
                propAttributeNodes.forEach(attrNode=> attrNode.nodeValue = newValue);
            }
        }

    }

    return ReactiveCustomElement;
}
