import { ReadonlySet } from "./code_utils";

export const OBSERVED_ATTRIBUTES = ["ref", "hidden"];

// disabled, selected, src
export const BOOLEAN_ATTRIBUTES = new ReadonlySet([
    'hidden',
    'checked',
    'disabled',
    'required',
    'selected'
]);

export const AUTO_ATTRIBUTES_TO_PROPS = new ReadonlySet([
    'checked', 
    'disabled', 
    'selected', 
    'src'
]);

export const SUPPORTED_ATTRIBUTES_FOR_BINDING = new ReadonlySet([
    'value',
    'checked'
]);

// These are "built-in" state props that are automatically added to state objects,
// and should not be included in the normal state change/check flow
export const BUILT_IN_STATE_PROPS = new ReadonlySet([
    '_global',
    '_gettingDependenciesFor',
    '_localStateManager',
    '_stateManager',
    '_binding',
    '_populate',
    '_isActive',
    '_isStateManager',
    '_isStatefulArray',
    'hasOwnProperty'
]);

export const GLOBAL_STATE_VAR_NAME = "SproutGlobalState";
export const GLOBAL_STATE_FUNCTION_NAME = "getGlobalState";
export const GLOBAL_STATE_NOT_SET_YET = "Global State Not Set Yet";

export const ERROR_MESSAGES = Object.freeze({
    NO_DEPENDENCIES_ARRAY_IN_SET_HOOK(stateProp) {
        return `State set hook, must include a dependencies array! None was found for ${stateProp}`;
    }
});

export const HTML_ELEMENT_CLASSES_MAP = Object.freeze([
    { class: HTMLAnchorElement, element: "a" },
    { class: HTMLAreaElement, element: "area" },
    { class: HTMLAudioElement, element: "audio" },
    // { class: HTMLBaseElement, element: "base" },
    { class: HTMLBodyElement, element: "body" },
    { class: HTMLBRElement, element: "br" },
    { class: HTMLButtonElement, element: "button" },
    { class: HTMLCanvasElement, element: "canvas" },
    { class: HTMLDataElement, element: "data" },
    { class: HTMLDataListElement, element: "datalist" },
    { class: HTMLDetailsElement, element: "details" },
    { class: HTMLDialogElement, element: "dialog" },
    { class: HTMLDivElement, element: "div" },
    { class: HTMLDListElement, element: "dl" },
    { class: HTMLEmbedElement, element: "embed" },
    { class: HTMLFieldSetElement, element: "fieldset" },
    { class: HTMLFormElement, element: "form" },
    /*
    { class: HTMLHeadingElement, element: "h1" },
    { class: HTMLHeadingElement, element: "h2" },
    { class: HTMLHeadingElement, element: "h3" },
    { class: HTMLHeadingElement, element: "h4" },
    { class: HTMLHeadingElement, element: "h5" },
    { class: HTMLHeadingElement, element: "h6" },
     */
    { class: HTMLHRElement, element: "hr" },
    { class: HTMLHtmlElement, element: "html" },
    { class: HTMLIFrameElement, element: "iframe" },
    { class: HTMLImageElement, element: "img" },
    // { class: HTMLInputElement, element: "input" },
    { class: HTMLLabelElement, element: "label" },
    { class: HTMLLegendElement, element: "legend" },
    { class: HTMLLIElement, element: "li" },
    { class: HTMLLinkElement, element: "link" },
    { class: HTMLMapElement, element: "map" },
    { class: HTMLMetaElement, element: "meta" },
    { class: HTMLMeterElement, element: "meter" },
    { class: HTMLObjectElement, element: "object" },
    { class: HTMLOListElement, element: "ol" },
    { class: HTMLOptGroupElement, element: "optgroup" },
    { class: HTMLOptionElement, element: "option" },
    // { class: HTMLOutputElement, element: "output" },
    { class: HTMLParagraphElement, element: "p" },
    // { class: HTMLParamElement, element: "param" },
    { class: HTMLPictureElement, element: "picture" },
    { class: HTMLPreElement, element: "pre" },
    { class: HTMLProgressElement, element: "progress" },
    { class: HTMLQuoteElement, element: "blockquote" },
    { class: HTMLQuoteElement, element: "q" },
    // { class: HTMLScriptElement, element: "script" },
    { class: HTMLSelectElement, element: "select" },
    { class: HTMLSourceElement, element: "source" },
    { class: HTMLSpanElement, element: "span" },
    // { class: HTMLStyleElement, element: "style" },
    { class: HTMLTableElement, element: "table" },
    { class: HTMLTableCellElement, element: "td" },
    { class: HTMLTableCellElement, element: "th" },
    { class: HTMLTableRowElement, element: "tr" },
    { class: HTMLTableSectionElement, element: "thead" },
    { class: HTMLTableSectionElement, element: "tbody" },
    { class: HTMLTableSectionElement, element: "tfoot" },
    { class: HTMLTextAreaElement, element: "textarea" },
    { class: HTMLTimeElement, element: "time" },
    { class: HTMLTitleElement, element: "title" },
    { class: HTMLTrackElement, element: "track" },
    { class: HTMLUListElement, element: "ul" },
    { class: HTMLVideoElement, element: "video" },
    { class: HTMLSlotElement, element: "slot" },
    // We can't use HTMLElement more than once, so we will use a class extending it
    // { class: class extends HTMLElement{}, element: "code" }
]);

// For development purposes only,
// turn this on to see exactly which functions in each entity are called and when.
export const DEBUG_MODE = false;

export const DEFAULT_TEMPLATE_DOM = document.createElement('div');

export const NODES_STATE = {
    // This is a global object that maps abstract "DOM actions" to nodes (the nodes can be elements, text nodes, attribute nodes)
    // It is resolved to actual DOM API functions on RequestAnimationFrame calls, and then is RESET.
    // it is a "singleton" object
    nodeActionsMap: new Map(),
    pendingPaintNodeManagers: new Set(),

    // Maps events binding function (value) to (custom) element (key) 
    eventBindingFunctions: new Map(),
    // Maps conditional render function (value) to conditional-render element (key)
    conditionalRenders: new Map(),
    // Maps state change handler function (value) to custom elements (key)
    stateChangeHandlers: new Map(),
    // Save requestAnimationFrame Id, to cancel if the rAF wasn't called yet on the same frame, so DOM operations will be batched to a single frame,
    // preventing several rAFs running for the same frame
    paintRafId: null,
}

export const CONDITIONAL_OPERATORS = new ReadonlySet([
    '==',
    '===',
    '!=',
    '!==',
    '<',
    '<=',
    '>',
    '>='
]);
export const CONDITIONAL_OPERATORS_REGEX = /^(==|===|!=|!==|<|<=|>|>=)/;

// Used to flag items to be removed in StatefulArray
export const STATEFUL_ARRAY_REMOVE_FLAG_STRING = "$$remove$$";
export const STATEFUL_ARRAY_REMOVED_FLAG_STRING = "$$removed$$";

// Names of array methods that changes the content of the array itself (mutate it)
// NOT including methods that just changes its length (removes items without changing the rest)
export const ARRAY_MUTATE_METHODS = new ReadonlySet([
    "shift",
    "unshift",
    "pop",
    "push",
    "reverse",
    "sort",
    "splice",
    "copyWithin",
    "fill",
]);

// Array methods that change content of an array,
// but NEVER adjusts its length in the process.
export const ARRAY_MUTATE_NO_LENGTH_CHANGE_METHODS = new ReadonlySet([
    "reverse",
    "sort",
    "copyWithin",
    "fill",
]);

// Array methods that derive results from content/order without mutating the base array
// Using them during dep-capture should also record a base-array dependency
export const ARRAY_DERIVE_METHODS = new ReadonlySet([
    "slice",
    "map",
    "filter",
    "reduce",
    "reduceRight",
    "some",
    "every",
    "forEach",
    "find",
    "findIndex",
    "findLast",
    "findLastIndex",
    "indexOf",
    "lastIndexOf",
    "includes",
    "entries",
    "keys",
    "values",
    "at",
    "join",
    "toString",
    "toLocaleString"
]);
// Array "mapping" methods (where you pass a callback function)
export const ARRAY_CACHE_METHODS = new ReadonlySet([
    "every",
    "some",
    "filter",
    "forEach",
    "map",
    "reduce",
    "reduceRight",
    "slice"
]);

export const SYMBOL_NAMES = {
    STATE_NOT_FOUND: "SPROUT_STATE_NOT_FOUND"
}

export const BINDABLE_ATTRIBUTES_TO_STATE_NODES = new ReadonlySet([
    "checked",
    "value"
]);

export const SPROUT_FROZEN_CSS_CLASS_NAME = "sprout-frozen";

/*
export const SPROUT_FROZEN_CLASS_CSS = `
    .${SPROUT_FROZEN_CSS_CLASS_NAME} {
        visibility: hidden;
        clip-path: inset(100%);
        pointer-events: none;
    }
`;
*/

export const SPROUT_FROZEN_CLASS_CSS = `
    .${SPROUT_FROZEN_CSS_CLASS_NAME} {
        clip-path: inset(100%);
        pointer-events: none;
        opacity: 0;
    }
`;

export const DETACH_METHOD = Object.freeze({
    HIDE_UNHIDE: 1,
    CLONE: 2
});

export const MAX_OPERATIONS_PER_ANIMATION_FRAME = 100;

export const MAX_DOM_ACTIONS_PER_FRAME = {
    ATTRIBUTE_ACTIONS: 600,
    TEXT_ACTIONS: 300,
    ELEMENT_ACTIONS: 100,
    PROPERTY_ACTIONS: 50,
    REATTACH_ACTIONS: 10
}

// Max time in ms for doing paint jobs
export const FRAME_BUDGET = 8;

// CSS to always put on each Shadow DOM root
export const SHADOW_ROOT_CSS = 
':host { contain: layout paint; }';

