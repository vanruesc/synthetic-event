/**
 * synthetic-event v1.1.2 build Mon Aug 17 2020
 * https://github.com/vanruesc/synthetic-event
 * Copyright 2020 Raoul van Rüschen
 * @license Zlib
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SYNTHETICEVENT = {}));
}(this, (function (exports) { 'use strict';

    var Event = (function () {
        function Event(type) {
            this.type = type;
            this.target = null;
        }
        return Event;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    var EventTarget = (function () {
        function EventTarget() {
            this.listenerFunctions = new Map();
            this.listenerObjects = new Map();
        }
        EventTarget.prototype.addEventListener = function (type, listener) {
            var m = (typeof listener === "function") ?
                this.listenerFunctions : this.listenerObjects;
            if (m.has(type)) {
                m.get(type).add(listener);
            }
            else {
                m.set(type, new Set([listener]));
            }
        };
        EventTarget.prototype.removeEventListener = function (type, listener) {
            var m = (typeof listener === "function") ?
                this.listenerFunctions : this.listenerObjects;
            if (m.has(type)) {
                var listeners = m.get(type);
                listeners.delete(listener);
                if (listeners.size === 0) {
                    m.delete(type);
                }
            }
        };
        EventTarget.prototype.dispatchEvent = function (event, target) {
            var e_1, _a, e_2, _b;
            if (target === void 0) { target = this; }
            var listenerFunctions = target.listenerFunctions;
            var listenerObjects = target.listenerObjects;
            event.target = target;
            if (listenerFunctions.has(event.type)) {
                var listeners = listenerFunctions.get(event.type);
                try {
                    for (var listeners_1 = __values(listeners), listeners_1_1 = listeners_1.next(); !listeners_1_1.done; listeners_1_1 = listeners_1.next()) {
                        var listener = listeners_1_1.value;
                        listener.call(target, event);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (listeners_1_1 && !listeners_1_1.done && (_a = listeners_1.return)) _a.call(listeners_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (listenerObjects.has(event.type)) {
                var listeners = listenerObjects.get(event.type);
                try {
                    for (var listeners_2 = __values(listeners), listeners_2_1 = listeners_2.next(); !listeners_2_1.done; listeners_2_1 = listeners_2.next()) {
                        var listener = listeners_2_1.value;
                        listener.handleEvent(event);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (listeners_2_1 && !listeners_2_1.done && (_b = listeners_2.return)) _b.call(listeners_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        };
        return EventTarget;
    }());

    exports.Event = Event;
    exports.EventTarget = EventTarget;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
