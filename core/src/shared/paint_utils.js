import { NODES_STATE, 
         MAX_OPERATIONS_PER_ANIMATION_FRAME, 
         MAX_DOM_ACTIONS_PER_FRAME,
         FRAME_BUDGET
} from "./consts";


const { nodeActionsMap } = NODES_STATE;
const { pendingPaintNodeManagers } = NODES_STATE;

// Maps "TYPE" strings to rAF ids
// TYPE is the type of task the functions handle,
// we only save for each type the rAF ID - 
// because we only use it to cancel the rAF -
// and request a new one, in case the old one hasn't run yet (debounce)
const rafIds = new Map();

export function queueAnimationFrame(functionsToRun, type, afterRunFn) {
    let rafId;
    if (rafIds.has(type)) {
        rafId = rafIds.get(type);
        cancelAnimationFrame(rafId);
    }

    if (functionsToRun.length < MAX_OPERATIONS_PER_ANIMATION_FRAME) {
        rafId = requestAnimationFrame(()=> {
            rafIds.delete(type);
            functionsToRun.forEach(fn=> fn());
            if (afterRunFn) afterRunFn();
        });
        rafIds.set(type, rafId);
    }
    else {
        rafIds.delete(type);
        const functions = [...functionsToRun];
        let functionsIndex = 0;
        function runNextBatch() {
            const functionsBatch = functions.slice(functionsIndex, functionsIndex + MAX_OPERATIONS_PER_ANIMATION_FRAME);
            functionsBatch.forEach(fn=> fn());
            functionsIndex += MAX_OPERATIONS_PER_ANIMATION_FRAME;
            if (functionsIndex < functions.length) requestAnimationFrame(runNextBatch);
        }
        requestAnimationFrame(runNextBatch);
    }
}

let { 
    paintRafId,
    eventBindingFunctions,
    stateActivates,
    conditionalRenders,
} = NODES_STATE; 

export function queueBindEvents(element, bindFunction) {
    eventBindingFunctions.set(element, bindFunction);
    queueAnimationFrame(
        Array.from(eventBindingFunctions.values()), 
        "EVENTS_BIND",
        ()=> eventBindingFunctions.clear()
    );
}
export function queueConditionalRender(element, renderFunction) {
    conditionalRenders.set(element, renderFunction);
    queueAnimationFrame(
        Array.from(conditionalRenders.values()), 
        "CONDITIONAL_RENDER",
        ()=> conditionalRenders.clear()
    );
}
export function queuePaint() {
    if (paintRafId) cancelAnimationFrame(paintRafId);
    paintRafId = requestAnimationFrame(()=> {
        paintRafId = null;
        doUpdateDOM();
    });
}

// For debugging purposes
export function logNodeActions() {
    [...nodeActionsMap.entries()]
    .map(([node, actions])=> {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE: {
                console.log ("Actions for", node);
                const appendElements = [...actions.append.values()];
                if (appendElements.length) {
                    console.log("Append", appendElements);
                }
                const setProperty = [...actions.setProperty.entries()];
                if (replaceElements.length) {
                    console.log("Set property", setProperty);
                }
                console.log ("Reattach? ", actions.reattach);
                break;
            }

            case Node.ATTRIBUTE_NODE: {
                console.log ("Set Attribute", node.nodeName, "on", node.originalOwnerElement, "to", actions.setAttribute);
                break;
            }

            case Node.TEXT_NODE: {
                console.log ("Set text content for", node.parentNode, "to", actions.textContent);
                break;
            }
        }
    });
}

// actions are DOM API functions
/*
function runDOMActions(actions, max=1000) {
    const runActions = actions.splice(0, max);
    runActions.forEach(action=> action());
}
*/
function runDOMActions(actions) {
    actions.forEach(action=> action());
}

// This function runs on requestAnimationFrame to run pending Node actions
// Usually DOMActions is not passed and the DOM actions are taken from the global nodeActionsMap
// But if DOMActions is passed (as an array of separated actions by type) -
// then the function handles them instead - this is used when "time slicing",
// i.e. if an animation frame had too many actions to handle in one frame, it is deferred to the next frame
/*
export function doUpdateDOM(DOMActions) {
    let attributeActions,
        textActions,
        propertySetActions,
        elementActions,
        reattachActions;

    if (DOMActions && DOMActions.length) {
        [attributeActions, textActions, propertySetActions, elementActions, reattachActions] = DOMActions;
    }
    else {
        // Immediately clone current global nodleActionsMap,
        // to avoid race conditions (doUpdateDOM is called async)
        const thisNodeActionsMap = new Map(nodeActionsMap);
        nodeActionsMap.clear();
        if (thisNodeActionsMap.size) {
            logNodeActions();
            [attributeActions, textActions, propertySetActions, elementActions, reattachActions] = resolveNodeActionsMapToDOMActions(thisNodeActionsMap);
        }
    }

    performance.mark("todo-run-DOM-actions-start");
    runDOMActions(attributeActions, MAX_DOM_ACTIONS_PER_FRAME.ATTRIBUTE_ACTIONS);
    runDOMActions(textActions, MAX_DOM_ACTIONS_PER_FRAME.TEXT_ACTIONS);
    runDOMActions(propertySetActions, MAX_DOM_ACTIONS_PER_FRAME.ELEMENT_ACTIONS);
    runDOMActions(elementActions, MAX_DOM_ACTIONS_PER_FRAME.PROPERTY_ACTIONS);
    runDOMActions(reattachActions, MAX_DOM_ACTIONS_PER_FRAME.REATTACH_ACTIONS);
    performance.mark("todo-run-DOM-actions-finish");

    const deferredActions = [];
    if (attributeActions.length) deferredActions.push(attributeActions);
    if (textActions.length) deferredActions.push(textActions);
    if (propertySetActions.length) deferredActions.push(propertySetActions);
    if (elementActions.length) deferredActions.push(elementActions);
    if (reattachActions.length) deferredActions.push(reattachActions);

    if (deferredActions.length) {
        console.log (`DEFERRED ${deferredActions.length}`);
        requestAnimationFrame(()=> doUpdateDOM(deferredActions));
    }
}
*/

export function doUpdateDOM(pendingNodeManagers) {
    const start = performance.now();
    let frameElapsed = 0;

    for (const nodeManager of pendingPaintNodeManagers) {
        const [attributeActions, textActions, propertySetActions, elementActions, reattachActions] = nodeManager.resolveToDOMActions();
        console.log ("Running reattach");
        runDOMActions(reattachActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.REATTACH_ACTIONS));
        frameElapsed = performance.now() - start;
        console.log ("took: ", frameElapsed);
        if (frameElapsed > FRAME_BUDGET ) {
            return requestAnimationFrame(()=> doUpdateDOM());
        }

        console.log ("Running elements");

        runDOMActions(elementActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.ELEMENT_ACTIONS));
        frameElapsed = performance.now() - start;
        if (frameElapsed > FRAME_BUDGET) {
            return requestAnimationFrame(()=> doUpdateDOM());
        }
        console.log ("took: ", frameElapsed);

        console.log ("Running attributes");
        runDOMActions(attributeActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.ATTRIBUTE_ACTIONS));
        frameElapsed = performance.now() - start;

        if (frameElapsed > FRAME_BUDGET) {
            return requestAnimationFrame(()=> doUpdateDOM());
        }

        console.log ("Running text");
        runDOMActions(textActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.TEXT_ACTIONS));
        frameElapsed = performance.now() - start;
        if (frameElapsed > FRAME_BUDGET) {
            return requestAnimationFrame(()=> doUpdateDOM());
        }

        runDOMActions(propertySetActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.PROPERTY_ACTIONS));
        frameElapsed = performance.now() - start;
        if (frameElapsed > FRAME_BUDGET) {
            return requestAnimationFrame(()=> doUpdateDOM());
        }

        if (attributeActions.length ||
            textActions.length || 
            propertySetActions.length || 
            elementActions.length || 
            reattachActions.length) {
            return requestAnimationFrame(()=> doUpdateDOM());
        }
        nodeManager.paintStatus = null;
        pendingPaintNodeManagers.delete(nodeManager);
        console.log ("Took ", performance.now() - start);
    }
    if (frameElapsed > FRAME_BUDGET ) {
        return requestAnimationFrame(()=> doUpdateDOM());
    }

    /*
    performance.mark("todo-run-DOM-actions-start");
    runDOMActions(attributeActions);
    runDOMActions(textActions);
    runDOMActions(propertySetActions);
    runDOMActions(elementActions);
    runDOMActions(reattachActions);
    performance.mark("todo-run-DOM-actions-finish");

    const deferredActions = [];
    if (attributeActions.length) deferredActions.push(attributeActions);
    if (textActions.length) deferredActions.push(textActions);
    if (propertySetActions.length) deferredActions.push(propertySetActions);
    if (elementActions.length) deferredActions.push(elementActions);
    if (reattachActions.length) deferredActions.push(reattachActions);

    if (deferredActions.length) {
        console.log (`DEFERRED ${deferredActions.length}`);
        requestAnimationFrame(()=> doUpdateDOM(deferredActions));
    }
    */
}

// Test/utility: wait until there are no pending paint node managers
export function waitForIdle() {
    return new Promise((resolve) => {
        function check() {
            if (!NODES_STATE.pendingPaintNodeManagers.size) return resolve();
            requestAnimationFrame(check);
        }
        requestAnimationFrame(check);
    });
}

// Expose on global for tests
if (typeof window !== 'undefined') {
    window.SproutWaitIdle = waitForIdle;
}

/*
const start = performance.now();
const FRAME_BUDGET = 8; // leave room for other work

while (pendingUpdates.length) {
  const update = pendingUpdates.shift();
  update.applyDOMOps();

  if (performance.now() - start > FRAME_BUDGET) {
    requestAnimationFrame(flushPendingUpdates);
    return;
  }
}
  */
