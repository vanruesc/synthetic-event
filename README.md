# Synthetic Event

[![Build status](https://travis-ci.org/vanruesc/synthetic-event.svg?branch=master)](https://travis-ci.org/vanruesc/synthetic-event)
[![NPM version](https://badge.fury.io/js/synthetic-event.svg)](http://badge.fury.io/js/synthetic-event)
[![Dependencies](https://david-dm.org/vanruesc/synthetic-event.svg?branch=master)](https://david-dm.org/vanruesc/synthetic-event)

This library provides a simplified implementation of the two interfaces [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) and [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget). The included base classes can be used to create synthetic events and custom event targets in any environment.

If your focus lies on DOM events, please refer to the native [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) class. An alternative way to create custom event targets in a browser environment is to use a [DocumentFragment](https://developer.mozilla.org/en/docs/Web/API/Document/createDocumentFragment) as a dummy target.

*[Documentation](https://vanruesc.github.io/synthetic-event)*


## Installation

```sh
npm install synthetic-event
``` 


## Usage

##### Basics

```ts
import { Event, EventTarget } from "synthetic-event";

const eventTarget = new EventTarget();

eventTarget.addEventListener("test", (event: Event) => {

	console.log("listener function", event.target);

});

eventTarget.addEventListener("test", {

	handleEvent(event: Event): void {

		console.log("listener object", event.target);

	}

});

eventTarget.dispatchEvent(new Event("test"));
```

##### Custom Events

```ts
import { Event } from "synthetic-event";

export class MyEvent extends Event {

	myData: string;

	constructor(type) {

		super(type);

		this.myData = null;

	}

}
```

##### Custom EventTargets

```ts
import { Event, EventTarget } from "synthetic-event";

export class MyEventTarget extends EventTarget {

	private myEvent: Event;

	constructor() {

		super();

		this.myEvent = new Event("tick");
		setInterval(() => this.dispatchEvent(this.myEvent), 1000);

	}

}
```


## Contributing

Maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
