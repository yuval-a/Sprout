import { BUILT_IN_STATE_PROPS, SYMBOL_NAMES } from "./consts.js";
import { generateStateNodeActions } from '../core/node_actions.js';
import { setHiddenProperty } from "./prop_utils.js";
import { isBooleanAttribute } from "../core/attr_utils.js";
import { callSetterHook } from "../Cougar/state_utils.js";
import { parseStateExpression } from "./parse_utils.js";

if (typeof HTMLElement === 'undefined') {
    if (!STRICT) {
        console.warn ("HTMLElement was not found! This probably means you are running in a non-browser environment, and can lead to unexpected results");
    }
}
else {
    // Make sure "setAttribute" is not overridable
    Object.defineProperty(globalThis, "elementSetAttribute", {
        value: HTMLElement.prototype.setAttribute,
        writable: false,
        configurable: false
    });
}

export const setAttribute = function(attrName, attrValue) {
    if (isBooleanAttribute(attrName)) {
        if (attrValue === "false") {
            this.removeAttribute(attrName);
        }
        else {
            elementSetAttribute.call(this, attrName, "");
        }
    }
    else {
        elementSetAttribute.call(this, attrName, attrValue);
    }
}

// This creates the binding to state props on "State attributes".
// This function is called when a custom element instance ic connected to the DOM
export const setStateAttribute = function(attrName, statePropExpression) {
    const [type, ...args] = parseStateExpression(statePropExpression);
    const stateProp = args[0];
    const [stateVal, theState] = this.getState(stateProp, true); 
    if (!STRICT) {
        if (stateVal ===  Symbol.for(SYMBOL_NAMES.STATE_NOT_FOUND)) {
            console.warn(`State value for ${stateProp} is undefined. State values should never be undefined.`)
            return;
        }
        if (!theState) {
            console.warn ("No State object with state prop: " + stateProp);
            return;
        }
    }

    const stateManager = theState._stateManager;
    const valueToSet = type === "literal" ? stateVal : stateManager.bindStatePropExpression(statePropExpression, type, args);

    this.removeAttribute(attrName);
    // Create an "Attribute Node"
    const stateAttrNode = document.createAttribute(attrName);
    stateAttrNode.nodeValue = valueToSet;
    // Saves a readonly boolean that marks this as a "state attribute node"
    setHiddenProperty(stateAttrNode, "isStateAttribute", true);
    // Save ownerElement to a different property,
    // so if the attribute is removed (in case of a boolean attribute),
    // and later re-attached, we would know which element to add it back to.
    setHiddenProperty(stateAttrNode, "originalOwnerElement", this);
    if (typeof valueToSet === "boolean") {
        // A boolean attribute value should ALWAYS be an empty string,
        // the value itself never changes, it is removed fron the element if false, 
        // and added if true
        stateAttrNode.nodeValue = "";
    }

    stateManager.addStateNode(statePropExpression, stateAttrNode);

    // Adds the attribute to the element
    if (valueToSet !== false) {
        this.setAttributeNode(stateAttrNode);
    }
    this.addEventListener("disconnected",()=> {
        theState._stateManager.removeStateNode(statePropExpression, stateAttrNode);
    }, { once: true})
}

export const setStateText = function(statePropExpression) {
    const [type, ...args] = parseStateExpression(statePropExpression);
    const stateProp = args[0];
    const [stateVal, theState] = this.getState(stateProp, true); 
    if (!STRICT) {
        if (stateVal ===  Symbol.for(SYMBOL_NAMES.STATE_NOT_FOUND)) {
            console.warn(`State value for ${stateProp} is undefined. State values should never be undefined.`)
            return;
        }
        if (!theState) {
            console.warn ("No State object with state prop: " + stateProp);
            return;
        }
    }
    const stateManager = theState._stateManager;
    const valueToSet = type === "literal" ? stateVal : stateManager.bindStatePropExpression(statePropExpression, type, args);
    const textNode = document.createTextNode(valueToSet);
    setHiddenProperty(textNode, "isStateAttribute", true);
    theState._stateManager.addStateNode(statePropExpression, textNode);
    this.appendChild(textNode);
    this.addEventListener("disconnected",()=> {
        theState._stateManager.removeStateNode(statePropExpression, textNode);
    }, { once: true})
}

// Convert a stateObject to a custom element, used in State Map Arrays
export function stateToElement(stateObject, elemName, wrapInElement, ownerMapElement) {
    const customElementInstance = document.createElement(elemName);
    customElementInstance.setInitialState(stateObject);
    customElementInstance.ownerMapElement = ownerMapElement;
    let returnElement;
    if (wrapInElement) {
        returnElement = document.createElement(wrapInElement);
        returnElement.appendChild(customElementInstance);
    }
    else {
        returnElement = customElementInstance;
    }
    if (stateObject.hasOwnProperty("key") && !returnElement.hasOwnProperty("stateKey")) {
        returnElement.stateKey = stateObject.key;
    }
    return returnElement;
}

export function mapStateArrayToElements(stateItems, elemName, wrapInElement, parentElement) {

    // the double underscore '__' skips the "supercharging" of native operations, and just runs it as is
    const mappedElements = stateItems.map((stateItem, index) => {
        if (Object.hasOwn(stateItem, 'state')) stateItem = stateItem.state;
        if (!STRICT) {
            if (typeof stateItem !== 'object') {
                console.warn("item in State array for _map is not an object: ", stateItem);
                return {};
            }
            if (!Object.hasOwn(stateItem, 'key')) {
                console.warn("State object in elements map has no 'key' property. Adding automatically per index. This can have unexpected results on mutations!")
                stateItem.key = index;
            }
        }
        const element = stateToElement(stateItem, elemName, wrapInElement, parentElement);

        // We do this because during state map element reconcilation -
        // there CAN be a situation where a child custom element is NOT active yet,
        // therefor its state won't be accesible yet. (This happened in todo-list-src)
        // So we also save it here so it could use it.
        element.stateKey = stateItem.key;

        return element;
    });

    return mappedElements;
}

// Main function that handles all state changes in a state object
export function handleStateChange(stateManager, stateProp, changedValue) {
    if (isBuiltInStateProp(stateProp)) return;
    console.log ("Handling state change for: " + stateProp);
    // At this point, if the value is taken from state, it should be a getter value
    const newValue = changedValue ?? stateManager.state[stateProp];
    const descrp = Object.getOwnPropertyDescriptor(stateManager.state, stateProp);
    const isGetter = descrp?.get?.isStateGetter;

    dispatchStateChangEvent(stateManager.state, stateProp, newValue);
    // Populate the next Node Actions to perform
    generateStateNodeActions(stateManager, stateProp, newValue, isGetter);
    // Also handle negation dependencies
    if (!stateProp.startsWith('!')) {
        generateStateNodeActions(stateManager, `!${stateProp}`, !newValue, isGetter);
    }
}



export function handleStateDependency(stateManager, depStateProp, appScope=window) {
    const state = stateManager.state;
    const isSetter = isSetterHook(depStateProp);  
    // A "Setter" hook
    if (isSetter) {
        const setterHook = state[depStateProp];
        const setterStateProp = depStateProp.substring(4);
        const hasNewValue = callSetterHook(setterHook, setterStateProp, stateManager, appScope);
        if (hasNewValue) handleStateChange(stateManager, setterStateProp, null, appScope.offscreenContainer);
    }
    else if (depStateProp.indexOf('.length') > 0) {
        const realProp = depStateProp.split('.')[0];
        const newValue = stateManager.state[realProp].length;
        // depStateProp is `${prop}.length` here
        handleStateChange(stateManager, depStateProp, newValue, appScope.offscreenContainer);
    }
    else {
        handleStateChange(stateManager, depStateProp, null, appScope.offscreenContainer);
    }
}


export function isBuiltInStateProp(stateProp) {
    return BUILT_IN_STATE_PROPS.has(stateProp);
}

export function dispatchStateChangEvent(state, property, newValue) {
    const stateChangeEvent = new CustomEvent('stateChange', { 
        bubbles: false, 
        composed: false,
        detail: {
            property,
            newValue
        } 
    });
    state.dispatchEvent(stateChangeEvent);
}

export function isSetterHook(stateProp) {
    return stateProp.indexOf('set_') === 0;
}



