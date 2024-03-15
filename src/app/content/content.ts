import { ContentNamespace } from './content.interface';

// RxJS
// rxjsPullPushSystem

const rxjsPullFunction: ContentNamespace.SubTheme = {
  description: 'Function is an example of a single pull system',
  content: `
<pre><code>// Result (consumer) pulls a single value from a function (producer)

function sum(a, b) {
  return a + b;
}

const result = sum(1, 2);
</code></pre>
`,
};

const rxjsPullIterator: ContentNamespace.SubTheme = {
  description: 'Iterator is an example of a multiple pull system',
  content: `
<pre><code>// Result (consumer) pulls multiple values from a function generator (producer)

function* generator(i) {
  yield i;
  yield i + 10;
}

const gen = generator(10);

const result = gen.next().value; // Expected output: 10
const result2 = gen.next().value; // Expected output: 20
</code></pre>
`,
};

const rxjsPushPromise: ContentNamespace.SubTheme = {
  description: 'Promise is an example of a single push system',
  content: `
<pre><code>// myPromise (producer) pushes a single value to "then" (consumer)

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

myPromise.then((value) => value)
</code></pre>
`,
};

const rxjsPushObservable: ContentNamespace.SubTheme = {
  description: 'Observable is an example of a multiple push system',
  content: `
<pre><code>// Observable (producer) pushes multiple values to subscriber (consumer)

const foo = new Observable((subscriber) => {
  subscriber.next(42);
});

foo.subscribe((x) => x);
</code></pre>
`,
};

const rxjsPullPushSystem: ContentNamespace.Theme = {
  name: 'Pull and Push',
  subThemes: [
    rxjsPullFunction,
    rxjsPullIterator,
    rxjsPushPromise,
    rxjsPushObservable,
  ],
};

// rxjsFunctionsObservableDifference

const rxjsFunctionObservableSame: ContentNamespace.SubTheme = {
  description: 'Function and Observable works same',
  content: `
<pre><code>// Functions and Observables works same

function foo() {
  console.log('Hello');
  return 42;
}

const x = foo.call(); // same as foo()
console.log(x);
const y = foo.call(); // same as foo()
console.log(y);

import { Observable } from 'rxjs';

const foo = new Observable((subscriber) => {
  console.log('Hello');
  subscriber.next(42);
});

foo.subscribe((x) => {
  console.log(x);
});
foo.subscribe((y) => {
  console.log(y);
});
</code></pre>
`,
};

const rxjsFunctionObservableDifferences: ContentNamespace.SubTheme = {
  description: 'Function and Observable differences',
  content: `
<pre><code>// Observables can "return" multiple values over time synchronously or asynchronously

import { Observable } from 'rxjs';

const foo = new Observable((subscriber) => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100);
  subscriber.next(200);
  setTimeout(() => {
    subscriber.next(300); // happens asynchronously
  }, 1000);
});

console.log('before');
foo.subscribe((x) => {
  console.log(x);
});
console.log('after');
</code></pre>
`,
};

const rxjsFunctionObservableDifference: ContentNamespace.Theme = {
  name: 'Function vs Observable',
  subThemes: [rxjsFunctionObservableSame, rxjsFunctionObservableDifferences],
};

// rxjsObservableAnatomy

const rxjsCreatingObservables: ContentNamespace.SubTheme = {
  description: 'Creating Observables',
  content: `
<pre><code>// Observables can be created with new Observable, of, from, interval, etc
// The Observable constructor takes one argument: the subscribe function

import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next('hi');
  }, 1000);
});
</code></pre>
`,
};

const rxjsSubscribingObservables: ContentNamespace.SubTheme = {
  description: 'Subscribing to Observables',
  content: `
<pre><code>// Every subscribe call triggers its own independent execution
// The Observable doesn't have a list of attached Observers (subscribers)

observable.subscribe((x) => console.log(x));
</code></pre>
`,
};

const rxjsExecutingObservables: ContentNamespace.SubTheme = {
  description: 'Executing Observables',
  content: `
<pre><code>// Lazy computation that only happens for each Observer that subscribes

// "Next" notification: sends a value such as a Number, a String, an Object, etc.
// "Error" notification: sends a JavaScript Error or exception.
// "Complete" notification: does not send a value.

// Zero to infinite Next notifications
// Either synchronously or asynchronously
// If either an Error or Complete notification is delivered, then nothing else can be delivered afterwards.

import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.complete();
});
</code></pre>
`,
};

const rxjsDisposingObservables: ContentNamespace.SubTheme = {
  description: 'Disposing Observables',

  content: `
<pre><code>// Unsubscribe is a way to avoid wasting computation power or memory resources

const subscription = observable.subscribe((x) => console.log(x));
subscription.unsubscribe();
</code></pre>
`,
};

const rxjsObservableAnatomy: ContentNamespace.Theme = {
  name: 'Anatomy of Observable',
  subThemes: [
    rxjsCreatingObservables,
    rxjsSubscribingObservables,
    rxjsExecutingObservables,
    rxjsDisposingObservables,
  ],
};

// rxjsObserver

const rxjsObserverDesc: ContentNamespace.SubTheme = {
  description: 'Observer',
  content: `
<pre><code>// An Observer is a consumer of values delivered by an Observable

const observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

observable.subscribe(observer);

// Common alternative

observable.subscribe(x => console.log('Observer got a next value: ' + x));
</code></pre>
`,
};

const rxjsObserver: ContentNamespace.Theme = {
  name: 'Observer',
  subThemes: [rxjsObserverDesc],
};

// rxjsCombinationOperators

const rxjsCombineLatest: ContentNamespace.SubTheme = {
  description: 'combineLatest',
  content: `
<pre><code>// Combines multiple Observables to create an Observable
// New Observable have latest values of each of its input Observables

// combineLatest wait for all input Observables to emit at least once, before it starts emitting results
// If some Observable does not emit a value but completes, resulting Observable completes immediately
// If we pass an empty array an Observable completes immediately
// If some input Observable does not emit a value and never completes, combineLatest also never emit and never complete
// Resulting Observable complete when all combined streams complete
// If any input Observable errors, combineLatest will error immediately and all input Observable unsubscribe

const combined: Observable<[a, b]> = combineLatest([a$, b$]);
const combined: Observable<{ a, b }> = combineLatest({ a: a$, b: b$ });
</code></pre>
`,
};

const rxjsStartWith: ContentNamespace.SubTheme = {
  description: 'startWith',
  content: `
<pre><code>// Way to set a default state or value for your observables
// Operator minimizing the chances of encountering unexpected scenarios
// startWith emits the initial value immediately upon subscription

const obs1: Observable<Т> = of(1).pipe(startWith(0)); // 0, 1
const obs2: Observable<Т> = of(2).pipe(startWith(0, 1)); // 0, 1, 2
const obs3: Observable<Т> = of(0).pipe(startWith()); // 0
</code></pre>
`,
};

const rxjsCombinationOperators: ContentNamespace.Theme = {
  name: 'Combination Operators',
  subThemes: [rxjsCombineLatest, rxjsStartWith],
};

// rxjsThemesList

const rxjs: ContentNamespace.Technology = {
  name: 'RxJS',
  themes: [
    rxjsPullPushSystem,
    rxjsFunctionObservableDifference,
    rxjsObservableAnatomy,
    rxjsObserver,
    rxjsCombinationOperators,
  ],
};

export const content: ContentNamespace.Technology[] = [rxjs];
