import { StateFunctionDependencyHandler, depsProxyHandler } from "./proxy_handlers.js";
import { handleStateChange, isBuiltInStateProp, isSetterHook } from "../shared/state_utils";
import StateManager from "./StateManager";
import StatefulArray from "./StatefulArray";
import { setHiddenProperty } from "../shared/prop_utils.js";
import { conditionalElements, stateMaps } from "./state_plugins.js";
import { GLOBAL_STATE_NOT_SET_YET } from "../shared/consts.js";
/* Results of setter hooks are UNSTATIFIED */

export function newStateManager(initialState, parentStateProp, parentStateManager, handleStateFunction = handleStateChange, isGlobal = false, appScope=window)
 {
    const stateManager = new StateManager(initialState, parentStateProp, parentStateManager, handleStateFunction, isGlobal, appScope);
    stateManager.use(conditionalElements, "conditional-element");
    stateManager.use(stateMaps, "map");
    return stateManager;
}

export function statifyArray(array, stateProp, state, appScope = window, isStateMap = false) {
    if (Object.hasOwn(array, '_isStatefulArray')) return array;
    const args = [array, state, stateProp, appScope, isStateMap];
    /*
    let statefulArray;
    if (array.isDerivedArray) {
        statefulArray = new StatefulArrayDerived(...args, array.indexMap);
        array.originalArray.addDerivedArray(array);
    }
    else {
        */
        const statefulArray = new StatefulArray(...args);
   // }

    if (!state.hasOwnProperty(`${stateProp}.length`)) {
        Object.defineProperty(state, `${stateProp}.length`, {
            get() { return this[stateProp].length }
        });
    }
    return statefulArray;
}

export function statifyArrayDeriveFrom(fromArray, array, stateProp, state, appScope = window, indexMap) {
    if (Object.hasOwn(array, '_isStatefulArray')) return array;
    const args = [array, state, stateProp, appScope, indexMap];
    const statefulArray = new StatefulArrayDerived(...args);
    if (!state.hasOwnProperty(`${stateProp}.length`)) {
        Object.defineProperty(state, `${stateProp}.length`, {
            get() { return this[stateProp].length }
        });
    }
    fromArray.addDerivedArray(array);
    return statefulArray;
}

/* Makes value "stateful" (makes it reactive),
 * essentialy turns an object into a StateManager, or an array into a StatefulArray
 * Primitives are left untouched
 */
export function statifyValue(value, stateProp, stateManager, appScope = window, isStateMap = false) {
    if (isBuiltInStateProp(stateProp)) return value;
    if (Array.isArray(value)) value = statifyArray(value, stateProp, stateManager.state, appScope, isStateMap);
    else if (typeof value === 'object' && value !== null && !value.hasOwnProperty('_stateManager')) {
        value = newStateManager(value, stateProp, stateManager, handleStateChange, false, appScope).state;
    }
    return value;
}

/* Called once for each setter hook */
export function initSetterHook(setterArray, stateProp, stateManager, appScope=window) {
    const setterHookName = `set_${stateProp}`;
    let [setterFunc, setterOptions] = setterArray;
    if (typeof setterFunc !== "function") {
        throw Error("Setter hooks must define a function as the first item!");
    }
    const state = stateManager.state;
    setterOptions.deps = setterOptions.deps ?? "auto";
    let result;

    // If init + once is set, we don't need to save dependencies
    if (!(setterOptions.init && setterOptions.once)) {
        // auto - will detect the setter function dependencies automatically
        if (setterOptions.deps === "auto") {
            if (!setterOptions.reevaluate) {
                let deps, globalDeps;
                [deps, globalDeps, result] = getDeps(setterFunc, state);
                deps.forEach(dep=> {
                    stateManager.addStateDependency(dep, setterHookName);
                });
                globalDeps?.forEach(dep=> {
                    stateManager.addStateDependency(dep, setterHookName);
                    state._global._stateManager.addGlobalStateDependency(dep, setterHookName, stateManager);
                });
            }
            else {
                // reevaluate - means that the dependencies will reevaluate each time the setter re-runs
                const stateDependencyHandler = StateFunctionDependencyHandler(stateManager, setterHookName, appScope);
                setterFunc = new Proxy(setterFunc, stateDependencyHandler);
                // We redefine the setter, as we proxied the setter hook function
                setterArray[0] = setterFunc;
                // Object.defineProperty(state, setterHookName, { value: setterArray, configurable: true });
            }
        }
        else {
            // Explicit depdencies array
            setterOptions.deps.forEach(dep=> {
                if (dep.indexOf('global') === 0) {
                    const globalDep = dep.substring(dep.indexOf('global.')+7);
                    state._global.addGlobalStateDependency(setterHookName, globalDep, stateManager);
                }
                else {
                    stateManager.addStateDependency(dep, setterHookName);
                }
            });
        }
    }
    // Result should be retrieved from the privateState
    Object.defineProperty(state, stateProp, {
        get() {
            // This could be accessed from a dependency check function
            if (Object.hasOwn(state, "$$accessCount")) {
                if (!Object.hasOwn(state.$$accessCount, stateProp)) {
                    state.$$accessCount[stateProp] = 1;
                }
                else {
                    state.$$accessCount[stateProp]++;
                }
            }
            return stateManager.privateState[stateProp];
        },
        set() {
            throw Error("Cannot directly set the state value of a result of a setter hook function!");
        },
    });

    // init - means the setter will run upon initialization (first state populate),
    // and will save the result on a state prop
    if (setterOptions.init) {
        // DO NOT STATIFY SETTER HOOK RESULTS!
        // It's possible we already have the result from the dependency check call before
        if (!result) result = setterFunc.call(state);
        if (setterOptions.statify || setterOptions.stateMap) result = statifyValue(result, stateProp, stateManager, appScope, setterOptions.stateMap);
        stateManager.privateState[stateProp] = result;
        stateManager.setDirtyProp(stateProp);
    }
}

export function callSetterHook(setterArray, stateProp, stateManager, appScope=window) {
    const state = stateManager.state;
    const originalValue = stateManager.privateState[stateProp];
    if (originalValue === undefined) {
        // First time the Setter hook is called
        initSetterHook(setterArray, stateProp, stateManager, appScope);
    }
    const [setterFunc, setterOptions] = setterArray;
    if (typeof setterFunc !== "function") {
        throw Error("Setter hooks must define a function as the first item!");
    }
    let result = setterFunc.call(state);
    
    let hasNewValue = false;
    if (result === undefined) {
        throw Error("State Set Hook functions MUST return a value");
    }

    if (setterOptions.statify || setterOptions.stateMap)  result = statifyValue(result, stateProp, stateManager, appScope, setterOptions.stateMap);

    if (result !== originalValue) {
        stateManager.privateState[stateProp] = result;
        hasNewValue = true;
    }

    // once - means the setter is run once, save on the state prop, and then
    // the setter is removed
    if (setterOptions.once) {
        // Delete original setter hook, as it is only meant to run once
        delete state[`set_${stateProp}`];
    }
    return hasNewValue;
}

// Turna an object with properties and the number of times each was accessed,
// to a set. Mainly used to also track .length accesses correctly.
export function resolveAccessCountToDepsSet(depsCount) {
    let lengthIndex;
    for (let prop in depsCount) {
        lengthIndex = prop.indexOf('.length');
        if (lengthIndex !== -1) {
            depsCount[prop.substring(0, lengthIndex)]--;
        }
    }
    const deps = new Set(Object.keys(depsCount).filter(dep=> depsCount[dep] > 0));
    return deps;
}

// Get usages (accesses) of properties in fromObject,
// that occurs in ofFunction
// Also returns the result of the function call 
export function getDeps(ofFunction, fromStateObject) {
    let hasGlobal = false;
    const depsProxy = new Proxy(fromStateObject, depsProxyHandler());
    depsProxy.$$accessCount = {};

    if (Object.hasOwn(depsProxy, '_global') && depsProxy._global !== GLOBAL_STATE_NOT_SET_YET) {
        hasGlobal = true;
        depsProxy._global = new Proxy(depsProxy._global, depsProxyHandler);
        depsProxy._global.$$accessCount = {};
    }
    const result = ofFunction.call(depsProxy);
    const deps = resolveAccessCountToDepsSet(depsProxy.$$accessCount);
    // We need to explicitely delete - EVEN from the proxy,
    // since we don't define a "set handler", original behavior is preserved
    // and $$accessCount is also set on the original state object!
    delete depsProxy.$$accessCount;
    let globalDeps = null;
    if (hasGlobal) {
        globalDeps = resolveAccessCountToDepsSet(depsProxy._global.$$accessCount);
        delete depsProxy._global.$$accessCount;
    }
    return [deps, globalDeps, result];
}

// A function that checks if the value of the descriptor is a setter hook or a getter function,
// And return the options set for it, if any
function getStateHookData(descriptor, property) {
    if (descriptor.get && typeof descriptor.get === "function") return {
        nativeGetter: true,
        func: descriptor.get,
        deps: "auto",
        reevaluate: false,
        init: false,
        isSetter: false
    }

    if (descriptor.value) {
        const value = descriptor.value;
        if (property.indexOf('set_') === 0 ) {
            if (!Array.isArray(value)) throw Error("State setter hooks must be arrays!");
            const hookOptions = value[1] || {};
            return {
                nativeGetter: false,
                func: value[0],
                deps: hookOptions.deps && Array.isArray(hookOptions.deps) ? hookOptions.deps : "auto",
                reevaluate: !!hookOptions.reevaluate,
                init:       !!hookOptions.init,
                once:       !!hookOptions.once,
                stateMap:   !!hookOptions.stateMap,
                statify:    !!hookOptions.statify,
                isSetter: property.indexOf('set_') === 0,
            }
        }
    }
}

// StateManager is a StateManager instance (with a public state property), initialState is a "static" initial state object.
// If globalState is null, we don't need to handle dependences between the (local) state and global state
// This function is called as part of the initialization of a StateManager instance - 
// when it is "activated"
export function populateStateFromInitialState(stateManager, initialState, appScope = window) {

    const state = stateManager.state;
    const descriptors = Object.getOwnPropertyDescriptors(initialState);

    for (const key in descriptors) {
        const descrp = descriptors[key];
        if (isBuiltInStateProp(key)) {
            Object.defineProperty(state, key, descrp);
            continue;
        }

        let hookFunc;

        // If this is a State Hook (a 'set_' or get functions).
        const stateHook = getStateHookData(descrp, key);
        if (stateHook) {
            const statePropName = stateHook.isSetter ? key.substring(4) : key;
            hookFunc = stateHook.func;
            hookFunc.bind(state);

            if (stateHook.isSetter && !stateHook.nativeGetter) {
                // It will call the hook function if init is set to true, as well
                initSetterHook(descrp.value, statePropName, stateManager, appScope);
                // if "once" is on, we need to be able to delete it later
                if (stateHook.once) descrp.configurable = true;
                Object.defineProperty(state, key, descrp);
            }
            // Native getters only evaluate dependencies once on init,
            // they do not reevalaute on each call
            else if (stateHook.nativeGetter) {
                descrp.get.isStateGetter = true;
                const getFunc = descrp.get;
                const [deps, globalDeps] = getDeps(getFunc, state);
                deps.forEach(dep=> {
                    stateManager.addStateDependency(dep, key);
                });
                globalDeps?.forEach(dep=> {
                    stateManager.addStateDependency(dep, key);
                    state._global._stateManager.addGlobalStateDependency(dep, key, stateManager);
                });
                descrp.get.bind(state); // = hookFunc;
                Object.defineProperty(state, statePropName, descrp);
            }

        } // End staterHook condition
        
        // Direct value 
        else if (descrp.hasOwnProperty('value')) {
            const stateProp = key;
            const value = statifyValue(descrp.value, stateProp, stateManager, appScope);
            if (!stateManager.privateState.hasOwnProperty(stateProp)) {
                stateManager.privateState[stateProp] = value;
            }
            Object.defineProperty(state, stateProp, {
                set(value) {
                    const currentVal = stateManager.privateState[stateProp];
                    if (value === currentVal) return;
                    // Can't be "STATE MAP" - state maps must be top level - mention it in readme!
                    value = statifyValue(value, stateProp, stateManager, appScope);
                    // Sets value to "private state"
                    stateManager.privateState[stateProp] = value;
                    stateManager.setDirtyProp(stateProp);

                    // If an array value was set to a new array, 
                    // then also count it as an array.length change!
                    stateManager.setDirtyProp(`${stateProp}.length`);
                },
                get() {
                    // Value is always retrieved from the "private" state
                    return stateManager.privateState[stateProp];
                }
            });
        }
    }
}

export function defineStateExpressionResolver(statePropExpression, stateObj, getter, contextStateProp) {
    Object.defineProperty(stateObj, statePropExpression, {
        get: getter,
        set() {
            throw Error("Cannot directly set a State property expression");
        },
        enumerable: true,
    });
    stateObj._stateManager.addStateDependency(contextStateProp, statePropExpression);
}

// Takes a set of "dependency" prop names, and return two sets:
// setter hook props, and direct value deps
export function sortDeps(depsSet) {
    const deps = new Set();
    const setterDeps = new Set();
    depsSet.forEach(dep=> {
        if (isSetterHook(dep)) setterDeps.add(dep);
        else deps.add(dep);
    });
    return [deps, setterDeps];
}




