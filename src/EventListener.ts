import { Event } from "./Event";

/**
 * An event listener.
 */

export type EventListener<TEventData, TEventType extends string, TTarget = unknown> =
	(event: TEventData & Event<TEventType, TTarget>) => void;
