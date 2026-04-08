/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!****************************************!*\
  !*** ./src/core/index.js + 23 modules ***!
  \****************************************/

;// ./src/shared/code_utils.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var ReadonlySet = /*#__PURE__*/function (_Set) {
  function ReadonlySet(iterable) {
    var _this;
    _classCallCheck(this, ReadonlySet);
    _this = _callSuper(this, ReadonlySet, [iterable]);
    // We need to set it here, because the native constructor calls 'add'
    _this.add = function () {
      return ReadonlySet.unavailableMethod("add");
    };
    return _this;
  }
  _inherits(ReadonlySet, _Set);
  return _createClass(ReadonlySet, [{
    key: "delete",
    value: function _delete() {
      ReadonlySet.unavailableMethod("delete");
    }
  }, {
    key: "clear",
    value: function clear() {
      ReadonlySet.unavailableMethod("clear");
    }
  }], [{
    key: "unavailableMethod",
    value: function unavailableMethod(methodName) {
      throw Error("Can't use ".concat(methodName, " in ReadonlySet"));
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(Set));
;// ./src/shared/consts.js


// disabled, selected, src
var BOOLEAN_ATTRIBUTES = new ReadonlySet(['hidden', 'checked', 'disabled', 'required', 'selected']);
var AUTO_ATTRIBUTES_TO_PROPS = new ReadonlySet(['checked', 'disabled', 'selected', 'src']);
var SUPPORTED_ATTRIBUTES_FOR_BINDING = new ReadonlySet(['value', 'checked']);

// These are "built-in" state props that are automatically added to state objects,
// and should not be included in the normal state change/check flow
var BUILT_IN_STATE_PROPS = new ReadonlySet(['_global', '_gettingDependenciesFor', '_localStateManager', '_stateManager', '_binding', '_populate', '_isActive', '_isStateManager', '_isStatefulArray', 'hasOwnProperty']);
var GLOBAL_STATE_VAR_NAME = "SproutGlobalState";
var GLOBAL_STATE_FUNCTION_NAME = "getGlobalState";
var GLOBAL_STATE_NOT_SET_YET = "Global State Not Set Yet";
var ERROR_MESSAGES = Object.freeze({
  NO_DEPENDENCIES_ARRAY_IN_SET_HOOK: function NO_DEPENDENCIES_ARRAY_IN_SET_HOOK(stateProp) {
    return "State set hook, must include a dependencies array! None was found for ".concat(stateProp);
  }
});
var HTML_ELEMENT_CLASSES_MAP = Object.freeze([{
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
},
// { class: HTMLInputElement, element: "input" },
{
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
]);

// For development purposes only,
// turn this on to see exactly which functions in each entity are called and when.
var DEBUG_MODE = false;
var DEFAULT_TEMPLATE_DOM = document.createElement('div');
var NODES_STATE = {
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
  paintRafId: null
};
var CONDITIONAL_OPERATORS = new ReadonlySet(['==', '===', '!=', '!==', '<', '<=', '>', '>=']);
var consts_CONDITIONAL_OPERATORS_REGEX = /^(==|===|!=|!==|<|<=|>|>=)/;

// Used to flag items to be removed in StatefulArray
var STATEFUL_ARRAY_REMOVE_FLAG_STRING = "$$remove$$";
var STATEFUL_ARRAY_REMOVED_FLAG_STRING = "$$removed$$";

// Names of array methods that changes the content of the array itself (mutate it)
// NOT including methods that just changes its length (removes items without changing the rest)
var ARRAY_MUTATE_METHODS = new ReadonlySet(["reverse", "sort", "splice", "copyWithin", "fill"]);

// Array "mapping" methods (where you pass a callback function)
var ARRAY_CACHE_METHODS = new ReadonlySet(["every", "some", "filter", "forEach", "map", "reduce", "reduceRight", "slice"]);
var SYMBOL_NAMES = {
  STATE_NOT_FOUND: "SPROUT_STATE_NOT_FOUND"
};
var BINDABLE_ATTRIBUTES_TO_STATE_NODES = new ReadonlySet(["checked", "value"]);
var SPROUT_FROZEN_CSS_CLASS_NAME = "sprout-frozen";
var SPROUT_FROZEN_CLASS_CSS = "\n    .".concat(SPROUT_FROZEN_CSS_CLASS_NAME, " {\n        visibility: hidden;\n        clip-path: inset(100%);\n        pointer-events: none;\n    }\n");
var DETACH_METHOD = Object.freeze({
  HIDE_UNHIDE: 1,
  CLONE: 2
});
var MAX_OPERATIONS_PER_ANIMATION_FRAME = 100;
var MAX_DOM_ACTIONS_PER_FRAME = {
  ATTRIBUTE_ACTIONS: 600,
  TEXT_ACTIONS: 300,
  ELEMENT_ACTIONS: 100,
  PROPERTY_ACTIONS: 50,
  REATTACH_ACTIONS: 10
};

// Max time in ms for doing paint jobs
var FRAME_BUDGET = 8;
;// ./src/core/attr_utils.js


// Convert attribute values to "typed" values
function attributeValueToTypedValue(attrValue) {
  var typedValue = attrValue;
  if (attrValue === "true") typedValue = true;else if (attrValue === "false") typedValue = false;else if (!isNaN(Number(attrValue))) typedValue = Number(attrValue);
  return typedValue;
}

// 'this' should be the element. attributeValue should start with '@'
function bindPropAttribute(attributeName, attributeValue) {
  var propName = attributeValue.substring(1);
  var attrNode = this.getAttributeNode(attributeName);
  attrNode.nodeValue = this.host.getAttribute(propName);
  attrNode.isPropAttribute = true;
  if (!this.host.propAttributes.has(propName)) {
    this.host.propAttributes.set(propName, new Set());
  }
  this.host.propAttributes.get(propName).add(attrNode);
}
function isBooleanAttribute(attributeName) {
  return BOOLEAN_ATTRIBUTES.has(attributeName);
}
function isStateAttribute(attrName) {
  return attrName.indexOf(':') === 0;
}
;// ./src/core/HTMLElementMapParent.js
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }


// Extract real custom element in-case inside a wrapper element (e.g. <li>)
function getRealChild(child) {
  return Object.hasOwn(child, "state") ? child : child.firstElementChild;
}

// We use pendingKeyMapActions - because states become active only after mounts (only after reattach of parent)
var HTMLElementMapParent = {
  // Note the opposite arguments order!
  replaceChildWith: function replaceChildWith(oldChild, newChild) {
    var _this = this;
    var childIndex = _toConsumableArray(this.children).indexOf(oldChild);
    var oldKey = getRealChild(oldChild).state.key;
    this.replaceChild(newChild, oldChild);
    this.pendingKeyMapActions.add(function () {
      return _this.keyMap["delete"](oldKey);
    });
    this.pendingKeyMapActions.add(function () {
      var realNewChild = getRealChild(newChild);
      if (realNewChild.isActive) _this.keyMap.set(realNewChild.state.key, newChild);else realNewChild.addEventListener("active", function () {
        _this.keyMap.set(realNewChild.state.key, newChild);
      }, {
        once: true
      });
    });
  },
  removeChild: function removeChild(child) {
    var _this2 = this;
    var key = getRealChild(child).state.key;
    // IMPORTANT: call the native version
    HTMLElement.prototype.removeChild.call(this, child);
    this.pendingKeyMapActions.add(function () {
      return _this2.keyMap["delete"](key);
    });
  },
  append: function append() {
    var _HTMLElement$prototyp,
      _this3 = this;
    for (var _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) {
      elements[_key] = arguments[_key];
    }
    // call native
    (_HTMLElement$prototyp = HTMLElement.prototype.append).call.apply(_HTMLElement$prototyp, [this].concat(elements));

    // start from current child count minus newly-added elements
    // let index = this.children.length - elements.length;
    var _loop = function _loop() {
      var element = _elements[_i];
      _this3.pendingKeyMapActions.add(function () {
        var realChild = getRealChild(element);
        if (realChild.isActive) {
          var key = realChild.state.key;
          _this3.keyMap.set(key, element);
        } else realChild.addEventListener("active", function () {
          var key = realChild.state.key;
          _this3.keyMap.set(key, element);
        }, {
          once: true
        });
      });
    };
    for (var _i = 0, _elements = elements; _i < _elements.length; _i++) {
      _loop();
    }
  },
  appendChild: function appendChild(newChild) {
    var _this4 = this;
    HTMLElement.prototype.appendChild.call(this, newChild);
    this.pendingKeyMapActions.add(function () {
      var realChild = getRealChild(newChild);
      if (realChild.isActive) {
        var key = realChild.state.key;
        _this4.keyMap.set(key, newChild);
      } else realChild.addEventListener("active", function () {
        var key = realChild.state.key;
        _this4.keyMap.set(key, newChild);
      }, {
        once: true
      });
    });
  },
  prepend: function prepend(newChild) {
    var _this5 = this;
    HTMLElement.prototype.prepend.call(this, newChild);
    this.pendingKeyMapActions.add(function () {
      var realChild = getRealChild(newChild);
      if (realChild.isActive) {
        var key = realChild.state.key;
        _this5.keyMap.set(key, newChild);
      } else realChild.addEventListener("active", function () {
        var key = realChild.state.key;
        _this5.keyMap.set(key, newChild);
      }, {
        once: true
      });
    });
  },
  detach: function detach() {
    var clonePattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
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

    var returnElement;
    if (clonePattern) {
      var cloned = this.cloneNode(true);
      cloned.$$originalElement = this;
      cloned.$$detached = DETACH_METHOD.CLONE;
      returnElement = cloned;
    } else {
      this.classList.add(SPROUT_FROZEN_CSS_CLASS_NAME);
      this.$$detached = DETACH_METHOD.HIDE_UNHIDE;
      returnElement = this;
    }
    return returnElement;
  },
  reattach: function reattach() {
    /*
    // NOTE: this commented-out part uses the moveBefore method
    // it's not widely supported yet
    // also, it seems just hiding with display = 'none' and showing again has the same performance
     if (!this.originalParentNode) {
        console.warn("Tried to reattach without a known originalParentNode");
    }
    this.originalParentNode.moveBefore(this, null);
    */
    if (!this.$$detached) {
      console.warn("Tried to reattach an undetached element");
      return;
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
      this.classList.remove(SPROUT_FROZEN_CSS_CLASS_NAME);
    } else if (this.$$detached === DETACH_METHOD.CLONE) {
      this.$$originalElement.replaceWith(this);
    }
    this.$$detached = undefined;
  }
};
function makeElementMapParent(parentElement) {
  Object.assign(parentElement, HTMLElementMapParent);
  // Maps state.key to currently attached child elements
  parentElement.keyMap = new Map();
  parentElement.pendingKeyMapActions = new Set();
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
;// ./src/core/commands.js
function commands_toConsumableArray(r) { return commands_arrayWithoutHoles(r) || commands_iterableToArray(r) || commands_unsupportedIterableToArray(r) || commands_nonIterableSpread(); }
function commands_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function commands_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function commands_arrayWithoutHoles(r) { if (Array.isArray(r)) return commands_arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || commands_unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function commands_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return commands_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? commands_arrayLikeToArray(r, a) : void 0; } }
function commands_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




function mapStateToElements(stateItemsPropertyName, customElementName, parentElement) {
  var _parentElement$getSta = parentElement.getState(stateItemsPropertyName, true),
    _parentElement$getSta2 = _slicedToArray(_parentElement$getSta, 2),
    stateItemsArray = _parentElement$getSta2[0],
    theState = _parentElement$getSta2[1];
  if (!stateItemsArray || !Array.isArray(stateItemsArray)) {
    console.warn("state value for _map is not an array, in state property: " + stateItemsPropertyName);
    return null;
  }
  if (!Object.hasOwn(stateItemsArray, "_isStateMap")) {
    console.warn("Array '".concat(stateItemsPropertyName, "' used for State Map was not defined with stateMap option in SSH. This can have unexpected results. Consider adding stateMap: true."));
  }
  // stateItemsArray.makeStateMap();
  var wrapInElement = isElementAList(parentElement) ? "li" : undefined;
  var elements = mapStateArrayToElements(stateItemsArray, customElementName, wrapInElement, parentElement);
  parentElement.innerHTML = "";
  if (elements.length) {
    // parentElement SHOULD BE HTMLElementMapParent (with "superpowers" such as keyMap)
    parentElement.append.apply(parentElement, commands_toConsumableArray(elements));
  }
  return theState;
}

// Functions that run and handles "Command" attributes. Note, they should always be called
// with the "this" context set to the Element instance the command is defined on
var COMMANDS = {
  map: function map(commandValue) {
    // The command value ("argument") is "<stateProp>:<custom element name>"
    var _commandValue$split = commandValue.split(':'),
      _commandValue$split2 = _slicedToArray(_commandValue$split, 2),
      stateItemsPropertyName = _commandValue$split2[0],
      customElementName = _commandValue$split2[1];
    var thiselement = this;
    // Give this element "Map parent element super powers"
    makeElementMapParent(thiselement);
    queueMicrotask(function () {
      var theState = mapStateToElements(stateItemsPropertyName, customElementName, thiselement);
      if (!theState) {
        console.warn("Mapping ".concat(stateItemsPropertyName, " to ").concat(customElementName, " failed!"));
        return;
      }
      theState._stateManager.addStateMap(stateItemsPropertyName, customElementName, thiselement);
    });
  },
  text: function text(commandValue) {
    var stateProp = commandValue;
    this.initialSetText(stateProp);
    // DO NOT CALL .normalize()! It might change the Text Nodes!
  },
  bind: function bind(commandValue) {
    if (this.tagName !== "INPUT") {
      console.warn("_bind command is only supported on input elements!");
      return;
    }
    var _commandValue$split3 = commandValue.split(':'),
      _commandValue$split4 = _slicedToArray(_commandValue$split3, 2),
      attributeName = _commandValue$split4[0],
      statePropName = _commandValue$split4[1];
    if (!attributeName || !statePropName) {
      console.warn("Incorrect usage of _bind command! Please pass <attribute-name>:<state-property-name>");
      return;
    }
    if (!SUPPORTED_ATTRIBUTES_FOR_BINDING.has(attributeName)) {
      console.warn("Attribute ".concat(attributeName, " is not supported for _bind command!"));
      return;
    }
    this.bindAttributeToState(attributeName, statePropName);
  },
  bindprop: function bindprop(commandValue) {
    var _commandValue$split5 = commandValue.split(':'),
      _commandValue$split6 = _slicedToArray(_commandValue$split5, 2),
      statePropName = _commandValue$split6[0],
      elementPropName = _commandValue$split6[1];
    var _this$getState = this.getState(statePropName, true),
      _this$getState2 = _slicedToArray(_this$getState, 2),
      _ = _this$getState2[0],
      stateObject = _this$getState2[1];
    if (!stateObject) {
      console.warn("State property ".concat(statePropName, " not found for bindProp command!"));
      return;
    }
    this[elementPropName] = stateObject[statePropName];
  }
};
;// ./src/shared/parse_utils.js
function parse_utils_toConsumableArray(r) { return parse_utils_arrayWithoutHoles(r) || parse_utils_iterableToArray(r) || parse_utils_unsupportedIterableToArray(r) || parse_utils_nonIterableSpread(); }
function parse_utils_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function parse_utils_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return parse_utils_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? parse_utils_arrayLikeToArray(r, a) : void 0; } }
function parse_utils_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function parse_utils_arrayWithoutHoles(r) { if (Array.isArray(r)) return parse_utils_arrayLikeToArray(r); }
function parse_utils_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/* Possible expression:
 * literal: straight state prop,.
 * negation: !something (not something)
 * equality: is_something:equalityValue
 * ternary: somethingIsTruthy?returnThis:[elseThis]
 */
function parseStateExpression(expression) {
  if (expression.indexOf('!') === 0) {
    return ["negation", expression.substring(1)];
  }
  var charIndex = 0;
  var parsed = expression[charIndex];
  var _char;
  while (charIndex++ < expression.length) {
    _char = expression[charIndex];
    if (charIndex == 3 && parsed == "is_") {
      return ["equality"].concat(parse_utils_toConsumableArray(expression.substring(3).split(':')));
    }
    if (_char === '?') {
      return ["ternary", parsed].concat(parse_utils_toConsumableArray(expression.substring(charIndex + 1).split(':')));
    }
    parsed += _char;
  }
  return ["literal", expression];
}
function fromAttributeValue(value) {
  if (value === '') return true;
  if (value === null) return false;
  return value;
}
function toAttributeValue(value) {
  if (value === true) return '';
  if (value === false) return null;
  return value;
}
;// ./src/core/ReactiveElement.js
function ReactiveElement_typeof(o) { "@babel/helpers - typeof"; return ReactiveElement_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ReactiveElement_typeof(o); }
function ReactiveElement_toConsumableArray(r) { return ReactiveElement_arrayWithoutHoles(r) || ReactiveElement_iterableToArray(r) || ReactiveElement_unsupportedIterableToArray(r) || ReactiveElement_nonIterableSpread(); }
function ReactiveElement_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function ReactiveElement_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function ReactiveElement_arrayWithoutHoles(r) { if (Array.isArray(r)) return ReactiveElement_arrayLikeToArray(r); }
function ReactiveElement_slicedToArray(r, e) { return ReactiveElement_arrayWithHoles(r) || ReactiveElement_iterableToArrayLimit(r, e) || ReactiveElement_unsupportedIterableToArray(r, e) || ReactiveElement_nonIterableRest(); }
function ReactiveElement_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function ReactiveElement_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function ReactiveElement_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = ReactiveElement_getPrototypeOf(t));); return t; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = ReactiveElement_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function ReactiveElement_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return ReactiveElement_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ReactiveElement_arrayLikeToArray(r, a) : void 0; } }
function ReactiveElement_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ReactiveElement_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function ReactiveElement_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, ReactiveElement_toPropertyKey(o.key), o); } }
function ReactiveElement_createClass(e, r, t) { return r && ReactiveElement_defineProperties(e.prototype, r), t && ReactiveElement_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function ReactiveElement_callSuper(t, o, e) { return o = ReactiveElement_getPrototypeOf(o), ReactiveElement_possibleConstructorReturn(t, ReactiveElement_isNativeReflectConstruct() ? Reflect.construct(o, e || [], ReactiveElement_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function ReactiveElement_possibleConstructorReturn(t, e) { if (e && ("object" == ReactiveElement_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return ReactiveElement_assertThisInitialized(t); }
function ReactiveElement_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function ReactiveElement_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (ReactiveElement_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function ReactiveElement_getPrototypeOf(t) { return ReactiveElement_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, ReactiveElement_getPrototypeOf(t); }
function ReactiveElement_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && ReactiveElement_setPrototypeOf(t, e); }
function ReactiveElement_setPrototypeOf(t, e) { return ReactiveElement_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, ReactiveElement_setPrototypeOf(t, e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = ReactiveElement_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function ReactiveElement_toPropertyKey(t) { var i = ReactiveElement_toPrimitive(t, "string"); return "symbol" == ReactiveElement_typeof(i) ? i : i + ""; }
function ReactiveElement_toPrimitive(t, r) { if ("object" != ReactiveElement_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != ReactiveElement_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }





function isReactiveCustomElement(element) {
  return element && element.isReactiveElement && !element.isNativeElement;
}
function extendElementClassWithReactiveElementClass(elementClass) {
  var appScope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var isInputElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var _wasMounted = /*#__PURE__*/new WeakMap();
  var ReactiveElement = /*#__PURE__*/function (_elementClass) {
    function ReactiveElement() {
      var _this;
      ReactiveElement_classCallCheck(this, ReactiveElement);
      _this = ReactiveElement_callSuper(this, ReactiveElement);
      // Should contain the parent (containing) custom element (a ReactiveCustomElement instance)
      _defineProperty(_this, "host", null);
      // True if connectedCallback was called once
      _classPrivateFieldInitSpec(_this, _wasMounted, false);
      // The name used for the ref property
      _defineProperty(_this, "refName", void 0);
      _this.isReactiveElement = true;
      _this.isNativeElement = true;
      return _this;
    }
    ReactiveElement_inherits(ReactiveElement, _elementClass);
    return ReactiveElement_createClass(ReactiveElement, [{
      key: "activate",
      value: function activate() {
        var _this2 = this;
        var commands = [];
        var attributeNames = this.getAttributeNames();
        var _iterator = _createForOfIteratorHelper(attributeNames),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var attrName = _step.value;
            var attrValue = this.getAttribute(attrName);
            // This also resolves "State attributes"
            this.initialSetAttribute(attrName, attrValue);

            // Save "Command attributes"
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
          var _COMMAND_ATTRIBUTES$c, _appScope$appCommands;
          var command = _ref.command,
            args = _ref.args;
          (_COMMAND_ATTRIBUTES$c = COMMANDS[command]) === null || _COMMAND_ATTRIBUTES$c === void 0 || _COMMAND_ATTRIBUTES$c.call(_this2, args);
          // Run custom commands
          (_appScope$appCommands = appScope.appCommands) === null || _appScope$appCommands === void 0 || (_appScope$appCommands = _appScope$appCommands[command]) === null || _appScope$appCommands === void 0 || _appScope$appCommands.call(_this2, args);
        });
        this.isActive = true;
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
          if (this.host.isActive) this.activate();else {
            this.host.addEventListener("active", function () {
              return _this3.activate();
            }, {
              once: true
            });
          }
        } else {
          this.activate();
        }
        _classPrivateFieldSet(_wasMounted, this, true);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this$host;
        var host = (_this$host = this.host) !== null && _this$host !== void 0 ? _this$host : this;
        if (host.ref) {
          delete host.ref[this.refName];
        }
      }

      // This is for when using moveBefore for detaching and reattaching DOM
      // We considered using it - but it is not widely supported,
      // and you have to move it to another DOM for it to work correctly
      // connectedMoveCallback() {}
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (!this.isConnected) return;

        // Important: this.host can be NULL here, as this can be called before connectedCallback!
        // It is called before it, when you append the element to the host shadow DOM.
        // but we can still access the host using getRootNode().host;
        var host = this.isNativeElement ? this.host || this.getRootNode().host : this;
        if (attributeName === "ref") {
          var refValue = newValue;
          host.ref[refValue] = this;
          this.refName = refValue;
        } else if (newValue && newValue.indexOf('@') === 0) {
          bindPropAttribute.call(this, attributeName, newValue);
        }
      }

      // Gets state value of stateProp,
      // tries to resolve from local state(s) first, up the "state tree",
      // and then from global. If the second argument is true: 
      // returns both the state value and the state object
      // else return just the state value
    }, {
      key: "getState",
      value: function getState(stateProp) {
        var returnStateObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var theState;
        // If this is a reactive element inside a reactive web component - the host should be the containing web component - 
        // we should reference its state, if host is null - it is most likely the host web component
        var elementInstance = this.isNativeElement && this.host ? this.host : this;
        var stateVal,
          stateFound = false;
        if (elementInstance && elementInstance.state && Object.hasOwn(elementInstance.state, stateProp)) {
          stateFound = true;
          theState = elementInstance.state;
          stateVal = theState[stateProp];
        }

        // Go "up the state layers" to try to find the state
        if (!stateFound) {
          while (!stateFound && elementInstance.host) {
            elementInstance = elementInstance.host;
            if (elementInstance && elementInstance.state && Object.hasOwn(elementInstance.state, stateProp)) {
              stateFound = true;
              theState = elementInstance.state;
              stateVal = theState[stateProp];
            }
          }
        }
        if (!stateFound) {
          // Try the global state
          var globalState = appScope[GLOBAL_STATE_FUNCTION_NAME]();
          if (globalState && Object.hasOwn(globalState, stateProp)) {
            stateFound = true;
            theState = globalState;
            stateVal = theState[stateProp];
          }
        }
        if (!stateFound) {
          stateVal = undefined;
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
        return Object.hasOwn(host.ref, refName) ? host.ref[refName] : root.querySelector("[ref=\"".concat(refName, "\"]"));
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

        // "State attribute"
        if (isStateAttribute(attributeName) && this.isConnected) {
          var stateProp = attributeValue;
          setStateAttribute.call(this, attributeName.substring(1), stateProp);
        }
        // normal attribute
        else {
          setAttribute.call(this, attributeName, valueToSet);
        }
      }
    }]);
  }(elementClass);
  _defineProperty(ReactiveElement, "observedAttributes", ["ref"].concat(Object.keys(COMMANDS).map(function (command) {
    return '_' + command.toLowerCase();
  })));
  if (!isInputElement) return ReactiveElement;else {
    var _changeEventHandler = /*#__PURE__*/new WeakMap();
    var ReactiveInputElement = /*#__PURE__*/function (_ReactiveElement2) {
      function ReactiveInputElement() {
        var _this4;
        ReactiveElement_classCallCheck(this, ReactiveInputElement);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this4 = ReactiveElement_callSuper(this, ReactiveInputElement, [].concat(args));
        // Used for the _bind command, which allows "reverse-binding" attribute values to state props,
        // keys are attribute names, values are state prop names
        _defineProperty(_this4, "boundAttributesToState", new Map());
        _classPrivateFieldInitSpec(_this4, _changeEventHandler, void 0);
        return _this4;
      }
      ReactiveElement_inherits(ReactiveInputElement, _ReactiveElement2);
      return ReactiveElement_createClass(ReactiveInputElement, [{
        key: "bindAttributeToState",
        value: function bindAttributeToState(attributeName, statePropName) {
          this.boundAttributesToState.set(attributeName, statePropName);
        }
      }, {
        key: "updateStateFromAttribute",
        value: function updateStateFromAttribute(attributeName) {
          var newValue = fromAttributeValue(this.getAttribute(attributeName));
          var stateProp = this.boundAttributesToState.get(attributeName);
          var _this$getState = this.getState(stateProp, true),
            _this$getState2 = ReactiveElement_slicedToArray(_this$getState, 2),
            stateValue = _this$getState2[0],
            theState = _this$getState2[1];
          if (stateValue === Symbol["for"](SYMBOL_NAMES.STATE_NOT_FOUND)) {
            throw Error("updateStateFromAttribute: State property ".concat(stateProp, " not found"));
          }
          if (stateValue !== newValue) {
            theState[stateProp] = newValue;
          }
        }
      }, {
        key: "activate",
        value: function activate() {
          _get(ReactiveElement_getPrototypeOf(ReactiveInputElement.prototype), "activate", this).call(this);
          _classPrivateFieldSet(_changeEventHandler, this, function () {
            var changeEvent = new Event('inputChange', {
              bubbles: true,
              composed: true
            });
            // Because of bubbling, the handler can trigger on non-input elements as well
            if (this.type === "checkbox") {
              var stateManager = this.host.state._stateManager;
              // This is a map where keys are elements, and values are "checked" State attribute nodes
              var checkedStateAttributeNodesMap = stateManager.nodeManager.bindableAttributesStateNodes.get("checked");
              var checkedAttributeNode = null;
              if (checkedStateAttributeNodesMap.has(this)) {
                checkedAttributeNode = checkedStateAttributeNodesMap.get(this);
              }
              if (this.checked) {
                if (!checkedAttributeNode) checkedAttributeNode = document.createAttribute("checked");
                this.setAttributeNode(checkedAttributeNode);
              } else {
                if (!checkedAttributeNode) checkedAttributeNode = this.getAttributeNode("checked");
                if (checkedAttributeNode) this.removeAttributeNode(checkedAttributeNode);
              }
            }
            this.dispatchEvent(changeEvent);
          });
          /*
          this.#inputEventHandler = function() {
              const changeEvent = new Event('inputChange', { bubbles: true, composed: true });
              // Because of bubbling, the handler can trigger on non-input elements as well
              if (this.tagName === "INPUT") {
                  if (this.type === "text") {
                      const stateManager = this.host.state._stateManager;
                      // This is a map where keys are elements, and values are "checked" State attribute nodes
                      const valueStateAttributeNodesMap = stateManager.nodeManager.bindableAttributesStateNodes.get("value");
                      let valueAttributeNode = null;
                      if (valueStateAttributeNodesMap.has(this)) {
                          valueAttributeNode = StateAttributeNodesMap.get(this);
                      }
                      if (this.checked) {
                          if (!checkedAttributeNode) checkedAttributeNode = document.createAttribute("checked");
                          this.setAttributeNode(checkedAttributeNode);
                      }
                      else {
                          if (!checkedAttributeNode) checkedAttributeNode = this.getAttributeNode("checked");
                          if (checkedAttributeNode) this.removeAttributeNode(checkedAttributeNode);
                      }
                  }
              }
              this.dispatchEvent(changeEvent);
          }
          */
          // Change events does not automatically bubble, we need to listen and bubble up a new event
          this.addEventListener('change', _classPrivateFieldGet(_changeEventHandler, this), false);
          /*
          if (Object.hasOwn(this.boundNativePropertiesToState, "value")) {
              this.#inputEventHandler = function() {
                  const inputEvent = new Event('inputValue', { bubbles: true, composed: true });
                  if (Object.hasOwn(this.boundNativePropertiesToState, "value")) {
                      this.updateStateFromNativeProperty("value");
                  }
                  this.dispatchEvent(inputEvent);
              }
              this.addEventListener('input', this.#inputEventHandler, false);
          }
          */

          /*
          switch (this.type) {
              case "text": {
                  this.#inputValueSetter = Object.getOwnPropertyDescriptor(appScope.window.HTMLInputElement.prototype, "value").set;
                  break;
              }
              case "checkbox": {
                  this.#inputCheckedSetter = Object.getOwnPropertyDescriptor(appScope.window.HTMLInputElement.prototype, "checked").set;
                  break;
              }
          }
          */
        }
      }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {
          _get(ReactiveElement_getPrototypeOf(ReactiveInputElement.prototype), "disconnectedCallback", this).call(this);
          if (_classPrivateFieldGet(_changeEventHandler, this)) this.removeEventListener("change", _classPrivateFieldGet(_changeEventHandler, this));
          this.dispatchEvent("disconnected", {
            bubbles: true
          });
          // if (this.#inputEventHandler)  removeEventListener("input", this.#inputEventHandler);
          this.boundAttributesToState.clear();
        }
      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback(attributeName, oldValue, newValue) {
          if (attributeName.indexOf(':') === 0) {
            console.warn("State attributes should never be changed explicitely!");
            return false;
          }
          _get(ReactiveElement_getPrototypeOf(ReactiveInputElement.prototype), "attributeChangedCallback", this).apply(this, arguments);
          // These are attributes which their value should automatically 
          // change on a property as well
          if (AUTO_ATTRIBUTES_TO_PROPS.has(attributeName)) {
            var newPropValue = fromAttributeValue(newValue);
            if (this[attributeName] !== newPropValue) {
              this[attributeName] = newPropValue;
            }
          }
          if (this.boundAttributesToState.has(attributeName)) {
            this.updateStateFromAttribute(attributeName);
          }
        }
      }]);
    }(ReactiveElement);
    // #inputEventHandler;
    _defineProperty(ReactiveInputElement, "observedAttributes", ReactiveElement.observedAttributes.concat(ReactiveElement_toConsumableArray(SUPPORTED_ATTRIBUTES_FOR_BINDING)));
    return ReactiveInputElement;
  }
}
;// ./src/core/DOM_utils.js

function isElementAList(element) {
  return element.tagName === "OL" || element.tagName === "UL";
}
function isElementAListItem(element) {
  return element.tagName === "LI";
}
function getCustomElementFromMappedElement(element) {
  if (isReactiveCustomElement(element)) return element;
  if (isReactiveCustomElement(element.firstElementChild)) return element.firstElementChild;
}
;// ./src/shared/paint_utils.js
function paint_utils_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = paint_utils_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function paint_utils_slicedToArray(r, e) { return paint_utils_arrayWithHoles(r) || paint_utils_iterableToArrayLimit(r, e) || paint_utils_unsupportedIterableToArray(r, e) || paint_utils_nonIterableRest(); }
function paint_utils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function paint_utils_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function paint_utils_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function paint_utils_toConsumableArray(r) { return paint_utils_arrayWithoutHoles(r) || paint_utils_iterableToArray(r) || paint_utils_unsupportedIterableToArray(r) || paint_utils_nonIterableSpread(); }
function paint_utils_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function paint_utils_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return paint_utils_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? paint_utils_arrayLikeToArray(r, a) : void 0; } }
function paint_utils_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function paint_utils_arrayWithoutHoles(r) { if (Array.isArray(r)) return paint_utils_arrayLikeToArray(r); }
function paint_utils_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var nodeActionsMap = NODES_STATE.nodeActionsMap;
var pendingPaintNodeManagers = NODES_STATE.pendingPaintNodeManagers;

// Maps "TYPE" strings to rAF ids
// TYPE is the type of task the functions handle,
// we only save for each type the rAF ID - 
// because we only use it to cancel the rAF -
// and request a new one, in case the old one hasn't run yet (debounce)
var rafIds = new Map();
function queueAnimationFrame(functionsToRun, type, afterRunFn) {
  var rafId;
  if (rafIds.has(type)) {
    rafId = rafIds.get(type);
    cancelAnimationFrame(rafId);
  }
  if (functionsToRun.length < MAX_OPERATIONS_PER_ANIMATION_FRAME) {
    rafId = requestAnimationFrame(function () {
      rafIds["delete"](type);
      functionsToRun.forEach(function (fn) {
        return fn();
      });
      if (afterRunFn) afterRunFn();
    });
    rafIds.set(type, rafId);
  } else {
    var runNextBatch = function runNextBatch() {
      var functionsBatch = functions.slice(functionsIndex, functionsIndex + MAX_OPERATIONS_PER_ANIMATION_FRAME);
      functionsBatch.forEach(function (fn) {
        return fn();
      });
      functionsIndex += MAX_OPERATIONS_PER_ANIMATION_FRAME;
      if (functionsIndex < functions.length) requestAnimationFrame(runNextBatch);
    };
    rafIds["delete"](type);
    var functions = paint_utils_toConsumableArray(functionsToRun);
    var functionsIndex = 0;
    requestAnimationFrame(runNextBatch);
  }
}
var paintRafId = NODES_STATE.paintRafId,
  eventBindingFunctions = NODES_STATE.eventBindingFunctions,
  stateActivates = NODES_STATE.stateActivates,
  conditionalRenders = NODES_STATE.conditionalRenders;
function queueBindEvents(element, bindFunction) {
  eventBindingFunctions.set(element, bindFunction);
  queueAnimationFrame(Array.from(eventBindingFunctions.values()), "EVENTS_BIND", function () {
    return eventBindingFunctions.clear();
  });
}
function queueConditionalRender(element, renderFunction) {
  conditionalRenders.set(element, renderFunction);
  queueAnimationFrame(Array.from(conditionalRenders.values()), "CONDITIONAL_RENDER", function () {
    return conditionalRenders.clear();
  });
}
function paint_utils_queuePaint() {
  if (paintRafId) cancelAnimationFrame(paintRafId);
  paintRafId = requestAnimationFrame(function () {
    paintRafId = null;
    doUpdateDOM();
  });
}

// For debugging purposes
function logNodeActions() {
  paint_utils_toConsumableArray(nodeActionsMap.entries()).map(function (_ref) {
    var _ref2 = paint_utils_slicedToArray(_ref, 2),
      node = _ref2[0],
      actions = _ref2[1];
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        {
          console.log("Actions for", node);
          var appendElements = paint_utils_toConsumableArray(actions.append.values());
          if (appendElements.length) {
            console.log("Append", appendElements);
          }
          var setProperty = paint_utils_toConsumableArray(actions.setProperty.entries());
          if (replaceElements.length) {
            console.log("Set property", setProperty);
          }
          console.log("Reattach? ", actions.reattach);
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

// actions are DOM API functions
/*
function runDOMActions(actions, max=1000) {
    const runActions = actions.splice(0, max);
    runActions.forEach(action=> action());
}
*/
function runDOMActions(actions) {
  actions.forEach(function (action) {
    return action();
  });
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

function doUpdateDOM(pendingNodeManagers) {
  var _iterator = paint_utils_createForOfIteratorHelper(pendingPaintNodeManagers),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var nodeManager = _step.value;
      console.log("Running DOM updates for", nodeManager);
      var start = performance.now();
      var frameElapsed = 0;
      var _nodeManager$resolveT = nodeManager.resolveToDOMActions(),
        _nodeManager$resolveT2 = paint_utils_slicedToArray(_nodeManager$resolveT, 5),
        attributeActions = _nodeManager$resolveT2[0],
        textActions = _nodeManager$resolveT2[1],
        propertySetActions = _nodeManager$resolveT2[2],
        elementActions = _nodeManager$resolveT2[3],
        reattachActions = _nodeManager$resolveT2[4];
      console.log("Running reattach");
      runDOMActions(reattachActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.REATTACH_ACTIONS));
      frameElapsed = performance.now() - start;
      console.log("took: ", frameElapsed);
      if (frameElapsed > FRAME_BUDGET) {
        return requestAnimationFrame(function () {
          return doUpdateDOM();
        });
      }
      console.log("Running elements");
      runDOMActions(elementActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.ELEMENT_ACTIONS));
      frameElapsed = performance.now() - start;
      if (frameElapsed > FRAME_BUDGET) {
        return requestAnimationFrame(function () {
          return doUpdateDOM();
        });
      }
      console.log("took: ", frameElapsed);
      console.log("Running attributes");
      runDOMActions(attributeActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.ATTRIBUTE_ACTIONS));
      frameElapsed = performance.now() - start;
      if (frameElapsed > FRAME_BUDGET) {
        return requestAnimationFrame(function () {
          return doUpdateDOM();
        });
      }
      console.log("Running text");
      runDOMActions(textActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.TEXT_ACTIONS));
      frameElapsed = performance.now() - start;
      if (frameElapsed > FRAME_BUDGET) {
        return requestAnimationFrame(function () {
          return doUpdateDOM();
        });
      }
      runDOMActions(propertySetActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.PROPERTY_ACTIONS));
      frameElapsed = performance.now() - start;
      if (frameElapsed > FRAME_BUDGET) {
        return requestAnimationFrame(function () {
          return doUpdateDOM();
        });
      }
      if (attributeActions.length || textActions.length || propertySetActions.length || elementActions.length || reattachActions.length) {
        return requestAnimationFrame(function () {
          return doUpdateDOM();
        });
      }
      nodeManager.paintStatus = null;
      pendingPaintNodeManagers["delete"](nodeManager);
      console.log("Took ", performance.now() - start);
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
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
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
;// ./src/core/StateMapArray.js
function getStateMapArrayIterator(stateMapArray) {
  return {
    index: -1,
    next: function next() {
      if (this.index === stateMapArray.length) {
        return {
          value: null,
          done: true
        };
      }
      var item = stateMapArray[++this.index];
      if (!item) return {
        value: null,
        done: true
      };
      if (Object.hasOwn(item, 'state')) item = item.state;
      return {
        value: item,
        done: false
      };
    },
    getFrom: function getFrom(index) {
      if (index === stateMapArray.length) {
        return {
          value: null,
          done: true
        };
      }
      var item = stateMapArray[index];
      if (Object.hasOwn(item, 'state')) item = item.state;
      return {
        value: item,
        done: false
      };
    },
    reset: function reset() {
      this.index = -1;
    }
  };
}
;// ./src/core/node_actions.js
function node_actions_typeof(o) { "@babel/helpers - typeof"; return node_actions_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, node_actions_typeof(o); }
function node_actions_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = node_actions_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function node_actions_slicedToArray(r, e) { return node_actions_arrayWithHoles(r) || node_actions_iterableToArrayLimit(r, e) || node_actions_unsupportedIterableToArray(r, e) || node_actions_nonIterableRest(); }
function node_actions_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function node_actions_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function node_actions_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function node_actions_toConsumableArray(r) { return node_actions_arrayWithoutHoles(r) || node_actions_iterableToArray(r) || node_actions_unsupportedIterableToArray(r) || node_actions_nonIterableSpread(); }
function node_actions_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function node_actions_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return node_actions_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? node_actions_arrayLikeToArray(r, a) : void 0; } }
function node_actions_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function node_actions_arrayWithoutHoles(r) { if (Array.isArray(r)) return node_actions_arrayLikeToArray(r); }
function node_actions_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }





var node_actions_nodeActionsMap = NODES_STATE.nodeActionsMap;
var node_actions_pendingPaintNodeManagers = NODES_STATE.pendingPaintNodeManagers;
function getNodeActionsForNode(node) {
  if (!node_actions_nodeActionsMap.has(node)) node_actions_nodeActionsMap.set(node, getNewNodeActionsObject(node.nodeType));
  var nodeActions = node_actions_nodeActionsMap.get(node);
  return nodeActions;
}
function setStateNodeValueAction(nodeManager, node, value) {
  if (node.nodeType === Node.ATTRIBUTE_NODE) {
    nodeManager.addNodeAction(node, {
      actionType: "setAttribute",
      actionValue: value
    });
  } else if (node.nodeType === Node.TEXT_NODE) {
    nodeManager.addNodeAction(node, {
      actionType: "textContent",
      actionValue: value
    });
  }
}

// stateIdentifier can be a State object (for state maps),
// or a State property (for conditionally rendered elements)
function addAppendAction(nodeActions, nodeToAppend) {
  nodeActions.append.add(nodeToAppend);
}

// For a "detached" node - set it to reattach back to its parent
// As of May 2025 - this is implemented using display: none, and then changing back to the original display
function setReattachAction(node) {
  var nodeActions = getNodeActionsForNode(node);
  nodeActions.reattach = true;
}

// This is an object used to represent pending node actions,
// that are batched and executed in reflows (requestAnimationFrame)
function getNewNodeActionsObject(nodeType) {
  switch (nodeType) {
    case Node.ATTRIBUTE_NODE:
      {
        return {
          setAttribute: undefined
        };
      }
    case Node.TEXT_NODE:
      {
        return {
          textContent: undefined
        };
      }
    case Node.ELEMENT_NODE:
      {
        return {
          // Nodes to append to the end of node's children, 
          append: new Set(),
          // A single operation, reattach to original parent element, after detachment, if true
          reattach: false,
          // Set values for native properties (this is here, because it can be related to rendering, e.g. checked, value)
          setProperty: new Map(),
          get hasPendingActions() {
            return this.append.size || this.reattach || this.setProperty.size;
          }
        };
      }
  }
}
function reconcileStateMapElement(stateMapArray, customElementName, parentElement, stateManager) {
  // If needed - the parent element will be detached,
  // so DOM changes to it will not be made on the main tree,
  // It will be reattached back reshaped, as a deferred functions (like all other DOM functions)
  var detachedParentElement = null;
  var mappedElementChange = false;
  var isParentList = isElementAList(parentElement);

  // A whole new array
  if (stateMapArray.isNewArray) {
    if (stateMapArray.length) {
      var _detachedParentElemen;
      mappedElementChange = true;
      detachedParentElement = parentElement.detach();
      var wrapInElement = isParentList ? "li" : undefined;
      var elements = mapStateArrayToElements(stateMapArray, customElementName, wrapInElement, detachedParentElement);
      detachedParentElement.innerHTML = '';
      (_detachedParentElemen = detachedParentElement).append.apply(_detachedParentElemen, node_actions_toConsumableArray(elements));
    }
  } else {
    // Last array method called is saved
    if (stateMapArray.lastOperation) {
      mappedElementChange = true;
      if (!detachedParentElement) detachedParentElement = parentElement.detach();
      var children = detachedParentElement.children;
      var _stateMapArray$lastOp = node_actions_slicedToArray(stateMapArray.lastOperation, 2),
        operation = _stateMapArray$lastOp[0],
        args = _stateMapArray$lastOp[1];
      switch (operation) {
        case "shift":
          {
            detachedParentElement.removeChild(detachedParentElement.firstElementChild);
            break;
          }
        case "unshift":
          {
            // arg1 represents the number of elements prepended
            // The elements prepended are already at the start of the State Array
            var prependLength = args[0];
            for (var i = 0; i < prependLength; i++) {
              var stateItem = stateMapArray[i];
              var newChild = stateToElement(stateItem, customElementName, isParentList ? "li" : undefined, detachedParentElement);
              detachedParentElement.prepend(newChild);
            }
            break;
          }
        case "pop":
          {
            detachedParentElement.removeChild(detachedParentElement.lastElementChild);
            break;
          }
        case "push":
          {
            var startIndex = args[0];
            for (var _i = startIndex, len = stateMapArray.length; _i < len; _i++) {
              var _stateItem = stateMapArray[_i];
              var _newChild = stateToElement(_stateItem, customElementName, isParentList ? "li" : undefined, detachedParentElement);
              detachedParentElement.appendChild(_newChild);
            }
            break;
          }

        // Delete arg2 items from arg1,
        // arg3 can be an array of items, to replace from index arg1
        case "splice":
          {
            var _len = children.length;
            var _startIndex = args[0] < 0 ? Math.max(_len + args[0], 0) : Math.min(args[0], _len);
            var deleteCount;
            if (typeof args[1] === "undefined" || args[1] === Infinity) {
              deleteCount = _len - _startIndex;
            } else if (args[1] < 0) {
              deleteCount = 0;
            } else {
              deleteCount = Math.min(args[1], _len - _startIndex);
            }
            // Delete
            for (var _i2 = _startIndex, _len2 = _startIndex + deleteCount; _i2 < _len2; _i2++) {
              detachedParentElement.removeChild(children[_i2]);
            }

            // Replace
            if (args[2]) {
              var currentIndex = _startIndex;
              var items = args[2];
              var _iterator = node_actions_createForOfIteratorHelper(items),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var item = _step.value;
                  var _stateItem2 = item;
                  var _newChild2 = stateToElement(_stateItem2, customElementName, isParentList ? "li" : undefined, detachedParentElement);
                  if (currentIndex < _len) children[currentIndex].replaceWith(_newChild2);else detachedParentElement.appendChild(_newChild2);
                  currentIndex++;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }
            break;
          }
        case "slice":
          {
            var _startIndex2 = args[0],
              endIndex = args[1];
            var _i3;
            for (_i3 = 0; _i3 < _startIndex2; _i3++) {
              detachedParentElement.removeChild(children[_i3]);
            }
            for (_i3 = endIndex; _i3 < children.length; _i3++) {
              detachedParentElement.removeChild(children[_i3]);
            }
            break;
          }
      }
    } else {
      // "Normal" state map operation
      var parentKeyMap = parentElement === null || parentElement === void 0 ? void 0 : parentElement.keyMap;
      var stateKeyMap = stateMapArray === null || stateMapArray === void 0 ? void 0 : stateMapArray.keyMap;
      var stateMapIter = getStateMapArrayIterator(stateMapArray);
      var stateMapItem = stateMapIter.next().value;
      var child = parentElement.firstElementChild;
      while (child) {
        var _stateMapItem;
        // We MUST save a reference first thing. Before doing any mutation!
        var nextElementChild = child.nextElementSibling;
        var childStateItem = isParentList ? child.firstElementChild.state : child.state;
        // Child can be still not active here - then it won't have state yet. Use the element property (saved during _map) 
        var childStateKey = childStateItem ? childStateItem.key : child.stateKey;
        // At this point stateMapItem can be undefined (e.g. when you remove the last item,
        // there's one extra iteration because the child is still there)
        var stateMapKey = (_stateMapItem = stateMapItem) === null || _stateMapItem === void 0 ? void 0 : _stateMapItem.key;
        if (childStateKey === stateMapKey) {
          stateMapItem = stateMapIter.next().value;
        } else {
          // [1,2,3] => [1,3,2] 
          // [1,2,3] => [1,3]
          mappedElementChange = true;
          if (!detachedParentElement) detachedParentElement = parentElement.detach();

          // REPLACE: where the current element exist elsewhere in the updated state
          // AND the element that SHOULD be here per the new state ALSO exists in the children list of the parent element
          if (stateKeyMap.has(childStateKey) && parentKeyMap.has(stateMapKey)) {
            var element = parentKeyMap.get(stateMapKey);
            detachedParentElement.replaceChildWith(child, element);
          } else {
            // REMOVE: This element does NOT exist in the updated state at all - drop it
            detachedParentElement.removeChild(child);
          }
        }
        child = nextElementChild;
      }
    }
  }
  var numChildren = detachedParentElement ? detachedParentElement.children.length : parentElement.children.length;
  if (stateMapArray.length > numChildren) {
    mappedElementChange = true;
    if (!detachedParentElement) detachedParentElement = parentElement.detach();
    for (var index = detachedParentElement.children.length; index < stateMapArray.length; index++) {
      var state_Item = stateMapArray[index];
      var _newChild3 = stateToElement(state_Item, customElementName, isParentList ? "li" : undefined, detachedParentElement);
      detachedParentElement.appendChild(_newChild3);
    }
  }
  if (mappedElementChange) {
    stateManager.nodeManager.addNodeAction(detachedParentElement, {
      actionType: "reattach",
      actionValue: true
    });
  }
}

// This *updates*/*"fills"* the nodeActionsMap!
function generateStateNodeActions(stateManager, stateProp, newValue) {
  var _this = this;
  var value = newValue; //stateManager.state[stateProp];
  if (stateProp === "todosFiltered") {
    performance.mark("todo-generate-node-actions");
  }
  var stateNodes = stateManager.nodeManager.stateNodes[stateProp];
  // This is a map, where keys are "parent elements" containing 
  // custom element instanced created from a state array ("state map").
  // The values are the custom element name. 
  // The actual array of state objects is in state[stateProp]
  var stateMapElements = stateManager.stateArrayMaps[stateProp];
  var conditionallyRenderingElements = stateManager.nodeManager.conditionallyRenderingElements[stateProp];

  // Note, since the value change is handled by a custom setter - that setter checks if the set value is the same - 
  // if it is - it won't call , and it won't reach here.
  if (stateNodes) {
    stateNodes.forEach(function (node) {
      setStateNodeValueAction(stateManager.nodeManager, node, value);
    });
  }
  if (stateMapElements) {
    // An array of State objects, 
    // each equalivent to a custom element created "from" it
    var stateMapArray = value;
    stateMapElements.forEach(function (customElementName, parentElement) {
      reconcileStateMapElement(stateMapArray, customElementName, parentElement, stateManager);
    });
    // stateMapArray.lastOperation = null;
  }
  if (conditionallyRenderingElements) {
    conditionallyRenderingElements.forEach(function (element) {
      queueConditionalRender(_this, element.render.bind(_this));
    });
  }
  if (stateManager.nodeManager.paintStatus === "pending") {
    stateManager.nodeManager.queuePaint();
  }
  /*
  // If there are Node Actions (which translates to DOM actions), queue repaint
  if (nodeActionsMap.size) {
      queuePaint();
  }
  */
}

// Translates/maps Node Actions to actual DOM operations
function resolveNodeActionsMapToDOMActions(nodeActionsMap) {
  var attributeActions = [];
  var textActions = [];
  var elementActions = [];
  var reattachActions = [];
  var propertySetActions = [];
  nodeActionsMap.forEach(function (nodeActions, node) {
    switch (node.nodeType) {
      case Node.ATTRIBUTE_NODE:
        {
          var value = nodeActions.setAttribute;
          var typeOfValue = node_actions_typeof(value);
          if (typeOfValue !== 'undefined') {
            if (typeOfValue === "boolean") {
              if (!node.hasOwnProperty("originalOwnerElement")) {
                throw Error("originalOwnerElement not found on boolean attribute node! Should never happen!");
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
              if (typeOfValue === "string" && node.nodeValue !== value) {
                attributeActions.push(function () {
                  return node.nodeValue = value;
                });
              }
            }
          }
          break;
        }
      case Node.TEXT_NODE:
        {
          if (nodeActions.textContent !== undefined) {
            var _value = String(nodeActions.textContent);
            if (node.nodeValue !== _value) {
              textActions.push(function () {
                return node.nodeValue = _value;
              });
            }
          }
          break;
        }
      case Node.ELEMENT_NODE:
        {
          // Append
          var _iterator2 = node_actions_createForOfIteratorHelper(nodeActions.append.values()),
            _step2;
          try {
            var _loop = function _loop() {
              var newChildElement = _step2.value;
              elementActions.push(function () {
                return node.appendChild(newChildElement);
              });
            };
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              _loop();
            }

            // setProperty
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          var _iterator3 = node_actions_createForOfIteratorHelper(nodeActions.setProperty),
            _step3;
          try {
            var _loop2 = function _loop2() {
              var _step3$value = node_actions_slicedToArray(_step3.value, 2),
                key = _step3$value[0],
                value = _step3$value[1];
              if (node[key] !== value) {
                propertySetActions.push(function () {
                  return node[key] = value;
                });
              }
            };
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              _loop2();
            }
            // Reattach
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          if (nodeActions.reattach) {
            var _node$pendingKeyMapAc;
            reattachActions.push(function () {
              return node.reattach();
            });
            if (node !== null && node !== void 0 && (_node$pendingKeyMapAc = node.pendingKeyMapActions) !== null && _node$pendingKeyMapAc !== void 0 && _node$pendingKeyMapAc.size) {
              reattachActions.push(function () {
                var _iterator4 = node_actions_createForOfIteratorHelper(node.pendingKeyMapActions),
                  _step4;
                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    var keyMapAction = _step4.value;
                    keyMapAction();
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
                node.pendingKeyMapActions.clear();
              });
            }
            nodeActions.reattach = false;
          }
        }
        break;
    }
  });
  return [attributeActions, textActions, propertySetActions, elementActions, reattachActions];
}
;// ./src/shared/prop_utils.js
// Sets an internal read-only property. "hidden" (non-enumerable) by default
function setHiddenProperty(obj, propName, propValue) {
  var enumerable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  Object.defineProperty(obj, propName, {
    value: propValue,
    configurable: false,
    writable: true,
    enumerable: enumerable
  });
}
;// ./src/shared/state_utils.js
function state_utils_typeof(o) { "@babel/helpers - typeof"; return state_utils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, state_utils_typeof(o); }
function state_utils_slicedToArray(r, e) { return state_utils_arrayWithHoles(r) || state_utils_iterableToArrayLimit(r, e) || state_utils_unsupportedIterableToArray(r, e) || state_utils_nonIterableRest(); }
function state_utils_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _toArray(r) { return state_utils_arrayWithHoles(r) || state_utils_iterableToArray(r) || state_utils_unsupportedIterableToArray(r) || state_utils_nonIterableRest(); }
function state_utils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function state_utils_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return state_utils_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? state_utils_arrayLikeToArray(r, a) : void 0; } }
function state_utils_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function state_utils_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
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
  if (isBooleanAttribute(attrName)) {
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
var setStateAttribute = function setStateAttribute(attrName, statePropExpression) {
  var _parseStateExpression = parseStateExpression(statePropExpression),
    _parseStateExpression2 = _toArray(_parseStateExpression),
    type = _parseStateExpression2[0],
    args = _parseStateExpression2.slice(1);
  var stateProp = args[0];
  var _this$getState = this.getState(stateProp, true),
    _this$getState2 = state_utils_slicedToArray(_this$getState, 2),
    stateVal = _this$getState2[0],
    theState = _this$getState2[1];
  if (stateVal === Symbol["for"](SYMBOL_NAMES.STATE_NOT_FOUND)) {
    console.warn("State value for ".concat(stateProp, " is undefined. State values should never be undefined."));
    return;
  }
  if (!theState) {
    console.warn("No State object with state prop: " + stateProp);
    return;
  }
  var stateManager = theState._stateManager;
  var valueToSet = type === "literal" ? stateVal : stateManager.bindStatePropExpression(statePropExpression, type, args);
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
  if (typeof valueToSet === "boolean") {
    // A boolean attribute value should ALWAYS be an empty string,
    // the value itself never changes, it is removed fron the element if false, 
    // and added if true
    stateAttrNode.nodeValue = "";
  }
  stateManager.addStateNode(statePropExpression, stateAttrNode);

  // Adds the attribute to the element
  if (valueToSet !== false) {
    this.setAttributeNode(stateAttrNode);
  }
  this.addEventListener("disconnected", function () {
    theState._stateManager.removeStateNode(statePropExpression, stateAttrNode);
  }, {
    once: true
  });
};
var setStateText = function setStateText(statePropExpression) {
  var _parseStateExpression3 = parseStateExpression(statePropExpression),
    _parseStateExpression4 = _toArray(_parseStateExpression3),
    type = _parseStateExpression4[0],
    args = _parseStateExpression4.slice(1);
  var stateProp = args[0];
  var _this$getState3 = this.getState(stateProp, true),
    _this$getState4 = state_utils_slicedToArray(_this$getState3, 2),
    stateVal = _this$getState4[0],
    theState = _this$getState4[1];
  if (stateVal === Symbol["for"](SYMBOL_NAMES.STATE_NOT_FOUND)) {
    console.warn("State value for ".concat(stateProp, " is undefined. State values should never be undefined."));
    return;
  }
  if (!theState) {
    console.warn("No State object with state prop: " + stateProp);
    return;
  }
  var stateManager = theState._stateManager;
  var valueToSet = type === "literal" ? stateVal : stateManager.bindStatePropExpression(statePropExpression, type, args);
  var textNode = document.createTextNode(valueToSet);
  setHiddenProperty(textNode, "isStateAttribute", true);
  theState._stateManager.addStateNode(statePropExpression, textNode);
  this.appendChild(textNode);
  this.addEventListener("disconnected", function () {
    theState._stateManager.removeStateNode(statePropExpression, textNode);
  }, {
    once: true
  });
};

// Convert a stateObject to a custom element, used in State Map Arrays
function stateToElement(stateObject, elemName, wrapInElement, ownerMapElement) {
  var customElementInstance = document.createElement(elemName);
  customElementInstance.setInitialState(stateObject);
  customElementInstance.ownerMapElement = ownerMapElement;
  var returnElement;
  if (wrapInElement) {
    returnElement = document.createElement(wrapInElement);
    returnElement.appendChild(customElementInstance);
  } else {
    returnElement = customElementInstance;
  }
  return returnElement;
}
function mapStateArrayToElements(stateItems, elemName, wrapInElement, parentElement) {
  // the double underscore '__' skips the "supercharging" of native operations, and just runs it as is
  var mappedElements = stateItems.map(function (stateItem, index) {
    if (Object.hasOwn(stateItem, 'state')) stateItem = stateItem.state;
    if (state_utils_typeof(stateItem) !== 'object') {
      console.warn("item in State array for _map is not an object: ", stateItem);
      return {};
    }
    if (!Object.hasOwn(stateItem, 'key')) {
      console.warn("State object in elements map has no 'key' property. Adding automatically per index. This can have unexpected results on mutations!");
      stateItem.key = index;
    }
    var element = stateToElement(stateItem, elemName, wrapInElement, parentElement);

    // We do this because during state map element reconcilation -
    // there CAN be a situation where a child custom element is NOT active yet,
    // therefor its state won't be accesible yet. (This happened in todo-list-src)
    // So we also save it here so it could use it.
    element.stateKey = stateItem.key;
    return element;
  });
  return mappedElements;
}

// Main function that handles all state changes in a state object
function handleStateChange(stateManager, stateProp, changedValue) {
  var _descrp$get;
  if (isBuiltInStateProp(stateProp)) return;
  // At this point, if the value is taken from state, it should be a getter value
  var newValue = changedValue !== null && changedValue !== void 0 ? changedValue : stateManager.state[stateProp];
  var descrp = Object.getOwnPropertyDescriptor(stateManager.state, stateProp);
  var isGetter = descrp === null || descrp === void 0 || (_descrp$get = descrp.get) === null || _descrp$get === void 0 ? void 0 : _descrp$get.isStateGetter;
  dispatchStateChangEvent(stateManager.state, stateProp, newValue);
  // Populate the next Node Actions to perform
  generateStateNodeActions(stateManager, stateProp, newValue, isGetter);
  // Also handle negation dependencies
  if (!stateProp.startsWith('!')) {
    generateStateNodeActions(stateManager, "!".concat(stateProp), !newValue, isGetter);
  }
}
function handleStateDependency(stateManager, depStateProp) {
  var appScope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  var state = stateManager.state;
  var isSetter = isSetterHook(depStateProp);
  // A "Setter" hook
  if (isSetter) {
    var setterHook = state[depStateProp];
    var setterStateProp = depStateProp.substring(4);
    var hasNewValue = callSetterHook(setterHook, setterStateProp, stateManager, appScope);
    if (hasNewValue) handleStateChange(stateManager, setterStateProp, null, appScope.offscreenContainer);
  } else if (depStateProp.indexOf('.length') > 0) {
    var realProp = depStateProp.split('.')[0];
    var newValue = stateManager.state[realProp].length;
    // depStateProp is `${prop}.length` here
    handleStateChange(stateManager, depStateProp, newValue, appScope.offscreenContainer);
  } else {
    handleStateChange(stateManager, depStateProp, null, appScope.offscreenContainer);
  }
}
function isBuiltInStateProp(stateProp) {
  return BUILT_IN_STATE_PROPS.has(stateProp);
}
function dispatchStateChangEvent(state, property, newValue) {
  var stateChangeEvent = new CustomEvent('stateChange', {
    bubbles: false,
    composed: false,
    detail: {
      property: property,
      newValue: newValue
    }
  });
  state.dispatchEvent(stateChangeEvent);
}
function isSetterHook(stateProp) {
  return stateProp.indexOf('set_') === 0;
}
;// ./src/Cougar/StatefulArray.js
function StatefulArray_slicedToArray(r, e) { return StatefulArray_arrayWithHoles(r) || StatefulArray_iterableToArrayLimit(r, e) || StatefulArray_unsupportedIterableToArray(r, e) || StatefulArray_nonIterableRest(); }
function StatefulArray_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function StatefulArray_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function StatefulArray_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
function StatefulArray_get() { return StatefulArray_get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = StatefulArray_superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, StatefulArray_get.apply(null, arguments); }
function StatefulArray_superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = StatefulArray_getPrototypeOf(t));); return t; }
function StatefulArray_wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return StatefulArray_wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !StatefulArray_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return StatefulArray_construct(t, arguments, StatefulArray_getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), StatefulArray_setPrototypeOf(Wrapper, t); }, StatefulArray_wrapNativeSuper(t); }
function StatefulArray_construct(t, e, r) { if (StatefulArray_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && StatefulArray_setPrototypeOf(p, r.prototype), p; }
function StatefulArray_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (StatefulArray_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function StatefulArray_isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
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
    var appScope = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window;
    var isStateMap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    StatefulArray_classCallCheck(this, StatefulArray);
    var StateManager = appScope.SPROUT_CONFIG.stateManagerClass;
    if (!Array.isArray(initialArray)) {
      throw Error("Argument for StateFulArray constructor must be an array!");
    }
    var rawArray = initialArray;
    var statefulArray = rawArray.map(function (item, index) {
      var stateItem = item;

      // If already a state item - keep as is, otherwise - statify
      if (Object.hasOwn(item, 'state') || Object.hasOwn(item, '_stateManager') || Array.isArray(item)) return stateItem;
      if (StatefulArray_typeof(item) === 'object') stateItem = newStateManager(item, arrayStateProp, parentStateObject._stateManager, handleStateChange, false, appScope);
      return stateItem;
    });
    _this = StatefulArray_callSuper(this, StatefulArray, StatefulArray_toConsumableArray(statefulArray));
    StatefulArray_defineProperty(_this, "arrayMaps", {});
    _this.parentStateObject = parentStateObject;
    _this.arrayStateProp = arrayStateProp;
    _this.appScope = appScope;
    _this.rawArray = rawArray;
    if (isStateMap) {
      _this._isStateMap = true;
      _this.keyMap = new Map();
      _this.mapStateKeys();
    }
    statefulArray = new Proxy(_this, StatefulArrayHandler(parentStateObject === null || parentStateObject === void 0 ? void 0 : parentStateObject._stateManager, arrayStateProp, appScope));
    setHiddenProperty(statefulArray, "_isStatefulArray", true);
    _this.statefulArray = statefulArray;
    return StatefulArray_possibleConstructorReturn(_this, statefulArray);
  }
  StatefulArray_inherits(StatefulArray, _Array);
  return StatefulArray_createClass(StatefulArray, [{
    key: Symbol.iterator,
    value:
    // Required, e.g. for using Array.from
    function value() {
      return StatefulArray_get(StatefulArray_getPrototypeOf(StatefulArray.prototype), Symbol.iterator, this).call(this);
    }

    // Return [result, isNewArray, indexMap] 
    // isNewArray means result should be considered a whole new array,
    // indexMap is an indexMao for a "derived array" (arrays created e.g. from filter, that are bound to source array)
  }, {
    key: "runArrayOperation",
    value: function runArrayOperation(operationName, method, args) {
      switch (operationName) {
        // Remove the first item
        // (Internally it moves all else one "left")
        case "shift":
          {
            this.lastOperation = ["shift"];
            var res = method.apply(this, args);
            return [res, false];
          }

        // Prepends ...elements to the beginning of array
        case "unshift":
          {
            this.lastOperation = ["unshift", args.length];
            var _res = method.apply(this, args);
            return [_res, false];
          }

        // Remove the last item
        case "pop":
          {
            this.lastOperation = ["pop"];
            var _res2 = method.apply(this);
            return [_res2, false];
          }

        // Push ...elements
        case "push":
          {
            this.lastOperation = ["push", args.length];
            var _res3 = method.apply(this, args);
            return [_res3, false];
          }

        // Delete from startIndex, add ...elements in offset
        case "splice":
          {
            var _args = StatefulArray_slicedToArray(args, 2),
              startIndex = _args[0],
              deleteCount = _args[1];
            var itemsToAdd = args.slice(2);
            this.lastOperation = ["splice", startIndex, deleteCount, itemsToAdd];
            var _res4 = method.apply(this, args);
            return [_res4, false];
          }

        // Returns a new array from startIndex to endIndex
        case "slice":
          {
            var _res5 = method.apply(this, args);
            this.lastOperation = ["slice", args];
            return [_res5, true];
          }

        // Returns a filtered array,
        // that has items that passed a callback test
        case "filter":
          {
            var _res6 = method.apply(this, args);
            this.lastOperation = ["filter", args];
            return [_res6, true];
          }
        default:
          {
            var _res7 = method.apply(this, args);
            return [_res7, Array.isArray(_res7)];
          }
      }
    }
    // setDirtyOperation should be true if the content of this array actually changes
  }, {
    key: "doArrayOperation",
    value: function doArrayOperation(operationName, args) {
      var setDirtyProp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.$$operation = operationName;
      var result,
        isNewArray = false;
      if (ARRAY_CACHE_METHODS.has(operationName)) {
        var callbackFn = args[0];
        if (this.length && Object.hasOwn(this.arrayMaps, operationName) && this.arrayMaps[operationName].has(callbackFn)) {
          var cachedArrayMapMetadata = this.arrayMaps[operationName].get(callbackFn);
          if (this.lastDirtyTimestamp > cachedArrayMapMetadata.timestamp) {
            var _this$runArrayOperati = this.runArrayOperation(operationName, StatefulArray_get(StatefulArray_getPrototypeOf(StatefulArray.prototype), operationName, this), args);
            var _this$runArrayOperati2 = StatefulArray_slicedToArray(_this$runArrayOperati, 2);
            result = _this$runArrayOperati2[0];
            isNewArray = _this$runArrayOperati2[1];
            this.arrayMaps[operationName].set(callbackFn, {
              lastResult: result,
              timestamp: new Date().getTime()
            });
          } else {
            result = cachedArrayMapMetadata.lastResult;
          }
        } else {
          var _this$runArrayOperati3 = this.runArrayOperation(operationName, StatefulArray_get(StatefulArray_getPrototypeOf(StatefulArray.prototype), operationName, this), args);
          var _this$runArrayOperati4 = StatefulArray_slicedToArray(_this$runArrayOperati3, 2);
          result = _this$runArrayOperati4[0];
          isNewArray = _this$runArrayOperati4[1];
          if (!Object.hasOwn(this.arrayMaps, operationName)) {
            this.arrayMaps[operationName] = new Map();
            this.arrayMaps[operationName].set(callbackFn, {
              lastResult: result,
              timestamp: new Date().getTime()
            });
          }
        }
      } else {
        var _this$runArrayOperati5 = this.runArrayOperation(operationName, StatefulArray_get(StatefulArray_getPrototypeOf(StatefulArray.prototype), operationName, this), args);
        var _this$runArrayOperati6 = StatefulArray_slicedToArray(_this$runArrayOperati5, 2);
        result = _this$runArrayOperati6[0];
        isNewArray = _this$runArrayOperati6[1];
      }
      delete this.$$operation;
      if (setDirtyProp) {
        this.parentStateObject._stateManager.setDirtyProp(this.arrayStateProp);
      }
      return [result, isNewArray];
    }
  }, {
    key: "mapStateKeys",
    value: function mapStateKeys() {
      var _this2 = this;
      this.forEach(function (item) {
        var state = Object.hasOwn(item, "state") ? item.state : item;
        if (!Object.hasOwn(state, "key")) {
          console.warn("Items in State Map Array ".concat(_this2.arrayStateProp, " SHOULD have a 'key' property!"));
        }
        _this2.keyMap.set(state.key, state);
      });
    }
  }], [{
    key: Symbol.species,
    get:
    // This will define which "constructor" JS calls whenever it needs to construct a new array while calling some Array native functions
    function get() {
      return Array;
    }
  }]);
}( /*#__PURE__*/StatefulArray_wrapNativeSuper(Array));
// We use this for the array proxy that calls doArrayOperation
// which should only be called for native array functions
StatefulArray_defineProperty(StatefulArray, "functions", new ReadonlySet(["constructor", "statifyArray", "addDirtyIndex", "doArrayOperation", "runArrayOperation", "makeStateMap", "toArray"]));

;// ./src/Cougar/proxy_handlers.js
function proxy_handlers_typeof(o) { "@babel/helpers - typeof"; return proxy_handlers_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, proxy_handlers_typeof(o); }
function proxy_handlers_slicedToArray(r, e) { return proxy_handlers_arrayWithHoles(r) || proxy_handlers_iterableToArrayLimit(r, e) || proxy_handlers_unsupportedIterableToArray(r, e) || proxy_handlers_nonIterableRest(); }
function proxy_handlers_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function proxy_handlers_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return proxy_handlers_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? proxy_handlers_arrayLikeToArray(r, a) : void 0; } }
function proxy_handlers_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function proxy_handlers_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function proxy_handlers_arrayWithHoles(r) { if (Array.isArray(r)) return r; }





/* Used for auto detecting dependencies
 * deps is an object, which is transformed in-place to represent 
 * dependency property names and their count (number of times they are accessed)
 * this is part of the way array.length is detected as a separate dependency
 */
var depsProxyHandler = function depsProxyHandler() {
  //stateObject.$$accessCount = {};
  return {
    get: function get(target, property, receiver) {
      var _descrp$get;
      if (isBuiltInStateProp(property) || property.indexOf('$$') === 0) {
        return Reflect.get.apply(Reflect, arguments);
      }
      var descrp = Object.getOwnPropertyDescriptor(target, property);
      // Don't count getter functions as "dependencies"
      // (as they don't have a "value" that can change, they are only computed)
      if (descrp !== null && descrp !== void 0 && (_descrp$get = descrp.get) !== null && _descrp$get !== void 0 && _descrp$get.isStateGetter) {
        return Reflect.get.apply(Reflect, arguments);
      }
      if (!Object.hasOwn(target.$$accessCount, property)) {
        target.$$accessCount[property] = 1;
      } else {
        target.$$accessCount[property]++;
      }
      return Reflect.get.apply(Reflect, arguments);
    }
  };
};

/* Proxy handler for re-detecting dependencies everytime a state function is called
 */
var StateFunctionDependencyHandler = function StateFunctionDependencyHandler(stateManager, stateProp) {
  var appScope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  var state = stateManager.state;
  return {
    apply: function apply(thisFunction, thisStateObject, argumentsList) {
      stateManager.clearStateDependencies(stateProp);
      var originalGlobalState = thisStateObject._global;
      var _getDeps = getDeps(thisFunction, thisStateObject),
        _getDeps2 = proxy_handlers_slicedToArray(_getDeps, 3),
        deps = _getDeps2[0],
        globalDeps = _getDeps2[1],
        result = _getDeps2[2];
      deps.forEach(function (depProp) {
        stateManager.addStateDependency(depProp, stateProp);
      });
      globalDeps === null || globalDeps === void 0 || globalDeps.forEach(function (depProp) {
        originalGlobalState._stateManager.addGlobalStateDependency(depProp, stateProp, stateManager);
      });
      return result;
    }
  };
};

/* Proxy handler for StatefulArrays */
var StatefulArrayHandler = function StatefulArrayHandler(parentStateManager, arrayStateProp) {
  var appScope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  // We need to immediately call handleStateChanges - and not queue it,
  // to avoid potential race conditions!
  // The false argument prevents async state change handling queueing
  var triggerStateChange = function triggerStateChange() {
    var triggerLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var triggerArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (triggerArray) {
      parentStateManager.setDirtyProp(arrayStateProp, true);
    }
    if (triggerLength) {
      parentStateManager.setDirtyProp("".concat(arrayStateProp, ".length"), true);
    }
  };
  var setResult;
  return {
    set: function set(targetArray, property, value) {
      // Temporary internally used properties will start with '$$'
      if (property.indexOf("$$") === 0) {
        // targetArray[property] = value;
        // return true;
        return Reflect.set(targetArray, property, value);
      }

      // A change in array length triggers state change as '[arrayName].length', 
      // and for [arrayName] if not part of an internal array operation/function
      if (property === "length") {
        setResult = Reflect.set(targetArray, property, value);
        targetArray.hasDirtyItems = true;
        if (!targetArray.hasOwnProperty("$$operation")) {
          // Trigger state change for both the array itself and 'array.length'
          triggerStateChange(true, true);
        } else {
          // Trigger state change only for 'array.length'
          triggerStateChange(true, false);
        }
        return setResult;
      }

      // Return if the value is the same
      if (targetArray[property] === value) return true;
      var index = Number(property);
      if (!isNaN(index)) {
        // Check if the property is a numeric index
        // If we set it to a new object, convert it to a state object
        value = statifyValue(value, arrayStateProp, parentStateManager, appScope);

        // Make sure state values are always state manager values
        // Sometimes they can be state objects (because of the custom get handler in the Proxy)
        if (Object.hasOwn(value, '_stateManager')) {
          value = value._stateManager;
        }
        if (Object.hasOwn(value, "state") && Object.hasOwn(targetArray, "_isStateMap")) {
          var _value, _value2;
          // The question mark is for safety - this should always have a key
          targetArray.keyMap.set((_value = value) === null || _value === void 0 || (_value = _value.state) === null || _value === void 0 ? void 0 : _value.key, (_value2 = value) === null || _value2 === void 0 ? void 0 : _value2.state);
        }
        // targetArray.hasDirtyItems = true;
        // if the array has '$$operation' it means it is there is an ongoing "native" array operation/function
        // (slice, push etc.) running.
        if (!targetArray.hasOwnProperty('$$operation')) {
          var doStateChangeHandle = false;
          // This means a modification to an existing array item (as opposed to an addition of a new one)
          // New additions are triggered via the 'length' change
          if (index < targetArray.length) {
            doStateChangeHandle = true;
          }
          /*
          const prevValue = targetArray[index];
          targetArray.derivedArrays.forEach(array=> {
              if (array.indexMap.has(prevValue)) {
                  array[index] = value;
                  array.indexMap.delete(prevValue);
                  array.indexMap.set(value, index);
              }
          });
          */
          setResult = Reflect.set(targetArray, property, value);
          // Only handle state change if this is a change for an existing array item,
          // if it's a new item, it will already be handled on the "length" property set
          // Without this check we will have a redundant state check
          if (doStateChangeHandle) {
            targetArray.addDirtyIndex(index);
            triggerStateChange();
          }
          return setResult;
        }
      }
      return Reflect.set(targetArray, property, value);
    },
    get: function get(targetArray, property, receiver) {
      if (proxy_handlers_typeof(property) === "symbol") return Reflect.get.apply(Reflect, arguments);
      if (property === "length" && Object.hasOwn(targetArray.parentStateObject, "$$accessCount") && !Object.hasOwn(targetArray, '$$operation')) {
        var arrStateProp = targetArray.arrayStateProp;
        if (!Object.hasOwn(targetArray.parentStateObject.$$accessCount, "".concat(arrStateProp, ".length"))) {
          targetArray.parentStateObject.$$accessCount["".concat(arrStateProp, ".length")] = 1;
        } else {
          targetArray.parentStateObject.$$accessCount["".concat(arrStateProp, ".length")]++;
        }
      }
      if (property.indexOf && property.indexOf('__') === 0) {
        var nativeFunctionName = property.substring(2);
        return Reflect.get(targetArray, nativeFunctionName, receiver);
      }
      if (typeof targetArray[property] === 'function' &&
      // MAKE SURE to put all native StatefulArray class names here
      !StatefulArray.functions.has(property)) {
        return function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          // .statefulArray is a reference to the PROXY itself
          var _targetArray$doArrayO = targetArray.doArrayOperation.call(targetArray.statefulArray, property, args, ARRAY_MUTATE_METHODS.has(property)),
            _targetArray$doArrayO2 = proxy_handlers_slicedToArray(_targetArray$doArrayO, 2),
            result = _targetArray$doArrayO2[0],
            isNewArray = _targetArray$doArrayO2[1];
          /*
          if (isNewArray) {
              result.isDerivedArray = false;
              result.indexMap = indexMap;
              result.originalArray = targetArray;
          }
          */
          return result;
        };
      }
      var index = Number(property);
      if (!isNaN(index)) {
        if (!targetArray[index]) return undefined;
        // If the item is a state object, make sure to return it correctly
        if (targetArray[index].hasOwnProperty('state')) return targetArray[index].state;
        // Could be another array
        return targetArray[index];
      }
      return Reflect.get.apply(Reflect, arguments);
    }
  };
};

/* Used for "child state objects" - basically state values that are objects and should be reactive,
 * these can also be object items within state arrays
 */
var StateObjectValueHandler = function StateObjectValueHandler(rootStateObj, objPropertyName) {
  var appScope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  return {
    set: function set(targetObj, property, value) {
      if (isBuiltInStateProp(property)) {
        return Reflect.set.apply(Reflect, arguments);
      }
      var setResult = Reflect.set.apply(Reflect, arguments);
      var stateManager = rootStateObj._stateManager;
      if (stateManager.parentStateManager) {
        var _stateManager$parentS;
        // Only trigger parent state change if not in the middle of operation
        // E.g. if this is an object inside an array in the middle of an operation - don't trigger
        //if (!Object.hasOwn(stateManager.parentStateManager.state[objPropertyName], '$$operation')) {
        performance.mark("todo-array-set-dirty-prop");
        (_stateManager$parentS = stateManager.parentStateManager) === null || _stateManager$parentS === void 0 || _stateManager$parentS.setDirtyProp(objPropertyName);
        //}
      }
      return setResult;
    },
    defineProperty: function defineProperty(targetObj, property, descriptor) {
      if (isBuiltInStateProp(property)) {
        return Reflect.defineProperty.apply(Reflect, arguments);
      }
      if (typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.value) !== "undefined") {
        // Sub objects should be statified as well
        descriptor.value = statifyValue(descriptor.value, property, rootStateObj._stateManager, appScope);
      }

      // Don't use "arguments" here - they are not linked to argument changes in 'strict'
      return Reflect.defineProperty(targetObj, property, descriptor);
    },
    get: function get(targetObj, property, receiver) {
      var getResult = Reflect.get.apply(Reflect, arguments);
      // This has to be rebound because of the Proxy
      if (typeof getResult === 'function') return getResult.bind(targetObj);
      return getResult;
    }
  };
};
;// ./src/Cougar/state_plugins.js
/* Factory functions for StateManager Plugins. Runs with StateManager as this context */

function conditionalElements() {
  this.conditionallyRenderingElements = {};
  this.addConditionallyRenderingElements = function (stateProp, element) {
    this.nodeManager.addConditionallyRenderingElements(stateProp, element);
  };
}
function stateMaps() {
  this.stateArrayMaps = {};
  this.addStateMap = function (stateProp, customElementName, parentElement) {
    if (!this.stateArrayMaps.hasOwnProperty(stateProp)) {
      this.stateArrayMaps[stateProp] = new Map();
    }
    this.stateArrayMaps[stateProp].set(parentElement, customElementName);
  };
}
;// ./src/Cougar/state_utils.js
function state_utils_defineProperty(e, r, t) { return (r = state_utils_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function state_utils_toPropertyKey(t) { var i = state_utils_toPrimitive(t, "string"); return "symbol" == Cougar_state_utils_typeof(i) ? i : i + ""; }
function state_utils_toPrimitive(t, r) { if ("object" != Cougar_state_utils_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != Cougar_state_utils_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Cougar_state_utils_slicedToArray(r, e) { return Cougar_state_utils_arrayWithHoles(r) || Cougar_state_utils_iterableToArrayLimit(r, e) || Cougar_state_utils_unsupportedIterableToArray(r, e) || Cougar_state_utils_nonIterableRest(); }
function Cougar_state_utils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function Cougar_state_utils_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return Cougar_state_utils_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? Cougar_state_utils_arrayLikeToArray(r, a) : void 0; } }
function Cougar_state_utils_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function Cougar_state_utils_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function Cougar_state_utils_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function Cougar_state_utils_typeof(o) { "@babel/helpers - typeof"; return Cougar_state_utils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, Cougar_state_utils_typeof(o); }
function state_utils_construct(t, e, r) { if (state_utils_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && state_utils_setPrototypeOf(p, r.prototype), p; }
function state_utils_setPrototypeOf(t, e) { return state_utils_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, state_utils_setPrototypeOf(t, e); }
function state_utils_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (state_utils_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }






/* Results of setter hooks are UNSTATIFIED */

function newStateManager(initialState, parentStateProp, parentStateManager) {
  var handleStateFunction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : handleStateChange;
  var isGlobal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var appScope = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : window;
  var stateManager = new Cougar_StateManager(initialState, parentStateProp, parentStateManager, handleStateFunction, isGlobal, appScope);
  stateManager.use(conditionalElements, "conditional-element");
  stateManager.use(stateMaps, "map");
  return stateManager;
}
function statifyArray(array, stateProp, state) {
  var appScope = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window;
  var isStateMap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (Object.hasOwn(array, '_isStatefulArray')) return array;
  var args = [array, state, stateProp, appScope, isStateMap];
  /*
  let statefulArray;
  if (array.isDerivedArray) {
      statefulArray = new StatefulArrayDerived(...args, array.indexMap);
      array.originalArray.addDerivedArray(array);
  }
  else {
      */
  var statefulArray = state_utils_construct(StatefulArray, args);
  // }

  if (!state.hasOwnProperty("".concat(stateProp, ".length"))) {
    Object.defineProperty(state, "".concat(stateProp, ".length"), {
      get: function get() {
        return this[stateProp].length;
      }
    });
  }
  return statefulArray;
}
function statifyArrayDeriveFrom(fromArray, array, stateProp, state) {
  var appScope = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : window;
  var indexMap = arguments.length > 5 ? arguments[5] : undefined;
  if (Object.hasOwn(array, '_isStatefulArray')) return array;
  var args = [array, state, stateProp, appScope, indexMap];
  var statefulArray = state_utils_construct(StatefulArrayDerived, args);
  if (!state.hasOwnProperty("".concat(stateProp, ".length"))) {
    Object.defineProperty(state, "".concat(stateProp, ".length"), {
      get: function get() {
        return this[stateProp].length;
      }
    });
  }
  fromArray.addDerivedArray(array);
  return statefulArray;
}

/* Makes value "stateful" (makes it reactive),
 * essentialy turns an object into a StateManager, or an array into a StatefulArray
 * Primitives are left untouched
 */
function statifyValue(value, stateProp, stateManager) {
  var appScope = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window;
  var isStateMap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isBuiltInStateProp(stateProp)) return value;
  if (Array.isArray(value)) value = statifyArray(value, stateProp, stateManager.state, appScope, isStateMap);else if (Cougar_state_utils_typeof(value) === 'object' && !value.hasOwnProperty('_stateManager')) {
    value = newStateManager(value, stateProp, stateManager, handleStateChange, false, appScope).state;
  }
  return value;
}

/* Called once for each setter hook */
function initSetterHook(setterArray, stateProp, stateManager) {
  var _setterOptions$deps;
  var appScope = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window;
  var setterHookName = "set_".concat(stateProp);
  var _setterArray = Cougar_state_utils_slicedToArray(setterArray, 2),
    setterFunc = _setterArray[0],
    setterOptions = _setterArray[1];
  if (typeof setterFunc !== "function") {
    throw Error("Setter hooks must define a function as the first item!");
  }
  var state = stateManager.state;
  setterOptions.deps = (_setterOptions$deps = setterOptions.deps) !== null && _setterOptions$deps !== void 0 ? _setterOptions$deps : "auto";
  var result;

  // If init + once is set, we don't need to save dependencies
  if (!(setterOptions.init && setterOptions.once)) {
    // auto - will detect the setter function dependencies automatically
    if (setterOptions.deps === "auto") {
      if (!setterOptions.reevaluate) {
        var _globalDeps;
        var deps, globalDeps;
        var _getDeps = getDeps(setterFunc, state);
        var _getDeps2 = Cougar_state_utils_slicedToArray(_getDeps, 3);
        deps = _getDeps2[0];
        globalDeps = _getDeps2[1];
        result = _getDeps2[2];
        deps.forEach(function (dep) {
          stateManager.addStateDependency(dep, setterHookName);
        });
        (_globalDeps = globalDeps) === null || _globalDeps === void 0 || _globalDeps.forEach(function (dep) {
          stateManager.addStateDependency(dep, setterHookName);
          state._global._stateManager.addGlobalStateDependency(dep, setterHookName, stateManager);
        });
      } else {
        // reevaluate - means that the dependencies will reevaluate each time the setter re-runs
        var stateDependencyHandler = StateFunctionDependencyHandler(stateManager, setterHookName, appScope);
        setterFunc = new Proxy(setterFunc, stateDependencyHandler);
        // We redefine the setter, as we proxied the setter hook function
        setterArray[0] = setterFunc;
        // Object.defineProperty(state, setterHookName, { value: setterArray, configurable: true });
      }
    } else {
      // Explicit depdencies array
      setterOptions.deps.forEach(function (dep) {
        if (dep.indexOf('global') === 0) {
          var globalDep = dep.substring(dep.indexOf('global.') + 7);
          state._global.addGlobalStateDependency(setterHookName, globalDep, stateManager);
        } else {
          stateManager.addStateDependency(dep, setterHookName);
        }
      });
    }
  }
  // Result should be retrieved from the privateState
  Object.defineProperty(state, stateProp, {
    get: function get() {
      // This could be accessed from a dependency check function
      if (Object.hasOwn(state, "$$accessCount")) {
        if (!Object.hasOwn(state.$$accessCount, stateProp)) {
          state.$$accessCount[stateProp] = 1;
        } else {
          state.$$accessCount[stateProp]++;
        }
      }
      return stateManager.privateState[stateProp];
    },
    set: function set() {
      throw Error("Cannot directly set the state value of a result of a setter hook function!");
    }
  });

  // init - means the setter will run upon initialization (first state populate),
  // and will save the result on a state prop
  if (setterOptions.init) {
    // DO NOT STATIFY SETTER HOOK RESULTS!
    // It's possible we already have the result from the dependency check call before
    if (!result) result = setterFunc.call(state);
    if (setterOptions.statify || setterOptions.stateMap) result = statifyValue(result, stateProp, stateManager, appScope, setterOptions.stateMap);
    stateManager.privateState[stateProp] = result;
    stateManager.setDirtyProp(stateProp);
  }
}
function callSetterHook(setterArray, stateProp, stateManager) {
  var appScope = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : window;
  var state = stateManager.state;
  var originalValue = stateManager.privateState[stateProp];
  if (originalValue === undefined) {
    // First time the Setter hook is called
    initSetterHook(setterArray, stateProp, stateManager, appScope);
  }
  var _setterArray2 = Cougar_state_utils_slicedToArray(setterArray, 2),
    setterFunc = _setterArray2[0],
    setterOptions = _setterArray2[1];
  if (typeof setterFunc !== "function") {
    throw Error("Setter hooks must define a function as the first item!");
  }
  var result = setterFunc.call(state);
  var hasNewValue = false;
  if (result === undefined) {
    throw Error("State Set Hook functions MUST return a value");
  }
  if (setterOptions.statify || setterOptions.stateMap) result = statifyValue(result, stateProp, stateManager, appScope, setterOptions.stateMap);
  if (result !== originalValue) {
    stateManager.privateState[stateProp] = result;
    hasNewValue = true;
  }

  // once - means the setter is run once, save on the state prop, and then
  // the setter is removed
  if (setterOptions.once) {
    // Delete original setter hook, as it is only meant to run once
    delete state["set_".concat(stateProp)];
  }
  return hasNewValue;
}

// Turna an object with properties and the number of times each was accessed,
// to a set. Mainly used to also track .length accesses correctly.
function resolveAccessCountToDepsSet(depsCount) {
  var lengthIndex;
  for (var prop in depsCount) {
    lengthIndex = prop.indexOf('.length');
    if (lengthIndex !== -1) {
      depsCount[prop.substring(0, lengthIndex)]--;
    }
  }
  var deps = new Set(Object.keys(depsCount).filter(function (dep) {
    return depsCount[dep] > 0;
  }));
  return deps;
}

// Get usages (accesses) of properties in fromObject,
// that occurs in ofFunction
// Also returns the result of the function call 
function getDeps(ofFunction, fromStateObject) {
  var hasGlobal = false;
  var depsProxy = new Proxy(fromStateObject, depsProxyHandler());
  depsProxy.$$accessCount = {};
  if (Object.hasOwn(depsProxy, '_global')) {
    hasGlobal = true;
    depsProxy._global = new Proxy(depsProxy._global, depsProxyHandler);
    depsProxy._global.$$accessCount = {};
  }
  var result = ofFunction.call(depsProxy);
  var deps = resolveAccessCountToDepsSet(depsProxy.$$accessCount);
  // We need to explicitely delete - EVEN from the proxy,
  // since we don't define a "set handler", original behavior is preserved
  // and $$accessCount is also set on the original state object!
  delete depsProxy.$$accessCount;
  var globalDeps = null;
  if (hasGlobal) {
    globalDeps = resolveAccessCountToDepsSet(depsProxy._global.$$accessCount);
    delete depsProxy._global.$$accessCount;
  }
  return [deps, globalDeps, result];
}

// A function that checks if the value of the descriptor is a setter hook or a getter function,
// And return the options set for it, if any
function getStateHookData(descriptor, property) {
  if (descriptor.get && typeof descriptor.get === "function") return {
    nativeGetter: true,
    func: descriptor.get,
    deps: "auto",
    reevaluate: false,
    init: false,
    isSetter: false
  };
  if (descriptor.value) {
    var value = descriptor.value;
    if (property.indexOf('set_') === 0) {
      if (!Array.isArray(value)) throw Error("State setter hooks must be arrays!");
      var hookOptions = value[1] || {};
      return state_utils_defineProperty(state_utils_defineProperty({
        nativeGetter: false,
        func: value[0],
        deps: hookOptions.deps && Array.isArray(hookOptions.deps) ? hookOptions.deps : "auto",
        reevaluate: hookOptions.reevaluate || false,
        init: hookOptions.init || false,
        once: hookOptions.once || false,
        stateMap: hookOptions.stateMap || false
      }, "stateMap", hookOptions.statify || false), "isSetter", property.indexOf('set_') === 0);
    }
  }
}

// StateManager is a StateManager instance (with a public state property), initialState is a "static" initial state object.
// If globalState is null, we don't need to handle dependences between the (local) state and global state
// This function is called as part of the initialization of a StateManager instance - 
// when it is "activated"
function populateStateFromInitialState(stateManager, initialState) {
  var appScope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  var state = stateManager.state;
  var descriptors = Object.getOwnPropertyDescriptors(initialState);
  var _loop = function _loop(key) {
    var descrp = descriptors[key];
    if (isBuiltInStateProp(key)) {
      Object.defineProperty(state, key, descrp);
      return 1; // continue
    }
    var hookFunc;

    // If this is a State Hook (a 'set_' or get functions).
    var stateHook = getStateHookData(descrp, key);
    if (stateHook) {
      var statePropName = stateHook.isSetter ? key.substring(4) : key;
      hookFunc = stateHook.func;
      hookFunc.bind(state);
      if (stateHook.isSetter && !stateHook.nativeGetter) {
        // It will call the hook function if init is set to true, as well
        initSetterHook(descrp.value, statePropName, stateManager, appScope);
        // if "once" is on, we need to be able to delete it later
        if (stateHook.once) descrp.configurable = true;
        Object.defineProperty(state, key, descrp);
      }
      // Native getters only evaluate dependencies once on init,
      // they do not reevalaute on each call
      else if (stateHook.nativeGetter) {
        descrp.get.isStateGetter = true;
        var getFunc = descrp.get;
        var _getDeps3 = getDeps(getFunc, state),
          _getDeps4 = Cougar_state_utils_slicedToArray(_getDeps3, 2),
          deps = _getDeps4[0],
          globalDeps = _getDeps4[1];
        deps.forEach(function (dep) {
          stateManager.addStateDependency(dep, key);
        });
        globalDeps === null || globalDeps === void 0 || globalDeps.forEach(function (dep) {
          stateManager.addStateDependency(dep, key);
          state._global._stateManager.addGlobalStateDependency(dep, key, stateManager);
        });
        descrp.get.bind(state); // = hookFunc;
        Object.defineProperty(state, statePropName, descrp);
      }
    } // End staterHook condition

    // Direct value 
    else if (descrp.hasOwnProperty('value')) {
      var stateProp = key;
      var value = statifyValue(descrp.value, stateProp, stateManager, appScope);
      if (!stateManager.privateState.hasOwnProperty(stateProp)) {
        stateManager.privateState[stateProp] = value;
      }
      Object.defineProperty(state, stateProp, {
        set: function set(value) {
          var currentVal = stateManager.privateState[stateProp];
          if (value === currentVal) return;
          // Can't be "STATE MAP" - state maps must be top level - mention it in readme!
          value = statifyValue(value, stateProp, stateManager, appScope);
          // Sets value to "private state"
          stateManager.privateState[stateProp] = value;
          stateManager.setDirtyProp(stateProp);

          // If an array value was set to a new array, 
          // then also count it as an array.length change!
          stateManager.setDirtyProp("".concat(stateProp, ".length"));
        },
        get: function get() {
          // Value is always retrieved from the "private" state
          return stateManager.privateState[stateProp];
        }
      });
    }
  };
  for (var key in descriptors) {
    if (_loop(key)) continue;
  }
}
function defineStateExpressionResolver(statePropExpression, stateObj, getter, contextStateProp) {
  Object.defineProperty(stateObj, statePropExpression, {
    get: getter,
    set: function set() {
      throw Error("Cannot directly set a State property expression");
    },
    enumerable: true
  });
  stateObj._stateManager.addStateDependency(contextStateProp, statePropExpression);
}

// Takes a set of "dependency" prop names, and return two sets:
// setter hook props, and direct value deps
function sortDeps(depsSet) {
  var deps = new Set();
  var setterDeps = new Set();
  depsSet.forEach(function (dep) {
    if (isSetterHook(dep)) setterDeps.add(dep);else deps.add(dep);
  });
  return [deps, setterDeps];
}
;// ./src/Cougar/NodeManager.js
function NodeManager_slicedToArray(r, e) { return NodeManager_arrayWithHoles(r) || NodeManager_iterableToArrayLimit(r, e) || NodeManager_unsupportedIterableToArray(r, e) || NodeManager_nonIterableRest(); }
function NodeManager_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function NodeManager_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function NodeManager_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function NodeManager_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = NodeManager_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function NodeManager_typeof(o) { "@babel/helpers - typeof"; return NodeManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, NodeManager_typeof(o); }
function NodeManager_toConsumableArray(r) { return NodeManager_arrayWithoutHoles(r) || NodeManager_iterableToArray(r) || NodeManager_unsupportedIterableToArray(r) || NodeManager_nonIterableSpread(); }
function NodeManager_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function NodeManager_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return NodeManager_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? NodeManager_arrayLikeToArray(r, a) : void 0; } }
function NodeManager_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function NodeManager_arrayWithoutHoles(r) { if (Array.isArray(r)) return NodeManager_arrayLikeToArray(r); }
function NodeManager_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function NodeManager_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function NodeManager_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, NodeManager_toPropertyKey(o.key), o); } }
function NodeManager_createClass(e, r, t) { return r && NodeManager_defineProperties(e.prototype, r), t && NodeManager_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function NodeManager_classPrivateFieldInitSpec(e, t, a) { NodeManager_checkPrivateRedeclaration(e, t), t.set(e, a); }
function NodeManager_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function NodeManager_defineProperty(e, r, t) { return (r = NodeManager_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function NodeManager_toPropertyKey(t) { var i = NodeManager_toPrimitive(t, "string"); return "symbol" == NodeManager_typeof(i) ? i : i + ""; }
function NodeManager_toPrimitive(t, r) { if ("object" != NodeManager_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != NodeManager_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function NodeManager_classPrivateFieldGet(s, a) { return s.get(NodeManager_assertClassBrand(s, a)); }
function NodeManager_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }




var NodeManager_pendingPaintNodeManagers = NODES_STATE.pendingPaintNodeManagers;
var _nodeActions = /*#__PURE__*/new WeakMap();
var NodeManager = /*#__PURE__*/function () {
  function NodeManager() {
    NodeManager_classCallCheck(this, NodeManager);
    // Maps state props to state nodes,
    // Keys are state props, and values are sets of Nodes
    NodeManager_defineProperty(this, "stateNodes", {});
    // This is to contain the special "conditional-rendering" custom elements
    NodeManager_defineProperty(this, "conditionallyRenderingElements", {});
    // Bindable attributes - are attributes that can be bound to state properties - 
    // these are generally attributes that a user interaction can or should add or remove them
    // e.g. checked, value
    // Each value is a map with keys: DOM elements, values: State Attribute Nodes
    NodeManager_defineProperty(this, "bindableAttributesStateNodes", new Map(NodeManager_toConsumableArray(BINDABLE_ATTRIBUTES_TO_STATE_NODES).map(function (attributeName) {
      return [attributeName, new Map()];
    })));
    // Keys are nodes in the component
    // (child elements, attributes, text nodes),
    // values are sets of abstract DOM operations
    NodeManager_classPrivateFieldInitSpec(this, _nodeActions, new Map());
    NodeManager_defineProperty(this, "paintStatus", null);
  }
  return NodeManager_createClass(NodeManager, [{
    key: "addStateNode",
    value:
    // In the DOM realm - Node here is either an Attribute Node or a Text Node
    function addStateNode(stateProp, stateNode) {
      if (!this.stateNodes.hasOwnProperty(stateProp)) {
        this.stateNodes[stateProp] = new Set();
      }
      this.stateNodes[stateProp].add(stateNode);

      // If this is an attribute node which is "bindable" (supported for the _bind command)
      // then we save a reference to its containing element
      if (SUPPORTED_ATTRIBUTES_FOR_BINDING.has(stateNode.nodeName)) {
        var bindaleAttributeStateNodes = this.bindableAttributesStateNodes.get(stateNode.nodeName);
        bindaleAttributeStateNodes.set(stateNode.originalOwnerElement, stateNode);
      }
    }
  }, {
    key: "removeStateNode",
    value: function removeStateNode(stateProp, stateNode) {
      var _this$stateNodes;
      (_this$stateNodes = this.stateNodes) === null || _this$stateNodes === void 0 || _this$stateNodes[stateProp]["delete"](stateNode);
    }

    // ConditionalElements mapped to stateProp
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
  }, {
    key: "addNodeAction",
    value: function addNodeAction(node, action) {
      if (!NodeManager_classPrivateFieldGet(_nodeActions, this).has(node)) {
        NodeManager_classPrivateFieldGet(_nodeActions, this).set(node, getNewNodeActionsObject(node.nodeType));
      }
      var nodeActions = NodeManager_classPrivateFieldGet(_nodeActions, this).get(node);
      var actionType = action.actionType,
        actionValue = action.actionValue;
      if (node.nodeType === Node.ELEMENT_NODE) {
        switch (actionType) {
          case "append":
            {
              nodeActions.append.add(actionValue);
              break;
            }
          case "setProperty":
            {
              nodeActions.setProperty(actionValue.property, actionValue.value);
              break;
            }
          case "reattach":
            {
              nodeActions.reattach = true;
              break;
            }
        }
      } else {
        nodeActions[actionType] = actionValue;
      }
      if (!this.paintStatus) {
        this.paintStatus = "pending";
      }
    }
  }, {
    key: "queuePaint",
    value: function queuePaint() {
      if (this.paintStatus === "pending") {
        NodeManager_pendingPaintNodeManagers.add(this);
        paint_utils_queuePaint();
        this.paintStatus = "queued";
      }
    }
  }, {
    key: "resolveToDOMActions",
    value: function resolveToDOMActions() {
      var attributeActions = [];
      var textActions = [];
      var elementActions = [];
      var reattachActions = [];
      var propertySetActions = [];
      NodeManager_classPrivateFieldGet(_nodeActions, this).forEach(function (nodeActions, node) {
        switch (node.nodeType) {
          case Node.ATTRIBUTE_NODE:
            {
              var value = nodeActions.setAttribute;
              var typeOfValue = NodeManager_typeof(value);
              if (typeOfValue !== 'undefined') {
                if (typeOfValue === "boolean") {
                  if (!node.hasOwnProperty("originalOwnerElement")) {
                    throw Error("originalOwnerElement not found on boolean attribute node! Should never happen!");
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
                  if (typeOfValue === "string" && node.nodeValue !== value) {
                    attributeActions.push(function () {
                      return node.nodeValue = value;
                    });
                  }
                }
              }
              break;
            }
          case Node.TEXT_NODE:
            {
              if (nodeActions.textContent !== undefined) {
                var _value = String(nodeActions.textContent);
                if (node.nodeValue !== _value) {
                  textActions.push(function () {
                    return node.nodeValue = _value;
                  });
                }
              }
              break;
            }
          case Node.ELEMENT_NODE:
            {
              // Append
              var _iterator = NodeManager_createForOfIteratorHelper(nodeActions.append.values()),
                _step;
              try {
                var _loop = function _loop() {
                  var newChildElement = _step.value;
                  elementActions.push(function () {
                    return node.appendChild(newChildElement);
                  });
                };
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  _loop();
                }

                // setProperty
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              var _iterator2 = NodeManager_createForOfIteratorHelper(nodeActions.setProperty),
                _step2;
              try {
                var _loop2 = function _loop2() {
                  var _step2$value = NodeManager_slicedToArray(_step2.value, 2),
                    key = _step2$value[0],
                    value = _step2$value[1];
                  if (node[key] !== value) {
                    propertySetActions.push(function () {
                      return node[key] = value;
                    });
                  }
                };
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  _loop2();
                }
                // Reattach
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              if (nodeActions.reattach) {
                var _node$pendingKeyMapAc;
                reattachActions.push(function () {
                  return node.reattach();
                });
                if (node !== null && node !== void 0 && (_node$pendingKeyMapAc = node.pendingKeyMapActions) !== null && _node$pendingKeyMapAc !== void 0 && _node$pendingKeyMapAc.size) {
                  reattachActions.push(function () {
                    var _iterator3 = NodeManager_createForOfIteratorHelper(node.pendingKeyMapActions),
                      _step3;
                    try {
                      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                        var keyMapAction = _step3.value;
                        keyMapAction();
                      }
                    } catch (err) {
                      _iterator3.e(err);
                    } finally {
                      _iterator3.f();
                    }
                    node.pendingKeyMapActions.clear();
                  });
                }
                nodeActions.reattach = false;
              }
            }
            break;
        }
      });
      NodeManager_classPrivateFieldGet(_nodeActions, this).clear();
      return [attributeActions, textActions, propertySetActions, elementActions, reattachActions];
    }
  }]);
}();
;// ./src/Cougar/reactivity_utils.js


function populateInitialState(stateManager, initialState) {
  var appScope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  return populateStateFromInitialState(stateManager, initialState, appScope);
}
function makeReactive(stateObject) {
  var parentStateProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var appScope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  return new Proxy(stateObject, StateObjectValueHandler(stateObject, parentStateProp, appScope));
}
;// ./src/Cougar/StateManager.js
function StateManager_typeof(o) { "@babel/helpers - typeof"; return StateManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, StateManager_typeof(o); }
function StateManager_toArray(r) { return StateManager_arrayWithHoles(r) || StateManager_iterableToArray(r) || StateManager_unsupportedIterableToArray(r) || StateManager_nonIterableRest(); }
function StateManager_toConsumableArray(r) { return StateManager_arrayWithoutHoles(r) || StateManager_iterableToArray(r) || StateManager_unsupportedIterableToArray(r) || StateManager_nonIterableSpread(); }
function StateManager_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function StateManager_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function StateManager_arrayWithoutHoles(r) { if (Array.isArray(r)) return StateManager_arrayLikeToArray(r); }
function StateManager_slicedToArray(r, e) { return StateManager_arrayWithHoles(r) || StateManager_iterableToArrayLimit(r, e) || StateManager_unsupportedIterableToArray(r, e) || StateManager_nonIterableRest(); }
function StateManager_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function StateManager_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return StateManager_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? StateManager_arrayLikeToArray(r, a) : void 0; } }
function StateManager_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function StateManager_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function StateManager_arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function StateManager_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function StateManager_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, StateManager_toPropertyKey(o.key), o); } }
function StateManager_createClass(e, r, t) { return r && StateManager_defineProperties(e.prototype, r), t && StateManager_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function StateManager_classPrivateFieldInitSpec(e, t, a) { StateManager_checkPrivateRedeclaration(e, t), t.set(e, a); }
function StateManager_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function StateManager_defineProperty(e, r, t) { return (r = StateManager_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function StateManager_toPropertyKey(t) { var i = StateManager_toPrimitive(t, "string"); return "symbol" == StateManager_typeof(i) ? i : i + ""; }
function StateManager_toPrimitive(t, r) { if ("object" != StateManager_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != StateManager_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function StateManager_classPrivateFieldGet(s, a) { return s.get(StateManager_assertClassBrand(s, a)); }
function StateManager_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }









var stateChangeHandlers = new Map();
function queueStateChange(element, stateChangeHandler) {
  stateChangeHandlers.set(element, stateChangeHandler);
  queueAnimationFrame(Array.from(stateChangeHandlers.values()), "STATE_CHANGE", function () {
    return stateChangeHandlers.clear();
  });
}

// This class actually handles "State". It returns a proxied "state" object,
// while handling all state changes and triggers behind the scenes

// Lifecycle:
// 1. Dirty Prop
// 2. Queue STATE_CHANGE -> handleStateChanges to rAF
// 3. For each prop changed: 
// 3A. Run handleStateChange
// 3B. Run handleStateChange for all local dependencies
// 3C. Run handleStateChange for all global dependencies
var _plugins = /*#__PURE__*/new WeakMap();
var StateManager = /*#__PURE__*/function () {
  // A StateManager instance can also be a "sub-state" object within a containing state object,
  // in this case (the optional) 'parentStateProp' and 'parentStateManager' are used to bind to its containing state object.
  function StateManager(initialState, parentStateProp, parentStateManager) {
    var _this = this;
    var handleStateFunction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : handleStateChange;
    var isGlobal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var appScope = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : window;
    StateManager_classCallCheck(this, StateManager);
    // The privateState is the "source of truth" for the values of the state,
    // the keys are the same as the "public" keys
    StateManager_defineProperty(this, "privateState", {});
    // This represents the "publicly" exposed state object
    // It will be wrapped in a Proxy
    StateManager_defineProperty(this, "state", new EventTarget());
    // A map that maps state props to "dependencies", each time a stateProp which is a key here,
    // is changed, a state change is triggered for its dependencies as well
    StateManager_defineProperty(this, "stateDependencies", new Map());
    // These are used when the state object has a "parent", e.g an object inside a Stateful Array
    StateManager_defineProperty(this, "parentStateProp", void 0);
    StateManager_defineProperty(this, "parentStateManager", void 0);
    // State props that were changed and needs to trigger possible state changes
    StateManager_defineProperty(this, "dirtyProps", new Set());
    // Node Manager saves bindings between Nodes and state,
    // translates state chanages into DOM actions and queue them for next paint.
    StateManager_defineProperty(this, "nodeManager", new NodeManager());
    // Names of "plugins" that are turned on for the State Manager instance (e.g. "map", "conditional-element");
    StateManager_classPrivateFieldInitSpec(this, _plugins, new Set());
    this.parentStateProp = parentStateProp;
    this.parentStateManager = parentStateManager;
    this.handleStateChange = handleStateFunction;
    this.appScope = appScope;
    // this.state = {};

    // Saves the actual state manager instance to a readonly _stateManager
    setHiddenProperty(this.state, "_stateManager", this, true);
    this.state.$$isInitializing = true;

    // If a "child state" - then allow mutability (adding new props)
    if (parentStateProp && parentStateManager) {
      this.state = makeReactive(this.state, parentStateProp, appScope);
    }
    if (!initialState || !Object.keys(initialState).length) {
      console.warn("Empty initial state objects should never be used!");
    }

    // Local state
    if (!isGlobal) {
      var globalState = appScope[GLOBAL_STATE_FUNCTION_NAME]();
      setHiddenProperty(this.state, "_global", globalState, true);
    }
    // Global state
    else {
      // This maps depencdies between "local" state properties to global state changes
      // The difference between the normal dependencies object, is that each depenency
      // also includes a state object (which is the state context of the property),
      // in other words, if a local state "relies" on a global state change - we save this
      // mapping here.
      // The keys are global state properties, where each value is a Map,
      // in the map, the keys are local state manager objects, and the values are sets with
      // local property names
      this.globalStateDependencies = new Map();
      this.addGlobalStateDependency = function (stateProp, depStateProp, localStateManager) {
        if (!_this.globalStateDependencies.has(stateProp)) {
          _this.globalStateDependencies.set(stateProp, new Map());
        }
        var globalDeps = _this.globalStateDependencies.get(stateProp);
        if (!globalDeps.has(localStateManager)) {
          globalDeps.set(localStateManager, new Set());
        }
        globalDeps.get(localStateManager).add(depStateProp);
      };
    }
    populateInitialState(this, initialState, appScope);
    delete this.state.$$isInitializing;
    setHiddenProperty(this.state, "_isStateManager", true);
    setHiddenProperty(this.state, "_isActive", true, false);
  }

  // Each value is a set of state properties set as "dependencies" for a key State Property
  return StateManager_createClass(StateManager, [{
    key: "setDirtyProp",
    value: function setDirtyProp(prop) {
      var queueHandleState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // state properties beginning with $$ are internal "utility" meta properties
      if (this.state.$$isInitializing) return;
      var lengthIndex = prop.indexOf('.length');
      var checkProp = lengthIndex > 0 ? prop.substring(0, lengthIndex) : prop;
      if (!Object.hasOwn(this.state, checkProp)) {
        throw Error("Error in setDirtyProp. State has no property: '".concat(prop, "'. This should never happen"));
      }
      this.dirtyProps.add(prop);
      if (Array.isArray(this.state[checkProp])) {
        this.state[checkProp].lastDirtyTimestamp = new Date().getTime();
      }
      if (queueHandleState) {
        queueStateChange(this, this.handleStateChanges.bind(this));
      }
    }
  }, {
    key: "handleStatePropDependencies",
    value: function handleStatePropDependencies(depStateProps) {
      var _this2 = this;
      var dependenciesMap = this.stateDependencies;
      var globalDependenciesMap = this === null || this === void 0 ? void 0 : this.globalStateDependencies;
      depStateProps.forEach(function (depStateProp) {
        handleStateDependency(_this2, depStateProp, _this2.appScope);
        // If it was a setter hook, it re-set the value of its equivalent state prop
        var changedStateProp = isSetterHook(depStateProp) ? depStateProp.substring(4) : depStateProp;
        if (dependenciesMap !== null && dependenciesMap !== void 0 && dependenciesMap.has(changedStateProp)) {
          var dependenciesSet = dependenciesMap.get(changedStateProp);
          var _sortDeps = sortDeps(dependenciesSet),
            _sortDeps2 = StateManager_slicedToArray(_sortDeps, 2),
            deps = _sortDeps2[0],
            setterDeps = _sortDeps2[1];
          if (setterDeps.size) {
            _this2.handleStatePropDependencies(setterDeps);
          }
          if (deps.size) {
            _this2.handleStatePropDependencies(deps);
          }
        }
        if (globalDependenciesMap !== null && globalDependenciesMap !== void 0 && globalDependenciesMap.has(changedStateProp)) {
          var globalDeps = globalDependenciesMap.get(changedStateProp);
          globalDeps.forEach(function (depsSet, localStateManager) {
            var _sortDeps3 = sortDeps(depsSet),
              _sortDeps4 = StateManager_slicedToArray(_sortDeps3, 2),
              deps = _sortDeps4[0],
              setterDeps = _sortDeps4[1];
            if (setterDeps.size) {
              localStateManager.handleStatePropDependencies(setterDeps);
            }
            if (deps.size) {
              localStateManager.handleStatePropDependencies(deps);
            }
          });
        }
      });
    }
  }, {
    key: "isGlobalState",
    value: function isGlobalState() {
      return !this.state.hasOwnProperty('_global');
    }

    // This sorts by order of execution,
    // according to the number of dependencies ("in-degrees"),
    // 0 runs first, then 1, and so on...
    // This is called: topological sort of a directed graph
  }, {
    key: "topologicalSortStateProps",
    value: function topologicalSortStateProps(stateProps) {
      var _this3 = this;
      return StateManager_toConsumableArray(stateProps).toSorted(function (a, b) {
        var _this3$stateDependenc, _this3$stateDependenc2;
        // If one prop is a sub-property of another, ensure the base property comes first
        if (a.startsWith(b + '.')) return 1;
        if (b.startsWith(a + '.')) return -1;

        // Otherwise, sort by dependency count
        return (((_this3$stateDependenc = _this3.stateDependencies[a]) === null || _this3$stateDependenc === void 0 ? void 0 : _this3$stateDependenc.size) || 0) - ((_this3$stateDependenc2 = _this3.stateDependencies[b]) === null || _this3$stateDependenc2 === void 0 ? void 0 : _this3$stateDependenc2.size) || 0;
      });
    }

    // This function uses handleStateChange which is passed to the class via its constructor (dependency injection),
    // it is the "bridge" between the State Manager to the "outside world"
  }, {
    key: "handleStateChanges",
    value: function handleStateChanges() {
      var _this4 = this;
      if (!this.dirtyProps.size) return;
      performance.mark("todo-topological-sort");
      var stateProps = this.topologicalSortStateProps(this.dirtyProps);
      this.dirtyProps.clear();
      var isLocal = !this.isGlobalState();
      var deps = new Set();
      var setterDeps = new Set();
      var globalDeps = new Set();
      var thisStateManager = this;
      var thisState = thisStateManager.state;
      stateProps.forEach(function (stateProp) {
        var _thisStateManager$sta;
        if (isSetterHook(stateProp)) {
          stateProp = stateProp.substring(4);
          var setterHook = thisState[stateProp];
          performance.mark("todo-call-setter-hook");
          var hasNewValue = callSetterHook(setterHook, stateProp, thisStateManager, _this4.appScope);
          if (hasNewValue) {
            _this4.handleStateChange(thisStateManager, stateProp, null);
          }
        } else {
          _this4.handleStateChange(thisStateManager, stateProp, null);
        }
        if (thisStateManager.stateDependencies.has(stateProp)) {
          thisStateManager.stateDependencies.get(stateProp).forEach(function (dep) {
            if (isSetterHook(dep)) setterDeps.add(dep);else deps.add(dep);
          });
        }
        var globalState = (_thisStateManager$sta = thisStateManager.state) === null || _thisStateManager$sta === void 0 ? void 0 : _thisStateManager$sta._global;
        if (globalState === GLOBAL_STATE_NOT_SET_YET) {
          globalState = _this4.appScope[GLOBAL_STATE_FUNCTION_NAME]();
        }
        if (globalState !== GLOBAL_STATE_NOT_SET_YET) {
          var _globalState;
          var globalStateManager = ((_globalState = globalState) === null || _globalState === void 0 ? void 0 : _globalState._stateManager) || thisStateManager;
          if (globalStateManager.globalStateDependencies.has(stateProp)) {
            globalDeps.add(globalStateManager.globalStateDependencies.get(stateProp));
          }
        }
      });
      if (setterDeps.size) {
        this.handleStatePropDependencies(setterDeps);
      }
      if (deps.size) {
        this.handleStatePropDependencies(deps);
      }
      if (globalDeps.size) {
        globalDeps.forEach(function (deps, localStateManager) {
          localStateManager.handleStatePropDependencies(deps);
        });
      }

      // If this is a "child-state", we mark the prop in the containing state as dirty.
      if (this.parentStateManager) {
        this.parentStateManager.setDirtyProp(this.parentStateProp);
      }
    }
  }, {
    key: "addStateDependency",
    value: function addStateDependency(stateProp, depStateProp) {
      if (!this.stateDependencies.has(stateProp)) {
        this.stateDependencies.set(stateProp, new Set());
      }
      this.stateDependencies.get(stateProp).add(depStateProp);
      if (Array.isArray(this.state[stateProp])) {
        this.addStateDependency("".concat(stateProp, ".length"), depStateProp);
      }
    }
  }, {
    key: "clearStateDependencies",
    value: function clearStateDependencies(stateProp) {
      if (this.stateDependencies.has(stateProp)) {
        this.stateDependencies.set(stateProp, new Set());
      }
    }

    // parent element is an element that have the "_map" command - 
    // expected to contain instances of customElementName that were created from an array of State objects
    /*
    addStateMap(stateProp, customElementName, parentElement) {
        if (!this.stateArrayMaps.hasOwnProperty(stateProp)) {
            this.stateArrayMaps[stateProp] = new Map();
        }
        this.stateArrayMaps[stateProp].set(parentElement, customElementName);
    }
    */

    // ConditionalElements mapped to stateProp
    //addConditionallyRenderingElements(stateProp, element) {
    //this.nodeManager.addConditionallyRenderingElements(stateProp, element);
    //}

    // In the DOM realm - Node here is either an Attribute Node or a Text Node
  }, {
    key: "addStateNode",
    value: function addStateNode(stateProp, stateNode) {
      this.nodeManager.addStateNode(stateProp, stateNode);
      /*
      if (!this.stateNodes.hasOwnProperty(stateProp)) {
          this.stateNodes[stateProp] = new Set();
      }
       this.stateNodes[stateProp].add(stateNode);
       // If this is an attribute node which is "bindable" (supported for the _bind command)
      // then we save a reference to its containing element
      if (SUPPORTED_ATTRIBUTES_FOR_BINDING.has(stateNode.nodeName)) {
          const bindaleAttributeStateNodes = this.nodeManager.bindableAttributesStateNodes.get(stateNode.nodeName);
          bindaleAttributeStateNodes.set(stateNode.originalOwnerElement, stateNode);
      }
      */
    }
  }, {
    key: "removeStateNode",
    value: function removeStateNode(stateProp, stateNode) {
      // this.stateNodes?.[stateProp].delete(stateNode);
      this.nodeManager.removeStateNode(stateProp, stateNode);
    }

    // statePropExpression can be a "literal" state property or a "state expression"
    // (See comment on parseStateExpression for reference)
  }, {
    key: "bindStatePropExpression",
    value: function bindStatePropExpression(statePropExpression, type, args) {
      if (!type || !args) {
        var _parseStateExpression = parseStateExpression(statePropExpression);
        var _parseStateExpression2 = StateManager_toArray(_parseStateExpression);
        type = _parseStateExpression2[0];
        args = _parseStateExpression2.slice(1);
      }
      var contextStateProp = args[0];
      if (!contextStateProp) {
        throw Error("Must specify state property name for State expression: ".concat(statePropExpression));
      }
      var stateObj = this.state;
      var descriptor = Object.getOwnPropertyDescriptor(stateObj, contextStateProp);
      if (!descriptor) {
        stateObj = stateObj._global;
        descriptor = Object.getOwnPropertyDescriptor(stateObj, contextStateProp);
      }
      if (!descriptor) {
        throw Error("Could not bind state property ".concat(contextStateProp, ". State property ").concat(contextStateProp, " not defined!"));
      }
      if (Object.hasOwn(stateObj, statePropExpression)) return stateObj[statePropExpression];
      var isValueProp = descriptor.hasOwnProperty('value');
      var stateManager = this;
      var getter;
      switch (type) {
        case "negation":
          {
            var relevantState = isValueProp ? stateManager.privateState : stateManager.state;
            getter = function getter() {
              return !relevantState[contextStateProp];
            };
            defineStateExpressionResolver(statePropExpression, stateObj, getter, contextStateProp);
            break;
          }
        case "equality":
          {
            var equalityValue = args[1];
            if (!equalityValue) {
              throw Error("Must specify equality value for equality expression (is_something:equalToThis)");
            }
            var _relevantState = isValueProp ? stateManager.privateState : stateManager.state;
            getter = function getter() {
              return _relevantState[contextStateProp] === equalityValue;
            };
            defineStateExpressionResolver(statePropExpression, stateObj, getter, contextStateProp);
            break;
          }
        case "ternary":
          {
            var truthyValue = args[1];
            if (!truthyValue) {
              throw Error("Ternary state expression (prop?truthy:falsy) must include at least a truthy value!");
            }
            var falsyValue = args[2];
            var _relevantState2 = isValueProp ? stateManager.privateState : stateManager.state;
            getter = falsyValue ? function () {
              return _relevantState2[contextStateProp] ? truthyValue : falsyValue;
            } : function () {
              return _relevantState2[contextStateProp] ? truthyValue : undefined;
            };
            defineStateExpressionResolver(statePropExpression, stateObj, getter, contextStateProp);
            break;
          }
      }
      return stateObj[statePropExpression];
    }

    // Used for DEBUGGING!
  }, {
    key: "getStateDependencies",
    value: function getStateDependencies() {
      return this.stateDependencies;
    }

    // This can be used to inject (DI) - "plugins" - extensions to the State Manager.
  }, {
    key: "use",
    value: function use(factoryFunction, pluginName) {
      factoryFunction.call(this);
      StateManager_classPrivateFieldGet(_plugins, this).add(pluginName);
    }
  }, {
    key: "isUsing",
    value: function isUsing(pluginName) {
      return StateManager_classPrivateFieldGet(_plugins, this).has(pluginName);
    }
  }]);
}();
/* harmony default export */ const Cougar_StateManager = (StateManager);
;// ./src/core/ReactiveCustomElement.js
function ReactiveCustomElement_createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = ReactiveCustomElement_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function ReactiveCustomElement_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return ReactiveCustomElement_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ReactiveCustomElement_arrayLikeToArray(r, a) : void 0; } }
function ReactiveCustomElement_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ReactiveCustomElement_typeof(o) { "@babel/helpers - typeof"; return ReactiveCustomElement_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ReactiveCustomElement_typeof(o); }
function ReactiveCustomElement_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function ReactiveCustomElement_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, ReactiveCustomElement_toPropertyKey(o.key), o); } }
function ReactiveCustomElement_createClass(e, r, t) { return r && ReactiveCustomElement_defineProperties(e.prototype, r), t && ReactiveCustomElement_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function ReactiveCustomElement_callSuper(t, o, e) { return o = ReactiveCustomElement_getPrototypeOf(o), ReactiveCustomElement_possibleConstructorReturn(t, ReactiveCustomElement_isNativeReflectConstruct() ? Reflect.construct(o, e || [], ReactiveCustomElement_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function ReactiveCustomElement_possibleConstructorReturn(t, e) { if (e && ("object" == ReactiveCustomElement_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return ReactiveCustomElement_assertThisInitialized(t); }
function ReactiveCustomElement_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function ReactiveCustomElement_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (ReactiveCustomElement_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function ReactiveCustomElement_get() { return ReactiveCustomElement_get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = ReactiveCustomElement_superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, ReactiveCustomElement_get.apply(null, arguments); }
function ReactiveCustomElement_superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = ReactiveCustomElement_getPrototypeOf(t));); return t; }
function ReactiveCustomElement_getPrototypeOf(t) { return ReactiveCustomElement_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, ReactiveCustomElement_getPrototypeOf(t); }
function ReactiveCustomElement_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && ReactiveCustomElement_setPrototypeOf(t, e); }
function ReactiveCustomElement_setPrototypeOf(t, e) { return ReactiveCustomElement_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, ReactiveCustomElement_setPrototypeOf(t, e); }
function _classPrivateMethodInitSpec(e, a) { ReactiveCustomElement_checkPrivateRedeclaration(e, a), a.add(e); }
function ReactiveCustomElement_classPrivateFieldInitSpec(e, t, a) { ReactiveCustomElement_checkPrivateRedeclaration(e, t), t.set(e, a); }
function ReactiveCustomElement_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function ReactiveCustomElement_defineProperty(e, r, t) { return (r = ReactiveCustomElement_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function ReactiveCustomElement_toPropertyKey(t) { var i = ReactiveCustomElement_toPrimitive(t, "string"); return "symbol" == ReactiveCustomElement_typeof(i) ? i : i + ""; }
function ReactiveCustomElement_toPrimitive(t, r) { if ("object" != ReactiveCustomElement_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != ReactiveCustomElement_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function ReactiveCustomElement_classPrivateFieldGet(s, a) { return s.get(ReactiveCustomElement_assertClassBrand(s, a)); }
function ReactiveCustomElement_classPrivateFieldSet(s, a, r) { return s.set(ReactiveCustomElement_assertClassBrand(s, a), r), r; }
function ReactiveCustomElement_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }





var COMPONENT_CSS = new CSSStyleSheet();
COMPONENT_CSS.replaceSync("\n    :host { contain: layout paint; }");

// Lifecycle:
// init: constructor
// mount: connectedCallback
// stateful: state is active
// active: stateful, events bound and after all commands run
// unmount: disconnectedCallback
function getReactiveCustomElementClass() {
  var appScope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var ReactiveHTMLElement = extendElementClassWithReactiveElementClass(HTMLElement, appScope);
  var StateManager = appScope.SPROUT_CONFIG.stateManagerClass;
  var _wasMounted = /*#__PURE__*/new WeakMap();
  var _lifecycle = /*#__PURE__*/new WeakMap();
  var _templateContent = /*#__PURE__*/new WeakMap();
  var _stylesheet = /*#__PURE__*/new WeakMap();
  var _globalStylesheet = /*#__PURE__*/new WeakMap();
  var _eventHandler = /*#__PURE__*/new WeakMap();
  var _useDSD = /*#__PURE__*/new WeakMap();
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
      _classPrivateMethodInitSpec(_this, _ReactiveCustomElement_brand);
      // Should contain the "root" custom element containing this element, or null if this is a top-most parent
      ReactiveCustomElement_defineProperty(_this, "host", null);
      // If this is part of a "mapped element" (an element where each child is mapped to a state item in an array),
      // created using the _map command - then this will contain the parent element
      ReactiveCustomElement_defineProperty(_this, "ownerMapElement", void 0);
      // A State Manager - defaults to Cougar
      ReactiveCustomElement_defineProperty(_this, "state", void 0);
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _wasMounted, false);
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _lifecycle, {
        init: null,
        mount: null,
        stateful: null,
        active: null,
        unmount: null
      });
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _templateContent, void 0);
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _stylesheet, void 0);
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _globalStylesheet, void 0);
      // This will be an object where keys are element "ref" names,
      // and the value is either a "click" event handler (if it's a function),
      // or an object with DOM event names as keys and event handlers as functions.
      // Only relevant for non native custom elements - event bubbling from child elements will be used
      ReactiveCustomElement_defineProperty(_this, "events", void 0);
      // A "mapped" version of events, where keys are event names and value
      // is a map where keys are ref target names and values are event handler function
      ReactiveCustomElement_defineProperty(_this, "eventsMap", new Map());
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _eventHandler, void 0);
      // These are attributes of child elements that are bound to "Prop Attributes",
      // Keys are attribute names, and values are set of Attribute Nodes
      ReactiveCustomElement_defineProperty(_this, "propAttributes", new Map());
      // Uses Declrative Shadow DOM
      ReactiveCustomElement_classPrivateFieldInitSpec(_this, _useDSD, false);
      var isFrameworkElement = _this.tagName === "CONDITIONAL-ELEMENT";
      if (isFrameworkElement) return ReactiveCustomElement_possibleConstructorReturn(_this);
      _this.isNativeElement = false;
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
      if (_this.tagName.indexOf('DSD') > -1) {
        ReactiveCustomElement_classPrivateFieldSet(_useDSD, _this, true);
      }
      if (!ReactiveCustomElement_classPrivateFieldGet(_useDSD, _this)) {
        ReactiveCustomElement_classPrivateFieldSet(_templateContent, _this, (template === null || template === void 0 ? void 0 : template.cloneNode(true)) || DEFAULT_TEMPLATE_DOM.cloneNode());
      }
      // Maps "ref names" to actual elements i the component DOM tree,
      // for fast access.
      _this.ref = {};
      if (ReactiveCustomElement_classPrivateFieldGet(_lifecycle, _this).init) ReactiveCustomElement_classPrivateFieldGet(_lifecycle, _this).init.call(_this);
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
        this.isActive = false;
        if (ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this).unmount) ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this).unmount.call(this);
      }
    }, {
      key: "activate",
      value: function activate() {
        /*
        const attributeNames = this.getAttributeNames();
        for (const attrName of attributeNames) {
            const attrValue = this.getAttribute(attrName);
            // This also resolves "State attributes"
            this.initialSetAttribute(attrName, attrValue);
        }
        */
        ReactiveCustomElement_get(ReactiveCustomElement_getPrototypeOf(ReactiveCustomElement.prototype), "activate", this).call(this);
        queueBindEvents(this, ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, this, _bindEvents).bind(this));
        if (ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this).active) ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this).active.call(this);
        //if (this.#onMount) queueMicrotask(()=> this.#onMount.call(this, appScope[GLOBAL_STATE_FUNCTION_NAME]()));
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;
        if (ReactiveCustomElement_classPrivateFieldGet(_wasMounted, this)) return;
        // IMPORTANT: THIS *CAN* be NULL, DO NOT CHANGE IT!
        // It is part of the way a check is made to see if an element is part of ShadowDOM!
        // host will be null if the element is part of the DOM === the "root" custom element will have null in .host
        // THIS SHOULD BE THE FIRST THING THAT HAPPENS!
        this.host = this.getRootNode().host;
        if (ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this).mount) ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this).mount.call(this);
        if (!ReactiveCustomElement_classPrivateFieldGet(_useDSD, this)) {
          ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, this, _renderTemplate).call(this);
        }
        var doActivate = function doActivate() {
          ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, _this2, _setActiveStateFromInitialState).call(_this2);
          _this2.isActive = true;
          _this2.dispatchEvent(new CustomEvent("active"));
          if (ReactiveCustomElement_classPrivateFieldGet(_lifecycle, _this2).stateful) ReactiveCustomElement_classPrivateFieldGet(_lifecycle, _this2).stateful.call(_this2);
          _this2.activate();
        };
        // Custom Elements can also be inside 
        // the Shadow DOM of other custom elements,
        // in which case - we need to wait for their host to be active first
        // We async queue using setTimeout (NOT rAF or queueMicrotrask!) -
        // To allow full paint of the elements to finish first,
        // and then hydrate
        if (this.host) {
          if (this.host.isActive) doActivate();else this.host.addEventListener("active", doActivate, {
            once: true
          });
        } else {
          setTimeout(doActivate, 0);
        }
        ReactiveCustomElement_classPrivateFieldSet(_wasMounted, this, true);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attributeName, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (attributeName === "hidden") {
          if (newValue === null) {
            this.dispatchEvent(new CustomEvent("unhide", {
              bubbles: true
            }));
          } else {
            this.dispatchEvent(new CustomEvent("hide", {
              bubbles: true
            }));
          }
        }
        if (this.propAttributes.has(attributeName)) {
          var propAttributeNodes = this.propAttributes.get(attributeName);
          propAttributeNodes.forEach(function (attrNode) {
            attrNode.nodeValue = newValue;
            if (attrNode.ownerElement.tagName === "CONDITIONAL-RENDER") {
              attrNode.ownerElement.render();
            }
          });
        }
      }
    }]);
  }(ReactiveHTMLElement);
  function _setRuntime(runtime) {
    var _this3 = this;
    if (runtime.events) {
      var setRefEvent = function setRefEvent(eventName, refName, eventHandler) {
        if (!_this3.eventsMap.has(eventName)) {
          _this3.eventsMap.set(eventName, new Map());
        }
        var eventMapItem = _this3.eventsMap.get(eventName);
        eventMapItem.set(refName, eventHandler);
      };
      var eventsObjectValue, typeOfValue;
      for (var refName in runtime.events) {
        eventsObjectValue = runtime.events[refName];
        typeOfValue = ReactiveCustomElement_typeof(eventsObjectValue);
        if (typeOfValue === "function") {
          setRefEvent("click", refName, eventsObjectValue);
        } else if (typeOfValue === "object") {
          for (var eventName in eventsObjectValue) {
            setRefEvent(eventName, refName, eventsObjectValue[eventName]);
          }
        }
      }
      if (this.isConnected) ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, this, _bindEvents).call(this);
    }
    if (runtime.state) {
      this.setInitialState(runtime.state);
      // If this is not mounted yet, #setStateFromInitialState will be called from onConnected callback
      if (this.isConnected) ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, this, _setActiveStateFromInitialState).call(this);
    }
    for (var lifecycleEvent in ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this)) {
      if (runtime.hasOwnProperty(lifecycleEvent)) {
        ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this)[lifecycleEvent] = runtime[lifecycleEvent];
      }
    }
  }
  function _setActiveStateFromInitialState() {
    if (!this.initialState) return;
    var initialState = this.initialState;
    if (initialState._stateManager) {
      this.state = initialState._stateManager.state;
    } else {
      var stateManager = newStateManager(initialState, undefined, undefined, handleStateChange, false, appScope);
      this.state = stateManager.state;
    }
    // delete this.initialState;
    this.state._isActive = true;
  }
  function _renderTemplate() {
    if (appScope.SPROUT_CONFIG.useShadow) {
      this.attachShadow({
        mode: "open"
      });
      this.shadowRoot.adoptedStyleSheets = [COMPONENT_CSS];
      if (ReactiveCustomElement_classPrivateFieldGet(_globalStylesheet, this)) this.shadowRoot.adoptedStyleSheets.push(ReactiveCustomElement_classPrivateFieldGet(_globalStylesheet, this));
      if (ReactiveCustomElement_classPrivateFieldGet(_stylesheet, this)) this.shadowRoot.adoptedStyleSheets.push(ReactiveCustomElement_classPrivateFieldGet(_stylesheet, this));
      this.shadowRoot.appendChild(ReactiveCustomElement_classPrivateFieldGet(_templateContent, this));
    } else {
      var fragment = new DocumentFragment();
      fragment.appendChild(ReactiveCustomElement_classPrivateFieldGet(_templateContent, this));
      this.appendChild(fragment);
    }
  }
  function _unbindEvents() {
    if (!this.eventsMap.size) return;
    var thiselement = this;
    var _iterator = ReactiveCustomElement_createForOfIteratorHelper(this.eventsMap.keys()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var eventName = _step.value;
        thiselement.removeEventListener(eventName, ReactiveCustomElement_classPrivateFieldGet(_eventHandler, this), false);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  function _bindEvents() {
    if (!this.eventsMap.size) return;
    var globalState = appScope[GLOBAL_STATE_FUNCTION_NAME]();
    ReactiveCustomElement_classPrivateFieldSet(_eventHandler, this, function (event) {
      var eventsMapItem = this.eventsMap.get(event.type);

      // This is for getting the "target element" inside shadow DOM,
      // from a custom element host
      var composedPath = event.composedPath();
      var _iterator2 = ReactiveCustomElement_createForOfIteratorHelper(composedPath),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var targetElement = _step2.value;
          if (eventsMapItem.has(targetElement.refName)) {
            var eventHandler = eventsMapItem.get(targetElement.refName);
            eventHandler.call(targetElement, event, this, globalState);
          }
          if (targetElement === this) break;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    });
    var _iterator3 = ReactiveCustomElement_createForOfIteratorHelper(this.eventsMap.keys()),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var eventName = _step3.value;
        this.addEventListener(eventName, ReactiveCustomElement_classPrivateFieldGet(_eventHandler, this));
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  return ReactiveCustomElement;
}
;// ./src/core/ConditionalElement.js
function ConditionalElement_typeof(o) { "@babel/helpers - typeof"; return ConditionalElement_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, ConditionalElement_typeof(o); }
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
function ConditionalElement_callSuper(t, o, e) { return o = ConditionalElement_getPrototypeOf(o), ConditionalElement_possibleConstructorReturn(t, ConditionalElement_isNativeReflectConstruct() ? Reflect.construct(o, e || [], ConditionalElement_getPrototypeOf(t).constructor) : o.apply(t, e)); }
function ConditionalElement_possibleConstructorReturn(t, e) { if (e && ("object" == ConditionalElement_typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return ConditionalElement_assertThisInitialized(t); }
function ConditionalElement_assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function ConditionalElement_isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (ConditionalElement_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function ConditionalElement_getPrototypeOf(t) { return ConditionalElement_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, ConditionalElement_getPrototypeOf(t); }
function ConditionalElement_inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && ConditionalElement_setPrototypeOf(t, e); }
function ConditionalElement_setPrototypeOf(t, e) { return ConditionalElement_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, ConditionalElement_setPrototypeOf(t, e); }
function ConditionalElement_defineProperty(e, r, t) { return (r = ConditionalElement_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function ConditionalElement_toPropertyKey(t) { var i = ConditionalElement_toPrimitive(t, "string"); return "symbol" == ConditionalElement_typeof(i) ? i : i + ""; }
function ConditionalElement_toPrimitive(t, r) { if ("object" != ConditionalElement_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != ConditionalElement_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function ConditionalElement_classPrivateFieldInitSpec(e, t, a) { ConditionalElement_checkPrivateRedeclaration(e, t), t.set(e, a); }
function ConditionalElement_checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function ConditionalElement_classPrivateFieldSet(s, a, r) { return s.set(ConditionalElement_assertClassBrand(s, a), r), r; }
function ConditionalElement_classPrivateFieldGet(s, a) { return s.get(ConditionalElement_assertClassBrand(s, a)); }
function ConditionalElement_assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }





// returns a Boolean according to the conditional equality of conditional to conditionStateValue
function resolveCondition(operator, value, conditionStateValue) {
  if (operator === "always") return true;
  switch (operator) {
    case '==':
      return conditionStateValue == value;
    case '===':
      return conditionStateValue === value;
    case '!=':
      return conditionStateValue != value;
    case '!==':
      return conditionStateValue !== value;
    case '<':
      return conditionStateValue < value;
    case '<=':
      return conditionStateValue <= value;
    case '>':
      return conditionStateValue > value;
    case '>=':
      return conditionStateValue >= value;
    default:
      return conditionStateValue == value;
  }
}
function getConditionalElementClass(ReactiveElementClass) {
  var _isConditionStateProp = /*#__PURE__*/new WeakMap();
  var _conditionProp = /*#__PURE__*/new WeakMap();
  var _renderMap = /*#__PURE__*/new WeakMap();
  var ConditionalElement = /*#__PURE__*/function (_ReactiveElementClass) {
    function ConditionalElement() {
      var _this;
      ConditionalElement_classCallCheck(this, ConditionalElement);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = ConditionalElement_callSuper(this, ConditionalElement, [].concat(args));
      ConditionalElement_classPrivateFieldInitSpec(_this, _isConditionStateProp, void 0);
      ConditionalElement_classPrivateFieldInitSpec(_this, _conditionProp, void 0);
      ConditionalElement_classPrivateFieldInitSpec(_this, _renderMap, void 0);
      return _this;
    }
    ConditionalElement_inherits(ConditionalElement, _ReactiveElementClass);
    return ConditionalElement_createClass(ConditionalElement, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        var isFirstRender = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var conditionValue;
        if (ConditionalElement_classPrivateFieldGet(_isConditionStateProp, this)) {
          conditionValue = this.getState(ConditionalElement_classPrivateFieldGet(_conditionProp, this));
          if (conditionValue === undefined) {
            throw Error("State value for ".concat(ConditionalElement_classPrivateFieldGet(_conditionProp, this), " not found while rendering conditional-render element:"), this);
          }
        } else {
          conditionValue = this.getAttribute('_condition');
          if (conditionValue === undefined) {
            throw Error("_condition value not found while rendering conditional-render element:", this);
          }
        }
        var elementsToRender = [];
        ConditionalElement_classPrivateFieldGet(_renderMap, this).forEach(function (_ref) {
          var condition = _ref.condition,
            elements = _ref.elements;
          var operator = condition.operator,
            value = condition.value;
          if (resolveCondition(operator, value, conditionValue)) {
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

      // Groups elements to render according to conditional expressions (operation + condition)
    }, {
      key: "generateRenderMap",
      value: function generateRenderMap() {
        var renderMap = new Map();
        renderMap.set("always", []);
        var children = ConditionalElement_toConsumableArray(this.children);
        children.forEach(function (conditionalChild) {
          var _if = conditionalChild.getAttribute('_if').replaceAll(' ', '');
          if (_if) {
            if (!renderMap.has(_if)) {
              var _cond$trim$split = cond.trim().split(CONDITIONAL_OPERATORS_REGEX),
                _cond$trim$split2 = ConditionalElement_slicedToArray(_cond$trim$split, 3),
                operator = _cond$trim$split2[1],
                value = _cond$trim$split2[2];
              var normalizedValue = attributeValueToTypedValue(value);
              var conditionObj = {
                operator: operator,
                value: normalizedValue
              };
              renderMap.set(_if, {
                condition: conditionObj,
                elements: [conditionalChild]
              });
            } else {
              renderMap.get(_if).elements.push(conditionalChild);
            }
          } else {
            renderMap.get("always").elements.push(conditionalChild);
          }
        });
        ConditionalElement_classPrivateFieldSet(_renderMap, this, renderMap);
      }
    }, {
      key: "activate",
      value: function activate() {
        var condition = this.getAttribute("_condition");
        if (!condition) {
          throw Error("conditional-render elements must have a _condition attribute!");
        }
        if (condition.indexOf('@') === 0) {
          bindPropAttribute.call(this, "_condition", condition);
          ConditionalElement_classPrivateFieldSet(_isConditionStateProp, this, false);
          ConditionalElement_classPrivateFieldSet(_conditionProp, this, condition.substring(1));
        } else {
          ConditionalElement_classPrivateFieldSet(_isConditionStateProp, this, true);
          ConditionalElement_classPrivateFieldSet(_conditionProp, this, condition);
        }
        if (!this.children || !this.children.length) {
          console.warn("Conditional element doesn't have any children!");
        }
        if (ConditionalElement_classPrivateFieldGet(_isConditionStateProp, this)) {
          var statePropName = ConditionalElement_classPrivateFieldGet(_conditionProp, this);
          var _this$getState = this.getState(statePropName, true),
            _this$getState2 = ConditionalElement_slicedToArray(_this$getState, 2),
            stateValue = _this$getState2[0],
            stateObject = _this$getState2[1];
          if (ConditionalElement_typeof(stateValue) === undefined) {
            throw Error("State property ".concat(statePropName, " not defined for _condition command!"));
          }
          var stateManager = stateObject._stateManager;
          if (!stateManager.has("conditional-element")) stateManager.use(conditionalElements, 'conditional-element');
          stateManager.addConditionallyRenderingElements(statePropName, this);
          this.generateRenderMap();
          this.render(true);
        } else {
          this.render(true);
        }
      }
    }]);
  }(ReactiveElementClass);
  ConditionalElement_defineProperty(ConditionalElement, "observedAttributes", ["_condition"]);
  return ConditionalElement;
}
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
            templateContent = template.content;
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

            // Also define the -dsd variation - to support Declartive Shadow DOM
            customElements.define("".concat(elemName, "-dsd"), /*#__PURE__*/function (_appScope$ReactiveCus2) {
              function _class2() {
                build_classCallCheck(this, _class2);
                return build_callSuper(this, _class2, [templateContent, runtime, style === null || style === void 0 ? void 0 : style.textContent, globalStylesheet]);
              }
              build_inherits(_class2, _appScope$ReactiveCus2);
              return build_createClass(_class2);
            }(appScope.ReactiveCustomElement));
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _defineCustomElementFromTemplate.apply(this, arguments);
  }
  function build() {
    var globalStylesheet = new CSSStyleSheet();
    var globalStyle = document.querySelector("head > style[app=\"".concat(appName, "\"]"));
    if (globalStyle) {
      globalStylesheet.replaceSync(globalStyle.textContent);
    } else {
      globalStylesheet.replaceSync("");
    }
    // This is used when mutating the children of a DOM parent (on-the-fly),
    // the parent is "frozen" first - to not trigger events etc.
    // Used when handling changes to State Maps
    globalStylesheet.insertRule(SPROUT_FROZEN_CLASS_CSS);
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
function core_toConsumableArray(r) { return core_arrayWithoutHoles(r) || core_iterableToArray(r) || core_unsupportedIterableToArray(r) || core_nonIterableSpread(); }
function core_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function core_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return core_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? core_arrayLikeToArray(r, a) : void 0; } }
function core_iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function core_arrayWithoutHoles(r) { if (Array.isArray(r)) return core_arrayLikeToArray(r); }
function core_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }









var allowAppScopeAccess = true; //document.currentScript.hasAttribute("allowappscopeaccess");
var strict = document.currentScript.hasAttribute("strict");
var stateManagerClass = Cougar_StateManager;
var config = {
  useShadow: true,
  // Always use shadow DOM for now, may add configurability later
  allowAppScopeAccess: allowAppScopeAccess,
  strict: strict,
  stateManagerClass: stateManagerClass
};
if (config.allowAppScopeAccess) {
  Object.defineProperty(globalThis, "sproutApps", {
    value: {},
    writable: false
  });
}
var SproutStylesheet = new CSSStyleSheet();
SproutStylesheet.replaceSync(SPROUT_FROZEN_CLASS_CSS);
document.adoptedStyleSheets = [].concat(core_toConsumableArray(document.adoptedStyleSheets), [SproutStylesheet]);
globalThis.SproutInitApp = function (appName) {
  var appScope = function () {
    var _window;
    return {
      window: window,
      document: (_window = window) === null || _window === void 0 ? void 0 : _window.document
    };
  }(window);
  if (config.allowAppScopeAccess) {
    Object.defineProperty(globalThis.sproutApps, appName, {
      value: appScope,
      writable: false
    });
  }
  if (config.strict) {
    Object.defineProperty(globalThis, "sprout_isStrictMode", strict);
  }
  appScope.SPROUT_CONFIG = Object.seal(config);

  // Prevent "hasOwnProperty" shenanigans
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  setHiddenProperty(Object.prototype, "hasOwnProperty", hasOwnProperty);
  appScope[GLOBAL_STATE_FUNCTION_NAME] = function () {
    return GLOBAL_STATE_NOT_SET_YET;
  };
  // If initialState is passed - also sets it to global state
  appScope.setGlobalState = function () {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // const globalState =  //new appScope.SPROUT_CONFIG.stateManagerClass(initialState, undefined, undefined, handleStateChange, true, appScope).state;
    var globalState = newStateManager(initialState, undefined, undefined, handleStateChange, true, appScope).state;
    var globalStateVarName = GLOBAL_STATE_VAR_NAME;
    Object.defineProperty(appScope, globalStateVarName, {
      value: globalState,
      writable: false,
      configurable: false
    });
    Object.defineProperty(appScope, GLOBAL_STATE_FUNCTION_NAME, {
      value: function value() {
        return appScope[globalStateVarName];
      }
    });
    return appScope[globalStateVarName];
  };
  appScope.setCommands = function () {
    var commands = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Object.defineProperty(appScope, "appCommands", {
      value: commands,
      writable: false,
      configurable: false
    });
  };
  var HTML_REACTIVE_ELEMENT_CLASSES = {};
  HTML_ELEMENT_CLASSES_MAP.forEach(function (elementDefinition) {
    return HTML_REACTIVE_ELEMENT_CLASSES[elementDefinition.element] = extendElementClassWithReactiveElementClass(elementDefinition["class"], appScope, true);
  });
  appScope.ReactiveCustomElement = getReactiveCustomElementClass(appScope);

  // Extend specific HTMLElement classes to enable reactivity (use it by adding an "is" attribute to an element)
  HTML_ELEMENT_CLASSES_MAP.forEach(function (itemDefinition) {
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
  var ReactiveInputClass = extendElementClassWithReactiveElementClass(HTMLInputElement, appScope, true);
  customElements.define('reactive-input', ReactiveInputClass, {
    "extends": "input"
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