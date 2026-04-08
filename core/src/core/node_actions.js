import { stateToElement, mapStateArrayToElements } from "../shared/state_utils.js";
import { getCustomElementFromMappedElement, isElementAList, isElementAListItem } from "./DOM_utils.js";
import { queuePaint, queueConditionalRender } from "../shared/paint_utils.js";
import { NODES_STATE } from "../shared/consts.js";
import { getStateMapArrayIterator } from "./StateMapArray.js";

const { nodeActionsMap } = NODES_STATE;
const { pendingPaintNodeManagers } = NODES_STATE;
function getNodeActionsForNode(node) {
    if (!nodeActionsMap.has(node)) nodeActionsMap.set(node, getNewNodeActionsObject(node.nodeType));
    const nodeActions = nodeActionsMap.get(node);
    return nodeActions;
}

export function setStateNodeValueAction(nodeManager, node, value) {
    if (node.nodeType === Node.ATTRIBUTE_NODE) {
        nodeManager.addNodeAction(node, {actionType: "setAttribute", actionValue: value} );
    }
    else if (node.nodeType === Node.TEXT_NODE) {
        nodeManager.addNodeAction(node, {actionType: "textContent", actionValue: value} );
    }
}

// stateIdentifier can be a State object (for state maps),
// or a State property (for conditionally rendered elements)
export function addAppendAction(nodeActions, nodeToAppend) {
    nodeActions.append.add(nodeToAppend);
}

// For a "detached" node - set it to reattach back to its parent
// As of May 2025 - this is implemented using display: none, and then changing back to the original display
export function setReattachAction(node) {
    const nodeActions = getNodeActionsForNode(node);
    nodeActions.reattach = true;
}

// This is an object used to represent pending node actions,
// that are batched and executed in reflows (requestAnimationFrame)
export function getNewNodeActionsObject(nodeType) {

    switch (nodeType) {
        case Node.ATTRIBUTE_NODE: {
            return {
                setAttribute: undefined
            }
        }

        case Node.TEXT_NODE: {
            return {
                textContent: undefined
            }            
        }

        case Node.ELEMENT_NODE: {
            return {
                // Nodes to append to the end of node's children, 
                append: new Set(),
                // A single operation, reattach to original parent element, after detachment, if true
                reattach: false,
                // Set values for native properties (this is here, because it can be related to rendering, e.g. checked, value)
                setProperty: new Map(),
                get hasPendingActions() {
                    return (
                        this.append.size ||
                        this.reattach ||
                        this.setProperty.size
                    );
                }
            }
        }
    }
}

function reconcileStateMapElement(stateMapArray, customElementName, parentElement, stateManager) {
    console.log ("[RECONCILE] LAST OPERATION:", stateMapArray.lastOperation);
    // If needed - the parent element will be detached,
    // so DOM changes to it will not be made on the main tree,
    // It will be reattached back reshaped, as a deferred functions (like all other DOM functions)
    let detachedParentElement = null;
    let mappedElementChange = false;
    const isParentList = isElementAList(parentElement);
    const replacedChildren = new Map();

    const refName = parentElement.getAttribute && parentElement.getAttribute('ref') || parentElement.refName || parentElement.tagName;
    const asState = (it)=> Object.hasOwn(it, 'state') ? it.state : it;
    const expectedItems = stateMapArray.map(asState);
    const keyOfChild = (el)=> {
        const st = isParentList ? el.firstElementChild?.state : el.state;
        return st ? st.key : el.stateKey;
    }
    const labelOfChild = (el)=> {
        const st = isParentList ? el.firstElementChild?.state : el.state;
        return st ? st.label : undefined;
    }

    try {
        console.log (
            `[RECONCILE] before (ref=${refName}), EXPECTED KEYS:`,
            expectedItems.map(it=> it?.key),
            'EXISTING KEYS',
            [...parentElement.children].map(keyOfChild),
            'EXPECTED LABELS',
            expectedItems.map(it=> it?.label),
            'EXISTING LABELS',
            [...parentElement.children].map(labelOfChild)
        );
    } catch(_) {}
    // A whole new array
    if (stateMapArray.isNewArray) {
        if (stateMapArray.length) {
            mappedElementChange = true;
            detachedParentElement = parentElement.detach();
            const wrapInElement =  isParentList ? "li" : undefined;
            const elements = mapStateArrayToElements(stateMapArray, customElementName, wrapInElement, detachedParentElement);
            detachedParentElement.innerHTML = '';
            detachedParentElement.append(...elements);
        }
    }
    else {
        // Last array method called is saved
        if (stateMapArray.lastOperation) {
            mappedElementChange = true;
            if (!detachedParentElement) detachedParentElement = parentElement.detach();
            const children = detachedParentElement.children;
            const [operation, args] = stateMapArray.lastOperation;
            switch (operation) {
                case "shift": {
                    detachedParentElement.removeChild(detachedParentElement.firstElementChild);
                    break;
                }
                case "unshift": {
                    // arg1 represents the number of elements prepended
                    // The elements prepended are already at the start of the State Array
                    const prependLength = args[0];
                    // Prepend in reverse to preserve order at the head
                    for (let i = prependLength - 1; i >= 0; i--) {
                        const stateItem = stateMapArray[i];
                        // If an element with this key already exists, move it to the head
                        const existing = detachedParentElement.keyMap?.get(stateItem.key);
                        if (existing) {
                            const first = detachedParentElement.firstElementChild;
                            if (existing !== first) {
                                // Move existing node to the head to preserve identity
                                detachedParentElement.insertBefore(existing, first);
                            }
                        } else {
                            const newChild = stateToElement(stateItem, customElementName, isParentList ? "li" : undefined, detachedParentElement);
                            // Ensure key is available before child activation
                            newChild.stateKey = stateItem.key;
                            detachedParentElement.prepend(newChild);
                        }
                    }
                    break;
                }
                case "pop": {
                    detachedParentElement.removeChild(detachedParentElement.lastElementChild);
                    break;
                }

                case "push": {
                    // args[0] is count of pushed items, not the previous length.
                    // The previous length equals current children count on the detached parent.
                    const startIndex = children.length;
                    for (let i=startIndex, len=stateMapArray.length; i<len; i++) {
                        const stateItem = stateMapArray[i];
                        const newChild = stateToElement(stateItem, customElementName, isParentList ? "li" : undefined, detachedParentElement);
                        // Ensure key is available before child activation
                        newChild.stateKey = stateItem.key;
                        detachedParentElement.appendChild(newChild);
                    }
                    break;
                }

                // splice(start, deleteCount, item1, item2, /* …, */ itemN)
                // Delete arg2 items from arg1,
                // arg3 can be an array of items, to replace from index arg1

                
                case "splice": {
                    // Normalize start and deleteCount against current children length
                    const currentLen = children.length;
                    const rawStart = args[0] ?? 0;
                    const rawDelete = args[1];
                    let startIndex =
                        rawStart < 0 ? Math.max(currentLen + rawStart, 0) : Math.min(rawStart, currentLen);
                    let deleteCount;
                    if (typeof rawDelete === "undefined" || rawDelete === Infinity) {
                        deleteCount = currentLen - startIndex;
                    } else if (rawDelete < 0) {
                        deleteCount = 0;
                    } else {
                        deleteCount = Math.min(rawDelete, currentLen - startIndex);
                    }
                    // If this is a pure delete and DOM already matches expected length, skip (idempotent)
                    const itemsToInsert = args[2] || [];
                    const expectedLen = stateMapArray.length;
                    if (itemsToInsert.length === 0 && currentLen === expectedLen) {
                        break;
                    }
                    // If this is a full-replace splice and DOM already at expected length, skip (idempotent)
                    const isFullReplace = (startIndex === 0 && deleteCount >= currentLen && itemsToInsert.length === expectedLen);
                    if (isFullReplace && currentLen === expectedLen) {
                        break;
                    }

                    // Delete exactly deleteCount nodes starting at startIndex
                    // Use fixed index because children is live and shrinks on each removal
                    for (let k = 0; k < deleteCount; k++) {
                        detachedParentElement.removeChild(children[startIndex]);
                    }

                    // 2) Insert new items (if any) at startIndex — do not replace
                    for (const item of itemsToInsert) {
                        const stateItem = item;
                        const newChild = stateToElement(
                            stateItem,
                            customElementName,
                            isParentList ? "li" : undefined,
                            detachedParentElement
                        );
                        const refNode = children[startIndex] ?? null; // null => append at end
                        detachedParentElement.insertBefore(newChild, refNode);
                        startIndex++;
                    }
                    break;
                }
            }
        }
        else {
            // Normal path: index-based reordering for stability across permutations
            const parentKeyMap = parentElement?.keyMap;
            const container = detachedParentElement ?? parentElement;

            for (let i = 0; i < expectedItems.length; i++) {
                const expected = expectedItems[i];
                const expectedKey = expected?.key;
                const currentChild = container.children[i];
                if (!currentChild) break;

                const currentState = isParentList ? currentChild.firstElementChild?.state : currentChild.state;
                const currentKey = currentState ? currentState.key : currentChild.stateKey;

                try { console.log(`[RECONCILE][normal] ref=${refName} idx=${i} have=${currentKey} want=${expectedKey} action=${currentKey===expectedKey?'keep':'move'}`); } catch(_) {}
                if (currentKey === expectedKey) {
                    // Same key (identity) at this position; if the derived state object instance changed,
                    // refresh the child so content reflects the new state while preserving identity.
                    if (currentState !== expected) {
                        mappedElementChange = true;
                        if (!detachedParentElement) detachedParentElement = parentElement.detach();
                        const newChild = stateToElement(expected, customElementName, isParentList ? "li" : undefined, detachedParentElement);
                        newChild.stateKey = expectedKey;
                        detachedParentElement.replaceChildWith(currentChild, newChild);
                        try { console.log(`[RECONCILE][normal] ref=${refName} idx=${i} refresh key=${expectedKey}`); } catch(_) {}
                    }
                    continue;
                }

                mappedElementChange = true;
                if (!detachedParentElement) detachedParentElement = parentElement.detach();

                // Prefer previously displaced element; fall back to keyMap lookup
                let elementToPut = replacedChildren.get(expectedKey) ?? parentKeyMap.get(expectedKey);
                if (elementToPut) {
                    // Place the element at the current index
                    const replacedChild = detachedParentElement.replaceChildWith(currentChild, elementToPut);
                    replacedChildren.set(currentKey, replacedChild);
                    try { console.log(`[RECONCILE][normal] ref=${refName} idx=${i} move via=${replacedChildren.has(expectedKey)?'replaced':'keyMap'}`); } catch(_) {}

                    // If the element we placed has the same key but outdated content (state instance), refresh it in place
                    const elemState = isParentList ? elementToPut.firstElementChild?.state : elementToPut.state;
                    if (elemState !== expected) {
                        const refreshed = stateToElement(expected, customElementName, isParentList ? "li" : undefined, detachedParentElement);
                        refreshed.stateKey = expectedKey;
                        detachedParentElement.replaceChildWith(elementToPut, refreshed);
                        try { console.log(`[RECONCILE][normal] ref=${refName} idx=${i} refresh-in-place key=${expectedKey}`); } catch(_) {}
                    }
                } else {
                    const newChild = stateToElement(expected, customElementName, isParentList ? "li" : undefined, detachedParentElement);
                    newChild.stateKey = expectedKey;
                    detachedParentElement.replaceChildWith(currentChild, newChild);
                    try { console.log(`[RECONCILE][normal] ref=${refName} idx=${i} create key=${expectedKey}`); } catch(_) {}
                }
            }

            // Remove any leftover children beyond expected length
            while ((detachedParentElement ?? parentElement).children.length > expectedItems.length) {
                mappedElementChange = true;
                if (!detachedParentElement) detachedParentElement = parentElement.detach();
                detachedParentElement.removeChild((detachedParentElement ?? parentElement).lastElementChild);
            }
        }
    }

    const numChildren = detachedParentElement ? detachedParentElement.children.length : parentElement.children.length;
    if (stateMapArray.length > numChildren) {
        mappedElementChange = true;
        if (!detachedParentElement) detachedParentElement = parentElement.detach();
        for (let index=detachedParentElement.children.length;index<stateMapArray.length;index++) {
            const state_Item = stateMapArray[index];
            // Avoid appending duplicates if an item with this key is already present after previous moves
            if (detachedParentElement.keyMap?.has(state_Item.key)) continue;
            let newChild;
            if (replacedChildren.has(state_Item.key)) {
                newChild = replacedChildren.get(state_Item.key);
            }
            else {
                newChild = stateToElement(state_Item, customElementName, isParentList ? "li" : undefined, detachedParentElement);
            }
            // Ensure key is available before child activation
            newChild.stateKey = state_Item.key;
            detachedParentElement.appendChild(newChild);
        }
    }

    const container = detachedParentElement ?? parentElement;
    try {
        console.log (
            `[RECONCILE] after (ref=${refName}), EXPECTED KEYS:`,
            expectedItems.map(it=> it?.key),
            'EXISTING KEYS',
            [...container.children].map(keyOfChild),
            'EXPECTED LABELS',
            expectedItems.map(it=> it?.label),
            'EXISTING LABELS',
            [...container.children].map(labelOfChild)
        );
    } catch(_) {}

    if (mappedElementChange) {
        stateManager.nodeManager.addNodeAction(detachedParentElement, { actionType: "reattach", actionValue: true })
    }
}


// This *updates*/*"fills"* the nodeActionsMap!
export function generateStateNodeActions(stateManager, stateProp, newValue) {
    const value = newValue; //stateManager.state[stateProp];
    if (stateProp === "todosFiltered") {
        performance.mark("todo-generate-node-actions");
    }

    const stateNodes = stateManager.nodeManager.stateNodes[stateProp];
    // This is a map, where keys are "parent elements" containing 
    // custom element instanced created from a state array ("state map").
    // The values are the custom element name. 
    // The actual array of state objects is in state[stateProp]
    const stateMapElements = stateManager.stateArrayMaps[stateProp];
    const conditionallyRenderingElements = stateManager.nodeManager.conditionallyRenderingElements[stateProp];

    // Note, since the value change is handled by a custom setter - that setter checks if the set value is the same - 
    // if it is - it won't call , and it won't reach here.
    if (stateNodes) {
        stateNodes.forEach(node=> {
            setStateNodeValueAction(stateManager.nodeManager, node, value);
        });
    }

    if (stateMapElements) {
        // An array of State objects, 
        // each equalivent to a custom element created "from" it
        const stateMapArray = value;

        console.log ("Reconcile state map, for: " + stateProp);
        stateMapElements.forEach((customElementName, parentElement)=> {
            reconcileStateMapElement(stateMapArray, customElementName, parentElement, stateManager);
        });
    }

    if (conditionallyRenderingElements) {
        conditionallyRenderingElements.forEach(element=> {
            queueConditionalRender(this, element.render.bind(this));
        });
    }

    if (stateManager.nodeManager.paintStatus === "pending") {
        stateManager.nodeManager.queuePaint();
    }
    /*
    // If there are Node Actions (which translates to DOM actions), queue repaint
    if (nodeActionsMap.size) {
        queuePaint();
    }
    */
}

// Translates/maps Node Actions to actual DOM operations
export function resolveNodeActionsMapToDOMActions(nodeActionsMap) {
    const attributeActions = [];
    const textActions = [];
    const elementActions = [];
    const reattachActions = [];
    const propertySetActions = [];

    nodeActionsMap.forEach((nodeActions, node)=> {
        switch (node.nodeType) {
            case Node.ATTRIBUTE_NODE: {
                const value = nodeActions.setAttribute;
                const typeOfValue = typeof value;
                if (typeOfValue !== 'undefined') {
                    if (typeOfValue === "boolean") {
                        if (!node.hasOwnProperty("originalOwnerElement")) {
                            throw Error("originalOwnerElement not found on boolean attribute node! Should never happen!");
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
                        if (typeOfValue === "string" && node.nodeValue !== value) {
                            attributeActions.push (()=> node.nodeValue = value);
                        }
                    }
                }
                break;
            }

            case Node.TEXT_NODE: {
                if (nodeActions.textContent !== undefined) {
                    const value = String(nodeActions.textContent);
                    if (node.nodeValue !== value) {
                        textActions.push (()=> node.nodeValue = value);
                    }
                }
                break;
            }

            case Node.ELEMENT_NODE: {
                // Append
                for (const newChildElement of nodeActions.append.values()) {
                    elementActions.push(()=> node.appendChild(newChildElement));
                }

                // setProperty
                for (const [key, value] of nodeActions.setProperty) {
                    if (node[key] !== value) {
                        propertySetActions.push(()=> node[key] = value)
                    }
                }
                // Reattach
                if (nodeActions.reattach) {
                    reattachActions.push(()=> node.reattach());
                    if (node?.pendingKeyMapActions?.size) {
                        reattachActions.push(()=> {
                            for (const keyMapAction of node.pendingKeyMapActions) {
                                keyMapAction();
                            }
                            node.pendingKeyMapActions.clear();
                        });
                    }
                    nodeActions.reattach = false;
                }
            }
            break;
        }
    });

    return [attributeActions, textActions, propertySetActions, elementActions, reattachActions ];
}
