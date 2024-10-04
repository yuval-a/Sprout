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
2. If the value is a "state equality condition" it creates a new equivalent state getter, and assigns a dependency using `StateManager.addStateDependency`
3. A new Attribute Node is created, is added to the StateManager instance by calling `addStateNode` - this adds the attribute node to the StateManager, and also creates the binding between them by using `privateState`, and a setter function in an `Object.defineProperty` that also calls `handleStateChange` (defined in `state_utils`).
4. It also handles the "negation" variation of a state property (one prefixed with `!`) if applicable).

##### Handling Command Attributes
Command attributes are handled one by one by calling the equalivent method from the `commands.js` module.

#### Rendering
The component is "rendered": a Shadow DOM is created and the template content is appended to it.

#### Styling
Both "local" and "global" stylings are applied to the component's Shadow DOM.

#### Binding Events
Event handlers are bound to relevant elements of the component.
The binding leverages "event bubbling":
One "main" event handler is defined on the custom element - 
that handler checks the target element, and if an event handler function was defined for it on the `events` object - it is called.
For each type of event that exists on the `events` object - a "wrapper" event listener is defined - which calls that "main event handler" with the relevant arguments.

#### `onMount` call
Call `onMount` function if defined on the runtime, passing the class instance itself as the `this` context, and the global state as the first argument.

# `StateManager` class
The `StateManager` class is responsible for handling the actual "reactivity" of state changes.
## Important class properties:
### `privateState`
An object that saves state values - which getter functions get values from and setter functions set values into it.
### `stateDependencies` 
An object that maps dependencies between different state properties.
### `stateNodes`
An object where the keys are state properties and the values are arrays of actual associated "State Attributes" (actual attribute nodes).
### `stateArrayMaps`
This is an object used to preserve "State Maps" - which are arrays of objects used with the `_map` command to render new custom elements from each state object in the array.
The keys are state property names, and the values are arrays of objects, each having: `customElementName` - the name of the component that is rendered from each state, `parentElement` - 
### `parentStateProp`, `parentStateManager`
These are relevant if the state is part of a "StatefulArray", then `parentStateProp` is equal to the state property name that contains the array, and `parentStateManager` the actual StateManager instance that contains the state with the array.
### `state`
This is the actual "public" state that is exposed to other places. It is assigned a new Proxy instance, with a `StateHandler` from `proxy_handlers`
#### `StateHandler`
The state handler handles some of the state reactivity. it has these "trap handlers":
##### `defineProperty`
This handler handles the following:
1. It has a mechanism to "capture" and save the dependencies of each state property. It works by temporarily defining a new Proxy with a "get" handler for each newly defined property, whose purpose it to detect if that property is called from other state getters.
2. If the value is a normal array - it is assigned a "StatefulArray" instead.
3. If the value is an SSH array it adds the appropriate dependencies, and also calls the SSH function if the third item is `true`.
4. It calls the `handleStateChange` - as this is the first time a value is assigned to that state property - it is still considered as a "state change" trigger.
##### `get`
This handler has a mechanism to detect dependencies between local state and global state, and also it handles "negation properties" (e.g. `!something`).
# `StatefulArray` class
This class is used to create "Stateful Arrays" from normal arrays assigned as values in a state object.
A stateful array is basically an array (it extends the `Array` class), where the constructor:
* Turns objects in the array into "State Objects".
* Override relevant Array methods to calll `handleStateChange` when neccesary.
StatefulArray instance is returned as a proxy, with a `StatefulArrayHandler` from `proxy_handlers`
## StatefulArrayHandler
The handler has the following "trap" handlers:
### set
* If the length of an array is changed it called `handleStateChange` for the entire array.
* If the same value is assigned to an index - it just returns true.
* If a new object is assigned to an index - turn that object into a State Object.
* If the array is in the middle of an "operation" (one of the array methods is called, which can internally change its content) - do not call `handleStateChange` until it finishes - otherwise,
  if a value is added to the array or one of indexes is changed - call `handleStateChange`

# `handleStateChange`
This function is the main function that gets called to handle state changes. It is in `state_utils` module. It received a `stateManager` instance and a state property name: `stateProp`.
The function calls the `generateStateNodeActions` functions with the `stateManager` and `stateProp`
## `nodeActionsMap`
This is a global "map" that is populated with the next pending "Node Actions" (an abstract representation of actions that are later translated into "DOM actions").
The `nodeActionsMap` is a `Map` object, where keys are actual (DOM) Nodes (Elements, Attributes or Text) and the values are objects with pending DOM actions waiting to be performed on the key Node.

* If the node is attribute node (a "State Attribute"), the object can have a `setAttribute` property with a string value.
* If the node is a text node, the object can have a `textContent` property with a string value.
* If the node is an HTML element, then the value is set to an object like this:
```
{
    append: new Map(),
    replace: new Map(),
    after: new Map(),
    remove: new Set()
}
```

- `append` is then a map where if new elements needs to be appended to the HTML element (the "parent" element), then a key which is a State Object is set, and the value is a "custom element" - later on this will be translated into a new custom element created from that state object, and appended to the parent element.
- `replace` is a map where keys are existing children elements of the parent, and values are **new** elements - that are custom elements created from a new state object (by calling `stateToElement` on `state_utils`).
- `remove` is simply a set of child elements to remove from parent child.
- `after` is a map where a key can be a child element, and the value a new custom element that should be added after it (this is currently **unused**!).
These are usually triggered from changes to "State Maps" -- Arrays of state objects used for a `_map` command.

## `on_${stateProp}Change`
If an `on_${stateProp}Change` is defined - it is triggered/called.

## Dependencies
If `stateManager.stateDependencies[stateProp]` has any dependencies, they are iterated:
* If a dependency is an SSH - its function is called.
* `generateStateNodeActions` is called, this time for the dependency state property.
* if `on_${stateProp}Change` is defined for the dependency state property - it is called.

## Global state dependencies
If the state is the global state, then the above is done for any dependency in `stateManager.globalStateDependencies[stateProp]`.

# `doUpdateDOM`
`doUpdateDOM` is a function that is periodically called on each `requestAnimationFrame` and is what actually commits DOM changes. It calls `resolveNodeActionsMapToDOMActions` to actually translate the content of `nodeActionsMap` to DOM actions. The DOM actions are run, and `nodeActionsMap` is reset.

# Commands
Commands are run by the methods defined in `commands.js`
