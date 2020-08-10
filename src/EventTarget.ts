import { Event } from "./Event";
import { EventListener } from "./EventListener";
import { EventListenerObject } from "./EventListenerObject";

/**
 * An event target that can dispatch events to registered listeners.
 */

export class EventTarget {

	/**
	 * A collection of event listener functions.
	 */

	protected listenerFunctions: Map<string, Set<EventListener>>;

	/**
	 * A collection of event listener objects.
	 */

	protected listenerObjects: Map<string, Set<EventListenerObject>>;

	/**
	 * Constructs a new event target.
	 */

	constructor() {

		this.listenerFunctions = new Map<string, Set<EventListener>>();
		this.listenerObjects = new Map<string, Set<EventListenerObject>>();

	}

	/**
	 * Registers an event handler of a specific event type on the event target.
	 *
	 * @param type - The event type to listen for.
	 * @param listener - An event listener or callback.
	 */

	addEventListener(type: string, listener: EventListener | EventListenerObject) {

		const m: Map<string, Set<EventListener | EventListenerObject>> = (typeof listener === "function") ?
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
	 * @param type - The event type to remove.
	 * @param listener - The event listener to remove.
	 */

	removeEventListener(type: string, listener: EventListener | EventListenerObject) {

		const m: Map<string, Set<EventListener | EventListenerObject>> = (typeof listener === "function") ?
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
	 * @param event - The event to dispatch.
	 * @param target - An event target.
	 */

	dispatchEvent(event: Event, target: EventTarget = this): void {

		const listenerFunctions = target.listenerFunctions;
		const listenerObjects = target.listenerObjects;

		event.target = target;

		if(listenerFunctions.has(event.type)) {

			const listeners = listenerFunctions.get(event.type);

			for(const listener of listeners) {

				listener.call(target, event);

			}

		}

		if(listenerObjects.has(event.type)) {

			const listeners = listenerObjects.get(event.type);

			for(const listener of listeners) {

				listener.handleEvent(event);

			}

		}

	}

}
