/**
 * A basic event.
 *
 * @param {String} type - The name of the event.
 */

export class Event {

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
		 * @default null
		 */

		this.target = null;

	}

}
