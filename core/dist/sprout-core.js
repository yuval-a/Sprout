/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!****************************************!*\
  !*** ./src/core/index.js + 16 modules ***!
  \****************************************/

;// ./src/core/consts.js

var BOOLEAN_ATTRIBUTES = ['hidden', 'checked'];
var SUPPORTED_ATTRIBUTES_FOR_BINDING = ['hidden', 'value', 'checked'];

// Some elements like inputs has certain properties that can be used in _bind command, like: 'value', or 'checked
var SUPPORTED_PROPERTIES_FOR_BINDING = ['value', 'checked'];
var SUPPORTED_INPUT_TYPES_FOR_VALUE_BINDING = [null,
// If no type is specified - defaults to 'text' - 
// getAttribute('type') returns null
'text', 'color', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'range', 'search', 'tel', 'time', 'url', 'week'];

// These are "built-in" state props that are automatically added to state objects,
// and should not be included in the normal state change/check flow
var BUILT_IN_STATE_PROPS = ['_global', '_gettingDependenciesFor', '_localStateManager', '_stateManager', '_binding', '_populate', '_isActive'];
var GLOBAL_STATE_VAR_NAME = "SproutGlobalState";
var GLOBAL_STATE_FUNCTION_NAME = "getGlobalState";
var ERROR_MESSAGES = {
  NO_DEPENDENCIES_ARRAY_IN_SET_HOOK: function NO_DEPENDENCIES_ARRAY_IN_SET_HOOK(stateProp) {
    return "State set hook, must include a dependencies array! None was found for ".concat(stateProp);
  }
};
var HTML_ELEMENTS_CLASSES_MAP = [{
  "class": HTMLAnchorElement,
  element: "a"
}, {
  "class": HTMLAreaElement,
  element: "area"
}, {
  "class": HTMLAudioElement,
  element: "audio"
},
// { class: HTMLBaseElement, element: "base" },
{
  "class": HTMLBodyElement,
  element: "body"
}, {
  "class": HTMLBRElement,
  element: "br"
}, {
  "class": HTMLButtonElement,
  element: "button"
}, {
  "class": HTMLCanvasElement,
  element: "canvas"
}, {
  "class": HTMLDataElement,
  element: "data"
}, {
  "class": HTMLDataListElement,
  element: "datalist"
}, {
  "class": HTMLDetailsElement,
  element: "details"
}, {
  "class": HTMLDialogElement,
  element: "dialog"
}, {
  "class": HTMLDivElement,
  element: "div"
}, {
  "class": HTMLDListElement,
  element: "dl"
}, {
  "class": HTMLEmbedElement,
  element: "embed"
}, {
  "class": HTMLFieldSetElement,
  element: "fieldset"
}, {
  "class": HTMLFormElement,
  element: "form"
},
/*
{ class: HTMLHeadingElement, element: "h1" },
{ class: HTMLHeadingElement, element: "h2" },
{ class: HTMLHeadingElement, element: "h3" },
{ class: HTMLHeadingElement, element: "h4" },
{ class: HTMLHeadingElement, element: "h5" },
{ class: HTMLHeadingElement, element: "h6" },
 */
{
  "class": HTMLHRElement,
  element: "hr"
}, {
  "class": HTMLHtmlElement,
  element: "html"
}, {
  "class": HTMLIFrameElement,
  element: "iframe"
}, {
  "class": HTMLImageElement,
  element: "img"
}, {
  "class": HTMLInputElement,
  element: "input"
}, {
  "class": HTMLLabelElement,
  element: "label"
}, {
  "class": HTMLLegendElement,
  element: "legend"
}, {
  "class": HTMLLIElement,
  element: "li"
}, {
  "class": HTMLLinkElement,
  element: "link"
}, {
  "class": HTMLMapElement,
  element: "map"
}, {
  "class": HTMLMetaElement,
  element: "meta"
}, {
  "class": HTMLMeterElement,
  element: "meter"
}, {
  "class": HTMLObjectElement,
  element: "object"
}, {
  "class": HTMLOListElement,
  element: "ol"
}, {
  "class": HTMLOptGroupElement,
  element: "optgroup"
}, {
  "class": HTMLOptionElement,
  element: "option"
},
// { class: HTMLOutputElement, element: "output" },
{
  "class": HTMLParagraphElement,
  element: "p"
},
// { class: HTMLParamElement, element: "param" },
{
  "class": HTMLPictureElement,
  element: "picture"
}, {
  "class": HTMLPreElement,
  element: "pre"
}, {
  "class": HTMLProgressElement,
  element: "progress"
}, {
  "class": HTMLQuoteElement,
  element: "blockquote"
}, {
  "class": HTMLQuoteElement,
  element: "q"
},
// { class: HTMLScriptElement, element: "script" },
{
  "class": HTMLSelectElement,
  element: "select"
}, {
  "class": HTMLSourceElement,
  element: "source"
}, {
  "class": HTMLSpanElement,
  element: "span"
},
// { class: HTMLStyleElement, element: "style" },
{
  "class": HTMLTableElement,
  element: "table"
}, {
  "class": HTMLTableCellElement,
  element: "td"
}, {
  "class": HTMLTableCellElement,
  element: "th"
}, {
  "class": HTMLTableRowElement,
  element: "tr"
}, {
  "class": HTMLTableSectionElement,
  element: "thead"
}, {
  "class": HTMLTableSectionElement,
  element: "tbody"
}, {
  "class": HTMLTableSectionElement,
  element: "tfoot"
}, {
  "class": HTMLTextAreaElement,
  element: "textarea"
}, {
  "class": HTMLTimeElement,
  element: "time"
}, {
  "class": HTMLTitleElement,
  element: "title"
}, {
  "class": HTMLTrackElement,
  element: "track"
}, {
  "class": HTMLUListElement,
  element: "ul"
}, {
  "class": HTMLVideoElement,
  element: "video"
}, {
  "class": HTMLSlotElement,
  element: "slot"
}
// We can't use HTMLElement more than once, so we will use a class extending it
// { class: class extends HTMLElement{}, element: "code" }
];

// For development purposes only,
// turn this on to see exactly which functions in each entity are called and when.
var DEBUG_MODE = false;
var DEFAULT_TEMPLATE_DOM = document.createElement('div');
var NODES_STATE = {
  // This is a global object that maps abstract "DOM actions" to nodes (the nodes can be elements, text nodes, attribute nodes)
  // It is resolved to actual DOM API functions on RequestAnimationFrame calls, and then is RESET.
  // it is a "singleton" object
  nodeActionsMap: new Map(),
  // Maps events binding functions to (custom) elements
  eventBindingFunctions: new Map(),
  conditionalRenders: new Map(),
  // Save requestAnimationFrame Id, to cancel if the rAF wasn't called yet on the same frame, so DOM operations will be batched to a single frame,
  // preventing several rAFs running for the same frame
  paintRafId: null,
  // Similar as above but for event bindings
  eventBindRafId: null,
  // Same for conditional renders
  conditionalRenderRafId: null,
  activateRafId: null,
  elementActivateFunctions: new Map()
};
var CONDITIONAL_OPERATORS = ['=', '==', '!=', '!==', '<', '<=', '>', '>='];
var MAX_OPERATIONS_PER_ANIMATION_FRAME = 100;
;// ./src/core/DOM_utils.js
function isElementAList(element) {
  return element.tagName === "OL" || element.tagName === "UL";
}
;// ./src/core/paint_utils.js


var paintRafId = NODES_STATE.paintRafId,
  eventBindingFunctions = NODES_STATE.eventBindingFunctions,
  eventBindRafId = NODES_STATE.eventBindRafId,
  conditionalRenderRafId = NODES_STATE.conditionalRenderRafId,
  conditionalRenders = NODES_STATE.conditionalRenders,
  nodeActionsMap = NODES_STATE.nodeActionsMap,
  activateRafId = NODES_STATE.activateRafId,
  elementActivateFunctions = NODES_STATE.elementActivateFunctions;
function queueBindEvents(element, bindFunction) {
  eventBindingFunctions.set(element, bindFunction);
  if (eventBindingFunctions.size < MAX_OPERATIONS_PER_ANIMATION_FRAME) {
    if (eventBindRafId) cancelAnimationFrame(eventBindRafId);
    eventBindRafId = null;
  }
  if (!eventBindRafId) {
    eventBindRafId = requestAnimationFrame(function () {
      eventBindRafId = null;
      eventBindingFunctions.forEach(function (bindFn) {
        return bindFn();
      });
      eventBindingFunctions.clear();
    });
  }
}
function queueActivate(element, activateFn) {
  elementActivateFunctions.set(element, activateFn);
  if (elementActivateFunctions.size < MAX_OPERATIONS_PER_ANIMATION_FRAME) {
    if (activateRafId) cancelAnimationFrame(activateRafId);
    activateRafId = null;
  }
  if (!activateRafId) {
    activateRafId = requestAnimationFrame(function () {
      activateRafId = null;
      elementActivateFunctions.forEach(function (activateFn) {
        return activateFn();
      });
      elementActivateFunctions.clear();
    });
  }
}
function queuePaint() {
  if (nodeActionsMap.size < MAX_OPERATIONS_PER_ANIMATION_FRAME) {
    if (paintRafId) cancelAnimationFrame(paintRafId);
    paintRafId = null;
  }
  if (!paintRafId) {
    paintRafId = requestAnimationFrame(function () {
      paintRafId = null;
      doUpdateDOM();
    });
  }
}
function queueConditionalRender(element, renderFunction) {
  conditionalRenders.set(element, renderFunction);
  if (conditionalRenders.size < MAX_OPERATIONS_PER_ANIMATION_FRAME) {
    if (conditionalRenderRafId) cancelAnimationFrame(conditionalRenderRafId);
    conditionalRenderRafId = null;
  }
  if (!conditionalRenderRafId) {
    conditionalRenderRafId = requestAnimationFrame(function () {
      conditionalRenderRafId = null;
      conditionalRenders.forEach(function (renderFn) {
        return renderFn();
      });
      conditionalRenders.clear();
    });
  }
}
;// ./src/core/node_actions.js
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }





// Also, if doesn't exist - create it
function getNodeActionsForNode(node) {
  var nodeActionsMap = NODES_STATE.nodeActionsMap;
  if (!nodeActionsMap.has(node)) nodeActionsMap.set(node, getNewNodeActionsObject());
  var nodeActions = nodeActionsMap.get(node);
  return nodeActions;
}
function setStateNodeAction(node, nodeActionsObject, value) {
  if (node.nodeType === Node.ATTRIBUTE_NODE) nodeActionsObject["setAttribute"] = value;else if (node.nodeType === Node.TEXT_NODE) nodeActionsObject["textContent"] = value;
}
function addRemoveAction(nodeActions, elementToRemove, stateIdentifier) {
  if (!nodeActions.remove.has(stateIdentifier)) {
    nodeActions.remove.set(stateIdentifier, new Set());
  }
  nodeActions.remove.get(stateIdentifier).add(elementToRemove);
}
function addReplaceAction(nodeActions, oldElement, newElement) {
  nodeActions.replace.set(oldElement, newElement);
}
function addSwitchAction(nodeActions, newElement) {
  nodeActions["switch"] = newElement;
}
// stateIdentifier can be a State object (for state maps),
// or a State property (for conditionally rendered elements)
function addAppendAction(nodeActions, nodeToAppend, stateIdentifier) {
  if (!nodeActions.append.has(stateIdentifier)) {
    nodeActions.append.set(stateIdentifier, new Set());
  }
  nodeActions.append.get(stateIdentifier).add(nodeToAppend);
}
function addStateAttributeToNode(attributeNode, value) {
  var nodeActions = getNodeActionsForNode(attributeNode);
  setStateNodeAction(attributeNode, nodeActions, value);
}
function addAppendActionToNode(node, nodeToAppend, stateIdentifier) {
  var nodeActions = getNodeActionsForNode(node);
  addAppendAction(nodeActions, nodeToAppend, stateIdentifier);
}

// This is an object used to represent pending node actions,
// that are batched and executed in reflows (requestAnimationFrame)
function getNewNodeActionsObject() {
  return {
    // Nodes to append to the end of node's children, 
    // keys are state objects, or state props (string) 
    // to prevent duplicate pending
    append: new Map(),
    // Replace each key node on Map, with value node
    replace: new Map(),
    // Insert value node after key node in parent node's children
    after: new Map(),
    // Remove these nodes from the DOM
    // keys are state objects, or state props (string) 
    // to prevent duplicate pending
    remove: new Map(),
    "switch": null,
    get hasPendingActions() {
      return this["switch"] !== null || this.append.size || this.replace.size || this.after.size || this.remove.size;
    }
  };
}

// This *updates*/*"fills"* the nodeActionsMap!
function generateStateNodeActions(stateManager, stateProp) {
  var _this = this;
  var nodeActionsMap = NODES_STATE.nodeActionsMap;
  var value = stateManager.state[stateProp];
  var stateNodes = stateManager.stateNodes[stateProp];
  // This is a map, where keys are "parent elements" containing 
  // custom element instanced created from a state array ("state map").
  // The values are the custom element name. 
  // The actual array of state objects is in state[stateProp]
  var stateMapElements = stateManager.stateArrayMaps[stateProp];
  var conditionallyRenderingElements = stateManager.conditionallyRenderingElements[stateProp];

  // Note, since the value change is handled by a custom setter - that setter checks if the set value is the same - 
  // if it is - it won't call handleStateChange, and it won't reach here.
  if (stateNodes) {
    stateNodes.forEach(function (node) {
      if (!nodeActionsMap.has(node)) nodeActionsMap.set(node, {});
      var nodeActionsObject = nodeActionsMap.get(node);
      setStateNodeAction(node, nodeActionsObject, value);
    });
  }
  if (stateMapElements) {
    // An array of state objects
    var stateMapArray = value;
    stateMapElements.forEach(function (customElementName, parentElement) {
      //const newMappedElement = parentElement.cloneNode(true);
      var stateMapNodeActions = getNewNodeActionsObject();
      var currentStateMapArrayIndex = -1;
      var isParentAList = isElementAList(parentElement);
      // Compares state map arrays to actual DOM elements (by comparing state objects)
      if (parentElement.children.length) {
        Array.prototype.forEach.call(parentElement.children, function (childElement, currentIndex) {
          var _stateItem;
          var customElement = childElement;
          // State map elements inside Lists are wrapped with a <li>
          if (isParentAList) customElement = childElement.firstElementChild;
          var stateItem = stateMapArray[currentIndex];
          if ((_stateItem = stateItem) !== null && _stateItem !== void 0 && _stateItem.hasOwnProperty('state')) stateItem = stateItem.state;
          if (!stateItem) {
            addRemoveAction(stateMapNodeActions, childElement);
            // newMappedElement.removeChild(newMappedElement.children[currentIndex]);
          } else if (customElement.state !== stateItem) {
            var replaceWithChild = stateToElement(stateItem, customElementName, isElementAList(parentElement) ? "li" : undefined);
            // newMappedElement.replaceChild(replaceWithChild, newMappedElement.children[currentIndex]);
            addReplaceAction(stateMapNodeActions, childElement, replaceWithChild);
          }
          currentStateMapArrayIndex = currentIndex;
        });
      }

      // If there are more state objects in the stateMapArray - append equivalent child elements 
      currentStateMapArrayIndex++;
      for (var i = currentStateMapArrayIndex, len = stateMapArray.length; i < len; i++) {
        var stateItem = stateMapArray[i];
        // New state item === new child element to append
        if (stateItem) {
          var newChild = stateToElement(stateItem, customElementName, isElementAList(parentElement) ? "li" : undefined);
          // newMappedElement.appendChild(newChild);
          addAppendAction(stateMapNodeActions, newChild, stateItem);
        }
      }

      // addSwitchAction(stateMapNodeActions, newMappedElement);
      if (stateMapNodeActions.hasPendingActions) {
        nodeActionsMap.set(parentElement, stateMapNodeActions);
      }
    });
  }
  if (conditionallyRenderingElements) {
    // Should be slot element
    conditionallyRenderingElements.forEach(function (element) {
      queueConditionalRender(_this, function () {
        return element.render();
      });
    });
  }
  if (nodeActionsMap.size) queuePaint();
}
function resolveNodeActionsMapToDOMActions() {
  var batchActions = [];
  var attributeActions = [];
  var elementActions = [];
  var nodeActionsMap = NODES_STATE.nodeActionsMap;
  nodeActionsMap.forEach(function (nodeActions, node) {
    // Attribute change
    if (nodeActions.hasOwnProperty("setAttribute")) {
      var value = nodeActions.setAttribute;
      if (typeof value === "boolean") {
        if (!node.hasOwnProperty("originalOwnerElement")) {
          console.error("originalOwnerElement not found on boolean attribute node! Should never happen!");
        }
        if (value === false) {
          // Remove attribute if it exists, otherwise - do nothing
          if (node.originalOwnerElement.hasAttribute(node.name)) {
            attributeActions.push(function () {
              node.originalOwnerElement.removeAttributeNode(node);
            });
          }
        }
        // state changed to true
        else {
          if (!node.originalOwnerElement.hasAttribute(node.name)) {
            attributeActions.push(function () {
              node.originalOwnerElement.setAttributeNode(node);
            });
          }
        }
      } else {
        if (typeof value === "string" && node.nodeValue !== value) {
          attributeActions.push(function () {
            return node.nodeValue = value;
          });
        }
      }
    }

    // Text change
    else if (nodeActions.hasOwnProperty("textContent")) {
      var _value = String(nodeActions.textContent);
      if (node.nodeValue === _value) return;
      elementActions.push(function () {
        return node.nodeValue = _value;
      });
    }

    // DOM change
    else if (nodeActions["switch"]) {
      elementActions.push(function () {
        return node.replaceWith(nodeActions["switch"]);
      });
    } else {
      nodeActions.replace.forEach(function (newNode, oldNode) {
        elementActions.push(function () {
          return (
            //oldNode.replaceWith(newNode));
            node.replaceChild(newNode, oldNode)
          );
        });
      });
      var _iterator = _createForOfIteratorHelper(nodeActions.remove.values()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var removes = _step.value;
          var _iterator3 = _createForOfIteratorHelper(removes),
            _step3;
          try {
            var _loop = function _loop() {
              var nodeToRemove = _step3.value;
              if (nodeToRemove.parentNode && nodeToRemove.parentNode === node) {
                elementActions.push(function () {
                  return node.removeChild(nodeToRemove);
                });
              }
            };
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              _loop();
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var _iterator2 = _createForOfIteratorHelper(nodeActions.append.values()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var appends = _step2.value;
          var _iterator4 = _createForOfIteratorHelper(appends),
            _step4;
          try {
            var _loop2 = function _loop2() {
              var newChildElement = _step4.value;
              elementActions.push(function () {
                return node.appendChild(newChildElement);
              });
            };
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              _loop2();
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  });
  return [].concat(attributeActions, elementActions);
}

// For debugging purposes
function logNodeActions() {
  var nodeActionsMap = NODES_STATE.nodeActionsMap;
  _toConsumableArray(nodeActionsMap.entries()).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      node = _ref2[0],
      actions = _ref2[1];
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        {
          console.log("Actions for", node);
          var appendElements = _toConsumableArray(actions.append.values());
          if (appendElements.length) {
            console.log("Append", appendElements);
          }
          var replaceElements = _toConsumableArray(actions.replace.entries());
          if (replaceElements.length) {
            console.log("Append", replaceElements);
          }
          if (actions.remove.size) {
            console.log("Remove", actions.remove);
          }
          break;
        }
      case Node.ATTRIBUTE_NODE:
        {
          console.log("Set Attribute", node.nodeName, "on", node.originalOwnerElement, "to", actions.setAttribute);
          break;
        }
      case Node.TEXT_NODE:
        {
          console.log("Set text content for", node.parentNode, "to", actions.textContent);
          break;
        }
    }
  });
}
// This function runs on requestAnimationFrame to run pending Node actions
function doUpdateDOM() {
  var nodeActionsMap = NODES_STATE.nodeActionsMap;
  if (nodeActionsMap.size) {
    // logNodeActions();
    var DOMActions = resolveNodeActionsMapToDOMActions(nodeActionsMap);
    DOMActions.forEach(function (DOMAction) {
      return DOMAction();
    });
    NODES_STATE.nodeActionsMap = new Map();
  }
}
;// ./src/core/prop_utils.js
// Sets an internal read-only "hidden" property on an object:
function setHiddenProperty(obj, propName, propValue) {
  var enumerable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  Object.defineProperty(obj, propName, {
    value: propValue,
    configurable: false,
    writable: false,
    enumerable: enumerable
  });
}
;// ./src/core/state_utils.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function state_utils_slicedToArray(r, e) { return state_utils_arrayWithHoles(r) || state_utils_iterableToArrayLimit(r, e) || state_utils_unsupportedIterableToArray(r, e) || state_utils_nonIterableRest(); }
function state_utils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function state_utils_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return state_utils_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? state_utils_arrayLikeToArray(r, a) : void 0; } }
function state_utils_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function state_utils_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function state_utils_arrayWithHoles(r) { if (Array.isArray(r)) return r; }



if (typeof HTMLElement === 'undefined') {
  console.warn("HTMLElement was not found! This probably means you are running in a non-browser environment, and can lead to unexpected results");
} else {
  // Make sure "setAttribute" is not overridable
  Object.defineProperty(globalThis, "elementSetAttribute", {
    value: HTMLElement.prototype.setAttribute,
    writable: false,
    configurable: false
  });
}
var setAttribute = function setAttribute(attrName, attrValue) {
  if (BOOLEAN_ATTRIBUTES.includes(attrName)) {
    if (attrValue === "false") {
      this.removeAttribute(attrName);
    } else {
      elementSetAttribute.call(this, attrName, "");
    }
  } else {
    elementSetAttribute.call(this, attrName, attrValue);
  }
};

// This creates the binding to state props on "State attributes".
// This function is called when a custom element instance ic connected to the DOM
var setStateAttribute = function setStateAttribute(attrName, stateProp) {
  var equalityValue = null;
  if (stateProp.indexOf(':') !== -1) {
    if (stateProp.indexOf('is_') === 0) {
      var colonIndex = stateProp.indexOf(':');
      if (colonIndex === -1) {
        throw Error("When using conditional equality state attribute, you must include a colon character followed by an equality value!");
      }
      equalityValue = stateProp.substring(colonIndex + 1);
      stateProp = stateProp.substring(3, colonIndex);
    }
  }
  var _this$getState = this.getState(stateProp, true),
    _this$getState2 = state_utils_slicedToArray(_this$getState, 2),
    stateVal = _this$getState2[0],
    theState = _this$getState2[1];
  if (stateVal === undefined) {
    console.warn("State value for ".concat(stateProp, " is undefined. State values should never be undefined."));
    return;
  }
  if (!theState) {
    console.warn("No State object with state prop: " + stateProp);
    return;
  }
  if (equalityValue) {
    var conditionalStateProp = "is_" + stateProp + equalityValue;
    var originalStateProp = stateProp;
    Object.defineProperty(theState, conditionalStateProp, {
      get: function get() {
        return this[originalStateProp] === equalityValue;
      },
      enumerable: false
    });
    theState._stateManager.addStateDependency(stateProp, conditionalStateProp);
    stateVal = theState[conditionalStateProp];
    stateProp = conditionalStateProp;
  }
  var valueToSet = stateVal;
  this.removeAttribute(attrName);
  // Create an "Attribute Node"
  var stateAttrNode = document.createAttribute(attrName);
  stateAttrNode.nodeValue = valueToSet;
  // Saves a readonly boolean that marks this as a "state attribute node"
  setHiddenProperty(stateAttrNode, "isStateAttribute", true);
  // Save ownerElement to a different property,
  // so if the attribute is removed (in case of a boolean attribute),
  // and later re-attached, we would know which element to add it back to.
  setHiddenProperty(stateAttrNode, "originalOwnerElement", this);
  /*
      Object.defineProperty(stateAttrNode, "stateValue", {
          value: valueToSet,
          writeable: true,
          configurable: false,
          enumerable: true
      });
  */
  if (typeof valueToSet === "boolean") {
    // A boolean attribute value should ALWAYS be an empty string,
    // the value itself never changes, it is removed fron the element if false, 
    // and added if true
    stateAttrNode.nodeValue = "";
  }

  // Adds the attribute to the element
  if (valueToSet !== false) {
    this.setAttributeNode(stateAttrNode);
  }
  theState._stateManager.addStateNode(stateProp, stateAttrNode, typeof valueToSet === "boolean");
};
var setStateText = function setStateText(stateProp) {
  var _this$getState3 = this.getState(stateProp, true),
    _this$getState4 = state_utils_slicedToArray(_this$getState3, 2),
    stateVal = _this$getState4[0],
    theState = _this$getState4[1];
  if (stateVal === undefined || stateVal === null) {
    console.warn("State value for ".concat(stateProp, " is undefined or null for _text command"));
    return;
  }
  if (!theState) {
    console.warn("No State object with state prop: " + stateProp);
    return;
  }
  var valueToSet = stateVal;
  var textNode = document.createTextNode(valueToSet);
  setHiddenProperty(textNode, "isStateAttribute", true);
  this.appendChild(textNode);
  theState._stateManager.addStateNode(stateProp, textNode);
};

// Convert a stateObject to a custom element, used in State Map Arrays
function stateToElement(stateObject, elemName, wrapInElement) {
  var customElementInstance = document.createElement(elemName);
  customElementInstance.setInitialState(stateObject);
  var returnElement;
  if (wrapInElement) {
    returnElement = document.createElement(wrapInElement);
    returnElement.appendChild(customElementInstance);
  } else {
    returnElement = customElementInstance;
  }
  return returnElement;
}
function mapStateArrayToElements(stateItems, elemName, wrapInElement) {
  // Each state item should be a stateManager
  return stateItems.map(function (stateItem) {
    if (stateItem.hasOwnProperty('state')) stateItem = stateItem.state;
    if (_typeof(stateItem) !== 'object') {
      console.warn("item in State array for _map is not an object: ", stateItem);
      return {};
    }
    return stateToElement(stateItem, elemName, wrapInElement);
  });
}

// Main function that handles all state changes in a state object
function handleStateChange(stateManager, stateProp) {
  if (BUILT_IN_STATE_PROPS.includes(stateProp)) return;
  // Populate the next Node Actions to perform
  generateStateNodeActions(stateManager, stateProp);
  var state = stateManager.state;
  // Run on[stateProp]Change hooks
  if (state.hasOwnProperty("on_".concat(stateProp, "Change"))) {
    if (typeof state["on_".concat(stateProp, "Change")] === "function") state["on_".concat(stateProp, "Change")].call(state);
  }
  var stateDependencies = stateManager.stateDependencies[stateProp];
  if (stateDependencies) {
    stateDependencies.forEach(function (depStateProp) {
      // A "Setter" hook
      if (depStateProp.indexOf('set_') === 0) {
        var setStateProp = depStateProp.substring(4);
        var func = state[depStateProp][0];
        if (func && typeof func === "function") {
          state[setStateProp] = func.call(state);
          return;
        }
      }
      generateStateNodeActions(stateManager, depStateProp);
      if (state.hasOwnProperty("on".concat(depStateProp, "Change"))) {
        if (typeof state["on".concat(depStateProp, "Change")] === "function") state["on".concat(depStateProp, "Change")].call(state);
      }
    });
  }

  // Global state
  if (!state._global) {
    var globalStateDependencies = stateManager.globalStateDependencies[stateProp];
    globalStateDependencies === null || globalStateDependencies === void 0 || globalStateDependencies.forEach(function (depStateProps, depStateManager) {
      var depState = depStateManager.state;
      depStateProps.forEach(function (depStateProp) {
        // A "Setter" hook
        if (depStateProp.indexOf('set_') === 0) {
          var setStateProp = depStateProp.substring(4);
          var func = state[depStateProp][0];
          if (func && typeof func === "function") {
            depState[setStateProp] = func.call(depState);
            return;
          }
        }
        generateStateNodeActions(depStateManager, depStateProp);
        if (state.hasOwnProperty("on".concat(depStateProp, "Change"))) {
          if (typeof state["on".concat(depStateProp, "Change")] === "function") depState["on".concat(depStateProp, "Change")].call(depState);
        }
      });
    });
  }
}
function populateStateFromInitialState(state, initialState) {
  state._populate = true;
  var descriptors = Object.getOwnPropertyDescriptors(initialState);
  var descrp;
  for (var key in descriptors) {
    if (BUILT_IN_STATE_PROPS.includes(key)) {
      delete descriptors[key];
      continue;
    }
    descrp = descriptors[key];
    if (descrp.hasOwnProperty('get') && typeof descrp.get === "function") {
      descrp.get.bind(state);
    }
    if (descrp.hasOwnProperty('value')) {
      var value = descrp.value;
      if (typeof value === "function") {
        descrp.value.bind(state);
      } else if (Array.isArray(value) && key.indexOf("set_") === 0) {
        var func = value === null || value === void 0 ? void 0 : value[0];
        if (func && typeof func === "function") {
          func.bind(state);
        }
      }
    }
  }

  // If state set hooks should run on initialization - 
  // they should run by the proxy handler for "defineProperty"
  Object.defineProperties(state, descriptors);
  delete state._populate;
}

/* Experimental rendering of state maps using DocumentFragment. Not stable */
/* 
export function resolveStateMapToDocumentFragment({ customElementName, parentElement}, stateMapArray) {
    const resolvedDocumentFragment = new DocumentFragment();
    // const stateMapNodeActions = getNewNodeActionsObject();
    let currentStateMapArrayIndex = -1;
    const isParentAList = isElementAList(parentElement);
    // Compares state map arrays to actual DOM elements (by comparing state objects)
    if (parentElement.children.length) {
        Array.prototype.forEach.call(parentElement.children, (childElement, currentIndex)=> {
            let customElementChild = childElement;
            // State map elements inside Lists are wrapped with a <li>
            if (isParentAList) customElementChild = childElement.firstElementChild;
            let stateItem = stateMapArray[currentIndex]; 
            if (stateItem?.hasOwnProperty('state')) stateItem = stateItem.state;
            if (stateItem && customElementChild.state !== stateItem) {
                const newCustomElementChild = stateToElement(stateItem, customElementName, isElementAList(parentElement) ? "li" : undefined);
                resolvedDocumentFragment.appendChild(newCustomElementChild);
            }
            else {
                resolvedDocumentFragment.append(childElement)
            }
            currentStateMapArrayIndex = currentIndex;
        });
    }

    // If there are more state objects in the stateMapArray - append equivalent child elements 
    currentStateMapArrayIndex++;
    for (let i = currentStateMapArrayIndex, len=stateMapArray.length; i<len; i++) {
        const stateItem = stateMapArray[i];
        // New state item === new child element to append
        if (stateItem) {
            // Make sure we don't already have a pending append action for the same state object
            const newChild = stateToElement(stateItem, customElementName, isElementAList(parentElement) ? "li" : undefined);
            resolvedDocumentFragment.appendChild(newChild);
        }
    }

    return resolvedDocumentFragment;
    if (resolvedDocumentFragment.children.length) {
        parentElement.innerHTML = '';
        //addReplaceAction(stateMapNodeActions, childElement, replaceWithChild);
        //nodeActionsMap.set(parentElement, stateMapNodeActions);
    }    
}
*/
;// ./src/core/commands.js
function commands_toConsumableArray(r) { return commands_arrayWithoutHoles(r) || commands_iterableToArray(r) || commands_unsupportedIterableToArray(r) || commands_nonIterableSpread(); }
function commands_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function commands_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function commands_arrayWithoutHoles(r) { if (Array.isArray(r)) return commands_arrayLikeToArray(r); }
function commands_slicedToArray(r, e) { return commands_arrayWithHoles(r) || commands_iterableToArrayLimit(r, e) || commands_unsupportedIterableToArray(r, e) || commands_nonIterableRest(); }
function commands_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function commands_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return commands_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? commands_arrayLikeToArray(r, a) : void 0; } }
function commands_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function commands_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function commands_arrayWithHoles(r) { if (Array.isArray(r)) return r; }





function mapStateToElements(stateItemsPropertyName, customElementName, parentElement) {
  var _parentElement$getSta = parentElement.getState(stateItemsPropertyName, true),
    _parentElement$getSta2 = commands_slicedToArray(_parentElement$getSta, 2),
    stateItemsArray = _parentElement$getSta2[0],
    theState = _parentElement$getSta2[1];
  if (!stateItemsArray || !Array.isArray(stateItemsArray)) {
    console.warn("state value for _map is not an array, in state property: " + stateItemsPropertyName);
    return null;
  }
  var wrapInElement = isElementAList(parentElement) ? "li" : undefined;
  var elements = mapStateArrayToElements(stateItemsArray, customElementName, wrapInElement);
  parentElement.innerHTML = "";
  if (elements.length) {
    parentElement.append.apply(parentElement, commands_toConsumableArray(elements));
  }
  return theState;
}

// Functions that run and handles "Command" attributes. Note, they should always be called
// with the "this" context set to the custom element the command is defined on
var COMMANDS = {
  map: function map(commandValue) {
    // The command value ("argument") is "<stateProp>:<custom element name>"
    var _commandValue$split = commandValue.split(':'),
      _commandValue$split2 = commands_slicedToArray(_commandValue$split, 2),
      stateItemsPropertyName = _commandValue$split2[0],
      customElementName = _commandValue$split2[1];
    var thiselement = this;
    var theState = mapStateToElements(stateItemsPropertyName, customElementName, thiselement);
    if (!theState) {
      console.warn("Mapping ".concat(stateItemsPropertyName, " to ").concat(customElementName, " failed!"));
      return;
    }
    theState._stateManager.addStateMap(stateItemsPropertyName, customElementName, thiselement);
  },
  text: function text(commandValue) {
    var stateProp = commandValue;
    this.initialSetText(stateProp);
    // DO NOT CALL .normalize()! It might change the Text Nodes!
  },
  bind: function bind(commandValue) {
    var _this = this;
    var _commandValue$split3 = commandValue.split(':'),
      _commandValue$split4 = commands_slicedToArray(_commandValue$split3, 2),
      attributeName = _commandValue$split4[0],
      statePropName = _commandValue$split4[1];
    if (!attributeName || !statePropName) {
      console.warn("Incorrect usage of _bind command! Please pass <attribute-name>:<state-prop-name>");
      return;
    }
    if (!attributeName in SUPPORTED_ATTRIBUTES_FOR_BINDING) {
      console.warn("Attribute ".concat(attributeName, " is not supported for _bind command!"));
      return;
    }
    this.bindAttributeToState(attributeName, statePropName);
    if (SUPPORTED_PROPERTIES_FOR_BINDING.includes(attributeName)) {
      if (attributeName === "value" && this.tagName === "INPUT" && SUPPORTED_INPUT_TYPES_FOR_VALUE_BINDING.includes(this.getAttribute('type'))) {
        this.addEventListener("input", function () {
          return _this.updateStateFromProperty("value");
        });
      } else if (attributeName === "checked" && this.tagName === "INPUT" && this.getAttribute('type') === "checkbox") {
        this.addEventListener("change", function () {
          return _this.updateStateFromProperty("checked");
        });
      }
    }
  }
};
;// ./src/core/ReactiveElement.js
function ReactiveElement_typeof(o) { "@babel/helpers - typeof"; return ReactiveElement_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ReactiveElement_typeof(o); }
function ReactiveElement_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = ReactiveElement_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function ReactiveElement_slicedToArray(r, e) { return ReactiveElement_arrayWithHoles(r) || ReactiveElement_iterableToArrayLimit(r, e) || ReactiveElement_unsupportedIterableToArray(r, e) || ReactiveElement_nonIterableRest(); }
function ReactiveElement_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function ReactiveElement_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return ReactiveElement_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ReactiveElement_arrayLikeToArray(r, a) : void 0; } }
function ReactiveElement_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ReactiveElement_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function ReactiveElement_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == ReactiveElement_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == ReactiveElement_typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != ReactiveElement_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != ReactiveElement_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }




function extendElementClassWithReactiveElementClass(elementClass) {
  var appScope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var _changeEventHandler = /*#__PURE__*/new WeakMap();
  var _wasMounted = /*#__PURE__*/new WeakMap();
  var _boundAttributesToState = /*#__PURE__*/new WeakMap();
  var _ReactiveElement_brand = /*#__PURE__*/new WeakSet();
  var ReactiveElement = /*#__PURE__*/function (_elementClass) {
    function ReactiveElement() {
      var _this;
      _classCallCheck(this, ReactiveElement);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, ReactiveElement, [].concat(args));
      _classPrivateMethodInitSpec(_this, _ReactiveElement_brand);
      // Should contain the "root" DOM element containing this element
      _defineProperty(_this, "host", null);
      // For input elements - to force bubble-up of change events
      _classPrivateFieldInitSpec(_this, _changeEventHandler, void 0);
      _classPrivateFieldInitSpec(_this, _wasMounted, false);
      // Used for the _bind command, which allows "reverse-binding" attribute values to state props,
      // keys are attribute names, values are state prop names
      _classPrivateFieldInitSpec(_this, _boundAttributesToState, {});
      return _this;
    }
    _inherits(ReactiveElement, _elementClass);
    return _createClass(ReactiveElement, [{
      key: "bindAttributeToState",
      value: function bindAttributeToState(attrName, statePropName) {
        _classPrivateFieldGet(_boundAttributesToState, this)[attrName] = statePropName;
      }
    }, {
      key: "unbindAttributeToState",
      value: function unbindAttributeToState(attrName) {
        delete _classPrivateFieldGet(_boundAttributesToState, this)[attrName];
      }

      // For input elements
    }, {
      key: "updateStateFromProperty",
      value: function updateStateFromProperty(propertyName) {
        var newValue = this[propertyName];
        var stateProp = _classPrivateFieldGet(_boundAttributesToState, this)[propertyName];
        var _this$getState = this.getState(stateProp, true),
          _this$getState2 = ReactiveElement_slicedToArray(_this$getState, 2),
          stateValue = _this$getState2[0],
          theState = _this$getState2[1];
        if (stateValue !== newValue) theState[stateProp] = newValue;
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this$host;
        if (_classPrivateFieldGet(_changeEventHandler, this)) this.removeEventListener('change', _classPrivateFieldGet(_changeEventHandler, this));
        var host = (_this$host = this.host) !== null && _this$host !== void 0 ? _this$host : this;
        if (host.ref) {
          var thisRefName = this.getAttribute('ref');
          if (thisRefName) {
            delete host.ref[thisRefName];
            delete host.events[thisRefName];
          }
        }
        _classPrivateFieldSet(_boundAttributesToState, this, {});
      }
    }, {
      key: "activate",
      value: function activate() {
        var _this2 = this;
        // Keep it here and not in bindEvents! 
        if ((this === null || this === void 0 ? void 0 : this.tagName) === "INPUT") {
          _classPrivateFieldSet(_changeEventHandler, this, function () {
            var changeEvent = new Event('inputChange', {
              bubbles: true,
              composed: true
            });
            this.dispatchEvent(changeEvent);
          });
          // Change events does not automatically bubbles, we need to listen and bubble up a new event
          this.addEventListener('change', _classPrivateFieldGet(_changeEventHandler, this), false);
        }
        var commands = [];
        var attributeNames = this.getAttributeNames();
        var _iterator = ReactiveElement_createForOfIteratorHelper(attributeNames),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var attrName = _step.value;
            var attrValue = this.getAttribute(attrName);
            // This also resolves "State attributes"
            this.initialSetAttribute(attrName, attrValue);

            // Save "Command attributes"\
            if (attrName.indexOf('_') === 0) {
              var command = attrName.substring(1);
              commands.push({
                command: command,
                args: attrValue
              });
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        commands.forEach(function (_ref) {
          var _COMMAND_ATTRIBUTES$c;
          var command = _ref.command,
            args = _ref.args;
          (_COMMAND_ATTRIBUTES$c = COMMANDS[command]) === null || _COMMAND_ATTRIBUTES$c === void 0 || _COMMAND_ATTRIBUTES$c.call(_this2, args);
        });
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this3 = this;
        if (_classPrivateFieldGet(_wasMounted, this)) return;
        // IMPORTANT: THIS *CAN* be NULL, DO NOT CHANGE IT!
        // It is part of the way a check is made to see if an element is part of ShadowDOM!
        // host will be null if the element is part of the DOM === the "root" custom element will have null in .host
        // THIS SHOULD BE THE FIRST THING THAT HAPPENS!
        this.host = this.getRootNode().host;
        if (this.host) {
          // Once the host custom element is connected
          // then its 'State' is ready and activated,
          // then we can call the sub-elements 'activate()',
          // which relies on an active state.
          // Doing it like this, allow visual render faster,
          // defering the state handling.
          this.host.addEventListener("connected", function () {
            return _this3.activate();
          }), {
            once: true
          };
        } else {
          // queueActivate(this, ()=> this.activate());
          queueMicrotask(function () {
            return _this3.activate();
          });
        }
        _classPrivateFieldSet(_wasMounted, this, true);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (!this.isConnected) return;
        if (attributeName === "ref") {
          var host = this.isNativeElement ? this.host : this;
          var refValue = newValue;
          host.ref[refValue] = this;
        }
        if (attributeName in _classPrivateFieldGet(_boundAttributesToState, this)) {
          _assertClassBrand(_ReactiveElement_brand, this, _updateStateFromAttribute).call(this, attributeName);
        }
      }

      // Gets state value of stateProp,
      // tries to resolve from local state(s) first,
      // and then from global. If the second argument is true, returns both the state value and the state objec
    }, {
      key: "getState",
      value: function getState(stateProp) {
        var returnStateObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var theState;
        // If this is a reactive element inside a reactive web component - the host should be the containing web component - 
        // we should reference its state, if host is null - it is most likely the host web component
        var thisInstance = this.isNativeElement && this.host ? this.host : this;
        // if (!thisInstance) return returnStateObject ? [undefined, undefined] : undefined;
        var stateVal;
        if (thisInstance && thisInstance.state) {
          var _thisInstance$state;
          stateVal = (_thisInstance$state = thisInstance.state) === null || _thisInstance$state === void 0 ? void 0 : _thisInstance$state[stateProp];
        }
        var globalState = false;
        while (stateVal === undefined && typeof thisInstance.host !== 'undefined' && thisInstance.host !== null) {
          var _thisInstance$state2;
          thisInstance = thisInstance.host;
          stateVal = (_thisInstance$state2 = thisInstance.state) === null || _thisInstance$state2 === void 0 ? void 0 : _thisInstance$state2[stateProp];
        }
        if (stateVal !== undefined) theState = thisInstance.state;else {
          var _globalState;
          globalState = appScope[GLOBAL_STATE_FUNCTION_NAME]();
          stateVal = (_globalState = globalState) === null || _globalState === void 0 ? void 0 : _globalState[stateProp];
          if (stateVal !== undefined) theState = globalState;
        }
        if (returnStateObject) {
          return [stateVal, theState];
        }
        return stateVal;
      }
    }, {
      key: "findElement",
      value: function findElement(refName) {
        var host = this.host || this;
        // if Shadow DOM is used, the "root" element is shadowRoot, otherwise it is the 
        // web component itself
        var root = host;
        if (appScope.SPROUT_CONFIG.useShadow) {
          root = host.shadowRoot;
        }
        return host.ref.hasOwnProperty(refName) ? host.ref[refName] : root.querySelector("[ref=\"".concat(refName, "\"]"));
      }

      // The "initialSetX" functions are called:
      // 1. When a custom element instance is first created (before it's connected) - 
      // state attribute values are set to their state prop names (e.g: '$name').
      // 2. When a custom element instance becomes connected (added to the DOM) - state attribute values are actually resolved to the
      // value of their respective state prop values, and binding between them occurs.
    }, {
      key: "initialSetText",
      value: function initialSetText(stateProp) {
        setStateText.call(this, stateProp);
      }
    }, {
      key: "initialSetAttribute",
      value: function initialSetAttribute(attributeName, attributeValue) {
        attributeValue = String(attributeValue);
        var valueToSet = attributeValue;
        /*
        // "Property Attribute"
        if (attributeValue.indexOf('@') === 0 && this.host && this.isConnected) {
            valueToSet = this.host.getAttribute(attributeValue.substring(1));
        } 
        */

        // "State attribute"
        if (attributeValue.indexOf('$') === 0 && this.isConnected) {
          var stateProp = attributeValue.substring(1);
          setStateAttribute.call(this, attributeName, stateProp);
        }
        // normal attribute
        else {
          setAttribute.call(this, attributeName, valueToSet);
        }
      }
    }]);
  }(elementClass);
  /*
  if (DEBUG_MODE) {
      const descriptors = Object.getOwnPropertyDescriptors(ReactiveElement.prototype);
      for (const key in descriptors) {
          const descrp = descriptors[key];
          Object.defineProperty(ReactiveElement.prototype, key, {
              writable: descrp.writable,
              configurable: descrp.configurable,
              enumerable: descrp.enumerable,
              value: ()=> {
                  `Calling ${key} on ReactiveElement for ${elementClass.toString()}`;
                  descrp.value();
              }
          });
      }
  }
  */
  function _updateStateFromAttribute(attributeName) {
    var newValue = this.getAttribute(attributeName);
    if (BOOLEAN_ATTRIBUTES.includes(attributeName)) {
      if (newValue === null) newValue = false;else newValue = true;
    }
    var stateProp = _classPrivateFieldGet(_boundAttributesToState, this)[attributeName];
    var _this$getState3 = this.getState(stateProp, true),
      _this$getState4 = ReactiveElement_slicedToArray(_this$getState3, 2),
      stateValue = _this$getState4[0],
      theState = _this$getState4[1];
    if (stateValue !== newValue) theState[stateProp] = newValue;
  }
  _defineProperty(ReactiveElement, "observedAttributes", ["ref"].concat(SUPPORTED_ATTRIBUTES_FOR_BINDING).concat(Object.keys(COMMANDS).map(function (command) {
    return '_' + command.toLowerCase();
  })));
  return ReactiveElement;
}
;// ./src/core/debug_utils.js
function debug_utils_typeof(o) { "@babel/helpers - typeof"; return debug_utils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, debug_utils_typeof(o); }
function debugGetProxyHandler(scopeName, originalObject) {
  return {
    get: function get(target, property, receiver) {
      if (debug_utils_typeof(property) === "symbol") return Reflect.get.apply(Reflect, arguments);
      console.debug("Property ".concat(property, " called on ").concat(scopeName));
      if (property === "prototype") {
        // return Object.getPrototypeOf(originalObject.prototype);
        return originalObject.prototype;
      }
      if (typeof target[property] === "function") {
        return new Proxy(target[property], debugApplyProxyHandler(property, "".concat(scopeName, ".").concat(property)));
      } else if (debug_utils_typeof(target[property]) === "object") {
        if (!target[property].hasOwnProperty("_stateManager")) {
          return new Proxy(target[property], debugGetProxyHandler("".concat(scopeName, ".").concat(property)));
        }
      }
      return Reflect.get.apply(Reflect, arguments);
    }
  };
}
function debugApplyProxyHandler(funcName, scopeName) {
  return {
    construct: function construct(target, args, newTarget) {
      console.debug("Constructing ".concat(funcName));
      return Reflect.construct(target, args, newTarget);
    },
    apply: function apply(target, thisArg, argumentsList) {
      console.debug("Function: ".concat(funcName, " with arguments: ").concat(argumentsList, " called on ").concat(scopeName));
      return Reflect.apply.apply(Reflect, arguments);
    }
  };
}
function putObjectInDebugMode(obj, name) {
  return new Proxy(obj, debugGetProxyHandler(name, obj));
}
;// ./src/core/StatefulArray.js
function StatefulArray_toConsumableArray(r) { return StatefulArray_arrayWithoutHoles(r) || StatefulArray_iterableToArray(r) || StatefulArray_unsupportedIterableToArray(r) || StatefulArray_nonIterableSpread(); }
function StatefulArray_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function StatefulArray_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return StatefulArray_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? StatefulArray_arrayLikeToArray(r, a) : void 0; } }
function StatefulArray_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function StatefulArray_arrayWithoutHoles(r) { if (Array.isArray(r)) return StatefulArray_arrayLikeToArray(r); }
function StatefulArray_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function StatefulArray_typeof(o) { "@babel/helpers - typeof"; return StatefulArray_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, StatefulArray_typeof(o); }
function StatefulArray_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function StatefulArray_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, StatefulArray_toPropertyKey(o.key), o); } }
function StatefulArray_createClass(e, r, t) { return r && StatefulArray_defineProperties(e.prototype, r), t && StatefulArray_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function StatefulArray_callSuper(t, o, e) { return o = StatefulArray_getPrototypeOf(o), StatefulArray_possibleConstructorReturn(t, StatefulArray_isNativeReflectConstruct() ? Reflect.construct(o, e || [], StatefulArray_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function StatefulArray_possibleConstructorReturn(t, e) { if (e && ("object" == StatefulArray_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return StatefulArray_assertThisInitialized(t); }
function StatefulArray_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function StatefulArray_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && StatefulArray_setPrototypeOf(t, e); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = StatefulArray_getPrototypeOf(t));); return t; }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, StatefulArray_getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), StatefulArray_setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (StatefulArray_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && StatefulArray_setPrototypeOf(p, r.prototype), p; }
function StatefulArray_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (StatefulArray_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function StatefulArray_setPrototypeOf(t, e) { return StatefulArray_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, StatefulArray_setPrototypeOf(t, e); }
function StatefulArray_getPrototypeOf(t) { return StatefulArray_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, StatefulArray_getPrototypeOf(t); }
function StatefulArray_defineProperty(e, r, t) { return (r = StatefulArray_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function StatefulArray_toPropertyKey(t) { var i = StatefulArray_toPrimitive(t, "string"); return "symbol" == StatefulArray_typeof(i) ? i : i + ""; }
function StatefulArray_toPrimitive(t, r) { if ("object" != StatefulArray_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != StatefulArray_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var StatefulArray = /*#__PURE__*/function (_Array) {
  // noConvertToStateItems can be used in internal methods where a normal array is returned and you just want to recreate a StatefulArray,
  // with the same state items

  // NOTE: original Array constructor can get a series of arguments to build an array from, OR a single number,
  // to create an array with that number as a length
  function StatefulArray(initialArray, parentStateObject, arrayStateProp) {
    var _this;
    var noConvertToStateItems = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var appScope = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : window;
    StatefulArray_classCallCheck(this, StatefulArray);
    var StateManager = appScope.SPROUT_CONFIG.stateManagerClass;
    if (!Array.isArray(initialArray)) {
      throw Error("Argument for StateFulArray constructor must be an array!");
    }
    var rawArray = initialArray;
    var statefulArray;
    if (!noConvertToStateItems) {
      statefulArray = rawArray.map(function (item, index) {
        if (item !== null && item !== void 0 && item.hasOwnProperty('state')) return item;
        if (Array.isArray(item)) return item; // return new StatefulArray(item, this[index].state, index, false, appScope); 
        if (StatefulArray_typeof(item) === 'object') return new StateManager(item, arrayStateProp, parentStateObject._stateManager, false, appScope);
        return item;
      });
    }
    _this = StatefulArray_callSuper(this, StatefulArray, StatefulArray_toConsumableArray(statefulArray));
    // If any of these are "set" - handle state change in the value
    StatefulArray_defineProperty(_this, "dependencyProps", new Map());
    _this.parentStateObject = parentStateObject;
    _this.arrayStateProp = arrayStateProp;
    _this.rawArray = rawArray;
    statefulArray = new Proxy(_this, StatefulArrayHandler(parentStateObject === null || parentStateObject === void 0 ? void 0 : parentStateObject._stateManager, arrayStateProp, appScope));
    return StatefulArray_possibleConstructorReturn(_this, statefulArray);
  }
  StatefulArray_inherits(StatefulArray, _Array);
  return StatefulArray_createClass(StatefulArray, [{
    key: "splice",
    value:
    // We set the $$operation property on functions that manipulates the array in a way that can change its length,
    // to prevent redundant calls for handleStateChange.
    // The call will be made when the "length" property of the array will be changed
    function splice() {
      var _get2;
      this.$$operation = "splice";
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var result = (_get2 = _get(StatefulArray_getPrototypeOf(StatefulArray.prototype), "splice", this)).call.apply(_get2, [this].concat(args));
      delete this.$$operation;
      return result;
    }
  }, {
    key: "shift",
    value: function shift() {
      var _get3;
      this.$$operation = "shift";
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      var result = (_get3 = _get(StatefulArray_getPrototypeOf(StatefulArray.prototype), "shift", this)).call.apply(_get3, [this].concat(args));
      delete this.$$operation;
      return result;
    }
  }, {
    key: "unshift",
    value: function unshift() {
      var _get4;
      this.$$operation = "splice";
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      var result = (_get4 = _get(StatefulArray_getPrototypeOf(StatefulArray.prototype), "unshift", this)).call.apply(_get4, [this].concat(args));
      delete this.$$operation;
      return result;
    }
  }, {
    key: "sort",
    value: function sort() {
      var _get5;
      this.$$operation = "sort";
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      var result = (_get5 = _get(StatefulArray_getPrototypeOf(StatefulArray.prototype), "sort", this)).call.apply(_get5, [this].concat(args));
      delete this.$$operation;
      handleStateChange(this.parentStateObject._stateManager, this.arrayStateProp);
      return result;
    }
  }, {
    key: "reverse",
    value: function reverse() {
      var _get6;
      this.$$operation = "reverse";
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      var result = (_get6 = _get(StatefulArray_getPrototypeOf(StatefulArray.prototype), "reverse", this)).call.apply(_get6, [this].concat(args));
      delete this.$$operation;
      handleStateChange(this.parentStateObject._stateManager, this.arrayStateProp);
      return result;
    }
  }, {
    key: "fill",
    value: function fill() {
      var _get7;
      this.$$operation = "fill";
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      var result = (_get7 = _get(StatefulArray_getPrototypeOf(StatefulArray.prototype), "fill", this)).call.apply(_get7, [this].concat(args));
      delete this.$$operation;
      handleStateChange(this.parentStateObject._stateManager, this.arrayStateProp);
      return result;
    }
  }, {
    key: "copyWithin",
    value: function copyWithin() {
      var _get8;
      this.$$operation = "copyWithin";
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      var result = (_get8 = _get(StatefulArray_getPrototypeOf(StatefulArray.prototype), "sort", this)).call.apply(_get8, [this].concat(args));
      delete this.$$operation;
      handleStateChange(this.parentStateObject._stateManager, this.arrayStateProp);
      return result;
    }
  }, {
    key: "slice",
    value: function slice() {
      var _get9;
      this.$$operation = "slice";
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      var result = (_get9 = _get(StatefulArray_getPrototypeOf(StatefulArray.prototype), "slice", this)).call.apply(_get9, [this].concat(args));
      delete this.$$operation;
      return result;
    }

    /*
    clone() {
        this.$$operation = "clone";
        const result = this.map(item=> item);
        delete this.$$operation;
        return result;
    }
    */
  }, {
    key: "toArray",
    value: function toArray() {
      this.$$operation = "toArray";
      /*
      const result = [];
      for (let i = 0, len=this.length; i<len; i++) {
          result.push(Object.assign({}, this[i]));
      }
      */
      var result = this.rawArray;
      delete this.$$operation;
      return result;
    }
  }], [{
    key: Symbol.species,
    get:
    // This will define which "constructor" JS calls whenever it needs to construct a new array while calling some Array native functions
    function get() {
      return Array;
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(Array));
if (DEBUG_MODE) {
  StatefulArray = putObjectInDebugMode(StatefulArray, "StatefulArray");
}
/* harmony default export */ const core_StatefulArray = (StatefulArray);
;// ./src/core/proxy_handlers.js
function proxy_handlers_typeof(o) { "@babel/helpers - typeof"; return proxy_handlers_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, proxy_handlers_typeof(o); }




var StatefulArrayHandler = function StatefulArrayHandler(parentStateManager, arrayStateProp) {
  var appScope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  var StateManager = appScope.SPROUT_CONFIG.stateManagerClass;
  return {
    set: function set(targetArray, property, value) {
      // A change in array length triggers state change in the array state prop
      if (property === "length") {
        var setResult = Reflect.set(targetArray, property, value);
        parentStateManager.setDirtyProp(arrayStateProp);
        // queueMicrotask(()=> handleStateChange(parentStateManager, arrayStateProp));
        return setResult;
      }

      // Return if the value is the same
      if (targetArray[property] === value) return true;
      var index = Number(property);
      if (!isNaN(index)) {
        // Check if the property is a numeric index
        // If we set it to a new object, convert it to a state object
        if (proxy_handlers_typeof(value) === 'object' && !value.hasOwnProperty('_stateManager') && !value.hasOwnProperty('state')) {
          value = new StateManager(value, arrayStateProp, parentStateManager, false, appScope);
        }
        // Make sure state values are always state manager values
        // Sometimes they can be state objects (because of the custom get handler in the Proxy)
        if (value.hasOwnProperty('_stateManager')) {
          value = value._stateManager;
        }
        // This means the object actions are part of a native array function ('splice' etc.), and that we should NOT
        // mark $$mapAction on values
        if (!targetArray.hasOwnProperty('$$operation')) {
          var doStateChangeHandle = false;
          if (index < targetArray.length) {
            doStateChangeHandle = true;
          }
          var _setResult = Reflect.set(targetArray, property, value);
          // Only handle state change if this is a change for an existing array item,
          // if it's a new item, it will already be handled on the "length" property set
          // Without this check we will have a redundant state check
          if (doStateChangeHandle) {
            parentStateManager.setDirtyProp(arrayStateProp);
            //queueMicrotask(()=> handleStateChange(parentStateManager, arrayStateProp));
          }
          return _setResult;
        }
      }
      return Reflect.set(targetArray, property, value);
    },
    get: function get(targetArray, property, receiver) {
      // if (typeof property === 'symbol') return Reflect.get(...arguments);
      // if (property === 'hasOwnProperty') return Reflect.get(...arguments);
      var index = Number(property);
      if (!isNaN(index)) {
        if (!targetArray[index]) return undefined;
        if (targetArray[index].hasOwnProperty('state')) return targetArray[index].state;
        // Could be another array
        return targetArray[index];
      }

      /*
      // If this property is set on the array, it means the get is part of a "dependency check"
      if (targetArray.hasOwnProperty("_gettingDependenciesFor")) {
          targetArray.dependencyProps.set(property, targetArray._gettingDependenciesFor);
          delete targetArray._gettingDependenciesFor;
      }
      */

      return Reflect.get.apply(Reflect, arguments);
    }
  };
};
var StateObjectValueHandler = function StateObjectValueHandler(rootStateObj, objPropertyName) {
  var appScope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  return {
    defineProperty: function defineProperty(targetObj, property, descriptor) {
      if (typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.value) !== "undefined") {
        var value = descriptor.value;
        // Could already be a StatefulArray (needs to find better way to detect this)
        if (Array.isArray(value)) {
          var _value$;
          if (!(value !== null && value !== void 0 && (_value$ = value[0]) !== null && _value$ !== void 0 && _value$._stateManager)) {
            descriptor.value = new core_StatefulArray(descriptor.value, rootStateObj, objPropertyName, false, appScope);
          }
        } else if (proxy_handlers_typeof(value) === "object") {
          descriptor.value = new Proxy(descriptor.value, StateObjectValueHandler(rootStateObj, objPropertyName, appScope));
        }
      } else if (typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.get) === "function") {
        descriptor.get.call(targetObj);
      }
      // Don't use "arguments" here - they are not linked to argument changes in 'strict'
      var definePropertyResult = Reflect.defineProperty(targetObj, property, descriptor);
      var stateManager = rootStateObj._stateManager;
      stateManager.setDirtyProp(objPropertyName);
      // queueMicrotask(()=> handleStateChange(stateManager, objPropertyName));
      return definePropertyResult;
    }
  };
};
var StateHandler = function StateHandler(stateObj) {
  var appScope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return {
    defineProperty: function defineProperty(targetState, stateProp, descriptor) {
      var _targetState;
      if (BUILT_IN_STATE_PROPS.includes(stateProp) || (_targetState = targetState) !== null && _targetState !== void 0 && _targetState._binding) {
        return Reflect.defineProperty.apply(Reflect, arguments);
      }
      var origTargetState = targetState;
      var dependencies = new Set();
      // Will be the actual prop name if this is a state hook setter
      var setStateProp;
      targetState = new Proxy(targetState, {
        get: function get(target, property, receiver) {
          if (property === "_global") {
            target._global._gettingDependenciesFor = stateProp;
            target._global._localStateManager = target._stateManager;
          }
          if (BUILT_IN_STATE_PROPS.includes(property)) {
            return Reflect.get.apply(Reflect, arguments);
          }
          if (Array.isArray(target[property])) {
            target[property]._gettingDependenciesFor = stateProp;
          }
          dependencies.add(property);
          return Reflect.get.apply(Reflect, arguments);
        }
      });
      if (typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.value) !== "undefined") {
        var value = descriptor.value;
        // Could already be a StatefulArray (needs to find better way to detect this)
        if (Array.isArray(value)) {
          var _value$2;
          // Setter Hook
          if (stateProp.indexOf('set_') === 0) {
            var deps = value === null || value === void 0 ? void 0 : value[1];
            if (!deps) throw Error(ERROR_MESSAGES.NO_DEPENDENCIES_ARRAY_IN_SET_HOOK(stateProp));
            // Second item should be an array of dependencies
            value === null || value === void 0 || value[1].forEach(function (depProp) {
              dependencies.add(depProp);
            });
            // Third item can be a boolean stating if to run the setter on initialization
            if ((value === null || value === void 0 ? void 0 : value[2]) === true) {
              setStateProp = stateProp.substring(4);
              var func = value === null || value === void 0 ? void 0 : value[0];
              if (func && typeof func === "function") {
                stateObj[setStateProp] = func.call(stateObj);
              }
            } else {
              if (value !== null && value !== void 0 && value[3]) {
                stateObj[setStateProp] = value[3];
              }
            }
          } else if (!(value !== null && value !== void 0 && (_value$2 = value[0]) !== null && _value$2 !== void 0 && _value$2._stateManager)) {
            descriptor.value = new core_StatefulArray(descriptor.value, stateObj, stateProp, false, appScope);
          }
        } else if (proxy_handlers_typeof(value) === 'object') {
          descriptor.value = new Proxy(descriptor.value, StateObjectValueHandler(stateObj, stateProp, appScope));
        }
      } else if (typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.get) === "function") {
        descriptor.get.call(targetState);
      }
      if (dependencies.size) {
        dependencies.forEach(function (dep) {
          return stateObj._stateManager.addStateDependency(dep, stateProp);
        });
      }

      // Don't use "arguments" here - they are not linked to argument changes in 'strict'
      var definePropertyResult = Reflect.defineProperty(origTargetState, stateProp, descriptor);
      var stateManager = stateObj._stateManager;
      if (setStateProp) stateProp = setStateProp;
      if (!origTargetState.hasOwnProperty("_populate")) stateManager.setDirtyProp(stateProp);
      // queueMicrotask(()=> handleStateChange(stateManager, stateProp));
      return definePropertyResult;
    },
    get: function get(targetState, property, receiver) {
      if (property === 'hasOwnProperty') return Reflect.get.apply(Reflect, arguments);
      // Global state access
      if (!targetState.hasOwnProperty('_global')) {
        if (targetState.hasOwnProperty("_gettingDependenciesFor")) {
          targetState._stateManager.addGlobalStateDependency(property, targetState._gettingDependenciesFor, targetState._localStateManager);
          delete targetState._gettingDependenciesFor;
          delete targetState._localStateManager;
          return Reflect.get.apply(Reflect, arguments);
        }
      }
      // property can be a Symbol on rare occasions, then indexOf will be undefined (that's the reason for the question mark)
      // This handles using the negate operator on state properties
      if (typeof (property === null || property === void 0 ? void 0 : property.indexOf) === 'function' && (property === null || property === void 0 ? void 0 : property.indexOf('!')) === 0) {
        var originalProperty = property.substring(1);
        if (targetState.hasOwnProperty(originalProperty)) {
          return !targetState[originalProperty];
        }
      }
      return Reflect.get.apply(Reflect, arguments);
    }
  };
};
;// ./src/core/StateManager.js
function StateManager_typeof(o) { "@babel/helpers - typeof"; return StateManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, StateManager_typeof(o); }
function StateManager_toConsumableArray(r) { return StateManager_arrayWithoutHoles(r) || StateManager_iterableToArray(r) || StateManager_unsupportedIterableToArray(r) || StateManager_nonIterableSpread(); }
function StateManager_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function StateManager_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return StateManager_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? StateManager_arrayLikeToArray(r, a) : void 0; } }
function StateManager_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function StateManager_arrayWithoutHoles(r) { if (Array.isArray(r)) return StateManager_arrayLikeToArray(r); }
function StateManager_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function StateManager_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function StateManager_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, StateManager_toPropertyKey(o.key), o); } }
function StateManager_createClass(e, r, t) { return r && StateManager_defineProperties(e.prototype, r), t && StateManager_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function StateManager_classPrivateFieldInitSpec(e, t, a) { StateManager_checkPrivateRedeclaration(e, t), t.set(e, a); }
function StateManager_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function StateManager_defineProperty(e, r, t) { return (r = StateManager_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function StateManager_toPropertyKey(t) { var i = StateManager_toPrimitive(t, "string"); return "symbol" == StateManager_typeof(i) ? i : i + ""; }
function StateManager_toPrimitive(t, r) { if ("object" != StateManager_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != StateManager_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function StateManager_classPrivateFieldSet(s, a, r) { return s.set(StateManager_assertClassBrand(s, a), r), r; }
function StateManager_classPrivateFieldGet(s, a) { return s.get(StateManager_assertClassBrand(s, a)); }
function StateManager_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }







// This class actually handles "State". It returns a proxied "state" object,
// while handling all state changes and triggers behind the scenes
var _handleStateChangeRAF_ID = /*#__PURE__*/new WeakMap();
var StateManager = /*#__PURE__*/function () {
  function StateManager(initialState, parentStateProp, parentStateManager) {
    var _this = this;
    var isGlobal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var appScope = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : window;
    StateManager_classCallCheck(this, StateManager);
    // The privateState is used to actually contain values to read from,
    // as custom getters and setters are defined
    StateManager_defineProperty(this, "privateState", {});
    // This represents the "publicly" exposed state object
    StateManager_defineProperty(this, "state", {});
    // Saves "map" connections between a state array value and a custom element name,
    // this will enable creating/removing new custom elements when items of a state array change
    StateManager_defineProperty(this, "stateArrayMaps", {});
    // conditionallyRenderingElements = {};
    // A map that maps state props to "dependencies", each time a stateProp which is a key here,
    // is changed, a state change is triggered for its dependencies as well
    StateManager_defineProperty(this, "stateDependencies", {});
    StateManager_defineProperty(this, "conditionallyRenderingElements", {});
    // Maps state props to state nodes,
    // Keys are state props, and values are sets of Nodes
    StateManager_defineProperty(this, "stateNodes", {});
    // These are used when the state object is part of Stateful Array
    StateManager_defineProperty(this, "parentStateProp", void 0);
    StateManager_defineProperty(this, "parentStateManager", void 0);
    // parentStatePropName is used if the state object is e.g. an item of an array on a state object,
    // or a value in an object on a state object - any change on the child state object should trigger state
    // changes on the parentStateProp
    // host is the host element that the state is attached to
    StateManager_defineProperty(this, "dirtyProps", new Set());
    StateManager_classPrivateFieldInitSpec(this, _handleStateChangeRAF_ID, null);
    this.parentStateProp = parentStateProp;
    this.parentStateManager = parentStateManager;

    // Saves the actual state manager instance to a readonly _stateManager
    setHiddenProperty(this.state, "_stateManager", this, true);

    // Initialize a proxy on the "public state"
    this.state = new Proxy(this.state, StateHandler(this.state, appScope));
    if (!isGlobal) setHiddenProperty(this.state, "_global", appScope[GLOBAL_STATE_FUNCTION_NAME](), true);else {
      // This maps depencdies between "local" state properties to global state changes
      // The difference between the normal dependencies object, is that each depenency
      // also includes a state object (which is the state context of the property),
      // in other words, if a local state "relies" on a global state change - we save this
      // mapping here.
      // The keys are global state properties, where each value is a Map,
      // in the map, the keys are local state manager objects, and the values are sets with
      // local property names
      this.globalStateDependencies = {};
      this.addGlobalStateDependency = function (stateProp, depStateProp, stateManager) {
        if (!_this.globalStateDependencies.hasOwnProperty(stateProp)) {
          _this.globalStateDependencies[stateProp] = new Map();
        }
        if (!_this.globalStateDependencies[stateProp].has(stateManager)) {
          _this.globalStateDependencies[stateProp].set(stateManager, new Set());
        }
        _this.globalStateDependencies[stateProp].get(stateManager).add(depStateProp);
      };
    }
    if (initialState) {
      populateStateFromInitialState(this.state, initialState);
    }
    setHiddenProperty(this.state, "_isActive", this, true);
  }
  return StateManager_createClass(StateManager, [{
    key: "setDirtyProp",
    value: function setDirtyProp(prop) {
      var _this2 = this;
      this.dirtyProps.add(prop);
      if (StateManager_classPrivateFieldGet(_handleStateChangeRAF_ID, this)) {
        cancelAnimationFrame(StateManager_classPrivateFieldGet(_handleStateChangeRAF_ID, this));
        // clearTimeout(this.#handleStateChangeRAF_ID);
      }
      StateManager_classPrivateFieldSet(_handleStateChangeRAF_ID, this, requestAnimationFrame(function () {
        StateManager_classPrivateFieldSet(_handleStateChangeRAF_ID, _this2, null);
        if (_this2.dirtyProps.size > 0) {
          _this2.handleStateChanges();
        }
      }));
    }
  }, {
    key: "handleStateChanges",
    value: function handleStateChanges() {
      var _this3 = this;
      var stateProps = StateManager_toConsumableArray(this.dirtyProps);
      this.dirtyProps.clear();
      stateProps.forEach(function (prop) {
        handleStateChange(_this3, prop);
      });
    }
  }, {
    key: "addStateDependency",
    value: function addStateDependency(stateProp, depStateProp) {
      if (!this.stateDependencies.hasOwnProperty(stateProp)) {
        this.stateDependencies[stateProp] = new Set();
      }
      this.stateDependencies[stateProp].add(depStateProp);
    }
  }, {
    key: "addStateMap",
    value: function addStateMap(stateProp, customElementName, parentElement) {
      if (!this.stateArrayMaps.hasOwnProperty(stateProp)) {
        this.stateArrayMaps[stateProp] = new Map();
      }
      this.stateArrayMaps[stateProp].set(parentElement, customElementName);
    }
  }, {
    key: "addConditionallyRenderingElements",
    value: function addConditionallyRenderingElements(stateProp, element) {
      var _element$host;
      if (!this.conditionallyRenderingElements.hasOwnProperty(stateProp)) {
        this.conditionallyRenderingElements[stateProp] = new Set();
      }
      element.originalParentElement = element.parentElement || ((_element$host = element.host) === null || _element$host === void 0 ? void 0 : _element$host.shadowRoot);
      this.conditionallyRenderingElements[stateProp].add(element);
    }

    // Node here is either an Attribute Node or a Text Node
  }, {
    key: "addStateNode",
    value: function addStateNode(stateProp, stateNode) {
      var isBooleanStateProp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!this.stateNodes.hasOwnProperty(stateProp)) {
        this.stateNodes[stateProp] = new Set();
        this.setAndBindStateProperty(stateProp, isBooleanStateProp);
      }
      this.stateNodes[stateProp].add(stateNode);
    }
  }, {
    key: "setAndBindStateProperty",
    value: function setAndBindStateProperty(stateProp) {
      var stateObj = this.state;
      var originalStateProp = stateProp;
      var isNegationProp = stateProp.indexOf('!') === 0;
      if (isNegationProp) {
        originalStateProp = stateProp.substring(1);
      }
      var descriptor = Object.getOwnPropertyDescriptor(stateObj, originalStateProp);
      if (!descriptor) {
        stateObj = stateObj._global;
        descriptor = Object.getOwnPropertyDescriptor(stateObj, originalStateProp);
        if (!descriptor) {
          throw Error("Could not bind state prop ".concat(stateProp, ". State prop ").concat(originalStateProp, " not defined!"));
        }
      }
      stateObj._binding = true;

      // Some state props can be getters (which usually references other state values)
      // These should be treated differently: should not be saved in privateState, and should not have a setter defined
      var isValueProp = descriptor.hasOwnProperty('value');
      var stateManager = stateObj._stateManager;
      if (isNegationProp) {
        var negateStateProp = stateProp;
        if (isValueProp) {
          if (!stateManager.privateState.hasOwnProperty(negateStateProp)) {
            Object.defineProperty(stateObj, negateStateProp, {
              get: function get() {
                return !stateManager.privateState[originalStateProp];
              },
              set: function set() {
                throw Error("Cannot directly set a negation State property!");
              },
              enumerable: true
            });
            stateManager.addStateDependency(originalStateProp, negateStateProp);
          }
        } else {
          if (!stateManager.state.hasOwnProperty(negateStateProp)) {
            Object.defineProperty(stateObj, negateStateProp, {
              get: function get() {
                return !stateManager.state[originalStateProp];
              },
              set: function set() {
                throw Error("Cannot directly set a negation State property!");
              },
              enumerable: true
            });
            stateManager.addStateDependency(originalStateProp, negateStateProp);
          }
        }
      } else {
        if (isValueProp) {
          if (!stateManager.privateState.hasOwnProperty(stateProp)) {
            stateManager.privateState[stateProp] = stateObj[stateProp];
          }
          Object.defineProperty(stateObj, stateProp, {
            set: function set(value) {
              var currentVal = stateManager.privateState[stateProp];
              if (value === currentVal) return;
              // Sets value to "private state"
              stateManager.privateState[stateProp] = value;
              handleStateChange(stateManager, stateProp);
              // If this is an item in a Stateful Array, also trigger a state change for the state prop that contains the array
              if (stateManager.parentStateManager) {
                handleStateChange(stateManager.parentStateManager, stateManager.parentStateProp);
              }
            },
            get: function get() {
              // Value is always retrieved from the "private" state
              return stateManager.privateState[stateProp];
            }
          });
        }
        // If is a getter then - it can't be set, and the getter will return the value.
      }
      delete this.state._binding;
    }
  }]);
}();
if (DEBUG_MODE) {
  StateManager = putObjectInDebugMode(StateManager, 'StateManager');
}
/* harmony default export */ const core_StateManager = (StateManager);
;// ./src/build/index.js
function build_typeof(o) { "@babel/helpers - typeof"; return build_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, build_typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == build_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(build_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function build_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, build_toPropertyKey(o.key), o); } }
function build_createClass(e, r, t) { return r && build_defineProperties(e.prototype, r), t && build_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function build_toPropertyKey(t) { var i = build_toPrimitive(t, "string"); return "symbol" == build_typeof(i) ? i : i + ""; }
function build_toPrimitive(t, r) { if ("object" != build_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != build_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function build_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function build_callSuper(t, o, e) { return o = build_getPrototypeOf(o), build_possibleConstructorReturn(t, build_isNativeReflectConstruct() ? Reflect.construct(o, e || [], build_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function build_possibleConstructorReturn(t, e) { if (e && ("object" == build_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return build_assertThisInitialized(t); }
function build_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function build_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (build_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function build_getPrototypeOf(t) { return build_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, build_getPrototypeOf(t); }
function build_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && build_setPrototypeOf(t, e); }
function build_setPrototypeOf(t, e) { return build_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, build_setPrototypeOf(t, e); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// This is the script that takes Template elements from the page and defines Reactive Custom Elements
/* harmony default export */ function build(appScope, appName) {
  // Create custom elements from templates
  function defineCustomElementFromTemplate(_x, _x2, _x3) {
    return _defineCustomElementFromTemplate.apply(this, arguments);
  }
  function _defineCustomElementFromTemplate() {
    _defineCustomElementFromTemplate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(template, elemName, globalStylesheet) {
      var templateContent, style, runtime;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            templateContent = document.importNode(template.content, true);
            style = templateContent.querySelector('style');
            if (style) templateContent.removeChild(style);
            runtime = templateContent.querySelector('script');
            if (runtime) templateContent.removeChild(runtime);
            customElements.define(elemName, /*#__PURE__*/function (_appScope$ReactiveCus) {
              function _class() {
                build_classCallCheck(this, _class);
                return build_callSuper(this, _class, [templateContent, runtime, style === null || style === void 0 ? void 0 : style.textContent, globalStylesheet]);
              }
              build_inherits(_class, _appScope$ReactiveCus);
              return build_createClass(_class);
            }(appScope.ReactiveCustomElement));
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _defineCustomElementFromTemplate.apply(this, arguments);
  }
  function build() {
    var globalStylesheet;
    var globalStyle = document.querySelector("head > style[app=\"".concat(appName, "\"]"));
    if (globalStyle) {
      globalStylesheet = new CSSStyleSheet();
      globalStylesheet.replaceSync(globalStyle.textContent);
    }
    Array.prototype.forEach.call(document.querySelectorAll("template[app=\"".concat(appName, "\"]")), function (template) {
      defineCustomElementFromTemplate(template, template.getAttribute('for'), globalStylesheet);
    });
    if (typeof globalThis["".concat(appName, "_runtime")] === 'function') {
      var globalRuntimeFunction = globalThis["".concat(appName, "_runtime")];
      globalRuntimeFunction.call(appScope);
    }
  }
  build();
}
;// ./src/core/attr_utils.js
function attr_utils_typeof(o) { "@babel/helpers - typeof"; return attr_utils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, attr_utils_typeof(o); }
// Convert attribute values to "typed" values
function attributeValueToTypedValue(attrValue) {
  var typedValue = attrValue;
  if (attrValue === "true") typedValue = true;else if (attrValue === "false") typedValue = false;else if (!isNaN(Number(attrValue))) typedValue = Number(attrValue);
  return typedValue;
}

// Check if attribute node is a "Command" or a "State Attribute" 
function isSpecialAttribute(attrNode) {
  if (attr_utils_typeof(attrNode) !== "object" && attrNode.constructor.name !== "Attr") throw Error("Passed non Attribute to isSpecialAttribute!");
  return attrNode.nodeName.indexOf('_') === 0 || attrNode.nodeValue.indexOf('$') === 0;
}
;// ./src/core/ConditionalElement.js
function ConditionalElement_slicedToArray(r, e) { return ConditionalElement_arrayWithHoles(r) || ConditionalElement_iterableToArrayLimit(r, e) || ConditionalElement_unsupportedIterableToArray(r, e) || ConditionalElement_nonIterableRest(); }
function ConditionalElement_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function ConditionalElement_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function ConditionalElement_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ConditionalElement_toConsumableArray(r) { return ConditionalElement_arrayWithoutHoles(r) || ConditionalElement_iterableToArray(r) || ConditionalElement_unsupportedIterableToArray(r) || ConditionalElement_nonIterableSpread(); }
function ConditionalElement_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function ConditionalElement_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return ConditionalElement_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ConditionalElement_arrayLikeToArray(r, a) : void 0; } }
function ConditionalElement_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function ConditionalElement_arrayWithoutHoles(r) { if (Array.isArray(r)) return ConditionalElement_arrayLikeToArray(r); }
function ConditionalElement_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ConditionalElement_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function ConditionalElement_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, ConditionalElement_toPropertyKey(o.key), o); } }
function ConditionalElement_createClass(e, r, t) { return r && ConditionalElement_defineProperties(e.prototype, r), t && ConditionalElement_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function ConditionalElement_toPropertyKey(t) { var i = ConditionalElement_toPrimitive(t, "string"); return "symbol" == ConditionalElement_typeof(i) ? i : i + ""; }
function ConditionalElement_toPrimitive(t, r) { if ("object" != ConditionalElement_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != ConditionalElement_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function ConditionalElement_callSuper(t, o, e) { return o = ConditionalElement_getPrototypeOf(o), ConditionalElement_possibleConstructorReturn(t, ConditionalElement_isNativeReflectConstruct() ? Reflect.construct(o, e || [], ConditionalElement_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function ConditionalElement_possibleConstructorReturn(t, e) { if (e && ("object" == ConditionalElement_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return ConditionalElement_assertThisInitialized(t); }
function ConditionalElement_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function ConditionalElement_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (ConditionalElement_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function ConditionalElement_getPrototypeOf(t) { return ConditionalElement_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, ConditionalElement_getPrototypeOf(t); }
function ConditionalElement_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && ConditionalElement_setPrototypeOf(t, e); }
function ConditionalElement_setPrototypeOf(t, e) { return ConditionalElement_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, ConditionalElement_setPrototypeOf(t, e); }
function ConditionalElement_classPrivateFieldInitSpec(e, t, a) { ConditionalElement_checkPrivateRedeclaration(e, t), t.set(e, a); }
function ConditionalElement_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function ConditionalElement_classPrivateFieldSet(s, a, r) { return s.set(ConditionalElement_assertClassBrand(s, a), r), r; }
function ConditionalElement_classPrivateFieldGet(s, a) { return s.get(ConditionalElement_assertClassBrand(s, a)); }
function ConditionalElement_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
function ConditionalElement_typeof(o) { "@babel/helpers - typeof"; return ConditionalElement_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ConditionalElement_typeof(o); }




// returns a Boolean according to the conditional equality of conditional to conditionStateValue
function resolveConditional(conditional, conditionStateValue) {
  var typeOf = ConditionalElement_typeof(conditional);
  if (typeOf !== 'string') {
    return conditionStateValue === conditional;
  } else {
    if (conditional === "always") return true;
    if (CONDITIONAL_OPERATORS.includes(conditional[0])) {
      var conditionFn = new Function("return ".concat(conditionStateValue).concat(conditional));
      return conditionFn();
    } else {
      return conditionStateValue === conditional;
    }
  }
}
function getConditionalElementClass(ReactiveElementClass) {
  var _conditionStateProp = /*#__PURE__*/new WeakMap();
  var _renderMap = /*#__PURE__*/new WeakMap();
  var _wasMounted = /*#__PURE__*/new WeakMap();
  var ConditionalElement = /*#__PURE__*/function (_ReactiveElementClass) {
    function ConditionalElement() {
      var _this;
      ConditionalElement_classCallCheck(this, ConditionalElement);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = ConditionalElement_callSuper(this, ConditionalElement, [].concat(args));
      ConditionalElement_classPrivateFieldInitSpec(_this, _conditionStateProp, void 0);
      ConditionalElement_classPrivateFieldInitSpec(_this, _renderMap, void 0);
      ConditionalElement_classPrivateFieldInitSpec(_this, _wasMounted, false);
      return _this;
    }
    ConditionalElement_inherits(ConditionalElement, _ReactiveElementClass);
    return ConditionalElement_createClass(ConditionalElement, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        var isFirstRender = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var stateValue;
        if (ConditionalElement_classPrivateFieldGet(_conditionStateProp, this).indexOf('@') === 0) {
          stateValue = this.host.getAttribute(ConditionalElement_classPrivateFieldGet(_conditionStateProp, this).substring(1));
        } else {
          stateValue = this.getState(ConditionalElement_classPrivateFieldGet(_conditionStateProp, this));
        }
        if (stateValue === undefined) {
          throw Error("State value for ".concat(ConditionalElement_classPrivateFieldGet(_conditionStateProp, this), " not found while rendering conditional-render element:"), this);
        }
        var elementsToRender = [];
        ConditionalElement_classPrivateFieldGet(_renderMap, this).forEach(function (elements, conditional) {
          if (resolveConditional(conditional, stateValue)) {
            elementsToRender.push.apply(elementsToRender, ConditionalElement_toConsumableArray(elements));
          }
        });
        if (isFirstRender) {
          this.innerHTML = "";
          this.append.apply(this, elementsToRender);
        } else if (elementsToRender.length) {
          queueConditionalRender(this, function () {
            _this2.innerHTML = "";
            _this2.append.apply(_this2, elementsToRender);
          });
        }
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        this.host = this.getRootNode().host;
        if (!this.host) {
          throw Error("<conditional-render> must be used as part of a custom element template! Cannot be used outside of a custom element.");
        }
        if (ConditionalElement_classPrivateFieldGet(_wasMounted, this)) return;
        var conditionAttributeValue = this.getAttribute("_condition");
        if (!conditionAttributeValue) {
          throw Error("conditional-render elements must have a _condition command attribute");
        }
        if (!this.children || !this.children.length) {
          throw Error("Conditional element must have children!");
        }
        var statePropName = conditionAttributeValue;
        ConditionalElement_classPrivateFieldSet(_conditionStateProp, this, statePropName);
        var isConditionStatic = ConditionalElement_classPrivateFieldGet(_conditionStateProp, this).indexOf('@') === 0;
        var stateValue, stateObject;
        if (!isConditionStatic) {
          var _this$getState = this.getState(statePropName, true);
          var _this$getState2 = ConditionalElement_slicedToArray(_this$getState, 2);
          stateValue = _this$getState2[0];
          stateObject = _this$getState2[1];
          if (typeof stateValue === "undefined") {
            throw Error("State property ".concat(statePropName, " not defined for _condition command!"));
          }
        }
        var renderMap = new Map();
        renderMap.set("always", []);
        var children = ConditionalElement_toConsumableArray(this.children);
        children.forEach(function (conditionalChild) {
          var _if = conditionalChild.getAttribute('_if');
          if (_if) {
            var expectedValue = attributeValueToTypedValue(_if);
            if (!renderMap.has(expectedValue)) renderMap.set(expectedValue, []);
            renderMap.get(expectedValue).push(conditionalChild);
          } else {
            renderMap.get("always").push(conditionalChild);
          }
        });
        ConditionalElement_classPrivateFieldSet(_renderMap, this, renderMap);
        if (!isConditionStatic) {
          stateObject._stateManager.addConditionallyRenderingElements(statePropName, this);
        }
        this.render(true);
        ConditionalElement_classPrivateFieldSet(_wasMounted, this, true);
      }
    }]);
  }(ReactiveElementClass);
  return ConditionalElement;
}
;// ./src/core/ReactiveCustomElement.js
function ReactiveCustomElement_typeof(o) { "@babel/helpers - typeof"; return ReactiveCustomElement_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ReactiveCustomElement_typeof(o); }
function ReactiveCustomElement_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = ReactiveCustomElement_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function ReactiveCustomElement_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return ReactiveCustomElement_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ReactiveCustomElement_arrayLikeToArray(r, a) : void 0; } }
function ReactiveCustomElement_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ReactiveCustomElement_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function ReactiveCustomElement_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, ReactiveCustomElement_toPropertyKey(o.key), o); } }
function ReactiveCustomElement_createClass(e, r, t) { return r && ReactiveCustomElement_defineProperties(e.prototype, r), t && ReactiveCustomElement_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function ReactiveCustomElement_callSuper(t, o, e) { return o = ReactiveCustomElement_getPrototypeOf(o), ReactiveCustomElement_possibleConstructorReturn(t, ReactiveCustomElement_isNativeReflectConstruct() ? Reflect.construct(o, e || [], ReactiveCustomElement_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function ReactiveCustomElement_possibleConstructorReturn(t, e) { if (e && ("object" == ReactiveCustomElement_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return ReactiveCustomElement_assertThisInitialized(t); }
function ReactiveCustomElement_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function ReactiveCustomElement_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (ReactiveCustomElement_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function ReactiveCustomElement_getPrototypeOf(t) { return ReactiveCustomElement_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, ReactiveCustomElement_getPrototypeOf(t); }
function ReactiveCustomElement_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && ReactiveCustomElement_setPrototypeOf(t, e); }
function ReactiveCustomElement_setPrototypeOf(t, e) { return ReactiveCustomElement_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, ReactiveCustomElement_setPrototypeOf(t, e); }
function ReactiveCustomElement_classPrivateMethodInitSpec(e, a) { ReactiveCustomElement_checkPrivateRedeclaration(e, a), a.add(e); }
function ReactiveCustomElement_classPrivateFieldInitSpec(e, t, a) { ReactiveCustomElement_checkPrivateRedeclaration(e, t), t.set(e, a); }
function ReactiveCustomElement_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function ReactiveCustomElement_defineProperty(e, r, t) { return (r = ReactiveCustomElement_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function ReactiveCustomElement_toPropertyKey(t) { var i = ReactiveCustomElement_toPrimitive(t, "string"); return "symbol" == ReactiveCustomElement_typeof(i) ? i : i + ""; }
function ReactiveCustomElement_toPrimitive(t, r) { if ("object" != ReactiveCustomElement_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != ReactiveCustomElement_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function ReactiveCustomElement_classPrivateFieldGet(s, a) { return s.get(ReactiveCustomElement_assertClassBrand(s, a)); }
function ReactiveCustomElement_classPrivateFieldSet(s, a, r) { return s.set(ReactiveCustomElement_assertClassBrand(s, a), r), r; }
function ReactiveCustomElement_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }






function getReactiveCustomElementClass() {
  var appScope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var ReactiveHTMLElement = extendElementClassWithReactiveElementClass(HTMLElement, appScope);
  var StateManager = appScope.SPROUT_CONFIG.stateManagerClass;
  var _wasMounted = /*#__PURE__*/new WeakMap();
  var _onMount = /*#__PURE__*/new WeakMap();
  var _beforeRender = /*#__PURE__*/new WeakMap();
  var _afterRender = /*#__PURE__*/new WeakMap();
  var _templateContent = /*#__PURE__*/new WeakMap();
  var _stylesheet = /*#__PURE__*/new WeakMap();
  var _globalStylesheet = /*#__PURE__*/new WeakMap();
  var _boundEventNames = /*#__PURE__*/new WeakMap();
  var _eventHandler = /*#__PURE__*/new WeakMap();
  var _ReactiveCustomElement_brand = /*#__PURE__*/new WeakSet();
  var ReactiveCustomElement = /*#__PURE__*/function (_ReactiveHTMLElement) {
    function ReactiveCustomElement() {
      var _this;
      var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var runtimeScript = arguments.length > 1 ? arguments[1] : undefined;
      var style = arguments.length > 2 ? arguments[2] : undefined;
      var globalStylesheet = arguments.length > 3 ? arguments[3] : undefined;
      ReactiveCustomElement_classCallCheck(this, ReactiveCustomElement);
      _this = ReactiveCustomElement_callSuper(this, ReactiveCustomElement);
      ReactiveCustomElement_classPrivateMethodInitSpec(_this, _ReactiveCustomElement_brand);
      // Should contain the "root" DOM element containing this element
      ReactiveCustomElement_defineProperty(_this, "host", null);
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _wasMounted, false);
      // Callback function for when the element is connected to a DOM tree on the page and rendered
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _onMount, void 0);
      // Callback function for when the element is connected to a DOM tree on the page, just before render
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _beforeRender, void 0);
      // Callback function for when the element is connected to a DOM tree on the page, just after render,
      // before state/reactivity activation
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _afterRender, void 0);
      // Should only be used on non native custom elements
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _templateContent, void 0);
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _stylesheet, void 0);
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _globalStylesheet, void 0);
      // This will be an object where keys are element "ref" names,
      // and the value is either a "click" event handler (if it's a function),
      // or an object with DOM event names as keys and event handlers as functions.
      // Only relevant for non native custom elements - event bubbling from child elements will be used
      ReactiveCustomElement_defineProperty(_this, "events", void 0);
      // Name of events that are bound to the main event handler function
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _boundEventNames, []);
      // Main event handler function 
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _eventHandler, void 0);
      var isFrameworkElement = _this.tagName === "CONDITIONAL-ELEMENT";
      if (isFrameworkElement) return ReactiveCustomElement_possibleConstructorReturn(_this);
      if (runtimeScript) {
        var dynamicRuntimeFn = new Function(runtimeScript.textContent);
        var runtime = dynamicRuntimeFn();
        ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, _this, _setRuntime).call(_this, runtime);
      }
      if (style) {
        var stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(style);
        ReactiveCustomElement_classPrivateFieldSet(_stylesheet, _this, stylesheet);
      }
      if (globalStylesheet) {
        ReactiveCustomElement_classPrivateFieldSet(_globalStylesheet, _this, globalStylesheet);
      }
      ReactiveCustomElement_classPrivateFieldSet(_templateContent, _this, (template === null || template === void 0 ? void 0 : template.cloneNode(true)) || DEFAULT_TEMPLATE_DOM.cloneNode());
      // Maps "ref names" to actual elements in the component DOM tree,
      // for fast access.
      _this.ref = {};
      return _this;
    }
    ReactiveCustomElement_inherits(ReactiveCustomElement, _ReactiveHTMLElement);
    return ReactiveCustomElement_createClass(ReactiveCustomElement, [{
      key: "setInitialState",
      value: function setInitialState(initState) {
        if (this.initialState) {
          Object.assign(this.initialState, initState);
        } else {
          this.initialState = initState;
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, this, _unbindEvents).call(this);
        this.state = undefined;
      }
    }, {
      key: "activate",
      value: function activate() {
        var _this2 = this;
        var attributeNames = this.getAttributeNames();
        var _iterator = ReactiveCustomElement_createForOfIteratorHelper(attributeNames),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var attrName = _step.value;
            var attrValue = this.getAttribute(attrName);
            // This also resolves "State attributes"
            this.initialSetAttribute(attrName, attrValue);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        queueBindEvents(this, function () {
          return ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, _this2, _bindEvents).call(_this2);
        });
        if (ReactiveCustomElement_classPrivateFieldGet(_onMount, this)) queueMicrotask(function () {
          return ReactiveCustomElement_classPrivateFieldGet(_onMount, _this2).call(_this2, appScope[GLOBAL_STATE_FUNCTION_NAME]());
        });
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this3 = this;
        if (ReactiveCustomElement_classPrivateFieldGet(_wasMounted, this)) return;
        // IMPORTANT: THIS *CAN* be NULL, DO NOT CHANGE IT!
        // It is part of the way a check is made to see if an element is part of ShadowDOM!
        // host will be null if the element is part of the DOM === the "root" custom element will have null in .host
        // THIS SHOULD BE THE FIRST THING THAT HAPPENS!
        this.host = this.getRootNode().host;
        if (ReactiveCustomElement_classPrivateFieldGet(_beforeRender, this)) ReactiveCustomElement_classPrivateFieldGet(_beforeRender, this).call(this, appScope[GLOBAL_STATE_FUNCTION_NAME]());
        ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, this, _renderTemplate).call(this);
        if (ReactiveCustomElement_classPrivateFieldGet(_afterRender, this)) ReactiveCustomElement_classPrivateFieldGet(_afterRender, this).call(this, appScope[GLOBAL_STATE_FUNCTION_NAME]());
        queueMicrotask(function () {
          ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, _this3, _setActiveStateFromInitialState).call(_this3);
          _this3.dispatchEvent(new CustomEvent("connected"));
          _this3.activate();
        });
        ReactiveCustomElement_classPrivateFieldSet(_wasMounted, this, true);
      }
    }]);
  }(ReactiveHTMLElement);
  function _setRuntime(runtime) {
    if (runtime.events) {
      this.events = runtime.events;
      if (this.isConnected) ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, this, _bindEvents).call(this);
    }
    if (runtime.state) {
      this.setInitialState(runtime.state);
      // If this is not mounted yet, #setStateFromInitialState will be called from onConnected callback
      if (this.isConnected) ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, this, _setActiveStateFromInitialState).call(this);
    }
    if (runtime.onMount) {
      ReactiveCustomElement_classPrivateFieldSet(_onMount, this, runtime.onMount);
    }
    if (runtime.beforeRender) {
      ReactiveCustomElement_classPrivateFieldSet(_beforeRender, this, runtime.beforeRender);
    }
  }
  function _setActiveStateFromInitialState() {
    if (!this.initialState) return;
    var initialState = this.initialState;
    if (initialState._stateManager) {
      this.state = initialState._stateManager.state;
    } else {
      this.state = new StateManager(initialState, undefined, undefined, false, appScope).state;
    }
    delete this.initialState;
  }
  function _renderTemplate() {
    if (appScope.SPROUT_CONFIG.useShadow) {
      var shadowRoot = this.attachShadow({
        mode: "open"
      });
      this.shadowRoot.adoptedStyleSheets = [];
      if (ReactiveCustomElement_classPrivateFieldGet(_globalStylesheet, this)) this.shadowRoot.adoptedStyleSheets.push(ReactiveCustomElement_classPrivateFieldGet(_globalStylesheet, this));
      if (ReactiveCustomElement_classPrivateFieldGet(_stylesheet, this)) this.shadowRoot.adoptedStyleSheets.push(ReactiveCustomElement_classPrivateFieldGet(_stylesheet, this));
      shadowRoot.appendChild(ReactiveCustomElement_classPrivateFieldGet(_templateContent, this));
    } else {
      var fragment = new DocumentFragment();
      fragment.appendChild(ReactiveCustomElement_classPrivateFieldGet(_templateContent, this));
      this.appendChild(fragment);
    }
  }
  function _unbindEvents() {
    var _this4 = this;
    if (!ReactiveCustomElement_classPrivateFieldGet(_boundEventNames, this).length) return;
    var thiselement = this;
    ReactiveCustomElement_classPrivateFieldGet(_boundEventNames, this).forEach(function (eventName) {
      thiselement.removeEventListener(eventName, ReactiveCustomElement_classPrivateFieldGet(_eventHandler, _this4), false);
    });
  }
  function _bindEvents() {
    var _this5 = this,
      _classPrivateFieldGet2;
    if (!this.events) return;
    var eventRefNames = Object.keys(this.events);
    var clickActions = {};
    var otherActions = {};
    eventRefNames.forEach(function (refName) {
      var value = _this5.events[refName];
      if (typeof value === 'function') {
        clickActions[refName] = value;
      } else if (ReactiveCustomElement_typeof(value) === 'object') {
        var _eventNames = Object.keys(value);
        _eventNames.forEach(function (eventName) {
          if (eventName === 'click') {
            clickActions[refName] = value[eventName];
          } else {
            if (!otherActions[eventName]) otherActions[eventName] = {};
            otherActions[eventName][refName] = value[eventName];
          }
        });
      }
    });
    var globalState = appScope[GLOBAL_STATE_FUNCTION_NAME]();
    ReactiveCustomElement_classPrivateFieldSet(_eventHandler, this, function (event) {
      var _this6 = this;
      var start = performance.now();
      var elementsPath = event.composedPath();
      var target;
      if (elementsPath) {
        target = elementsPath.find(function (element) {
          return element.hasAttribute && element.hasAttribute('ref') && element.getAttribute('ref') in _this6.events;
        });
      } else {
        target = event.target.hasAttribute && event.target.hasAttribute('ref') && event.target.getAttribute('ref') in this.events ? event.target : null;
      }
      if (target) {
        var ref = target.getAttribute('ref');
        var eventName = event.type;
        if (eventName === "click") {
          var clickEvent = typeof this.events[ref] === "function" ? this.events[ref] : null;
          clickEvent === null || clickEvent === void 0 || clickEvent.call(target, event, event.target, globalState);
        } else {
          var _this$events$ref$even;
          (_this$events$ref$even = this.events[ref][eventName]) === null || _this$events$ref$even === void 0 || _this$events$ref$even.call(target, event, event.target, globalState);
        }
      }
    });
    var thiselement = this;
    if (Object.keys(clickActions).length) {
      thiselement.addEventListener('click', ReactiveCustomElement_classPrivateFieldGet(_eventHandler, this));
      ReactiveCustomElement_classPrivateFieldGet(_boundEventNames, this).push('click');
    }
    var eventNames = Object.keys(otherActions);
    for (var _i = 0, _eventNames2 = eventNames; _i < _eventNames2.length; _i++) {
      var eventName = _eventNames2[_i];
      thiselement.addEventListener(eventName, ReactiveCustomElement_classPrivateFieldGet(_eventHandler, this));
    }
    (_classPrivateFieldGet2 = ReactiveCustomElement_classPrivateFieldGet(_boundEventNames, this)).push.apply(_classPrivateFieldGet2, eventNames);
  }
  return ReactiveCustomElement;
}
;// ./src/core/index.js
function core_typeof(o) { "@babel/helpers - typeof"; return core_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, core_typeof(o); }
function core_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, core_toPropertyKey(o.key), o); } }
function core_createClass(e, r, t) { return r && core_defineProperties(e.prototype, r), t && core_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function core_toPropertyKey(t) { var i = core_toPrimitive(t, "string"); return "symbol" == core_typeof(i) ? i : i + ""; }
function core_toPrimitive(t, r) { if ("object" != core_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != core_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function core_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function core_callSuper(t, o, e) { return o = core_getPrototypeOf(o), core_possibleConstructorReturn(t, core_isNativeReflectConstruct() ? Reflect.construct(o, e || [], core_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function core_possibleConstructorReturn(t, e) { if (e && ("object" == core_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return core_assertThisInitialized(t); }
function core_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function core_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (core_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function core_getPrototypeOf(t) { return core_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, core_getPrototypeOf(t); }
function core_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && core_setPrototypeOf(t, e); }
function core_setPrototypeOf(t, e) { return core_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, core_setPrototypeOf(t, e); }









var allowAppScopeAccess = document.currentScript.hasAttribute("allowappscopeaccess");
var stateManagerClass = core_StateManager;
globalThis.SproutInitApp = function (appName) {
  var appScope = function () {
    var _window;
    return {
      window: window,
      document: (_window = window) === null || _window === void 0 ? void 0 : _window.document
    };
  }(window);
  var config = {
    useShadow: true,
    // Always use shadow DOM for now, may add configurability later
    allowAppScopeAccess: allowAppScopeAccess,
    stateManagerClass: stateManagerClass
  };
  if (config.allowAppScopeAccess) {
    Object.defineProperty(globalThis, "sproutApps", {
      value: {},
      writable: false
    });
    Object.defineProperty(globalThis.sproutApps, appName, {
      value: appScope,
      writable: false
    });
  }
  appScope.SPROUT_CONFIG = Object.seal(config);

  // Prevent "hasOwnProperty" shenanigans
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  setHiddenProperty(Object.prototype, "hasOwnProperty", hasOwnProperty);
  appScope[GLOBAL_STATE_FUNCTION_NAME] = function () {
    return {};
  };
  // If initialState is passed - also sets it to global state
  appScope.setGlobalState = function () {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var globalState = new appScope.SPROUT_CONFIG.stateManagerClass(initialState, undefined, undefined, true, appScope).state;
    var globalStateVarName = GLOBAL_STATE_VAR_NAME;
    Object.defineProperty(appScope, globalStateVarName, {
      value: globalState,
      writable: DEBUG_MODE ? true : false,
      configurable: false
    });
    Object.defineProperty(appScope, GLOBAL_STATE_FUNCTION_NAME, {
      value: function value() {
        return appScope[globalStateVarName];
      }
    });
  };
  var HTML_REACTIVE_ELEMENT_CLASSES = {};
  HTML_ELEMENTS_CLASSES_MAP.forEach(function (elementDefinition) {
    return HTML_REACTIVE_ELEMENT_CLASSES[elementDefinition.element] = extendElementClassWithReactiveElementClass(elementDefinition["class"], appScope, true);
  });
  appScope.ReactiveCustomElement = getReactiveCustomElementClass(appScope);

  // Extend specific HTMLElement classes to enable reactivity (use it by adding an "is" attribute to an element)
  HTML_ELEMENTS_CLASSES_MAP.forEach(function (itemDefinition) {
    customElements.define("reactive-".concat(itemDefinition.element),
    // extendElementClassWithReactiveElementClass(itemDefinition.class, appScope, true),
    HTML_REACTIVE_ELEMENT_CLASSES[itemDefinition.element], {
      "extends": itemDefinition.element
    });
  });
  var ReactiveHeadingClass = extendElementClassWithReactiveElementClass(HTMLHeadingElement, appScope);
  ["h1", "h2", "h3", "h4", "h5", "h6"].forEach(function (hTag) {
    customElements.define("reactive-".concat(hTag), /*#__PURE__*/function (_ReactiveHeadingClass) {
      function _class() {
        core_classCallCheck(this, _class);
        return core_callSuper(this, _class, arguments);
      }
      core_inherits(_class, _ReactiveHeadingClass);
      return core_createClass(_class);
    }(ReactiveHeadingClass), {
      "extends": hTag
    });
  });
  var ReactiveConditionalElementClass = extendElementClassWithReactiveElementClass(HTMLElement, appScope);
  var ConditionalElementClass = getConditionalElementClass(ReactiveConditionalElementClass);
  customElements.define('conditional-render', ConditionalElementClass);
  return function () {
    build(appScope, appName);
  }.bind(appScope);
};
/******/ })()
;
//# sourceMappingURL=sprout-core.js.map