import { Event } from "./Event.js";

/**
 * An event listener object.
 */

export interface EventListenerObject<TEventData, TEventType extends string, TTarget = unknown> {

	/**
	 * Handles a given event.
	 *
	 * @param event - The event.
	 */

	handleEvent(event: TEventData & Event<TEventType, TTarget>): void;

}
