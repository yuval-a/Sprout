import { stateToElement } from "./state_utils";
import { isElementAList } from "./DOM_utils";

export const NODES_STATE = {
    // This is a global object that maps abstract "DOM actions" to nodes (the nodes can be elements, text nodes, attribute nodes)
    // It is resolved to actual DOM API functions on RequestAnimationFrame calls, and then is RESET.
    // it is a "singleton" object
    nodeActionsMap: new Map()
}

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
        get hasPendingActions() {
            return (this.append.size || this.replace.size || this.after.size || this.remove.size);
        }
    });
}


// This *updates*/*"fills"* the nodeActionsMap!
export function generateStateNodeActions(stateManager, stateProp) {
    const { nodeActionsMap } = NODES_STATE;
    const value = stateManager.state[stateProp];
    const stateNodes = stateManager.stateNodes[stateProp];
    const stateMaps = stateManager.stateArrayMaps[stateProp];
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

    if (stateMaps) {
        const stateMapArray = value;

        stateMaps.forEach(({ customElementName, parentElement})=> {
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
                    }
                    else if (customElement.state !== stateItem) {
                        const replaceWithChild = stateToElement(stateItem, customElementName, isElementAList(parentElement) ? "li" : undefined);
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
                    // Make sure we don't already have a pending append action for the same state object
                    const newChild = stateToElement(stateItem, customElementName, isElementAList(parentElement) ? "li" : undefined);
                    addAppendAction(stateMapNodeActions, newChild, stateItem);
                }
            }

            if (stateMapNodeActions.hasPendingActions) {
                nodeActionsMap.set(parentElement, stateMapNodeActions);
            }
        });
    }

    if (conditionallyRenderingElements) {
        // Should be slot element
        conditionallyRenderingElements.forEach(element=> {
            requestAnimationFrame(()=> element.renderSlot(stateProp));
        });
    }
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
                if (typeof value === "string" && node.nodeValue !== value) {
                    batchActions.push (()=> node.nodeValue = value);
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
            nodeActions.remove.values().forEach((removes)=> {
                removes.forEach((nodeToRemove)=> {
                    if (nodeToRemove.parentNode && nodeToRemove.parentNode === node) {
                        batchActions.push(()=> node.removeChild(nodeToRemove));
                    }
                });
            });
            nodeActions.append.values().forEach((appends)=> {
                appends.forEach((newChildElement)=> {
                    batchActions.push(()=> node.appendChild(newChildElement));
                });
            });
            
        }
    });
    return batchActions;
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
// This function runs periodically on requestAnimationFrame to run pending Node actions
export function doUpdateDOM() {
    let { nodeActionsMap } = NODES_STATE;
    if (nodeActionsMap.size) {
        const DOMActions = resolveNodeActionsMapToDOMActions(nodeActionsMap);
        DOMActions.forEach(DOMAction=> DOMAction());
        NODES_STATE.nodeActionsMap = new Map();
    }
    // requestAnimationFrame(doUpdateDOM);
}