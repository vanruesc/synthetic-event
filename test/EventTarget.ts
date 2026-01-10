import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Event, EventTarget } from "synthetic-event";

interface EventMap {

	test: Event<"test">;

}

describe("EventTarget", () => {

	it("can be instantiated", () => {

		assert.doesNotThrow(() => new EventTarget());

	});

	it("can add an event listener", () => {

		const eventTarget = new EventTarget<EventMap>();
		const listener = () => {};

		assert.equal(eventTarget.hasEventListener("test", listener), false);
		eventTarget.addEventListener("test", listener);
		assert.equal(eventTarget.hasEventListener("test", listener), true);

	});

	it("can remove an event listener", () => {

		const eventTarget = new EventTarget<EventMap>();
		const listener = () => {};

		eventTarget.addEventListener("test", listener);
		assert.equal(eventTarget.hasEventListener("test", listener), true);
		eventTarget.removeEventListener("test", listener);
		assert.equal(eventTarget.hasEventListener("test", listener), false);

	});

	it("can dispatch an event", () => {

		const eventTarget = new EventTarget<EventMap>();

		eventTarget.addEventListener("test", function(event) {

			assert.equal(event.target, eventTarget);

		});

		eventTarget.addEventListener("test", {

			handleEvent(event) {

				assert.equal(event.target, eventTarget);

			}

		});

		eventTarget.dispatchEvent({ type: "test" });

	});

	it("can remove listener during dispatch", () => {

		const eventTarget = new EventTarget<EventMap>();
		const listener1 = () => eventTarget.removeEventListener("test", listener1);
		const listener2 = (event: Event) => assert.equal(event.target, eventTarget);

		eventTarget.addEventListener("test", listener1);
		eventTarget.addEventListener("test", listener2);
		eventTarget.dispatchEvent({ type: "test" });

	});

	it("can dispatch on another target", () => {

		const eventTarget1 = new EventTarget<EventMap>();
		const eventTarget2 = new EventTarget<EventMap>();

		eventTarget2.addEventListener("test", {

			handleEvent(event) {

				assert.equal(event.target, eventTarget2);

			}

		});

		eventTarget1.dispatchEvent({ type: "test" }, eventTarget2);

	});

});
