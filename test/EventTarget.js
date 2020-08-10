import test from "ava";
import { Event, EventTarget } from "../build/synthetic-event.esm.js";

test("can be instantiated", t => {

	const object = new EventTarget();

	t.truthy(object);

});

test("can dispatch an event", t => {

	const eventTarget = new EventTarget();

	eventTarget.addEventListener("test", function(event) {

		t.is(event.target, eventTarget);

	});

	eventTarget.addEventListener("test", {

		handleEvent(event) {

			t.is(event.target, eventTarget);

		}

	});

	eventTarget.dispatchEvent(new Event("test"));

});

test("can dispatch on another target", t => {

	const eventTarget1 = new EventTarget();
	const eventTarget2 = new EventTarget();

	eventTarget2.addEventListener("test", {

		handleEvent(event) {

			t.is(event.target, eventTarget2);

		}

	});

	eventTarget1.dispatchEvent(new Event("test"), eventTarget2);

});
