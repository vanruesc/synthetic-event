import { Event } from "./Event";
export interface EventListener {
    (event: Event): void;
}
