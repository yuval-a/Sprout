export function setStateNodeAction(node, nodeActionsObject, value) {
    if (node.nodeType === Node.ATTRIBUTE_NODE)
        nodeActionsObject["setAttribute"] = value; 
    else if (node.nodeType === Node.TEXT_NODE)
        nodeActionsObject["textContent"] = value;
}

export function addRemoveAction(nodeActions, element) {
    nodeActions.remove.add(element);
}
export function addReplaceAction(nodeActions, oldElement, newElement) {
    nodeActions.replace.set(oldElement, newElement);
}
export function addAppendAction(nodeActions, element, stateObject) {
    nodeActions.append.set(stateObject, element);
}
// This is an object used to represent pending node actions,
// that are batched and executed in reflows (requestAnimationFrame)
export const getNewNodeActionsObject = ()=> ({
    // Nodes to append to the end of node's children, 
    // keys are state objects, to prevent duplicate pending
    append: new Map(),
    // Replace each key node on Map, with value node
    replace: new Map(),
    // Insert value node after key node in parent node's children
    after: new Map(),
    // Remove these nodes from the DOM
    remove: new Set()
})

export const NODES_STATE = {
    // This is a global object that maps abstract "DOM actions" to nodes (the nodes can be elements, text nodes, attribute nodes)
    // It is resolved to actual DOM API functions on RequestAnimationFrame calls, and then is RESET.
    // it is a "singleton" object
    nodeActionsMap: new Map()
}
