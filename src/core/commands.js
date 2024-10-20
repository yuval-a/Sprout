import { handleStateChange, mapStateArrayToElements } from "./state_utils.js";
import { SUPPORTED_ATTRIBUTES_FOR_BINDING, SUPPORTED_PROPERTIES_FOR_BINDING, SUPPORTED_INPUT_TYPES_FOR_VALUE_BINDING } from "./consts.js";
import { putObjectInDebugMode } from "./debug_utils.js";
import { DEBUG_MODE } from "./consts.js";
import { isElementAList } from "./browser_utils.js";

// Functions that run and handles "Command" attributes. Note, they should always be called
// with the "this" context set to the custom element the command is defined on
let COMMANDS = {
    map: function(commandValue) {
        // The command value ("argument") is "<stateProp>:<custom element name>"
        const [stateItemsPropertyName, customElementName] = commandValue.split(':');
        const parentElement = this;
        const [stateItemsArray, theState] = parentElement.getState(stateItemsPropertyName, true);
        if (!stateItemsArray || !Array.isArray(stateItemsArray)) {
            console.warn ("state value for _map is not an array, in state property: " + stateItemsPropertyName);
            return null;
        }
        // const theState = mapStateToElements(stateItemsPropertyName, customElementName, thiselement);
        if (!theState) {
            console.warn (`Mapping ${stateItemsPropertyName} to ${customElementName} failed!`);
            return;
        }
        const stateManager = theState._stateManager;
        stateManager.addStateMap(stateItemsPropertyName, customElementName, parentElement);
        // Run handle state change explicitely - to add the new mapped child elements to the pending DOM append actions
        handleStateChange(stateManager, stateItemsPropertyName);
    },
    text: function(commandValue) {
        const stateProp = commandValue;
        this.initialSetText(stateProp);
    },
    bind: function(commandValue) {
        if (!this.isReactiveElement) {
            console.warn ("Cannot use commands on non reactive elements! (Used _bind)");
            return;
        }
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
   }
}

if (DEBUG_MODE) {
    COMMANDS = putObjectInDebugMode(COMMANDS, "COMMANDS");
}

export { COMMANDS };

