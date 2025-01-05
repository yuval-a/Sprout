// Convert attribute values to "typed" values
export function attributeValueToTypedValue(attrValue) {
    let typedValue = attrValue;
    if (attrValue === "true") typedValue = true;
    else if (attrValue === "false") typedValue = false;
    else if (!isNaN(Number(attrValue))) typedValue = Number(attrValue);
    return typedValue; 
}

// Check if attribute node is a "Command" or a "State Attribute" 
export function isSpecialAttribute(attrNode) {
    if (typeof attrNode !== "object" && attrNode.constructor.name !== "Attr") throw Error("Passed non Attribute to isSpecialAttribute!");
    return attrNode.nodeName.indexOf('_') === 0 || attrNode.nodeValue.indexOf('$') === 0;
}