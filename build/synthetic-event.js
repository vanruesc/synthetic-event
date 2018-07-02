/**
 * synthetic-event v0.0.4 build Mon Jul 02 2018
 * https://github.com/vanruesc/synthetic-event
 * Copyright 2018 Raoul van Rüschen, Zlib
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.SYNTHETICEVENT = {})));
}(this, (function (exports) { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Event = function Event(type) {
  		classCallCheck(this, Event);


  		this.type = type;

  		this.target = null;
  };

  var EventTarget = function () {
  		function EventTarget() {
  				classCallCheck(this, EventTarget);


  				this.listenerFunctions = new Map();

  				this.listenerObjects = new Map();
  		}

  		createClass(EventTarget, [{
  				key: "addEventListener",
  				value: function addEventListener(type, listener) {

  						var m = typeof listener === "function" ? this.listenerFunctions : this.listenerObjects;

  						if (m.has(type)) {

  								m.get(type).add(listener);
  						} else {

  								m.set(type, new Set([listener]));
  						}
  				}
  		}, {
  				key: "removeEventListener",
  				value: function removeEventListener(type, listener) {

  						var m = typeof listener === "function" ? this.listenerFunctions : this.listenerObjects;

  						var listeners = void 0;

  						if (m.has(type)) {

  								listeners = m.get(type);
  								listeners.delete(listener);

  								if (listeners.size === 0) {

  										m.delete(type);
  								}
  						}
  				}
  		}, {
  				key: "dispatchEvent",
  				value: function dispatchEvent(event) {
  						var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;


  						var listenerFunctions = target.listenerFunctions;
  						var listenerObjects = target.listenerObjects;

  						var listeners = void 0;
  						var listener = void 0;

  						event.target = target;

  						if (listenerFunctions.has(event.type)) {

  								listeners = listenerFunctions.get(event.type);

  								var _iteratorNormalCompletion = true;
  								var _didIteratorError = false;
  								var _iteratorError = undefined;

  								try {
  										for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
  												listener = _step.value;


  												listener.call(target, event);
  										}
  								} catch (err) {
  										_didIteratorError = true;
  										_iteratorError = err;
  								} finally {
  										try {
  												if (!_iteratorNormalCompletion && _iterator.return) {
  														_iterator.return();
  												}
  										} finally {
  												if (_didIteratorError) {
  														throw _iteratorError;
  												}
  										}
  								}
  						}

  						if (listenerObjects.has(event.type)) {

  								listeners = listenerObjects.get(event.type);

  								var _iteratorNormalCompletion2 = true;
  								var _didIteratorError2 = false;
  								var _iteratorError2 = undefined;

  								try {
  										for (var _iterator2 = listeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
  												listener = _step2.value;


  												listener.handleEvent(event);
  										}
  								} catch (err) {
  										_didIteratorError2 = true;
  										_iteratorError2 = err;
  								} finally {
  										try {
  												if (!_iteratorNormalCompletion2 && _iterator2.return) {
  														_iterator2.return();
  												}
  										} finally {
  												if (_didIteratorError2) {
  														throw _iteratorError2;
  												}
  										}
  								}
  						}
  				}
  		}]);
  		return EventTarget;
  }();

  exports.Event = Event;
  exports.EventTarget = EventTarget;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
