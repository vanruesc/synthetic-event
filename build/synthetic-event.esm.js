/**
 * synthetic-event v1.1.2 build Mon Aug 17 2020
 * https://github.com/vanruesc/synthetic-event
 * Copyright 2020 Raoul van Rüschen
 * @license Zlib
 */
class Event {
    constructor(type) {
        this.type = type;
        this.target = null;
    }
}

class EventTarget {
    constructor() {
        this.listenerFunctions = new Map();
        this.listenerObjects = new Map();
    }
    addEventListener(type, listener) {
        const m = (typeof listener === "function") ?
            this.listenerFunctions : this.listenerObjects;
        if (m.has(type)) {
            m.get(type).add(listener);
        }
        else {
            m.set(type, new Set([listener]));
        }
    }
    removeEventListener(type, listener) {
        const m = (typeof listener === "function") ?
            this.listenerFunctions : this.listenerObjects;
        if (m.has(type)) {
            const listeners = m.get(type);
            listeners.delete(listener);
            if (listeners.size === 0) {
                m.delete(type);
            }
        }
    }
    dispatchEvent(event, target = this) {
        const listenerFunctions = target.listenerFunctions;
        const listenerObjects = target.listenerObjects;
        event.target = target;
        if (listenerFunctions.has(event.type)) {
            const listeners = listenerFunctions.get(event.type);
            for (const listener of listeners) {
                listener.call(target, event);
            }
        }
        if (listenerObjects.has(event.type)) {
            const listeners = listenerObjects.get(event.type);
            for (const listener of listeners) {
                listener.handleEvent(event);
            }
        }
    }
}

export { Event, EventTarget };
