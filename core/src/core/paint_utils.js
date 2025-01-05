import { doUpdateDOM } from "./node_actions";
import { NODES_STATE, MAX_OPERATIONS_PER_ANIMATION_FRAME } from "./consts";

let { 
    paintRafId,
    eventBindingFunctions, 
    eventBindRafId, 
    conditionalRenderRafId,
    conditionalRenders,
    nodeActionsMap,
    activateRafId,
    elementActivateFunctions
} = NODES_STATE; 

export function queueBindEvents(element, bindFunction) {
    eventBindingFunctions.set(element, bindFunction);
    if (eventBindingFunctions.size < MAX_OPERATIONS_PER_ANIMATION_FRAME) {
        if (eventBindRafId) cancelAnimationFrame(eventBindRafId);
        eventBindRafId = null;
    }
    if (!eventBindRafId) {
        eventBindRafId = requestAnimationFrame(()=> {
            eventBindRafId = null;
            eventBindingFunctions.forEach(bindFn=> bindFn());
            eventBindingFunctions.clear();
        });
    }
}

export function queueActivate(element, activateFn) {
    elementActivateFunctions.set(element, activateFn);
    if (elementActivateFunctions.size < MAX_OPERATIONS_PER_ANIMATION_FRAME) {
        if (activateRafId) cancelAnimationFrame(activateRafId);
        activateRafId = null;
    }
    if (!activateRafId) {
        activateRafId = requestAnimationFrame(()=> {
            activateRafId = null;
            elementActivateFunctions.forEach(activateFn=> activateFn());
            elementActivateFunctions.clear();
        });
    }
}

export function queuePaint() {
    if (nodeActionsMap.size < MAX_OPERATIONS_PER_ANIMATION_FRAME) {
        if (paintRafId) cancelAnimationFrame(paintRafId);
        paintRafId = null;
    }
    if (!paintRafId) {
        paintRafId = requestAnimationFrame(()=> {
            paintRafId = null;
            doUpdateDOM();
        });
    }
}
export function queueConditionalRender(element, renderFunction) {
    conditionalRenders.set(element, renderFunction);
    if (conditionalRenders.size < MAX_OPERATIONS_PER_ANIMATION_FRAME) {
        if (conditionalRenderRafId) cancelAnimationFrame(conditionalRenderRafId);
        conditionalRenderRafId = null;
    }
    if (!conditionalRenderRafId) {
        conditionalRenderRafId = requestAnimationFrame(()=> {
            conditionalRenderRafId = null;
            conditionalRenders.forEach(renderFn=> renderFn());
            conditionalRenders.clear();
        });
    }
}