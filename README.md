# Immuton

Working with _[immutable](https://en.wikipedia.org/wiki/Immutable_object) values_ simplifies your application development and state management, making it easier to detect changes in your application state.

**Immuton** is a _collection of utility functions_ for working with _immutable values_, helping you to create _high-performing_ applications with _smaller memory footprint_.

Immuton has zero production dependencies, and you may only import the functions you need in your app, allowing your bundler (e.g. [Webpack](https://webpack.js.org/)) to exclude any unused files from this library, resulting in smaller bundle sizes.

It is important to note that these functions can only be used if you follow the _immutability principle_ with all parameters and return values in this library. Mutating values passed to or returned by these functions these functions **will** have dangerous side-effects. To keep this library as lightweight as possible, there is no enforced protection for these mutations.

If you feel unfamiliar with the immutability principle you can learn it by reading the ["What does immutability mean?"](#what-does-immutability-mean) section below.

## Why to use Immuton?

Immuton has the three main motivations:

1. [Improve change detection](#improve-change-detecion) with immutable state values
2. [Decrease the memory usage and garbage collection](#decrease-memory-footprint) when following the immutability principle
3. Work with immutable values with [less code](#less-code)

### Improve change detection

Reactive frameworks and libaries are popular in modern web development, such as [React](https://reactjs.org/), [Redux](https://redux.js.org/), or [RxJS](https://rxjs-dev.firebaseapp.com/). These frameworks typically rely on the immutability principle. They also rely heavily on change detection. For example, in React, re-rendering or side-effects occur only when values actually change when using [`React.memo`](https://reactjs.org/docs/react-api.html#reactmemo), [contexts](https://reactjs.org/docs/context.html), or hooks such as [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect), [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback) or [`useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo).

For best performance and least ambiguity, the "change" is typically determines as a strict inequality, meaning that objects and arrays are not deep-checked. This means that updating your state to a new but _equivalent_ object or array will be considered a change, even though all of the properties or items would be equal.

Every function in Immuton that returns an altered object or array will always check if there would be an _actual_ change to the value. In those cases, they return the original references. If you use Immuton when changing the state of your app, you can remove many unnecessary re-renderings or side-effects, leading to better overall performance.

### Decrease memory footprint

One challenge in immutability principle is typically **increased memory usage**. As your app state changes, you copy, at least partially, objects or arrays to create altered versions of them. The old objects and arrays will be deallocated by JavaScript's garbage collector when no longer referred anywhere. Even though _deep cloning_ is rarely necessary, this may still result in a higher number of memory allocations and an increased number of gargabe collections. The impact may be completely unnoticeable in most apps, but it may be a concern in very performance-sensitive apps.

Functions in Immuton try to re-use existing objects and arrays in memory whenever possible, to minimize the effect to the memory footprint of the app.

### Less code

On one hand, Immuton anwers to very similar needs than other utility libraries such as [Lodash](https://lodash.com/), providing basic object or array manipulation functionality lacking in the JavaScript standard library.
On the other hand, Immuton does this differently compared to other libraries. By design, Immuton functions avoid copying objects or arrays if unnecessary, returning references to original instances. As long as immutability principle is fully followed, the end result is the same, but with the benefit of [improved change detection](#improve-change-detection) and [decreased memory footprint](#decrease-memory-footprint).

## Getting started

Install Immuton npm package to your app:

    npm i --save immuton

Import the helpers to your app where needed. For example:

```javascript
import map from 'immuton/map';

// ...
const numbers = map([1, 2, 3], value => value * 2);
```

## What does immutability mean?

"Immutability" can be defined as follows:

Immutability is a _principle_ meaning that after a _value_ is _created_, it will never be _edited_ afterwards.

In JavaScript, all _primitive values_ are always immutable: you cannot edit strings, numbers or booleans. However, JavaScript allows you to alter _objects_ (setting and deleting its properties) and _arrays_ (adding or removing items). By choosing immutability "principle", even though editing object and array values is technically possible, _we just agree not to do that_. After you create an object, you never set or delete its properties. Same applies to arrays: once built, its items won't be changed.

The important thing to notice is that immutability principle applies to "values". Any dynamic app contains components that need some kind of _state_. The state of course needs to change.
However, in immutability principle, the state is set to a _value_, and whenever you change the state, you _set it to a different value_ instead of _editing the value itself_.

To sum it up as a simplified example, **don't do this**:

```javascript
state.property = value;
```

Instead **do this**:

```javascript
state = { ...state, property: value };
```

There are JavaScript libraries such as [ImmutableJS](https://github.com/immutable-js/immutable-js) providing data structures or protection mechanisms for _enforcing_ the immutability principle, preventing you accidentally editing values. Using this kind of libraries is totally OK, but _you don't need them_ to follow immutability principle.

"Immutability" is not a library, it is a _principle_, so as long as your app's logic follows this principle, you need no additional libraries, not even Immuton, for this. Your app can be 100% VanillaJS and still follow the immutability principle.

The immutability principle applies to values only after they have been "created".
This means that you are totally free to set object properties or push items to the array while constructing a value. The immutability principle starts applying after you have made the constructed value available to other contexts, for example, by returning from your function, or providing it as a parameter to a callback function.

The following function still follows the immutability principle:

```javascript
function repeat(count, value) {
  const result = [];
  for (let i = 0; i < count; i+= 1) {
    // This is OK, as we are still constructing the value
    result.push(value);
  }
  // After this statement, the array must never be altered again
  return result;
}
```
