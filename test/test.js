"use strict";

const lib = require("../build/synthetic-event");

module.exports = {

	"Event": {

		"can be instantiated": function(test) {

			test.ok(new lib.Event());
			test.done();

		}

	},

	"EventTarget": {

		"can be instantiated": function(test) {

			test.ok(new lib.EventTarget());
			test.done();

		},

		"can dispatch an event": function(test) {

			const eventTarget = new lib.EventTarget();

			eventTarget.addEventListener("test", function(event) {

					test.equal(event.target, eventTarget);

			});

			eventTarget.addEventListener("test", {

				handleEvent(event) {

						test.equal(event.target, eventTarget);

					}

			});

			test.expect(2);
			eventTarget.dispatchEvent(new lib.Event("test"));
			test.done();

		}

	}

};
