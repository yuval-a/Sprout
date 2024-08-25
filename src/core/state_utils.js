import { BOOLEAN_ATTRIBUTES, BUILT_IN_STATE_PROPS, getNewNodeActionsObject, MAP_ACTIONS, NODES_STATE } from "./consts.js";

if (typeof HTMLElement === 'undefined') {
    console.warn ("HTMLElement was not found! This probably means you are running in a non-browser environment, and can lead to unexpected results");
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
    if (BOOLEAN_ATTRIBUTES.includes(attrName)) {
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
export const setStateAttribute = function(attrName, stateProp) {
    let equalityValue = null;
    if (stateProp.indexOf(':') !== -1) {
        if (stateProp.indexOf('is_') === 0) {
            const colonIndex = stateProp.indexOf(':');
            if (colonIndex === -1) {
                throw Error("When using conditional equality state attribute, you must include a colon character followed by an equality value!");
            }
            equalityValue = stateProp.substring(colonIndex+1);
            stateProp = stateProp.substring(3, colonIndex);
        }
    }
    let [stateVal, theState] = this.getState(stateProp, true); 

    if (stateVal === undefined) {
        console.warn(`State value for ${stateProp} is undefined. State values should never be undefined.`)
        return;
    }
    if (!theState) {
        console.warn ("No State object with state prop: " + stateProp);
        return;
    }
    if (equalityValue) {
        const conditionalStateProp = "is_"+stateProp+equalityValue;
        const originalStateProp = stateProp;
        Object.defineProperty(theState, conditionalStateProp, {
            get() {
                return this[originalStateProp] === equalityValue
            },
            enumerable: true
        });
        theState._stateManager.addStateDependency(stateProp, conditionalStateProp);
        stateVal = theState[conditionalStateProp];
        stateProp = conditionalStateProp;
    }

    const valueToSet = stateVal;
    this.removeAttribute(attrName);
    // Create an "Attribute Node"
    const stateAttrNode = document.createAttribute(attrName);
    stateAttrNode.value = valueToSet;
    // Saves a readonly boolean that marks this as a "state attribute node"
    Object.defineProperty(stateAttrNode, "isStateAttribute", {
        writeable: false,
        configurable: false,
        enumerable: false
    });


    // Save ownerElement to a different property,
    // so if the attribute is removed (in case of a boolean attribute),
    // and later re-attached, we would know which element to add it back to.
    stateAttrNode.originalOwnerElement = this;
    theState._stateManager.addStateNode(stateProp, stateAttrNode, typeof valueToSet === "boolean");

    if (typeof valueToSet === "boolean") {
        // A boolean attribute value should ALWAYS be an empty string,
        // the value itself never changes, it is removed fron the element if false, 
        // and added if true
        stateAttrNode.value = "";
    }

    // Adds the attribute to the element
    if (valueToSet !== false) {
        this.setAttributeNode(stateAttrNode);
    }
}
export const setStateText = function(stateProp) {
    const [stateVal, theState] = this.getState(stateProp, true); 

    if (stateVal === undefined || stateVal === null) {
        console.warn(`State value for ${stateProp} is undefined or null for _text command`);
        return;
    }
    if (!theState) {
        console.warn ("No State object with state prop: " + stateProp);
        return;
    }
    const valueToSet = stateVal;
    const textNode = document.createTextNode(valueToSet);
    Object.defineProperty(textNode, "isStateAttribute", {
        writeable: false,
        configurable: false,
        enumerable: false
    });

    theState._stateManager.addStateNode(stateProp, textNode);
    this.appendChild(textNode);
}

// Convert a stateObject to a custom element, used in State Map Arrays
export function stateToElement(stateObject, elemName) {
    const customElementInstance = document.createElement(elemName);
    customElementInstance.setInitialState(stateObject);
    /*
    for (let key of Object.keys(stateObject)) {
        if (key.indexOf('$') === 0 || key.indexOf('!') === 0) continue;
        customElementInstance.initialSetAttribute(key, '$'+key); // stateObject[key]);
    }
        */
    return customElementInstance;
}

export function mapStateArrayToElements(stateItems, elemName) {
    // Each state item should be a stateManager
    return stateItems.map(stateItem => {
        if (stateItem.hasOwnProperty('state')) stateItem = stateItem.state;
        if (typeof stateItem !== 'object') {
            console.warn("item in State array for _map is not an object: ", stateItem);
            return {};
        }
        return stateToElement(stateItem, elemName);
    });
}

function resolveNodeActionsMapToDOMActions() {
    const batchActions = [];
    const { nodeActionsMap } = NODES_STATE;

    nodeActionsMap.forEach((nodeActions, node)=> {

        // Attribute change
        if (nodeActions.hasOwnProperty("setAttribute")) {
            const value = nodeActions.setAttribute;
            if (typeof value === "boolean") {
                if (!node.hasOwnProperty("originalOwnerElement")) {
                    console.error("originalOwnerElement not found on boolean attribute node! Should never happen!");
                }
                if (value === false) {
                    // Remove attribute if it exists, otherwise - do nothing
                    if (node.originalOwnerElement.hasAttribute(node.name)) {
                        batchActions.push(()=> {
                            node.originalOwnerElement.removeAttributeNode(node);
                        });
                    }
                }
                // state changed to true
                else {
                    if (!node.originalOwnerElement.hasAttribute(node.name)) {
                        batchActions.push(()=> {
                            node.originalOwnerElement.setAttributeNode(node);
                        });
                    }
                }
            }
            else {
                if (typeof value === "string" && node.value !== value) {
                    batchActions.push (()=> node.value = value);
                }
            }
        }

        // Text change
        else if (nodeActions.hasOwnProperty("textContent")) {
            const value = String(nodeActions.textContent);
            if (node.nodeValue === value) return;
            batchActions.push (()=> node.nodeValue = value);
        }

        // DOM change
        else {
            nodeActions.replace.forEach((newNode, oldNode)=> {
                batchActions.push(()=> 
                    //oldNode.replaceWith(newNode));
                    node.replaceChild(newNode, oldNode));
            });
            nodeActions.remove.forEach(nodeToRemove=> {
                if (nodeToRemove.parentNode && nodeToRemove.parentNode === node) {
                    batchActions.push(()=> node.removeChild(nodeToRemove));
                }
            });
            nodeActions.append.forEach((customElementName, stateItem)=> {
                batchActions.push(()=> node.appendChild(stateToElement(stateItem, customElementName)));
            });
        }
    });
    return batchActions;
}


// This *updates*/*"fills"* the nodeActionsMap!
function generateStateNodeActions(stateManager, stateProp) {
    const { nodeActionsMap } = NODES_STATE;
    const value = stateManager.state[stateProp];
    const stateNodes = stateManager.stateNodes[stateProp];
    const stateMaps = stateManager.stateArrayMaps[stateProp];
    if (stateNodes) {
        stateNodes.forEach(node=> {
            if (!nodeActionsMap.has(node)) nodeActionsMap.set(node, {});
            const nodeActionsObject = nodeActionsMap.get(node);
            if (node.nodeType === Node.ATTRIBUTE_NODE)
                nodeActionsObject["setAttribute"] = value; 
            else if (node.nodeType === Node.TEXT_NODE)
                nodeActionsObject["textContent"] = value;
        });
    }


    if (stateMaps) {
        const stateMapArray = value;

        stateMaps.forEach(({ customElementName, parentElement})=> {
            if (!nodeActionsMap.has(parentElement)) nodeActionsMap.set(parentElement, getNewNodeActionsObject());
            const nodeActions = nodeActionsMap.get(parentElement);
            
            let currentStateMapArrayIndex = -1;
            // Compares state map arrays to actual DOM elements (by comparing state objects)
            if (parentElement.children.length) {
                Array.prototype.forEach.call(parentElement.children, (childElement, currentIndex)=> {
                    let stateItem = stateMapArray[currentIndex]; 
                    if (stateItem?.hasOwnProperty('state')) stateItem = stateItem.state;
                    if (!stateItem) {
                        nodeActions.remove.add(childElement);
                    }
                    else if (childElement.state !== stateItem) {
                        nodeActions.replace.set(childElement, stateToElement(stateItem, customElementName));
                    }
                    currentStateMapArrayIndex = currentIndex;
                });
            }

            // If there are more state objects in the stateMapArray - append equivalent child elements 
            currentStateMapArrayIndex++;
            for (let i = currentStateMapArrayIndex, len=stateMapArray.length; i<len; i++) {
                const stateItem = stateMapArray[i];
                // New state item === new child element to append
                if (stateItem) {
                    nodeActions.append.set(stateItem, customElementName);
                }
            }
        });
    }
}

// This function runs periodically on requestAnimationFrame to run pending Node actions
export function doUpdateDOM() {
    let { nodeActionsMap } = NODES_STATE;
    if (nodeActionsMap.size) {
        const DOMActions = resolveNodeActionsMapToDOMActions(nodeActionsMap);
        DOMActions.forEach(DOMAction=> DOMAction());
        NODES_STATE.nodeActionsMap = new Map();
    }
    requestAnimationFrame(doUpdateDOM);
}

// Main function that handles all state changes in a state object
export function handleStateChange(stateManager, stateProp) {
    if (BUILT_IN_STATE_PROPS.includes(stateProp)) return;
    // Populate the next Node Actions to perform
    generateStateNodeActions(stateManager, stateProp);
    const state = stateManager.state;

    // Run on[stateProp]Change hooks
    if (state.hasOwnProperty(`on${stateProp}Change`)) {
        if (typeof state[`on${stateProp}Change`] === "function")
            state[`on${stateProp}Change`].call(state);
    }

    const stateDependencies = stateManager.stateDependencies[stateProp];
    if (stateDependencies) {
        stateDependencies.forEach(depStateProp=> {
            // A "Setter" hook
            if (depStateProp.indexOf('set_') === 0) {
                const setStateProp = depStateProp.substring(4);
                const func = state[depStateProp][0];
                if (func && typeof func === "function") {
                    state[setStateProp] = func.call(state);
                    return;
                }
            }
            generateStateNodeActions(stateManager, depStateProp);
            if (state.hasOwnProperty(`on${depStateProp}Change`)) {
                if (typeof state[`on${depStateProp}Change`] === "function")
                    state[`on${depStateProp}Change`].call(state);
            }
        
        });
    }

    // Global state
    if (!state._global) {
        const globalStateDependencies = stateManager.globalStateDependencies[stateProp];
        globalStateDependencies?.forEach((depStateProps, depStateManager)=> {
            const depState = depStateManager.state;
            depStateProps.forEach(depStateProp=> {
                // A "Setter" hook
                if (depStateProp.indexOf('set_') === 0) {
                    const setStateProp = depStateProp.substring(4);
                    const func = state[depStateProp][0];
                    if (func && typeof func === "function") {
                        depState[setStateProp] = func.call(depState);
                        return;
                    }
                }
                generateStateNodeActions(depStateManager, depStateProp);
                if (state.hasOwnProperty(`on${depStateProp}Change`)) {
                    if (typeof state[`on${depStateProp}Change`] === "function")
                        depState[`on${depStateProp}Change`].call(depState);
                }
            });
        });
    }
}

export function populateStateFromInitialState(state, initialState) {
    const descriptors = Object.getOwnPropertyDescriptors(initialState);
    let descrp;
    for (let key in descriptors) {
        if (BUILT_IN_STATE_PROPS.includes(key)) {
            delete descriptors[key];
            continue;
        }
        descrp = descriptors[key];
        if (descrp.hasOwnProperty('get') && typeof descrp.get === "function") {
            descrp.get.bind(state);
        }
        if (descrp.hasOwnProperty('value')) {
            const value = descrp.value;
            if (typeof value === "function") {
                descrp.value.bind(state);
            }
            else if (Array.isArray(value) && key.indexOf("set_") === 0) {
                const func = value?.[0];
                if (func && typeof func === "function") {
                    func.bind(state);
                }
            }
        }
        
    }

    // If state set hooks should run on initialization - 
    // they should run by the proxy handler for "defineProperty"
    Object.defineProperties(state, descriptors);

}

