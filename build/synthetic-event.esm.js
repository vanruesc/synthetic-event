/**
 * synthetic-event v1.0.0 build Thu Aug 08 2019
 * https://github.com/vanruesc/synthetic-event
 * Copyright 2019 Raoul van Rüschen, Zlib
 */
/**
 * An event.
 */

class Event {

	/**
	 * Creates a new event.
	 *
	 * @param {String} type - The name of the event.
	 */

	constructor(type) {

		/**
		 * The name of the event.
		 *
		 * @type {String}
		 */

		this.type = type;

		/**
		 * A reference to the target to which the event was originally dispatched.
		 *
		 * @type {Object}
		 */

		this.target = null;

	}

}

/**
 * @external {EventListener} https://developer.mozilla.org/en-US/docs/Web/API/EventListener
 */

/**
 * An event target that can dispatch events to registered listeners.
 */

class EventTarget {

	/**
	 * Constructs a new EventTarget.
	 */

	constructor() {

		/**
		 * A map of event listener functions.
		 *
		 * @type {Map}
		 * @protected
		 */

		this.listenerFunctions = new Map();

		/**
		 * A map of event listener objects.
		 *
		 * @type {Map}
		 * @protected
		 */

		this.listenerObjects = new Map();

	}

	/**
	 * Registers an event handler of a specific event type on the event target.
	 *
	 * @param {String} type - The event type to listen for.
	 * @param {EventListener|Function} listener - An event listener or callback.
	 */

	addEventListener(type, listener) {

		const m = (typeof listener === "function") ?
			this.listenerFunctions : this.listenerObjects;

		if(m.has(type)) {

			m.get(type).add(listener);

		} else {

			m.set(type, new Set([listener]));

		}

	}

	/**
	 * Removes an event handler of a specific event type from the event target.
	 *
	 * @param {String} type - The event type to remove.
	 * @param {EventListener|Function} listener - The event listener to remove.
	 */

	removeEventListener(type, listener) {

		const m = (typeof listener === "function") ?
			this.listenerFunctions : this.listenerObjects;

		if(m.has(type)) {

			const listeners = m.get(type);
			listeners.delete(listener);

			if(listeners.size === 0) {

				m.delete(type);

			}

		}

	}

	/**
	 * Dispatches an event at the specified event target, invoking the affected
	 * event listeners in the appropriate order.
	 *
	 * @param {Event} event - The event to dispatch.
	 * @param {EventTarget} [target=this] - An event target.
	 */

	dispatchEvent(event, target = this) {

		const listenerFunctions = target.listenerFunctions;
		const listenerObjects = target.listenerObjects;

		let listeners, listener;

		event.target = target;

		if(listenerFunctions.has(event.type)) {

			listeners = listenerFunctions.get(event.type);

			for(listener of listeners) {

				listener.call(target, event);

			}

		}

		if(listenerObjects.has(event.type)) {

			listeners = listenerObjects.get(event.type);

			for(listener of listeners) {

				listener.handleEvent(event);

			}

		}

	}

}

export { Event, EventTarget };
