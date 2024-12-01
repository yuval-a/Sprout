function debugGetProxyHandler(scopeName, originalObject) {
    return {
        get(target, property, receiver) {
            if (typeof property === "symbol") return Reflect.get(...arguments);
            console.debug (`Property ${property} called on ${scopeName}`);
            if (property === "prototype") {
                // return Object.getPrototypeOf(originalObject.prototype);
                return originalObject.prototype;
            }
            if (typeof target[property] === "function") {
                return new Proxy(target[property], debugApplyProxyHandler(property, `${scopeName}.${property}`));
            }
            else if (typeof target[property] === "object") {
                if (!target[property].hasOwnProperty("_stateManager")) {
                    return new Proxy(target[property], debugGetProxyHandler(`${scopeName}.${property}`));
                }
            }
            return Reflect.get(...arguments);
        }
    }
}

function debugApplyProxyHandler(funcName, scopeName) {
    return {
        construct(target, args, newTarget) {
            console.debug(`Constructing ${funcName}`);
            return Reflect.construct(target, args, newTarget);
        },
        apply(target, thisArg, argumentsList) {
            console.debug(`Function: ${funcName} with arguments: ${argumentsList} called on ${scopeName}`);
            return Reflect.apply(...arguments);
        },
    }
}
export function putObjectInDebugMode(obj, name) {
    return new Proxy(obj, debugGetProxyHandler(name, obj));
}