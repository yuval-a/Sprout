import { SPROUT_FROZEN_CSS_CLASS_NAME, DETACH_METHOD } from '../shared/consts.js';

// Extract real custom element in-case inside a wrapper element (e.g. <li>)
function getStatefulChild(child) {
    return Object.hasOwn(child, "state") ? child : child.firstElementChild;
}

function whenActive(child, func) {
    if (child.isActive) func();
    else child.addEventListener("active", func, { once: true });
}

// We use pendingKeyMapActions - because states become active only after mounts (only after reattach of parent)
// These methods are usually called on a DETACHED parent element DOM 
const HTMLElementMapParent = {

    // Note the opposite arguments order!
    replaceChildWith(oldChild, newChild) {
        const statefulOldChild = getStatefulChild(oldChild);
        const oldKey = statefulOldChild?.state?.key ?? oldChild.stateKey;
        const statefulNewChild = getStatefulChild(newChild);
        const newKey = newChild.stateKey ?? statefulNewChild.stateKey;
        const replacedChild = this.replaceChild(newChild, oldChild);
        this.keyMap.delete(oldKey);
        this.keyMap.set(newKey, newChild);
        return replacedChild;
    },

    // Swaps between children
    swapChildWith(oldChild, newChild) {
        if (oldChild === newChild) return;
        const oldNext = oldChild.nextSiblingElement;
        const newNext = newChild.nextSiblingElement;
        this.insertBefore(oldChild, newNext);
        this.insertBefore(newChild, oldNext);
    },

    removeChild(child) {
        const statefulChild = getStatefulChild(child);
        const key = child.stateKey ?? statefulChild.stateKey;
        // IMPORTANT: call the native version
        HTMLElement.prototype.removeChild.call(this, child);
        this.keyMap.delete(key);
    },

    insertBefore(newChild, beforeChild) {
        HTMLElement.prototype.insertBefore.call(this, newChild, beforeChild);
        const statefulNewChild = getStatefulChild(newChild);
        const key = newChild.stateKey ?? statefulNewChild.stateKey;
        this.keyMap.set(key, newChild);
    },

    append(...elements) {
        // call native
        HTMLElement.prototype.append.call(this, ...elements);

        // start from current child count minus newly-added elements
        // let index = this.children.length - elements.length;

        for (const element of elements) {
            const statefulChild = getStatefulChild(element);
            const key = element.stateKey ?? statefulChild.stateKey;
            this.keyMap.set(key, element);
        }
    },

    appendChild(newChild) {
        HTMLElement.prototype.appendChild.call(this, newChild);
        const statefulChild = getStatefulChild(newChild);
        const key = newChild.stateKey ?? statefulChild.stateKey;
        this.keyMap.set(key, newChild);
    },

    prepend(newChild) {
        HTMLElement.prototype.prepend.call(this, newChild);
        const statefulChild = getStatefulChild(newChild);
        const key = newChild.stateKey ?? statefulChild.stateKey;
        this.keyMap.set(key, newChild);
    },

    detach(clonePattern = false) {
        /*
        // NOTE: this commented-out part uses the moveBefore method
        // it's not widely supported yet
        // also, it seems just hiding with display = 'none' and showing again has the same performance

        const parentNode = this.parentNode;
        if (!parentNode) {
            console.warn ("Tried to detach element without parent!");
        }
        this.originalParentNode = parentNode;
        appScope.offscreenContainer.moveBefore(this, null);
        */

        /* Another way is to cloneNode for the DOM tree,
            * save it, manipulate the offscreen node, 
        * then replace between them -
        * the problem with this is that,
        * lifecycle methods (connectedCallback) for the DOM node 
        * and all of his children will trigger
        */

        let returnElement;
        if (clonePattern) {
            const cloned = this.cloneNode(true);
            cloned.$$originalElement = this;
            cloned.$$detached = DETACH_METHOD.CLONE
            returnElement = cloned;
        }
        else {
            // inert makes it inactive to interaction and events
            this.setAttribute("inert","");
            this.classList.add(SPROUT_FROZEN_CSS_CLASS_NAME);
            this.$$detached = DETACH_METHOD.HIDE_UNHIDE;
            returnElement = this;
        }
        return returnElement;
    },
    
    reattach() {
        /*
        // NOTE: this commented-out part uses the moveBefore method
        // it's not widely supported yet
        // also, it seems just hiding with display = 'none' and showing again has the same performance

        if (!this.originalParentNode) {
            console.warn("Tried to reattach without a known originalParentNode");
        }
        this.originalParentNode.moveBefore(this, null);
        */
        if (!STRICT) {
            if (!this.$$detached) {
                console.warn("Tried to reattach an undetached element");
                return;
            }
        }
        // this.style.display = this.originalDisplayStyle;
        // this.originalDisplayStyle = undefined;
        // const detachedClone = this.detachedClone;
        // this.detachedClone = undefined;
        // this.replaceWith(detachedClone);
        // this.noRenderObserver.disconnect();
        // This triggers a single repaint, but only once
        // this.getBoundingClientRect();

        // display: none ==> no layout, visibility: hidden => layout, no paint
        if (this.$$detached === DETACH_METHOD.HIDE_UNHIDE) {
            this.removeAttribute("inert","");
            this.classList.remove(SPROUT_FROZEN_CSS_CLASS_NAME);
        }
        else if (this.$$detached === DETACH_METHOD.CLONE) {
            this.$$originalElement.replaceWith(this);
        }

        this.$$detached = undefined;
    },

    // This is a special method that instead of being called on
    // a detached map parent, it is called once the parent initially becomes a map parent
    // to syncrounously populate the keyMap
    initialAppend(...elements) {
        // call native
        HTMLElement.prototype.append.call(this, ...elements);

        // start from current child count minus newly-added elements
        // let index = this.children.length - elements.length;

        for (const element of elements) {
            this.pendingKeyMapActions.add(
                ()=> {
                    const statefulChild = getStatefulChild(element);
                    if (statefulChild.isActive) {
                        const key = statefulChild?.state?.key ?? element.stateKey;
                        this.keyMap.set(key, element);
                    }
                    else statefulChild.addEventListener("active", ()=> {
                        const key = statefulChild?.state?.key ?? element.stateKey;
                        this.keyMap.set(key, element);
                    }, { once: true});
                }
            );
        }
    },

};

export function makeElementMapParent(parentElement) {
    Object.assign(parentElement, HTMLElementMapParent);
    // Maps state.key to currently attached child elements
    parentElement.keyMap = new Map();
    parentElement.pendingKeyMapActions = new Set();
    // This creates a compositor "layer" (separates the element graphics in the GPU, for smoother changes)
    parentElement.style.willChange = "opacity";
}

/*
export default class HTMLElementMapParent extends HTMLElement {

    // Maps state keys to child indexes (location in children)
    // Has to be a getter and not regular property - because it's "mixed-in" (see mixIn in class_utils)
    get keyMap() {
        if (!this._keyMap) this._keyMap = new Map();
        return this._keyMap;
    }
    // We allow passing the index of the child directly for a faster path
    // Note the opposite arguments order!
    replaceChildWith(oldChild, newChild, childIndex) {
        if (!childIndex) childIndex = [...this.children].indexOf(oldChild);
        this.replaceChild(newChild, oldChild);
        if (!oldChild?.state?.key) console.error(`Child element ${oldChild} in state map parent has no key property!`);
        this.keyMap.delete(oldChild.state.key);
        this.keyMap.set(newChild.state.key, childIndex);
    }

    removeChild(child) {
        if (!child?.state?.key) console.error(`Child element ${child} in state map parent has no key property!`);
        super.removeChild(child);
        this.keyMap.delete(child.state.key);
    }

    append(...elements) {
        super.append(...elements);
        let index = 0;
        for (const element of elements) {
            if (!element?.state?.key) console.error(`Child element ${element} in state map parent has no key property!`);
            this.keyMap.set(element.state.key, index++);
        }
    }
    appendChild(newChild) {
        if (!newChild?.state?.key) console.error(`Child element ${newChild} in state map parent has no key property!`);
        super.append(newChild);
        this.keyMap.set(newChild.state.key, this.children.length-1);
    }
    prepend(newChild) {
        if (!newChild?.state?.key) console.error(`Child element ${newChild} in state map parent has no key property!`);
        super.prepend(newChild);
        this.keyMap.forEach((valueIndex, key)=> this.keyMap.set(key, valueIndex+1));
        this.keyMap.set(newChild.state.key, 0);
    }
}
*/
