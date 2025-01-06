import { COMMANDS as COMMAND_ATTRIBUTES } from "./commands.js";
import { BOOLEAN_ATTRIBUTES, SUPPORTED_ATTRIBUTES_FOR_BINDING, GLOBAL_STATE_FUNCTION_NAME, DEFAULT_TEMPLATE_DOM } from "./consts.js";
import { queueActivate } from "./paint_utils.js";
import { setAttribute, setStateAttribute, setStateText } from "./state_utils.js";

export function extendElementClassWithReactiveElementClass(elementClass, appScope = window) {
    class ReactiveElement extends elementClass {
        // Should contain the "root" DOM element containing this element
        host = null

        // For input elements - to force bubble-up of change events
        #changeEventHandler

        #wasMounted = false

        // Used for the _bind command, which allows "reverse-binding" attribute values to state props,
        // keys are attribute names, values are state prop names
        #boundAttributesToState = {}
        static observedAttributes = ["ref"]
                                    .concat(SUPPORTED_ATTRIBUTES_FOR_BINDING)
                                    .concat(Object.keys(COMMAND_ATTRIBUTES).map(command => ('_' + command.toLowerCase())));


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
            if (this.#changeEventHandler) this.removeEventListener('change', this.#changeEventHandler);
            const host = this.host ?? this;
            if (host.ref) {
                const thisRefName = this.getAttribute('ref');
                if (thisRefName) { 
                    delete host.ref[thisRefName];
                    delete host.events[thisRefName];
                }
            }
            this.#boundAttributesToState = {};
        }

        activate() {
            // Keep it here and not in bindEvents! 
            if (this?.tagName === "INPUT") {
                this.#changeEventHandler = function() {
                    const changeEvent = new Event('inputChange', { bubbles: true, composed: true });
                    this.dispatchEvent(changeEvent);
                }
                // Change events does not automatically bubbles, we need to listen and bubble up a new event
                this.addEventListener('change', this.#changeEventHandler, false);
            }

            const commands = [];
            const attributeNames = this.getAttributeNames();
            for (const attrName of attributeNames) {
                const attrValue = this.getAttribute(attrName);
                // This also resolves "State attributes"
                this.initialSetAttribute(attrName, attrValue);

                // Save "Command attributes"\
                if (attrName.indexOf('_') === 0) {
                    const command = attrName.substring(1);
                    commands.push({ command, args: attrValue });
                }
            } 
            commands.forEach(({ command, args})=> {
                COMMAND_ATTRIBUTES[command]?.call(this, args);
            });

        }
        connectedCallback() {
            if (this.#wasMounted) return;
            // IMPORTANT: THIS *CAN* be NULL, DO NOT CHANGE IT!
            // It is part of the way a check is made to see if an element is part of ShadowDOM!
            // host will be null if the element is part of the DOM === the "root" custom element will have null in .host
            // THIS SHOULD BE THE FIRST THING THAT HAPPENS!
            this.host = this.getRootNode().host;
            if (this.host) {
                // Once the host custom element is connected
                // then its 'State' is ready and activated,
                // then we can call the sub-elements 'activate()',
                // which relies on an active state.
                // Doing it like this, allow visual render faster,
                // defering the state handling.
                this.host.addEventListener("connected", 
                    ()=> this.activate()),
                { once: true }
            }
            else {
                // queueActivate(this, ()=> this.activate());
                queueMicrotask(()=> this.activate());

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
                return;
            }

            if (attributeName in this.#boundAttributesToState) {
                this.#updateStateFromAttribute(attributeName);
                return;
            }

            if (attributeName.indexOf('@') === 0) {
                const propName = attributeName.substring(1);
                const attrNode = this.getAttributeNode(attributeName);
                attrNode.nodeValue = this.host.getAttribute(propName);
                if (!this.host.propAttributes.has(propName)) {
                    this.host.propAttributes.set(propName, new Set());
                }
                this.host.propAttributes.get(propName).add(attrNode);
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
            const host = this.host || this;
            // if Shadow DOM is used, the "root" element is shadowRoot, otherwise it is the 
            // web component itself
            let root = host;
            if (appScope.SPROUT_CONFIG.useShadow) {
                root = host.shadowRoot;
            }
            return host.ref.hasOwnProperty(refName) ? host.ref[refName] : root.querySelector(`[ref="${refName}"]`);
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
            let valueToSet = attributeValue;
            /*
            // "Property Attribute"
            if (attributeValue.indexOf('@') === 0 && this.host && this.isConnected) {
                valueToSet = this.host.getAttribute(attributeValue.substring(1));
            } 
            */
            
            // "State attribute"
            if (attributeValue.indexOf('$') === 0 && this.isConnected)  {
                let stateProp = attributeValue.substring(1);
                setStateAttribute.call(this, attributeName, stateProp);
            }
            // normal attribute
            else {
                setAttribute.call(this, attributeName, valueToSet);
            }
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
