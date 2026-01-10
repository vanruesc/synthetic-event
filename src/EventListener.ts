import { Event } from "./Event.js";

/**
 * An event listener.
 */

export type EventListener<TEventData, TEventType extends string, TTarget = unknown> =
	(event: TEventData & Event<TEventType, TTarget>) => void;
