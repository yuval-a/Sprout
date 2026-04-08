/* Factory functions for StateManager Plugins. Runs with StateManager as this context */

export function conditionalElements() {
    this.conditionallyRenderingElements = {};
    this.addConditionallyRenderingElements = function(stateProp, element) {
        this.nodeManager.addConditionallyRenderingElements(stateProp, element);
    }
}

export function stateMaps() {
    this.stateArrayMaps = {};
    this.addStateMap = function(stateProp, customElementName, parentElement) {
        if (!this.stateArrayMaps.hasOwnProperty(stateProp)) {
            this.stateArrayMaps[stateProp] = new Map();
        }
        this.stateArrayMaps[stateProp].set(parentElement, customElementName);
    }
    this.clearStateMapsLastOperation = function() {
        for (const stateMapProp of Object.keys(this.stateArrayMaps)) {
            delete this.state[stateMapProp].lastOperation;
        }
    }
}