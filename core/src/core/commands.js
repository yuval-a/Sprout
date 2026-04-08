import { mapStateArrayToElements } from "../shared/state_utils.js";
import { SUPPORTED_ATTRIBUTES_FOR_BINDING } from "../shared/consts.js";
import { isElementAList } from "./DOM_utils.js";
import { makeElementMapParent} from "./HTMLElementMapParent.js";

function mapStateToElements(stateItemsPropertyName, customElementName, parentElement) {
    let [stateItemsArray, theState] = parentElement.getState(stateItemsPropertyName, true);
        if (!STRICT) {
        if (!stateItemsArray || !Array.isArray(stateItemsArray)) {
            throw new Error ("State value for _map is not an array, in state property: " + stateItemsPropertyName);
        }
        if (!stateItemsArray.hasOwnProperty("_isStatefulArray")) {
            throw new Error(`Array '${stateItemsPropertyName}' used for State Map must be a stateful array. Use a direct array value or an SSH with statify:true or stateMap: true `);
        }
    }
    stateItemsArray.makeStateMap();
    const wrapInElement = isElementAList(parentElement) ? "li" : undefined;
    const elements = mapStateArrayToElements(stateItemsArray, customElementName, wrapInElement, parentElement);
    parentElement.innerHTML = "";
    if (elements.length) {
        // parentElement SHOULD BE HTMLElementMapParent (with "superpowers" such as keyMap)
        parentElement.append(...elements);
    }
    return theState;
}

// Functions that run and handles "Command" attributes. Note, they should always be called
// with the "this" context set to the Element instance the command is defined on
export const COMMANDS = {
    map: function(commandValue) {
        // The command value ("argument") is "<stateProp>:<custom element name>"
        const [stateItemsPropertyName, customElementName] = commandValue.split(':');
        const thiselement = this;
        // Give this element "Map parent element super powers"
        makeElementMapParent(thiselement);

        this.onAfterPaint(()=> {
            const theState = mapStateToElements(stateItemsPropertyName, customElementName, thiselement);
            if (!theState) throw new Error(`Mapping ${stateItemsPropertyName} to ${customElementName} failed!`);
            const stateArray = theState[stateItemsPropertyName];
            if (!stateArray || !stateArray.hasOwnProperty('_isStatefulArray')) {
                throw new Error(`State array ${stateItemsPropertyName} for State Map must be stateful!`);
            }
            theState._stateManager.addStateMap(stateItemsPropertyName, customElementName, thiselement);
        });
    },
    text: function(commandValue) {
        const stateProp = commandValue;
        this.initialSetText(stateProp);
        // DO NOT CALL .normalize()! It might change the Text Nodes!
    },
    bind: function(commandValue) {
        if (!STRICT) {
            if (this.tagName !== "INPUT") {
                console.warn (`_bind command is only supported on input elements!`);
                return;
            }
        }
        const [attributeName, statePropName] = commandValue.split(':');
        if (!STRICT) {
            if (!attributeName || !statePropName) {
                console.warn ("Incorrect usage of _bind command! Please pass <attribute-name>:<state-property-name>");
                return;
            }
            if (!SUPPORTED_ATTRIBUTES_FOR_BINDING.has(attributeName)) {
                console.warn (`Attribute ${attributeName} is not supported for _bind command!`);
                return;
            }
        }
        this.bindAttributeToState(attributeName, statePropName);
   },
   bindprop: function(commandValue) {
        const [statePropName, elementPropName] = commandValue.split(':');
        const [_, stateObject] = this.getState(statePropName, true);
        if (!STRICT) {
            if (!stateObject) {
                console.warn (`State property ${statePropName} not found for bindProp command!`);
                return;
            }
        }
        this[elementPropName] = stateObject[statePropName];
   }
}
