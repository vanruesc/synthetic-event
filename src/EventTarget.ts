import { Event } from "./Event.js";
import { EventListener } from "./EventListener.js";
import { EventListenerObject } from "./EventListenerObject.js";

/**
 * An event target that can dispatch events to registered listeners.
 */

export class EventTarget<TEventMap extends object = object> {

	/**
	 * A collection of event listener functions.
	 */

	private readonly listenerFunctions: Map<string, Set<EventListener<TEventMap[keyof TEventMap], string, this>>>;

	/**
	 * A collection of event listener objects.
	 */

	private readonly listenerObjects: Map<string, Set<EventListenerObject<TEventMap[keyof TEventMap], string, this>>>;

	/**
	 * Constructs a new event target.
	 */

	constructor() {

		this.listenerFunctions = new Map();
		this.listenerObjects = new Map();

	}

	/**
	 * Registers an event handler of a specific event type on the event target.
	 *
	 * @param type - The event type to listen for.
	 * @param listener - An event listener or callback.
	 */

	addEventListener<T extends Extract<keyof TEventMap, string>>(
		type: T,
		listener: EventListener<TEventMap[T], T, this> | EventListenerObject<TEventMap[T], T, this>
	): void {

		if(typeof listener === "function") {

			if(this.listenerFunctions.has(type)) {

				const listeners = this.listenerFunctions.get(type) as Set<EventListener<TEventMap[T], T, this>>;
				listeners.add(listener);

			} else {

				const listeners = new Set([listener]) as Set<EventListener<TEventMap[keyof TEventMap], string, this>>;
				this.listenerFunctions.set(type, listeners);

			}

		} else {

			if(this.listenerObjects.has(type)) {

				const listeners = this.listenerObjects.get(type) as Set<EventListenerObject<TEventMap[T], T, this>>;
				listeners.add(listener);

			} else {

				const listeners = new Set([listener]) as Set<EventListenerObject<TEventMap[keyof TEventMap], string, this>>;
				this.listenerObjects.set(type, listeners);

			}

		}

	}

	/**
	 * Removes an event handler of a specific event type from the event target.
	 *
	 * @param type - The event type to remove.
	 * @param listener - The event listener to remove.
	 */

	hasEventListener<T extends Extract<keyof TEventMap, string>>(
		type: T,
		listener: EventListener<TEventMap[T], T, this> | EventListenerObject<TEventMap[T], T, this>
	): boolean {

		if(typeof listener === "function") {

			if(!this.listenerFunctions.has(type)) {

				return false;

			}

			const listeners = this.listenerFunctions.get(type) as Set<EventListener<TEventMap[T], T, this>>;
			return listeners.has(listener);

		}

		if(!this.listenerObjects.has(type)) {

			return false;

		}

		const listeners = this.listenerObjects.get(type) as Set<EventListenerObject<TEventMap[T], T, this>>;
		return listeners.has(listener);

	}

	/**
	 * Removes an event handler of a specific event type from the event target.
	 *
	 * @param type - The event type to remove.
	 * @param listener - The event listener to remove.
	 */

	removeEventListener<T extends Extract<keyof TEventMap, string>>(
		type: T,
		listener: EventListener<TEventMap[T], T, this> | EventListenerObject<TEventMap[T], T, this>
	): void {

		if(typeof listener === "function") {

			if(!this.listenerFunctions.has(type)) {

				return;

			}

			const listeners = this.listenerFunctions.get(type) as Set<EventListener<TEventMap[T], T, this>>;

			if(listeners.delete(listener) && listeners.size === 0) {

				this.listenerFunctions.delete(type);

			}

		} else {

			if(!this.listenerObjects.has(type)) {

				return;

			}

			const listeners = this.listenerObjects.get(type) as Set<EventListenerObject<TEventMap[T], T, this>>;

			if(listeners.delete(listener) && listeners.size === 0) {

				this.listenerObjects.delete(type);

			}

		}

	}

	/**
	 * Dispatches an event at the specified event target, invoking the affected event listeners in the appropriate order.
	 *
	 * Event listeners can safely be added and removed while an event is being dispatched.
	 *
	 * @see https://262.ecma-international.org/#sec-map.prototype.foreach
	 * @param event - The event to dispatch.
	 * @param target - An event target.
	 */

	dispatchEvent<T extends Extract<keyof TEventMap, string>>(
		event: Event<T> & TEventMap[T],
		target: EventTarget<TEventMap> = this
	): void {

		const listenerFunctions = target.listenerFunctions;
		const listenerObjects = target.listenerObjects;

		event.target = target;

		if(listenerFunctions.has(event.type)) {

			const listeners = listenerFunctions.get(event.type) as Set<EventListener<Event<T> & TEventMap[T], T>>;

			for(const listener of listeners) {

				listener.call(target, event);

			}

		}

		if(listenerObjects.has(event.type)) {

			const listeners = listenerObjects.get(event.type) as Set<EventListenerObject<Event<T> & TEventMap[T], T>>;

			for(const listener of listeners) {

				listener.handleEvent(event);

			}

		}

	}

}
