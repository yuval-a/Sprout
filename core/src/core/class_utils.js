
// "Mixes in" another class's capabilities into an existing instance
export function mixIn(instance, mixInClass) {
    Object.setPrototypeOf(instance, mixInClass.prototype);
}