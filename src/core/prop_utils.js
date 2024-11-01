
// Sets an internal read-only "hidden" property on an object:
export function setHiddenProperty(obj, propName, propValue, enumerable=false) {
    Object.defineProperty(obj, propName, {
        value: propValue,
        configurable: false,
        writable: false,
        enumerable,
    });
}