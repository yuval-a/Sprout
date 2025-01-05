import StateManager from "./StateManager.js";
import { handleStateChange } from "./state_utils.js";
import StatefulArray from "./StatefulArray.js";
import { BUILT_IN_STATE_PROPS, ERROR_MESSAGES } from "./consts.js";

export const StatefulArrayHandler = function(parentStateManager, arrayStateProp, appScope = window) {
    const StateManager = appScope.SPROUT_CONFIG.stateManagerClass;
    return {
        set(targetArray, property, value) {
            // A change in array length triggers state change in the array state prop
            if (property === "length") {
                const setResult = Reflect.set(targetArray, property, value);
                parentStateManager.setDirtyProp(arrayStateProp);
                // queueMicrotask(()=> handleStateChange(parentStateManager, arrayStateProp));
                return setResult;
            }

            // Return if the value is the same
            if (targetArray[property] === value) return true;

            const index = Number(property);
            if (!isNaN(index)) { // Check if the property is a numeric index
                // If we set it to a new object, convert it to a state object
                if (typeof value === 'object' && (!value.hasOwnProperty('_stateManager') && !value.hasOwnProperty('state'))) {
                    value = new StateManager(value, arrayStateProp, parentStateManager, false, appScope);
                }
                // Make sure state values are always state manager values
                // Sometimes they can be state objects (because of the custom get handler in the Proxy)
                if (value.hasOwnProperty('_stateManager')) {
                    value = value._stateManager;
                }
                // This means the object actions are part of a native array function ('splice' etc.), and that we should NOT
                // mark $$mapAction on values
                if (!targetArray.hasOwnProperty('$$operation')) {
                    let doStateChangeHandle = false;
                    if (index < targetArray.length) {
                        doStateChangeHandle = true;
                    }
                    const setResult = Reflect.set(targetArray, property, value);
                    // Only handle state change if this is a change for an existing array item,
                    // if it's a new item, it will already be handled on the "length" property set
                    // Without this check we will have a redundant state check
                    if (doStateChangeHandle) {
                        parentStateManager.setDirtyProp(arrayStateProp);
                        //queueMicrotask(()=> handleStateChange(parentStateManager, arrayStateProp));
                    }
                    return setResult;
                }
            }
            return Reflect.set(targetArray, property, value);
        },
        
        get(targetArray, property, receiver) {
            // if (typeof property === 'symbol') return Reflect.get(...arguments);
            // if (property === 'hasOwnProperty') return Reflect.get(...arguments);
            const index = Number(property);
            if (!isNaN(index)) {
                if (!targetArray[index]) return undefined;
                if (targetArray[index].hasOwnProperty('state')) return targetArray[index].state;
                // Could be another array
                return targetArray[index];
            }

            /*
            // If this property is set on the array, it means the get is part of a "dependency check"
            if (targetArray.hasOwnProperty("_gettingDependenciesFor")) {
                targetArray.dependencyProps.set(property, targetArray._gettingDependenciesFor);
                delete targetArray._gettingDependenciesFor;
            }
            */
            
            return Reflect.get(...arguments);
        }
    }
}

export const StateObjectValueHandler = function(rootStateObj, objPropertyName, appScope = window) {
    return {
        defineProperty(targetObj, property, descriptor) {
            if (typeof descriptor?.value !== "undefined") {
                const value = descriptor.value;
                // Could already be a StatefulArray (needs to find better way to detect this)
                if (Array.isArray(value)) {
                    if (!value?.[0]?._stateManager) {
                        descriptor.value = new StatefulArray(descriptor.value, rootStateObj, objPropertyName, false, appScope);
                    }
                }
                else if (typeof value === "object") {
                    descriptor.value = new Proxy(descriptor.value, StateObjectValueHandler(rootStateObj, objPropertyName, appScope))

                }
            }
            else if (typeof descriptor?.get === "function") {
                descriptor.get.call(targetObj);
            }
            // Don't use "arguments" here - they are not linked to argument changes in 'strict'
            const definePropertyResult = Reflect.defineProperty(targetObj, property, descriptor);
            const stateManager = rootStateObj._stateManager;
            stateManager.setDirtyProp(objPropertyName);
            // queueMicrotask(()=> handleStateChange(stateManager, objPropertyName));
            return definePropertyResult;
        },
    }
}
export const StateHandler = function(stateObj, appScope = window) {
    return {
        defineProperty(targetState, stateProp, descriptor) {
            if (BUILT_IN_STATE_PROPS.includes(stateProp) || targetState?._binding) {
                return Reflect.defineProperty(...arguments);
            }
            const origTargetState = targetState;
            const dependencies = new Set();
            // Will be the actual prop name if this is a state hook setter
            let setStateProp;
            targetState = new Proxy(targetState, {
                get(target, property, receiver) {
                    if (property === "_global") {
                        target._global._gettingDependenciesFor = stateProp;
                        target._global._localStateManager = target._stateManager;

                    }
                    if (BUILT_IN_STATE_PROPS.includes(property)) {
                        return Reflect.get(...arguments);
                    }
                    if (Array.isArray(target[property])) {
                        target[property]._gettingDependenciesFor = stateProp;
                    }
                    dependencies.add(property);
                    return Reflect.get(...arguments);
                }
            });
            if (typeof descriptor?.value !== "undefined") {
                const value = descriptor.value;
                // Could already be a StatefulArray (needs to find better way to detect this)
                if (Array.isArray(value)) {
                    // Setter Hook
                    if (stateProp.indexOf('set_') === 0) {
                        const deps = value?.[1];
                        if (!deps) throw Error(ERROR_MESSAGES.NO_DEPENDENCIES_ARRAY_IN_SET_HOOK(stateProp));
                        // Second item should be an array of dependencies
                        value?.[1].forEach(depProp=> {
                            dependencies.add(depProp);
                        });
                        // Third item can be a boolean stating if to run the setter on initialization
                        if (value?.[2] === true) {
                            setStateProp = stateProp.substring(4);
                            const func = value?.[0];
                            if (func && typeof func === "function") {
                                stateObj[setStateProp] = func.call(stateObj);
                            }
                        }
                        else {
                            if (value?.[3]) {
                                stateObj[setStateProp] = value[3]
                            }
                        }
                    }
                    else if (!value?.[0]?._stateManager) {
                        descriptor.value = new StatefulArray(descriptor.value, stateObj, stateProp, false, appScope);
                    }
                }
                else if (typeof value === 'object') {
                    descriptor.value = new Proxy(descriptor.value, StateObjectValueHandler(stateObj, stateProp, appScope));
                }
            }
            else if (typeof descriptor?.get === "function") {
                descriptor.get.call(targetState);
            }

            if (dependencies.size) {
                dependencies.forEach(dep=> stateObj._stateManager.addStateDependency(dep, stateProp));
            }

            // Don't use "arguments" here - they are not linked to argument changes in 'strict'
            const definePropertyResult = Reflect.defineProperty(origTargetState, stateProp, descriptor);
            const stateManager = stateObj._stateManager;
            if (setStateProp) stateProp = setStateProp;
            if (!origTargetState.hasOwnProperty("_populate"))
                stateManager.setDirtyProp(stateProp);
                // queueMicrotask(()=> handleStateChange(stateManager, stateProp));
            return definePropertyResult;
        },
        get(targetState, property, receiver) {
            if (property === 'hasOwnProperty') return Reflect.get(...arguments);
            // Global state access
            if (!targetState.hasOwnProperty('_global')) {
                if (targetState.hasOwnProperty("_gettingDependenciesFor")) {
                    targetState._stateManager.addGlobalStateDependency(property, targetState._gettingDependenciesFor, targetState._localStateManager);
                    delete targetState._gettingDependenciesFor;
                    delete targetState._localStateManager;
                    return Reflect.get(...arguments);
                }
            }
            // property can be a Symbol on rare occasions, then indexOf will be undefined (that's the reason for the question mark)
            // This handles using the negate operator on state properties
            if (typeof property?.indexOf === 'function' && property?.indexOf('!') === 0) {
                const originalProperty = property.substring(1);
                if (targetState.hasOwnProperty(originalProperty)) {
                    return !targetState[originalProperty];
                }
            }
            return Reflect.get(...arguments);
        }
    }
};
