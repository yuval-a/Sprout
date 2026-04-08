import { statifyValue, getDeps, statifyArrayDeriveFrom } from "./state_utils";
import { isBuiltInStateProp } from "../shared/state_utils.js";
import { ARRAY_MUTATE_METHODS, ARRAY_DERIVE_METHODS } from "../shared/consts.js";
import StatefulArray from "./StatefulArray.js";

/* Used for auto detecting dependencies
 * deps is an object, which is transformed in-place to represent 
 * dependency property names and their count (number of times they are accessed)
 * this is part of the way array.length is detected as a separate dependency
 */
export const depsProxyHandler = function () {
    //stateObject.$$accessCount = {};
    return {
        get(target, property, receiver) {
            if (isBuiltInStateProp(property) || property.indexOf('$$') === 0) {
                return Reflect.get(...arguments);
            }
            const descrp = Object.getOwnPropertyDescriptor(target, property);
            // Don't count getter functions as "dependencies"
            // (as they don't have a "value" that can change, they are only computed)
            if (descrp?.get?.isStateGetter) {
                return Reflect.get(...arguments);
            }
            if (!Object.hasOwn(target.$$accessCount, property)) {
                target.$$accessCount[property] = 1;
            }
            else {
                target.$$accessCount[property]++;
            }
            
            return Reflect.get(...arguments);
        }
    }
}


/* Proxy handler for re-detecting dependencies everytime a state function is called
 */
export const StateFunctionDependencyHandler = function(stateManager, stateProp, appScope = window) {
    const state = stateManager.state;
    return {
        apply: function (thisFunction, thisStateObject, argumentsList) {
            stateManager.clearStateDependencies(stateProp);
            const originalGlobalState = thisStateObject._global;
            const [deps, globalDeps, result] = getDeps(thisFunction, thisStateObject);
            deps.forEach(depProp=> {
                stateManager.addStateDependency(depProp, stateProp);
            });
            globalDeps?.forEach(depProp=> {
                originalGlobalState._stateManager.addGlobalStateDependency(depProp, stateProp, stateManager);
            });
            return result;
        }
    }
}

/* Proxy handler for StatefulArrays */
export const StatefulArrayHandler = function(parentStateManager, arrayStateProp, appScope = window) {
    // We need to immediately call handleStateChanges - and not queue it,
    // to avoid potential race conditions!
    // The false argument prevents async state change handling queueing
    const triggerStateChange = (triggerLength = false, triggerArray = true)=> {
        if (triggerArray) {
            parentStateManager.setDirtyProp(arrayStateProp, true);
        }
        if (triggerLength) {
            parentStateManager.setDirtyProp(`${arrayStateProp}.length`, true);
        }
    }

    let setResult;
    const keyOf = (item) => {
        if (!item) return undefined;
        if (Object.hasOwn(item, 'state')) return item.state?.key;
        return item.key;
    };
    const stateOf = (item) => (Object.hasOwn(item, 'state') ? item.state : item);
    return {
        set(targetArray, property, value) {
            // Temporary internally used properties will start with '$$'
            if (property.indexOf("$$") === 0) {
                // targetArray[property] = value;
                // return true;
                return Reflect.set(targetArray, property, value);
            }

            // A change in array length triggers state change as '[arrayName].length', 
            // and for [arrayName] if not part of an internal array operation/function
            if (property === "length") {
                setResult = Reflect.set(targetArray, property, value);
                targetArray.hasDirtyItems = true;
                if (!targetArray.hasOwnProperty("$$operation")) {
                    // Trigger state change for both the array itself and 'array.length'
                    triggerStateChange(true, true);
                }
                else {
                    // Trigger state change only for 'array.length'
                    triggerStateChange(true, false);
                }
                return setResult;
            }

            // Return if the value is the same
            if (targetArray[property] === value) return true;

            const index = Number(property)
            if (!isNaN(property)) { // Numeric index
                const index = Number(property);
                const prev = targetArray[index];
                const prevKey = keyOf(prev);
                // If we set it to a new object, convert it to a state object
                value = statifyValue(value, arrayStateProp, parentStateManager, appScope);

                // Make sure state values are always state manager values
                // Sometimes they can be state objects (because of the custom get handler in the Proxy)
                if (Object.hasOwn(value, '_stateManager')) {
                    value = value._stateManager;
                }
                // targetArray.hasDirtyItems = true;
                // if the array has '$$operation' it means it is there is an ongoing "native" array operation/function
                // (slice, push etc.) running.
                if (!targetArray.hasOwnProperty('$$operation')) {
                    let doStateChangeHandle = false;
                    // This means a modification to an existing array item (as opposed to an addition of a new one)
                    // New additions are triggered via the 'length' change
                    if (index < targetArray.length) {
                        doStateChangeHandle = true;
                    }
                    /*
                    const prevValue = targetArray[index];
                    targetArray.derivedArrays.forEach(array=> {
                        if (array.indexMap.has(prevValue)) {
                            array[index] = value;
                            array.indexMap.delete(prevValue);
                            array.indexMap.set(value, index);
                        }
                    });
                    */
                    setResult = Reflect.set(targetArray, property, value);
                    // Maintain array-side key map if this is a state map
                    if (setResult && targetArray._isStateMap) {
                        if (prevKey !== undefined) {
                            targetArray.keyMap.delete(prevKey);
                        }
                        const newKey = keyOf(value);
                        if (newKey !== undefined) {
                            targetArray.keyMap.set(newKey, stateOf(value));
                        }
                    }
                    // Only handle state change if this is a change for an existing array item,
                    // if it's a new item, it will already be handled on the "length" property set
                    // Without this check we will have a redundant state check
                    if (doStateChangeHandle) {
                        // targetArray.addDirtyIndex(index);
                        triggerStateChange();
                    }
                    return setResult;
                }
            }
            return Reflect.set(targetArray, property, value);
        },
        get(targetArray, property, receiver) {
            if (typeof property === "symbol") return Reflect.get(...arguments);
            if (property === "length" && 
                Object.hasOwn(targetArray.parentStateObject, "$$accessCount") && 
                !Object.hasOwn(targetArray, '$$operation'))
            {
                const arrStateProp = targetArray.arrayStateProp
                if (!Object.hasOwn(targetArray.parentStateObject.$$accessCount, `${arrStateProp}.length`)) {
                    targetArray.parentStateObject.$$accessCount[`${arrStateProp}.length`] = 1;
                }
                else {
                    targetArray.parentStateObject.$$accessCount[`${arrStateProp}.length`]++;

                }
            }

            if (property.indexOf && property.indexOf('__') === 0) {
                const nativeFunctionName = property.substring(2);
                return Reflect.get(targetArray, nativeFunctionName, receiver);
            }

            // If a function method is accessed, and we're capturing deps, bump base dep for read methods
            if (typeof targetArray[property] === 'function' && !StatefulArray.functions.has(property)) {
                const pso = targetArray.parentStateObject;
                    if (pso && Object.hasOwn(pso, '$$accessCount')) {
                    const methodName = String(property);
                    if (ARRAY_DERIVE_METHODS.has(methodName)) {
                        const arrayProp = targetArray.arrayStateProp;
                        pso.$$accessCount[arrayProp] = (pso.$$accessCount[arrayProp] || 0) + 1;
                    }
                }
            }

            // Don't call overriding functions if initializing (e.g. during initial state population)
            if (!parentStateManager.isInitializing && typeof targetArray[property] === 'function' &&
                // MAKE SURE to put all native StatefulArray class names here
                !StatefulArray.functions.has(property)) {
                    return function (...args) {
                        // .statefulArray is a reference to the PROXY itself
                        const [result, isNewArray] = targetArray.doArrayOperation.call(targetArray.statefulArray, property, args, ARRAY_MUTATE_METHODS.has(property));
                        /*
                        if (isNewArray) {
                            result.isDerivedArray = false;
                            result.indexMap = indexMap;
                            result.originalArray = targetArray;
                        }
                        */
                        return result;
                    };
            }

            const index = Number(property);
            if (!isNaN(index)) {
                const item = targetArray[index];
                if (typeof item === 'undefined') return undefined;
                if (item && Object.hasOwn(item, 'state')) return item.state;
                return item;
            }
            return Reflect.get(...arguments);
        },
        deleteProperty(targetArray, property) {
            // If not an index property - just delete it
            if (isNaN(Number(property))) {
                return Reflect.deleteProperty(targetArray, property);
            }
            const index = Number(property);
            const prev = targetArray[index];
            const prevKey = keyOf(prev);
            const deleteOkay = Reflect.deleteProperty(targetArray, property);
            if (deleteOkay && targetArray._isStateMap && prevKey !== undefined) {
                targetArray.keyMap.delete(prevKey);
            }
            return deleteOkay;
        }
    }
}

/* Used for "child state objects" - basically state values that are objects and should be reactive,
 * these can also be object items within state arrays
 */
export const StateObjectValueHandler = function(rootStateObj, objPropertyName, appScope = window) {
    return {
        set(targetObj, property, value) {
            if (isBuiltInStateProp(property)) {
                return Reflect.set(...arguments);
            }

            const setResult = Reflect.set(...arguments);
            const stateManager = rootStateObj._stateManager;
            if (stateManager.parentStateManager) {
                // Only trigger parent state change if not in the middle of operation
                // E.g. if this is an object inside an array in the middle of an operation - don't trigger
                //if (!Object.hasOwn(stateManager.parentStateManager.state[objPropertyName], '$$operation')) {
                performance.mark("todo-array-set-dirty-prop");
                stateManager.parentStateManager?.setDirtyProp(objPropertyName);
                //}
            }
            return setResult;
        },
        defineProperty(targetObj, property, descriptor) {
            if (isBuiltInStateProp(property)) {
                return Reflect.defineProperty(...arguments);
            }
            if (typeof descriptor?.value !== "undefined") {
                // Sub objects should be statified as well
                descriptor.value = statifyValue(descriptor.value, property, rootStateObj._stateManager, appScope);
            }

            // Don't use "arguments" here - they are not linked to argument changes in 'strict'
            return Reflect.defineProperty(targetObj, property, descriptor);
        },
        get(targetObj, property, receiver) {
            let getResult = Reflect.get(...arguments);
            // This has to be rebound because of the Proxy
            if (typeof getResult === 'function') return getResult.bind(targetObj);
            return getResult;
        }
    }
}
