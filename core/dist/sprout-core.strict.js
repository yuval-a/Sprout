(() => {
    "use strict";
    function _typeof(o) {
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, _typeof(o);
    }
    function _defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, _toPropertyKey(o.key), o);
        }
    }
    function _toPropertyKey(t) {
        var i = function _toPrimitive(t, r) {
            if ("object" != _typeof(t) || !t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
                var i = e.call(t, r || "default");
                if ("object" != _typeof(i)) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === r ? String : Number)(t);
        }(t, "string");
        return "symbol" == _typeof(i) ? i : i + "";
    }
    function _wrapNativeSuper(t) {
        var r = "function" == typeof Map ? new Map : void 0;
        return _wrapNativeSuper = function _wrapNativeSuper(t) {
            if (null === t || !function _isNativeFunction(t) {
                try {
                    return -1 !== Function.toString.call(t).indexOf("[native code]");
                } catch (n) {
                    return "function" == typeof t;
                }
            }(t)) return t;
            if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== r) {
                if (r.has(t)) return r.get(t);
                r.set(t, Wrapper);
            }
            function Wrapper() {
                return function _construct(t, e, r) {
                    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
                    var o = [ null ];
                    o.push.apply(o, e);
                    var p = new (t.bind.apply(t, o));
                    return r && _setPrototypeOf(p, r.prototype), p;
                }(t, arguments, _getPrototypeOf(this).constructor);
            }
            return Wrapper.prototype = Object.create(t.prototype, {
                constructor: {
                    value: Wrapper,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), _setPrototypeOf(Wrapper, t);
        }, _wrapNativeSuper(t);
    }
    function _isNativeReflectConstruct() {
        try {
            var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
        } catch (t) {}
        return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
            return !!t;
        })();
    }
    function _setPrototypeOf(t, e) {
        return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        }, _setPrototypeOf(t, e);
    }
    function _getPrototypeOf(t) {
        return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, _getPrototypeOf(t);
    }
    var ReadonlySet = function(_Set) {
        function ReadonlySet(iterable) {
            var _this;
            return function _classCallCheck(a, n) {
                if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
            }(this, ReadonlySet), (_this = function _callSuper(t, o, e) {
                return o = _getPrototypeOf(o), function _possibleConstructorReturn(t, e) {
                    if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
                    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                    return function _assertThisInitialized(e) {
                        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return e;
                    }(t);
                }(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
            }(this, ReadonlySet, [ iterable ])).add = function() {
                return ReadonlySet.unavailableMethod("add");
            }, _this;
        }
        return function _inherits(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && _setPrototypeOf(t, e);
        }(ReadonlySet, _Set), function _createClass(e, r, t) {
            return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e;
        }(ReadonlySet, [ {
            key: "delete",
            value: function _delete() {
                ReadonlySet.unavailableMethod("delete");
            }
        }, {
            key: "clear",
            value: function clear() {
                ReadonlySet.unavailableMethod("clear");
            }
        } ], [ {
            key: "unavailableMethod",
            value: function unavailableMethod(methodName) {
                throw Error("Can't use ".concat(methodName, " in ReadonlySet"));
            }
        } ]);
    }(_wrapNativeSuper(Set)), OBSERVED_ATTRIBUTES = [ "ref", "hidden" ], BOOLEAN_ATTRIBUTES = new ReadonlySet([ "hidden", "checked", "disabled", "required", "selected" ]), AUTO_ATTRIBUTES_TO_PROPS = new ReadonlySet([ "checked", "disabled", "selected", "src" ]), SUPPORTED_ATTRIBUTES_FOR_BINDING = new ReadonlySet([ "value", "checked" ]), BUILT_IN_STATE_PROPS = new ReadonlySet([ "_global", "_gettingDependenciesFor", "_localStateManager", "_stateManager", "_binding", "_populate", "_isActive", "_isStateManager", "_isStatefulArray", "hasOwnProperty" ]), GLOBAL_STATE_NOT_SET_YET = "Global State Not Set Yet", HTML_ELEMENT_CLASSES_MAP = (Object.freeze({
        NO_DEPENDENCIES_ARRAY_IN_SET_HOOK: function NO_DEPENDENCIES_ARRAY_IN_SET_HOOK(stateProp) {
            return "State set hook, must include a dependencies array! None was found for ".concat(stateProp);
        }
    }), Object.freeze([ {
        class: HTMLAnchorElement,
        element: "a"
    }, {
        class: HTMLAreaElement,
        element: "area"
    }, {
        class: HTMLAudioElement,
        element: "audio"
    }, {
        class: HTMLBodyElement,
        element: "body"
    }, {
        class: HTMLBRElement,
        element: "br"
    }, {
        class: HTMLButtonElement,
        element: "button"
    }, {
        class: HTMLCanvasElement,
        element: "canvas"
    }, {
        class: HTMLDataElement,
        element: "data"
    }, {
        class: HTMLDataListElement,
        element: "datalist"
    }, {
        class: HTMLDetailsElement,
        element: "details"
    }, {
        class: HTMLDialogElement,
        element: "dialog"
    }, {
        class: HTMLDivElement,
        element: "div"
    }, {
        class: HTMLDListElement,
        element: "dl"
    }, {
        class: HTMLEmbedElement,
        element: "embed"
    }, {
        class: HTMLFieldSetElement,
        element: "fieldset"
    }, {
        class: HTMLFormElement,
        element: "form"
    }, {
        class: HTMLHRElement,
        element: "hr"
    }, {
        class: HTMLHtmlElement,
        element: "html"
    }, {
        class: HTMLIFrameElement,
        element: "iframe"
    }, {
        class: HTMLImageElement,
        element: "img"
    }, {
        class: HTMLLabelElement,
        element: "label"
    }, {
        class: HTMLLegendElement,
        element: "legend"
    }, {
        class: HTMLLIElement,
        element: "li"
    }, {
        class: HTMLLinkElement,
        element: "link"
    }, {
        class: HTMLMapElement,
        element: "map"
    }, {
        class: HTMLMetaElement,
        element: "meta"
    }, {
        class: HTMLMeterElement,
        element: "meter"
    }, {
        class: HTMLObjectElement,
        element: "object"
    }, {
        class: HTMLOListElement,
        element: "ol"
    }, {
        class: HTMLOptGroupElement,
        element: "optgroup"
    }, {
        class: HTMLOptionElement,
        element: "option"
    }, {
        class: HTMLParagraphElement,
        element: "p"
    }, {
        class: HTMLPictureElement,
        element: "picture"
    }, {
        class: HTMLPreElement,
        element: "pre"
    }, {
        class: HTMLProgressElement,
        element: "progress"
    }, {
        class: HTMLQuoteElement,
        element: "blockquote"
    }, {
        class: HTMLQuoteElement,
        element: "q"
    }, {
        class: HTMLSelectElement,
        element: "select"
    }, {
        class: HTMLSourceElement,
        element: "source"
    }, {
        class: HTMLSpanElement,
        element: "span"
    }, {
        class: HTMLTableElement,
        element: "table"
    }, {
        class: HTMLTableCellElement,
        element: "td"
    }, {
        class: HTMLTableCellElement,
        element: "th"
    }, {
        class: HTMLTableRowElement,
        element: "tr"
    }, {
        class: HTMLTableSectionElement,
        element: "thead"
    }, {
        class: HTMLTableSectionElement,
        element: "tbody"
    }, {
        class: HTMLTableSectionElement,
        element: "tfoot"
    }, {
        class: HTMLTextAreaElement,
        element: "textarea"
    }, {
        class: HTMLTimeElement,
        element: "time"
    }, {
        class: HTMLTitleElement,
        element: "title"
    }, {
        class: HTMLTrackElement,
        element: "track"
    }, {
        class: HTMLUListElement,
        element: "ul"
    }, {
        class: HTMLVideoElement,
        element: "video"
    }, {
        class: HTMLSlotElement,
        element: "slot"
    } ])), DEFAULT_TEMPLATE_DOM = document.createElement("div"), NODES_STATE = {
        nodeActionsMap: new Map,
        pendingPaintNodeManagers: new Set,
        eventBindingFunctions: new Map,
        conditionalRenders: new Map,
        stateChangeHandlers: new Map,
        paintRafId: null
    }, ARRAY_MUTATE_METHODS = (new ReadonlySet([ "==", "===", "!=", "!==", "<", "<=", ">", ">=" ]), 
    new ReadonlySet([ "shift", "unshift", "pop", "push", "reverse", "sort", "splice", "copyWithin", "fill" ])), ARRAY_MUTATE_NO_LENGTH_CHANGE_METHODS = new ReadonlySet([ "reverse", "sort", "copyWithin", "fill" ]), ARRAY_DERIVE_METHODS = new ReadonlySet([ "slice", "map", "filter", "reduce", "reduceRight", "some", "every", "forEach", "find", "findIndex", "findLast", "findLastIndex", "indexOf", "lastIndexOf", "includes", "entries", "keys", "values", "at", "join", "toString", "toLocaleString" ]), ARRAY_CACHE_METHODS = new ReadonlySet([ "every", "some", "filter", "forEach", "map", "reduce", "reduceRight", "slice" ]), SYMBOL_NAMES_STATE_NOT_FOUND = "SPROUT_STATE_NOT_FOUND", BINDABLE_ATTRIBUTES_TO_STATE_NODES = new ReadonlySet([ "checked", "value" ]), SPROUT_FROZEN_CLASS_CSS = "\n    .".concat("sprout-frozen", " {\n        clip-path: inset(100%);\n        pointer-events: none;\n        opacity: 0;\n    }\n"), DETACH_METHOD = Object.freeze({
        HIDE_UNHIDE: 1,
        CLONE: 2
    }), MAX_OPERATIONS_PER_ANIMATION_FRAME = 100, MAX_DOM_ACTIONS_PER_FRAME = {
        ATTRIBUTE_ACTIONS: 600,
        TEXT_ACTIONS: 300,
        ELEMENT_ACTIONS: 100,
        PROPERTY_ACTIONS: 50,
        REATTACH_ACTIONS: 10
    }, FRAME_BUDGET = 8;
    function isElementAList(element) {
        return "OL" === element.tagName || "UL" === element.tagName;
    }
    function _unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return _arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
        }
    }
    function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    var pendingPaintNodeManagers = NODES_STATE.pendingPaintNodeManagers, rafIds = new Map;
    function queueAnimationFrame(functionsToRun, type, afterRunFn) {
        var rafId;
        if (rafIds.has(type) && (rafId = rafIds.get(type), cancelAnimationFrame(rafId)), 
        functionsToRun.length < MAX_OPERATIONS_PER_ANIMATION_FRAME) rafId = requestAnimationFrame((function() {
            rafIds.delete(type), functionsToRun.forEach((function(fn) {
                return fn();
            })), afterRunFn && afterRunFn();
        })), rafIds.set(type, rafId); else {
            rafIds.delete(type);
            var functions = function _toConsumableArray(r) {
                return function _arrayWithoutHoles(r) {
                    if (Array.isArray(r)) return _arrayLikeToArray(r);
                }(r) || function _iterableToArray(r) {
                    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
                }(r) || _unsupportedIterableToArray(r) || function _nonIterableSpread() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }();
            }(functionsToRun), functionsIndex = 0;
            requestAnimationFrame((function runNextBatch() {
                functions.slice(functionsIndex, functionsIndex + MAX_OPERATIONS_PER_ANIMATION_FRAME).forEach((function(fn) {
                    return fn();
                })), (functionsIndex += MAX_OPERATIONS_PER_ANIMATION_FRAME) < functions.length && requestAnimationFrame(runNextBatch);
            }));
        }
    }
    var paintRafId = NODES_STATE.paintRafId, conditionalRenders = NODES_STATE.conditionalRenders;
    function queueConditionalRender(element, renderFunction) {
        conditionalRenders.set(element, renderFunction), queueAnimationFrame(Array.from(conditionalRenders.values()), "CONDITIONAL_RENDER", (function() {
            return conditionalRenders.clear();
        }));
    }
    function paint_utils_queuePaint() {
        paintRafId && cancelAnimationFrame(paintRafId), paintRafId = requestAnimationFrame((function() {
            paintRafId = null, doUpdateDOM();
        }));
    }
    function runDOMActions(actions) {
        actions.forEach((function(action) {
            return action();
        }));
    }
    function doUpdateDOM(pendingNodeManagers) {
        var _step, r, e, start = performance.now(), frameElapsed = 0, _iterator = function _createForOfIteratorHelper(r, e) {
            var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
            if (!t) {
                if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
                    t && (r = t);
                    var _n = 0, F = function F() {};
                    return {
                        s: F,
                        n: function n() {
                            return _n >= r.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: r[_n++]
                            };
                        },
                        e: function e(r) {
                            throw r;
                        },
                        f: F
                    };
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
            }
            var o, a = !0, u = !1;
            return {
                s: function s() {
                    t = t.call(r);
                },
                n: function n() {
                    var r = t.next();
                    return a = r.done, r;
                },
                e: function e(r) {
                    u = !0, o = r;
                },
                f: function f() {
                    try {
                        a || null == t.return || t.return();
                    } finally {
                        if (u) throw o;
                    }
                }
            };
        }(pendingPaintNodeManagers);
        try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                var nodeManager = _step.value, _nodeManager$resolveT2 = (r = nodeManager.resolveToDOMActions(), 
                e = 5, function _arrayWithHoles(r) {
                    if (Array.isArray(r)) return r;
                }(r) || function _iterableToArrayLimit(r, l) {
                    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
                    if (null != t) {
                        var e, n, i, u, a = [], f = !0, o = !1;
                        try {
                            if (i = (t = t.call(r)).next, 0 === l) {
                                if (Object(t) !== t) return;
                                f = !1;
                            } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
                        } catch (r) {
                            o = !0, n = r;
                        } finally {
                            try {
                                if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                            } finally {
                                if (o) throw n;
                            }
                        }
                        return a;
                    }
                }(r, e) || _unsupportedIterableToArray(r, e) || function _nonIterableRest() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }()), attributeActions = _nodeManager$resolveT2[0], textActions = _nodeManager$resolveT2[1], propertySetActions = _nodeManager$resolveT2[2], elementActions = _nodeManager$resolveT2[3], reattachActions = _nodeManager$resolveT2[4];
                if (runDOMActions(reattachActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.REATTACH_ACTIONS)), 
                (frameElapsed = performance.now() - start) > FRAME_BUDGET) return requestAnimationFrame((function() {
                    return doUpdateDOM();
                }));
                if (runDOMActions(elementActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.ELEMENT_ACTIONS)), 
                (frameElapsed = performance.now() - start) > FRAME_BUDGET) return requestAnimationFrame((function() {
                    return doUpdateDOM();
                }));
                if (runDOMActions(attributeActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.ATTRIBUTE_ACTIONS)), 
                (frameElapsed = performance.now() - start) > FRAME_BUDGET) return requestAnimationFrame((function() {
                    return doUpdateDOM();
                }));
                if (runDOMActions(textActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.TEXT_ACTIONS)), 
                (frameElapsed = performance.now() - start) > FRAME_BUDGET) return requestAnimationFrame((function() {
                    return doUpdateDOM();
                }));
                if (runDOMActions(propertySetActions.slice(0, MAX_DOM_ACTIONS_PER_FRAME.PROPERTY_ACTIONS)), 
                (frameElapsed = performance.now() - start) > FRAME_BUDGET) return requestAnimationFrame((function() {
                    return doUpdateDOM();
                }));
                if (attributeActions.length || textActions.length || propertySetActions.length || elementActions.length || reattachActions.length) return requestAnimationFrame((function() {
                    return doUpdateDOM();
                }));
                nodeManager.paintStatus = null, pendingPaintNodeManagers.delete(nodeManager);
            }
        } catch (err) {
            _iterator.e(err);
        } finally {
            _iterator.f();
        }
        if (frameElapsed > FRAME_BUDGET) return requestAnimationFrame((function() {
            return doUpdateDOM();
        }));
    }
    function node_actions_unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return node_actions_arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? node_actions_arrayLikeToArray(r, a) : void 0;
        }
    }
    function node_actions_arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function generateStateNodeActions(stateManager, stateProp, newValue) {
        var _this = this, value = newValue;
        "todosFiltered" === stateProp && performance.mark("todo-generate-node-actions");
        var stateNodes = stateManager.nodeManager.stateNodes[stateProp], stateMapElements = stateManager.stateArrayMaps[stateProp], conditionallyRenderingElements = stateManager.nodeManager.conditionallyRenderingElements[stateProp];
        if (stateNodes && stateNodes.forEach((function(node) {
            !function setStateNodeValueAction(nodeManager, node, value) {
                node.nodeType === Node.ATTRIBUTE_NODE ? nodeManager.addNodeAction(node, {
                    actionType: "setAttribute",
                    actionValue: value
                }) : node.nodeType === Node.TEXT_NODE && nodeManager.addNodeAction(node, {
                    actionType: "textContent",
                    actionValue: value
                });
            }(stateManager.nodeManager, node, value);
        })), stateMapElements) {
            var stateMapArray = value;
            stateMapElements.forEach((function(customElementName, parentElement) {
                !function reconcileStateMapElement(stateMapArray, customElementName, parentElement, stateManager) {
                    var detachedParentElement = null, mappedElementChange = !1, isParentList = isElementAList(parentElement), replacedChildren = new Map, expectedItems = (parentElement.getAttribute && parentElement.getAttribute("ref") || parentElement.refName || parentElement.tagName, 
                    stateMapArray.map((function asState(it) {
                        return Object.hasOwn(it, "state") ? it.state : it;
                    })));
                    if (stateMapArray.isNewArray) {
                        if (stateMapArray.length) {
                            var _detachedParentElemen;
                            mappedElementChange = !0;
                            var elements = mapStateArrayToElements(stateMapArray, customElementName, isParentList ? "li" : void 0, detachedParentElement = parentElement.detach());
                            detachedParentElement.innerHTML = "", (_detachedParentElemen = detachedParentElement).append.apply(_detachedParentElemen, function node_actions_toConsumableArray(r) {
                                return function node_actions_arrayWithoutHoles(r) {
                                    if (Array.isArray(r)) return node_actions_arrayLikeToArray(r);
                                }(r) || function node_actions_iterableToArray(r) {
                                    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
                                }(r) || node_actions_unsupportedIterableToArray(r) || function node_actions_nonIterableSpread() {
                                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                                }();
                            }(elements));
                        }
                    } else if (stateMapArray.lastOperation) {
                        mappedElementChange = !0, detachedParentElement || (detachedParentElement = parentElement.detach());
                        var children = detachedParentElement.children, _stateMapArray$lastOp = function node_actions_slicedToArray(r, e) {
                            return function node_actions_arrayWithHoles(r) {
                                if (Array.isArray(r)) return r;
                            }(r) || function node_actions_iterableToArrayLimit(r, l) {
                                var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
                                if (null != t) {
                                    var e, n, i, u, a = [], f = !0, o = !1;
                                    try {
                                        if (i = (t = t.call(r)).next, 0 === l) {
                                            if (Object(t) !== t) return;
                                            f = !1;
                                        } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
                                    } catch (r) {
                                        o = !0, n = r;
                                    } finally {
                                        try {
                                            if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                                        } finally {
                                            if (o) throw n;
                                        }
                                    }
                                    return a;
                                }
                            }(r, e) || node_actions_unsupportedIterableToArray(r, e) || function node_actions_nonIterableRest() {
                                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                            }();
                        }(stateMapArray.lastOperation, 2), operation = _stateMapArray$lastOp[0], args = _stateMapArray$lastOp[1];
                        switch (operation) {
                          case "shift":
                            detachedParentElement.removeChild(detachedParentElement.firstElementChild);
                            break;

                          case "unshift":
                            for (var i = args[0] - 1; i >= 0; i--) {
                                var _detachedParentElemen2, stateItem = stateMapArray[i], existing = null === (_detachedParentElemen2 = detachedParentElement.keyMap) || void 0 === _detachedParentElemen2 ? void 0 : _detachedParentElemen2.get(stateItem.key);
                                if (existing) {
                                    var first = detachedParentElement.firstElementChild;
                                    existing !== first && detachedParentElement.insertBefore(existing, first);
                                } else {
                                    var newChild = stateToElement(stateItem, customElementName, isParentList ? "li" : void 0, detachedParentElement);
                                    newChild.stateKey = stateItem.key, detachedParentElement.prepend(newChild);
                                }
                            }
                            break;

                          case "pop":
                            detachedParentElement.removeChild(detachedParentElement.lastElementChild);
                            break;

                          case "push":
                            for (var _i = children.length, len = stateMapArray.length; _i < len; _i++) {
                                var _stateItem = stateMapArray[_i], _newChild = stateToElement(_stateItem, customElementName, isParentList ? "li" : void 0, detachedParentElement);
                                _newChild.stateKey = _stateItem.key, detachedParentElement.appendChild(_newChild);
                            }
                            break;

                          case "splice":
                            var _args$, deleteCount, currentLen = children.length, rawStart = null !== (_args$ = args[0]) && void 0 !== _args$ ? _args$ : 0, rawDelete = args[1], _startIndex = rawStart < 0 ? Math.max(currentLen + rawStart, 0) : Math.min(rawStart, currentLen);
                            deleteCount = void 0 === rawDelete || rawDelete === 1 / 0 ? currentLen - _startIndex : rawDelete < 0 ? 0 : Math.min(rawDelete, currentLen - _startIndex);
                            var itemsToInsert = args[2] || [], expectedLen = stateMapArray.length;
                            if (0 === itemsToInsert.length && currentLen === expectedLen) break;
                            if (0 === _startIndex && deleteCount >= currentLen && itemsToInsert.length === expectedLen && currentLen === expectedLen) break;
                            for (var k = 0; k < deleteCount; k++) detachedParentElement.removeChild(children[_startIndex]);
                            var _step, _iterator = function node_actions_createForOfIteratorHelper(r, e) {
                                var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
                                if (!t) {
                                    if (Array.isArray(r) || (t = node_actions_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
                                        t && (r = t);
                                        var _n = 0, F = function F() {};
                                        return {
                                            s: F,
                                            n: function n() {
                                                return _n >= r.length ? {
                                                    done: !0
                                                } : {
                                                    done: !1,
                                                    value: r[_n++]
                                                };
                                            },
                                            e: function e(r) {
                                                throw r;
                                            },
                                            f: F
                                        };
                                    }
                                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                                }
                                var o, a = !0, u = !1;
                                return {
                                    s: function s() {
                                        t = t.call(r);
                                    },
                                    n: function n() {
                                        var r = t.next();
                                        return a = r.done, r;
                                    },
                                    e: function e(r) {
                                        u = !0, o = r;
                                    },
                                    f: function f() {
                                        try {
                                            a || null == t.return || t.return();
                                        } finally {
                                            if (u) throw o;
                                        }
                                    }
                                };
                            }(itemsToInsert);
                            try {
                                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                                    var _children$_startIndex, _newChild2 = stateToElement(_step.value, customElementName, isParentList ? "li" : void 0, detachedParentElement), refNode = null !== (_children$_startIndex = children[_startIndex]) && void 0 !== _children$_startIndex ? _children$_startIndex : null;
                                    detachedParentElement.insertBefore(_newChild2, refNode), _startIndex++;
                                }
                            } catch (err) {
                                _iterator.e(err);
                            } finally {
                                _iterator.f();
                            }
                        }
                    } else {
                        for (var _detachedParentElemen3, parentKeyMap = null == parentElement ? void 0 : parentElement.keyMap, _container = null !== (_detachedParentElemen3 = detachedParentElement) && void 0 !== _detachedParentElemen3 ? _detachedParentElemen3 : parentElement, _i2 = 0; _i2 < expectedItems.length; _i2++) {
                            var _currentChild$firstEl, _replacedChildren$get, expected = expectedItems[_i2], expectedKey = null == expected ? void 0 : expected.key, currentChild = _container.children[_i2];
                            if (!currentChild) break;
                            var currentState = isParentList ? null === (_currentChild$firstEl = currentChild.firstElementChild) || void 0 === _currentChild$firstEl ? void 0 : _currentChild$firstEl.state : currentChild.state, currentKey = currentState ? currentState.key : currentChild.stateKey;
                            if (currentKey !== expectedKey) {
                                mappedElementChange = !0, detachedParentElement || (detachedParentElement = parentElement.detach());
                                var elementToPut = null !== (_replacedChildren$get = replacedChildren.get(expectedKey)) && void 0 !== _replacedChildren$get ? _replacedChildren$get : parentKeyMap.get(expectedKey);
                                if (elementToPut) {
                                    var _elementToPut$firstEl, replacedChild = detachedParentElement.replaceChildWith(currentChild, elementToPut);
                                    if (replacedChildren.set(currentKey, replacedChild), (isParentList ? null === (_elementToPut$firstEl = elementToPut.firstElementChild) || void 0 === _elementToPut$firstEl ? void 0 : _elementToPut$firstEl.state : elementToPut.state) !== expected) {
                                        var refreshed = stateToElement(expected, customElementName, isParentList ? "li" : void 0, detachedParentElement);
                                        refreshed.stateKey = expectedKey, detachedParentElement.replaceChildWith(elementToPut, refreshed);
                                    }
                                } else {
                                    var _newChild4 = stateToElement(expected, customElementName, isParentList ? "li" : void 0, detachedParentElement);
                                    _newChild4.stateKey = expectedKey, detachedParentElement.replaceChildWith(currentChild, _newChild4);
                                }
                            } else if (currentState !== expected) {
                                mappedElementChange = !0, detachedParentElement || (detachedParentElement = parentElement.detach());
                                var _newChild3 = stateToElement(expected, customElementName, isParentList ? "li" : void 0, detachedParentElement);
                                _newChild3.stateKey = expectedKey, detachedParentElement.replaceChildWith(currentChild, _newChild3);
                            }
                        }
                        for (;(null !== (_detachedParentElemen4 = detachedParentElement) && void 0 !== _detachedParentElemen4 ? _detachedParentElemen4 : parentElement).children.length > expectedItems.length; ) {
                            var _detachedParentElemen4, _detachedParentElemen5;
                            mappedElementChange = !0, detachedParentElement || (detachedParentElement = parentElement.detach()), 
                            detachedParentElement.removeChild((null !== (_detachedParentElemen5 = detachedParentElement) && void 0 !== _detachedParentElemen5 ? _detachedParentElemen5 : parentElement).lastElementChild);
                        }
                    }
                    var numChildren = detachedParentElement ? detachedParentElement.children.length : parentElement.children.length;
                    if (stateMapArray.length > numChildren) {
                        mappedElementChange = !0, detachedParentElement || (detachedParentElement = parentElement.detach());
                        for (var index = detachedParentElement.children.length; index < stateMapArray.length; index++) {
                            var _detachedParentElemen6, state_Item = stateMapArray[index];
                            if (null === (_detachedParentElemen6 = detachedParentElement.keyMap) || void 0 === _detachedParentElemen6 || !_detachedParentElemen6.has(state_Item.key)) {
                                var _newChild5 = void 0;
                                (_newChild5 = replacedChildren.has(state_Item.key) ? replacedChildren.get(state_Item.key) : stateToElement(state_Item, customElementName, isParentList ? "li" : void 0, detachedParentElement)).stateKey = state_Item.key, 
                                detachedParentElement.appendChild(_newChild5);
                            }
                        }
                    }
                    mappedElementChange && stateManager.nodeManager.addNodeAction(detachedParentElement, {
                        actionType: "reattach",
                        actionValue: !0
                    });
                }(stateMapArray, customElementName, parentElement, stateManager);
            }));
        }
        conditionallyRenderingElements && conditionallyRenderingElements.forEach((function(element) {
            queueConditionalRender(_this, element.render.bind(_this));
        })), "pending" === stateManager.nodeManager.paintStatus && stateManager.nodeManager.queuePaint();
    }
    function setHiddenProperty(obj, propName, propValue) {
        var enumerable = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
        Object.defineProperty(obj, propName, {
            value: propValue,
            configurable: !1,
            writable: !0,
            enumerable
        });
    }
    function bindPropAttribute(attributeName, attributeValue, host) {
        var propName = attributeValue.substring(1), attrNode = this.getAttributeNode(attributeName);
        attrNode.nodeValue = host.getAttribute(propName), attrNode.isPropAttribute = !0, 
        host.propAttributes.has(propName) || host.propAttributes.set(propName, new Set), 
        host.propAttributes.get(propName).add(attrNode);
    }
    function parse_utils_toConsumableArray(r) {
        return function parse_utils_arrayWithoutHoles(r) {
            if (Array.isArray(r)) return parse_utils_arrayLikeToArray(r);
        }(r) || function parse_utils_iterableToArray(r) {
            if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
        }(r) || function parse_utils_unsupportedIterableToArray(r, a) {
            if (r) {
                if ("string" == typeof r) return parse_utils_arrayLikeToArray(r, a);
                var t = {}.toString.call(r).slice(8, -1);
                return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? parse_utils_arrayLikeToArray(r, a) : void 0;
            }
        }(r) || function parse_utils_nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function parse_utils_arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function parseStateExpression(expression) {
        if (0 === expression.indexOf("!")) return [ "negation", expression.substring(1) ];
        for (var _char, charIndex = 0, parsed = expression[charIndex]; charIndex++ < expression.length; ) {
            if (_char = expression[charIndex], 3 == charIndex && "is_" == parsed) return [ "equality" ].concat(parse_utils_toConsumableArray(expression.substring(3).split(":")));
            if ("?" === _char) return [ "ternary", parsed ].concat(parse_utils_toConsumableArray(expression.substring(charIndex + 1).split(":")));
            parsed += _char;
        }
        return [ "literal", expression ];
    }
    function fromAttributeValue(value) {
        return "" === value || null !== value && value;
    }
    function state_utils_slicedToArray(r, e) {
        return state_utils_arrayWithHoles(r) || function state_utils_iterableToArrayLimit(r, l) {
            var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
            if (null != t) {
                var e, n, i, u, a = [], f = !0, o = !1;
                try {
                    if (i = (t = t.call(r)).next, 0 === l) {
                        if (Object(t) !== t) return;
                        f = !1;
                    } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
                } catch (r) {
                    o = !0, n = r;
                } finally {
                    try {
                        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                    } finally {
                        if (o) throw n;
                    }
                }
                return a;
            }
        }(r, e) || state_utils_unsupportedIterableToArray(r, e) || state_utils_nonIterableRest();
    }
    function _toArray(r) {
        return state_utils_arrayWithHoles(r) || function state_utils_iterableToArray(r) {
            if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
        }(r) || state_utils_unsupportedIterableToArray(r) || state_utils_nonIterableRest();
    }
    function state_utils_nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function state_utils_unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return state_utils_arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? state_utils_arrayLikeToArray(r, a) : void 0;
        }
    }
    function state_utils_arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function state_utils_arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
    }
    "undefined" != typeof window && (window.SproutWaitIdle = function waitForIdle() {
        return new Promise((function(resolve) {
            requestAnimationFrame((function check() {
                if (!NODES_STATE.pendingPaintNodeManagers.size) return resolve();
                requestAnimationFrame(check);
            }));
        }));
    }), "undefined" == typeof HTMLElement || Object.defineProperty(globalThis, "elementSetAttribute", {
        value: HTMLElement.prototype.setAttribute,
        writable: !1,
        configurable: !1
    });
    var setAttribute = function setAttribute(attrName, attrValue) {
        !function isBooleanAttribute(attributeName) {
            return BOOLEAN_ATTRIBUTES.has(attributeName);
        }(attrName) ? elementSetAttribute.call(this, attrName, attrValue) : "false" === attrValue ? this.removeAttribute(attrName) : elementSetAttribute.call(this, attrName, "");
    }, setStateAttribute = function setStateAttribute(attrName, statePropExpression) {
        var _parseStateExpression2 = _toArray(parseStateExpression(statePropExpression)), type = _parseStateExpression2[0], args = _parseStateExpression2.slice(1), stateProp = args[0], _this$getState2 = state_utils_slicedToArray(this.getState(stateProp, !0), 2), stateVal = _this$getState2[0], theState = _this$getState2[1], stateManager = theState._stateManager, valueToSet = "literal" === type ? stateVal : stateManager.bindStatePropExpression(statePropExpression, type, args);
        this.removeAttribute(attrName);
        var stateAttrNode = document.createAttribute(attrName);
        stateAttrNode.nodeValue = valueToSet, setHiddenProperty(stateAttrNode, "isStateAttribute", !0), 
        setHiddenProperty(stateAttrNode, "originalOwnerElement", this), "boolean" == typeof valueToSet && (stateAttrNode.nodeValue = ""), 
        stateManager.addStateNode(statePropExpression, stateAttrNode), !1 !== valueToSet && this.setAttributeNode(stateAttrNode), 
        this.addEventListener("disconnected", (function() {
            theState._stateManager.removeStateNode(statePropExpression, stateAttrNode);
        }), {
            once: !0
        });
    }, setStateText = function setStateText(statePropExpression) {
        var _parseStateExpression4 = _toArray(parseStateExpression(statePropExpression)), type = _parseStateExpression4[0], args = _parseStateExpression4.slice(1), stateProp = args[0], _this$getState4 = state_utils_slicedToArray(this.getState(stateProp, !0), 2), stateVal = _this$getState4[0], theState = _this$getState4[1], stateManager = theState._stateManager, valueToSet = "literal" === type ? stateVal : stateManager.bindStatePropExpression(statePropExpression, type, args), textNode = document.createTextNode(valueToSet);
        setHiddenProperty(textNode, "isStateAttribute", !0), theState._stateManager.addStateNode(statePropExpression, textNode), 
        this.appendChild(textNode), this.addEventListener("disconnected", (function() {
            theState._stateManager.removeStateNode(statePropExpression, textNode);
        }), {
            once: !0
        });
    };
    function stateToElement(stateObject, elemName, wrapInElement, ownerMapElement) {
        var returnElement, customElementInstance = document.createElement(elemName);
        return customElementInstance.setInitialState(stateObject), customElementInstance.ownerMapElement = ownerMapElement, 
        wrapInElement ? (returnElement = document.createElement(wrapInElement)).appendChild(customElementInstance) : returnElement = customElementInstance, 
        stateObject.hasOwnProperty("key") && !returnElement.hasOwnProperty("stateKey") && (returnElement.stateKey = stateObject.key), 
        returnElement;
    }
    function mapStateArrayToElements(stateItems, elemName, wrapInElement, parentElement) {
        return stateItems.map((function(stateItem, index) {
            Object.hasOwn(stateItem, "state") && (stateItem = stateItem.state);
            var element = stateToElement(stateItem, elemName, wrapInElement, parentElement);
            return element.stateKey = stateItem.key, element;
        }));
    }
    function handleStateChange(stateManager, stateProp, changedValue) {
        var _descrp$get;
        if (!isBuiltInStateProp(stateProp)) {
            var newValue = null != changedValue ? changedValue : stateManager.state[stateProp], descrp = Object.getOwnPropertyDescriptor(stateManager.state, stateProp);
            null == descrp || null === (_descrp$get = descrp.get) || void 0 === _descrp$get || _descrp$get.isStateGetter, 
            !function dispatchStateChangEvent(state, property, newValue) {
                var stateChangeEvent = new CustomEvent("stateChange", {
                    bubbles: !1,
                    composed: !1,
                    detail: {
                        property,
                        newValue
                    }
                });
                state.dispatchEvent(stateChangeEvent);
            }(stateManager.state, stateProp, newValue), generateStateNodeActions(stateManager, stateProp, newValue), 
            stateProp.startsWith("!") || generateStateNodeActions(stateManager, "!".concat(stateProp), !newValue);
        }
    }
    function isBuiltInStateProp(stateProp) {
        return BUILT_IN_STATE_PROPS.has(stateProp);
    }
    function isSetterHook(stateProp) {
        return 0 === stateProp.indexOf("set_");
    }
    function StatefulArray_slicedToArray(r, e) {
        return function StatefulArray_arrayWithHoles(r) {
            if (Array.isArray(r)) return r;
        }(r) || function StatefulArray_iterableToArrayLimit(r, l) {
            var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
            if (null != t) {
                var e, n, i, u, a = [], f = !0, o = !1;
                try {
                    if (i = (t = t.call(r)).next, 0 === l) {
                        if (Object(t) !== t) return;
                        f = !1;
                    } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
                } catch (r) {
                    o = !0, n = r;
                } finally {
                    try {
                        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                    } finally {
                        if (o) throw n;
                    }
                }
                return a;
            }
        }(r, e) || StatefulArray_unsupportedIterableToArray(r, e) || function StatefulArray_nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function StatefulArray_unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return StatefulArray_arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? StatefulArray_arrayLikeToArray(r, a) : void 0;
        }
    }
    function StatefulArray_arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function StatefulArray_typeof(o) {
        return StatefulArray_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, StatefulArray_typeof(o);
    }
    function StatefulArray_defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, StatefulArray_toPropertyKey(o.key), o);
        }
    }
    function StatefulArray_possibleConstructorReturn(t, e) {
        if (e && ("object" == StatefulArray_typeof(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return function StatefulArray_assertThisInitialized(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        }(t);
    }
    function _get() {
        return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(e, t, r) {
            var p = function _superPropBase(t, o) {
                for (;!{}.hasOwnProperty.call(t, o) && null !== (t = StatefulArray_getPrototypeOf(t)); ) ;
                return t;
            }(e, t);
            if (p) {
                var n = Object.getOwnPropertyDescriptor(p, t);
                return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
            }
        }, _get.apply(null, arguments);
    }
    function StatefulArray_wrapNativeSuper(t) {
        var r = "function" == typeof Map ? new Map : void 0;
        return StatefulArray_wrapNativeSuper = function _wrapNativeSuper(t) {
            if (null === t || !function StatefulArray_isNativeFunction(t) {
                try {
                    return -1 !== Function.toString.call(t).indexOf("[native code]");
                } catch (n) {
                    return "function" == typeof t;
                }
            }(t)) return t;
            if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== r) {
                if (r.has(t)) return r.get(t);
                r.set(t, Wrapper);
            }
            function Wrapper() {
                return function StatefulArray_construct(t, e, r) {
                    if (StatefulArray_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
                    var o = [ null ];
                    o.push.apply(o, e);
                    var p = new (t.bind.apply(t, o));
                    return r && StatefulArray_setPrototypeOf(p, r.prototype), p;
                }(t, arguments, StatefulArray_getPrototypeOf(this).constructor);
            }
            return Wrapper.prototype = Object.create(t.prototype, {
                constructor: {
                    value: Wrapper,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), StatefulArray_setPrototypeOf(Wrapper, t);
        }, StatefulArray_wrapNativeSuper(t);
    }
    function StatefulArray_isNativeReflectConstruct() {
        try {
            var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
        } catch (t) {}
        return (StatefulArray_isNativeReflectConstruct = function _isNativeReflectConstruct() {
            return !!t;
        })();
    }
    function StatefulArray_setPrototypeOf(t, e) {
        return StatefulArray_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        }, StatefulArray_setPrototypeOf(t, e);
    }
    function StatefulArray_getPrototypeOf(t) {
        return StatefulArray_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, StatefulArray_getPrototypeOf(t);
    }
    function _defineProperty(e, r, t) {
        return (r = StatefulArray_toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[r] = t, e;
    }
    function StatefulArray_toPropertyKey(t) {
        var i = function StatefulArray_toPrimitive(t, r) {
            if ("object" != StatefulArray_typeof(t) || !t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
                var i = e.call(t, r || "default");
                if ("object" != StatefulArray_typeof(i)) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === r ? String : Number)(t);
        }(t, "string");
        return "symbol" == StatefulArray_typeof(i) ? i : i + "";
    }
    var StatefulArray = function(_Array) {
        function StatefulArray(initialArray, parentStateObject, arrayStateProp) {
            var _this, appScope = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : window, isStateMap = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            if (function StatefulArray_classCallCheck(a, n) {
                if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
            }(this, StatefulArray), appScope.SPROUT_CONFIG.stateManagerClass, !Array.isArray(initialArray)) throw Error("Argument for StateFulArray constructor must be an array!");
            var rawArray = initialArray, statefulArray = rawArray.map((function(item, index) {
                var stateItem = item;
                return Object.hasOwn(item, "state") || Object.hasOwn(item, "_stateManager") || Array.isArray(item) || "object" === StatefulArray_typeof(item) && (stateItem = newStateManager(item, arrayStateProp, parentStateObject._stateManager, handleStateChange, !1, appScope)), 
                stateItem;
            }));
            return _defineProperty(_this = function StatefulArray_callSuper(t, o, e) {
                return o = StatefulArray_getPrototypeOf(o), StatefulArray_possibleConstructorReturn(t, StatefulArray_isNativeReflectConstruct() ? Reflect.construct(o, e || [], StatefulArray_getPrototypeOf(t).constructor) : o.apply(t, e));
            }(this, StatefulArray, function StatefulArray_toConsumableArray(r) {
                return function StatefulArray_arrayWithoutHoles(r) {
                    if (Array.isArray(r)) return StatefulArray_arrayLikeToArray(r);
                }(r) || function StatefulArray_iterableToArray(r) {
                    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
                }(r) || StatefulArray_unsupportedIterableToArray(r) || function StatefulArray_nonIterableSpread() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }();
            }(statefulArray)), "arrayMaps", {}), _this.parentStateObject = parentStateObject, 
            _this.arrayStateProp = arrayStateProp, _this.appScope = appScope, _this.rawArray = rawArray, 
            isStateMap && _this.makeStateMap(), setHiddenProperty(statefulArray = new Proxy(_this, StatefulArrayHandler(null == parentStateObject ? void 0 : parentStateObject._stateManager, arrayStateProp, appScope)), "_isStatefulArray", !0), 
            _this.statefulArray = statefulArray, StatefulArray_possibleConstructorReturn(_this, statefulArray);
        }
        return function StatefulArray_inherits(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && StatefulArray_setPrototypeOf(t, e);
        }(StatefulArray, _Array), function StatefulArray_createClass(e, r, t) {
            return r && StatefulArray_defineProperties(e.prototype, r), t && StatefulArray_defineProperties(e, t), 
            Object.defineProperty(e, "prototype", {
                writable: !1
            }), e;
        }(StatefulArray, [ {
            key: Symbol.iterator,
            value: function value() {
                return _get(StatefulArray_getPrototypeOf(StatefulArray.prototype), Symbol.iterator, this).call(this);
            }
        }, {
            key: "runArrayOperation",
            value: function runArrayOperation(operationName, method, args) {
                switch (operationName) {
                  case "shift":
                    return this.lastOperation = [ "shift" ], [ method.apply(this, args), !1 ];

                  case "unshift":
                    return this.lastOperation = [ "unshift", [ args.length ] ], [ method.apply(this, args), !1 ];

                  case "pop":
                    return this.lastOperation = [ "pop" ], [ method.apply(this), !1 ];

                  case "push":
                    return this.lastOperation = [ "push", [ args.length ] ], [ method.apply(this, args), !1 ];

                  case "splice":
                    var _args = StatefulArray_slicedToArray(args, 2), startIndex = _args[0], deleteCount = _args[1], itemsToAdd = args.slice(2);
                    return this.lastOperation = [ "splice", [ startIndex, deleteCount, itemsToAdd ] ], 
                    [ method.apply(this, args), !1 ];

                  default:
                    this.lastOperation = void 0;
                    var _res5 = method.apply(this, args);
                    return [ _res5, Array.isArray(_res5) ];
                }
            }
        }, {
            key: "doArrayOperation",
            value: function doArrayOperation(operationName, args) {
                var setDirtyProp = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                this.$$operation = operationName;
                var result, prevLen = this.length, isNewArray = !1;
                if (ARRAY_CACHE_METHODS.has(operationName)) {
                    var callbackFn = args[0];
                    if (this.length && Object.hasOwn(this.arrayMaps, operationName) && this.arrayMaps[operationName].has(callbackFn)) {
                        var cachedArrayMapMetadata = this.arrayMaps[operationName].get(callbackFn);
                        if (this.lastDirtyTimestamp > cachedArrayMapMetadata.timestamp) {
                            var _this$runArrayOperati2 = StatefulArray_slicedToArray(this.runArrayOperation(operationName, _get(StatefulArray_getPrototypeOf(StatefulArray.prototype), operationName, this), args), 2);
                            result = _this$runArrayOperati2[0], isNewArray = _this$runArrayOperati2[1], this.arrayMaps[operationName].set(callbackFn, {
                                lastResult: result,
                                timestamp: (new Date).getTime()
                            });
                        } else result = cachedArrayMapMetadata.lastResult;
                    } else {
                        var _this$runArrayOperati4 = StatefulArray_slicedToArray(this.runArrayOperation(operationName, _get(StatefulArray_getPrototypeOf(StatefulArray.prototype), operationName, this), args), 2);
                        result = _this$runArrayOperati4[0], isNewArray = _this$runArrayOperati4[1], Object.hasOwn(this.arrayMaps, operationName) || (this.arrayMaps[operationName] = new Map, 
                        this.arrayMaps[operationName].set(callbackFn, {
                            lastResult: result,
                            timestamp: (new Date).getTime()
                        }));
                    }
                } else {
                    var _this$runArrayOperati6 = StatefulArray_slicedToArray(this.runArrayOperation(operationName, _get(StatefulArray_getPrototypeOf(StatefulArray.prototype), operationName, this), args), 2);
                    result = _this$runArrayOperati6[0], isNewArray = _this$runArrayOperati6[1];
                }
                var postLen = this.length, isOrderOnly = ARRAY_MUTATE_NO_LENGTH_CHANGE_METHODS.has(operationName) || "splice" === operationName && postLen === prevLen;
                return setDirtyProp && isOrderOnly && this.parentStateObject._stateManager.setDirtyProp("".concat(this.arrayStateProp, ".length"), !0), 
                delete this.$$operation, setDirtyProp && this.parentStateObject._stateManager.setDirtyProp(this.arrayStateProp), 
                [ result, isNewArray ];
            }
        }, {
            key: "mapStateKeys",
            value: function mapStateKeys() {
                var _this2 = this;
                this.forEach((function(item) {
                    var state = Object.hasOwn(item, "state") ? item.state : item;
                    _this2.keyMap.set(state.key, state);
                }));
            }
        }, {
            key: "makeStateMap",
            value: function makeStateMap() {
                this._isStateMap = !0, this.keyMap = new Map, this.mapStateKeys();
            }
        } ], [ {
            key: Symbol.species,
            get: function get() {
                return Array;
            }
        } ]);
    }(StatefulArray_wrapNativeSuper(Array));
    function proxy_handlers_typeof(o) {
        return proxy_handlers_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, proxy_handlers_typeof(o);
    }
    function proxy_handlers_slicedToArray(r, e) {
        return function proxy_handlers_arrayWithHoles(r) {
            if (Array.isArray(r)) return r;
        }(r) || function proxy_handlers_iterableToArrayLimit(r, l) {
            var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
            if (null != t) {
                var e, n, i, u, a = [], f = !0, o = !1;
                try {
                    if (i = (t = t.call(r)).next, 0 === l) {
                        if (Object(t) !== t) return;
                        f = !1;
                    } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
                } catch (r) {
                    o = !0, n = r;
                } finally {
                    try {
                        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                    } finally {
                        if (o) throw n;
                    }
                }
                return a;
            }
        }(r, e) || function proxy_handlers_unsupportedIterableToArray(r, a) {
            if (r) {
                if ("string" == typeof r) return proxy_handlers_arrayLikeToArray(r, a);
                var t = {}.toString.call(r).slice(8, -1);
                return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? proxy_handlers_arrayLikeToArray(r, a) : void 0;
            }
        }(r, e) || function proxy_handlers_nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function proxy_handlers_arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    _defineProperty(StatefulArray, "functions", new ReadonlySet([ "constructor", "statifyArray", "addDirtyIndex", "doArrayOperation", "runArrayOperation", "makeStateMap", "mapStateKeys", "toArray" ]));
    var depsProxyHandler = function depsProxyHandler() {
        return {
            get: function get(target, property, receiver) {
                var _descrp$get;
                if (isBuiltInStateProp(property) || 0 === property.indexOf("$$")) return Reflect.get.apply(Reflect, arguments);
                var descrp = Object.getOwnPropertyDescriptor(target, property);
                return null != descrp && null !== (_descrp$get = descrp.get) && void 0 !== _descrp$get && _descrp$get.isStateGetter || (Object.hasOwn(target.$$accessCount, property) ? target.$$accessCount[property]++ : target.$$accessCount[property] = 1), 
                Reflect.get.apply(Reflect, arguments);
            }
        };
    }, StateFunctionDependencyHandler = function StateFunctionDependencyHandler(stateManager, stateProp) {
        return arguments.length > 2 && void 0 !== arguments[2] || window, stateManager.state, 
        {
            apply: function apply(thisFunction, thisStateObject, argumentsList) {
                stateManager.clearStateDependencies(stateProp);
                var originalGlobalState = thisStateObject._global, _getDeps2 = proxy_handlers_slicedToArray(getDeps(thisFunction, thisStateObject), 3), deps = _getDeps2[0], globalDeps = _getDeps2[1], result = _getDeps2[2];
                return deps.forEach((function(depProp) {
                    stateManager.addStateDependency(depProp, stateProp);
                })), null == globalDeps || globalDeps.forEach((function(depProp) {
                    originalGlobalState._stateManager.addGlobalStateDependency(depProp, stateProp, stateManager);
                })), result;
            }
        };
    }, StatefulArrayHandler = function StatefulArrayHandler(parentStateManager, arrayStateProp) {
        var setResult, appScope = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window, triggerStateChange = function triggerStateChange() {
            var triggerLength = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) && parentStateManager.setDirtyProp(arrayStateProp, !0), 
            triggerLength && parentStateManager.setDirtyProp("".concat(arrayStateProp, ".length"), !0);
        }, keyOf = function keyOf(item) {
            var _item$state;
            if (item) return Object.hasOwn(item, "state") ? null === (_item$state = item.state) || void 0 === _item$state ? void 0 : _item$state.key : item.key;
        };
        return {
            set: function set(targetArray, property, value) {
                if (0 === property.indexOf("$$")) return Reflect.set(targetArray, property, value);
                if ("length" === property) return setResult = Reflect.set(targetArray, property, value), 
                targetArray.hasDirtyItems = !0, targetArray.hasOwnProperty("$$operation") ? triggerStateChange(!0, !1) : triggerStateChange(!0, !0), 
                setResult;
                if (targetArray[property] === value) return !0;
                if (Number(property), !isNaN(property)) {
                    var _index = Number(property), prev = targetArray[_index], prevKey = keyOf(prev);
                    if (value = statifyValue(value, arrayStateProp, parentStateManager, appScope), Object.hasOwn(value, "_stateManager") && (value = value._stateManager), 
                    !targetArray.hasOwnProperty("$$operation")) {
                        var doStateChangeHandle = !1;
                        if (_index < targetArray.length && (doStateChangeHandle = !0), (setResult = Reflect.set(targetArray, property, value)) && targetArray._isStateMap) {
                            void 0 !== prevKey && targetArray.keyMap.delete(prevKey);
                            var newKey = keyOf(value);
                            void 0 !== newKey && targetArray.keyMap.set(newKey, function stateOf(item) {
                                return Object.hasOwn(item, "state") ? item.state : item;
                            }(value));
                        }
                        return doStateChangeHandle && triggerStateChange(), setResult;
                    }
                }
                return Reflect.set(targetArray, property, value);
            },
            get: function get(targetArray, property, receiver) {
                if ("symbol" === proxy_handlers_typeof(property)) return Reflect.get.apply(Reflect, arguments);
                if ("length" === property && Object.hasOwn(targetArray.parentStateObject, "$$accessCount") && !Object.hasOwn(targetArray, "$$operation")) {
                    var arrStateProp = targetArray.arrayStateProp;
                    Object.hasOwn(targetArray.parentStateObject.$$accessCount, "".concat(arrStateProp, ".length")) ? targetArray.parentStateObject.$$accessCount["".concat(arrStateProp, ".length")]++ : targetArray.parentStateObject.$$accessCount["".concat(arrStateProp, ".length")] = 1;
                }
                if (property.indexOf && 0 === property.indexOf("__")) {
                    var nativeFunctionName = property.substring(2);
                    return Reflect.get(targetArray, nativeFunctionName, receiver);
                }
                if ("function" == typeof targetArray[property] && !StatefulArray.functions.has(property)) {
                    var pso = targetArray.parentStateObject;
                    if (pso && Object.hasOwn(pso, "$$accessCount")) {
                        var methodName = String(property);
                        if (ARRAY_DERIVE_METHODS.has(methodName)) {
                            var arrayProp = targetArray.arrayStateProp;
                            pso.$$accessCount[arrayProp] = (pso.$$accessCount[arrayProp] || 0) + 1;
                        }
                    }
                }
                if (!parentStateManager.isInitializing && "function" == typeof targetArray[property] && !StatefulArray.functions.has(property)) return function() {
                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    var _targetArray$doArrayO2 = proxy_handlers_slicedToArray(targetArray.doArrayOperation.call(targetArray.statefulArray, property, args, ARRAY_MUTATE_METHODS.has(property)), 2), result = _targetArray$doArrayO2[0];
                    return _targetArray$doArrayO2[1], result;
                };
                var index = Number(property);
                if (!isNaN(index)) {
                    var item = targetArray[index];
                    if (void 0 === item) return;
                    return item && Object.hasOwn(item, "state") ? item.state : item;
                }
                return Reflect.get.apply(Reflect, arguments);
            },
            deleteProperty: function deleteProperty(targetArray, property) {
                if (isNaN(Number(property))) return Reflect.deleteProperty(targetArray, property);
                var prev = targetArray[Number(property)], prevKey = keyOf(prev), deleteOkay = Reflect.deleteProperty(targetArray, property);
                return deleteOkay && targetArray._isStateMap && void 0 !== prevKey && targetArray.keyMap.delete(prevKey), 
                deleteOkay;
            }
        };
    };
    function conditionalElements() {
        this.conditionallyRenderingElements = {}, this.addConditionallyRenderingElements = function(stateProp, element) {
            this.nodeManager.addConditionallyRenderingElements(stateProp, element);
        };
    }
    function stateMaps() {
        this.stateArrayMaps = {}, this.addStateMap = function(stateProp, customElementName, parentElement) {
            this.stateArrayMaps.hasOwnProperty(stateProp) || (this.stateArrayMaps[stateProp] = new Map), 
            this.stateArrayMaps[stateProp].set(parentElement, customElementName);
        }, this.clearStateMapsLastOperation = function() {
            for (var _i = 0, _Object$keys = Object.keys(this.stateArrayMaps); _i < _Object$keys.length; _i++) {
                var stateMapProp = _Object$keys[_i];
                delete this.state[stateMapProp].lastOperation;
            }
        };
    }
    function Cougar_state_utils_slicedToArray(r, e) {
        return function Cougar_state_utils_arrayWithHoles(r) {
            if (Array.isArray(r)) return r;
        }(r) || function Cougar_state_utils_iterableToArrayLimit(r, l) {
            var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
            if (null != t) {
                var e, n, i, u, a = [], f = !0, o = !1;
                try {
                    if (i = (t = t.call(r)).next, 0 === l) {
                        if (Object(t) !== t) return;
                        f = !1;
                    } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
                } catch (r) {
                    o = !0, n = r;
                } finally {
                    try {
                        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                    } finally {
                        if (o) throw n;
                    }
                }
                return a;
            }
        }(r, e) || function Cougar_state_utils_unsupportedIterableToArray(r, a) {
            if (r) {
                if ("string" == typeof r) return Cougar_state_utils_arrayLikeToArray(r, a);
                var t = {}.toString.call(r).slice(8, -1);
                return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? Cougar_state_utils_arrayLikeToArray(r, a) : void 0;
            }
        }(r, e) || function Cougar_state_utils_nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function Cougar_state_utils_arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function Cougar_state_utils_typeof(o) {
        return Cougar_state_utils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, Cougar_state_utils_typeof(o);
    }
    function state_utils_setPrototypeOf(t, e) {
        return state_utils_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        }, state_utils_setPrototypeOf(t, e);
    }
    function state_utils_isNativeReflectConstruct() {
        try {
            var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
        } catch (t) {}
        return (state_utils_isNativeReflectConstruct = function _isNativeReflectConstruct() {
            return !!t;
        })();
    }
    function newStateManager(initialState, parentStateProp, parentStateManager) {
        var appScope = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : window, stateManager = new Cougar_StateManager(initialState, parentStateProp, parentStateManager, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : handleStateChange, arguments.length > 4 && void 0 !== arguments[4] && arguments[4], appScope);
        return stateManager.use(conditionalElements, "conditional-element"), stateManager.use(stateMaps, "map"), 
        stateManager;
    }
    function statifyValue(value, stateProp, stateManager) {
        var appScope = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : window, isStateMap = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        return isBuiltInStateProp(stateProp) || (Array.isArray(value) ? value = function statifyArray(array, stateProp, state) {
            var appScope = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : window, isStateMap = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            if (Object.hasOwn(array, "_isStatefulArray")) return array;
            var statefulArray = function state_utils_construct(t, e, r) {
                if (state_utils_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
                var o = [ null ];
                o.push.apply(o, e);
                var p = new (t.bind.apply(t, o));
                return r && state_utils_setPrototypeOf(p, r.prototype), p;
            }(StatefulArray, [ array, state, stateProp, appScope, isStateMap ]);
            return state.hasOwnProperty("".concat(stateProp, ".length")) || Object.defineProperty(state, "".concat(stateProp, ".length"), {
                get: function get() {
                    return this[stateProp].length;
                }
            }), statefulArray;
        }(value, stateProp, stateManager.state, appScope, isStateMap) : "object" !== Cougar_state_utils_typeof(value) || null === value || value.hasOwnProperty("_stateManager") || (value = newStateManager(value, stateProp, stateManager, handleStateChange, !1, appScope).state)), 
        value;
    }
    function initSetterHook(setterArray, stateProp, stateManager) {
        var _setterOptions$deps, appScope = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : window, setterHookName = "set_".concat(stateProp), _setterArray = Cougar_state_utils_slicedToArray(setterArray, 2), setterFunc = _setterArray[0], setterOptions = _setterArray[1];
        if ("function" != typeof setterFunc) throw Error("Setter hooks must define a function as the first item!");
        var result, state = stateManager.state;
        if (setterOptions.deps = null !== (_setterOptions$deps = setterOptions.deps) && void 0 !== _setterOptions$deps ? _setterOptions$deps : "auto", 
        !setterOptions.init || !setterOptions.once) if ("auto" === setterOptions.deps) if (setterOptions.reevaluate) {
            var stateDependencyHandler = StateFunctionDependencyHandler(stateManager, setterHookName, appScope);
            setterFunc = new Proxy(setterFunc, stateDependencyHandler), setterArray[0] = setterFunc;
        } else {
            var _globalDeps, deps, globalDeps, _getDeps2 = Cougar_state_utils_slicedToArray(getDeps(setterFunc, state), 3);
            deps = _getDeps2[0], globalDeps = _getDeps2[1], result = _getDeps2[2], deps.forEach((function(dep) {
                stateManager.addStateDependency(dep, setterHookName);
            })), null === (_globalDeps = globalDeps) || void 0 === _globalDeps || _globalDeps.forEach((function(dep) {
                stateManager.addStateDependency(dep, setterHookName), state._global._stateManager.addGlobalStateDependency(dep, setterHookName, stateManager);
            }));
        } else setterOptions.deps.forEach((function(dep) {
            if (0 === dep.indexOf("global")) {
                var globalDep = dep.substring(dep.indexOf("global.") + 7);
                state._global.addGlobalStateDependency(setterHookName, globalDep, stateManager);
            } else stateManager.addStateDependency(dep, setterHookName);
        }));
        Object.defineProperty(state, stateProp, {
            get: function get() {
                return Object.hasOwn(state, "$$accessCount") && (Object.hasOwn(state.$$accessCount, stateProp) ? state.$$accessCount[stateProp]++ : state.$$accessCount[stateProp] = 1), 
                stateManager.privateState[stateProp];
            },
            set: function set() {
                throw Error("Cannot directly set the state value of a result of a setter hook function!");
            }
        }), setterOptions.init && (result || (result = setterFunc.call(state)), (setterOptions.statify || setterOptions.stateMap) && (result = statifyValue(result, stateProp, stateManager, appScope, setterOptions.stateMap)), 
        stateManager.privateState[stateProp] = result, stateManager.setDirtyProp(stateProp));
    }
    function callSetterHook(setterArray, stateProp, stateManager) {
        var appScope = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : window, state = stateManager.state, originalValue = stateManager.privateState[stateProp];
        void 0 === originalValue && initSetterHook(setterArray, stateProp, stateManager, appScope);
        var _setterArray2 = Cougar_state_utils_slicedToArray(setterArray, 2), setterFunc = _setterArray2[0], setterOptions = _setterArray2[1];
        if ("function" != typeof setterFunc) throw Error("Setter hooks must define a function as the first item!");
        var result = setterFunc.call(state), hasNewValue = !1;
        if (void 0 === result) throw Error("State Set Hook functions MUST return a value");
        return (setterOptions.statify || setterOptions.stateMap) && (result = statifyValue(result, stateProp, stateManager, appScope, setterOptions.stateMap)), 
        result !== originalValue && (stateManager.privateState[stateProp] = result, hasNewValue = !0), 
        setterOptions.once && delete state["set_".concat(stateProp)], hasNewValue;
    }
    function resolveAccessCountToDepsSet(depsCount) {
        var lengthIndex;
        for (var prop in depsCount) -1 !== (lengthIndex = prop.indexOf(".length")) && depsCount[prop.substring(0, lengthIndex)]--;
        return new Set(Object.keys(depsCount).filter((function(dep) {
            return depsCount[dep] > 0;
        })));
    }
    function getDeps(ofFunction, fromStateObject) {
        var hasGlobal = !1, depsProxy = new Proxy(fromStateObject, depsProxyHandler());
        depsProxy.$$accessCount = {}, Object.hasOwn(depsProxy, "_global") && depsProxy._global !== GLOBAL_STATE_NOT_SET_YET && (hasGlobal = !0, 
        depsProxy._global = new Proxy(depsProxy._global, depsProxyHandler), depsProxy._global.$$accessCount = {});
        var result = ofFunction.call(depsProxy), deps = resolveAccessCountToDepsSet(depsProxy.$$accessCount);
        delete depsProxy.$$accessCount;
        var globalDeps = null;
        return hasGlobal && (globalDeps = resolveAccessCountToDepsSet(depsProxy._global.$$accessCount), 
        delete depsProxy._global.$$accessCount), [ deps, globalDeps, result ];
    }
    function defineStateExpressionResolver(statePropExpression, stateObj, getter, contextStateProp) {
        Object.defineProperty(stateObj, statePropExpression, {
            get: getter,
            set: function set() {
                throw Error("Cannot directly set a State property expression");
            },
            enumerable: !0
        }), stateObj._stateManager.addStateDependency(contextStateProp, statePropExpression);
    }
    function sortDeps(depsSet) {
        var deps = new Set, setterDeps = new Set;
        return depsSet.forEach((function(dep) {
            isSetterHook(dep) ? setterDeps.add(dep) : deps.add(dep);
        })), [ deps, setterDeps ];
    }
    function NodeManager_createForOfIteratorHelper(r, e) {
        var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (!t) {
            if (Array.isArray(r) || (t = NodeManager_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
                t && (r = t);
                var _n = 0, F = function F() {};
                return {
                    s: F,
                    n: function n() {
                        return _n >= r.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: r[_n++]
                        };
                    },
                    e: function e(r) {
                        throw r;
                    },
                    f: F
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var o, a = !0, u = !1;
        return {
            s: function s() {
                t = t.call(r);
            },
            n: function n() {
                var r = t.next();
                return a = r.done, r;
            },
            e: function e(r) {
                u = !0, o = r;
            },
            f: function f() {
                try {
                    a || null == t.return || t.return();
                } finally {
                    if (u) throw o;
                }
            }
        };
    }
    function NodeManager_typeof(o) {
        return NodeManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, NodeManager_typeof(o);
    }
    function NodeManager_unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return NodeManager_arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? NodeManager_arrayLikeToArray(r, a) : void 0;
        }
    }
    function NodeManager_arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function NodeManager_defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, NodeManager_toPropertyKey(o.key), o);
        }
    }
    function NodeManager_defineProperty(e, r, t) {
        return (r = NodeManager_toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[r] = t, e;
    }
    function NodeManager_toPropertyKey(t) {
        var i = function NodeManager_toPrimitive(t, r) {
            if ("object" != NodeManager_typeof(t) || !t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
                var i = e.call(t, r || "default");
                if ("object" != NodeManager_typeof(i)) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === r ? String : Number)(t);
        }(t, "string");
        return "symbol" == NodeManager_typeof(i) ? i : i + "";
    }
    function _classPrivateFieldGet(s, a) {
        return s.get(function _assertClassBrand(e, t, n) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
            throw new TypeError("Private element is not present on this object");
        }(s, a));
    }
    var NodeManager_pendingPaintNodeManagers = NODES_STATE.pendingPaintNodeManagers, _nodeActions = new WeakMap, NodeManager = function() {
        return function NodeManager_createClass(e, r, t) {
            return r && NodeManager_defineProperties(e.prototype, r), t && NodeManager_defineProperties(e, t), 
            Object.defineProperty(e, "prototype", {
                writable: !1
            }), e;
        }((function NodeManager() {
            !function NodeManager_classCallCheck(a, n) {
                if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
            }(this, NodeManager), NodeManager_defineProperty(this, "stateNodes", {}), NodeManager_defineProperty(this, "conditionallyRenderingElements", {}), 
            NodeManager_defineProperty(this, "bindableAttributesStateNodes", new Map(function NodeManager_toConsumableArray(r) {
                return function NodeManager_arrayWithoutHoles(r) {
                    if (Array.isArray(r)) return NodeManager_arrayLikeToArray(r);
                }(r) || function NodeManager_iterableToArray(r) {
                    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
                }(r) || NodeManager_unsupportedIterableToArray(r) || function NodeManager_nonIterableSpread() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }();
            }(BINDABLE_ATTRIBUTES_TO_STATE_NODES).map((function(attributeName) {
                return [ attributeName, new Map ];
            })))), function _classPrivateFieldInitSpec(e, t, a) {
                (function _checkPrivateRedeclaration(e, t) {
                    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
                })(e, t), t.set(e, a);
            }(this, _nodeActions, new Map), NodeManager_defineProperty(this, "paintStatus", null);
        }), [ {
            key: "addStateNode",
            value: function addStateNode(stateProp, stateNode) {
                this.stateNodes.hasOwnProperty(stateProp) || (this.stateNodes[stateProp] = new Set), 
                this.stateNodes[stateProp].add(stateNode), SUPPORTED_ATTRIBUTES_FOR_BINDING.has(stateNode.nodeName) && this.bindableAttributesStateNodes.get(stateNode.nodeName).set(stateNode.originalOwnerElement, stateNode);
            }
        }, {
            key: "removeStateNode",
            value: function removeStateNode(stateProp, stateNode) {
                var _this$stateNodes;
                null === (_this$stateNodes = this.stateNodes) || void 0 === _this$stateNodes || _this$stateNodes[stateProp].delete(stateNode);
            }
        }, {
            key: "addConditionallyRenderingElements",
            value: function addConditionallyRenderingElements(stateProp, element) {
                var _element$host;
                this.conditionallyRenderingElements.hasOwnProperty(stateProp) || (this.conditionallyRenderingElements[stateProp] = new Set), 
                element.originalParentElement = element.parentElement || (null === (_element$host = element.host) || void 0 === _element$host ? void 0 : _element$host.shadowRoot), 
                this.conditionallyRenderingElements[stateProp].add(element);
            }
        }, {
            key: "addNodeAction",
            value: function addNodeAction(node, action) {
                _classPrivateFieldGet(_nodeActions, this).has(node) || _classPrivateFieldGet(_nodeActions, this).set(node, function getNewNodeActionsObject(nodeType) {
                    switch (nodeType) {
                      case Node.ATTRIBUTE_NODE:
                        return {
                            setAttribute: void 0
                        };

                      case Node.TEXT_NODE:
                        return {
                            textContent: void 0
                        };

                      case Node.ELEMENT_NODE:
                        return {
                            append: new Set,
                            reattach: !1,
                            setProperty: new Map,
                            get hasPendingActions() {
                                return this.append.size || this.reattach || this.setProperty.size;
                            }
                        };
                    }
                }(node.nodeType));
                var nodeActions = _classPrivateFieldGet(_nodeActions, this).get(node), actionType = action.actionType, actionValue = action.actionValue;
                if (node.nodeType === Node.ELEMENT_NODE) switch (actionType) {
                  case "append":
                    nodeActions.append.add(actionValue);
                    break;

                  case "setProperty":
                    nodeActions.setProperty(actionValue.property, actionValue.value);
                    break;

                  case "reattach":
                    nodeActions.reattach = !0;
                } else nodeActions[actionType] = actionValue;
                this.paintStatus || (this.paintStatus = "pending");
            }
        }, {
            key: "queuePaint",
            value: function queuePaint() {
                "pending" === this.paintStatus && (NodeManager_pendingPaintNodeManagers.add(this), 
                paint_utils_queuePaint(), this.paintStatus = "queued");
            }
        }, {
            key: "resolveToDOMActions",
            value: function resolveToDOMActions() {
                var attributeActions = [], textActions = [], elementActions = [], reattachActions = [], propertySetActions = [];
                return _classPrivateFieldGet(_nodeActions, this).forEach((function(nodeActions, node) {
                    switch (node.nodeType) {
                      case Node.ATTRIBUTE_NODE:
                        var value = nodeActions.setAttribute, typeOfValue = NodeManager_typeof(value);
                        if ("undefined" !== typeOfValue) if ("boolean" === typeOfValue) {
                            if (!node.hasOwnProperty("originalOwnerElement")) throw Error("originalOwnerElement not found on boolean attribute node! Should never happen!");
                            !1 === value ? node.originalOwnerElement.hasAttribute(node.name) && attributeActions.push((function() {
                                node.originalOwnerElement.removeAttributeNode(node);
                            })) : node.originalOwnerElement.hasAttribute(node.name) || attributeActions.push((function() {
                                node.originalOwnerElement.setAttributeNode(node);
                            }));
                        } else "string" === typeOfValue && node.nodeValue !== value && attributeActions.push((function() {
                            return node.nodeValue = value;
                        }));
                        break;

                      case Node.TEXT_NODE:
                        if (void 0 !== nodeActions.textContent) {
                            var _value = String(nodeActions.textContent);
                            node.nodeValue !== _value && textActions.push((function() {
                                return node.nodeValue = _value;
                            }));
                        }
                        break;

                      case Node.ELEMENT_NODE:
                        var _step, _iterator = NodeManager_createForOfIteratorHelper(nodeActions.append.values());
                        try {
                            var _loop = function _loop() {
                                var newChildElement = _step.value;
                                elementActions.push((function() {
                                    return node.appendChild(newChildElement);
                                }));
                            };
                            for (_iterator.s(); !(_step = _iterator.n()).done; ) _loop();
                        } catch (err) {
                            _iterator.e(err);
                        } finally {
                            _iterator.f();
                        }
                        var _step2, _node$pendingKeyMapAc, _iterator2 = NodeManager_createForOfIteratorHelper(nodeActions.setProperty);
                        try {
                            var _loop2 = function _loop2() {
                                var _step2$value = function NodeManager_slicedToArray(r, e) {
                                    return function NodeManager_arrayWithHoles(r) {
                                        if (Array.isArray(r)) return r;
                                    }(r) || function NodeManager_iterableToArrayLimit(r, l) {
                                        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
                                        if (null != t) {
                                            var e, n, i, u, a = [], f = !0, o = !1;
                                            try {
                                                if (i = (t = t.call(r)).next, 0 === l) {
                                                    if (Object(t) !== t) return;
                                                    f = !1;
                                                } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
                                            } catch (r) {
                                                o = !0, n = r;
                                            } finally {
                                                try {
                                                    if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                                                } finally {
                                                    if (o) throw n;
                                                }
                                            }
                                            return a;
                                        }
                                    }(r, e) || NodeManager_unsupportedIterableToArray(r, e) || function NodeManager_nonIterableRest() {
                                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                                    }();
                                }(_step2.value, 2), key = _step2$value[0], value = _step2$value[1];
                                node[key] !== value && propertySetActions.push((function() {
                                    return node[key] = value;
                                }));
                            };
                            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) _loop2();
                        } catch (err) {
                            _iterator2.e(err);
                        } finally {
                            _iterator2.f();
                        }
                        nodeActions.reattach && (reattachActions.push((function() {
                            return node.reattach();
                        })), null != node && null !== (_node$pendingKeyMapAc = node.pendingKeyMapActions) && void 0 !== _node$pendingKeyMapAc && _node$pendingKeyMapAc.size && reattachActions.push((function() {
                            var _step3, _iterator3 = NodeManager_createForOfIteratorHelper(node.pendingKeyMapActions);
                            try {
                                for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) (0, _step3.value)();
                            } catch (err) {
                                _iterator3.e(err);
                            } finally {
                                _iterator3.f();
                            }
                            node.pendingKeyMapActions.clear();
                        })), nodeActions.reattach = !1);
                    }
                })), _classPrivateFieldGet(_nodeActions, this).clear(), [ attributeActions, textActions, propertySetActions, elementActions, reattachActions ];
            }
        } ]);
    }();
    function StateManager_typeof(o) {
        return StateManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, StateManager_typeof(o);
    }
    function StateManager_iterableToArray(r) {
        if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
    }
    function StateManager_slicedToArray(r, e) {
        return StateManager_arrayWithHoles(r) || function StateManager_iterableToArrayLimit(r, l) {
            var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
            if (null != t) {
                var e, n, i, u, a = [], f = !0, o = !1;
                try {
                    if (i = (t = t.call(r)).next, 0 === l) {
                        if (Object(t) !== t) return;
                        f = !1;
                    } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
                } catch (r) {
                    o = !0, n = r;
                } finally {
                    try {
                        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                    } finally {
                        if (o) throw n;
                    }
                }
                return a;
            }
        }(r, e) || StateManager_unsupportedIterableToArray(r, e) || StateManager_nonIterableRest();
    }
    function StateManager_nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function StateManager_unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return StateManager_arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? StateManager_arrayLikeToArray(r, a) : void 0;
        }
    }
    function StateManager_arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function StateManager_arrayWithHoles(r) {
        if (Array.isArray(r)) return r;
    }
    function StateManager_defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, StateManager_toPropertyKey(o.key), o);
        }
    }
    function StateManager_defineProperty(e, r, t) {
        return (r = StateManager_toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[r] = t, e;
    }
    function StateManager_toPropertyKey(t) {
        var i = function StateManager_toPrimitive(t, r) {
            if ("object" != StateManager_typeof(t) || !t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
                var i = e.call(t, r || "default");
                if ("object" != StateManager_typeof(i)) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === r ? String : Number)(t);
        }(t, "string");
        return "symbol" == StateManager_typeof(i) ? i : i + "";
    }
    function StateManager_classPrivateFieldGet(s, a) {
        return s.get(function StateManager_assertClassBrand(e, t, n) {
            if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
            throw new TypeError("Private element is not present on this object");
        }(s, a));
    }
    var stateChangeHandlers = new Map, _plugins = new WeakMap, StateManager = function() {
        return function StateManager_createClass(e, r, t) {
            return r && StateManager_defineProperties(e.prototype, r), t && StateManager_defineProperties(e, t), 
            Object.defineProperty(e, "prototype", {
                writable: !1
            }), e;
        }((function StateManager(initialState, parentStateProp, parentStateManager) {
            var _this = this, handleStateFunction = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : handleStateChange, isGlobal = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], appScope = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : window;
            if (function StateManager_classCallCheck(a, n) {
                if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
            }(this, StateManager), StateManager_defineProperty(this, "isInitializing", !1), 
            StateManager_defineProperty(this, "privateState", {}), StateManager_defineProperty(this, "state", new EventTarget), 
            StateManager_defineProperty(this, "stateDependencies", new Map), StateManager_defineProperty(this, "parentStateProp", void 0), 
            StateManager_defineProperty(this, "parentStateManager", void 0), StateManager_defineProperty(this, "dirtyProps", new Set), 
            StateManager_defineProperty(this, "nodeManager", new NodeManager), function StateManager_classPrivateFieldInitSpec(e, t, a) {
                (function StateManager_checkPrivateRedeclaration(e, t) {
                    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
                })(e, t), t.set(e, a);
            }(this, _plugins, new Set), this.isInitializing = !0, this.parentStateProp = parentStateProp, 
            this.parentStateManager = parentStateManager, this.handleStateChange = handleStateFunction, 
            this.appScope = appScope, setHiddenProperty(this.state, "_stateManager", this, !0), 
            this.state.$$isInitializing = !0, this.state.populate = function(populateObject) {
                for (var property in populateObject) this.hasOwnProperty(property) && (this[property] = populateObject[property]);
            }, parentStateProp && parentStateManager && (this.state = function makeReactive(stateObject) {
                var appScope = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window;
                return new Proxy(stateObject, function StateObjectValueHandler(rootStateObj, objPropertyName) {
                    var appScope = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window;
                    return {
                        set: function set(targetObj, property, value) {
                            if (isBuiltInStateProp(property)) return Reflect.set.apply(Reflect, arguments);
                            var _stateManager$parentS, setResult = Reflect.set.apply(Reflect, arguments), stateManager = rootStateObj._stateManager;
                            return stateManager.parentStateManager && (performance.mark("todo-array-set-dirty-prop"), 
                            null === (_stateManager$parentS = stateManager.parentStateManager) || void 0 === _stateManager$parentS || _stateManager$parentS.setDirtyProp(objPropertyName)), 
                            setResult;
                        },
                        defineProperty: function defineProperty(targetObj, property, descriptor) {
                            return isBuiltInStateProp(property) ? Reflect.defineProperty.apply(Reflect, arguments) : (void 0 !== (null == descriptor ? void 0 : descriptor.value) && (descriptor.value = statifyValue(descriptor.value, property, rootStateObj._stateManager, appScope)), 
                            Reflect.defineProperty(targetObj, property, descriptor));
                        },
                        get: function get(targetObj, property, receiver) {
                            var getResult = Reflect.get.apply(Reflect, arguments);
                            return "function" == typeof getResult ? getResult.bind(targetObj) : getResult;
                        }
                    };
                }(stateObject, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0, appScope));
            }(this.state, parentStateProp, appScope)), isGlobal) this.globalStateDependencies = new Map, 
            this.addGlobalStateDependency = function(stateProp, depStateProp, localStateManager) {
                _this.globalStateDependencies.has(stateProp) || _this.globalStateDependencies.set(stateProp, new Map);
                var globalDeps = _this.globalStateDependencies.get(stateProp);
                globalDeps.has(localStateManager) || globalDeps.set(localStateManager, new Set), 
                globalDeps.get(localStateManager).add(depStateProp);
            }; else {
                var globalState = appScope.getGlobalState();
                setHiddenProperty(this.state, "_global", globalState, !0);
            }
            !function populateInitialState(stateManager, initialState) {
                (function populateStateFromInitialState(stateManager, initialState) {
                    var appScope = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window, state = stateManager.state, descriptors = Object.getOwnPropertyDescriptors(initialState), _loop = function _loop(key) {
                        var descrp = descriptors[key];
                        if (isBuiltInStateProp(key)) return Object.defineProperty(state, key, descrp), 1;
                        var stateHook = function getStateHookData(descriptor, property) {
                            if (descriptor.get && "function" == typeof descriptor.get) return {
                                nativeGetter: !0,
                                func: descriptor.get,
                                deps: "auto",
                                reevaluate: !1,
                                init: !1,
                                isSetter: !1
                            };
                            if (descriptor.value) {
                                var value = descriptor.value;
                                if (0 === property.indexOf("set_")) {
                                    if (!Array.isArray(value)) throw Error("State setter hooks must be arrays!");
                                    var hookOptions = value[1] || {};
                                    return {
                                        nativeGetter: !1,
                                        func: value[0],
                                        deps: hookOptions.deps && Array.isArray(hookOptions.deps) ? hookOptions.deps : "auto",
                                        reevaluate: !!hookOptions.reevaluate,
                                        init: !!hookOptions.init,
                                        once: !!hookOptions.once,
                                        stateMap: !!hookOptions.stateMap,
                                        statify: !!hookOptions.statify,
                                        isSetter: 0 === property.indexOf("set_")
                                    };
                                }
                            }
                        }(descrp, key);
                        if (stateHook) {
                            var statePropName = stateHook.isSetter ? key.substring(4) : key;
                            if (stateHook.func.bind(state), stateHook.isSetter && !stateHook.nativeGetter) initSetterHook(descrp.value, statePropName, stateManager, appScope), 
                            stateHook.once && (descrp.configurable = !0), Object.defineProperty(state, key, descrp); else if (stateHook.nativeGetter) {
                                descrp.get.isStateGetter = !0;
                                var _getDeps4 = Cougar_state_utils_slicedToArray(getDeps(descrp.get, state), 2), deps = _getDeps4[0], globalDeps = _getDeps4[1];
                                deps.forEach((function(dep) {
                                    stateManager.addStateDependency(dep, key);
                                })), null == globalDeps || globalDeps.forEach((function(dep) {
                                    stateManager.addStateDependency(dep, key), state._global._stateManager.addGlobalStateDependency(dep, key, stateManager);
                                })), descrp.get.bind(state), Object.defineProperty(state, statePropName, descrp);
                            }
                        } else if (descrp.hasOwnProperty("value")) {
                            var stateProp = key, value = statifyValue(descrp.value, stateProp, stateManager, appScope);
                            stateManager.privateState.hasOwnProperty(stateProp) || (stateManager.privateState[stateProp] = value), 
                            Object.defineProperty(state, stateProp, {
                                set: function set(value) {
                                    value !== stateManager.privateState[stateProp] && (value = statifyValue(value, stateProp, stateManager, appScope), 
                                    stateManager.privateState[stateProp] = value, stateManager.setDirtyProp(stateProp), 
                                    stateManager.setDirtyProp("".concat(stateProp, ".length")));
                                },
                                get: function get() {
                                    return stateManager.privateState[stateProp];
                                }
                            });
                        }
                    };
                    for (var key in descriptors) _loop(key);
                })(stateManager, initialState, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window);
            }(this, initialState, appScope), delete this.state.$$isInitializing, setHiddenProperty(this.state, "_isStateManager", !0), 
            setHiddenProperty(this.state, "_isActive", !0, !1), this.isInitializing = !1;
        }), [ {
            key: "setDirtyProp",
            value: function setDirtyProp(prop) {
                var queueHandleState = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                if (!this.state.$$isInitializing) {
                    var lengthIndex = prop.indexOf(".length"), checkProp = lengthIndex > 0 ? prop.substring(0, lengthIndex) : prop;
                    if (!Object.hasOwn(this.state, checkProp)) throw Error("Error in setDirtyProp. State has no property: '".concat(prop, "'. This should never happen"));
                    this.dirtyProps.add(prop), Array.isArray(this.state[checkProp]) && (this.state[checkProp].lastDirtyTimestamp = (new Date).getTime()), 
                    queueHandleState && function queueStateChange(element, stateChangeHandler) {
                        stateChangeHandlers.set(element, stateChangeHandler), queueAnimationFrame(Array.from(stateChangeHandlers.values()), "STATE_CHANGE", (function() {
                            return stateChangeHandlers.clear();
                        }));
                    }(this, this.handleStateChanges.bind(this));
                }
            }
        }, {
            key: "handleStatePropDependencies",
            value: function handleStatePropDependencies(depStateProps) {
                var _this2 = this, dependenciesMap = this.stateDependencies, globalDependenciesMap = null == this ? void 0 : this.globalStateDependencies;
                depStateProps.forEach((function(depStateProp) {
                    !function handleStateDependency(stateManager, depStateProp) {
                        var appScope = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window, state = stateManager.state;
                        if (isSetterHook(depStateProp)) {
                            var setterHook = state[depStateProp], setterStateProp = depStateProp.substring(4);
                            callSetterHook(setterHook, setterStateProp, stateManager, appScope) && handleStateChange(stateManager, setterStateProp, null, appScope.offscreenContainer);
                        } else if (depStateProp.indexOf(".length") > 0) {
                            var realProp = depStateProp.split(".")[0];
                            handleStateChange(stateManager, depStateProp, stateManager.state[realProp].length, appScope.offscreenContainer);
                        } else handleStateChange(stateManager, depStateProp, null, appScope.offscreenContainer);
                    }(_this2, depStateProp, _this2.appScope);
                    var changedStateProp = isSetterHook(depStateProp) ? depStateProp.substring(4) : depStateProp;
                    if (null != dependenciesMap && dependenciesMap.has(changedStateProp)) {
                        var _sortDeps2 = StateManager_slicedToArray(sortDeps(dependenciesMap.get(changedStateProp)), 2), deps = _sortDeps2[0], setterDeps = _sortDeps2[1];
                        setterDeps.size && _this2.handleStatePropDependencies(setterDeps), deps.size && _this2.handleStatePropDependencies(deps);
                    }
                    null != globalDependenciesMap && globalDependenciesMap.has(changedStateProp) && globalDependenciesMap.get(changedStateProp).forEach((function(depsSet, localStateManager) {
                        var _sortDeps4 = StateManager_slicedToArray(sortDeps(depsSet), 2), deps = _sortDeps4[0], setterDeps = _sortDeps4[1];
                        setterDeps.size && localStateManager.handleStatePropDependencies(setterDeps), deps.size && localStateManager.handleStatePropDependencies(deps);
                    }));
                }));
            }
        }, {
            key: "isGlobalState",
            value: function isGlobalState() {
                return !this.state.hasOwnProperty("_global");
            }
        }, {
            key: "topologicalSortStateProps",
            value: function topologicalSortStateProps(stateProps) {
                var _this3 = this;
                return function StateManager_toConsumableArray(r) {
                    return function StateManager_arrayWithoutHoles(r) {
                        if (Array.isArray(r)) return StateManager_arrayLikeToArray(r);
                    }(r) || StateManager_iterableToArray(r) || StateManager_unsupportedIterableToArray(r) || function StateManager_nonIterableSpread() {
                        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                    }();
                }(stateProps).toSorted((function(a, b) {
                    var _this3$stateDependenc, _this3$stateDependenc2;
                    return a.startsWith(b + ".") ? 1 : b.startsWith(a + ".") ? -1 : ((null === (_this3$stateDependenc = _this3.stateDependencies[a]) || void 0 === _this3$stateDependenc ? void 0 : _this3$stateDependenc.size) || 0) - (null === (_this3$stateDependenc2 = _this3.stateDependencies[b]) || void 0 === _this3$stateDependenc2 ? void 0 : _this3$stateDependenc2.size) || 0;
                }));
            }
        }, {
            key: "handleStateChanges",
            value: function handleStateChanges() {
                var _this4 = this;
                if (this.dirtyProps.size) {
                    performance.mark("todo-topological-sort");
                    var stateProps = this.topologicalSortStateProps(this.dirtyProps);
                    this.dirtyProps.clear(), this.isGlobalState();
                    var deps = new Set, setterDeps = new Set, globalDeps = new Set, thisStateManager = this, thisState = thisStateManager.state;
                    stateProps.forEach((function(stateProp) {
                        var _thisStateManager$sta;
                        if (isSetterHook(stateProp)) {
                            stateProp = stateProp.substring(4);
                            var setterHook = thisState[stateProp];
                            performance.mark("todo-call-setter-hook"), callSetterHook(setterHook, stateProp, thisStateManager, _this4.appScope) && _this4.handleStateChange(thisStateManager, stateProp, null);
                        } else _this4.handleStateChange(thisStateManager, stateProp, null);
                        thisStateManager.stateDependencies.has(stateProp) && thisStateManager.stateDependencies.get(stateProp).forEach((function(dep) {
                            isSetterHook(dep) ? setterDeps.add(dep) : deps.add(dep);
                        }));
                        var globalState = null === (_thisStateManager$sta = thisStateManager.state) || void 0 === _thisStateManager$sta ? void 0 : _thisStateManager$sta._global;
                        if (globalState === GLOBAL_STATE_NOT_SET_YET && (globalState = _this4.appScope.getGlobalState()), 
                        globalState !== GLOBAL_STATE_NOT_SET_YET) {
                            var _globalState, globalStateManager = (null === (_globalState = globalState) || void 0 === _globalState ? void 0 : _globalState._stateManager) || thisStateManager;
                            globalStateManager.globalStateDependencies.has(stateProp) && globalDeps.add(globalStateManager.globalStateDependencies.get(stateProp));
                        }
                    })), setterDeps.size && this.handleStatePropDependencies(setterDeps), deps.size && this.handleStatePropDependencies(deps), 
                    globalDeps.size && globalDeps.forEach((function(deps, localStateManager) {
                        localStateManager.handleStatePropDependencies(deps);
                    })), thisStateManager.clearStateMapsLastOperation(), this.parentStateManager && this.parentStateManager.setDirtyProp(this.parentStateProp);
                }
            }
        }, {
            key: "addStateDependency",
            value: function addStateDependency(stateProp, depStateProp) {
                this.stateDependencies.has(stateProp) || this.stateDependencies.set(stateProp, new Set), 
                this.stateDependencies.get(stateProp).add(depStateProp), Array.isArray(this.state[stateProp]) && this.addStateDependency("".concat(stateProp, ".length"), depStateProp);
            }
        }, {
            key: "clearStateDependencies",
            value: function clearStateDependencies(stateProp) {
                this.stateDependencies.has(stateProp) && this.stateDependencies.set(stateProp, new Set);
            }
        }, {
            key: "addStateNode",
            value: function addStateNode(stateProp, stateNode) {
                this.nodeManager.addStateNode(stateProp, stateNode);
            }
        }, {
            key: "removeStateNode",
            value: function removeStateNode(stateProp, stateNode) {
                this.nodeManager.removeStateNode(stateProp, stateNode);
            }
        }, {
            key: "bindStatePropExpression",
            value: function bindStatePropExpression(statePropExpression, type, args) {
                if (!type || !args) {
                    var _parseStateExpression2 = function StateManager_toArray(r) {
                        return StateManager_arrayWithHoles(r) || StateManager_iterableToArray(r) || StateManager_unsupportedIterableToArray(r) || StateManager_nonIterableRest();
                    }(parseStateExpression(statePropExpression));
                    type = _parseStateExpression2[0], args = _parseStateExpression2.slice(1);
                }
                var contextStateProp = args[0];
                if (!contextStateProp) throw Error("Must specify state property name for State expression: ".concat(statePropExpression));
                var stateObj = this.state, descriptor = Object.getOwnPropertyDescriptor(stateObj, contextStateProp);
                if (descriptor || (stateObj = stateObj._global, descriptor = Object.getOwnPropertyDescriptor(stateObj, contextStateProp)), 
                !descriptor) throw Error("Could not bind state property ".concat(contextStateProp, ". State property ").concat(contextStateProp, " not defined!"));
                if (Object.hasOwn(stateObj, statePropExpression)) return stateObj[statePropExpression];
                var isValueProp = descriptor.hasOwnProperty("value");
                switch (type) {
                  case "negation":
                    var relevantState = isValueProp ? this.privateState : this.state;
                    defineStateExpressionResolver(statePropExpression, stateObj, (function getter() {
                        return !relevantState[contextStateProp];
                    }), contextStateProp);
                    break;

                  case "equality":
                    var equalityValue = args[1];
                    if (!equalityValue) throw Error("Must specify equality value for equality expression (is_something:equalToThis)");
                    var _relevantState = isValueProp ? this.privateState : this.state;
                    defineStateExpressionResolver(statePropExpression, stateObj, (function getter() {
                        return _relevantState[contextStateProp] === equalityValue;
                    }), contextStateProp);
                    break;

                  case "ternary":
                    var truthyValue = args[1];
                    if (!truthyValue) throw Error("Ternary state expression (prop?truthy:falsy) must include at least a truthy value!");
                    var falsyValue = args[2], _relevantState2 = isValueProp ? this.privateState : this.state;
                    defineStateExpressionResolver(statePropExpression, stateObj, falsyValue ? function() {
                        return _relevantState2[contextStateProp] ? truthyValue : falsyValue;
                    } : function() {
                        return _relevantState2[contextStateProp] ? truthyValue : void 0;
                    }, contextStateProp);
                }
                return stateObj[statePropExpression];
            }
        }, {
            key: "getStateDependencies",
            value: function getStateDependencies() {
                return this.stateDependencies;
            }
        }, {
            key: "use",
            value: function use(factoryFunction, pluginName) {
                factoryFunction.call(this), StateManager_classPrivateFieldGet(_plugins, this).add(pluginName);
            }
        }, {
            key: "isUsing",
            value: function isUsing(pluginName) {
                return StateManager_classPrivateFieldGet(_plugins, this).has(pluginName);
            }
        } ]);
    }();
    const Cougar_StateManager = StateManager;
    function getStatefulChild(child) {
        return Object.hasOwn(child, "state") ? child : child.firstElementChild;
    }
    var HTMLElementMapParent = {
        replaceChildWith: function replaceChildWith(oldChild, newChild) {
            var _statefulOldChild$sta, _statefulOldChild$sta2, _newChild$stateKey, statefulOldChild = getStatefulChild(oldChild), oldKey = null !== (_statefulOldChild$sta = null == statefulOldChild || null === (_statefulOldChild$sta2 = statefulOldChild.state) || void 0 === _statefulOldChild$sta2 ? void 0 : _statefulOldChild$sta2.key) && void 0 !== _statefulOldChild$sta ? _statefulOldChild$sta : oldChild.stateKey, statefulNewChild = getStatefulChild(newChild), newKey = null !== (_newChild$stateKey = newChild.stateKey) && void 0 !== _newChild$stateKey ? _newChild$stateKey : statefulNewChild.stateKey, replacedChild = this.replaceChild(newChild, oldChild);
            return this.keyMap.delete(oldKey), this.keyMap.set(newKey, newChild), replacedChild;
        },
        swapChildWith: function swapChildWith(oldChild, newChild) {
            if (oldChild !== newChild) {
                var oldNext = oldChild.nextSiblingElement, newNext = newChild.nextSiblingElement;
                this.insertBefore(oldChild, newNext), this.insertBefore(newChild, oldNext);
            }
        },
        removeChild: function removeChild(child) {
            var _child$stateKey, statefulChild = getStatefulChild(child), key = null !== (_child$stateKey = child.stateKey) && void 0 !== _child$stateKey ? _child$stateKey : statefulChild.stateKey;
            HTMLElement.prototype.removeChild.call(this, child), this.keyMap.delete(key);
        },
        insertBefore: function insertBefore(newChild, beforeChild) {
            var _newChild$stateKey2;
            HTMLElement.prototype.insertBefore.call(this, newChild, beforeChild);
            var statefulNewChild = getStatefulChild(newChild), key = null !== (_newChild$stateKey2 = newChild.stateKey) && void 0 !== _newChild$stateKey2 ? _newChild$stateKey2 : statefulNewChild.stateKey;
            this.keyMap.set(key, newChild);
        },
        append: function append() {
            for (var _HTMLElement$prototyp, _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) elements[_key] = arguments[_key];
            (_HTMLElement$prototyp = HTMLElement.prototype.append).call.apply(_HTMLElement$prototyp, [ this ].concat(elements));
            for (var _i = 0, _elements = elements; _i < _elements.length; _i++) {
                var _element$stateKey, element = _elements[_i], statefulChild = getStatefulChild(element), key = null !== (_element$stateKey = element.stateKey) && void 0 !== _element$stateKey ? _element$stateKey : statefulChild.stateKey;
                this.keyMap.set(key, element);
            }
        },
        appendChild: function appendChild(newChild) {
            var _newChild$stateKey3;
            HTMLElement.prototype.appendChild.call(this, newChild);
            var statefulChild = getStatefulChild(newChild), key = null !== (_newChild$stateKey3 = newChild.stateKey) && void 0 !== _newChild$stateKey3 ? _newChild$stateKey3 : statefulChild.stateKey;
            this.keyMap.set(key, newChild);
        },
        prepend: function prepend(newChild) {
            var _newChild$stateKey4;
            HTMLElement.prototype.prepend.call(this, newChild);
            var statefulChild = getStatefulChild(newChild), key = null !== (_newChild$stateKey4 = newChild.stateKey) && void 0 !== _newChild$stateKey4 ? _newChild$stateKey4 : statefulChild.stateKey;
            this.keyMap.set(key, newChild);
        },
        detach: function detach() {
            var returnElement;
            if (arguments.length > 0 && void 0 !== arguments[0] && arguments[0]) {
                var cloned = this.cloneNode(!0);
                cloned.$$originalElement = this, cloned.$$detached = DETACH_METHOD.CLONE, returnElement = cloned;
            } else this.setAttribute("inert", ""), this.classList.add("sprout-frozen"), this.$$detached = DETACH_METHOD.HIDE_UNHIDE, 
            returnElement = this;
            return returnElement;
        },
        reattach: function reattach() {
            this.$$detached === DETACH_METHOD.HIDE_UNHIDE ? (this.removeAttribute("inert", ""), 
            this.classList.remove("sprout-frozen")) : this.$$detached === DETACH_METHOD.CLONE && this.$$originalElement.replaceWith(this), 
            this.$$detached = void 0;
        },
        initialAppend: function initialAppend() {
            for (var _HTMLElement$prototyp2, _this = this, _len2 = arguments.length, elements = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) elements[_key2] = arguments[_key2];
            (_HTMLElement$prototyp2 = HTMLElement.prototype.append).call.apply(_HTMLElement$prototyp2, [ this ].concat(elements));
            for (var _loop = function _loop() {
                var element = _elements2[_i2];
                _this.pendingKeyMapActions.add((function() {
                    var statefulChild = getStatefulChild(element);
                    if (statefulChild.isActive) {
                        var _statefulChild$state$, _statefulChild$state, key = null !== (_statefulChild$state$ = null == statefulChild || null === (_statefulChild$state = statefulChild.state) || void 0 === _statefulChild$state ? void 0 : _statefulChild$state.key) && void 0 !== _statefulChild$state$ ? _statefulChild$state$ : element.stateKey;
                        _this.keyMap.set(key, element);
                    } else statefulChild.addEventListener("active", (function() {
                        var _statefulChild$state$2, _statefulChild$state2, key = null !== (_statefulChild$state$2 = null == statefulChild || null === (_statefulChild$state2 = statefulChild.state) || void 0 === _statefulChild$state2 ? void 0 : _statefulChild$state2.key) && void 0 !== _statefulChild$state$2 ? _statefulChild$state$2 : element.stateKey;
                        _this.keyMap.set(key, element);
                    }), {
                        once: !0
                    });
                }));
            }, _i2 = 0, _elements2 = elements; _i2 < _elements2.length; _i2++) _loop();
        }
    };
    function commands_slicedToArray(r, e) {
        return function commands_arrayWithHoles(r) {
            if (Array.isArray(r)) return r;
        }(r) || function commands_iterableToArrayLimit(r, l) {
            var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
            if (null != t) {
                var e, n, i, u, a = [], f = !0, o = !1;
                try {
                    if (i = (t = t.call(r)).next, 0 === l) {
                        if (Object(t) !== t) return;
                        f = !1;
                    } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
                } catch (r) {
                    o = !0, n = r;
                } finally {
                    try {
                        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                    } finally {
                        if (o) throw n;
                    }
                }
                return a;
            }
        }(r, e) || commands_unsupportedIterableToArray(r, e) || function commands_nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function commands_unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return commands_arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? commands_arrayLikeToArray(r, a) : void 0;
        }
    }
    function commands_arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    var COMMANDS = {
        map: function map(commandValue) {
            var _commandValue$split2 = commands_slicedToArray(commandValue.split(":"), 2), stateItemsPropertyName = _commandValue$split2[0], customElementName = _commandValue$split2[1], thiselement = this;
            !function makeElementMapParent(parentElement) {
                Object.assign(parentElement, HTMLElementMapParent), parentElement.keyMap = new Map, 
                parentElement.pendingKeyMapActions = new Set, parentElement.style.willChange = "opacity";
            }(thiselement), this.onAfterPaint((function() {
                var theState = function mapStateToElements(stateItemsPropertyName, customElementName, parentElement) {
                    var _parentElement$getSta2 = commands_slicedToArray(parentElement.getState(stateItemsPropertyName, !0), 2), stateItemsArray = _parentElement$getSta2[0], theState = _parentElement$getSta2[1];
                    stateItemsArray.makeStateMap();
                    var elements = mapStateArrayToElements(stateItemsArray, customElementName, isElementAList(parentElement) ? "li" : void 0, parentElement);
                    return parentElement.innerHTML = "", elements.length && parentElement.append.apply(parentElement, function commands_toConsumableArray(r) {
                        return function commands_arrayWithoutHoles(r) {
                            if (Array.isArray(r)) return commands_arrayLikeToArray(r);
                        }(r) || function commands_iterableToArray(r) {
                            if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
                        }(r) || commands_unsupportedIterableToArray(r) || function commands_nonIterableSpread() {
                            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                        }();
                    }(elements)), theState;
                }(stateItemsPropertyName, customElementName, thiselement);
                if (!theState) throw new Error("Mapping ".concat(stateItemsPropertyName, " to ").concat(customElementName, " failed!"));
                var stateArray = theState[stateItemsPropertyName];
                if (!stateArray || !stateArray.hasOwnProperty("_isStatefulArray")) throw new Error("State array ".concat(stateItemsPropertyName, " for State Map must be stateful!"));
                theState._stateManager.addStateMap(stateItemsPropertyName, customElementName, thiselement);
            }));
        },
        text: function text(commandValue) {
            var stateProp = commandValue;
            this.initialSetText(stateProp);
        },
        bind: function bind(commandValue) {
            var _commandValue$split4 = commands_slicedToArray(commandValue.split(":"), 2), attributeName = _commandValue$split4[0], statePropName = _commandValue$split4[1];
            this.bindAttributeToState(attributeName, statePropName);
        },
        bindprop: function bindprop(commandValue) {
            var _commandValue$split6 = commands_slicedToArray(commandValue.split(":"), 2), statePropName = _commandValue$split6[0], elementPropName = _commandValue$split6[1], _this$getState2 = commands_slicedToArray(this.getState(statePropName, !0), 2), stateObject = (_this$getState2[0], 
            _this$getState2[1]);
            this[elementPropName] = stateObject[statePropName];
        }
    };
    function ReactiveElement_typeof(o) {
        return ReactiveElement_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, ReactiveElement_typeof(o);
    }
    function ReactiveElement_get() {
        return ReactiveElement_get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(e, t, r) {
            var p = function ReactiveElement_superPropBase(t, o) {
                for (;!{}.hasOwnProperty.call(t, o) && null !== (t = ReactiveElement_getPrototypeOf(t)); ) ;
                return t;
            }(e, t);
            if (p) {
                var n = Object.getOwnPropertyDescriptor(p, t);
                return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
            }
        }, ReactiveElement_get.apply(null, arguments);
    }
    function ReactiveElement_unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return ReactiveElement_arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ReactiveElement_arrayLikeToArray(r, a) : void 0;
        }
    }
    function ReactiveElement_arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function ReactiveElement_classCallCheck(a, n) {
        if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function ReactiveElement_defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, ReactiveElement_toPropertyKey(o.key), o);
        }
    }
    function ReactiveElement_createClass(e, r, t) {
        return r && ReactiveElement_defineProperties(e.prototype, r), t && ReactiveElement_defineProperties(e, t), 
        Object.defineProperty(e, "prototype", {
            writable: !1
        }), e;
    }
    function ReactiveElement_callSuper(t, o, e) {
        return o = ReactiveElement_getPrototypeOf(o), function ReactiveElement_possibleConstructorReturn(t, e) {
            if (e && ("object" == ReactiveElement_typeof(e) || "function" == typeof e)) return e;
            if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
            return function ReactiveElement_assertThisInitialized(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e;
            }(t);
        }(t, ReactiveElement_isNativeReflectConstruct() ? Reflect.construct(o, e || [], ReactiveElement_getPrototypeOf(t).constructor) : o.apply(t, e));
    }
    function ReactiveElement_isNativeReflectConstruct() {
        try {
            var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
        } catch (t) {}
        return (ReactiveElement_isNativeReflectConstruct = function _isNativeReflectConstruct() {
            return !!t;
        })();
    }
    function ReactiveElement_getPrototypeOf(t) {
        return ReactiveElement_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, ReactiveElement_getPrototypeOf(t);
    }
    function ReactiveElement_inherits(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }), Object.defineProperty(t, "prototype", {
            writable: !1
        }), e && ReactiveElement_setPrototypeOf(t, e);
    }
    function ReactiveElement_setPrototypeOf(t, e) {
        return ReactiveElement_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        }, ReactiveElement_setPrototypeOf(t, e);
    }
    function ReactiveElement_classPrivateFieldInitSpec(e, t, a) {
        ReactiveElement_checkPrivateRedeclaration(e, t), t.set(e, a);
    }
    function ReactiveElement_checkPrivateRedeclaration(e, t) {
        if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
    function ReactiveElement_defineProperty(e, r, t) {
        return (r = ReactiveElement_toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[r] = t, e;
    }
    function ReactiveElement_toPropertyKey(t) {
        var i = function ReactiveElement_toPrimitive(t, r) {
            if ("object" != ReactiveElement_typeof(t) || !t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
                var i = e.call(t, r || "default");
                if ("object" != ReactiveElement_typeof(i)) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === r ? String : Number)(t);
        }(t, "string");
        return "symbol" == ReactiveElement_typeof(i) ? i : i + "";
    }
    function _classPrivateFieldSet(s, a, r) {
        return s.set(ReactiveElement_assertClassBrand(s, a), r), r;
    }
    function ReactiveElement_classPrivateFieldGet(s, a) {
        return s.get(ReactiveElement_assertClassBrand(s, a));
    }
    function ReactiveElement_assertClassBrand(e, t, n) {
        if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
        throw new TypeError("Private element is not present on this object");
    }
    function extendElementClassWithReactiveElementClass(elementClass) {
        var appScope = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window, isInputElement = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], _wasMounted = new WeakMap, _ReactiveElement_brand = new WeakSet, _pendingAttributeChanges = new WeakMap, ReactiveElement = function(_elementClass) {
            function ReactiveElement() {
                var _this;
                return ReactiveElement_classCallCheck(this, ReactiveElement), function _classPrivateMethodInitSpec(e, a) {
                    ReactiveElement_checkPrivateRedeclaration(e, a), a.add(e);
                }(_this = ReactiveElement_callSuper(this, ReactiveElement), _ReactiveElement_brand), 
                ReactiveElement_defineProperty(_this, "host", null), ReactiveElement_classPrivateFieldInitSpec(_this, _wasMounted, !1), 
                ReactiveElement_defineProperty(_this, "refName", void 0), ReactiveElement_classPrivateFieldInitSpec(_this, _pendingAttributeChanges, []), 
                _this.isReactiveElement = !0, _this.isNativeElement = !0, _this;
            }
            return ReactiveElement_inherits(ReactiveElement, _elementClass), ReactiveElement_createClass(ReactiveElement, [ {
                key: "activate",
                value: function activate() {
                    var _step, _this2 = this, commands = [], _iterator = function ReactiveElement_createForOfIteratorHelper(r, e) {
                        var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
                        if (!t) {
                            if (Array.isArray(r) || (t = ReactiveElement_unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
                                t && (r = t);
                                var _n = 0, F = function F() {};
                                return {
                                    s: F,
                                    n: function n() {
                                        return _n >= r.length ? {
                                            done: !0
                                        } : {
                                            done: !1,
                                            value: r[_n++]
                                        };
                                    },
                                    e: function e(r) {
                                        throw r;
                                    },
                                    f: F
                                };
                            }
                            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                        }
                        var o, a = !0, u = !1;
                        return {
                            s: function s() {
                                t = t.call(r);
                            },
                            n: function n() {
                                var r = t.next();
                                return a = r.done, r;
                            },
                            e: function e(r) {
                                u = !0, o = r;
                            },
                            f: function f() {
                                try {
                                    a || null == t.return || t.return();
                                } finally {
                                    if (u) throw o;
                                }
                            }
                        };
                    }(this.getAttributeNames());
                    try {
                        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                            var attrName = _step.value, attrValue = this.getAttribute(attrName);
                            if (this.initialSetAttribute(attrName, attrValue), 0 === attrName.indexOf("_")) {
                                var command = attrName.substring(1);
                                commands.push({
                                    command,
                                    args: attrValue
                                });
                            }
                        }
                    } catch (err) {
                        _iterator.e(err);
                    } finally {
                        _iterator.f();
                    }
                    commands.forEach((function(_ref) {
                        var _COMMAND_ATTRIBUTES$c, _appScope$appCommands, _this2$host, _componentCommands$co, command = _ref.command, args = _ref.args;
                        null === (_COMMAND_ATTRIBUTES$c = COMMANDS[command]) || void 0 === _COMMAND_ATTRIBUTES$c || _COMMAND_ATTRIBUTES$c.call(_this2, args), 
                        null === (_appScope$appCommands = appScope.appCommands) || void 0 === _appScope$appCommands || null === (_appScope$appCommands = _appScope$appCommands[command]) || void 0 === _appScope$appCommands || _appScope$appCommands.call(_this2, args);
                        var componentCommands = (null === (_this2$host = _this2.host) || void 0 === _this2$host ? void 0 : _this2$host.commands) || _this2.commands;
                        null == componentCommands || null === (_componentCommands$co = componentCommands[command]) || void 0 === _componentCommands$co || _componentCommands$co.call(_this2, args);
                    })), ReactiveElement_classPrivateFieldGet(_pendingAttributeChanges, this).forEach((function(attributeChangeHandler) {
                        return attributeChangeHandler.call(_this2);
                    })), ReactiveElement_classPrivateFieldGet(_pendingAttributeChanges, this).length = 0, 
                    this.isActive = !0;
                }
            }, {
                key: "getHost",
                value: function getHost() {
                    var _this$getRootNode;
                    return this.host || this.parentNode || (null == this || null === (_this$getRootNode = this.getRootNode()) || void 0 === _this$getRootNode ? void 0 : _this$getRootNode.host);
                }
            }, {
                key: "connectedCallback",
                value: function connectedCallback() {
                    var _this3 = this;
                    if (!ReactiveElement_classPrivateFieldGet(_wasMounted, this)) {
                        var rootNode = this.getRootNode();
                        this.host = rootNode === document ? this.parentElement : rootNode.host, this.host ? this.host.isActive ? this.activate() : this.host.addEventListener("active", (function() {
                            return _this3.activate();
                        }), {
                            once: !0
                        }) : this.activate(), _classPrivateFieldSet(_wasMounted, this, !0);
                    }
                }
            }, {
                key: "disconnectedCallback",
                value: function disconnectedCallback() {
                    var _this$host, host = null !== (_this$host = this.host) && void 0 !== _this$host ? _this$host : this;
                    host.ref && delete host.ref[this.refName];
                }
            }, {
                key: "attributeChangedCallback",
                value: function attributeChangedCallback(attributeName, oldValue, newValue) {
                    var _this4 = this;
                    oldValue !== newValue && (this.isConnected ? ReactiveElement_assertClassBrand(_ReactiveElement_brand, this, _handleAttributeChange).call(this, attributeName, oldValue, newValue) : ReactiveElement_classPrivateFieldGet(_pendingAttributeChanges, this).push((function() {
                        return ReactiveElement_assertClassBrand(_ReactiveElement_brand, _this4, _handleAttributeChange).call(_this4, attributeName, oldValue, newValue);
                    })));
                }
            }, {
                key: "getState",
                value: function getState(stateProp) {
                    var theState, stateVal, returnStateObject = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], elementInstance = this.isNativeElement && this.host ? this.host : this, stateFound = !1;
                    if (elementInstance && elementInstance.state && Object.hasOwn(elementInstance.state, stateProp) && (stateFound = !0, 
                    stateVal = (theState = elementInstance.state)[stateProp]), !stateFound) for (;!stateFound && elementInstance.host; ) (elementInstance = elementInstance.host) && elementInstance.state && Object.hasOwn(elementInstance.state, stateProp) && (stateFound = !0, 
                    stateVal = (theState = elementInstance.state)[stateProp]);
                    if (!stateFound) {
                        var globalState = appScope.getGlobalState();
                        globalState && Object.hasOwn(globalState, stateProp) && (stateFound = !0, stateVal = (theState = globalState)[stateProp]);
                    }
                    return stateFound || (stateVal = void 0), returnStateObject ? [ stateVal, theState ] : stateVal;
                }
            }, {
                key: "findElement",
                value: function findElement(refName) {
                    var host = this.host || this, root = host;
                    return appScope.SPROUT_CONFIG.useShadow && (root = host.shadowRoot), Object.hasOwn(host.ref, refName) ? host.ref[refName] : root.querySelector('[ref="'.concat(refName, '"]'));
                }
            }, {
                key: "initialSetText",
                value: function initialSetText(stateProp) {
                    setStateText.call(this, stateProp);
                }
            }, {
                key: "initialSetAttribute",
                value: function initialSetAttribute(attributeName, attributeValue) {
                    var isPropAttr = function isPropAttribute(attrValue) {
                        return 0 === attrValue.indexOf("@");
                    }(attributeValue = String(attributeValue)), isStateAttr = function isStateAttribute(attrName) {
                        return 0 === attrName.indexOf(":");
                    }(attributeName), valueToSet = attributeValue;
                    if (isStateAttr) {
                        var stateProp = attributeValue, attrName = attributeName.substring(1);
                        setStateAttribute.call(this, attrName, stateProp);
                    } else {
                        if (isPropAttr) {
                            var host = this.getHost(), propName = attributeValue.substring(1);
                            valueToSet = host.getAttribute(propName);
                        }
                        setAttribute.call(this, attributeName, valueToSet);
                    }
                }
            }, {
                key: "onAfterPaint",
                value: function onAfterPaint(callback) {
                    requestAnimationFrame((function() {
                        return requestAnimationFrame(callback);
                    }));
                }
            } ]);
        }(elementClass);
        function _handleAttributeChange(attributeName, oldValue, newValue) {
            var host = this.isNativeElement ? this.host || this.getRootNode().host : this;
            if ("ref" === attributeName) {
                var refValue = newValue;
                host.ref[refValue] = this, this.refName = refValue;
            }
        }
        if (ReactiveElement_defineProperty(ReactiveElement, "observedAttributes", OBSERVED_ATTRIBUTES), 
        isInputElement) {
            var _changeEventHandler = new WeakMap, ReactiveInputElement = function(_ReactiveElement2) {
                function ReactiveInputElement() {
                    var _this5;
                    ReactiveElement_classCallCheck(this, ReactiveInputElement);
                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                    return ReactiveElement_defineProperty(_this5 = ReactiveElement_callSuper(this, ReactiveInputElement, [].concat(args)), "boundAttributesToState", new Map), 
                    ReactiveElement_classPrivateFieldInitSpec(_this5, _changeEventHandler, void 0), 
                    _this5;
                }
                return ReactiveElement_inherits(ReactiveInputElement, _ReactiveElement2), ReactiveElement_createClass(ReactiveInputElement, [ {
                    key: "bindAttributeToState",
                    value: function bindAttributeToState(attributeName, statePropName) {
                        this.boundAttributesToState.set(attributeName, statePropName);
                    }
                }, {
                    key: "updateStateFromAttribute",
                    value: function updateStateFromAttribute(attributeName) {
                        var newValue = fromAttributeValue(this.getAttribute(attributeName)), stateProp = this.boundAttributesToState.get(attributeName), _this$getState2 = function ReactiveElement_slicedToArray(r, e) {
                            return function ReactiveElement_arrayWithHoles(r) {
                                if (Array.isArray(r)) return r;
                            }(r) || function ReactiveElement_iterableToArrayLimit(r, l) {
                                var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
                                if (null != t) {
                                    var e, n, i, u, a = [], f = !0, o = !1;
                                    try {
                                        if (i = (t = t.call(r)).next, 0 === l) {
                                            if (Object(t) !== t) return;
                                            f = !1;
                                        } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
                                    } catch (r) {
                                        o = !0, n = r;
                                    } finally {
                                        try {
                                            if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                                        } finally {
                                            if (o) throw n;
                                        }
                                    }
                                    return a;
                                }
                            }(r, e) || ReactiveElement_unsupportedIterableToArray(r, e) || function ReactiveElement_nonIterableRest() {
                                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                            }();
                        }(this.getState(stateProp, !0), 2), stateValue = _this$getState2[0], theState = _this$getState2[1];
                        if (stateValue === Symbol.for(SYMBOL_NAMES_STATE_NOT_FOUND)) throw Error("updateStateFromAttribute: State property ".concat(stateProp, " not found"));
                        stateValue !== newValue && (theState[stateProp] = newValue);
                    }
                }, {
                    key: "activate",
                    value: function activate() {
                        ReactiveElement_get(ReactiveElement_getPrototypeOf(ReactiveInputElement.prototype), "activate", this).call(this), 
                        _classPrivateFieldSet(_changeEventHandler, this, (function() {
                            var changeEvent = new Event("inputChange", {
                                bubbles: !0,
                                composed: !0
                            });
                            if ("checkbox" === this.type) {
                                var checkedStateAttributeNodesMap = this.host.state._stateManager.nodeManager.bindableAttributesStateNodes.get("checked"), checkedAttributeNode = null;
                                checkedStateAttributeNodesMap.has(this) && (checkedAttributeNode = checkedStateAttributeNodesMap.get(this)), 
                                this.checked ? (checkedAttributeNode || (checkedAttributeNode = document.createAttribute("checked")), 
                                this.setAttributeNode(checkedAttributeNode)) : (checkedAttributeNode || (checkedAttributeNode = this.getAttributeNode("checked")), 
                                checkedAttributeNode && this.removeAttributeNode(checkedAttributeNode));
                            }
                            this.dispatchEvent(changeEvent);
                        })), this.addEventListener("change", ReactiveElement_classPrivateFieldGet(_changeEventHandler, this), !1);
                    }
                }, {
                    key: "disconnectedCallback",
                    value: function disconnectedCallback() {
                        ReactiveElement_get(ReactiveElement_getPrototypeOf(ReactiveInputElement.prototype), "disconnectedCallback", this).call(this), 
                        ReactiveElement_classPrivateFieldGet(_changeEventHandler, this) && this.removeEventListener("change", ReactiveElement_classPrivateFieldGet(_changeEventHandler, this)), 
                        this.boundAttributesToState.clear();
                    }
                }, {
                    key: "attributeChangedCallback",
                    value: function attributeChangedCallback(attributeName, oldValue, newValue) {
                        if (ReactiveElement_get(ReactiveElement_getPrototypeOf(ReactiveInputElement.prototype), "attributeChangedCallback", this).apply(this, arguments), 
                        AUTO_ATTRIBUTES_TO_PROPS.has(attributeName)) {
                            var newPropValue = fromAttributeValue(newValue);
                            this[attributeName] !== newPropValue && (this[attributeName] = newPropValue);
                        }
                        this.boundAttributesToState.has(attributeName) && this.updateStateFromAttribute(attributeName);
                    }
                } ]);
            }(ReactiveElement);
            return ReactiveElement_defineProperty(ReactiveInputElement, "observedAttributes", ReactiveElement.observedAttributes.concat(function ReactiveElement_toConsumableArray(r) {
                return function ReactiveElement_arrayWithoutHoles(r) {
                    if (Array.isArray(r)) return ReactiveElement_arrayLikeToArray(r);
                }(r) || function ReactiveElement_iterableToArray(r) {
                    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
                }(r) || ReactiveElement_unsupportedIterableToArray(r) || function ReactiveElement_nonIterableSpread() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }();
            }(SUPPORTED_ATTRIBUTES_FOR_BINDING))), ReactiveInputElement;
        }
        return ReactiveElement;
    }
    function ReactiveCustomElement_createForOfIteratorHelper(r, e) {
        var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (!t) {
            if (Array.isArray(r) || (t = function ReactiveCustomElement_unsupportedIterableToArray(r, a) {
                if (r) {
                    if ("string" == typeof r) return ReactiveCustomElement_arrayLikeToArray(r, a);
                    var t = {}.toString.call(r).slice(8, -1);
                    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ReactiveCustomElement_arrayLikeToArray(r, a) : void 0;
                }
            }(r)) || e && r && "number" == typeof r.length) {
                t && (r = t);
                var _n = 0, F = function F() {};
                return {
                    s: F,
                    n: function n() {
                        return _n >= r.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: r[_n++]
                        };
                    },
                    e: function e(r) {
                        throw r;
                    },
                    f: F
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var o, a = !0, u = !1;
        return {
            s: function s() {
                t = t.call(r);
            },
            n: function n() {
                var r = t.next();
                return a = r.done, r;
            },
            e: function e(r) {
                u = !0, o = r;
            },
            f: function f() {
                try {
                    a || null == t.return || t.return();
                } finally {
                    if (u) throw o;
                }
            }
        };
    }
    function ReactiveCustomElement_arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function ReactiveCustomElement_typeof(o) {
        return ReactiveCustomElement_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, ReactiveCustomElement_typeof(o);
    }
    function ReactiveCustomElement_defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, ReactiveCustomElement_toPropertyKey(o.key), o);
        }
    }
    function ReactiveCustomElement_possibleConstructorReturn(t, e) {
        if (e && ("object" == ReactiveCustomElement_typeof(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return function ReactiveCustomElement_assertThisInitialized(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        }(t);
    }
    function ReactiveCustomElement_isNativeReflectConstruct() {
        try {
            var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
        } catch (t) {}
        return (ReactiveCustomElement_isNativeReflectConstruct = function _isNativeReflectConstruct() {
            return !!t;
        })();
    }
    function ReactiveCustomElement_get() {
        return ReactiveCustomElement_get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(e, t, r) {
            var p = function ReactiveCustomElement_superPropBase(t, o) {
                for (;!{}.hasOwnProperty.call(t, o) && null !== (t = ReactiveCustomElement_getPrototypeOf(t)); ) ;
                return t;
            }(e, t);
            if (p) {
                var n = Object.getOwnPropertyDescriptor(p, t);
                return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
            }
        }, ReactiveCustomElement_get.apply(null, arguments);
    }
    function ReactiveCustomElement_getPrototypeOf(t) {
        return ReactiveCustomElement_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, ReactiveCustomElement_getPrototypeOf(t);
    }
    function ReactiveCustomElement_setPrototypeOf(t, e) {
        return ReactiveCustomElement_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        }, ReactiveCustomElement_setPrototypeOf(t, e);
    }
    function ReactiveCustomElement_classPrivateFieldInitSpec(e, t, a) {
        ReactiveCustomElement_checkPrivateRedeclaration(e, t), t.set(e, a);
    }
    function ReactiveCustomElement_checkPrivateRedeclaration(e, t) {
        if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
    function ReactiveCustomElement_defineProperty(e, r, t) {
        return (r = ReactiveCustomElement_toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[r] = t, e;
    }
    function ReactiveCustomElement_toPropertyKey(t) {
        var i = function ReactiveCustomElement_toPrimitive(t, r) {
            if ("object" != ReactiveCustomElement_typeof(t) || !t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
                var i = e.call(t, r || "default");
                if ("object" != ReactiveCustomElement_typeof(i)) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === r ? String : Number)(t);
        }(t, "string");
        return "symbol" == ReactiveCustomElement_typeof(i) ? i : i + "";
    }
    function ReactiveCustomElement_classPrivateFieldGet(s, a) {
        return s.get(ReactiveCustomElement_assertClassBrand(s, a));
    }
    function ReactiveCustomElement_classPrivateFieldSet(s, a, r) {
        return s.set(ReactiveCustomElement_assertClassBrand(s, a), r), r;
    }
    function ReactiveCustomElement_assertClassBrand(e, t, n) {
        if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
        throw new TypeError("Private element is not present on this object");
    }
    var SHADOW_CSS = new CSSStyleSheet;
    function ConditionalElement_typeof(o) {
        return ConditionalElement_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, ConditionalElement_typeof(o);
    }
    function ConditionalElement_slicedToArray(r, e) {
        return function ConditionalElement_arrayWithHoles(r) {
            if (Array.isArray(r)) return r;
        }(r) || function ConditionalElement_iterableToArrayLimit(r, l) {
            var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
            if (null != t) {
                var e, n, i, u, a = [], f = !0, o = !1;
                try {
                    if (i = (t = t.call(r)).next, 0 === l) {
                        if (Object(t) !== t) return;
                        f = !1;
                    } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) ;
                } catch (r) {
                    o = !0, n = r;
                } finally {
                    try {
                        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                    } finally {
                        if (o) throw n;
                    }
                }
                return a;
            }
        }(r, e) || ConditionalElement_unsupportedIterableToArray(r, e) || function ConditionalElement_nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function ConditionalElement_toConsumableArray(r) {
        return function ConditionalElement_arrayWithoutHoles(r) {
            if (Array.isArray(r)) return ConditionalElement_arrayLikeToArray(r);
        }(r) || function ConditionalElement_iterableToArray(r) {
            if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
        }(r) || ConditionalElement_unsupportedIterableToArray(r) || function ConditionalElement_nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }
    function ConditionalElement_unsupportedIterableToArray(r, a) {
        if (r) {
            if ("string" == typeof r) return ConditionalElement_arrayLikeToArray(r, a);
            var t = {}.toString.call(r).slice(8, -1);
            return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ConditionalElement_arrayLikeToArray(r, a) : void 0;
        }
    }
    function ConditionalElement_arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function ConditionalElement_defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, ConditionalElement_toPropertyKey(o.key), o);
        }
    }
    function ConditionalElement_callSuper(t, o, e) {
        return o = ConditionalElement_getPrototypeOf(o), function ConditionalElement_possibleConstructorReturn(t, e) {
            if (e && ("object" == ConditionalElement_typeof(e) || "function" == typeof e)) return e;
            if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
            return function ConditionalElement_assertThisInitialized(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e;
            }(t);
        }(t, ConditionalElement_isNativeReflectConstruct() ? Reflect.construct(o, e || [], ConditionalElement_getPrototypeOf(t).constructor) : o.apply(t, e));
    }
    function ConditionalElement_isNativeReflectConstruct() {
        try {
            var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
        } catch (t) {}
        return (ConditionalElement_isNativeReflectConstruct = function _isNativeReflectConstruct() {
            return !!t;
        })();
    }
    function ConditionalElement_getPrototypeOf(t) {
        return ConditionalElement_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, ConditionalElement_getPrototypeOf(t);
    }
    function ConditionalElement_setPrototypeOf(t, e) {
        return ConditionalElement_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        }, ConditionalElement_setPrototypeOf(t, e);
    }
    function ConditionalElement_toPropertyKey(t) {
        var i = function ConditionalElement_toPrimitive(t, r) {
            if ("object" != ConditionalElement_typeof(t) || !t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
                var i = e.call(t, r || "default");
                if ("object" != ConditionalElement_typeof(i)) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === r ? String : Number)(t);
        }(t, "string");
        return "symbol" == ConditionalElement_typeof(i) ? i : i + "";
    }
    function ConditionalElement_classPrivateFieldInitSpec(e, t, a) {
        (function ConditionalElement_checkPrivateRedeclaration(e, t) {
            if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
        })(e, t), t.set(e, a);
    }
    function ConditionalElement_classPrivateFieldSet(s, a, r) {
        return s.set(ConditionalElement_assertClassBrand(s, a), r), r;
    }
    function ConditionalElement_classPrivateFieldGet(s, a) {
        return s.get(ConditionalElement_assertClassBrand(s, a));
    }
    function ConditionalElement_assertClassBrand(e, t, n) {
        if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
        throw new TypeError("Private element is not present on this object");
    }
    function build_typeof(o) {
        return build_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, build_typeof(o);
    }
    function _regeneratorRuntime() {
        _regeneratorRuntime = function _regeneratorRuntime() {
            return e;
        };
        var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function(t, e, r) {
            t[e] = r.value;
        }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag";
        function define(t, e, r) {
            return Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }), t[e];
        }
        try {
            define({}, "");
        } catch (t) {
            define = function define(t, e, r) {
                return t[e] = r;
            };
        }
        function wrap(t, e, r, n) {
            var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []);
            return o(a, "_invoke", {
                value: makeInvokeMethod(t, r, c)
            }), a;
        }
        function tryCatch(t, e, r) {
            try {
                return {
                    type: "normal",
                    arg: t.call(e, r)
                };
            } catch (t) {
                return {
                    type: "throw",
                    arg: t
                };
            }
        }
        e.wrap = wrap;
        var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {};
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}
        var p = {};
        define(p, a, (function() {
            return this;
        }));
        var d = Object.getPrototypeOf, v = d && d(d(values([])));
        v && v !== r && n.call(v, a) && (p = v);
        var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
        function defineIteratorMethods(t) {
            [ "next", "throw", "return" ].forEach((function(e) {
                define(t, e, (function(t) {
                    return this._invoke(e, t);
                }));
            }));
        }
        function AsyncIterator(t, e) {
            function invoke(r, o, i, a) {
                var c = tryCatch(t[r], t, o);
                if ("throw" !== c.type) {
                    var u = c.arg, h = u.value;
                    return h && "object" == build_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then((function(t) {
                        invoke("next", t, i, a);
                    }), (function(t) {
                        invoke("throw", t, i, a);
                    })) : e.resolve(h).then((function(t) {
                        u.value = t, i(u);
                    }), (function(t) {
                        return invoke("throw", t, i, a);
                    }));
                }
                a(c.arg);
            }
            var r;
            o(this, "_invoke", {
                value: function value(t, n) {
                    function callInvokeWithMethodAndArg() {
                        return new e((function(e, r) {
                            invoke(t, n, e, r);
                        }));
                    }
                    return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
                }
            });
        }
        function makeInvokeMethod(e, r, n) {
            var o = h;
            return function(i, a) {
                if (o === f) throw Error("Generator is already running");
                if (o === s) {
                    if ("throw" === i) throw a;
                    return {
                        value: t,
                        done: !0
                    };
                }
                for (n.method = i, n.arg = a; ;) {
                    var c = n.delegate;
                    if (c) {
                        var u = maybeInvokeDelegate(c, n);
                        if (u) {
                            if (u === y) continue;
                            return u;
                        }
                    }
                    if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                        if (o === h) throw o = s, n.arg;
                        n.dispatchException(n.arg);
                    } else "return" === n.method && n.abrupt("return", n.arg);
                    o = f;
                    var p = tryCatch(e, r, n);
                    if ("normal" === p.type) {
                        if (o = n.done ? s : l, p.arg === y) continue;
                        return {
                            value: p.arg,
                            done: n.done
                        };
                    }
                    "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
                }
            };
        }
        function maybeInvokeDelegate(e, r) {
            var n = r.method, o = e.iterator[n];
            if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", 
            r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", 
            r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
            var i = tryCatch(o, e.iterator, r.arg);
            if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, 
            y;
            var a = i.arg;
            return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", 
            r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), 
            r.delegate = null, y);
        }
        function pushTryEntry(t) {
            var e = {
                tryLoc: t[0]
            };
            1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), 
            this.tryEntries.push(e);
        }
        function resetTryEntry(t) {
            var e = t.completion || {};
            e.type = "normal", delete e.arg, t.completion = e;
        }
        function Context(t) {
            this.tryEntries = [ {
                tryLoc: "root"
            } ], t.forEach(pushTryEntry, this), this.reset(!0);
        }
        function values(e) {
            if (e || "" === e) {
                var r = e[a];
                if (r) return r.call(e);
                if ("function" == typeof e.next) return e;
                if (!isNaN(e.length)) {
                    var o = -1, i = function next() {
                        for (;++o < e.length; ) if (n.call(e, o)) return next.value = e[o], next.done = !1, 
                        next;
                        return next.value = t, next.done = !0, next;
                    };
                    return i.next = i;
                }
            }
            throw new TypeError(build_typeof(e) + " is not iterable");
        }
        return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
            value: GeneratorFunctionPrototype,
            configurable: !0
        }), o(GeneratorFunctionPrototype, "constructor", {
            value: GeneratorFunction,
            configurable: !0
        }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), 
        e.isGeneratorFunction = function(t) {
            var e = "function" == typeof t && t.constructor;
            return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
        }, e.mark = function(t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, 
            define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
        }, e.awrap = function(t) {
            return {
                __await: t
            };
        }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, (function() {
            return this;
        })), e.AsyncIterator = AsyncIterator, e.async = function(t, r, n, o, i) {
            void 0 === i && (i = Promise);
            var a = new AsyncIterator(wrap(t, r, n, o), i);
            return e.isGeneratorFunction(r) ? a : a.next().then((function(t) {
                return t.done ? t.value : a.next();
            }));
        }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, (function() {
            return this;
        })), define(g, "toString", (function() {
            return "[object Generator]";
        })), e.keys = function(t) {
            var e = Object(t), r = [];
            for (var n in e) r.push(n);
            return r.reverse(), function next() {
                for (;r.length; ) {
                    var t = r.pop();
                    if (t in e) return next.value = t, next.done = !1, next;
                }
                return next.done = !0, next;
            };
        }, e.values = values, Context.prototype = {
            constructor: Context,
            reset: function reset(e) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, 
                this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
            },
            stop: function stop() {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
            },
            dispatchException: function dispatchException(e) {
                if (this.done) throw e;
                var r = this;
                function handle(n, o) {
                    return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), 
                    !!o;
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                    var i = this.tryEntries[o], a = i.completion;
                    if ("root" === i.tryLoc) return handle("end");
                    if (i.tryLoc <= this.prev) {
                        var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc");
                        if (c && u) {
                            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                        } else if (c) {
                            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
                        } else {
                            if (!u) throw Error("try statement without catch or finally");
                            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
                        }
                    }
                }
            },
            abrupt: function abrupt(t, e) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var o = this.tryEntries[r];
                    if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                        var i = o;
                        break;
                    }
                }
                i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                var a = i ? i.completion : {};
                return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, 
                y) : this.complete(a);
            },
            complete: function complete(t, e) {
                if ("throw" === t.type) throw t.arg;
                return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, 
                this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), 
                y;
            },
            finish: function finish(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), 
                    y;
                }
            },
            catch: function _catch(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.tryLoc === t) {
                        var n = r.completion;
                        if ("throw" === n.type) {
                            var o = n.arg;
                            resetTryEntry(r);
                        }
                        return o;
                    }
                }
                throw Error("illegal catch attempt");
            },
            delegateYield: function delegateYield(e, r, n) {
                return this.delegate = {
                    iterator: values(e),
                    resultName: r,
                    nextLoc: n
                }, "next" === this.method && (this.arg = t), y;
            }
        }, e;
    }
    function build_defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, build_toPropertyKey(o.key), o);
        }
    }
    function build_createClass(e, r, t) {
        return r && build_defineProperties(e.prototype, r), t && build_defineProperties(e, t), 
        Object.defineProperty(e, "prototype", {
            writable: !1
        }), e;
    }
    function build_toPropertyKey(t) {
        var i = function build_toPrimitive(t, r) {
            if ("object" != build_typeof(t) || !t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
                var i = e.call(t, r || "default");
                if ("object" != build_typeof(i)) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === r ? String : Number)(t);
        }(t, "string");
        return "symbol" == build_typeof(i) ? i : i + "";
    }
    function build_classCallCheck(a, n) {
        if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function build_callSuper(t, o, e) {
        return o = build_getPrototypeOf(o), function build_possibleConstructorReturn(t, e) {
            if (e && ("object" == build_typeof(e) || "function" == typeof e)) return e;
            if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
            return function build_assertThisInitialized(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e;
            }(t);
        }(t, build_isNativeReflectConstruct() ? Reflect.construct(o, e || [], build_getPrototypeOf(t).constructor) : o.apply(t, e));
    }
    function build_isNativeReflectConstruct() {
        try {
            var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
        } catch (t) {}
        return (build_isNativeReflectConstruct = function _isNativeReflectConstruct() {
            return !!t;
        })();
    }
    function build_getPrototypeOf(t) {
        return build_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, build_getPrototypeOf(t);
    }
    function build_inherits(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }), Object.defineProperty(t, "prototype", {
            writable: !1
        }), e && build_setPrototypeOf(t, e);
    }
    function build_setPrototypeOf(t, e) {
        return build_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        }, build_setPrototypeOf(t, e);
    }
    function asyncGeneratorStep(n, t, e, r, o, a, c) {
        try {
            var i = n[a](c), u = i.value;
        } catch (n) {
            return void e(n);
        }
        i.done ? t(u) : Promise.resolve(u).then(r, o);
    }
    function core_typeof(o) {
        return core_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        }, core_typeof(o);
    }
    function core_defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, core_toPropertyKey(o.key), o);
        }
    }
    function core_toPropertyKey(t) {
        var i = function core_toPrimitive(t, r) {
            if ("object" != core_typeof(t) || !t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 !== e) {
                var i = e.call(t, r || "default");
                if ("object" != core_typeof(i)) return i;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === r ? String : Number)(t);
        }(t, "string");
        return "symbol" == core_typeof(i) ? i : i + "";
    }
    function core_callSuper(t, o, e) {
        return o = core_getPrototypeOf(o), function core_possibleConstructorReturn(t, e) {
            if (e && ("object" == core_typeof(e) || "function" == typeof e)) return e;
            if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
            return function core_assertThisInitialized(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e;
            }(t);
        }(t, core_isNativeReflectConstruct() ? Reflect.construct(o, e || [], core_getPrototypeOf(t).constructor) : o.apply(t, e));
    }
    function core_isNativeReflectConstruct() {
        try {
            var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
        } catch (t) {}
        return (core_isNativeReflectConstruct = function _isNativeReflectConstruct() {
            return !!t;
        })();
    }
    function core_getPrototypeOf(t) {
        return core_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        }, core_getPrototypeOf(t);
    }
    function core_setPrototypeOf(t, e) {
        return core_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        }, core_setPrototypeOf(t, e);
    }
    function core_arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    SHADOW_CSS.replaceSync(":host { contain: layout paint; }");
    var script = document.currentScript, strict = (null == script ? void 0 : script.hasAttribute("strict")) || !1, stateManagerClass = Cougar_StateManager, config = {
        useShadow: !0,
        allowAppScopeAccess: !0,
        useDSD: !1,
        strict,
        appName: (null == script ? void 0 : script.getAttribute("app")) || "sprout-app",
        stateManagerClass
    };
    config.allowAppScopeAccess && Object.defineProperty(globalThis, "sproutApps", {
        value: {},
        writable: !1
    });
    var SproutStylesheet = new CSSStyleSheet;
    SproutStylesheet.replaceSync(SPROUT_FROZEN_CLASS_CSS), document.adoptedStyleSheets = [].concat(function core_toConsumableArray(r) {
        return function core_arrayWithoutHoles(r) {
            if (Array.isArray(r)) return core_arrayLikeToArray(r);
        }(r) || function core_iterableToArray(r) {
            if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
        }(r) || function core_unsupportedIterableToArray(r, a) {
            if (r) {
                if ("string" == typeof r) return core_arrayLikeToArray(r, a);
                var t = {}.toString.call(r).slice(8, -1);
                return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? core_arrayLikeToArray(r, a) : void 0;
            }
        }(r) || function core_nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
    }(document.adoptedStyleSheets), [ SproutStylesheet ]);
    var _window, appScope = (window, {
        window,
        document: null === (_window = window) || void 0 === _window ? void 0 : _window.document
    });
    config.allowAppScopeAccess && Object.defineProperty(globalThis.sproutApps, config.appName, {
        value: appScope,
        writable: !1
    }), appScope.SPROUT_CONFIG = Object.seal(config);
    var core_hasOwnProperty = Object.prototype.hasOwnProperty;
    setHiddenProperty(Object.prototype, "hasOwnProperty", core_hasOwnProperty), appScope.getGlobalState = function() {
        return GLOBAL_STATE_NOT_SET_YET;
    }, appScope.setGlobalState = function() {
        var globalState = newStateManager(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, void 0, void 0, handleStateChange, !0, appScope).state;
        return Object.defineProperty(appScope, "SproutGlobalState", {
            value: globalState,
            writable: !1,
            configurable: !1
        }), Object.defineProperty(appScope, "getGlobalState", {
            value: function value() {
                return appScope.SproutGlobalState;
            }
        }), appScope.SproutGlobalState;
    }, appScope.setCommands = function() {
        var commands = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        Object.defineProperty(appScope, "appCommands", {
            value: commands,
            writable: !1,
            configurable: !1
        });
    };
    var HTML_REACTIVE_ELEMENT_CLASSES = {};
    HTML_ELEMENT_CLASSES_MAP.forEach((function(elementDefinition) {
        return HTML_REACTIVE_ELEMENT_CLASSES[elementDefinition.element] = extendElementClassWithReactiveElementClass(elementDefinition.class, appScope, !0);
    })), appScope.ReactiveCustomElement = function getReactiveCustomElementClass() {
        var appScope = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window, ReactiveHTMLElement = extendElementClassWithReactiveElementClass(HTMLElement, appScope), _wasMounted = (appScope.SPROUT_CONFIG.stateManagerClass, 
        new WeakMap), _lifecycle = new WeakMap, _templateContent = new WeakMap, _stylesheet = new WeakMap, _globalStylesheet = new WeakMap, _eventHandler = new WeakMap, _usesDSD = new WeakMap, _settings = new WeakMap, _ReactiveCustomElement_brand = new WeakSet, ReactiveCustomElement = function(_ReactiveHTMLElement) {
            function ReactiveCustomElement() {
                var _this, template = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, _runtime = arguments.length > 1 ? arguments[1] : void 0, style = arguments.length > 2 ? arguments[2] : void 0, globalStylesheet = arguments.length > 3 ? arguments[3] : void 0, usesDSD = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
                if (function ReactiveCustomElement_classCallCheck(a, n) {
                    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
                }(this, ReactiveCustomElement), function ReactiveCustomElement_classPrivateMethodInitSpec(e, a) {
                    ReactiveCustomElement_checkPrivateRedeclaration(e, a), a.add(e);
                }(_this = function ReactiveCustomElement_callSuper(t, o, e) {
                    return o = ReactiveCustomElement_getPrototypeOf(o), ReactiveCustomElement_possibleConstructorReturn(t, ReactiveCustomElement_isNativeReflectConstruct() ? Reflect.construct(o, e || [], ReactiveCustomElement_getPrototypeOf(t).constructor) : o.apply(t, e));
                }(this, ReactiveCustomElement), _ReactiveCustomElement_brand), ReactiveCustomElement_defineProperty(_this, "ownerMapElement", void 0), 
                ReactiveCustomElement_defineProperty(_this, "state", void 0), ReactiveCustomElement_defineProperty(_this, "stateKey", void 0), 
                ReactiveCustomElement_classPrivateFieldInitSpec(_this, _wasMounted, !1), ReactiveCustomElement_classPrivateFieldInitSpec(_this, _lifecycle, {
                    init: null,
                    mount: null,
                    stateful: null,
                    active: null,
                    unmount: null
                }), ReactiveCustomElement_classPrivateFieldInitSpec(_this, _templateContent, void 0), 
                ReactiveCustomElement_classPrivateFieldInitSpec(_this, _stylesheet, void 0), ReactiveCustomElement_classPrivateFieldInitSpec(_this, _globalStylesheet, void 0), 
                ReactiveCustomElement_defineProperty(_this, "events", void 0), ReactiveCustomElement_defineProperty(_this, "eventsMap", new Map), 
                ReactiveCustomElement_classPrivateFieldInitSpec(_this, _eventHandler, void 0), ReactiveCustomElement_defineProperty(_this, "propAttributes", new Map), 
                ReactiveCustomElement_classPrivateFieldInitSpec(_this, _usesDSD, !1), ReactiveCustomElement_classPrivateFieldInitSpec(_this, _settings, void 0), 
                ReactiveCustomElement_defineProperty(_this, "commands", void 0), ReactiveCustomElement_defineProperty(_this, "ref", {}), 
                ReactiveCustomElement_defineProperty(_this, "canonicalTagName", void 0), "CONDITIONAL-ELEMENT" === _this.tagName) return ReactiveCustomElement_possibleConstructorReturn(_this);
                if (_this.isNativeElement = !1, ReactiveCustomElement_classPrivateFieldSet(_usesDSD, _this, usesDSD), 
                globalStylesheet && ReactiveCustomElement_classPrivateFieldSet(_globalStylesheet, _this, globalStylesheet), 
                _this.canonicalTagName = _this.localName, ReactiveCustomElement_classPrivateFieldGet(_usesDSD, _this)) _this.canonicalTagName = _this.localName.substring(0, _this.localName.indexOf("-dsd")); else {
                    if (style) {
                        var stylesheet = new CSSStyleSheet;
                        stylesheet.replaceSync(style), ReactiveCustomElement_classPrivateFieldSet(_stylesheet, _this, stylesheet);
                    }
                    ReactiveCustomElement_classPrivateFieldSet(_templateContent, _this, template ? document.importNode(template, !0) : document.importNode(DEFAULT_TEMPLATE_DOM, !0)), 
                    ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, _this, _renderTemplate).call(_this);
                }
                return _runtime && ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, _this, _setRuntime).call(_this, _runtime), 
                ReactiveCustomElement_classPrivateFieldGet(_lifecycle, _this).init && ReactiveCustomElement_classPrivateFieldGet(_lifecycle, _this).init.call(_this), 
                _this;
            }
            return function ReactiveCustomElement_inherits(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(t, "prototype", {
                    writable: !1
                }), e && ReactiveCustomElement_setPrototypeOf(t, e);
            }(ReactiveCustomElement, _ReactiveHTMLElement), function ReactiveCustomElement_createClass(e, r, t) {
                return r && ReactiveCustomElement_defineProperties(e.prototype, r), t && ReactiveCustomElement_defineProperties(e, t), 
                Object.defineProperty(e, "prototype", {
                    writable: !1
                }), e;
            }(ReactiveCustomElement, [ {
                key: "setInitialState",
                value: function setInitialState(initState) {
                    this.initialState ? Object.assign(this.initialState, initState) : this.initialState = initState, 
                    initState.hasOwnProperty("key") && (this.stateKey = initState.key);
                }
            }, {
                key: "disconnectedCallback",
                value: function disconnectedCallback() {
                    ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, this, _unbindEvents).call(this), 
                    this.state = void 0, this.isActive = !1, ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this).unmount && ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this).unmount.call(this);
                }
            }, {
                key: "activate",
                value: function activate() {
                    ReactiveCustomElement_get(ReactiveCustomElement_getPrototypeOf(ReactiveCustomElement.prototype), "activate", this).call(this), 
                    ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, this, _bindEvents).call(this), 
                    ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this).active && ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this).active.call(this);
                }
            }, {
                key: "findElement",
                value: function findElement(refName) {
                    var _root, _root$querySelector, root = this;
                    return appScope.SPROUT_CONFIG.useShadow && (root = this.shadowRoot), Object.hasOwn(this.ref, refName) ? this.ref[refName] : (null === (_root = root) || void 0 === _root || null === (_root$querySelector = _root.querySelector) || void 0 === _root$querySelector ? void 0 : _root$querySelector.call(_root, '[ref="'.concat(refName, '"]'))) || null;
                }
            }, {
                key: "connectedCallback",
                value: function connectedCallback() {
                    var _this2 = this;
                    if (this.setAttribute("tagName", this.canonicalTagName), !ReactiveCustomElement_classPrivateFieldGet(_wasMounted, this)) {
                        var host = this.getRootNode().host;
                        ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this).mount && ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this).mount.call(this);
                        var doActivate = function doActivate() {
                            ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, _this2, _setActiveStateFromInitialState).call(_this2), 
                            _this2.isActive = !0, _this2.dispatchEvent(new CustomEvent("active")), ReactiveCustomElement_classPrivateFieldGet(_lifecycle, _this2).stateful && ReactiveCustomElement_classPrivateFieldGet(_lifecycle, _this2).stateful.call(_this2), 
                            _this2.activate();
                        };
                        host ? host.isActive ? doActivate() : host.addEventListener("active", doActivate, {
                            once: !0
                        }) : setTimeout(doActivate, 0), ReactiveCustomElement_classPrivateFieldSet(_wasMounted, this, !0);
                    }
                }
            }, {
                key: "attributeChangedCallback",
                value: function attributeChangedCallback(attributeName, oldValue, newValue) {
                    oldValue !== newValue && ("hidden" === attributeName && (null === newValue ? this.dispatchEvent(new CustomEvent("unhide", {
                        bubbles: !0
                    })) : this.dispatchEvent(new CustomEvent("hide", {
                        bubbles: !0
                    }))), this.propAttributes.has(attributeName) && this.propAttributes.get(attributeName).forEach((function(attrNode) {
                        attrNode.nodeValue = newValue, "CONDITIONAL-RENDER" === attrNode.ownerElement.tagName && attrNode.ownerElement.render();
                    })));
                }
            } ]);
        }(ReactiveHTMLElement);
        function _setRuntime(runtime) {
            var _this3 = this;
            if (ReactiveCustomElement_classPrivateFieldSet(_settings, this, runtime.settings), 
            this.commands = runtime.commands, runtime.events) {
                var eventsObjectValue, typeOfValue, setRefEvent = function setRefEvent(eventName, refName, eventHandler) {
                    _this3.eventsMap.has(eventName) || _this3.eventsMap.set(eventName, new Map), _this3.eventsMap.get(eventName).set(refName, eventHandler);
                };
                for (var refName in runtime.events) if ("function" === (typeOfValue = ReactiveCustomElement_typeof(eventsObjectValue = runtime.events[refName]))) setRefEvent("click", refName, eventsObjectValue); else if ("object" === typeOfValue) for (var eventName in eventsObjectValue) setRefEvent(eventName, refName, eventsObjectValue[eventName]);
                this.isConnected && ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, this, _bindEvents).call(this);
            }
            for (var lifecycleEvent in runtime.state && (this.setInitialState(runtime.state), 
            this.isConnected && ReactiveCustomElement_classPrivateFieldGet(_wasMounted, this) && !this.state && ReactiveCustomElement_assertClassBrand(_ReactiveCustomElement_brand, this, _setActiveStateFromInitialState).call(this)), 
            ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this)) runtime.hasOwnProperty(lifecycleEvent) && (ReactiveCustomElement_classPrivateFieldGet(_lifecycle, this)[lifecycleEvent] = runtime[lifecycleEvent]);
        }
        function _setActiveStateFromInitialState() {
            var _this$state;
            if (this.initialState && (null === (_this$state = this.state) || void 0 === _this$state || !_this$state._isActive)) {
                var initialState = this.initialState;
                if (initialState._stateManager) this.state = initialState._stateManager.state; else {
                    var stateManager = newStateManager(initialState, void 0, void 0, handleStateChange, !1, appScope);
                    this.state = stateManager.state, this.state.$host = this;
                }
                this.state._isActive = !0;
            }
        }
        function _renderTemplate() {
            if (appScope.SPROUT_CONFIG.useShadow) this.attachShadow({
                mode: "open",
                delegatesFocus: !0
            }), this.shadowRoot.adoptedStyleSheets = [ SHADOW_CSS ], ReactiveCustomElement_classPrivateFieldGet(_globalStylesheet, this) && this.shadowRoot.adoptedStyleSheets.push(ReactiveCustomElement_classPrivateFieldGet(_globalStylesheet, this)), 
            ReactiveCustomElement_classPrivateFieldGet(_stylesheet, this) && this.shadowRoot.adoptedStyleSheets.push(ReactiveCustomElement_classPrivateFieldGet(_stylesheet, this)), 
            this.shadowRoot.appendChild(ReactiveCustomElement_classPrivateFieldGet(_templateContent, this)); else {
                var fragment = new DocumentFragment;
                fragment.appendChild(ReactiveCustomElement_classPrivateFieldGet(_templateContent, this)), 
                this.appendChild(fragment);
            }
        }
        function _unbindEvents() {
            if (this.eventsMap.size) {
                var _step, _iterator = ReactiveCustomElement_createForOfIteratorHelper(this.eventsMap.keys());
                try {
                    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                        var eventName = _step.value;
                        this.shadowRoot.removeEventListener(eventName, ReactiveCustomElement_classPrivateFieldGet(_eventHandler, this), !1);
                    }
                } catch (err) {
                    _iterator.e(err);
                } finally {
                    _iterator.f();
                }
            }
        }
        function _bindEvents() {
            if (!ReactiveCustomElement_classPrivateFieldGet(_eventHandler, this) && this.eventsMap.size) {
                var globalState = appScope.getGlobalState();
                ReactiveCustomElement_classPrivateFieldSet(_eventHandler, this, (function(event) {
                    var host = this.host, eventsMapItem = host.eventsMap.get(event.type);
                    if (!eventsMapItem) return !1;
                    var _step2, _iterator2 = ReactiveCustomElement_createForOfIteratorHelper(event.composedPath());
                    try {
                        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                            var element = _step2.value;
                            if (element && element.refName && eventsMapItem.has(element.refName)) {
                                var targetElement = element, targetRefName = targetElement.refName;
                                eventsMapItem.get(targetRefName).call(targetElement, event, host, globalState);
                            }
                        }
                    } catch (err) {
                        _iterator2.e(err);
                    } finally {
                        _iterator2.f();
                    }
                    event.stopPropagation();
                }));
                var _step3, _iterator3 = ReactiveCustomElement_createForOfIteratorHelper(this.eventsMap.keys());
                try {
                    for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                        var eventName = _step3.value;
                        this.shadowRoot.addEventListener(eventName, ReactiveCustomElement_classPrivateFieldGet(_eventHandler, this), {
                            capture: !0
                        });
                    }
                } catch (err) {
                    _iterator3.e(err);
                } finally {
                    _iterator3.f();
                }
            }
        }
        return ReactiveCustomElement;
    }(appScope), function build(appScope, appName) {
        function defineCustomElementFromTemplate(_x3, _x4, _x5) {
            return _defineCustomElementFromTemplate.apply(this, arguments);
        }
        function _defineCustomElementFromTemplate() {
            return (_defineCustomElementFromTemplate = function _asyncToGenerator(n) {
                return function() {
                    var t = this, e = arguments;
                    return new Promise((function(r, o) {
                        var a = n.apply(t, e);
                        function _next(n) {
                            asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
                        }
                        function _throw(n) {
                            asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
                        }
                        _next(void 0);
                    }));
                };
            }(_regeneratorRuntime().mark((function _callee2(template, elemName, globalStylesheet) {
                var templateContent, style, runtime, runtimeScript, runtimeCode;
                return _regeneratorRuntime().wrap((function _callee2$(_context2) {
                    for (;;) switch (_context2.prev = _context2.next) {
                      case 0:
                        if (templateContent = template.content, (style = templateContent.querySelector("style")) && templateContent.removeChild(style), 
                        (runtimeScript = templateContent.querySelector("script")) && (runtimeCode = runtimeScript.textContent, 
                        templateContent.removeChild(runtimeScript), runtimeCode && 0 !== runtimeCode.trim().length)) try {
                            runtime = Function(runtimeCode)();
                        } catch (e) {}
                        customElements.define(elemName, function(_appScope$ReactiveCus3) {
                            function _class3() {
                                var _style;
                                return build_classCallCheck(this, _class3), build_callSuper(this, _class3, [ templateContent, runtime, null === (_style = style) || void 0 === _style ? void 0 : _style.textContent, globalStylesheet ]);
                            }
                            return build_inherits(_class3, _appScope$ReactiveCus3), build_createClass(_class3);
                        }(appScope.ReactiveCustomElement)), customElements.define("".concat(elemName, "-dsd"), function(_appScope$ReactiveCus4) {
                            function _class4() {
                                return build_classCallCheck(this, _class4), build_callSuper(this, _class4, [ templateContent, runtime, null, globalStylesheet, !0 ]);
                            }
                            return build_inherits(_class4, _appScope$ReactiveCus4), build_createClass(_class4);
                        }(appScope.ReactiveCustomElement));

                      case 7:
                      case "end":
                        return _context2.stop();
                    }
                }), _callee2);
            })))).apply(this, arguments);
        }
        !function build() {
            var _globalThis$SPROUT_CO2, globalStylesheet = new CSSStyleSheet, globalStyle = document.querySelector('head > style[app="'.concat(appName, '"]'));
            if (globalStyle) globalStylesheet.replaceSync(globalStyle.textContent); else {
                var _globalThis$SPROUT_CO, compiledStyle = null === (_globalThis$SPROUT_CO = globalThis.SPROUT_COMPILED_STYLES) || void 0 === _globalThis$SPROUT_CO ? void 0 : _globalThis$SPROUT_CO[appName];
                globalStylesheet.replaceSync(compiledStyle || "");
            }
            globalStylesheet.insertRule(SPROUT_FROZEN_CLASS_CSS), "function" == typeof globalThis["".concat(appName, "_runtime")] && globalThis["".concat(appName, "_runtime")].call(appScope);
            var compiledTemplates = null === (_globalThis$SPROUT_CO2 = globalThis.SPROUT_COMPILED_TEMPLATES) || void 0 === _globalThis$SPROUT_CO2 ? void 0 : _globalThis$SPROUT_CO2[appName];
            compiledTemplates && "function" == typeof compiledTemplates.forEach ? compiledTemplates.forEach((function(templateEl, componentName) {
                componentName && templateEl && defineCustomElementFromTemplate(templateEl, componentName, globalStylesheet);
            })) : Array.prototype.forEach.call(document.querySelectorAll('template[app="'.concat(appName, '"]')), (function(template) {
                var componentName = template.getAttribute("for");
                componentName && defineCustomElementFromTemplate(template, componentName, globalStylesheet);
            }));
        }();
    }(appScope, config.appName), HTML_ELEMENT_CLASSES_MAP.forEach((function(itemDefinition) {
        customElements.define("reactive-".concat(itemDefinition.element), HTML_REACTIVE_ELEMENT_CLASSES[itemDefinition.element], {
            extends: itemDefinition.element
        });
    }));
    var ReactiveHeadingClass = extendElementClassWithReactiveElementClass(HTMLHeadingElement, appScope);
    [ "h1", "h2", "h3", "h4", "h5", "h6" ].forEach((function(hTag) {
        customElements.define("reactive-".concat(hTag), function(_ReactiveHeadingClass) {
            function _class() {
                return function core_classCallCheck(a, n) {
                    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
                }(this, _class), core_callSuper(this, _class, arguments);
            }
            return function core_inherits(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(t, "prototype", {
                    writable: !1
                }), e && core_setPrototypeOf(t, e);
            }(_class, _ReactiveHeadingClass), function core_createClass(e, r, t) {
                return r && core_defineProperties(e.prototype, r), t && core_defineProperties(e, t), 
                Object.defineProperty(e, "prototype", {
                    writable: !1
                }), e;
            }(_class);
        }(ReactiveHeadingClass), {
            extends: hTag
        });
    }));
    var ReactiveInputClass = extendElementClassWithReactiveElementClass(HTMLInputElement, appScope, !0);
    customElements.define("reactive-input", ReactiveInputClass, {
        extends: "input"
    });
    var ConditionalElementClass = function getConditionalElementClass(ReactiveElementClass) {
        var _isConditionStateProp = new WeakMap, _conditionProp = new WeakMap, _renderMap = new WeakMap, ConditionalElement = function(_ReactiveElementClass) {
            function ConditionalElement() {
                var _this;
                !function ConditionalElement_classCallCheck(a, n) {
                    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
                }(this, ConditionalElement);
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                return ConditionalElement_classPrivateFieldInitSpec(_this = ConditionalElement_callSuper(this, ConditionalElement, [].concat(args)), _isConditionStateProp, void 0), 
                ConditionalElement_classPrivateFieldInitSpec(_this, _conditionProp, void 0), ConditionalElement_classPrivateFieldInitSpec(_this, _renderMap, void 0), 
                _this;
            }
            return function ConditionalElement_inherits(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(t, "prototype", {
                    writable: !1
                }), e && ConditionalElement_setPrototypeOf(t, e);
            }(ConditionalElement, _ReactiveElementClass), function ConditionalElement_createClass(e, r, t) {
                return r && ConditionalElement_defineProperties(e.prototype, r), t && ConditionalElement_defineProperties(e, t), 
                Object.defineProperty(e, "prototype", {
                    writable: !1
                }), e;
            }(ConditionalElement, [ {
                key: "render",
                value: function render() {
                    var conditionValue, _this2 = this, isFirstRender = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    if (ConditionalElement_classPrivateFieldGet(_isConditionStateProp, this)) {
                        if (void 0 === (conditionValue = this.getState(ConditionalElement_classPrivateFieldGet(_conditionProp, this)))) throw Error("State value for ".concat(ConditionalElement_classPrivateFieldGet(_conditionProp, this), " not found while rendering conditional-render element:"), this);
                    } else if (void 0 === (conditionValue = this.getAttribute("_condition"))) throw Error("_condition value not found while rendering conditional-render element:", this);
                    var elementsToRender = [];
                    ConditionalElement_classPrivateFieldGet(_renderMap, this).forEach((function(_ref) {
                        var condition = _ref.condition, elements = _ref.elements;
                        (function resolveCondition(operator, value, conditionStateValue) {
                            if ("always" === operator) return !0;
                            switch (operator) {
                              case "==":
                              default:
                                return conditionStateValue == value;

                              case "===":
                                return conditionStateValue === value;

                              case "!=":
                                return conditionStateValue != value;

                              case "!==":
                                return conditionStateValue !== value;

                              case "<":
                                return conditionStateValue < value;

                              case "<=":
                                return conditionStateValue <= value;

                              case ">":
                                return conditionStateValue > value;

                              case ">=":
                                return conditionStateValue >= value;
                            }
                        })(condition.operator, condition.value, conditionValue) && elementsToRender.push.apply(elementsToRender, ConditionalElement_toConsumableArray(elements));
                    })), isFirstRender ? (this.innerHTML = "", this.append.apply(this, elementsToRender)) : elementsToRender.length && queueConditionalRender(this, (function() {
                        _this2.innerHTML = "", _this2.append.apply(_this2, elementsToRender);
                    }));
                }
            }, {
                key: "generateRenderMap",
                value: function generateRenderMap() {
                    var renderMap = new Map;
                    renderMap.set("always", []), ConditionalElement_toConsumableArray(this.children).forEach((function(conditionalChild) {
                        var _if = conditionalChild.getAttribute("_if").replaceAll(" ", "");
                        if (_if) if (renderMap.has(_if)) renderMap.get(_if).elements.push(conditionalChild); else {
                            var _cond$trim$split2 = ConditionalElement_slicedToArray(cond.trim().split(CONDITIONAL_OPERATORS_REGEX), 3), conditionObj = {
                                operator: _cond$trim$split2[1],
                                value: function attributeValueToTypedValue(attrValue) {
                                    var typedValue = attrValue;
                                    return "true" === attrValue ? typedValue = !0 : "false" === attrValue ? typedValue = !1 : isNaN(Number(attrValue)) || (typedValue = Number(attrValue)), 
                                    typedValue;
                                }(_cond$trim$split2[2])
                            };
                            renderMap.set(_if, {
                                condition: conditionObj,
                                elements: [ conditionalChild ]
                            });
                        } else renderMap.get("always").elements.push(conditionalChild);
                    })), ConditionalElement_classPrivateFieldSet(_renderMap, this, renderMap);
                }
            }, {
                key: "activate",
                value: function activate() {
                    var condition = this.getAttribute("_condition");
                    if (!condition) throw Error("conditional-render elements must have a _condition attribute!");
                    if (0 === condition.indexOf("@") ? (bindPropAttribute.call(this, "_condition", condition), 
                    ConditionalElement_classPrivateFieldSet(_isConditionStateProp, this, !1), ConditionalElement_classPrivateFieldSet(_conditionProp, this, condition.substring(1))) : (ConditionalElement_classPrivateFieldSet(_isConditionStateProp, this, !0), 
                    ConditionalElement_classPrivateFieldSet(_conditionProp, this, condition)), ConditionalElement_classPrivateFieldGet(_isConditionStateProp, this)) {
                        var statePropName = ConditionalElement_classPrivateFieldGet(_conditionProp, this), _this$getState2 = ConditionalElement_slicedToArray(this.getState(statePropName, !0), 2), stateValue = _this$getState2[0], stateObject = _this$getState2[1];
                        if (void 0 === ConditionalElement_typeof(stateValue)) throw Error("State property ".concat(statePropName, " not defined for _condition command!"));
                        var stateManager = stateObject._stateManager;
                        stateManager.has("conditional-element") || stateManager.use(conditionalElements, "conditional-element"), 
                        stateManager.addConditionallyRenderingElements(statePropName, this), this.generateRenderMap(), 
                        this.render(!0);
                    } else this.render(!0);
                }
            } ]);
        }(ReactiveElementClass);
        return function ConditionalElement_defineProperty(e, r, t) {
            (r = ConditionalElement_toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[r] = t;
        }(ConditionalElement, "observedAttributes", [ "_condition" ]), ConditionalElement;
    }(extendElementClassWithReactiveElementClass(HTMLElement, appScope));
    customElements.define("conditional-render", ConditionalElementClass);
})();
//# sourceMappingURL=sprout-core.strict.js.map