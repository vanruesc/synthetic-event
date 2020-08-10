import { EventTarget } from "./EventTarget";

/**
 * An event.
 */

export class Event {

	/**
	 * The name of the event.
	 */

	type: string;

	/**
	 * A reference to the target to which the event was originally dispatched.
	 */

	target: EventTarget;

	/**
	 * Creates a new event.
	 *
	 * @param type - The name of the event.
	 */

	constructor(type: string) {

		this.type = type;
		this.target = null;

	}

}
