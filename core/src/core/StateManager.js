import { handleStateChange, populateStateFromInitialState } from "./state_utils.js";
import { StateHandler } from "./proxy_handlers.js";
import { GLOBAL_STATE_FUNCTION_NAME } from "./consts.js";
import { putObjectInDebugMode } from "./debug_utils.js";
import { DEBUG_MODE } from "./consts.js";
import { setHiddenProperty } from "./prop_utils.js";

// This class actually handles "State". It returns a proxied "state" object,
// while handling all state changes and triggers behind the scenes
class StateManager {

    // The privateState is used to actually contain values to read from,
    // as custom getters and setters are defined
    privateState = {}
    // This represents the "publicly" exposed state object
    state = {};

    // Saves "map" connections between a state array value and a custom element name,
    // this will enable creating/removing new custom elements when items of a state array change
    stateArrayMaps = {};
    // conditionallyRenderingElements = {};
    // A map that maps state props to "dependencies", each time a stateProp which is a key here,
    // is changed, a state change is triggered for its dependencies as well
    stateDependencies = {};
    conditionallyRenderingElements = {};

    // Maps state props to state nodes,
    // Keys are state props, and values are sets of Nodes
    stateNodes = {}

    // These are used when the state object is part of Stateful Array
    parentStateProp
    parentStateManager
    // parentStatePropName is used if the state object is e.g. an item of an array on a state object,
    // or a value in an object on a state object - any change on the child state object should trigger state
    // changes on the parentStateProp
    // host is the host element that the state is attached to
    
    dirtyProps = new Set();

    #handleStateChangeRAF_ID = null;
    setDirtyProp(prop) {
        this.dirtyProps.add(prop);
        if (this.#handleStateChangeRAF_ID) {
            cancelAnimationFrame(this.#handleStateChangeRAF_ID);
            // clearTimeout(this.#handleStateChangeRAF_ID);

        }
        this.#handleStateChangeRAF_ID = requestAnimationFrame(()=> {
            this.#handleStateChangeRAF_ID = null;
            if (this.dirtyProps.size > 0) {
                this.handleStateChanges();
            }
        });
    }

    handleStateChanges() {
        console.log ("Handling state changes for", this);
        const stateProps = [...this.dirtyProps];
        this.dirtyProps.clear();
        stateProps.forEach(prop=> {
            handleStateChange(this, prop);
        });
    }
    constructor(initialState, parentStateProp, parentStateManager, isGlobal = false, appScope=window) {
        this.parentStateProp = parentStateProp;
        this.parentStateManager = parentStateManager;

        // Saves the actual state manager instance to a readonly _stateManager
        setHiddenProperty(this.state, "_stateManager", this, true);
        
        // Initialize a proxy on the "public state"
        this.state = new Proxy(this.state, StateHandler(this.state, appScope));
        if (!isGlobal) setHiddenProperty(this.state, "_global", appScope[GLOBAL_STATE_FUNCTION_NAME](), true);
        else {
            // This maps depencdies between "local" state properties to global state changes
            // The difference between the normal dependencies object, is that each depenency
            // also includes a state object (which is the state context of the property),
            // in other words, if a local state "relies" on a global state change - we save this
            // mapping here.
            // The keys are global state properties, where each value is a Map,
            // in the map, the keys are local state manager objects, and the values are sets with
            // local property names
            this.globalStateDependencies = {};
            this.addGlobalStateDependency = (stateProp, depStateProp, stateManager)=> {
                if (!this.globalStateDependencies.hasOwnProperty(stateProp)) {
                    this.globalStateDependencies[stateProp] = new Map();
                }
                if (!this.globalStateDependencies[stateProp].has(stateManager)) {
                    this.globalStateDependencies[stateProp].set(stateManager, new Set());
                }
                this.globalStateDependencies[stateProp].get(stateManager).add(depStateProp);
            }
        }
        if (initialState) {
            populateStateFromInitialState(this.state, initialState);
        }

        setHiddenProperty(this.state, "_isActive", this, true);
    }

    addStateDependency(stateProp, depStateProp) {
        if (!this.stateDependencies.hasOwnProperty(stateProp)) {
            this.stateDependencies[stateProp] = new Set();
        }
        this.stateDependencies[stateProp].add(depStateProp);
    }

    addStateMap(stateProp, customElementName, parentElement) {
        if (!this.stateArrayMaps.hasOwnProperty(stateProp)) {
            this.stateArrayMaps[stateProp] = new Map();
        }
        this.stateArrayMaps[stateProp].set(parentElement, customElementName);
    }


    addConditionallyRenderingElements(stateProp, element) {
        if (!this.conditionallyRenderingElements.hasOwnProperty(stateProp)){
            this.conditionallyRenderingElements[stateProp] = new Set();
        }
        element.originalParentElement = element.parentElement || element.host?.shadowRoot;
        this.conditionallyRenderingElements[stateProp].add(element);
    }
    
   
    // Node here is either an Attribute Node or a Text Node
    addStateNode(stateProp, stateNode, isBooleanStateProp=false) {
        if (!this.stateNodes.hasOwnProperty(stateProp)) {
            this.stateNodes[stateProp] = new Set();
            this.setAndBindStateProperty(stateProp, isBooleanStateProp);
        }
        this.stateNodes[stateProp].add(stateNode);
    }
    setAndBindStateProperty(stateProp) {
        let stateObj = this.state;
        let originalStateProp = stateProp;
        const isNegationProp = stateProp.indexOf('!') === 0;
        if (isNegationProp) {
            originalStateProp = stateProp.substring(1);
        }
        let descriptor = Object.getOwnPropertyDescriptor(stateObj, originalStateProp);
        if (!descriptor) {
            stateObj = stateObj._global;
            descriptor = Object.getOwnPropertyDescriptor(stateObj, originalStateProp);
            if (!descriptor) {
                throw Error(`Could not bind state prop ${stateProp}. State prop ${originalStateProp} not defined!`);
            }
        }

        stateObj._binding = true;

        // Some state props can be getters (which usually references other state values)
        // These should be treated differently: should not be saved in privateState, and should not have a setter defined
        const isValueProp = descriptor.hasOwnProperty('value');
        const stateManager = stateObj._stateManager;

        if (isNegationProp) {
            const negateStateProp = stateProp;
            if (isValueProp) {
                if (!stateManager.privateState.hasOwnProperty(negateStateProp)) {
                    Object.defineProperty(stateObj, negateStateProp, {
                        get() {
                            return !stateManager.privateState[originalStateProp];
                        },
                        set() {
                            throw Error("Cannot directly set a negation State property!");
                        },
                        enumerable: true,
                    });
                    stateManager.addStateDependency(originalStateProp, negateStateProp);
                }
            }
            else {
                if (!stateManager.state.hasOwnProperty(negateStateProp)) {
                    Object.defineProperty(stateObj, negateStateProp, {
                        get() {
                            return !stateManager.state[originalStateProp];
                        },
                        set() {
                            throw Error("Cannot directly set a negation State property!");
                        },
                        enumerable: true,
                    });
                    stateManager.addStateDependency(originalStateProp, negateStateProp);
                }
            }
        }
        else {
            if (isValueProp) {
                if (!stateManager.privateState.hasOwnProperty(stateProp)) {
                    stateManager.privateState[stateProp] = stateObj[stateProp];
                }
                Object.defineProperty(stateObj, stateProp, {
                    set(value) {
                        const currentVal = stateManager.privateState[stateProp];
                        if (value === currentVal) return;
                        // Sets value to "private state"
                        stateManager.privateState[stateProp] = value;
                        handleStateChange(stateManager, stateProp);
                        // If this is an item in a Stateful Array, also trigger a state change for the state prop that contains the array
                        if (stateManager.parentStateManager) {
                            handleStateChange(stateManager.parentStateManager, stateManager.parentStateProp);
                        }
                    },
                    get() {
                        // Value is always retrieved from the "private" state
                        return stateManager.privateState[stateProp];
                    }
                });
            }
            // If is a getter then - it can't be set, and the getter will return the value.
        }
        delete this.state._binding;
    }
}    

if (DEBUG_MODE) {
    StateManager = putObjectInDebugMode(StateManager, 'StateManager');
}

export default StateManager;
