import { doUpdateDOM } from "./node_actions";
import { NODES_STATE } from "./consts";

let { 
    paintRafId,
    eventBindingFunctions, 
    eventBindRafId, 
    conditionalRenderRafId,
    conditionalRenders
} = NODES_STATE; 

export function queueBindEvents(element, bindFunction) {
    if (eventBindRafId) cancelAnimationFrame(eventBindRafId);
    eventBindingFunctions.set(element, bindFunction);
    eventBindRafId = requestAnimationFrame(()=> {
        eventBindRafId = null;
        eventBindingFunctions.forEach(bindFn=> bindFn());
        eventBindingFunctions = new Map();
    });
}
export function queuePaint() {
    if (paintRafId) cancelAnimationFrame(paintRafId);
    paintRafId = requestAnimationFrame(()=> {
        paintRafId = null;
        doUpdateDOM();
    })
}
export function queueConditionalRender(element, renderFunction) {
    if (conditionalRenderRafId) cancelAnimationFrame(conditionalRenderRafId);
    conditionalRenders.set(element, renderFunction);
    conditionalRenderRafId = requestAnimationFrame(()=> {
        conditionalRenderRafId = null;
        conditionalRenders.forEach(renderFn=> renderFn());
        conditionalRenders = new Map();
    })
}