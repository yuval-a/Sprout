import StateManager from "./StateManager.js";
import { StatefulArrayHandler } from "./proxy_handlers.js";
import { handleStateChange } from "./state_utils.js";
import { putObjectInDebugMode } from "./debug_utils.js";
import { DEBUG_MODE } from "./consts.js";

class StatefulArray extends Array {

    // This will define which "constructor" JS calls whenever it needs to construct a new array while calling some Array native functions
    static get [Symbol.species]() {
        return Array;
    }

    // If any of these are "set" - handle state change in the value
    dependencyProps = new Map();

    // We set the $$operation property on functions that manipulates the array in a way that can change its length,
    // to prevent redundant calls for handleStateChange.
    // The call will be made when the "length" property of the array will be changed
    splice(...args) {
        this.$$operation = "splice";
        const result = super.splice(...args);
        delete this.$$operation;
        return result;
    }
    /*
    push(...args) {
        this.$$operation = "push";
        const result = super.push(...args);
        delete this.$$operation;
        return result;
    }
    pop(...args) {
        this.$$operation = "pop";
        const result = super.pop(...args);
        delete this.$$operation;
        return result;
    }
    */
    shift(...args) {
        this.$$operation = "shift";
        const result = super.shift(...args);
        delete this.$$operation;
        return result;
    }
    unshift(...args) {
        this.$$operation = "splice";
        const result = super.unshift(...args);
        delete this.$$operation;
        return result;
    }

    sort(...args) {
        this.$$operation = "sort";
        const result = super.sort(...args);
        delete this.$$operation;
        handleStateChange(this.parentStateObject._stateManager, this.arrayStateProp);
        return result;
    }

    reverse(...args) {
        this.$$operation = "reverse";
        const result = super.reverse(...args);
        delete this.$$operation;
        handleStateChange(this.parentStateObject._stateManager, this.arrayStateProp);
        return result;
    }

    fill(...args) {
        this.$$operation = "fill";
        const result = super.fill(...args);
        delete this.$$operation;
        handleStateChange(this.parentStateObject._stateManager, this.arrayStateProp);
        return result;
    }
    
    copyWithin(...args) {
        this.$$operation = "copyWithin";
        const result = super.sort(...args);
        delete this.$$operation;
        handleStateChange(this.parentStateObject._stateManager, this.arrayStateProp);
        return result;
    }

    slice(...args) {
        this.$$operation = "slice";
        const result = super.slice(...args);
        delete this.$$operation;
        return result;
    }

    toArray() {
        this.$$operation = "toArray";
        const result = [];
        for (let i = 0, len=this.length; i<len; i++) {
            result.push(Object.assign({}, this[i]));
        }
        delete this.$$operation;
        return result;
    }
    // noConvertToStateItems can be used in internal methods where a normal array is returned and you just want to recreate a StatefulArray,
    // with the same state items

    // NOTE: original Array constructor can get a series of arguments to build an array from, OR a single number,
    // to create an array with that number as a length
    constructor(initialArray, parentStateObject, arrayStateProp, noConvertToStateItems=false, appScope = window) {
        if (!Array.isArray(initialArray)) {
            throw Error("Argument for StateFulArray constructor must be an array!");
        }

        const rawArray = initialArray;
        let statefulArray;
        if (!noConvertToStateItems) {
            statefulArray = rawArray.map((item, index)=> {
                if (item?.hasOwnProperty('state')) return item;
                if (Array.isArray(item)) return item; // return new StatefulArray(item, this[index].state, index, false, appScope); 
                if (typeof item === 'object') return new StateManager(item, arrayStateProp, parentStateObject._stateManager, false, appScope);
                return item;
            });
        }
        super(...statefulArray);

        this.parentStateObject = parentStateObject;
        this.arrayStateProp = arrayStateProp;
 
        statefulArray = new Proxy(this, StatefulArrayHandler(parentStateObject?._stateManager, arrayStateProp, appScope));
        return statefulArray;
    }
}

if (DEBUG_MODE) {
    StatefulArray = putObjectInDebugMode(StatefulArray, "StatefulArray");
}

export default StatefulArray;