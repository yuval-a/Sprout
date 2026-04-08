import { bindPropAttribute, isPropAttribute, isStateAttribute } from "./attr_utils.js";
import { COMMANDS as COMMAND_ATTRIBUTES } from "./commands.js";
import { SUPPORTED_ATTRIBUTES_FOR_BINDING, GLOBAL_STATE_FUNCTION_NAME, AUTO_ATTRIBUTES_TO_PROPS, SYMBOL_NAMES, OBSERVED_ATTRIBUTES } from "../shared/consts.js";
import { setAttribute, setStateAttribute, setStateText } from "../shared/state_utils.js";
import { fromAttributeValue } from "../shared/parse_utils.js";

export function isReactiveCustomElement(element) {
    return element && element.isReactiveElement && !element.isNativeElement;
}

export function extendElementClassWithReactiveElementClass(elementClass, appScope = window, isInputElement = false) {
    class ReactiveElement extends elementClass {
        // Should contain the parent (containing) custom element (a ReactiveCustomElement instance)
        host = null
        // True if connectedCallback was called once
        #wasMounted = false

        // The name used for the ref property
        refName;
        static observedAttributes = OBSERVED_ATTRIBUTES;

        constructor() {
            super();
            this.isReactiveElement = true;
            this.isNativeElement = true;
        }


        activate() {
            const commands = [];
            const attributeNames = this.getAttributeNames();
            for (const attrName of attributeNames) {
                const attrValue = this.getAttribute(attrName);
                // This also resolves "State attributes"
                this.initialSetAttribute(attrName, attrValue);

                // Save "Command attributes"
                if (attrName.indexOf('_') === 0) {
                    const command = attrName.substring(1);
                    commands.push({ command, args: attrValue });
                }
            }

            commands.forEach(({ command, args })=> {
                COMMAND_ATTRIBUTES[command]?.call(this, args);
                // Run custom commands
                appScope.appCommands?.[command]?.call(this, args);
                const componentCommands = this.host?.commands || this.commands;
                componentCommands?.[command]?.call(this, args);
            });

            this.#pendingAttributeChanges.forEach(attributeChangeHandler=> attributeChangeHandler.call(this));
            this.#pendingAttributeChanges.length = 0;
            this.isActive = true;
        }

        // IMPORTANT: Sometimes we check this.host directly and EXPECT IT to be null for the host itself!
        // But, this function is a "public" method that always returns something - if a child it will return parent ce,
        // if parent ce it will return itself
        getHost() {
            return this.host || this.parentNode || this?.getRootNode()?.host;
        }
        connectedCallback() {
            if (this.#wasMounted) return;
            // IMPORTANT: THIS *CAN* be NULL, DO NOT CHANGE IT!
            // It is part of the way a check is made to see if an element is part of ShadowDOM!
            // host will be null if the element is part of the DOM === the "root" custom element will have null in .host
            // THIS SHOULD BE THE FIRST THING THAT HAPPENS!
            // getRootNode - returns shadowRoot if this is inside shadow DOM, and document if it's in light DOM.
            const rootNode = this.getRootNode();

            // If this is inside light DOM - we take the direct parent,
            // this works e.g. with a light element with "slot" attribute, inside a Sprout component
            // (It will have access to its "state")
            
            this.host = rootNode === document ? this.parentElement : rootNode.host;

            if (this.host) {
                // Once the host custom element is connected
                // then its 'State' is ready and activated,
                // then we can call the sub-elements 'activate()',
                // which relies on an active state.
                // Doing it like this, allow visual render faster,
                // defering the state handling.
                if (this.host.isActive) this.activate(); 
                else {
                    this.host.addEventListener("active", ()=> this.activate(), { once: true });
                }
            }
            else {
                this.activate();
            }

            this.#wasMounted = true;
        }

        disconnectedCallback() {
            const host = this.host ?? this;
            if (host.ref) {
                delete host.ref[this.refName];
            }
        }

        // This is for when using moveBefore for detaching and reattaching DOM
        // We considered using it - but it is not widely supported,
        // and you have to move it to another DOM for it to work correctly
        // connectedMoveCallback() {}

        #handleAttributeChange(attributeName, oldValue, newValue) {
            const host = this.isNativeElement ? (this.host || this.getRootNode().host) : this;

            if (attributeName === "ref") {
                const refValue = newValue;
                host.ref[refValue] = this;
                this.refName = refValue;
            }
            /*
            else if (newValue && newValue.indexOf('@') === 0) {
                bindPropAttribute.call(this, attributeName, newValue, host);
            }
            */
        }
        #pendingAttributeChanges = [];
        attributeChangedCallback(attributeName, oldValue, newValue) { 
            if (oldValue === newValue) return;
            // If host is not yet connected - defer handling.
            if (!this.isConnected) {
                this.#pendingAttributeChanges.push(
                    ()=> this.#handleAttributeChange(attributeName, oldValue, newValue)
                );
            }
            else {
                this.#handleAttributeChange(attributeName, oldValue, newValue);
            }
        }

        // Gets state value of stateProp,
        // tries to resolve from local state(s) first, up the "state tree",
        // and then from global. If the second argument is true: 
        // returns both the state value and the state object
        // else return just the state value
        getState(stateProp, returnStateObject=false) {
            let theState;
            // If this is a reactive element inside a reactive web component - the host should be the containing web component - 
            // we should reference its state, if host is null - it is most likely the host web component
            let elementInstance = this.isNativeElement && this.host ? this.host : this;
            let stateVal, stateFound = false;
            if (elementInstance && elementInstance.state && Object.hasOwn(elementInstance.state,stateProp)) {
                stateFound = true;
                theState = elementInstance.state;
                stateVal = theState[stateProp];
            }

            // Go "up the state layers" to try to find the state
            if (!stateFound) {
                while (!stateFound && elementInstance.host) {
                    elementInstance = elementInstance.host;
                    if (elementInstance && elementInstance.state && Object.hasOwn(elementInstance.state, stateProp)) {
                        stateFound = true;
                        theState = elementInstance.state;
                        stateVal = theState[stateProp];
                    }
                }
            }

            if (!stateFound) {
                // Try the global state
                const globalState = appScope[GLOBAL_STATE_FUNCTION_NAME]();
                if (globalState && Object.hasOwn(globalState, stateProp)) {
                    stateFound = true;
                    theState = globalState
                    stateVal = theState[stateProp];
                }
            }

            if (!stateFound) {
                stateVal = undefined;
            }
            if (returnStateObject) {
                return [stateVal, theState];
            }
            return stateVal;
        }
        
        findElement(refName) {
            const host = this.host || this;
            // if Shadow DOM is used, the "root" element is shadowRoot, otherwise it is the 
            // web component itself
            let root = host;
            if (appScope.SPROUT_CONFIG.useShadow) {
                root = host.shadowRoot;
            }
            return Object.hasOwn(host.ref, refName) ? host.ref[refName] : root.querySelector(`[ref="${refName}"]`);
        }

        // The "initialSetX" functions are called:
        // 1. When a custom element instance is first created (before it's connected) - 
        // state attribute values are set to their state prop names (e.g: '$name').
        // 2. When a custom element instance becomes connected (added to the DOM) - state attribute values are actually resolved to the
        // value of their respective state prop values, and binding between them occurs.
        initialSetText(stateProp) {
            setStateText.call(this, stateProp);
        }
        initialSetAttribute(attributeName, attributeValue) {
            attributeValue = String(attributeValue);
            const isPropAttr  = isPropAttribute(attributeValue);
            const isStateAttr = isStateAttribute(attributeName); 
            let valueToSet = attributeValue;

            // "State attribute"
            if (isStateAttr) {
                if (!STRICT) {
                    if (isPropAttr) {
                        console.warn("Mixing between prop attributes and state attributes can lead to unexpected results!");
                    }
                }
                const stateProp = attributeValue;
                const attrName = attributeName.substring(1);
                setStateAttribute.call(this, attrName, stateProp);
            }
            else { 
                if(isPropAttr) {
                    const host = this.getHost();
                    if (!STRICT) {
                        if (!host) {
                            console.warn(`Host element not found when resolving prop attribute ${attributeName}:${attributeValue}`);
                        }
                    }
                    const propName = attributeValue.substring(1);
                    const propValue = host.getAttribute(propName);
                    valueToSet = propValue;
                }
                setAttribute.call(this, attributeName, valueToSet);
            }
        }

        onAfterPaint(callback) {
            requestAnimationFrame(()=>
                requestAnimationFrame(callback)
            );
        }
    }

    if (!isInputElement)
        return ReactiveElement;
    else {
        class ReactiveInputElement extends ReactiveElement {
            // Used for the _bind command, which allows "reverse-binding" attribute values to state props,
            // keys are attribute names, values are state prop names
            boundAttributesToState = new Map();
            #changeEventHandler;
            // #inputEventHandler;

            static observedAttributes = ReactiveElement.observedAttributes
            .concat([...SUPPORTED_ATTRIBUTES_FOR_BINDING]);
            
            bindAttributeToState(attributeName, statePropName) {
                this.boundAttributesToState.set(attributeName, statePropName);
            }
            updateStateFromAttribute(attributeName) {
                let newValue = fromAttributeValue(this.getAttribute(attributeName));
                const stateProp = this.boundAttributesToState.get(attributeName);
                const [stateValue, theState] = this.getState(stateProp, true);
                if (stateValue === Symbol.for(SYMBOL_NAMES.STATE_NOT_FOUND)) {
                    throw Error(`updateStateFromAttribute: State property ${stateProp} not found`);
                }
                if (stateValue !== newValue) {
                    theState[stateProp] = newValue;
                }
            }

            activate() {
                super.activate();


                this.#changeEventHandler = function() {
                    const changeEvent = new Event('inputChange', { bubbles: true, composed: true });
                    // Because of bubbling, the handler can trigger on non-input elements as well
                    if (this.type === "checkbox") {
                        const stateManager = this.host.state._stateManager;
                        // This is a map where keys are elements, and values are "checked" State attribute nodes
                        const checkedStateAttributeNodesMap = stateManager.nodeManager.bindableAttributesStateNodes.get("checked");
                        let checkedAttributeNode = null;
                        if (checkedStateAttributeNodesMap.has(this)) {
                            checkedAttributeNode = checkedStateAttributeNodesMap.get(this);
                        }

                        if (this.checked) {
                            if (!checkedAttributeNode) checkedAttributeNode = document.createAttribute("checked");
                            this.setAttributeNode(checkedAttributeNode);
                        }
                        else {
                            if (!checkedAttributeNode) checkedAttributeNode = this.getAttributeNode("checked");
                            if (checkedAttributeNode) this.removeAttributeNode(checkedAttributeNode);
                        }
                    }
                    this.dispatchEvent(changeEvent);
                }
                /*
                this.#inputEventHandler = function() {
                    const changeEvent = new Event('inputChange', { bubbles: true, composed: true });
                    // Because of bubbling, the handler can trigger on non-input elements as well
                    if (this.tagName === "INPUT") {
                        if (this.type === "text") {
                            const stateManager = this.host.state._stateManager;
                            // This is a map where keys are elements, and values are "checked" State attribute nodes
                            const valueStateAttributeNodesMap = stateManager.nodeManager.bindableAttributesStateNodes.get("value");
                            let valueAttributeNode = null;
                            if (valueStateAttributeNodesMap.has(this)) {
                                valueAttributeNode = StateAttributeNodesMap.get(this);
                            }
                            if (this.checked) {
                                if (!checkedAttributeNode) checkedAttributeNode = document.createAttribute("checked");
                                this.setAttributeNode(checkedAttributeNode);
                            }
                            else {
                                if (!checkedAttributeNode) checkedAttributeNode = this.getAttributeNode("checked");
                                if (checkedAttributeNode) this.removeAttributeNode(checkedAttributeNode);
                            }
                        }
                    }
                    this.dispatchEvent(changeEvent);
                }
                */
                // Change events does not automatically bubble, we need to listen and bubble up a new event
                this.addEventListener('change', this.#changeEventHandler, false);
                /*
                if (Object.hasOwn(this.boundNativePropertiesToState, "value")) {
                    this.#inputEventHandler = function() {
                        const inputEvent = new Event('inputValue', { bubbles: true, composed: true });
                        if (Object.hasOwn(this.boundNativePropertiesToState, "value")) {
                            this.updateStateFromNativeProperty("value");
                        }
                        this.dispatchEvent(inputEvent);
                    }
                    this.addEventListener('input', this.#inputEventHandler, false);
                }
                */

                /*
                switch (this.type) {
                    case "text": {
                        this.#inputValueSetter = Object.getOwnPropertyDescriptor(appScope.window.HTMLInputElement.prototype, "value").set;
                        break;
                    }
                    case "checkbox": {
                        this.#inputCheckedSetter = Object.getOwnPropertyDescriptor(appScope.window.HTMLInputElement.prototype, "checked").set;
                        break;
                    }
                }
                */
            }

            disconnectedCallback() {
                super.disconnectedCallback();
                if (this.#changeEventHandler) this.removeEventListener("change", this.#changeEventHandler);
                // if (this.#inputEventHandler)  removeEventListener("input", this.#inputEventHandler);
                this.boundAttributesToState.clear();
            }

            attributeChangedCallback(attributeName, oldValue, newValue) {
                if (!STRICT) {
                    if (attributeName.indexOf(':') === 0) {
                        console.warn("State attributes should never be changed explicitely!");
                        return false;
                    }
                }
                super.attributeChangedCallback(...arguments);
                // These are attributes which their value should automatically 
                // change on a property as well
                if (AUTO_ATTRIBUTES_TO_PROPS.has(attributeName)) {
                    const newPropValue = fromAttributeValue(newValue);
                    if (this[attributeName] !== newPropValue) {
                        this[attributeName] = newPropValue;
                    }
                }
                if (this.boundAttributesToState.has(attributeName)) {
                    this.updateStateFromAttribute(attributeName)
                }
            }
        }

        return ReactiveInputElement;
    }
}
