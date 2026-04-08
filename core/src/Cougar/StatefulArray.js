import { setHiddenProperty } from "../shared/prop_utils.js";
import { StatefulArrayHandler } from "./proxy_handlers.js";
import { handleStateChange } from "../shared/state_utils.js";
import { ARRAY_CACHE_METHODS, ARRAY_MUTATE_NO_LENGTH_CHANGE_METHODS } from "../shared/consts.js";
import { ReadonlySet } from "../shared/code_utils.js";
import { newStateManager } from "./state_utils.js";

export default class StatefulArray extends Array {

    // We use this for the array proxy that calls doArrayOperation
    // which should only be called for native array functions.
    // Functions in this list are called directly (and not via doArrayOperation)
    static functions = new ReadonlySet([
        "constructor",
        "statifyArray",
        "addDirtyIndex",
        "doArrayOperation",
        "runArrayOperation",
        "makeStateMap",
        "mapStateKeys",
        "toArray"
    ]);

    arrayMaps = {}

    // This will define which "constructor" JS calls whenever it needs to construct a new array while calling some Array native functions
    static get [Symbol.species]() {
        return Array;
    }

    // Required, e.g. for using Array.from
    [Symbol.iterator]() {
        return super[Symbol.iterator]();
    }

    // Return [result, isNewArray] 
    // isNewArray means result should be considered a whole new array,
    runArrayOperation(operationName, method, args) {
        switch (operationName) {
            // Remove the first item
            // (Internally it moves all else one "left")
            case "shift": {
                this.lastOperation = ["shift"];
                const res = method.apply(this, args);
                return [res, false];
            }

            // Prepends ...elements to the beginning of array
            case "unshift": {
                this.lastOperation = ["unshift", [args.length]];
                const res = method.apply(this, args);
                return [res, false];
            }

            // Remove the last item
            case "pop": {
                this.lastOperation = ["pop"];
                const res = method.apply(this);
                return [res, false];
            }

            // Push ...elements
            case "push": {
                this.lastOperation = ["push", [args.length]];
                const res = method.apply(this, args);
                return [res, false];
            }

            // Delete from startIndex, add ...elements in offset
            case "splice": {
                const [startIndex, deleteCount] = args;
                const itemsToAdd = args.slice(2);
                this.lastOperation = ["splice", [startIndex, deleteCount, itemsToAdd]];
                const res = method.apply(this, args);
                return [res, false];
            }

            default: {
                this.lastOperation = undefined;
                const res = method.apply(this, args);
                return [res, Array.isArray(res)];
            }
        }
    }
    // setDirtyOperation should be true if the content of this array actually changes
    doArrayOperation(operationName, args, setDirtyProp=false) {
        this.$$operation = operationName;
        const prevLen = this.length;
        let result, isNewArray = false;
        if (ARRAY_CACHE_METHODS.has(operationName)) {
            const callbackFn = args[0];
            if (this.length && 
                Object.hasOwn(this.arrayMaps, operationName) &&
                this.arrayMaps[operationName].has(callbackFn)) {
                    const cachedArrayMapMetadata = this.arrayMaps[operationName].get(callbackFn);
                    if (this.lastDirtyTimestamp > cachedArrayMapMetadata.timestamp) {
                        [result, isNewArray] = this.runArrayOperation(operationName, super[operationName], args);                
                        this.arrayMaps[operationName].set(callbackFn, {
                            lastResult: result,
                            timestamp: new Date().getTime()
                        });
                    }
                    else {
                        result = cachedArrayMapMetadata.lastResult;
                    }
            }
            else {
                [result, isNewArray] = this.runArrayOperation(operationName, super[operationName], args);
                if (!Object.hasOwn(this.arrayMaps, operationName)) {
                    this.arrayMaps[operationName] = new Map();
                    this.arrayMaps[operationName].set(callbackFn, {
                        lastResult: result,
                        timestamp: new Date().getTime()
                    });
                }
            }
        }
        else {
            [result, isNewArray] = this.runArrayOperation(operationName, super[operationName], args);
        }

        

        // For order/content-only mutators (no length change), also dirty `${prop}.length`
        // so dependents that currently watch `.length` still re-run on reorder-only ops.
        const postLen = this.length;
        const isOrderOnly = (ARRAY_MUTATE_NO_LENGTH_CHANGE_METHODS.has(operationName) ||
            (operationName === 'splice' && postLen === prevLen));

        if (setDirtyProp && isOrderOnly) {
            this.parentStateObject._stateManager.setDirtyProp(`${this.arrayStateProp}.length`, true);
        }

        delete this.$$operation;

        if (setDirtyProp) {
            this.parentStateObject._stateManager.setDirtyProp(this.arrayStateProp);
        }

        return [result, isNewArray];
    }

    mapStateKeys() {
        this.forEach(item=> {
            const state = Object.hasOwn(item, "state") ? item.state : item;
            if (!STRICT) {
                if (!Object.hasOwn(state, "key")) {
                    console.warn(`Items in State Map Array ${this.arrayStateProp} SHOULD have a 'key' property!`);
                }
            }
            this.keyMap.set(state.key, state);
        });
    }

    makeStateMap() {
        this._isStateMap = true;
        this.keyMap = new Map();
        this.mapStateKeys();
    }


    // noConvertToStateItems can be used in internal methods where a normal array is returned and you just want to recreate a StatefulArray,
    // with the same state items
    // NOTE: original Array constructor can get a series of arguments to build an array from, OR a single number,
    // to create an array with that number as a length
    constructor(initialArray, parentStateObject, arrayStateProp, appScope = window, isStateMap = false) {
        const StateManager = appScope.SPROUT_CONFIG.stateManagerClass;

        if (!Array.isArray(initialArray)) {
            throw Error("Argument for StateFulArray constructor must be an array!");
        }

        const rawArray = initialArray;
        let statefulArray = rawArray.map((item, index)=> {
            let stateItem = item;

            // If already a state item - keep as is, otherwise - statify
            if (Object.hasOwn(item, 'state') || 
                Object.hasOwn(item, '_stateManager') ||
                Array.isArray(item)) return stateItem;
            if (typeof item === 'object') stateItem = newStateManager(item, arrayStateProp, parentStateObject._stateManager, handleStateChange, false, appScope);
            return stateItem;
        });
        super(...statefulArray);

        this.parentStateObject = parentStateObject;
        this.arrayStateProp = arrayStateProp;
        this.appScope = appScope;
        this.rawArray = rawArray;
        if (isStateMap) {
            this.makeStateMap();
        }

        statefulArray = new Proxy(this, StatefulArrayHandler(parentStateObject?._stateManager, arrayStateProp, appScope));
        setHiddenProperty(statefulArray, "_isStatefulArray", true);
        this.statefulArray = statefulArray;
        return statefulArray;
    }
}
