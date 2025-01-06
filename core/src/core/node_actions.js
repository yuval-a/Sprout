import { stateToElement, resolveStateMapToDocumentFragment } from "./state_utils.js";
import { isElementAList } from "./DOM_utils.js";
import { queueConditionalRender, queuePaint } from "./paint_utils.js";
import { NODES_STATE } from "./consts.js";

// Also, if doesn't exist - create it
function getNodeActionsForNode(node) {
    const { nodeActionsMap } = NODES_STATE;
    if (!nodeActionsMap.has(node)) nodeActionsMap.set(node, getNewNodeActionsObject());
    const nodeActions = nodeActionsMap.get(node);
    return nodeActions;
}

export function setStateNodeAction(node, nodeActionsObject, value) {
    if (node.nodeType === Node.ATTRIBUTE_NODE)
        nodeActionsObject["setAttribute"] = value; 
    else if (node.nodeType === Node.TEXT_NODE)
        nodeActionsObject["textContent"] = value;
}

export function addRemoveAction(nodeActions, elementToRemove, stateIdentifier) {
    if (!nodeActions.remove.has(stateIdentifier)) {
        nodeActions.remove.set(stateIdentifier, new Set())
    }
    nodeActions.remove.get(stateIdentifier).add(elementToRemove);
}
export function addReplaceAction(nodeActions, oldElement, newElement) {
    nodeActions.replace.set(oldElement, newElement);
}
export function addSwitchAction(nodeActions, newElement) {
    nodeActions.switch = newElement;
}
// stateIdentifier can be a State object (for state maps),
// or a State property (for conditionally rendered elements)
export function addAppendAction(nodeActions, nodeToAppend, stateIdentifier) {
    if (!nodeActions.append.has(stateIdentifier)) {
        nodeActions.append.set(stateIdentifier, new Set());
    }
    nodeActions.append.get(stateIdentifier).add(nodeToAppend);
}
export function addStateAttributeToNode(attributeNode, value) {
    const nodeActions = getNodeActionsForNode(attributeNode);
    setStateNodeAction(attributeNode, nodeActions, value);
}
export function addAppendActionToNode(node, nodeToAppend, stateIdentifier) {
    const nodeActions = getNodeActionsForNode(node);
    addAppendAction(nodeActions, nodeToAppend, stateIdentifier);
}

// This is an object used to represent pending node actions,
// that are batched and executed in reflows (requestAnimationFrame)
export function getNewNodeActionsObject() {
    return ({
        // Nodes to append to the end of node's children, 
        // keys are state objects, or state props (string) 
        // to prevent duplicate pending
        append: new Map(),
        // Replace each key node on Map, with value node
        replace: new Map(),
        // Insert value node after key node in parent node's children
        after: new Map(),
        // Remove these nodes from the DOM
        // keys are state objects, or state props (string) 
        // to prevent duplicate pending
        remove: new Map(),
        switch: null,
        get hasPendingActions() {
            return (
                this.switch !== null ||
                this.append.size || 
                this.replace.size || 
                this.after.size || 
                this.remove.size
            );
        }
    });
}


// This *updates*/*"fills"* the nodeActionsMap!
export function generateStateNodeActions(stateManager, stateProp) {
    const { nodeActionsMap } = NODES_STATE;
    const value = stateManager.state[stateProp];
    const stateNodes = stateManager.stateNodes[stateProp];
    // This is a map, where keys are "parent elements" containing 
    // custom element instanced created from a state array ("state map").
    // The values are the custom element name. 
    // The actual array of state objects is in state[stateProp]
    const stateMapElements = stateManager.stateArrayMaps[stateProp];
    const conditionallyRenderingElements = stateManager.conditionallyRenderingElements[stateProp];

    // Note, since the value change is handled by a custom setter - that setter checks if the set value is the same - 
    // if it is - it won't call handleStateChange, and it won't reach here.
    if (stateNodes) {
        stateNodes.forEach(node=> {
            if (!nodeActionsMap.has(node)) nodeActionsMap.set(node, {});
            const nodeActionsObject = nodeActionsMap.get(node);
            setStateNodeAction(node, nodeActionsObject, value);
        });
    }

    if (stateMapElements) {
        // An array of state objects
        const stateMapArray = value;
        stateMapElements.forEach((customElementName, parentElement)=> {
            //const newMappedElement = parentElement.cloneNode(true);
            const stateMapNodeActions = getNewNodeActionsObject();
            let currentStateMapArrayIndex = -1;
            const isParentAList = isElementAList(parentElement);
            // Compares state map arrays to actual DOM elements (by comparing state objects)
            if (parentElement.children.length) {
                Array.prototype.forEach.call(parentElement.children, (childElement, currentIndex)=> {
                    let customElement = childElement;
                    // State map elements inside Lists are wrapped with a <li>
                    if (isParentAList) customElement = childElement.firstElementChild;
                    let stateItem = stateMapArray[currentIndex]; 
                    if (stateItem?.hasOwnProperty('state')) stateItem = stateItem.state;
                    if (!stateItem) {
                        addRemoveAction(stateMapNodeActions, childElement);
                        // newMappedElement.removeChild(newMappedElement.children[currentIndex]);
                    }
                    else if (customElement.state !== stateItem) {
                        const replaceWithChild = stateToElement(stateItem, customElementName, isElementAList(parentElement) ? "li" : undefined);
                        // newMappedElement.replaceChild(replaceWithChild, newMappedElement.children[currentIndex]);
                        addReplaceAction(stateMapNodeActions, childElement, replaceWithChild);
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
                    const newChild = stateToElement(stateItem, customElementName, isElementAList(parentElement) ? "li" : undefined);
                    // newMappedElement.appendChild(newChild);
                    addAppendAction(stateMapNodeActions, newChild, stateItem);
                }
            }

            // addSwitchAction(stateMapNodeActions, newMappedElement);
            if (stateMapNodeActions.hasPendingActions) {
                nodeActionsMap.set(parentElement, stateMapNodeActions);
            }
        });
    }

    if (conditionallyRenderingElements) {
        // Should be slot element
        conditionallyRenderingElements.forEach(element=> {
            queueConditionalRender(this, ()=> element.render());
        });
    }

    if (nodeActionsMap.size) queuePaint();
}

function resolveNodeActionsMapToDOMActions() {
    const batchActions = [];
    const attributeActions = [];
    const elementActions = [];

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
                        attributeActions.push(()=> {
                            node.originalOwnerElement.removeAttributeNode(node);
                        });
                    }
                }
                // state changed to true
                else {
                    if (!node.originalOwnerElement.hasAttribute(node.name)) {
                        attributeActions.push(()=> {
                            node.originalOwnerElement.setAttributeNode(node);
                        });
                    }
                }
            }
            else {
                if (typeof value === "string" && node.nodeValue !== value) {
                    attributeActions.push (()=> node.nodeValue = value);
                }
            }
        }

        // Text change
        else if (nodeActions.hasOwnProperty("textContent")) {
            const value = String(nodeActions.textContent);
            if (node.nodeValue === value) return;
            elementActions.push (()=> node.nodeValue = value);
        }

        // DOM change
        else if (nodeActions.switch) {
            elementActions.push(()=> node.replaceWith(nodeActions.switch));
        }
        else {
            nodeActions.replace.forEach((newNode, oldNode)=> {
                elementActions.push(()=> 
                    //oldNode.replaceWith(newNode));
                    node.replaceChild(newNode, oldNode));
            });
            for (const removes of nodeActions.remove.values()) {
                for (const nodeToRemove of removes) {
                    if (nodeToRemove.parentNode && nodeToRemove.parentNode === node) {
                        elementActions.push(()=> node.removeChild(nodeToRemove));
                    }
                }
            }
            for (const appends of nodeActions.append.values()) {
                for (const newChildElement of appends) {
                    elementActions.push(()=> node.appendChild(newChildElement));
                }
            }
        }
    });

    return [...attributeActions, ...elementActions];
}

// For debugging purposes
export function logNodeActions() {
    const { nodeActionsMap } = NODES_STATE;
    [...nodeActionsMap.entries()]
    .map(([node, actions])=> {

        switch (node.nodeType) {
            case Node.ELEMENT_NODE: {
                console.log ("Actions for", node);
                const appendElements = [...actions.append.values()];
                if (appendElements.length) {
                    console.log("Append", appendElements);
                }
                const replaceElements = [...actions.replace.entries()];
                if (replaceElements.length) {
                    console.log("Append", replaceElements);
                }
                if (actions.remove.size) {
                    console.log ("Remove", actions.remove);
                }
                break;
            }

            case Node.ATTRIBUTE_NODE: {
                console.log ("Set Attribute", node.nodeName, "on", node.originalOwnerElement, "to", actions.setAttribute);
                break;
            }

            case Node.TEXT_NODE: {
                console.log ("Set text content for", node.parentNode, "to", actions.textContent);
                break;
            }
        }
    });
}
// This function runs on requestAnimationFrame to run pending Node actions
export function doUpdateDOM() {
    let { nodeActionsMap } = NODES_STATE;
    if (nodeActionsMap.size) {
        // logNodeActions();
        const DOMActions = resolveNodeActionsMapToDOMActions(nodeActionsMap);
        DOMActions.forEach(DOMAction=> DOMAction());
        NODES_STATE.nodeActionsMap = new Map();
    }
}

