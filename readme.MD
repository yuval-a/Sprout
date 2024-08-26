# Introduction
Sprout is a client-side Javascript framework that introduces "state" management and "reactivity" into HTML elements, 
by using the native Web Components API, extending the HTMLElement class, adding additional capabilities to it, allowing you to define "custom elements" that reacts to state changes, using native browser features such as the `<template>` element, while also adding these capabilities to exisiting native HTML elements.

# Main Concepts
## ReactiveElement
At the heart of Sprout is the `ReactiveElement` class, this is a base class, extending the `HTMLElement` class, effectivily extending HTML Elements with the features Sprout supports.

"Building" an app with Sprout initially entails defining "Components" (where the "compiled form" uses `<template>` elements), that encapsulates within them the three aspects of a component: the UI (HTML), the styling (its look - CSS), and the logic (Javascript). Sprout's core library passes this information to a new instance of a ReactiveElement, and then defines a new "Custom Element" based off of this. When you use that custom element in your HTML structure - it already supports Sprout's features. 

### Reactive Native HTML Elements, using the `is` attribute
Other than "custom elements" - Sprout also makes sure to extend ALL native HTML elements subclasses with the `ReactiveElement` class, this allows you to enable Sprouts features even for native HTML elements, you do this by using the `is` attribute on a native element - the value of the attribute should be in the form of: `reactive-[tag-name]` where `[tag-name]` is the name of the element's tag (lower-cased). So, for example: for a `<div>` element you would use `is="reactive-div"`, for a `<span>`: `is="reactive-span"`, for a `<ul>`: `is="reactive-ul"`, for an `<input>`: `is="reactive-input` and so on.

You can use "native reactive HTML elements" within the templates of your components - and you will most likely do that quite a lot when building your app - so whenever you use a Sprout feature on an element - **remember** to put an `is` attribute on it -- otherwise it will be treated as a "normal" HTML element, and using features like State Attributes or Commands - won't work.

HTML elements within a component are rendered into the "Shadow DOM" of a rendered custom element.

## State Attributes
One of Sprout's core features is the concept of **State Attributes** which is supported on any HTML element which is part of a component's template (and has an `is="reactive..."` attribute) attribute, and also on custom elements defined using Sprout. <br>
A state attribute is an attribute specified on an element as part of a component's **template** (the "prototype" - unrendered form of a component) - the values of a state attribute always start with a Dollar sign ($) (and this is what will make Sprout treat it as a State Attribute). State attributes are **bound** to **State Properties**, the string value after the dollar sign should be equal to an existing state property. This creates a **binding** between the value of that attribute - on the rendered component - and the value of a state property.
So, whenever the value of that **state property** changes --- the value of the bound State Attribute will also automatically change to reflect the change (it will "react to the state change").
You can use any attribute that you can normally use on an element as a State Attribute - simply by specifing a state property prefixed with a dollar sign as its value. This includes, for example,  attributes such as `hidden` - giving a state property that has a boolean value will enable you to easily control the visibility of an element, via the component state. (Sprout knows how to treat "boolean attributes" corretly, for example, with `hidden` - a truthy value will set `hidden=""`, and a falsy value will remove the `hidden` attribute from the element (but the association/binding will **still remain**, changing the state value back to `true` will bring back `hidden=""` to the element. 

**NOTE**: the values of State Attributes should **never** be written to directly. Their goal is to be completely controlled by manipulating the state objects.

## State objects
### Local State
Every Sprout component has a `state` property - representing its **local state**. The local state should only represent state related to that component. Anything that is related to a state that is shared between several components, or a "global app state" - should be moved to the "Global State" object.

To initialize a local state object, you can define an object under the `state` property in the Runtime Object of a component.

### Global State
The global state is an object representing the "app state". Any "state" value that is not specific to a single component, or is shared between several components should be used in the global state.

To initialize a global state object, call the `this.setGlobalState` function within the global runtime of your app, passing it an object representing the initial state of your app. Note, the `this` in the Global Runtime context is equal to the "App Scope".

### State Object structure and features
A state object is a JS object, with some extra features related to how Sprout handles state changes and reactivity.

#### Primitive State values
You can directly set state properties to primitive values, such as strings, numbers and booleans (e.g. `filter: "All"`).

#### Stateful Arrays
If the value of a state property is an array of objects, each of these objects will also automatically become a "state object" - these kind of arrays are called "Stateful Arrays" and are usually used along with the `_map` command to "map" an array of "state objects" into a series of rendered custom elements (usually the elements within a list element). In this case, the initial local state of each of these components will be initialized to the values of the equavilent object in the array. Manipulating one of these local states directly - will affect the specific rendered component, manipulating **the objects within the array, by changing the array values of the state property in the state object** - will lead new eqauvilent renderings and DOM manipulations to the rendered components list (removing elements, adding new ones, and so on...).

#### Objects
To be decided / tested...

#### Getter functions
You can use getter functions in a state object, like you would normally use with any object (e.g. `get tasksCount() { return this.tasks.length; });`)
Using `this` inside a getter function will reference the actual live state object itself. This will also create a "dependency" between the getter property and the other state value it accesses. **Sprout knows to analyze these dependencies**, and remember the binding between them - so, for example if the value of the `tasks` state property is changed - Sprout will know to call the `getter` function again in all the appropriate places.

Note that the dependency check goes "one level deep" - so, even if, like in the example above, which accesses `this.tasks.length` - whenever `tasks` is changed or manipulated - the getter will be recalled - **even if the length property itself won't change**.

Also note, that as part of this "dependency analysis" - Sprout will call state getter functions as part of the initialization process. This will add a little bit of an overhead to the initialization.

Because of these aspects, it is recommended to use "State Setter Hooks" (SSH) - which allow for finer control over state dependencies.

#### State Setter Hooks
This is a Sprout feature supported in State Objects used by Sprout.

To define an SSH, start the name of the property with `set_`, the rest of the name will be the actual state property name. The value of an SSH is an array, the array can contain up to 4 items, where the first one is mandatory, and the rest are optional. 
Here is an explanation about each of these items, in order:

* "Setter Function": the first item of the array should be a function - note this is **not** a "setter function" as you might normally know from Javascript objects (e.g. `set something(value) {}`). The function should return a value. The value returned by the function - is the value that will be set into the state property value. You can access the state object in the function by using the `this` context. <br>
**NOTE** it is **important** to define the function using the `function` keyword - DO NOT use "arrow function" syntax, as the state object is passed/bound by sprout explicitely to these functions, to make it available via `this` (and using arrow functions will prevent it, since they always inherit the scope they are within).

* Dependencies Array: the second item is an optional array of "dependencies". The array's items are strings representing named state properties - whenever the value of any of those state properties changes - the setter function is called again. It is the **developer**'s responsibility to define the right dependencies, Sprout will not try to auto detect them when using SSHs - this also leads to better performance as the number of times they are called is reduced.

* "Run on initialization" boolean: the third item is an optional boolean - if set to `true`, the SSH function will also run on the first initialiazation of the state object. At any case it will run when any of its dependencies change.

* "Default value", you can use the fourth item to specify a default value, this is usually not neccesarily - as using the third item with `true` will run the setter function and initialize the value, but if you want, for example, to put a primitive default value, you can put `false` as the third item, and that default primitive as the fourth.

**It is almost always more recommended to use an SSH than a getter function** unless you know the getter will be called rarely.

Here is an example of an SSH defined on a State object:
```javascript
    set_tasksFiltered: [function() {
        return this.tasks.filter(FILTER_MAP[this.filter]);
    }, ["tasks", "filter"], true]
```

In this example `FILTER_MAP` can be an object with "filter functions", mapped to names, where the state `filter` property is a string representing the currently selected name, and `tasks` is an array of "tasks" objects in a "Todo List" app.


#### Special state values on State Attributes
When you specify values on State Attributes, there some special "operators" you can use within the value:

##### Negation operator (`!`):
You can use the `!` char before a state property name (e.g. `$!isSomething`) - this will return a boolean `true` if `isSomething` resolved to a "falsy" value, or `true` if it's "truey"

##### Eqaulity operator (`is_`)
You can prefix a state property name with `is_` to check for "equality", comparing one state value to another, the two state property names should be separated by a colon (`:`) character, so `$is_currentFilterName:Active` will return true if the state value of `currentFilterName` is equal (===) to the string `"Active"`. For now only strings are supported for the equality check value, but it might be extended in the future.
Using this syntax is a "shortcut" in a way - "syntactic sugar" - as it will actually define a new getter function on the state object, called e.g. `is_currentFilterNameActive` - that returns the equality condition result.
It will also auto define the dependency between `currentFilterName` and `is_currentFilterName` - so it saves the overhead you get if you define the getter function yourself.
For more complex state eqaulity check - you can still define getter functions or define SSHs directly on the state object.

### Reading from state
#### `getState(stateProperty, [getStateObject: boolean])`
Each rendered component has a `getState` function that you can use to get the value of a certain state property, you should use it when retrieving the value of a state property. 
The function will first try to retreive a state value from the local state, and if it can't find any, it will try to retreive it from a similar state property name on the global state object, if it can't find it - it will return `undefined`.
Sometimes you want to also have access to the actual state object that the property was found on, for this case `getState` has another variation - where the second argument is passed as `true` - it will instruct the function to return **both** the state value and the state object it is associated with.
For example, first variation - just get the value of the state property `filter`:

```javascript
const filter = host.getState('filter');
```

Second variation, retrieve both the state property value and the state object it is attached to:
```javascript
const [filter, theState] = host.getState('filter', true);
```

**Note** Only components themselves have "state", or rather actually the "host" of the Shadow DOM of a custom element defined from a component definition. "Native HTML elements" won't have "state" on their own (their "state" is the state of their host).
Since you will mostly access state from event handlers - the host is passed as a second argument to Sprout's Event Handler Definition functions, accessing its state is then just a matter of accessing `host.getState` or `host.state`.

#### Reading State directly
If you know that a property exists on a local state, you can access it directly from `host.state[propertyName]` (or `host.state.propertyName`).
#### Accessing global state from local state
Whenever you have access to a local state, you can also access the global state by accessing the `_global` property which directly references the global state object.
**Note** that if you are inside a local state SSH or getter, you can access the global state by accessing `this._global` --- ** This will also create a dependency/binding between the accessed global state property and the local state property function it was accessed from. In other words: if a local state getter or SSH accesses a global state property - whenever that global state property value will change - the getter function or the SSH function will be called again.

### Writing to state
You can directly manipulate state values by assigning to `host.state`, or `host.state_global`. In event handlers you also get the global state as the third argument, so you can simply access it (e.g. `global.stateProp = something`).
You can directly manipulate Stateful Arrays in state objects.

## Commands
Another important core feature in Sprout are "Commands", commands can be declared on elements by defining an attribute with their names. All command names start with an underscore (`_`) character. Commands usually creates effects that affects how the UI is rendered. The values of commands are usually related to State Objects, sometimes they are directly state property names.
These are the commands currently supported:

### `_text`
Pass the name of a state property to the `_text` command (**without** a dollar sign prefix). The text content of that element will be bound to that state property, so whenever that state property will be changed to a different string, the text content will automatically change to reflect it.

### `_bind`
`_bind` can be used for "reversed binding". It binds "normal" attribute values (not State Attributes) into the value of state properties. <br>
The syntax of the value is `<attribute-name>:<state-property-name>` - the name of a normal attribute followed by a colon character and then the name of a state property name.
** Be careful when using this command. You shouldn't specifiy a State Attribute as the attribute name, this could lead to "infinite loops".

### `_map`
`_map` maps an array of state objects to rendered components.
The syntax of the value is `"<state property name>:<custom element name>"`. <br>
The state property should contain an array of "state objects", and "custom element name" is the name of the custom element to render to.
You can set the `_map` command on the "parent element". The rendered elements mapped from the state objects array will be appended to that parent element.


# App development

You will usually develop your app in a "development environment". Sprout supplies a "builder" script - that will eventually consolidate all the app "parts" into a single "compiled  HTML" file. The next section will describe how this "compiled" file is structured - you will usually won't need to create that structure "manually", as mentioned, as you can use the automatic builder script to create it for you (along with minification, bundling and so on).

## Compiled HTML

Note, most of the things described here, are **automatically generated** when you call the "Sprout Build App" script on your app in a development environment. They are explained and detailed, for clarity.

## App Scope
Sprout maintains everything related to your app, including its own runtime script in a separate "scope", this also allows you to run several different "apps" in the same page.
Tags related to your app that sits within the `<head>` part of the "compiled" HTML file supports the `app` attribute, where you can specifiy a name for your app. Tags having the same value for the `app` attribute, are all "part of the same app".

## Global Elements
Global elements can include a `<style>` element containing the global style declrations of your app, and a `<script>` tag containing the global runtime code of your app - where the logic is returned from a "self invoking function".
These should have an `app` attribute set to the name of your app.

## `<template>` elements
The `<head>` part of the html should include a `<template>` element for each reusable component in your app, each template can encompass the style declarations for it (in a child `<style>` element), the HTML UI "prototype" description (including "unresolved" State Attributes, and Command Attributes) directly inside the `<template>` and a `<script>` tag containg the logic for that component, also saved to a variable named `<componentName (camel-cased)>Runtime` (e.g. todoItemRuntime) returned from a self invoking function.

Other than the `app` attribute - `<template>` tags describing components, **must** also include a `for` attribute, where the value describes a "name" for the component that the template describes.

## Sprout runtime script
The `<head>` should include a script tag that loads the `sprout-core.js` library.
This script exposes the global function `SproutInitApp` - that function can receive an "app name", calling it, runs and initializes all the neccesary parts of your app (it takes into account the values of the `app` attribute in the relevant tags), and it returns a "Build Function" - which you can save into a variable, e.g.: `const build_todo_listApp = SproutInitApp("todo_list");`

## Custom Elements
One of the things the SproutInitApp does, is taking into account the `<template>` definitions and their content, and defining new "custom elements" (named after the value put into the `for` attribute), which you can use in the HTML's `<body>` and can support State Attributes, Command Attributes and other features Sprout makes available.

## Native HTML elements as "Reactive elements"
Another thing loading the runtime does is extending all native HTML element classes with Sprout's "Reactive Element" class, allowing you to give the power of state and reactivity even to native HTML elements (besides custom elements which represents your components) - to make a native element "reactive", you use the Web Components' `is` attribute, giving it the value `"reactive-[tag-name]` according to which tag you use. For example, for a `<div>` element you would use `is="reactive-div"`, for a `<span>`: `is="reactive-span"`, for a `<ul>`: `is="reactive-ul"`, for an `<input>`: `is="reactive-input` and so on.
Using this attribute will allow you to use State Attributes and Commands on that element.
You should also do the same for native HTML elements that are part of the template of your components and needs to make use of one or more of Sprout's features (State Attributes, Command Attributes...).

## Build
Once you call the build function - your app becomes "live" on the page.

## App body
the `<body>` part of the "compiled" HTML should contain the main "skeleton" of your app, this is the place where you can use the custom elements defined from the initializations in the `<head>` part. Using Command Attributes and State Attributes - Sprout will also know to render additional expected DOM elements. Custom Elements will render their content with Shadow DOM, and their logic will be handled by Sprout's runtime.

This was a general description of the "compiled state" of an app. The next section will discuss the development environment of a Sprout App, and will also describe in greater details the main features mentioned above, such as "State Attributes", and "Command Attributes".

# Development

## Folder structure of an app

## Sprout Concepts
### UI
#### Reactive Element
##### State Attributes
###### State
####### Global State and Local State

##### Command Attributes

## Lifecycle of a component

# Architecture




