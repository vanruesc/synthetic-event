import test from "ava";
import { EventTarget } from "synthetic-event";

test("can be instantiated", t => {

	t.truthy(new EventTarget());

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

	eventTarget.dispatchEvent({ type: "test" });

});

test("can dispatch on another target", t => {

	const eventTarget1 = new EventTarget();
	const eventTarget2 = new EventTarget();

	eventTarget2.addEventListener("test", {

		handleEvent(event) {

			t.is(event.target, eventTarget2);

		}

	});

	eventTarget1.dispatchEvent({ type: "test" }, eventTarget2);

});
