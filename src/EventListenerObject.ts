import { Event } from "./Event";

/**
 * An event listener object.
 */

export interface EventListenerObject {

	/**
	 * Handles a given event.
	 *
	 * @param event - The event.
	 */

	handleEvent(event: Event): void;

}
