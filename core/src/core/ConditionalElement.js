import { attributeValueToTypedValue } from "./attr_utils";
import { CONDITIONAL_OPERATORS } from "./consts";
import { queueConditionalRender } from "./paint_utils";

// returns a Boolean according to the conditional equality of conditional to conditionStateValue
export function resolveConditional(conditional, conditionStateValue) {
    const typeOf = typeof conditional;
    if (typeOf !== 'string') {
        return conditionStateValue === conditional;
    }
    else {
        if (conditional === "always") return true;
        if (CONDITIONAL_OPERATORS.includes(conditional[0])) {
            const conditionFn = new Function(`return ${conditionStateValue}${conditional}`);
            return conditionFn();
        }
        else {
            return conditionStateValue === conditional;
        }
    }
}

export function getConditionalElementClass(ReactiveElementClass) {
    class ConditionalElement extends ReactiveElementClass {

        #conditionStateProp
        #renderMap
        #wasMounted = false

        render(isFirstRender=false) {
            let stateValue;
            if (this.#conditionStateProp.indexOf('@') === 0) {
                stateValue = this.host.getAttribute(this.#conditionStateProp.substring(1));
            }
            else {
                stateValue = this.getState(this.#conditionStateProp);
            }

            if (stateValue === undefined) {
                throw Error(`State value for ${this.#conditionStateProp} not found while rendering conditional-render element:`, this);
            }
            const elementsToRender = [];

            this.#renderMap.forEach((elements, conditional)=> {
                if (resolveConditional(conditional, stateValue)) {
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
        connectedCallback() {
            this.host = this.getRootNode().host;
            if (!this.host) {
                throw Error("<conditional-render> must be used as part of a custom element template! Cannot be used outside of a custom element.");
            }
            if (this.#wasMounted) return;
            const conditionAttributeValue = this.getAttribute("_condition");
            if (!conditionAttributeValue) {
                throw Error("conditional-render elements must have a _condition command attribute");
            }
            if (!this.children || !this.children.length) {
                throw Error("Conditional element must have children!");
            }

            const statePropName = conditionAttributeValue;
            this.#conditionStateProp = statePropName;

            const isConditionStatic = this.#conditionStateProp.indexOf('@') === 0;
            let stateValue, stateObject;
            if (!isConditionStatic) {
                [stateValue, stateObject] = this.getState(statePropName, true);
                if (typeof stateValue === "undefined") {
                    throw Error(`State property ${statePropName} not defined for _condition command!`);
                }
            }
            const renderMap = new Map();
            renderMap.set("always", []);
            const children = [...this.children];

            children.forEach(conditionalChild=> {
                const _if = conditionalChild.getAttribute('_if');
                if (_if) {
                    const expectedValue = attributeValueToTypedValue(_if);
                    if (!renderMap.has(expectedValue)) renderMap.set(expectedValue, []);
                    renderMap.get(expectedValue).push(conditionalChild);
                }
                else {
                    renderMap.get("always").push(conditionalChild);
                }
            });
            this.#renderMap = renderMap;

            if (!isConditionStatic) {
                stateObject._stateManager.addConditionallyRenderingElements(statePropName, this);
            }
            this.render(true);
            this.#wasMounted = true;
        }
    }

    return ConditionalElement;
}

