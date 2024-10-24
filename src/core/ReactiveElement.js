import { COMMANDS as COMMAND_ATTRIBUTES } from "./commands.js";
import { BOOLEAN_ATTRIBUTES, SUPPORTED_ATTRIBUTES_FOR_BINDING, GLOBAL_STATE_FUNCTION_NAME } from "./consts.js";
import { setAttribute, setStateAttribute, setStateText } from "./state_utils.js";
import StateManager from "./StateManager.js";
import { putObjectInDebugMode } from "./debug_utils.js";
import { DEBUG_MODE } from "./consts.js";

export function extendElementClassWithReactiveElementClass(elementClass, appScope = window, noRender = false) {
    class ReactiveElement extends elementClass {
        // Should contain the "root" DOM element containing this element
        host = null
        // Callback function for when the element is connected to a DOM tree on the page
        #onMount
        #wasMounted = false
        // Used for the _bind command, which allows "reverse-binding" attribute values to state props,
        // keys are attribute names, values are state prop names
        #boundAttributesToState = {}

        // Should only be used on non native custom elements
        #templateContent
        #stylesheet
        #globalStylesheet
        // This will be an object where keys are element "ref" names,
        // and the value is either a "click" event handler (if it's a function),
        // or an object with DOM event names as keys and event handlers as functions.
        // Only relevant for non native custom elements - event bubbling from child elements will be used
        #events

        // Name of events that are bound to the main event handler function
        #boundEventNames = [];

        // Main event handler function 
        #eventHandler
        // Special case to handle input change events (to make them bubble up from shadow DOM)
        #changeEventHandler
        static observedAttributes = ["ref"]
                                    .concat(SUPPORTED_ATTRIBUTES_FOR_BINDING)
                                    .concat(Object.keys(COMMAND_ATTRIBUTES).map(command => ('_' + command.toLowerCase())));


        constructor(template=null, runtimeScript, style, globalStyle) {
            super();
            this.isReactiveElement = true;
            this.isNativeElement = this.hasAttribute("is");

            if (!this.isNativeElement) {
                this.#templateContent = document.createElement("div");
                if (runtimeScript) {
                    const dynamicRuntimeFn = new Function(runtimeScript.textContent);
                    const runtime = dynamicRuntimeFn();
                    this.#setRuntime(runtime);
                }
    
                // Should already be a DocumentFragment of the template
                if (template) { 
                    this.#templateContent = template.cloneNode(true);
                }

                if (style) {
                    const stylesheet = new CSSStyleSheet();
                    stylesheet.replaceSync(style);
                    this.#stylesheet = stylesheet;
                }
                if (globalStyle) {
                    const globalStylesheet = new CSSStyleSheet();
                    globalStylesheet.replaceSync(globalStyle);
                    this.#globalStylesheet = globalStylesheet;
                }
                // Maps "ref names" to actual elements in the component DOM tree,
                // for fast access.
                this.ref = {};
            }
        }

        #setRuntime(runtime) {
            if (runtime.events) {
                this.#events = runtime.events;
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
                (this.attachShadow({ mode: 'open' }))
                .appendChild(this.#templateContent);
            }
            else {
                const fragment = new DocumentFragment();
                fragment.appendChild(this.#templateContent);
                this.appendChild(fragment);
            }
        }

        #unbindEvents() {
            if (this.#changeEventHandler) this.removeEventListener('change', this.#changeEventHandler);
            if (!this.#boundEventNames.length) return;
            const thiselement = this;
            this.#boundEventNames.forEach(eventName=> {
                thiselement.removeEventListener(eventName, this.#eventHandler, false);
            });

        }
        #bindEvents() {
            if (!this.#events) return;
            const eventRefNames = Object.keys(this.#events);
            const clickActions = {};
            const otherActions = {};
            eventRefNames.forEach(refName=> {
                const value = this.#events[refName];
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
            this.#eventHandler = function(event, eventsObject) {
                const elementsPath = event.composedPath();
                let target;
                if (elementsPath) {
                    target = elementsPath.find(element => element.hasAttribute && element.hasAttribute('ref') && (element.getAttribute('ref') in eventsObject));
                }
                else {
                    target = (event.target.hasAttribute && event.target.hasAttribute('ref') && (event.target.getAttribute('ref') in eventsObject)) ? event.target : null;
                }
                if (target) {
                    const ref = target.getAttribute('ref');
                    eventsObject[ref]?.call(target, event, event.target, globalState);
                }
            }

            const thiselement = this;
            if (Object.keys(clickActions).length) {
                thiselement.addEventListener('click', (event)=> {
                    this.#eventHandler(event, clickActions);
                }, false);
                this.#boundEventNames.push('click');
            }
            const eventNames = Object.keys(otherActions);
            for (const eventName of eventNames) {
                thiselement.addEventListener(eventName, (event)=> {
                    this.#eventHandler(event, otherActions[eventName]);
                }, false);
            }
            this.#boundEventNames.push(...eventNames);
        }

        bindAttributeToState(attrName, statePropName) {
            this.#boundAttributesToState[attrName] = statePropName;
        }
        unbindAttributeToState(attrName) {
            delete this.#boundAttributesToState[attrName];
        }
        
        // For input elements
        updateStateFromProperty(propertyName) {
            let newValue = this[propertyName];
            const stateProp = this.#boundAttributesToState[propertyName];
            const [stateValue, theState] = this.getState(stateProp, true);
            if (stateValue !== newValue) theState[stateProp] = newValue;

        }

        #updateStateFromAttribute(attributeName) {
            let newValue = this.getAttribute(attributeName);
            if (BOOLEAN_ATTRIBUTES.includes(attributeName)) {
                if (newValue === null) newValue = false;
                else newValue = true;
            }
            const stateProp = this.#boundAttributesToState[attributeName];
            const [stateValue, theState] = this.getState(stateProp, true);
            if (stateValue !== newValue) theState[stateProp] = newValue;
        }
        disconnectedCallback() {
            const host = this.host ?? this;
            const refEntries = Object.entries(host.ref);
            // Delete this element from ref object of host
            for (let i = 0, len = refEntries.length; i < len; i++ ) {
                const [refName, refElem] = refEntries[i];
                if (refElem === this) {
                    delete (host.ref[refName]);
                    break;
                }
            }

            this.#boundAttributesToState = {};
            this.#unbindEvents();
        }

        connectedCallback() {
            if (this.#wasMounted) return;

            if (!this.isNativeElement) {
                this.#setActiveStateFromInitialState();
            }

            // IMPORTANT: THIS *CAN* be NULL, DO NOT CHANGE IT!
            // It is part of the way a check is made to see if an element is part of ShadowDOM!
            // host will be null if the element is part of the DOM === the "root" custom element will have null in .host
            this.host = this.getRootNode().host;

            const commands = [];
            for (const attrName of this.getAttributeNames()) {
                const attrValue = this.getAttribute(attrName);
                // This also resolves "State attributes"
                this.initialSetAttribute(attrName, attrValue);

                // Save "Command attributes"
                if (attrName.indexOf('_') === 0) {
                    const command = attrName.substring(1);
                    commands.push({ command, args: attrValue });
                    // COMMAND_ATTRIBUTES[command]?.call(this, attrValue);
                }
            } 

            commands.forEach(({ command, args})=> {
                COMMAND_ATTRIBUTES[command]?.call(this, args);
            });

            // Keep it here and not in bindEvents! 
            if (this?.tagName === "INPUT") {
                this.#changeEventHandler = function() {
                    const changeEvent = new Event('inputChange', { bubbles: true, composed: true });
                    this.dispatchEvent(changeEvent);
                }
                // Change events does not automatically bubbles, we need to listen and bubble up a new event
                this.addEventListener('change', this.#changeEventHandler, false);
            }

            if (!this.isNativeElement) {
                if (!noRender) {
                    this.#renderTemplate();
                    this.shadowRoot.adoptedStyleSheets = [];
                    if (this.#stylesheet) this.shadowRoot.adoptedStyleSheets.push(this.#stylesheet);
                    if (this.#globalStylesheet) this.shadowRoot.adoptedStyleSheets.push(this.#globalStylesheet);
                }
                requestAnimationFrame(()=> this.#bindEvents());
                if (this.#onMount) this.#onMount.call(this, appScope[GLOBAL_STATE_FUNCTION_NAME]());
            }

            this.#wasMounted = true;
        }

        attributeChangedCallback(attributeName, oldValue, newValue) { 
            if (oldValue === newValue) return;
            if (!this.isConnected) return;

            if (attributeName === "ref") {
                const host = this.isNativeElement ? this.host : this;
                const refValue = newValue;
                host.ref[refValue] = this;
            }

            if (attributeName in this.#boundAttributesToState) {
                this.#updateStateFromAttribute(attributeName);
            }
    
        }

        // Gets state value of stateProp,
        // tries to resolve from local state(s) first,
        // and then from global. If the second argument is true, returns both the state value and the state objec
        getState(stateProp, returnStateObject=false) {
            let theState;
            // If this is a reactive element inside a reactive web component - the host should be the containing web component - 
            // we should reference its state, if host is null - it is most likely the host web component
            let thisInstance = this.isNativeElement && this.host ? this.host : this;
            // if (!thisInstance) return returnStateObject ? [undefined, undefined] : undefined;

            let stateVal;
            if (thisInstance && thisInstance.state) {
                stateVal = thisInstance.state?.[stateProp];
            }

            let globalState = false;
            while (stateVal === undefined && typeof thisInstance.host !== 'undefined' && thisInstance.host !== null) {
                thisInstance = thisInstance.host;
                stateVal = thisInstance.state?.[stateProp];
            }

            if (stateVal !== undefined) theState = thisInstance.state;
            else {
                globalState = appScope[GLOBAL_STATE_FUNCTION_NAME]();
                stateVal = globalState?.[stateProp];
                if (stateVal !== undefined) theState = globalState;
            } 
            if (returnStateObject) {
                return [stateVal, theState];
            }
            return stateVal;
        }
        
        findElement(refName) {
            const host = this.isNativeElement ? this.host : this;
            // if Shadow DOM is used, the "root" element is shadowRoot, otherwise it is the 
            // web component itself
            let root = host;
            if (appScope.SPROUT_CONFIG.useShadow) {
                root = host.shadowRoot;
            }
            return host.ref.hasOwnProperty(refName) ? host.ref[refName] : root.querySelector(`[ref="${refName}"]`);
        }
        //static get observedAttributes() { return ["todo-name"]; }
    }

    // The "initialSetX" functions are called:
    // 1. When a custom element instance is first created (before it's connected) - 
    // state attribute values are set to their state prop names (e.g: '$name').
    // 2. When a custom element instance becomes connected (added to the DOM) - state attribute values are actually resolved to the
    // value of their respective state prop values, and binding between them occurs.
    ReactiveElement.prototype.initialSetText = function (stateProp) {
        setStateText.call(this, stateProp);
    }
    ReactiveElement.prototype.initialSetAttribute = function (attributeName, attributeValue) {
        attributeValue = String(attributeValue);
        let valueToSet = attributeValue;
        // "State attribute"
        if (attributeValue.indexOf('$') === 0 && attributeName.indexOf('_') !== 0 && this.isConnected)  {
            let stateProp = attributeValue.substring(1);
            setStateAttribute.call(this, attributeName, stateProp);
        }
        // normal attribute
        else {
            setAttribute.call(this, attributeName, valueToSet);
        }
    }

    /*
    if (DEBUG_MODE) {
        const descriptors = Object.getOwnPropertyDescriptors(ReactiveElement.prototype);
        for (const key in descriptors) {
            const descrp = descriptors[key];
            Object.defineProperty(ReactiveElement.prototype, key, {
                writable: descrp.writable,
                configurable: descrp.configurable,
                enumerable: descrp.enumerable,
                value: ()=> {
                    `Calling ${key} on ReactiveElement for ${elementClass.toString()}`;
                    descrp.value();
                }
            });
        }
    }
    */

    return ReactiveElement;
}
