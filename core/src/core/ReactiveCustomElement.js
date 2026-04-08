import { GLOBAL_STATE_FUNCTION_NAME, DEFAULT_TEMPLATE_DOM, SHADOW_ROOT_CSS } from "../shared/consts.js";
import { queueBindEvents } from "../shared/paint_utils.js";
import { extendElementClassWithReactiveElementClass } from './ReactiveElement.js';
import { handleStateChange  } from "../shared/state_utils.js";
import { newStateManager } from "../Cougar/state_utils.js";

const SHADOW_CSS =  new CSSStyleSheet();
SHADOW_CSS.replaceSync(SHADOW_ROOT_CSS);

// Lifecycle:
// init: constructor
// mount: connectedCallback
// stateful: state is active
// active: stateful, events bound and after all commands run
// unmount: disconnectedCallback
export function getReactiveCustomElementClass(appScope = window) {
    const ReactiveHTMLElement = extendElementClassWithReactiveElementClass(HTMLElement, appScope);
    const StateManager = appScope.SPROUT_CONFIG.stateManagerClass;
    class ReactiveCustomElement extends ReactiveHTMLElement {

        // Important different between "host" and shadowRoot (we call root):
        // host is the DOM element of the custom element
        // that element contains Shadow DOM - Shadow DOM trees always have a "shadowRoot"
        // the shadowRoot is an extension of a DocumentFragment, accessible via this.shadowRoot

        // If this is part of a "mapped element" (an element where each child is mapped to a state item in an array),
        // created using the _map command - then this will contain the parent element
        ownerMapElement

        // Reactive state managed by a State Manager (Cougar by default)
        state 

        // This is a "fallback" for the key property for state objects used for maps,
        // the runtime uses this in cases where state is not active yet
        stateKey
        #wasMounted = false

        // Note! .state will not be available in init and mount!
        #lifecycle = {
            init: null,
            mount: null,
            stateful: null,
            active: null,
            unmount: null
        }

        #templateContent
        #stylesheet
        #globalStylesheet

        // This will be an object where keys are element "ref" names,
        // and the value is either a "click" event handler (if it's a function),
        // or an object with DOM event names as keys and event handlers as functions.
        // Only relevant for non native custom elements - event bubbling from child elements will be used
        events

        // A "mapped" version of events, where keys are event names and value
        // is a map where keys are ref target names and values are event handler function
        eventsMap = new Map();
        #eventHandler
        
        // These are attributes of child elements that are bound to "Prop Attributes",
        // Keys are attribute names, and values are set of Attribute Nodes
        propAttributes = new Map();

        // Uses Declrative Shadow DOM
        #usesDSD = false;
        #settings
        commands
        // Maps "ref names" to actual elements in the component DOM tree,
        // for fast access.
        ref = {};

        canonicalTagName;

        constructor(template=null, runtime, style, globalStylesheet, usesDSD = false) {
            super();
            const isFrameworkElement = this.tagName === "CONDITIONAL-ELEMENT";
            if (isFrameworkElement) return;

            this.isNativeElement = false;
            this.#usesDSD = usesDSD;

            if (globalStylesheet) {
                this.#globalStylesheet = globalStylesheet;
            }

            this.canonicalTagName = this.localName;
            if (!this.#usesDSD) {
                if (style) {
                    const stylesheet = new CSSStyleSheet();
                    stylesheet.replaceSync(style);
                    this.#stylesheet = stylesheet;
                }

                // Using importNode instead of node.cloneNode,
                // so if a template includes other custom elements,
                // they will already be defined. (See cloneNode on MDN) 
                this.#templateContent = 
                    template ?
                    document.importNode(template, true) :
                    document.importNode(DEFAULT_TEMPLATE_DOM, true);

                this.#renderTemplate();
            }
            else {
                // Declartive Shadow DOM (DSD) elements have a '-dsd' at the end of their tag name
                this.canonicalTagName = this.localName.substring(0, this.localName.indexOf('-dsd'));
            }

            if (runtime) {
                this.#setRuntime(runtime);
            }

            if (this.#lifecycle.init) this.#lifecycle.init.call(this);
        }

        #setRuntime(runtime) {
            this.#settings = runtime.settings;
            this.commands = runtime.commands;
            if (runtime.events) {
                const setRefEvent = (eventName, refName, eventHandler)=> {
                    if (!this.eventsMap.has(eventName)) {
                        this.eventsMap.set(eventName, new Map());
                    }
                    const eventMapItem = this.eventsMap.get(eventName);
                    eventMapItem.set(refName, eventHandler);
                }

                let eventsObjectValue, typeOfValue;
                for (const refName in runtime.events) {
                    eventsObjectValue = runtime.events[refName];
                    typeOfValue = typeof eventsObjectValue;
                    if (typeOfValue === "function") {
                        setRefEvent("click", refName, eventsObjectValue);
                    }
                    else if (typeOfValue === "object") {
                        for (const eventName in eventsObjectValue) {
                            setRefEvent(eventName, refName, eventsObjectValue[eventName]);
                        }
                    }
                }

                if (this.isConnected) this.#bindEvents();
            }
            if (runtime.state) {
                this.setInitialState(runtime.state);
                // Upgraded custom elements can be "connected" while still inside constructor.
                // Activating state there creates a first state tree before mount/stateful run,
                // then connectedCallback creates a second one and orphanes existing bindings.
                if (this.isConnected && this.#wasMounted && !this.state) {
                    this.#setActiveStateFromInitialState();
                }
            }
            for (const lifecycleEvent in this.#lifecycle) {
                if (runtime.hasOwnProperty(lifecycleEvent)) {
                    this.#lifecycle[lifecycleEvent] = runtime[lifecycleEvent];
                }
            }
        }

        setInitialState(initState) {
            if (this.initialState) {
                Object.assign(this.initialState, initState);
            }
            else {
                this.initialState = initState;
            }
            if (initState.hasOwnProperty("key")) this.stateKey = initState.key;
        }
        #setActiveStateFromInitialState() {
            if (!this.initialState || this.state?._isActive) return;
            const initialState = this.initialState;
            if (initialState._stateManager) {
                this.state = initialState._stateManager.state;
            }
            else {
                const stateManager = newStateManager(initialState, undefined, undefined, handleStateChange, false, appScope);
                this.state = stateManager.state;
                this.state.$host = this; 
            }
            // delete this.initialState;
            this.state._isActive = true;
        }

        #renderTemplate() {
            if (appScope.SPROUT_CONFIG.useShadow) {
                this.attachShadow({ 
                    mode: "open",
                    delegatesFocus: true,
                });
                this.shadowRoot.adoptedStyleSheets = [ SHADOW_CSS ];
                if (this.#globalStylesheet) this.shadowRoot.adoptedStyleSheets.push(this.#globalStylesheet);
                if (this.#stylesheet) this.shadowRoot.adoptedStyleSheets.push(this.#stylesheet);
                this.shadowRoot.appendChild(this.#templateContent);
            }
            else {
                const fragment = new DocumentFragment();
                fragment.appendChild(this.#templateContent);
                this.appendChild(fragment);
            }
        }

        #unbindEvents() {
            if (!this.eventsMap.size) return;
            const thiselement = this;
            for (const eventName of this.eventsMap.keys()) {
                thiselement.shadowRoot.removeEventListener(eventName, this.#eventHandler, false);
            }
        }

        #bindEvents() {
            if (this.#eventHandler) return;
            if (!this.eventsMap.size) return;
            const globalState = appScope[GLOBAL_STATE_FUNCTION_NAME]();
            // This runs in the scope of shadowRoot
            this.#eventHandler = function(event) {
                const host = this.host;
                const eventsMapItem = host.eventsMap.get(event.type);
                if (!eventsMapItem) return false;

                const eventsPath = event.composedPath();
                for (const element of eventsPath) {
                    if (element && 
                        element.refName &&
                        eventsMapItem.has(element.refName)
                    ) {
                        const targetElement = element;
                        const targetRefName = targetElement.refName;
                        const eventHandler = eventsMapItem.get(targetRefName);
                        eventHandler.call(targetElement, event, host, globalState);
                    }
                }
                event.stopPropagation();
            };

            for (const eventName of this.eventsMap.keys()) {
                this.shadowRoot.addEventListener(eventName, this.#eventHandler, { capture: true });
            }
        }

        disconnectedCallback() {
            this.#unbindEvents();
            this.state = undefined;
            this.isActive = false;
            if (this.#lifecycle.unmount) this.#lifecycle.unmount.call(this);
        }

        activate() {
           super.activate();
           this.#bindEvents();
           if (this.#lifecycle.active) this.#lifecycle.active.call(this);
        }

        // Override findElement to scope lookups to this component instance,
        // not its parent host. This ensures nested components resolve their own refs.
        findElement(refName) {
            const host = this;
            let root = this;
            if (appScope.SPROUT_CONFIG.useShadow) {
                root = host.shadowRoot;
            }
            return Object.hasOwn(host.ref, refName)
                ? host.ref[refName]
                : root?.querySelector?.(`[ref="${refName}"]`) || null;
        }
        connectedCallback() {
            // We set this for easier/straightforward access (e.g. with querySelector); 
            this.setAttribute("tagName", this.canonicalTagName);

            if (this.#wasMounted) return;
            // IMPORTANT: THIS *CAN* be NULL, DO NOT CHANGE IT!
            // It is to check if the custom element is inside a shadow DOM
            // of ANOTER parent custom element - 
            // if this is the case - getRootNode() will return the shadowRoot,
            // of the outer CE - and it will have a host property - referencing
            // the containing CE, if not it will just return document and .host
            // will be null
            const host = this.getRootNode().host;

            if (this.#lifecycle.mount) this.#lifecycle.mount.call(this);
            //if (!this.#usesDSD) {
            //    this.#renderTemplate();
            //}

            const doActivate = ()=> {
                this.#setActiveStateFromInitialState();
                this.isActive = true;
                this.dispatchEvent( new CustomEvent("active") );
                if (this.#lifecycle.stateful) this.#lifecycle.stateful.call(this);
                this.activate();
            }
            // Custom Elements can also be inside 
            // the Shadow DOM of other custom elements,
            // in which case - we need to wait for their host to be active first
            // We async queue using setTimeout (NOT rAF or queueMicrotrask!) -
            // To allow full paint of the elements to finish first,
            // and then hydrate
            if (host) {
                if (host.isActive) doActivate();
                else host.addEventListener(
                    "active",
                    doActivate,
                    { once: true }
                );
            }
            else {
                setTimeout(doActivate, 0);
            }
            this.#wasMounted = true;
        }

        attributeChangedCallback(attributeName, oldValue, newValue) {
            if (oldValue === newValue) return;
            if (attributeName === "hidden") {
                if (newValue === null) {
                    this.dispatchEvent(
                        new CustomEvent("unhide", { bubbles: true })
                    );
                }
                else {
                    this.dispatchEvent(
                        new CustomEvent("hide", { bubbles: true })
                    );
                }
            }
            if (this.propAttributes.has(attributeName)) {
                const propAttributeNodes = this.propAttributes.get(attributeName);
                propAttributeNodes.forEach(attrNode=> {
                    attrNode.nodeValue = newValue;
                    if (attrNode.ownerElement.tagName === "CONDITIONAL-RENDER") {
                        attrNode.ownerElement.render();
                    }
                });
            }
        }
    }


    return ReactiveCustomElement;
}
