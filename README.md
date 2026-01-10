# Synthetic Event

[![CI](https://github.com/vanruesc/synthetic-event/actions/workflows/ci.yml/badge.svg)](https://github.com/vanruesc/synthetic-event/actions/workflows/ci.yml)
[![Version](https://badgen.net/npm/v/synthetic-event?color=green)](https://www.npmjs.com/package/synthetic-event)

This library provides a simplified implementation of the [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) interface. The included classes and interfaces can be used to create [synthetic events](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events#creating_and_dispatching_events) and custom event targets in any environment.

If your focus lies on DOM events, please refer to the native [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) class. An alternative way to create custom event targets in a browser environment is to use a [DocumentFragment](https://developer.mozilla.org/en/docs/Web/API/Document/createDocumentFragment) as a dummy target.

*[Documentation](https://vanruesc.github.io/synthetic-event)*

## Installation

```sh
npm install synthetic-event
``` 

## Usage

##### Basics

```js
import { Event, EventTarget } from "synthetic-event";

const eventTarget = new EventTarget();

eventTarget.addEventListener("test", (event) => {

	console.log("listener function", event.target);

});

eventTarget.addEventListener("test", {

	handleEvent(event) {

		console.log("listener object", event.target);

	}

});

eventTarget.dispatchEvent({ type: "test" });
```

##### Custom EventTarget

```ts
import { Event, EventTarget } from "synthetic-event";

export interface MyEventMap {

	tick: Event<"tick">;

}

export class MyEventTarget extends EventTarget<MyEventMap> {

	private readonly myEvent: Event<"tick">;

	constructor() {

		super();

		this.myEvent = { type: "tick" };
		setInterval(() => this.dispatchEvent(this.myEvent), 1000);

	}

}
```

## Contributing

Maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
