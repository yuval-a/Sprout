import { SUPPORTED_ATTRIBUTES_FOR_BINDING, BINDABLE_ATTRIBUTES_TO_STATE_NODES } from "../shared/consts.js";
import { getNewNodeActionsObject } from "../core/node_actions.js";
import { NODES_STATE } from "../shared/consts.js";
import { queuePaint } from "../shared/paint_utils.js";

const { pendingPaintNodeManagers } = NODES_STATE;

export class NodeManager {
    
    // Maps state props to state nodes,
    // Keys are state props, and values are sets of Nodes
    stateNodes = {}
    // This is to contain the special "conditional-rendering" custom elements
    conditionallyRenderingElements = {};


    // Bindable attributes - are attributes that can be bound to state properties - 
    // these are generally attributes that a user interaction can or should add or remove them
    // e.g. checked, value
    // Each value is a map with keys: DOM elements, values: State Attribute Nodes
    bindableAttributesStateNodes = new Map(
        [...BINDABLE_ATTRIBUTES_TO_STATE_NODES]
        .map(attributeName=> [attributeName, new Map()])
    );
    
    // Keys are nodes in the component
    // (child elements, attributes, text nodes),
    // values are sets of abstract DOM operations
    #nodeActions = new Map();

    paintStatus = null;

    // In the DOM realm - Node here is either an Attribute Node or a Text Node
    addStateNode(stateProp, stateNode) {
        if (!this.stateNodes.hasOwnProperty(stateProp)) {
            this.stateNodes[stateProp] = new Set();
        }

        this.stateNodes[stateProp].add(stateNode);

        // If this is an attribute node which is "bindable" (supported for the _bind command)
        // then we save a reference to its containing element
        if (SUPPORTED_ATTRIBUTES_FOR_BINDING.has(stateNode.nodeName)) {
            const bindaleAttributeStateNodes = this.bindableAttributesStateNodes.get(stateNode.nodeName);
            bindaleAttributeStateNodes.set(stateNode.originalOwnerElement, stateNode);
        }
    }
    removeStateNode(stateProp, stateNode) {
        this.stateNodes?.[stateProp].delete(stateNode);
    }

    // ConditionalElements mapped to stateProp
    addConditionallyRenderingElements(stateProp, element) {
        if (!this.conditionallyRenderingElements.hasOwnProperty(stateProp)){
            this.conditionallyRenderingElements[stateProp] = new Set();
        }
        element.originalParentElement = element.parentElement || element.host?.shadowRoot;
        this.conditionallyRenderingElements[stateProp].add(element);
    }

    addNodeAction(node, action) {
        if (!this.#nodeActions.has(node)) {
            this.#nodeActions.set(node, getNewNodeActionsObject(node.nodeType));
        }
        const nodeActions = this.#nodeActions.get(node);
        const { actionType, actionValue } = action;
        if (node.nodeType === Node.ELEMENT_NODE) {
            switch (actionType) {
                case "append": {
                    nodeActions.append.add(actionValue);
                    break;
                }
                case "setProperty": {
                    nodeActions.setProperty(actionValue.property, actionValue.value);
                    break;
                }
                case "reattach": {
                    nodeActions.reattach = true;
                    break;
                }
            }
        }
        else {
            nodeActions[actionType] = actionValue;
        }

        if (!this.paintStatus) { 
            this.paintStatus = "pending";
        }
    }

    queuePaint() {
        if (this.paintStatus === "pending") {
            pendingPaintNodeManagers.add(this);
            queuePaint();
            this.paintStatus = "queued";
        }
    }
    resolveToDOMActions() {
        const attributeActions = [];
        const textActions = [];
        const elementActions = [];
        const reattachActions = [];
        const propertySetActions = [];
    
        this.#nodeActions.forEach((nodeActions, node)=> {
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
    
        this.#nodeActions.clear();
        return [attributeActions, textActions, propertySetActions, elementActions, reattachActions ];
    }
}


