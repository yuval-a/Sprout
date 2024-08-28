# Introduction
This MD file is intended for developers wanting to contribute to Sprout's development and is created in an attempt to describe the "architecture" and inner workings of Sprout "under the hood".

# Flows
We can generally divide the runtime to the following stages:

## Define
### `SproutInitApp`
the `index.js` of the `core` folder defines the global `SproutIntiApp` which receives an app name as an argument and does the following:
1. Define the new app scope.
2. Define the "config" object (which may be exposed in the future for new configuration options).
3. Define the `setGlobalState` function, which can receive a "state object' and turn it into a live `StateManager` instance.
4. Extend `HTMLElement` and all other HTML elements subclasses with `ReactiveElement`
5. Return the `SproutBuild` function.
6. Start the `requestAnimationFrame` "loop" that periodically checks for pending DOM changes and commits them.

## Build
At this stage, the `SproutBuild` function is called, which is defined in the `index.js` file of the `build` folder. This function:
1. Collects the "global" style declaration from the page.
2. For each `<template>` defining all the neccesary ingredients for a component, defines a new custom element, based on the `ReactiveElement` class.
   At this point the `constructor` of each `ReactiveElement` is called. The constructor can receive: the UI `template`, the runtime script, the local style, and the global style.
   If the element is a custom element (not a reactive native HTML element), then the runtime ingredients are saved into private class variables: `events`, `state` (in its initial form, it doesn't become "live" yet until the element is mounted, the `onMount` function if defined. template and styles are also saved to private class variables. The `ref` map is created as well (an object that will contain references to all elements in the component that has a `ref` attribute).
   
4. If a global app runtime is defined, it runs it.

## Mount
At this point, custom elements based on defined "components" are defined and ready to be used in the body of the HTML. Whenever the browser DOM parser encounters a custom element OR a native HTML element defined as "reactive" using the `is="reactive-..."` attribute.

### `connectedCallback`
At this point the `connectedCallback` method of the `ReactiveElement` instance is called. `connectedCallback` is part of the native Web Components API. The following is executed:
#### State becomes "live"
If the element is a custom element, the "state" saved on it becomes "live": a new instance of `StateManager` is created, and its `state` property is saved into the `ReactiveElement` instance public `state` property.
#### `change` event "hack"
If the element is an `input` A "hack" to listen to the "change" event correctly is implemented.
#### Attributes Resolvement
Each attribute is handled by the `initialSetAttribute` method:
If the attribute is a normal attriute - the value is simply set. If the attribute is a State Attribute, `setStateAttribute` from `state_utils` is called:

##### Handling State Attributes
1. It makes sure the state has the property defined with a value.
2. If the value is an "state equality condition" it creates a new equilavent state getterl, and assigns a dependency using `StateManager.addStateDependency`
3. A new Attribute Node is created, is added to the StateManager by calling `addStateNode` - this adds the attribute node to the StateManager, and also creates the binding between them by using `privateState`, and a setter function in an `Object.defineProperty` that also calls `handleStateChange` (defined in `state_utils`).
4. It also handles the "negation" variation of a state property (one prefixed with `!` if applicable).

##### Handling Command Attributes
Command attributes are handled one by one by calling the equalivent method from the `commands.js` module.

#### Rendering
The component is "rendered": a Shadow DOM is created and the template content is appended to it.

#### Styling
Both "local" and "global" stylings are applied to the component's Shadow DOM.

#### Binding Events
Event handlers are bound to relevant elements of the component.
The binding leverages "event bubbling".
One "main" event handler is defined on the custom element - 
that handler checks the target element, and if an event handler function was defined for it on the `events` object - it is called.
For each type of event that exists on the `events` object - a "wrapper" event listener is defined - which calls that "main event handler" with the relevant arguments.

#### `onMount` call
Call `onMount` function if defined on the runtime, passing the class instance itself as the `this` context, and the global state as the first argument.
