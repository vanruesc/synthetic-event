/**
 * synthetic-event v0.0.0 build Feb 07 2017
 * https://github.com/vanruesc/synthetic-event
 * Copyright 2017 Raoul van Rüschen, Zlib
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.SYNTHETICEVENT = global.SYNTHETICEVENT || {})));
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

	/**
	 * A basic event.
	 *
	 * @class Event
	 * @submodule events
	 * @constructor
	 * @param {String} type - The name of the event.
	 */

	var Event = function Event(type) {
		classCallCheck(this, Event);


		/**
	  * The name of the event.
	  *
	  * @property type
	  * @type String
	  */

		this.type = type;

		/**
	  * A reference to the target to which the event was originally dispatched.
	  *
	  * @property target
	  * @type Object
	  * @default null
	  */

		this.target = null;
	};

	/**
	 * A base class for objects that can receive events and may have listeners for
	 * them.
	 *
	 * @class EventTarget
	 * @submodule events
	 * @constructor
	 */

	var EventTarget = function () {
		function EventTarget() {
			classCallCheck(this, EventTarget);


			/**
	   * A map of event listener functions.
	   *
	   * @property m0
	   * @type Map
	   * @private
	   */

			this.m0 = new Map();

			/**
	   * A map of event listener objects.
	   *
	   * @property m1
	   * @type Map
	   * @private
	   */

			this.m1 = new Map();
		}

		/**
	  * Registers an event handler of a specific event type on the event target.
	  *
	  * @method addEventListener
	  * @param {String} type - The event type to listen for.
	  * @param {Object} listener - The object that receives a notification when an event of the specified type occurs.
	  */

		createClass(EventTarget, [{
			key: "addEventListener",
			value: function addEventListener(type, listener) {

				var map = typeof listener === "function" ? this.m0 : this.m1;

				if (map.has(type)) {

					map.get(type).add(listener);
				} else {

					map.set(type, new Set([listener]));
				}
			}

			/**
	   * Removes an event handler of a specific event type from the event target.
	   *
	   * @method removeEventListener
	   * @param {String} type - The event type to remove.
	   * @param {Object} listener - The event listener to remove from the event target.
	   */

		}, {
			key: "removeEventListener",
			value: function removeEventListener(type, listener) {

				var map = typeof listener === "function" ? this.m0 : this.m1;

				var listeners = void 0;

				if (map.has(type)) {

					listeners = map.get(type);
					listeners.delete(listener);

					if (listeners.size === 0) {

						map.delete(type);
					}
				}
			}

			/**
	   * Dispatches an event at the specified event target, invoking the affected
	   * event listeners in the appropriate order.
	   *
	   * @method dispatchEvent
	   * @private
	   * @param {Event} event - The event to dispatch.
	   * @param {EventTarget} [target] - An event target.
	   */

		}, {
			key: "dispatchEvent",
			value: function dispatchEvent(event) {
				var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;


				var m0 = target.m0;
				var m1 = target.m1;

				var listeners = void 0;
				var listener = void 0;

				event.target = target;

				if (m0.has(event.type)) {

					listeners = m0.get(event.type);

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

				if (m1.has(event.type)) {

					listeners = m1.get(event.type);

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

	/**
	 * A collection of event classes.
	 *
	 * @module synthetic-event
	 */

	exports.Event = Event;
	exports.EventTarget = EventTarget;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
