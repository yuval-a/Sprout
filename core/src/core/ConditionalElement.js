import { attributeValueToTypedValue, bindPropAttribute } from "./attr_utils";
import { CONDITIONAL_OPERATORS, SYMBOL_NAMES } from "../shared/consts";
import { queueConditionalRender } from "../shared/paint_utils";
import { conditionalElements } from "../Cougar/state_plugins";

// returns a Boolean according to the conditional equality of conditional to conditionStateValue
export function resolveCondition(operator, value, conditionStateValue) {
    if (operator === "always") return true;
    switch (operator) {
        case '==':  return  (conditionStateValue == value);
        case '===': return  (conditionStateValue === value);
        case '!=':  return  (conditionStateValue != value);
        case '!==': return  (conditionStateValue !== value);
        case '<':   return  (conditionStateValue < value);
        case '<=':  return  (conditionStateValue <= value);
        case '>':   return  (conditionStateValue > value);
        case '>=':  return  (conditionStateValue >= value);
        default:    return  (conditionStateValue == value);
    }
}

export function getConditionalElementClass(ReactiveElementClass) {
    class ConditionalElement extends ReactiveElementClass {

        #isConditionStateProp
        #conditionProp
        #renderMap

        static observedAttributes = ["_condition"];

        render(isFirstRender=false) {
            let conditionValue;
            if (this.#isConditionStateProp) {
                conditionValue = this.getState(this.#conditionProp);
                if (conditionValue === undefined) {
                    throw Error(`State value for ${this.#conditionProp} not found while rendering conditional-render element:`, this);
                }
            }
            else {
                conditionValue = this.getAttribute('_condition');
                if (conditionValue === undefined) {
                    throw Error(`_condition value not found while rendering conditional-render element:`, this);
                }
            }
            const elementsToRender = [];
            this.#renderMap.forEach(({ condition, elements })=> {
                const { operator, value } = condition;
                if (resolveCondition(operator, value, conditionValue)) {
                    elementsToRender.push(...elements);
                }
            });

            if (isFirstRender) {
                this.innerHTML = "";
                this.append(...elementsToRender);
            }
            else if (elementsToRender.length) {
                queueConditionalRender(this, ()=> {
                    this.innerHTML = "";
                    this.append(...elementsToRender);
                });
            }
        }

        // Groups elements to render according to conditional expressions (operation + condition)
        generateRenderMap() {
            const renderMap = new Map();
            renderMap.set("always", []);
            const children = [...this.children];
            children.forEach(conditionalChild=> {
                const _if = conditionalChild.getAttribute('_if').replaceAll(' ', '');
                if (_if) {
                    if (!renderMap.has(_if)) {
                        const [, operator, value] = cond.trim().split(CONDITIONAL_OPERATORS_REGEX);
                        const normalizedValue = attributeValueToTypedValue(value);
                        const conditionObj = { operator, value: normalizedValue }

                        renderMap.set(_if, { condition: conditionObj, elements: [ conditionalChild ]});
                    }
                    else {
                        renderMap.get(_if).elements.push(conditionalChild);
                    }
                }
                else {
                    renderMap.get("always").elements.push( conditionalChild );
                }
            });
            this.#renderMap = renderMap;
        }

        activate() {
            const condition = this.getAttribute("_condition");
            if (!condition) {
                throw Error("conditional-render elements must have a _condition attribute!");
            }

            if (condition.indexOf('@') === 0) {
                bindPropAttribute.call(this, "_condition", condition);
                this.#isConditionStateProp = false;
                this.#conditionProp = condition.substring(1);
            }
            else {
                this.#isConditionStateProp = true;
                this.#conditionProp = condition;
            }

            if (!STRICT) {
                if (!this.children || !this.children.length) {
                    console.warn("Conditional element doesn't have any children!");
                }
            }
            if (this.#isConditionStateProp) {
                const statePropName = this.#conditionProp;
                const [stateValue, stateObject] = this.getState(statePropName, true);
                if (typeof stateValue === undefined) {
                    throw Error(`State property ${statePropName} not defined for _condition command!`);
                }
                const stateManager = stateObject._stateManager;
                if (!stateManager.has("conditional-element")) stateManager.use(conditionalElements, 'conditional-element');
                stateManager.addConditionallyRenderingElements(statePropName, this);
                this.generateRenderMap();
                this.render(true);
            }
            else {
                this.render(true);
            }
        }
    }
    return ConditionalElement;
}
