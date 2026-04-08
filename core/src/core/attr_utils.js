import { BOOLEAN_ATTRIBUTES } from "../shared/consts";

// Convert attribute values to "typed" values
export function attributeValueToTypedValue(attrValue) {
    let typedValue = attrValue;
    if (attrValue === "true") typedValue = true;
    else if (attrValue === "false") typedValue = false;
    else if (!isNaN(Number(attrValue))) typedValue = Number(attrValue);
    return typedValue; 
}

// 'this' should be the element. attributeValue should start with '@'
export function bindPropAttribute(attributeName, attributeValue, host) {
    if (!STRICT) {
        if (!host) {
            console.warn(`Host element not found when binding prop attribute ${attributeName} to ${attributeValue}`);
        }
    }
    const propName = attributeValue.substring(1);
    const attrNode = this.getAttributeNode(attributeName);
    attrNode.nodeValue = host.getAttribute(propName);
    attrNode.isPropAttribute = true;
    if (!host.propAttributes.has(propName)) {
        host.propAttributes.set(propName, new Set());
    }
    host.propAttributes.get(propName).add(attrNode);
}

export function isBooleanAttribute(attributeName) {
    return BOOLEAN_ATTRIBUTES.has(attributeName);
}

export function isFalsyStringValue(value) {
    return value === "false" || value === "null" || value === "undefined" || value === "";
}
export function isStateAttribute(attrName) {
    return attrName.indexOf(':') === 0;
}

export function isPropAttribute(attrValue) {
    return attrValue.indexOf('@') === 0;
}
