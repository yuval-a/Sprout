import { doUpdateDOM } from "./node_actions";
import { NODES_STATE, MAX_OPERATIONS_PER_ANIMATION_FRAME } from "./consts";

let { 
    paintRafId,
    eventBindingFunctions, 
    eventBindRafId, 
    conditionalRenderRafId,
    conditionalRenders,
    nodeActionsMap
} = NODES_STATE; 

export function queueBindEvents(element, bindFunction) {
    eventBindingFunctions.set(element, bindFunction);
    if (eventBindingFunctions.size+1 >= MAX_OPERATIONS_PER_ANIMATION_FRAME) return;
    if (eventBindRafId) cancelAnimationFrame(eventBindRafId);
    eventBindRafId = requestAnimationFrame(()=> {
        eventBindRafId = null;
        eventBindingFunctions.forEach(bindFn=> bindFn());
        eventBindingFunctions = new Map();
    });
}
export function queuePaint() {
    if (nodeActionsMap.size+1 >= MAX_OPERATIONS_PER_ANIMATION_FRAME) return;
    if (paintRafId) cancelAnimationFrame(paintRafId);
    paintRafId = requestAnimationFrame(()=> {
        paintRafId = null;
        doUpdateDOM();
    })
}
export function queueConditionalRender(element, renderFunction) {
    conditionalRenders.set(element, renderFunction);
    if (conditionalRenders.size >= MAX_OPERATIONS_PER_ANIMATION_FRAME) return;
    if (conditionalRenderRafId) cancelAnimationFrame(conditionalRenderRafId);
    conditionalRenderRafId = requestAnimationFrame(()=> {
        conditionalRenderRafId = null;
        conditionalRenders.forEach(renderFn=> renderFn());
        conditionalRenders = new Map();
    })
}