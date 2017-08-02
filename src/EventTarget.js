/**
 * A base class for objects that can receive events and may have listeners for
 * them.
 */

export class EventTarget {

	/**
	 * Constructs a new EventTarget.
	 */

	constructor() {

		/**
		 * A map of event listener functions.
		 *
		 * @type {Map}
		 */

		this.listenerFunctions = new Map();

		/**
		 * A map of event listener objects.
		 *
		 * @type {Map}
		 */

		this.listenerObjects = new Map();

	}

	/**
	 * Registers an event handler of a specific event type on the event target.
	 *
	 * @param {String} type - The event type to listen for.
	 * @param {Object} listener - The object that receives a notification when an event of the specified type occurs.
	 */

	addEventListener(type, listener) {

		const m = (typeof listener === "function") ? this.listenerFunctions : this.listenerObjects;

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
	 * @param {Object} listener - The event listener to remove from the event target.
	 */

	removeEventListener(type, listener) {

		const m = (typeof listener === "function") ? this.listenerFunctions : this.listenerObjects;

		let listeners;

		if(m.has(type)) {

			listeners = m.get(type);
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
	 * @param {EventTarget} [target] - An event target.
	 */

	dispatchEvent(event, target = this) {

		const listenerFunctions = target.listenerFunctions;
		const listenerObjects = target.listenerObjects;

		let listeners;
		let listener;

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
