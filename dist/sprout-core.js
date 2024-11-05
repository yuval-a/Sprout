/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/build/index.js":
/*!****************************!*\
  !*** ./src/build/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// This is the script that takes Template elements from the page and defines Reactive Custom Elements
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(appScope, appName) {
  // Create custom elements from templates
  function defineElementFromTemplate(_x, _x2, _x3) {
    return _defineElementFromTemplate.apply(this, arguments);
  }
  function _defineElementFromTemplate() {
    _defineElementFromTemplate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(template, elemName, globalStylesheet) {
      var templateContent, style, runtime;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            templateContent = document.importNode(template.content, true);
            style = templateContent.querySelector('style');
            if (style) templateContent.removeChild(style);
            runtime = templateContent.querySelector('script');
            if (runtime) templateContent.removeChild(runtime);
            customElements.define(elemName, /*#__PURE__*/function (_appScope$ReactiveEle) {
              function _class() {
                _classCallCheck(this, _class);
                return _callSuper(this, _class, [templateContent, runtime, style === null || style === void 0 ? void 0 : style.textContent, globalStylesheet]);
              }
              _inherits(_class, _appScope$ReactiveEle);
              return _createClass(_class);
            }(appScope.ReactiveElement));
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _defineElementFromTemplate.apply(this, arguments);
  }
  function build() {
    var globalStylesheet;
    var globalStyle = document.querySelector("head > style[app=\"".concat(appName, "\"]"));
    if (globalStyle) {
      globalStylesheet = new CSSStyleSheet();
      globalStylesheet.replaceSync(globalStyle.textContent);
    }
    Array.prototype.forEach.call(document.querySelectorAll("template[app=\"".concat(appName, "\"]")), function (template) {
      defineElementFromTemplate(template, template.getAttribute('for'), globalStylesheet);
    });
    if (typeof globalThis["".concat(appName, "_runtime")] === 'function') {
      var globalRuntimeFunction = globalThis["".concat(appName, "_runtime")];
      globalRuntimeFunction.call(appScope);
    }
  }
  build();
}

/***/ }),

/***/ "./src/core/DOM_utils.js":
/*!*******************************!*\
  !*** ./src/core/DOM_utils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isElementAList: () => (/* binding */ isElementAList)
/* harmony export */ });
function isElementAList(element) {
  return element.tagName === "OL" || element.tagName === "UL";
}

/***/ }),

/***/ "./src/core/ReactiveElement.js":
/*!*************************************!*\
  !*** ./src/core/ReactiveElement.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extendElementClassWithReactiveElementClass: () => (/* binding */ extendElementClassWithReactiveElementClass)
/* harmony export */ });
/* harmony import */ var _commands_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commands.js */ "./src/core/commands.js");
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts.js */ "./src/core/consts.js");
/* harmony import */ var _state_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state_utils.js */ "./src/core/state_utils.js");
/* harmony import */ var _StateManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StateManager.js */ "./src/core/StateManager.js");
/* harmony import */ var _debug_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./debug_utils.js */ "./src/core/debug_utils.js");
/* harmony import */ var _paint_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./paint_utils.js */ "./src/core/paint_utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }







function extendElementClassWithReactiveElementClass(elementClass) {
  var appScope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  var noRender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var _onMount = /*#__PURE__*/new WeakMap();
  var _wasMounted = /*#__PURE__*/new WeakMap();
  var _boundAttributesToState = /*#__PURE__*/new WeakMap();
  var _templateContent = /*#__PURE__*/new WeakMap();
  var _stylesheet = /*#__PURE__*/new WeakMap();
  var _globalStylesheet = /*#__PURE__*/new WeakMap();
  var _events = /*#__PURE__*/new WeakMap();
  var _boundEventNames = /*#__PURE__*/new WeakMap();
  var _eventHandler = /*#__PURE__*/new WeakMap();
  var _changeEventHandler = /*#__PURE__*/new WeakMap();
  var _ReactiveElement_brand = /*#__PURE__*/new WeakSet();
  var ReactiveElement = /*#__PURE__*/function (_elementClass) {
    function ReactiveElement() {
      var _this;
      var template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var runtimeScript = arguments.length > 1 ? arguments[1] : undefined;
      var style = arguments.length > 2 ? arguments[2] : undefined;
      var globalStylesheet = arguments.length > 3 ? arguments[3] : undefined;
      _classCallCheck(this, ReactiveElement);
      _this = _callSuper(this, ReactiveElement);
      _classPrivateMethodInitSpec(_this, _ReactiveElement_brand);
      // Should contain the "root" DOM element containing this element
      _defineProperty(_this, "host", null);
      // Callback function for when the element is connected to a DOM tree on the page
      _classPrivateFieldInitSpec(_this, _onMount, void 0);
      _classPrivateFieldInitSpec(_this, _wasMounted, false);
      // Used for the _bind command, which allows "reverse-binding" attribute values to state props,
      // keys are attribute names, values are state prop names
      _classPrivateFieldInitSpec(_this, _boundAttributesToState, {});
      // Should only be used on non native custom elements
      _classPrivateFieldInitSpec(_this, _templateContent, void 0);
      _classPrivateFieldInitSpec(_this, _stylesheet, void 0);
      _classPrivateFieldInitSpec(_this, _globalStylesheet, void 0);
      // This will be an object where keys are element "ref" names,
      // and the value is either a "click" event handler (if it's a function),
      // or an object with DOM event names as keys and event handlers as functions.
      // Only relevant for non native custom elements - event bubbling from child elements will be used
      _classPrivateFieldInitSpec(_this, _events, void 0);
      // Name of events that are bound to the main event handler function
      _classPrivateFieldInitSpec(_this, _boundEventNames, []);
      // Main event handler function 
      _classPrivateFieldInitSpec(_this, _eventHandler, void 0);
      // Special case to handle input change events (to make them bubble up from shadow DOM)
      _classPrivateFieldInitSpec(_this, _changeEventHandler, void 0);
      _this.isReactiveElement = true;
      _this.isNativeElement = _this.hasAttribute("is");
      if (!_this.isNativeElement) {
        if (runtimeScript) {
          var dynamicRuntimeFn = new Function(runtimeScript.textContent);
          var runtime = dynamicRuntimeFn();
          _assertClassBrand(_ReactiveElement_brand, _this, _setRuntime).call(_this, runtime);
        }
        // Should already be a DocumentFragment of the template
        if (template) {
          _classPrivateFieldSet(_templateContent, _this, template.cloneNode(true));
        } else {
          _classPrivateFieldSet(_templateContent, _this, _consts_js__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TEMPLATE_DOM.cloneNode());
        }
        if (style) {
          var stylesheet = new CSSStyleSheet();
          stylesheet.replaceSync(style);
          _classPrivateFieldSet(_stylesheet, _this, stylesheet);
        }
        if (globalStylesheet) {
          _classPrivateFieldSet(_globalStylesheet, _this, globalStylesheet);
        }
        // Maps "ref names" to actual elements in the component DOM tree,
        // for fast access.
        _this.ref = {};
      }
      return _this;
    }
    _inherits(ReactiveElement, _elementClass);
    return _createClass(ReactiveElement, [{
      key: "setInitialState",
      value: function setInitialState(initState) {
        if (this.initialState) {
          Object.assign(this.initialState, initState);
        } else {
          this.initialState = initState;
        }
      }
    }, {
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
          _this$getState2 = _slicedToArray(_this$getState, 2),
          stateValue = _this$getState2[0],
          theState = _this$getState2[1];
        if (stateValue !== newValue) theState[stateProp] = newValue;
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this$host;
        var host = (_this$host = this.host) !== null && _this$host !== void 0 ? _this$host : this;
        if (host.ref) {
          var thisRefName = this.getAttribute('ref');
          if (thisRefName) delete host.ref[thisRefName];
        }
        _classPrivateFieldSet(_boundAttributesToState, this, {});
        _assertClassBrand(_ReactiveElement_brand, this, _unbindEvents).call(this);
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;
        if (_classPrivateFieldGet(_wasMounted, this)) return;
        if (!this.isNativeElement) {
          _assertClassBrand(_ReactiveElement_brand, this, _setActiveStateFromInitialState).call(this);
        }

        // IMPORTANT: THIS *CAN* be NULL, DO NOT CHANGE IT!
        // It is part of the way a check is made to see if an element is part of ShadowDOM!
        // host will be null if the element is part of the DOM === the "root" custom element will have null in .host
        this.host = this.getRootNode().host;

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
        if (!this.isNativeElement && !noRender) {
          _assertClassBrand(_ReactiveElement_brand, this, _renderTemplate).call(this);
        }
        var commands = [];
        var _iterator = _createForOfIteratorHelper(this.getAttributeNames()),
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
              // COMMAND_ATTRIBUTES[command]?.call(this, attrValue);
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
          (_COMMAND_ATTRIBUTES$c = _commands_js__WEBPACK_IMPORTED_MODULE_0__.COMMANDS[command]) === null || _COMMAND_ATTRIBUTES$c === void 0 || _COMMAND_ATTRIBUTES$c.call(_this2, args);
        });
        if (!this.isNativeElement) {
          (0,_paint_utils_js__WEBPACK_IMPORTED_MODULE_5__.queueBindEvents)(this, function () {
            return _assertClassBrand(_ReactiveElement_brand, _this2, _bindEvents).call(_this2);
          });
          if (_classPrivateFieldGet(_onMount, this)) queueMicrotask(function () {
            return _classPrivateFieldGet(_onMount, _this2).call(_this2, appScope[_consts_js__WEBPACK_IMPORTED_MODULE_1__.GLOBAL_STATE_FUNCTION_NAME]());
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
          globalState = appScope[_consts_js__WEBPACK_IMPORTED_MODULE_1__.GLOBAL_STATE_FUNCTION_NAME]();
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
        var host = this.isNativeElement ? this.host : this;
        // if Shadow DOM is used, the "root" element is shadowRoot, otherwise it is the 
        // web component itself
        var root = host;
        if (appScope.SPROUT_CONFIG.useShadow) {
          root = host.shadowRoot;
        }
        return host.ref.hasOwnProperty(refName) ? host.ref[refName] : root.querySelector("[ref=\"".concat(refName, "\"]"));
      }
      //static get observedAttributes() { return ["todo-name"]; }
    }]);
  }(elementClass); // The "initialSetX" functions are called:
  // 1. When a custom element instance is first created (before it's connected) - 
  // state attribute values are set to their state prop names (e.g: '$name').
  // 2. When a custom element instance becomes connected (added to the DOM) - state attribute values are actually resolved to the
  // value of their respective state prop values, and binding between them occurs.
  function _setRuntime(runtime) {
    var _this3 = this;
    if (runtime.events) {
      _classPrivateFieldSet(_events, this, runtime.events);
      if (this.isConnected) {
        (0,_paint_utils_js__WEBPACK_IMPORTED_MODULE_5__.queueBindEvents)(this, function () {
          return _assertClassBrand(_ReactiveElement_brand, _this3, _bindEvents).call(_this3);
        });
      }
    }
    if (runtime.state) {
      this.setInitialState(runtime.state);
      // If this is not mounted yet, #setStateFromInitialState will be called from onConnected callback
      if (this.isConnected) _assertClassBrand(_ReactiveElement_brand, this, _setActiveStateFromInitialState).call(this);
    }
    if (runtime.onMount) {
      _classPrivateFieldSet(_onMount, this, runtime.onMount);
    }
  }
  function _setActiveStateFromInitialState() {
    if (!this.initialState) return;
    var initialState = this.initialState;
    if (initialState._stateManager) {
      this.state = initialState._stateManager.state;
    } else {
      this.state = new _StateManager_js__WEBPACK_IMPORTED_MODULE_3__["default"](initialState, undefined, undefined, false, appScope).state;
    }
    delete this.initialState;
  }
  function _renderTemplate() {
    if (appScope.SPROUT_CONFIG.useShadow) {
      var shadowRoot = this.attachShadow({
        mode: "open",
        slotAssignment: "manual"
      });
      this.shadowRoot.adoptedStyleSheets = [];
      if (_classPrivateFieldGet(_globalStylesheet, this)) this.shadowRoot.adoptedStyleSheets.push(_classPrivateFieldGet(_globalStylesheet, this));
      if (_classPrivateFieldGet(_stylesheet, this)) this.shadowRoot.adoptedStyleSheets.push(_classPrivateFieldGet(_stylesheet, this));
      shadowRoot.appendChild(_classPrivateFieldGet(_templateContent, this));
    } else {
      var fragment = new DocumentFragment();
      fragment.appendChild(_classPrivateFieldGet(_templateContent, this));
      this.appendChild(fragment);
    }
  }
  function _unbindEvents() {
    var _this4 = this;
    if (_classPrivateFieldGet(_changeEventHandler, this)) this.removeEventListener('change', _classPrivateFieldGet(_changeEventHandler, this));
    if (!_classPrivateFieldGet(_boundEventNames, this).length) return;
    var thiselement = this;
    _classPrivateFieldGet(_boundEventNames, this).forEach(function (eventName) {
      thiselement.removeEventListener(eventName, _classPrivateFieldGet(_eventHandler, _this4), false);
    });
  }
  function _bindEvents() {
    var _this5 = this,
      _classPrivateFieldGet2;
    if (!_classPrivateFieldGet(_events, this)) return;
    var eventRefNames = Object.keys(_classPrivateFieldGet(_events, this));
    var clickActions = {};
    var otherActions = {};
    eventRefNames.forEach(function (refName) {
      var value = _classPrivateFieldGet(_events, _this5)[refName];
      if (typeof value === 'function') {
        clickActions[refName] = value;
      } else if (_typeof(value) === 'object') {
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
    var globalState = appScope[_consts_js__WEBPACK_IMPORTED_MODULE_1__.GLOBAL_STATE_FUNCTION_NAME]();
    _classPrivateFieldSet(_eventHandler, this, function (event, eventsObject) {
      var elementsPath = event.composedPath();
      var target;
      if (elementsPath) {
        target = elementsPath.find(function (element) {
          return element.hasAttribute && element.hasAttribute('ref') && element.getAttribute('ref') in eventsObject;
        });
      } else {
        target = event.target.hasAttribute && event.target.hasAttribute('ref') && event.target.getAttribute('ref') in eventsObject ? event.target : null;
      }
      if (target) {
        var _eventsObject$ref;
        var ref = target.getAttribute('ref');
        (_eventsObject$ref = eventsObject[ref]) === null || _eventsObject$ref === void 0 || _eventsObject$ref.call(target, event, event.target, globalState);
      }
    });
    var thiselement = this;
    if (Object.keys(clickActions).length) {
      thiselement.addEventListener('click', function (event) {
        _classPrivateFieldGet(_eventHandler, _this5).call(_this5, event, clickActions);
      }, false);
      _classPrivateFieldGet(_boundEventNames, this).push('click');
    }
    var eventNames = Object.keys(otherActions);
    var _loop = function _loop() {
      var eventName = _eventNames2[_i];
      thiselement.addEventListener(eventName, function (event) {
        _classPrivateFieldGet(_eventHandler, _this5).call(_this5, event, otherActions[eventName]);
      }, false);
    };
    for (var _i = 0, _eventNames2 = eventNames; _i < _eventNames2.length; _i++) {
      _loop();
    }
    (_classPrivateFieldGet2 = _classPrivateFieldGet(_boundEventNames, this)).push.apply(_classPrivateFieldGet2, eventNames);
  }
  function _updateStateFromAttribute(attributeName) {
    var newValue = this.getAttribute(attributeName);
    if (_consts_js__WEBPACK_IMPORTED_MODULE_1__.BOOLEAN_ATTRIBUTES.includes(attributeName)) {
      if (newValue === null) newValue = false;else newValue = true;
    }
    var stateProp = _classPrivateFieldGet(_boundAttributesToState, this)[attributeName];
    var _this$getState3 = this.getState(stateProp, true),
      _this$getState4 = _slicedToArray(_this$getState3, 2),
      stateValue = _this$getState4[0],
      theState = _this$getState4[1];
    if (stateValue !== newValue) theState[stateProp] = newValue;
  }
  _defineProperty(ReactiveElement, "observedAttributes", ["ref"].concat(_consts_js__WEBPACK_IMPORTED_MODULE_1__.SUPPORTED_ATTRIBUTES_FOR_BINDING).concat(Object.keys(_commands_js__WEBPACK_IMPORTED_MODULE_0__.COMMANDS).map(function (command) {
    return '_' + command.toLowerCase();
  })));
  ReactiveElement.prototype.initialSetText = function (stateProp) {
    _state_utils_js__WEBPACK_IMPORTED_MODULE_2__.setStateText.call(this, stateProp);
  };
  ReactiveElement.prototype.initialSetAttribute = function (attributeName, attributeValue) {
    attributeValue = String(attributeValue);
    var valueToSet = attributeValue;
    // "State attribute"
    if (attributeValue.indexOf('$') === 0 && attributeName.indexOf('_') !== 0 && this.isConnected) {
      var stateProp = attributeValue.substring(1);
      _state_utils_js__WEBPACK_IMPORTED_MODULE_2__.setStateAttribute.call(this, attributeName, stateProp);
    }
    // normal attribute
    else {
      _state_utils_js__WEBPACK_IMPORTED_MODULE_2__.setAttribute.call(this, attributeName, valueToSet);
    }
  };

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

  return ReactiveElement;
}

/***/ }),

/***/ "./src/core/ReactiveSlot.js":
/*!**********************************!*\
  !*** ./src/core/ReactiveSlot.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getReactiveSlotClass: () => (/* binding */ getReactiveSlotClass)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function getReactiveSlotClass(ReactiveElementClass) {
  var ReactiveSlot = /*#__PURE__*/function (_ReactiveElementClass) {
    function ReactiveSlot() {
      _classCallCheck(this, ReactiveSlot);
      return _callSuper(this, ReactiveSlot, arguments);
    }
    _inherits(ReactiveSlot, _ReactiveElementClass);
    return _createClass(ReactiveSlot, [{
      key: "renderSlot",
      value: function renderSlot(statePropName) {
        if (this.tagName !== "SLOT") return;
        var stateValue = this.getState(statePropName);
        if (typeof stateValue === "undefined") {
          throw Error("State property ".concat(statePropName, " not defined for conditional slot rendering!"));
        }
        var children = this === null || this === void 0 ? void 0 : this.slotChildren;
        if (children) {
          var nodesToAssign = [];
          children.forEach(function (slotChildElement) {
            var _if = slotChildElement.getAttribute('_if');
            if (_if) {
              var expectedValue = Boolean(_if === "true");
              if (stateValue == expectedValue) {
                nodesToAssign.push(slotChildElement);
              }
            }
          });
          if (nodesToAssign.length) {
            this.assign.apply(this, nodesToAssign);
          }
        }
      }
    }]);
  }(ReactiveElementClass);
  return ReactiveSlot;
}

/***/ }),

/***/ "./src/core/StateManager.js":
/*!**********************************!*\
  !*** ./src/core/StateManager.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state_utils.js */ "./src/core/state_utils.js");
/* harmony import */ var _proxy_handlers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./proxy_handlers.js */ "./src/core/proxy_handlers.js");
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./consts.js */ "./src/core/consts.js");
/* harmony import */ var _debug_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./debug_utils.js */ "./src/core/debug_utils.js");
/* harmony import */ var _prop_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prop_utils.js */ "./src/core/prop_utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







// This class actually handles "State". It returns a proxied "state" object,
// while handling all state changes and triggers behind the scenes
var StateManager = /*#__PURE__*/function () {
  // parentStatePropName is used if the state object is e.g. an item of an array on a state object,
  // or a value in an object on a state object - any change on the child state object should trigger state
  // changes on the parentStateProp
  // host is the host element that the state is attached to
  function StateManager(initialState, parentStateProp, parentStateManager) {
    var _this = this;
    var isGlobal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var appScope = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : window;
    _classCallCheck(this, StateManager);
    // The privateState is used to actually contain values to read from,
    // as custom getters and setters are defined
    _defineProperty(this, "privateState", {});
    // This represents the "publicly" exposed state object
    _defineProperty(this, "state", {});
    // Saves "map" connections between a state array value and a custom element name,
    // this will enable creating/removing new custom elements when items of a state array change
    _defineProperty(this, "stateArrayMaps", {});
    // conditionallyRenderingElements = {};
    // A map that maps state props to "dependencies", each time a stateProp which is a key here,
    // is changed, a state change is triggered for its dependencies as well
    _defineProperty(this, "stateDependencies", {});
    _defineProperty(this, "conditionallyRenderingElements", {});
    // Maps state props to state nodes,
    // Keys are state props, and values are sets of Nodes
    _defineProperty(this, "stateNodes", {});
    // These are used when the state object is part of Stateful Array
    _defineProperty(this, "parentStateProp", void 0);
    _defineProperty(this, "parentStateManager", void 0);
    this.parentStateProp = parentStateProp;
    this.parentStateManager = parentStateManager;

    // Saves the actual state manager instance to a readonly _stateManager
    (0,_prop_utils_js__WEBPACK_IMPORTED_MODULE_4__.setHiddenProperty)(this.state, "_stateManager", this, true);

    // Initialize a proxy on the "public state"
    this.state = new Proxy(this.state, (0,_proxy_handlers_js__WEBPACK_IMPORTED_MODULE_1__.StateHandler)(this.state, appScope));
    if (!isGlobal) (0,_prop_utils_js__WEBPACK_IMPORTED_MODULE_4__.setHiddenProperty)(this.state, "_global", appScope[_consts_js__WEBPACK_IMPORTED_MODULE_2__.GLOBAL_STATE_FUNCTION_NAME](), true);else {
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
      (0,_state_utils_js__WEBPACK_IMPORTED_MODULE_0__.populateStateFromInitialState)(this.state, initialState);
    }
  }
  return _createClass(StateManager, [{
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
        this.stateArrayMaps[stateProp] = [];
      }
      this.stateArrayMaps[stateProp].push({
        customElementName: customElementName,
        parentElement: parentElement
      });
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
      var isBooleanStateProp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var stateObj = this.state;
      if (stateProp.indexOf('!') === 0) {
        var originalStateProp = stateProp.substring(1);
        var _descriptor = Object.getOwnPropertyDescriptor(stateObj, originalStateProp);
        if (!_descriptor) {
          stateObj = stateObj._global;
          _descriptor = Object.getOwnPropertyDescriptor(stateObj, originalStateProp);
          if (!_descriptor) {
            throw Error("Could not bind state prop ".concat(stateProp, ". State prop ").concat(originalStateProp, " not defined!"));
          }
        }
        // Negate prop: (!something) - add a dependency between the negate prop to the original prop,
        // So anytime the original prop change, things that are dependant on the negate prop will react
        // return stateObj._stateManager.addStateDependency(originalStateProp, stateProp);
        return;
      }
      var descriptor = Object.getOwnPropertyDescriptor(stateObj, stateProp);
      if (!descriptor) {
        stateObj = stateObj._global;
        descriptor = Object.getOwnPropertyDescriptor(stateObj, stateProp);
        if (!descriptor) {
          throw Error("Could not bind state prop ".concat(stateProp, ". State prop not defined!"));
        }
      }
      // Some state props can be getters (which usually references other state values)
      // These should be treated differently: should not be saved in privateState, and should not have a setter defined
      var isValueProp = descriptor.hasOwnProperty('value');
      var stateManager = stateObj._stateManager;
      if (isValueProp) {
        if (!stateManager.privateState.hasOwnProperty(stateProp)) {
          stateManager.privateState[stateProp] = stateObj[stateProp];
        }
        stateObj._binding = true;
        Object.defineProperty(stateObj, stateProp, {
          set: function set(value) {
            var currentVal = stateManager.privateState[stateProp];
            if (value === currentVal) return;
            // Sets value to "private state"
            stateManager.privateState[stateProp] = value;
            (0,_state_utils_js__WEBPACK_IMPORTED_MODULE_0__.handleStateChange)(stateManager, stateProp);
            // If this is an item in a Stateful Array, also trigger a state change for the state prop that contains the array
            if (stateManager.parentStateManager) {
              (0,_state_utils_js__WEBPACK_IMPORTED_MODULE_0__.handleStateChange)(stateManager.parentStateManager, stateManager.parentStateProp);
            }
          },
          get: function get() {
            // Value is always retrieved from the "private" state
            return stateManager.privateState[stateProp];
          }
        });
      }

      // Boolean state props will also have "negate props" available (![stateProp])
      if (isBooleanStateProp && stateProp.indexOf('!') !== 0) {
        var negateStateProp = "!".concat(stateProp);
        if (isValueProp) {
          if (!stateManager.privateState.hasOwnProperty(negateStateProp)) {
            Object.defineProperty(stateObj, negateStateProp, {
              get: function get() {
                return !stateManager.privateState[stateProp];
              },
              set: function set() {
                throw Error("Cannot directly set a negation State property!");
              },
              enumerable: true
            });
            stateManager.addStateDependency(stateProp, negateStateProp);
          }
        } else {
          if (!stateManager.state.hasOwnProperty(negateStateProp)) {
            Object.defineProperty(stateObj, negateStateProp, {
              get: function get() {
                return !stateManager.state[stateProp];
              },
              set: function set() {
                throw Error("Cannot directly set a negation State property!");
              },
              enumerable: true
            });
            stateManager.addStateDependency(stateProp, negateStateProp);
          }
        }
      }
      delete this.state._binding;
    }
  }]);
}();
if (_consts_js__WEBPACK_IMPORTED_MODULE_2__.DEBUG_MODE) {
  StateManager = (0,_debug_utils_js__WEBPACK_IMPORTED_MODULE_3__.putObjectInDebugMode)(StateManager, 'StateManager');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StateManager);

/***/ }),

/***/ "./src/core/StatefulArray.js":
/*!***********************************!*\
  !*** ./src/core/StatefulArray.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StateManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateManager.js */ "./src/core/StateManager.js");
/* harmony import */ var _proxy_handlers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./proxy_handlers.js */ "./src/core/proxy_handlers.js");
/* harmony import */ var _state_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state_utils.js */ "./src/core/state_utils.js");
/* harmony import */ var _debug_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./debug_utils.js */ "./src/core/debug_utils.js");
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./consts.js */ "./src/core/consts.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var StatefulArray = /*#__PURE__*/function (_Array) {
  // noConvertToStateItems can be used in internal methods where a normal array is returned and you just want to recreate a StatefulArray,
  // with the same state items

  // NOTE: original Array constructor can get a series of arguments to build an array from, OR a single number,
  // to create an array with that number as a length
  function StatefulArray(initialArray, parentStateObject, arrayStateProp) {
    var _this;
    var noConvertToStateItems = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var appScope = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : window;
    _classCallCheck(this, StatefulArray);
    if (!Array.isArray(initialArray)) {
      throw Error("Argument for StateFulArray constructor must be an array!");
    }
    var rawArray = initialArray;
    var statefulArray;
    if (!noConvertToStateItems) {
      statefulArray = rawArray.map(function (item, index) {
        if (item !== null && item !== void 0 && item.hasOwnProperty('state')) return item;
        if (Array.isArray(item)) return item; // return new StatefulArray(item, this[index].state, index, false, appScope); 
        if (_typeof(item) === 'object') return new _StateManager_js__WEBPACK_IMPORTED_MODULE_0__["default"](item, arrayStateProp, parentStateObject._stateManager, false, appScope);
        return item;
      });
    }
    _this = _callSuper(this, StatefulArray, _toConsumableArray(statefulArray));
    // If any of these are "set" - handle state change in the value
    _defineProperty(_this, "dependencyProps", new Map());
    _this.parentStateObject = parentStateObject;
    _this.arrayStateProp = arrayStateProp;
    _this.rawArray = rawArray;
    statefulArray = new Proxy(_this, (0,_proxy_handlers_js__WEBPACK_IMPORTED_MODULE_1__.StatefulArrayHandler)(parentStateObject === null || parentStateObject === void 0 ? void 0 : parentStateObject._stateManager, arrayStateProp, appScope));
    return _possibleConstructorReturn(_this, statefulArray);
  }
  _inherits(StatefulArray, _Array);
  return _createClass(StatefulArray, [{
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
      var result = (_get2 = _get(_getPrototypeOf(StatefulArray.prototype), "splice", this)).call.apply(_get2, [this].concat(args));
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
      var result = (_get3 = _get(_getPrototypeOf(StatefulArray.prototype), "shift", this)).call.apply(_get3, [this].concat(args));
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
      var result = (_get4 = _get(_getPrototypeOf(StatefulArray.prototype), "unshift", this)).call.apply(_get4, [this].concat(args));
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
      var result = (_get5 = _get(_getPrototypeOf(StatefulArray.prototype), "sort", this)).call.apply(_get5, [this].concat(args));
      delete this.$$operation;
      (0,_state_utils_js__WEBPACK_IMPORTED_MODULE_2__.handleStateChange)(this.parentStateObject._stateManager, this.arrayStateProp);
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
      var result = (_get6 = _get(_getPrototypeOf(StatefulArray.prototype), "reverse", this)).call.apply(_get6, [this].concat(args));
      delete this.$$operation;
      (0,_state_utils_js__WEBPACK_IMPORTED_MODULE_2__.handleStateChange)(this.parentStateObject._stateManager, this.arrayStateProp);
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
      var result = (_get7 = _get(_getPrototypeOf(StatefulArray.prototype), "fill", this)).call.apply(_get7, [this].concat(args));
      delete this.$$operation;
      (0,_state_utils_js__WEBPACK_IMPORTED_MODULE_2__.handleStateChange)(this.parentStateObject._stateManager, this.arrayStateProp);
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
      var result = (_get8 = _get(_getPrototypeOf(StatefulArray.prototype), "sort", this)).call.apply(_get8, [this].concat(args));
      delete this.$$operation;
      (0,_state_utils_js__WEBPACK_IMPORTED_MODULE_2__.handleStateChange)(this.parentStateObject._stateManager, this.arrayStateProp);
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
      var result = (_get9 = _get(_getPrototypeOf(StatefulArray.prototype), "slice", this)).call.apply(_get9, [this].concat(args));
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
if (_consts_js__WEBPACK_IMPORTED_MODULE_4__.DEBUG_MODE) {
  StatefulArray = (0,_debug_utils_js__WEBPACK_IMPORTED_MODULE_3__.putObjectInDebugMode)(StatefulArray, "StatefulArray");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StatefulArray);

/***/ }),

/***/ "./src/core/commands.js":
/*!******************************!*\
  !*** ./src/core/commands.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COMMANDS: () => (/* binding */ COMMANDS)
/* harmony export */ });
/* harmony import */ var _state_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state_utils.js */ "./src/core/state_utils.js");
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts.js */ "./src/core/consts.js");
/* harmony import */ var _debug_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./debug_utils.js */ "./src/core/debug_utils.js");
/* harmony import */ var _DOM_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DOM_utils.js */ "./src/core/DOM_utils.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
  var wrapInElement = (0,_DOM_utils_js__WEBPACK_IMPORTED_MODULE_3__.isElementAList)(parentElement) ? "li" : undefined;
  var elements = (0,_state_utils_js__WEBPACK_IMPORTED_MODULE_0__.mapStateArrayToElements)(stateItemsArray, customElementName, wrapInElement);
  parentElement.innerHTML = "";
  if (elements.length) {
    parentElement.append.apply(parentElement, _toConsumableArray(elements));
  }
  return theState;
}

// Functions that run and handles "Command" attributes. Note, they should always be called
// with the "this" context set to the custom element the command is defined on
var COMMANDS = {
  map: function map(commandValue) {
    // The command value ("argument") is "<stateProp>:<custom element name>"
    var _commandValue$split = commandValue.split(':'),
      _commandValue$split2 = _slicedToArray(_commandValue$split, 2),
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
      _commandValue$split4 = _slicedToArray(_commandValue$split3, 2),
      attributeName = _commandValue$split4[0],
      statePropName = _commandValue$split4[1];
    if (!attributeName || !statePropName) {
      console.warn("Incorrect usage of _bind command! Please pass <attribute-name>:<state-prop-name>");
      return;
    }
    if (!attributeName in _consts_js__WEBPACK_IMPORTED_MODULE_1__.SUPPORTED_ATTRIBUTES_FOR_BINDING) {
      console.warn("Attribute ".concat(attributeName, " is not supported for _bind command!"));
      return;
    }
    this.bindAttributeToState(attributeName, statePropName);
    if (_consts_js__WEBPACK_IMPORTED_MODULE_1__.SUPPORTED_PROPERTIES_FOR_BINDING.includes(attributeName)) {
      if (attributeName === "value" && this.tagName === "INPUT" && _consts_js__WEBPACK_IMPORTED_MODULE_1__.SUPPORTED_INPUT_TYPES_FOR_VALUE_BINDING.includes(this.getAttribute('type'))) {
        this.addEventListener("input", function () {
          return _this.updateStateFromProperty("value");
        });
      } else if (attributeName === "checked" && this.tagName === "INPUT" && this.getAttribute('type') === "checkbox") {
        this.addEventListener("change", function () {
          return _this.updateStateFromProperty("checked");
        });
      }
    }
  },
  condition: function condition(commandValue) {
    var _this$host;
    if (this.tagName !== "SLOT") {
      throw Error("condition command can only be used on a slot element!");
    }
    var statePropName = commandValue;
    var _this$getState = this.getState(statePropName, true),
      _this$getState2 = _slicedToArray(_this$getState, 2),
      stateValue = _this$getState2[0],
      stateObject = _this$getState2[1];
    if (typeof stateValue === "undefined") {
      throw Error("State property ".concat(statePropName, " not defined for _condition command!"));
    }
    this.slotChildren = _toConsumableArray(this.children);
    (_this$host = this.host).append.apply(_this$host, _toConsumableArray(this.slotChildren));
    this.innerHTML = "";
    this.renderSlot(statePropName);
    stateObject._stateManager.addConditionallyRenderingElements(statePropName, this);
  }
};

/***/ }),

/***/ "./src/core/consts.js":
/*!****************************!*\
  !*** ./src/core/consts.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BOOLEAN_ATTRIBUTES: () => (/* binding */ BOOLEAN_ATTRIBUTES),
/* harmony export */   BUILT_IN_STATE_PROPS: () => (/* binding */ BUILT_IN_STATE_PROPS),
/* harmony export */   DEBUG_MODE: () => (/* binding */ DEBUG_MODE),
/* harmony export */   DEFAULT_TEMPLATE_DOM: () => (/* binding */ DEFAULT_TEMPLATE_DOM),
/* harmony export */   ERROR_MESSAGES: () => (/* binding */ ERROR_MESSAGES),
/* harmony export */   GLOBAL_STATE_FUNCTION_NAME: () => (/* binding */ GLOBAL_STATE_FUNCTION_NAME),
/* harmony export */   GLOBAL_STATE_VAR_NAME: () => (/* binding */ GLOBAL_STATE_VAR_NAME),
/* harmony export */   HTML_ELEMENTS_CLASSES_MAP: () => (/* binding */ HTML_ELEMENTS_CLASSES_MAP),
/* harmony export */   NODES_STATE: () => (/* binding */ NODES_STATE),
/* harmony export */   SUPPORTED_ATTRIBUTES_FOR_BINDING: () => (/* binding */ SUPPORTED_ATTRIBUTES_FOR_BINDING),
/* harmony export */   SUPPORTED_INPUT_TYPES_FOR_VALUE_BINDING: () => (/* binding */ SUPPORTED_INPUT_TYPES_FOR_VALUE_BINDING),
/* harmony export */   SUPPORTED_PROPERTIES_FOR_BINDING: () => (/* binding */ SUPPORTED_PROPERTIES_FOR_BINDING)
/* harmony export */ });
var BOOLEAN_ATTRIBUTES = ['hidden', 'checked'];
var SUPPORTED_ATTRIBUTES_FOR_BINDING = ['hidden', 'value', 'checked'];

// Some elements like inputs has certain properties that can be used in _bind command, like: 'value', or 'checked
var SUPPORTED_PROPERTIES_FOR_BINDING = ['value', 'checked'];
var SUPPORTED_INPUT_TYPES_FOR_VALUE_BINDING = ['text', 'color', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'range', 'search', 'tel', 'time', 'url', 'week'];

// These are "built-in" state props that are automatically added to state objects,
// and should not be included in the normal state change/check flow
var BUILT_IN_STATE_PROPS = ['_global', '_gettingDependenciesFor', '_localStateManager', '_stateManager', '_binding', '_populate'];
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
}, {
  "class": HTMLBaseElement,
  element: "base"
}, {
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
}, {
  "class": HTMLHeadingElement,
  element: "h1"
}, {
  "class": HTMLHeadingElement,
  element: "h2"
}, {
  "class": HTMLHeadingElement,
  element: "h3"
}, {
  "class": HTMLHeadingElement,
  element: "h4"
}, {
  "class": HTMLHeadingElement,
  element: "h5"
}, {
  "class": HTMLHeadingElement,
  element: "h6"
}, {
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
}, {
  "class": HTMLOutputElement,
  element: "output"
}, {
  "class": HTMLParagraphElement,
  element: "p"
}, {
  "class": HTMLParamElement,
  element: "param"
}, {
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
}, {
  "class": HTMLScriptElement,
  element: "script"
}, {
  "class": HTMLSelectElement,
  element: "select"
}, {
  "class": HTMLSourceElement,
  element: "source"
}, {
  "class": HTMLSpanElement,
  element: "span"
}, {
  "class": HTMLStyleElement,
  element: "style"
}, {
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
}
// { class: HTMLSlotElement, element: "slot" } Has a different extended class for conditional rendering
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
  conditionalRenderRafId: null
};

/***/ }),

/***/ "./src/core/debug_utils.js":
/*!*********************************!*\
  !*** ./src/core/debug_utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   putObjectInDebugMode: () => (/* binding */ putObjectInDebugMode)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function debugGetProxyHandler(scopeName, originalObject) {
  return {
    get: function get(target, property, receiver) {
      if (_typeof(property) === "symbol") return Reflect.get.apply(Reflect, arguments);
      console.debug("Property ".concat(property, " called on ").concat(scopeName));
      if (property === "prototype") {
        // return Object.getPrototypeOf(originalObject.prototype);
        return originalObject.prototype;
      }
      if (typeof target[property] === "function") {
        return new Proxy(target[property], debugApplyProxyHandler(property, "".concat(scopeName, ".").concat(property)));
      } else if (_typeof(target[property]) === "object") {
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

/***/ }),

/***/ "./src/core/node_actions.js":
/*!**********************************!*\
  !*** ./src/core/node_actions.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAppendAction: () => (/* binding */ addAppendAction),
/* harmony export */   addAppendActionToNode: () => (/* binding */ addAppendActionToNode),
/* harmony export */   addRemoveAction: () => (/* binding */ addRemoveAction),
/* harmony export */   addReplaceAction: () => (/* binding */ addReplaceAction),
/* harmony export */   addStateAttributeToNode: () => (/* binding */ addStateAttributeToNode),
/* harmony export */   doUpdateDOM: () => (/* binding */ doUpdateDOM),
/* harmony export */   generateStateNodeActions: () => (/* binding */ generateStateNodeActions),
/* harmony export */   getNewNodeActionsObject: () => (/* binding */ getNewNodeActionsObject),
/* harmony export */   logNodeActions: () => (/* binding */ logNodeActions),
/* harmony export */   setStateNodeAction: () => (/* binding */ setStateNodeAction)
/* harmony export */ });
/* harmony import */ var _state_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state_utils.js */ "./src/core/state_utils.js");
/* harmony import */ var _DOM_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM_utils.js */ "./src/core/DOM_utils.js");
/* harmony import */ var _paint_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./paint_utils.js */ "./src/core/paint_utils.js");
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./consts.js */ "./src/core/consts.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }





// Also, if doesn't exist - create it
function getNodeActionsForNode(node) {
  var nodeActionsMap = _consts_js__WEBPACK_IMPORTED_MODULE_3__.NODES_STATE.nodeActionsMap;
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
    get hasPendingActions() {
      return this.append.size || this.replace.size || this.after.size || this.remove.size;
    }
  };
}

// This *updates*/*"fills"* the nodeActionsMap!
function generateStateNodeActions(stateManager, stateProp) {
  var _this = this;
  var nodeActionsMap = _consts_js__WEBPACK_IMPORTED_MODULE_3__.NODES_STATE.nodeActionsMap;
  var value = stateManager.state[stateProp];
  var stateNodes = stateManager.stateNodes[stateProp];
  var stateMaps = stateManager.stateArrayMaps[stateProp];
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
  if (stateMaps) {
    var stateMapArray = value;
    stateMaps.forEach(function (_ref) {
      var customElementName = _ref.customElementName,
        parentElement = _ref.parentElement;
      var stateMapNodeActions = getNewNodeActionsObject();
      var currentStateMapArrayIndex = -1;
      var isParentAList = (0,_DOM_utils_js__WEBPACK_IMPORTED_MODULE_1__.isElementAList)(parentElement);
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
          } else if (customElement.state !== stateItem) {
            var replaceWithChild = (0,_state_utils_js__WEBPACK_IMPORTED_MODULE_0__.stateToElement)(stateItem, customElementName, (0,_DOM_utils_js__WEBPACK_IMPORTED_MODULE_1__.isElementAList)(parentElement) ? "li" : undefined);
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
          // Make sure we don't already have a pending append action for the same state object
          var newChild = (0,_state_utils_js__WEBPACK_IMPORTED_MODULE_0__.stateToElement)(stateItem, customElementName, (0,_DOM_utils_js__WEBPACK_IMPORTED_MODULE_1__.isElementAList)(parentElement) ? "li" : undefined);
          addAppendAction(stateMapNodeActions, newChild, stateItem);
        }
      }
      if (stateMapNodeActions.hasPendingActions) {
        nodeActionsMap.set(parentElement, stateMapNodeActions);
      }
    });
  }
  if (conditionallyRenderingElements) {
    // Should be slot element
    conditionallyRenderingElements.forEach(function (element) {
      (0,_paint_utils_js__WEBPACK_IMPORTED_MODULE_2__.queueConditionalRender)(_this, function () {
        return element.renderSlot(stateProp);
      });
    });
  }
}
function resolveNodeActionsMapToDOMActions() {
  var batchActions = [];
  var nodeActionsMap = _consts_js__WEBPACK_IMPORTED_MODULE_3__.NODES_STATE.nodeActionsMap;
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
            batchActions.push(function () {
              node.originalOwnerElement.removeAttributeNode(node);
            });
          }
        }
        // state changed to true
        else {
          if (!node.originalOwnerElement.hasAttribute(node.name)) {
            batchActions.push(function () {
              node.originalOwnerElement.setAttributeNode(node);
            });
          }
        }
      } else {
        if (typeof value === "string" && node.nodeValue !== value) {
          batchActions.push(function () {
            return node.nodeValue = value;
          });
        }
      }
    }

    // Text change
    else if (nodeActions.hasOwnProperty("textContent")) {
      var _value = String(nodeActions.textContent);
      if (node.nodeValue === _value) return;
      batchActions.push(function () {
        return node.nodeValue = _value;
      });
    }

    // DOM change
    else {
      nodeActions.replace.forEach(function (newNode, oldNode) {
        batchActions.push(function () {
          return (
            //oldNode.replaceWith(newNode));
            node.replaceChild(newNode, oldNode)
          );
        });
      });
      nodeActions.remove.values().forEach(function (removes) {
        removes.forEach(function (nodeToRemove) {
          if (nodeToRemove.parentNode && nodeToRemove.parentNode === node) {
            batchActions.push(function () {
              return node.removeChild(nodeToRemove);
            });
          }
        });
      });
      nodeActions.append.values().forEach(function (appends) {
        appends.forEach(function (newChildElement) {
          batchActions.push(function () {
            return node.appendChild(newChildElement);
          });
        });
      });
    }
  });
  return batchActions;
}

// For debugging purposes
function logNodeActions() {
  var nodeActionsMap = _consts_js__WEBPACK_IMPORTED_MODULE_3__.NODES_STATE.nodeActionsMap;
  _toConsumableArray(nodeActionsMap.entries()).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      node = _ref3[0],
      actions = _ref3[1];
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
  var nodeActionsMap = _consts_js__WEBPACK_IMPORTED_MODULE_3__.NODES_STATE.nodeActionsMap;
  if (nodeActionsMap.size) {
    var DOMActions = resolveNodeActionsMapToDOMActions(nodeActionsMap);
    DOMActions.forEach(function (DOMAction) {
      return DOMAction();
    });
    _consts_js__WEBPACK_IMPORTED_MODULE_3__.NODES_STATE.nodeActionsMap = new Map();
  }
  // requestAnimationFrame(doUpdateDOM);
}

/***/ }),

/***/ "./src/core/paint_utils.js":
/*!*********************************!*\
  !*** ./src/core/paint_utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   queueBindEvents: () => (/* binding */ queueBindEvents),
/* harmony export */   queueConditionalRender: () => (/* binding */ queueConditionalRender),
/* harmony export */   queuePaint: () => (/* binding */ queuePaint)
/* harmony export */ });
/* harmony import */ var _node_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_actions */ "./src/core/node_actions.js");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./consts */ "./src/core/consts.js");


var paintRafId = _consts__WEBPACK_IMPORTED_MODULE_1__.NODES_STATE.paintRafId,
  eventBindingFunctions = _consts__WEBPACK_IMPORTED_MODULE_1__.NODES_STATE.eventBindingFunctions,
  eventBindRafId = _consts__WEBPACK_IMPORTED_MODULE_1__.NODES_STATE.eventBindRafId,
  conditionalRenderRafId = _consts__WEBPACK_IMPORTED_MODULE_1__.NODES_STATE.conditionalRenderRafId,
  conditionalRenders = _consts__WEBPACK_IMPORTED_MODULE_1__.NODES_STATE.conditionalRenders;
function queueBindEvents(element, bindFunction) {
  if (eventBindRafId) cancelAnimationFrame(eventBindRafId);
  eventBindingFunctions.set(element, bindFunction);
  eventBindRafId = requestAnimationFrame(function () {
    eventBindRafId = null;
    eventBindingFunctions.forEach(function (bindFn) {
      return bindFn();
    });
    eventBindingFunctions = new Map();
  });
}
function queuePaint() {
  if (paintRafId) cancelAnimationFrame(paintRafId);
  paintRafId = requestAnimationFrame(function () {
    paintRafId = null;
    (0,_node_actions__WEBPACK_IMPORTED_MODULE_0__.doUpdateDOM)();
  });
}
function queueConditionalRender(element, renderFunction) {
  if (conditionalRenderRafId) cancelAnimationFrame(conditionalRenderRafId);
  conditionalRenders.set(element, renderFunction);
  conditionalRenderRafId = requestAnimationFrame(function () {
    conditionalRenderRafId = null;
    conditionalRenders.forEach(function (renderFn) {
      return renderFn();
    });
    conditionalRenders = new Map();
  });
}

/***/ }),

/***/ "./src/core/prop_utils.js":
/*!********************************!*\
  !*** ./src/core/prop_utils.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setHiddenProperty: () => (/* binding */ setHiddenProperty)
/* harmony export */ });
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

/***/ }),

/***/ "./src/core/proxy_handlers.js":
/*!************************************!*\
  !*** ./src/core/proxy_handlers.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StateHandler: () => (/* binding */ StateHandler),
/* harmony export */   StatefulArrayHandler: () => (/* binding */ StatefulArrayHandler)
/* harmony export */ });
/* harmony import */ var _StateManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateManager.js */ "./src/core/StateManager.js");
/* harmony import */ var _state_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state_utils.js */ "./src/core/state_utils.js");
/* harmony import */ var _StatefulArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StatefulArray.js */ "./src/core/StatefulArray.js");
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./consts.js */ "./src/core/consts.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }




var StatefulArrayHandler = function StatefulArrayHandler(parentStateManager, arrayStateProp) {
  var appScope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
  return {
    set: function set(targetArray, property, value) {
      // Return if the value is the same
      // A change in array length triggers state change in the array state prop
      if (property === "length") {
        var setResult = Reflect.set(targetArray, property, value);
        (0,_state_utils_js__WEBPACK_IMPORTED_MODULE_1__.handleStateChange)(parentStateManager, arrayStateProp);
        return setResult;
      }
      if (targetArray[property] === value) return true;
      var index = Number(property);
      if (!isNaN(index)) {
        // Check if the property is a numeric index
        // If we set it to a new object, convert it to a state object
        if (_typeof(value) === 'object' && !value.hasOwnProperty('_stateManager') && !value.hasOwnProperty('state')) {
          value = new _StateManager_js__WEBPACK_IMPORTED_MODULE_0__["default"](value, arrayStateProp, parentStateManager, false, appScope);
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
            (0,_state_utils_js__WEBPACK_IMPORTED_MODULE_1__.handleStateChange)(parentStateManager, arrayStateProp);
          }
          return _setResult;
        }
      }
      return Reflect.set(targetArray, property, value);
    },
    get: function get(targetArray, property, receiver) {
      if (_typeof(property) === 'symbol') return Reflect.get.apply(Reflect, arguments);
      if (property === 'hasOwnProperty') return Reflect.get.apply(Reflect, arguments);
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
var StateHandler = function StateHandler(stateObj) {
  var appScope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;
  return {
    defineProperty: function defineProperty(targetState, stateProp, descriptor) {
      var _targetState;
      if (_consts_js__WEBPACK_IMPORTED_MODULE_3__.BUILT_IN_STATE_PROPS.includes(stateProp) || (_targetState = targetState) !== null && _targetState !== void 0 && _targetState._binding) {
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
          if (_consts_js__WEBPACK_IMPORTED_MODULE_3__.BUILT_IN_STATE_PROPS.includes(property)) {
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
          var _value$;
          // Setter Hook
          if (stateProp.indexOf('set_') === 0) {
            var deps = value === null || value === void 0 ? void 0 : value[1];
            if (!deps) throw Error(_consts_js__WEBPACK_IMPORTED_MODULE_3__.ERROR_MESSAGES.NO_DEPENDENCIES_ARRAY_IN_SET_HOOK(stateProp));
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
          } else if (!(value !== null && value !== void 0 && (_value$ = value[0]) !== null && _value$ !== void 0 && _value$._stateManager)) {
            descriptor.value = new _StatefulArray_js__WEBPACK_IMPORTED_MODULE_2__["default"](descriptor.value, stateObj, stateProp, false, appScope);
          }
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
      if (!origTargetState.hasOwnProperty("_populate")) (0,_state_utils_js__WEBPACK_IMPORTED_MODULE_1__.handleStateChange)(stateManager, stateProp);
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

/***/ }),

/***/ "./src/core/state_utils.js":
/*!*********************************!*\
  !*** ./src/core/state_utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleStateChange: () => (/* binding */ handleStateChange),
/* harmony export */   mapStateArrayToElements: () => (/* binding */ mapStateArrayToElements),
/* harmony export */   populateStateFromInitialState: () => (/* binding */ populateStateFromInitialState),
/* harmony export */   setAttribute: () => (/* binding */ setAttribute),
/* harmony export */   setStateAttribute: () => (/* binding */ setStateAttribute),
/* harmony export */   setStateText: () => (/* binding */ setStateText),
/* harmony export */   stateToElement: () => (/* binding */ stateToElement)
/* harmony export */ });
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts.js */ "./src/core/consts.js");
/* harmony import */ var _node_actions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_actions.js */ "./src/core/node_actions.js");
/* harmony import */ var _prop_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prop_utils.js */ "./src/core/prop_utils.js");
/* harmony import */ var _paint_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./paint_utils.js */ "./src/core/paint_utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var nodeActionsMap = _consts_js__WEBPACK_IMPORTED_MODULE_0__.NODES_STATE.nodeActionsMap;
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
  if (_consts_js__WEBPACK_IMPORTED_MODULE_0__.BOOLEAN_ATTRIBUTES.includes(attrName)) {
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
    _this$getState2 = _slicedToArray(_this$getState, 2),
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
  (0,_prop_utils_js__WEBPACK_IMPORTED_MODULE_2__.setHiddenProperty)(stateAttrNode, "isStateAttribute", true);
  // Save ownerElement to a different property,
  // so if the attribute is removed (in case of a boolean attribute),
  // and later re-attached, we would know which element to add it back to.
  (0,_prop_utils_js__WEBPACK_IMPORTED_MODULE_2__.setHiddenProperty)(stateAttrNode, "originalOwnerElement", this);
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
    _this$getState4 = _slicedToArray(_this$getState3, 2),
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
  (0,_prop_utils_js__WEBPACK_IMPORTED_MODULE_2__.setHiddenProperty)(textNode, "isStateAttribute", true);
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
  if (_consts_js__WEBPACK_IMPORTED_MODULE_0__.BUILT_IN_STATE_PROPS.includes(stateProp)) return;
  // Populate the next Node Actions to perform
  (0,_node_actions_js__WEBPACK_IMPORTED_MODULE_1__.generateStateNodeActions)(stateManager, stateProp);
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
      (0,_node_actions_js__WEBPACK_IMPORTED_MODULE_1__.generateStateNodeActions)(stateManager, depStateProp);
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
        (0,_node_actions_js__WEBPACK_IMPORTED_MODULE_1__.generateStateNodeActions)(depStateManager, depStateProp);
        if (state.hasOwnProperty("on".concat(depStateProp, "Change"))) {
          if (typeof state["on".concat(depStateProp, "Change")] === "function") depState["on".concat(depStateProp, "Change")].call(depState);
        }
      });
    });
  }
  if (nodeActionsMap.size) {
    (0,_paint_utils_js__WEBPACK_IMPORTED_MODULE_3__.queuePaint)();
  }
}
function populateStateFromInitialState(state, initialState) {
  state._populate = true;
  var descriptors = Object.getOwnPropertyDescriptors(initialState);
  var descrp;
  for (var key in descriptors) {
    if (_consts_js__WEBPACK_IMPORTED_MODULE_0__.BUILT_IN_STATE_PROPS.includes(key)) {
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReactiveElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactiveElement.js */ "./src/core/ReactiveElement.js");
/* harmony import */ var _StateManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StateManager.js */ "./src/core/StateManager.js");
/* harmony import */ var _node_actions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_actions.js */ "./src/core/node_actions.js");
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./consts.js */ "./src/core/consts.js");
/* harmony import */ var _build__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../build */ "./src/build/index.js");
/* harmony import */ var _debug_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./debug_utils.js */ "./src/core/debug_utils.js");
/* harmony import */ var _prop_utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./prop_utils.js */ "./src/core/prop_utils.js");
/* harmony import */ var _ReactiveSlot_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ReactiveSlot.js */ "./src/core/ReactiveSlot.js");









var allowAppScopeAccess = document.currentScript.hasAttribute("allowappscopeaccess");
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
    allowAppScopeAccess: allowAppScopeAccess
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
  (0,_prop_utils_js__WEBPACK_IMPORTED_MODULE_6__.setHiddenProperty)(Object.prototype, "hasOwnProperty", hasOwnProperty);
  appScope[_consts_js__WEBPACK_IMPORTED_MODULE_3__.GLOBAL_STATE_FUNCTION_NAME] = function () {
    return {};
  };
  // If initialState is passed - also sets it to global state
  appScope.setGlobalState = function () {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var globalState = new _StateManager_js__WEBPACK_IMPORTED_MODULE_1__["default"](initialState, undefined, undefined, true, appScope).state;
    var globalStateVarName = _consts_js__WEBPACK_IMPORTED_MODULE_3__.GLOBAL_STATE_VAR_NAME;
    Object.defineProperty(appScope, globalStateVarName, {
      value: globalState,
      writable: _consts_js__WEBPACK_IMPORTED_MODULE_3__.DEBUG_MODE ? true : false,
      configurable: false
    });
    Object.defineProperty(appScope, _consts_js__WEBPACK_IMPORTED_MODULE_3__.GLOBAL_STATE_FUNCTION_NAME, {
      value: function value() {
        return appScope[globalStateVarName];
      }
    });
  };
  appScope.ReactiveElement = (0,_ReactiveElement_js__WEBPACK_IMPORTED_MODULE_0__.extendElementClassWithReactiveElementClass)(HTMLElement, appScope);

  // Extend specific HTMLElement classes to enable reactivity (use it by adding an "is" attribute to an element)
  _consts_js__WEBPACK_IMPORTED_MODULE_3__.HTML_ELEMENTS_CLASSES_MAP.forEach(function (itemDefinition) {
    return customElements.define("reactive-".concat(itemDefinition.element), (0,_ReactiveElement_js__WEBPACK_IMPORTED_MODULE_0__.extendElementClassWithReactiveElementClass)(itemDefinition["class"], appScope, true), {
      "extends": itemDefinition.element
    });
  });
  var ReactiveSlotElementClass = (0,_ReactiveElement_js__WEBPACK_IMPORTED_MODULE_0__.extendElementClassWithReactiveElementClass)(HTMLSlotElement, appScope, true);
  var ReactiveSlotClass = (0,_ReactiveSlot_js__WEBPACK_IMPORTED_MODULE_7__.getReactiveSlotClass)(ReactiveSlotElementClass);
  customElements.define('reactive-slot', ReactiveSlotClass, {
    "extends": "slot"
  });
  return function () {
    (0,_build__WEBPACK_IMPORTED_MODULE_4__["default"])(appScope, appName);
  }.bind(appScope);
};
/******/ })()
;
//# sourceMappingURL=sprout-core.js.map