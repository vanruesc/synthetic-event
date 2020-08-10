import { Event } from "./Event";

/**
 * An event listener.
 */

export interface EventListener {

	(event: Event): void;

}
