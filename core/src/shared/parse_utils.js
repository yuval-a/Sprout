


/* Possible expression:
 * literal: straight state prop,.
 * negation: !something (not something)
 * equality: is_something:equalityValue
 * ternary: somethingIsTruthy?returnThis:[elseThis]
 */
export function parseStateExpression(expression) {
    if (expression.indexOf('!') === 0) {
        return ["negation", expression.substring(1)]
    }
    let charIndex = 0;
    let parsed = expression[charIndex];
    let char;
    while (charIndex++ < expression.length) {
        char = expression[charIndex];
        if (charIndex == 3 && parsed == "is_") {
            return ["equality", ...expression.substring(3).split(':')];
        }
        if (char === '?') {
            return ["ternary", parsed, ...expression.substring(charIndex+1).split(':')];
        }
        parsed += char;
    }
    return ["literal", expression];
}

export function fromAttributeValue(value) {
    if (value === '') return true;
    if (value === null) return false;
    return value;
}

export function toAttributeValue(value) {
    if (value === true) return '';
    if (value === false) return null;
    return value;
}