import { mapStateArrayToElements } from "./state_utils.js";
import { SUPPORTED_ATTRIBUTES_FOR_BINDING, SUPPORTED_PROPERTIES_FOR_BINDING, SUPPORTED_INPUT_TYPES_FOR_VALUE_BINDING } from "./consts.js";
import { putObjectInDebugMode } from "./debug_utils.js";
import { isElementAList } from "./DOM_utils.js";

function mapStateToElements(stateItemsPropertyName, customElementName, parentElement) {
    const [stateItemsArray, theState] = parentElement.getState(stateItemsPropertyName, true);
    if (!stateItemsArray || !Array.isArray(stateItemsArray)) {
        console.warn ("state value for _map is not an array, in state property: " + stateItemsPropertyName);
        return null;
    }
    const wrapInElement = isElementAList(parentElement) ? "li" : undefined;
    const elements = mapStateArrayToElements(stateItemsArray, customElementName, wrapInElement);
    parentElement.innerHTML = "";
    if (elements.length) {
        parentElement.append(...elements);
    }
    return theState;
}

// Functions that run and handles "Command" attributes. Note, they should always be called
// with the "this" context set to the custom element the command is defined on
export const COMMANDS = {
    map: function(commandValue) {
        // The command value ("argument") is "<stateProp>:<custom element name>"
        const [stateItemsPropertyName, customElementName] = commandValue.split(':');
        const thiselement = this;
        const theState = mapStateToElements(stateItemsPropertyName, customElementName, thiselement);
        if (!theState) {
            console.warn (`Mapping ${stateItemsPropertyName} to ${customElementName} failed!`);
            return;
        }
        theState._stateManager.addStateMap(stateItemsPropertyName, customElementName, thiselement);
    },
    text: function(commandValue) {
        const stateProp = commandValue;
        this.initialSetText(stateProp);
        // DO NOT CALL .normalize()! It might change the Text Nodes!
    },
    bind: function(commandValue) {
        const [attributeName, statePropName] = commandValue.split(':');
        if (!attributeName || !statePropName) {
            console.warn ("Incorrect usage of _bind command! Please pass <attribute-name>:<state-prop-name>");
            return;
        }
        if (!attributeName in SUPPORTED_ATTRIBUTES_FOR_BINDING) {
            console.warn (`Attribute ${attributeName} is not supported for _bind command!`);
            return;
        }
        this.bindAttributeToState(attributeName, statePropName);

        if (SUPPORTED_PROPERTIES_FOR_BINDING.includes(attributeName)) {
            if (attributeName === "value" && this.tagName === "INPUT" && SUPPORTED_INPUT_TYPES_FOR_VALUE_BINDING.includes(this.getAttribute('type'))) {
                this.addEventListener("input", 
                    ()=> this.updateStateFromProperty("value")
                );
            }
            else if (attributeName === "checked" && this.tagName === "INPUT" && this.getAttribute('type') === "checkbox") {
                this.addEventListener("change", 
                    ()=> this.updateStateFromProperty("checked")
                );
            }
        }
   },
   condition: function(commandValue) {
        if (this.tagName !== "SLOT") {
            throw Error("condition command can only be used on a slot element!");
        }

        const statePropName = commandValue;
        const [stateValue, stateObject] = this.getState(statePropName, true);
        if (typeof stateValue === "undefined") {
            throw Error(`State property ${statePropName} not defined for _condition command!`);
        }
        this.slotChildren = [...this.children];
        this.slotChildren.forEach(childSlotElement=> 
            childSlotElement.setAttribute('_condition', statePropName));
        this.host.append(...this.slotChildren);
        this.innerHTML = "";
        this.renderSlot(statePropName);
        stateObject._stateManager.addConditionallyRenderingElements(statePropName, this);
   }  
}