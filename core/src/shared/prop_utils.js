
// Sets an internal read-only property. "hidden" (non-enumerable) by default
export function setHiddenProperty(obj, propName, propValue, enumerable=false) {
    Object.defineProperty(obj, propName, {
        value: propValue,
        configurable: false,
        writable: true,
        enumerable,
    });
}