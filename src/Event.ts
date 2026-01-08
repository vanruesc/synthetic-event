/**
 * An event.
 */

export interface Event<TEventType extends string = string, TTarget = unknown> {

	/**
	 * The type of the event.
	 */

	type: TEventType;

	/**
	 * A reference to the target to which the event was originally dispatched.
	 */

	target?: TTarget;

}
