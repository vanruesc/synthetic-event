import test from "ava";
import { Event } from "../build/synthetic-event.esm.js";

test("can be instantiated", t => {

	const object = new Event();

	t.truthy(object);

});
