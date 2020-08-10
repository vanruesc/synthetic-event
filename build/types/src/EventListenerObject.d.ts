import { Event } from "./Event";
export interface EventListenerObject {
    handleEvent(event: Event): void;
}
