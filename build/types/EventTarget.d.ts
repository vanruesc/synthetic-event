import { Event } from "./Event";
import { EventListener } from "./EventListener";
import { EventListenerObject } from "./EventListenerObject";
export declare class EventTarget {
    protected listenerFunctions: Map<string, Set<EventListener>>;
    protected listenerObjects: Map<string, Set<EventListenerObject>>;
    constructor();
    addEventListener(type: string, listener: EventListener | EventListenerObject): void;
    removeEventListener(type: string, listener: EventListener | EventListenerObject): void;
    dispatchEvent(event: Event, target?: EventTarget): void;
}
