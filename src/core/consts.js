export const BOOLEAN_ATTRIBUTES = [
    'hidden',
    'checked'
]

export const SUPPORTED_ATTRIBUTES_FOR_BINDING = [
    'hidden',
    'value',
    'checked'
]

// Some elements like inputs has certain properties that can be used in _bind command, like: 'value', or 'checked
export const SUPPORTED_PROPERTIES_FOR_BINDING = [
    'value',
    'checked'
]
export const SUPPORTED_INPUT_TYPES_FOR_VALUE_BINDING = [
    'text', 
    'color', 
    'date', 
    'datetime-local', 
    'email', 
    'month', 
    'number', 
    'password',
    'range',
    'search',
    'tel',
    'time',
    'url',
    'week'
];

// These are "built-in" state props that are automatically added to state objects,
// and should not be included in the normal state change/check flow
export const BUILT_IN_STATE_PROPS = [
    '_global',
    '_gettingDependenciesFor',
    '_localStateManager',
    '_stateManager'
]

export const GLOBAL_STATE_VAR_NAME = "SproutGlobalState";
export const GLOBAL_STATE_FUNCTION_NAME = "getGlobalState";

export const ERROR_MESSAGES = {
    NO_DEPENDENCIES_ARRAY_IN_SET_HOOK(stateProp) {
        return `State set hook, must include a dependencies array! None was found for ${stateProp}`;
    }
}


export const HTML_ELEMENTS_CLASSES_MAP = [
    { class: HTMLAnchorElement, element: "a" },
    { class: HTMLAreaElement, element: "area" },
    { class: HTMLAudioElement, element: "audio" },
    { class: HTMLBaseElement, element: "base" },
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
    { class: HTMLHeadingElement, element: "h1" },
    { class: HTMLHeadingElement, element: "h2" },
    { class: HTMLHeadingElement, element: "h3" },
    { class: HTMLHeadingElement, element: "h4" },
    { class: HTMLHeadingElement, element: "h5" },
    { class: HTMLHeadingElement, element: "h6" },
    { class: HTMLHRElement, element: "hr" },
    { class: HTMLHtmlElement, element: "html" },
    { class: HTMLIFrameElement, element: "iframe" },
    { class: HTMLImageElement, element: "img" },
    { class: HTMLInputElement, element: "input" },
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
    { class: HTMLOutputElement, element: "output" },
    { class: HTMLParagraphElement, element: "p" },
    { class: HTMLParamElement, element: "param" },
    { class: HTMLPictureElement, element: "picture" },
    { class: HTMLPreElement, element: "pre" },
    { class: HTMLProgressElement, element: "progress" },
    { class: HTMLQuoteElement, element: "blockquote" },
    { class: HTMLQuoteElement, element: "q" },
    { class: HTMLScriptElement, element: "script" },
    { class: HTMLSelectElement, element: "select" },
    { class: HTMLSourceElement, element: "source" },
    { class: HTMLSpanElement, element: "span" },
    { class: HTMLStyleElement, element: "style" },
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
    { class: HTMLVideoElement, element: "video" }
];
// For development purposes only,
// turn this on to see exactly which functions in each entity are called and when.
export const DEBUG_MODE = false;