import { ContentNamespace } from './content.interface';

// RxJS
// rxjsPullPushSystem

const rxjsPullFunction: ContentNamespace.SubTheme = {
  description: 'Function is an example of a single pull system',
  content: `// Result (consumer) pulls a single value from a function (producer)

function sum(a, b) {
  return a + b;
}

const result = sum(1, 2);
`,
};

const rxjsPullIterator: ContentNamespace.SubTheme = {
  description: 'Iterator is an example of a multiple pull system',
  content: `// Result (consumer) pulls multiple values from a function generator (producer)

function* generator(i) {
  yield i;
  yield i + 10;
}

const gen = generator(10);

const result = gen.next().value; // Expected output: 10
const result2 = gen.next().value; // Expected output: 20
`,
};

const rxjsPushPromise: ContentNamespace.SubTheme = {
  description: 'Promise is an example of a single push system',
  content: `// myPromise (producer) pushes a single value to "then" (consumer)

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

myPromise.then((value) => value)
`,
};

const rxjsPushObservable: ContentNamespace.SubTheme = {
  description: 'Observable is an example of a multiple push system',
  content: `// Observable (producer) pushes multiple values to subscriber (consumer)

const foo = new Observable((subscriber) => {
  subscriber.next(42);
});

foo.subscribe((x) => x);
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
  content: `// Functions and Observables works same

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
`,
};

const rxjsFunctionObservableDifferences: ContentNamespace.SubTheme = {
  description: 'Function and Observable differences',
  content: `// Observables can "return" multiple values over time synchronously or asynchronously

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
`,
};

const rxjsFunctionObservableDifference: ContentNamespace.Theme = {
  name: 'Function vs Observable',
  subThemes: [rxjsFunctionObservableSame, rxjsFunctionObservableDifferences],
};

// rxjsObservableAnatomy

const rxjsCreatingObservables: ContentNamespace.SubTheme = {
  description: 'Creating Observables',
  content: `// Observables can be created with new Observable, of, from, interval, etc
// The Observable constructor takes one argument: the subscribe function

import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next('hi');
  }, 1000);
});
`,
};

const rxjsSubscribingObservables: ContentNamespace.SubTheme = {
  description: 'Subscribing to Observables',
  content: `// Every subscribe call triggers its own independent execution
// The Observable doesn't have a list of attached Observers (subscribers)

observable.subscribe((x) => console.log(x));
`,
};

const rxjsExecutingObservables: ContentNamespace.SubTheme = {
  description: 'Executing Observables',
  content: `// Lazy computation that only happens for each Observer that subscribes

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
`,
};

const rxjsDisposingObservables: ContentNamespace.SubTheme = {
  description: 'Disposing Observables',

  content: `// Unsubscribe is a way to avoid wasting computation power or memory resources

const subscription = observable.subscribe((x) => console.log(x));
subscription.unsubscribe();
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
  content: `// An Observer is a consumer of values delivered by an Observable

const observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

observable.subscribe(observer);

// Common alternative

observable.subscribe(x => console.log('Observer got a next value: ' + x));
`,
};

const rxjsObserver: ContentNamespace.Theme = {
  name: 'Observer',
  subThemes: [rxjsObserverDesc],
};

// rxjsCombinationOperators

const rxjsCombineLatest: ContentNamespace.SubTheme = {
  description: 'combineLatest',
  content: `// Combines multiple Observables to create an Observable
// New Observable have latest values of each of its input Observables

// combineLatest wait for all input Observables to emit at least once, before it starts emitting results
// If some Observable does not emit a value but completes, resulting Observable completes immediately
// If we pass an empty array an Observable completes immediately
// If some input Observable does not emit a value and never completes, combineLatest also never emit and never complete
// Resulting Observable complete when all combined streams complete
// If any input Observable errors, combineLatest will error immediately and all input Observable unsubscribe

const combined: Observable<[a, b]> = combineLatest([a$, b$]);
const combined: Observable<{ a, b }> = combineLatest({ a: a$, b: b$ });
`,
};

const rxjsStartWith: ContentNamespace.SubTheme = {
  description: 'startWith',
  content: `// Way to set a default state or value for your observables
// Operator minimizing the chances of encountering unexpected scenarios
// startWith emits the initial value immediately upon subscription

const obs1: Observable<Т> = of(1).pipe(startWith(0)); // 0, 1
const obs2: Observable<Т> = of(2).pipe(startWith(0, 1)); // 0, 1, 2
const obs3: Observable<Т> = of(0).pipe(startWith()); // 0
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

// Angular

const angularReactiveFormsFlowViewModel: ContentNamespace.SubTheme = {
  description: 'Reactive Forms Flow (View -> Model)',
  content: `// 1. User types a value to input form field
// 2. Input form field emits an event with value
// 3. ControlValueAccessor listens an event and pass a value to FormControl model
// 4. FormControl emits a value to valueChanges observable
`,
};

const angularReactiveFormsFlowModelView: ContentNamespace.SubTheme = {
  description: 'Reactive Forms Flow (Model -> View)',
  content: `// 1. Set a new value by myFormControl.setValue()
// 2. FormControl emits a value to valueChanges observable
// 3. FormControl emits a value to ControlValueAccessor
// 4. ControlValueAccessor updates an input value of input field
`,
};

const angularAddFormControl: ContentNamespace.SubTheme = {
  description: 'Add FormControl',
  content: `// How to add FormControl
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<input [formControl]="myFormControl" />', - formControl directive binds view to model
  imports: [ReactiveFormsModule], - to use ReactiveForms we should implement ReactiveFormsModule
})
export class App {
  public myFormControl: new FormControl<string> = new FormControl<string>(''); - formControl model with '' as init value
}
`,
};

const angularGetFormControlValue: ContentNamespace.SubTheme = {
  description: 'Get FormControl Value',
  content: `// How to get FormControl value
<input [formControl]="myFormControl" />
{{ myFormControl.value }} - way to get a snapshot value at the given point of time
{{ myFormControl.valueChanges | async }} - way to get observable value
`,
};

const angularSetFormControlValue: ContentNamespace.SubTheme = {
  description: 'Set FormControl Value',
  content: `// How to set FormControl value
this.myFormControl.setValue('Nancy'); - simplest way to change value of FormControl
`,
};

const angularGroupingFormControls: ContentNamespace.SubTheme = {
  description: 'Grouping FormControls',
  content: `// How to group FormControls
// FormGroup for join and manage fixed list of FormControls
// FormArray for join and manage dynamic list FormControls
`,
};

const angularAddFormGroup: ContentNamespace.SubTheme = {
  description: 'How to add FormGroup',
  content: `// How to add FormGroup
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '
<form [formGroup]="myFormGroup" (ngSubmit)="onSubmit()"> - formGroup directive binds view to model, ngSubmit emits button pushing
  <input formControlName="first" /> - formControlName binds input to model FormControl
  <input formControlName="second" />
  <button type="submit">Submit</button> - type="submit" creates an emit of (ngSubmit)
</form>
  ',
  imports: [ReactiveFormsModule, CommonModule],
})
export class App {
  public myFormGroup = new FormGroup({ - creating by using constructor and passing object with form controls
    first: new FormControl(''), - part of group
    second: new FormControl(''),
  });

  public onSubmit() {
    console.log(this.myFormGroup.value); - get snapshot of current value
  }
}
`,
};

const angularNestedFormGroup: ContentNamespace.SubTheme = {
  description: 'How to add nested FormGroup',
  content: `...`,
};

const angularUpdateFormGroupValue: ContentNamespace.SubTheme = {
  description: 'How to update FormGroup value',
  content: `
  public myFormGroup = new FormGroup({
    first: new FormControl(''),
    second: new FormControl(''),
  });

  // Hard update, it works only if all signature and types is correct, otherwise emits an error
  public updateHard() {
    this.myFormGroup.setValue({
      first: 'new value',
      second: 'new value',
    });
  }

  // Soft update, it works for all the correct fields, otherwise does nothing without errors
  public updateSoft() {
    this.myFormGroup.patchValue({
      first: 'new value',
    });
  }
  `,
};

const angularGroupFormBuilder: ContentNamespace.SubTheme = {
  description: 'How to add FormGroup by FormBuilder',
  content: `
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '
<form [formGroup]="myFormGroup">
  <input formControlName="first" />
  <input formControlName="second" />
</form>
  ',
  providers: [FormBuilder], - provide FormBuilder to use
  imports: [ReactiveFormsModule],
})
export class App {
  public myFormGroup = this.formBuilder.group({ - creating a group
    first: [''], - '' - is an initial value
    second: ['', Validators.required], - second arg is a sync validation, third is a async validation
  });

  constructor(private formBuilder: FormBuilder) {} - add a FormBuilder by DI to use
}
// FormBuilder has methods control(), group(), and array()
`,
};

const angularValidation: ContentNamespace.SubTheme = {
  description: 'How to add validation',
  content: `
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '
<input [formControl]='myFormControl'>
<p>Form Status: {{ myFormControl.status }}</p> - current validation status
  ',
  providers: [FormBuilder],
  imports: [ReactiveFormsModule],
})
export class App {
  public myFormControl = this.formBuilder.control('', Validators.required); - add validator to new FormControl
  constructor(private formBuilder: FormBuilder) {}
}
`,
};

const angularReactiveForms: ContentNamespace.Theme = {
  name: 'Reactive Forms',
  subThemes: [
    angularReactiveFormsFlowViewModel,
    angularReactiveFormsFlowModelView,
    angularAddFormControl,
    angularGetFormControlValue,
    angularSetFormControlValue,
    angularGroupingFormControls,
    angularAddFormGroup,
    angularNestedFormGroup,
    angularUpdateFormGroupValue,
    angularGroupFormBuilder,
    angularValidation,
  ],
};

const angularTemplateDrivenForms: ContentNamespace.Theme = {
  name: 'Template Driven Forms',
  subThemes: [
    angularReactiveFormsFlowViewModel,
    angularReactiveFormsFlowModelView,
  ],
};

const angularHTTPRequests: ContentNamespace.Theme = {
  name: 'HTTP Requests',
  subThemes: [],
};

const angularSignals: ContentNamespace.Theme = {
  name: 'Signals',
  subThemes: [],
};

const angularRouting: ContentNamespace.Theme = {
  name: 'Routing',
  subThemes: [],
};

const angularDI: ContentNamespace.Theme = {
  name: 'DI',
  subThemes: [],
};

const angularDirectives: ContentNamespace.Theme = {
  name: 'Directives',
  subThemes: [],
};

const angularTemplateSyntax: ContentNamespace.Theme = {
  name: 'Template Syntax',
  subThemes: [],
};

const angularComponent: ContentNamespace.Theme = {
  name: 'Component',
  subThemes: [],
};

const angularPerformance: ContentNamespace.Theme = {
  name: 'Performance',
  subThemes: [],
};

const angularSecurity: ContentNamespace.Theme = {
  name: 'Security',
  subThemes: [],
};

const angularStyleGuide: ContentNamespace.Theme = {
  name: 'Style Guide',
  subThemes: [],
};

const angularCLI: ContentNamespace.Theme = {
  name: 'Angular CLI',
  subThemes: [],
};

const angularDevTools: ContentNamespace.Theme = {
  name: 'Angular DevTools',
  subThemes: [],
};

const angular: ContentNamespace.Technology = {
  name: 'Angular',
  themes: [
    angularComponent, // 22h
    angularTemplateSyntax, // 15h
    angularDirectives, // 8h
    angularRouting, // 8h
    angularReactiveForms, // 11h
    angularTemplateDrivenForms, // 6h
    angularHTTPRequests, // 7h
    angularSignals, // 4h
    angularDI, // 16h
    angularPerformance, // 11h
    angularSecurity, // 4h
    angularStyleGuide, // 5h
    angularCLI, // ?
    angularDevTools, // 4h
  ],
};

export const content: ContentNamespace.Technology[] = [rxjs, angular];
