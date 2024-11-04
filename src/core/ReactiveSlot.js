export function getReactiveSlotClass(ReactiveElementClass) {
    class ReactiveSlot extends ReactiveElementClass {
        renderSlot(statePropName) {
            if (this.tagName !== "SLOT") return;

            const stateValue= this.getState(statePropName);
            if (typeof stateValue === "undefined") {
                throw Error(`State property ${statePropName} not defined for conditional slot rendering!`);
            }
    
            const children = this?.slotChildren;
            if (children) {
                const nodesToAssign = [];
                children.forEach(slotChildElement=> {
                    const _if = slotChildElement.getAttribute('_if');
                    if (_if) {
                        const expectedValue = Boolean(_if === "true");
                        if (stateValue == expectedValue) {
                            nodesToAssign.push(slotChildElement)
                        }
                    }
                });
                if (nodesToAssign.length) {
                    this.assign(...nodesToAssign);
                }
            }
        }

    }

    return ReactiveSlot;
}