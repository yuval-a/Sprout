import { defineStateExpressionResolver, sortDeps } from "./state_utils.js";
import { handleStateChange, handleStateDependency, isSetterHook } from "../shared/state_utils.js";
import { GLOBAL_STATE_FUNCTION_NAME, GLOBAL_STATE_NOT_SET_YET } from "../shared/consts.js";
import { setHiddenProperty } from "../shared/prop_utils.js";
import { queueAnimationFrame } from "../shared/paint_utils.js";
import { callSetterHook } from "./state_utils.js";
import { parseStateExpression } from "../shared/parse_utils.js";
import { NodeManager } from "./NodeManager.js";
import { makeReactive, populateInitialState } from "./reactivity_utils.js";
const stateChangeHandlers = new Map();

function queueStateChange(element, stateChangeHandler) {
    stateChangeHandlers.set(element, stateChangeHandler);
    queueAnimationFrame(
        Array.from(stateChangeHandlers.values()), 
        "STATE_CHANGE",
        ()=> stateChangeHandlers.clear()
    );
}

// This class actually handles "State". It returns a proxied "state" object,
// while handling all state changes and triggers behind the scenes

// Lifecycle:
// 1. Dirty Prop
// 2. Queue STATE_CHANGE -> handleStateChanges to rAF
// 3. For each prop changed: 
// 3A. Run handleStateChange
// 3B. Run handleStateChange for all local dependencies
// 3C. Run handleStateChange for all global dependencies
class StateManager {

    isInitializing = false;
    
    // The privateState is the "source of truth" for the values of the state,
    // the keys are the same as the "public" keys
    privateState = {};

    // This represents the "publicly" exposed state object
    // It will be wrapped in a Proxy
    state = new EventTarget();


    // A map that maps state props to "dependencies", each time a stateProp which is a key here,
    // is changed, a state change is triggered for its dependencies as well
    stateDependencies = new Map();

    // These are used when the state object has a "parent", e.g an object inside a Stateful Array
    parentStateProp
    parentStateManager

    // State props that were changed and needs to trigger possible state changes
    dirtyProps = new Set();

    // Node Manager saves bindings between Nodes and state,
    // translates state chanages into DOM actions and queue them for next paint.
    nodeManager = new NodeManager();
    
    // Names of "plugins" that are turned on for the State Manager instance (e.g. "map", "conditional-element");
    #plugins = new Set();
    
    setDirtyProp(prop, queueHandleState=true) {
        // state properties beginning with $$ are internal "utility" meta properties
        if (this.state.$$isInitializing) return;
        const lengthIndex = prop.indexOf('.length');
        const checkProp = lengthIndex > 0 ? prop.substring(0, lengthIndex) : prop;
        if (!Object.hasOwn(this.state, checkProp)) {
            throw Error(`Error in setDirtyProp. State has no property: '${prop}'. This should never happen`);
        }
        this.dirtyProps.add(prop);
        if (Array.isArray(this.state[checkProp])) {
            this.state[checkProp].lastDirtyTimestamp = new Date().getTime();
        }
        if (queueHandleState) {
            queueStateChange(this, this.handleStateChanges.bind(this));
        }
    }

    handleStatePropDependencies(depStateProps) {
        const dependenciesMap = this.stateDependencies;
        const globalDependenciesMap = this?.globalStateDependencies;
        depStateProps.forEach(depStateProp=> {
            handleStateDependency(this, depStateProp, this.appScope);
            // If it was a setter hook, it re-set the value of its equivalent state prop
            const changedStateProp = isSetterHook(depStateProp) ? depStateProp.substring(4) : depStateProp;
            if (dependenciesMap?.has(changedStateProp)) {
                const dependenciesSet = dependenciesMap.get(changedStateProp);
                const [deps, setterDeps] = sortDeps(dependenciesSet);
                if (setterDeps.size) {
                    this.handleStatePropDependencies(setterDeps);
                }
                if (deps.size) {
                    this.handleStatePropDependencies(deps);
                }
            }

            if (globalDependenciesMap?.has(changedStateProp)) {
                const globalDeps = globalDependenciesMap.get(changedStateProp);
                globalDeps.forEach((depsSet, localStateManager)=> {
                    const [deps, setterDeps] = sortDeps(depsSet);
                    if (setterDeps.size) {
                        localStateManager.handleStatePropDependencies(setterDeps);
                    }
                    if (deps.size) {
                        localStateManager.handleStatePropDependencies(deps);
                    }
                });
            }
        });

    }

    isGlobalState() {
        return !this.state.hasOwnProperty('_global');
    }

    // This sorts by order of execution,
    // according to the number of dependencies ("in-degrees"),
    // 0 runs first, then 1, and so on...
    // This is called: topological sort of a directed graph
    topologicalSortStateProps(stateProps) {
        return [...stateProps].toSorted((a, b)=> {

            // If one prop is a sub-property of another, ensure the base property comes first
            if (a.startsWith(b + '.')) return 1;
            if (b.startsWith(a + '.')) return -1;

            // Otherwise, sort by dependency count
            return ((this.stateDependencies[a]?.size || 0) - this.stateDependencies[b]?.size || 0);
        });
    }

    // This function uses handleStateChange which is passed to the class via its constructor (dependency injection),
    // it is the "bridge" between the State Manager to the "outside world"
    handleStateChanges() {
        if (!this.dirtyProps.size) return;
        performance.mark("todo-topological-sort");
        const stateProps = this.topologicalSortStateProps(this.dirtyProps);
        this.dirtyProps.clear();
        const isLocal = !this.isGlobalState();
        const deps = new Set();
        const setterDeps = new Set();
        const globalDeps = new Set();
        const thisStateManager = this;
        const thisState = thisStateManager.state
        stateProps.forEach(stateProp=> {
            if (isSetterHook(stateProp)) {
                stateProp = stateProp.substring(4);
                const setterHook = thisState[stateProp];
                performance.mark("todo-call-setter-hook");
                const hasNewValue = callSetterHook(setterHook, stateProp, thisStateManager, this.appScope);
                if (hasNewValue) {
                    this.handleStateChange(thisStateManager, stateProp, null);
                }
            }
            else {
                this.handleStateChange(thisStateManager, stateProp, null);
            }

            if (thisStateManager.stateDependencies.has(stateProp)) {
                thisStateManager.stateDependencies.get(stateProp).forEach(dep=> {
                    if (isSetterHook(dep)) setterDeps.add(dep);
                    else deps.add(dep);
                });
            }
            let globalState = thisStateManager.state?._global;
            if (globalState === GLOBAL_STATE_NOT_SET_YET) {
                globalState = this.appScope[GLOBAL_STATE_FUNCTION_NAME]();
            }
            if (globalState !== GLOBAL_STATE_NOT_SET_YET) {
                const globalStateManager = globalState?._stateManager || thisStateManager;
                if (globalStateManager.globalStateDependencies.has(stateProp)) {
                    globalDeps.add(globalStateManager.globalStateDependencies.get(stateProp));
                }
            }
        });

        if (setterDeps.size) {
            this.handleStatePropDependencies(setterDeps);
        }
        if (deps.size) {
            this.handleStatePropDependencies(deps);
        }
        if (globalDeps.size) {
            globalDeps.forEach((deps, localStateManager)=> {
                localStateManager.handleStatePropDependencies(deps);
            });
        }

        thisStateManager.clearStateMapsLastOperation();

        // If this is a "child-state", we mark the prop in the containing state as dirty.
        if (this.parentStateManager) {
            this.parentStateManager.setDirtyProp(this.parentStateProp);
        }
    }

    // A StateManager instance can also be a "sub-state" object within a containing state object,
    // in this case (the optional) 'parentStateProp' and 'parentStateManager' are used to bind to its containing state object.
    constructor(initialState, parentStateProp, parentStateManager, handleStateFunction = handleStateChange, isGlobal = false, appScope=window) {
        this.isInitializing = true;
        this.parentStateProp = parentStateProp;
        this.parentStateManager = parentStateManager;
        this.handleStateChange = handleStateFunction;
        this.appScope = appScope;
        // this.state = {};

        // Saves the actual state manager instance to a readonly _stateManager
        setHiddenProperty(this.state, "_stateManager", this, true);

        this.state.$$isInitializing = true;
        this.state.populate = function(populateObject) {
            for (const property in populateObject) {
                if (this.hasOwnProperty(property)) {
                    this[property] = populateObject[property];
                }
            }
        }
        // If a "child state" - then allow mutability (adding new props)
        if (parentStateProp && parentStateManager) {
            this.state = makeReactive(this.state, parentStateProp, appScope);
        }        

        if (!STRICT) {
            if (!initialState || !Object.keys(initialState).length) {
                console.warn("Empty initial state objects should never be used!");
            }
        }
        // Local state
        if (!isGlobal) {
            const globalState = appScope[GLOBAL_STATE_FUNCTION_NAME]();
            setHiddenProperty(this.state, "_global", globalState, true);
        }
        // Global state
        else {
            // This maps depencdies between "local" state properties to global state changes
            // The difference between the normal dependencies object, is that each depenency
            // also includes a state object (which is the state context of the property),
            // in other words, if a local state "relies" on a global state change - we save this
            // mapping here.
            // The keys are global state properties, where each value is a Map,
            // in the map, the keys are local state manager objects, and the values are sets with
            // local property names
            this.globalStateDependencies = new Map();
            this.addGlobalStateDependency = (stateProp, depStateProp, localStateManager)=> {
                if (!this.globalStateDependencies.has(stateProp)) {
                    this.globalStateDependencies.set(stateProp, new Map());
                }
                const globalDeps = this.globalStateDependencies.get(stateProp);
                if (!globalDeps.has(localStateManager)) {
                    globalDeps.set(localStateManager, new Set());
                }
                globalDeps.get(localStateManager).add(depStateProp);
            }
        }

        populateInitialState(this, initialState, appScope);

        delete this.state.$$isInitializing;
        setHiddenProperty(this.state, "_isStateManager", true);
        setHiddenProperty(this.state, "_isActive", true, false);
        this.isInitializing = false;
    }

    // Each value is a set of state properties set as "dependencies" for a key State Property
    addStateDependency(stateProp, depStateProp) {
        if (!this.stateDependencies.has(stateProp)) {
            this.stateDependencies.set(stateProp, new Set());
        }
        this.stateDependencies.get(stateProp).add(depStateProp)
        if (Array.isArray(this.state[stateProp])) {
            this.addStateDependency(`${stateProp}.length`, depStateProp);
        }
    }
    clearStateDependencies(stateProp) {
        if (this.stateDependencies.has(stateProp)) {
            this.stateDependencies.set(stateProp, new Set());
        }
    }

    // parent element is an element that have the "_map" command - 
    // expected to contain instances of customElementName that were created from an array of State objects
    /*
    addStateMap(stateProp, customElementName, parentElement) {
        if (!this.stateArrayMaps.hasOwnProperty(stateProp)) {
            this.stateArrayMaps[stateProp] = new Map();
        }
        this.stateArrayMaps[stateProp].set(parentElement, customElementName);
    }
    */

    // ConditionalElements mapped to stateProp
    //addConditionallyRenderingElements(stateProp, element) {
        //this.nodeManager.addConditionallyRenderingElements(stateProp, element);
    //}
    
    // In the DOM realm - Node here is either an Attribute Node or a Text Node
    addStateNode(stateProp, stateNode) {
        this.nodeManager.addStateNode(stateProp, stateNode);
        /*
        if (!this.stateNodes.hasOwnProperty(stateProp)) {
            this.stateNodes[stateProp] = new Set();
        }

        this.stateNodes[stateProp].add(stateNode);

        // If this is an attribute node which is "bindable" (supported for the _bind command)
        // then we save a reference to its containing element
        if (SUPPORTED_ATTRIBUTES_FOR_BINDING.has(stateNode.nodeName)) {
            const bindaleAttributeStateNodes = this.nodeManager.bindableAttributesStateNodes.get(stateNode.nodeName);
            bindaleAttributeStateNodes.set(stateNode.originalOwnerElement, stateNode);
        }
        */
    }
    removeStateNode(stateProp, stateNode) {
        // this.stateNodes?.[stateProp].delete(stateNode);
        this.nodeManager.removeStateNode(stateProp, stateNode);
    }

    // statePropExpression can be a "literal" state property or a "state expression"
    // (See comment on parseStateExpression for reference)
    bindStatePropExpression(statePropExpression, type, args) {
        if (!type || !args) {
            [type, ...args] = parseStateExpression(statePropExpression);
        }
        const contextStateProp = args[0];
        if (!contextStateProp) {
            throw Error (`Must specify state property name for State expression: ${statePropExpression}`);
        }

        let stateObj = this.state;
        let descriptor = Object.getOwnPropertyDescriptor(stateObj, contextStateProp);
        if (!descriptor) {
            stateObj = stateObj._global;
            descriptor = Object.getOwnPropertyDescriptor(stateObj, contextStateProp);
        }
        if (!descriptor) {
            throw Error(`Could not bind state property ${contextStateProp}. State property ${contextStateProp} not defined!`);
        }

        if (Object.hasOwn(stateObj, statePropExpression)) return stateObj[statePropExpression];

        const isValueProp = descriptor.hasOwnProperty('value');
        const stateManager = this;

        let getter;

        switch (type) {
            case "negation": {
                const relevantState = isValueProp ? stateManager.privateState : stateManager.state;
                getter = ()=> { return !relevantState[contextStateProp] };
                defineStateExpressionResolver(statePropExpression, stateObj, getter, contextStateProp);
                break;
            }

            case "equality": {
                const equalityValue = args[1];
                if (!equalityValue) {
                    throw Error("Must specify equality value for equality expression (is_something:equalToThis)");
                }
                const relevantState = isValueProp ? stateManager.privateState : stateManager.state;
                getter = ()=> { return relevantState[contextStateProp] === equalityValue; }
                defineStateExpressionResolver(statePropExpression, stateObj, getter, contextStateProp);
                break;
            }

            case "ternary": {
                const truthyValue = args[1];
                if (!truthyValue) {
                    throw Error("Ternary state expression (prop?truthy:falsy) must include at least a truthy value!")
                }
                const falsyValue = args[2];
                const relevantState = isValueProp ? stateManager.privateState : stateManager.state;
                getter = 
                    falsyValue ? 
                    ()=> { return relevantState[contextStateProp] ? truthyValue : falsyValue } :
                    ()=> { return relevantState[contextStateProp] ? truthyValue : undefined };
                defineStateExpressionResolver(statePropExpression, stateObj, getter, contextStateProp);
                break;
            }
        }

        return stateObj[statePropExpression];
    }

    // Used for DEBUGGING!
    getStateDependencies() {
        return this.stateDependencies;
    }

    // This can be used to inject (DI) - "plugins" - extensions to the State Manager.
    use(factoryFunction, pluginName) {
        factoryFunction.call(this);
        this.#plugins.add(pluginName)
    }

    isUsing(pluginName) {
        return this.#plugins.has(pluginName);
    }
}    

export default StateManager;
