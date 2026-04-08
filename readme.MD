# Introduction and Agenda
Sprout is a native-first, DOM-first, minimal DSL client-side JavaScript framework that introduces state management and reactivity to native HTML by leaning on web standards: customized built‑in elements, `<template>`, Web Components, and Shadow DOM. It reduces common framework overhead (e.g., virtual DOM and heavy userland logic) by doing more in the browser.
The runtime gives control back to the browser’s native parser while keeping extra scripting lean — improving load time and performance.

Components in Sprout are custom elements with their own state.
A component can contain both normal static HTML and reactive HTML — where attributes and child elements bind to state properties — allowing full control via state management.

Reactive elements also support “commands” — hook functions that run in the `connectedCallback` lifecycle of reactive elements, allowing initialization and effects that run before other tasks.

State and events are managed in the custom element scope.
Under the hood, each component’s State Manager has a scoped Node Manager that maps attribute and element nodes to state properties.
State changes translate into DOM changes which are batched efficiently and synced with the browser’s rendering pipeline, enabling efficient rendering of pending DOM changes.

Read on for the full documentation, or:
- Explore live demos in the Demos section.
- Quick start: run `npx create-sprout-app` and follow the prompts.
- Prefer low-level details? Jump to the design and architecture sections.

## Quick Start
- Run: `npx create-sprout-app@latest` and follow the prompts.
- Change into the created directory, run `npm install`, and then start the dev server with `npm run dev`
- Explore the generated app and components.

# Reactive HTML

## `is="reactive-..."`
To make an HTML element reactive and enable Sprout features, add the `is` attribute with the value `reactive-[element-name]` — replace `[element-name]` with the tag name (e.g., `is="reactive-div"`, `is="reactive-span"`).

Note: HTML elements that do not have their own element interface in the spec are not supported (customized built‑in elements must extend a specific HTMLElement subclass).
These include: `<article>`, `<aside>`, `<main>`, `<nav>`, `<section>`, `<header>`, `<footer>`, `<hgroup>`, `<figure>`, `<figcaption>`.

## Reactive Attributes
Sprout introduces “reactive HTML attributes” (also called *State Attributes* or *State Nodes*).
Unlike static attributes, reactive attributes expect a string value which is the name of a property in a state object. This creates a binding between that state value and the value of the attribute.
Changing the state value reactively updates the attribute's value, enabling a single source of truth for DOM control.

### Colon (:) syntax
To make an attribute reactive, add an attribute of the same name prefixed with a colon and set its value to a state property. This binds that state property to the attribute.
Example: `:hidden="isHidden"` makes `isHidden` control the `hidden` attribute.

> (Sprout recognizes boolean attributes: if `isHidden` is `true`, `hidden` is present; if `false`, it’s removed. Setting `true` again re-adds it.)

The colon syntax still allows defining the same static attribute. This is useful for default values while the element is still “dehydrated”, supporting effective server‑side rendering.

> *Hydration* vs. *Dehydration*: a “dehydrated” element is in its preliminary native state, before Sprout’s reactive runtime becomes effective (usually also before events and JavaScript are bound).

### Example
```html
<div 
  is="reactive-div" 
  class="todo-item" 
  :completed="completed" 
  :editing="editMode"
  title="Default Todo Title"
  :title="title">
</div>
```
- `is="reactive-div"` turns on reactive capabilities.
- `:completed` and `:editing` are boolean state attributes. When hydrated, if `completed` is `true`, a `completed` attribute is added; likewise for `editing` based on `editMode`.
- `:title` binds the `title` state value to the `title` attribute. The static `title` provides a default before hydration.

### State value operators ("State Expressions")
These are operators that can be added to state values, they act as "syntactic sugar" - a shortcut for creating 
certain state getters - when you use them - the engine will actually create approppriate getter functions.

#### `!` (Negation)
Put an exclamation mark (`!`) before a value - to check for `NOT [value]`.
Example: `<div is="reactive-div" :viewMode="!editMode">`

This creates this getter on the state object:
```javascript
get ["!editMode"]() { return !this.editMode; }
```

 * literal: straight state prop,.
 * negation: !something (not something)
 * equality: is_something:equalityValue
 * ternary: somethingIsTruthy?returnThis:[elseThis]

#### `is_value:equalToThis` (Equality)
Returns `true` if `value` === `equalToThis`, `false` if `value` !== `equalToThis`.
Example: `<div is="reactive-div" :fullMode="is_mode:full">`
This creates this getter on the state object:
```javascript
get ["is_mode:full"]() { return this.mode === "full" }
```

#### value?returnThis:elseThis (Ternary)
If `value` is truthy, return `returnThis`, if falsy - return `elseThis`.
The `elseThis` part is **optional**: `value?returnThis` is also legable -
if `falsy` - it will return `undefined`.

Example: `<div is="reactive-div" :switchState="switch?on:off">`
This creates this getter on the state object:
```javascript
get ["switch?on:off"]() { return this.switch ? "on" : "off" }
```

### `ref`
`ref` assigns an identifier to an element. The ref name is used in event handlers and with the built‑in `findElement` function to retrieve that element quickly. Use unique ref names.

### Special Case Attributes
#### `checked`, `disabled`, `selected`, `value`
For some form-related attributes, the attribute does not reflect live state; the corresponding property does. For example, for checkboxes, the `checked` property is the source of truth while the `checked` attribute represents the initial default.
Sprout mirrors attribute ↔ property for these cases so they can be used safely as state attributes: changing the attribute updates the property and vice versa (e.g., listening to `change` on inputs updates the attribute).

### Prop Attributes
Prop attributes are attributes on reactive HTML elements that can reference the value of an attribute on the containing parent custom element. This enables component *customization* in a declarative way.

To definee a prop attribute, prefix its value with an at‑sign (`@`).
Example:
```html
<!-- Inside a component template -->
<li is="reactive-li" class="@item-class">
  <span is="reactive-span" _text="title"></span>
</li>
<!-- Using the component -->
<todo-item item-class="todo--highlighted"></todo-item>
```

> NOTE: Prop Attributes are **static**. They are NOT reactive. They are aone-time rendering customization mechanism.
Essentially, declaring a Prop attribute `<div ref="elem" is="reactive-div" prop="@parentAttr">`

is a declarative HTML syntactic sugar over:
```javascript
elem.setAttribute("prop", elem.getHost().getAttribute('parentAttr');
```

## Commands (Sprout Component Commands - SCC)
Commands are functional attributes associated with functions that run during element initialization. Internally, they run sequentially and synchronously during `connectedCallback`.
They are a kind of declarative "hooks", tapping into the component's lifecycle.

To trigger a command, define an attribute with its name prefixed by an underscore (`_`). Sprout ships with several built‑in commands and also supports app‑scope custom commands. Commands run synchronously before paint, so keep them lightweight and defer heavy work.

The value of a command attribute is passed as an argument to the command function. As a convention, use a colon (`:`) as a separator for multiple arguments and split in your function (e.g., used by `_map`).

The `this` context inside a command function is the DOM element the command attribute is defined on.

### onAfterPaint
Reactive Elements exposes a utility function `onAfterPaint` that accepts a callback function and schedules it to run AFTER current paint executes, and just before the next one does.
It is syntactic sugar over:
```javascript
onAfterPaint(callback) {
    requestAnimationFrame(()=>
        requestAnimationFrame(callback)
    );
}
```

### Built‑in Commands
#### `_map`
```html
<ul is="reactive-ul" class="todo-list" _map="todos:todo-item"></ul>
```

Might render to:
```html
<ul is="reactive-ul" class="todo-list" _map="todos:todo-item">
  <li><todo-item><!-- Shadow DOM --></todo-item></li>
  <li><todo-item><!-- Shadow DOM --></todo-item></li>
  ...
  
</ul>
```

The `_map` command maps the objects in the array assigned to the `todos` state property to `<todo-item>` custom elements. Each array item (an object) becomes the state object for the `<todo-item>` instance.

Best practice: use a State Set Hook (SSH) returning an array for the state map and set `stateMap: true` on the SSH options to enable caching and memoization.

#### `_text`
```html
<span is="reactive-span" _text="todo-title"></span>
```

Might render as:
```html
<span is="reactive-span" _text="todo-title">The value of todo-title here</span>
```

The `_text` command reactively controls text content by binding it to a state property.

#### `_bind`
Bind can be used for reverse binding. Specify the name of an attribute; when the attribute value changes, the state value will update to match.

Note: this is generally an anti‑pattern and should rarely be necessary — it goes against the framework paradigm. However, in edge cases (e.g., a third‑party component mutates attributes), `_bind` can hand control back to the state manager.

Never use both `_bind` and a state attribute for the same attribute name — this will cause an infinite loop.

#### `_bindprop`
Define “state properties” for direct element properties (similar to state attributes but for properties). Specify a state property as the value — when that state value changes, the element’s property with the same name updates accordingly.

### Custom Commands
You can define your own custom commands and use them on your components, or on reactive HTML elements.

#### Commands object
To define custom commands you define an object where the keys are command names, and the values are the command functions. Each function is passed the command attribute value as an argument, and has its `this` context as the DOM element the command is defined on.

#### Global (App Scope) Commands
To define App scope commands, pass a Commands object to `this.setCommands`.
These commands will become available to any reactive element (including custom elements) in your app.

#### Local (component scope) Commands
To define component level commands, define your commands object on your component runtime object, under the `commands` property. These commands 
## State
State is an object containing properties and values that act as sources of truth for state attributes. State is reactive — changing a value updates bound nodes.

### Local State vs. Global State
Each custom element initializes with its own local state object (accessible via the `.state` property).
There is also a global state object at the app level, exposed as the third argument of event handlers.
Use `getState` to access state properties: it searches local state first, then ancestor component states, and finally global state.

## Public Methods
Each reactive element instance exposes some public methods.

### `getState(stateProp, returnStateObject=false)`
Gets a value from state. It searches the local state first, then ancestor custom elements, and finally the global state. If `returnStateObject` is `true`, returns `[value, stateObject]`; otherwise returns the value (or `undefined` if not found).

### `findElement(refName)`
Finds an element in the component by its `ref` attribute. Faster than `querySelector` because child elements are cached on the host.

# Components
Components are a scoped collection of three layers: the visual UI (HTML), visual style (CSS), and logic (JavaScript).
In development you can either have three separate files inside a folder named after the component — `template.html`, `style.css`, and `runtime.js` — or a single component file `[component-name].html` containing three blocks:
`<html> /* Template HTML */ </html>`
`<style> /* Component styling CSS */ </style>`
`<script> /* Component JS script */ </script>`

In the transpiled app, those three parts sit under a `<template>` element which defines a new custom element implementing Sprout’s runtime.

## Template HTML
The HTML template can contain both static HTML elements and reactive HTML elements.

## Style CSS
Normal CSS, scoped to the component.

## Runtime

Contains all the component’s logic. 

### Runtime Object
This should include a "Runtime Object" containing settings and logic for your component.

When on a Single File Component, simply `return` this object under the `<script>` part. If you're on a Multi File Component, your `runtime.js` file should `export default` the object.

The Runtime Object can contain:

#### `commands`
Any custom component-level commands.

#### `events`
Contains event handling functions. Keys correspond to the `ref` of an element in the component. Values are either a function (used as a `click` handler) or an object mapping event names to handler functions.

Each handler receives three arguments:
- `event`: The native Events API `event` object.
- `host`: The custom element instance.
- `global`: The app’s global state object.

#### `state`
Describes state properties and their initial values. Values are reactive — changing any value triggers reactions which resolve as DOM changes.

#### Local State
Lives at the component level and is available to the custom element and its children. Access via `host.state` or `getState`.

#### Global State
Global state lives in your app’s scope. As a rule of thumb, anything needed across components belongs to global state. Commonly accessed from event handlers via the third argument. For debugging, if `allowappscopeaccess` in the global app config is `true`, global state is also exposed via `globalThis.sproutApps.[app_name_with_underscores].getGlobalState()`.

#### Lifecycle
You can hook into a component's lifecycle event, by attaching a handler in the runtime object.

The lifecycle of a custom element is:
1. Constructor: save JS runtime, styling, and HTML template.
2. Render the HTML template into Shadow DOM.
3. Activate the State Manager (reacts to state changes and triggers DOM changes).
4. Bind the event handler on the host. Child events bubble to the host and are delegated to the appropriate handler — providing a single place for event handling per component.

The lifecycle of a reactive HTML element (a custom element class extends the reactive element class):
1. Wait until the host custom element becomes active and stateful.
2. Bind state attributes to state properties.
3. Run commands.

##### Lifecycle handlers
Hook into lifecycle parts of a custom element, by an event handler function on the runtime object for any of these:

- `init`: end of the constructor
- `mount`: beginning of `connectedCallback`
- `stateful`: after state becomes active and the component is reactive
- `active`: after state is active, commands have run, and events are bound
- `unmount`: when the component disconnects from the document (`disconnectedCallback`)

# Under the hood
## `ReactiveElement`
Base class for Sprout’s runtime. When you use `is="reactive-..."` on an element, this logic is applied.
Responsibilities:
- State binding: bind state attributes to state objects
- Prop binding: bind prop attributes to custom element attributes
- Commands: run all commands

## `ReactiveCustomElement`
Used for custom element components. Extends `ReactiveElement`, inheriting its capabilities, and adds:
- Rendering: attach HTML into Shadow DOM
- Event binding/handling: a single handler routes bubbled events from children to handlers
- State management: each custom element creates a `StateManager` instance that drives reactivity, binds DOM nodes to state, maps state changes to DOM changes, and queues paint

# Conditional rendering using reactive slots
The <slot> element is part of the Custom Elements API; 
It lets you replace DOM content inside shadow DOM (the content of a <slot> element),
with content assigned by having a light DOM element as an inner part of a custom Sprout element 
parent.
If you specify a `name` attribute on the inner `<slot>`, you can assign an outer light DOM to it, by giving it a `slot` attribute equal to an inner `name` attribute on a `<slot>`.

Both an inner `<slot>` element, and an outer assigned light DOM element can be set as reactive;
This allows for two types of conditional-rendering:

## Controlled Slot (inside-out)

(Inside a Sprout custom element template:)
`<slot is="reactive-slot" :name="controlled-slot"></slot>`

With this pattern, the slot is reactive, its `name` attribute is bound to state;
Outside, at the light DOM level, you can have several static "slottables", each having a different value for `slot`:

```javascript
<ce-parent>
  <div slot="slottable1">Slottable1 content</div>
  <div slot="slottable2">Slottable2 content</div>
  <div slot="slottable3">Slottable3 content</div>
</ce-parent>
```

Changing the value of `controlled-slot` state property to one of the slottable names, will assign it to the slot.

## Projected Slot (outside-in)
With this pattern, the `<slot>` is projected to an outside light DOM assigned slottable. 
Atypicially to the DOM api, this actually creates a "same reference" binding - the actual assigned element, appears in both places. Making the slottable reactive allows controlling it via state (light DOM elements inside Sprout custom elements - **can** be reactive, and bound to its state);

(Inside a Sprout custom element template:)
`<slot name="projected-slot"></slot>`

(Outside:)
```
<ce-parent>
  <div is="reactive-div" slot="projected-slot" :hidden="hideProperty" :textContent="controlledText"></div>
</ce-parent>
```

# Built-in Components
Sprout includes built‑in custom elements (extensions of `ReactiveElement`, so they are reactive without `is`):

## `<conditional-render>`
Render different content based on a state value.
### `_condition`
Command specific to this component. Set it to the name of a state property used for the conditional render.
### Child Elements
Rendered conditionally.
#### `_if`
Command attribute on child elements to set a conditional expression.

`_if` syntax is `[operator][value]`. During evaluation, Sprout computes `[stateValue][operator][value]`, where `stateValue` is from `_condition`.
For example, with `_condition="counter"`, `_if=">67"` evaluates as `state[counter] > 67`.

##### Possible Operators
Available operators are:
* `==` Equality
* `===` Strict equality (equal and same data type)
* `!=` Not equal
* `!==` Strict not equal (not equal and not the same data type)
* `<` Less than
* `<=` Less than or equal
* `>` Larger than
* `>=` Larger than or equal


# App Structure
## `appScope`
Sprout’s bootstrap (`SproutInitApp`, on the global context) creates an execution scope (`appScope`) per app. All runtime modules attach to this scope, which is passed to runtime classes. The scope has access to `globalThis` and `document`.

## Components
In development, a Sprout app has a `components` folder containing components.

## Root files
At your app root you may have:
- `index.css`: global styles
- `index.html`: root HTML template
- `head.html`: markup injected into `<head>`
- `index.js`: root app logic. Here, `this` is the `appScope`, which exposes methods like `setCommands` and `setGlobalState`.

### Custom Commands
Define new commands available to your components:
```javascript
const commands = {
  someCommand() {
    // ...
  },
  anotherCommand() {
    // ...
  }
}
this.setCommands(commands)
```

### Global State
Set global state by passing a state object to `this.setGlobalState`:
```javascript
const initState = {
  someState: "yes",
  anotherState: [],
}
this.setGlobalState(initState)
```

## App scope
The app scope contains the entire runtime scope of your app. Multiple apps can live on the same page.

## Transpiled app
The builder creates a transpiled version of your app. Its main HTML includes:
- Including the `sprout-core` script
- Detecting support for customized built‑in elements and injecting a polyfill if needed
- Including the app’s non‑Declarative Shadow DOM component templates in the head
- Calling `SproutInitApp(appName)` to bootstrap Sprout, which returns a Build function
- Running the Build function

### `SproutInitApp` — bootstrapping
Initializes runtime variables (including `appScope`), checks configuration, and defines `setGlobalState` and `setCommands` on `appScope`.
Registers customized built‑in elements based on `ReactiveElement` and defines the `<conditional-render>` element.
Finally, returns the Build function.

### Build Function
Takes your component template definitions and defines a custom element implementing `ReactiveCustomElement` for each. Also defines global CSS, then calls your app runtime (`index.js`).

# Cougar — State Orchestrator
Cougar is Sprout’s robust State Manager. It exposes a `StateManager` class. When you create a new instance by passing an object, that instance becomes a fully reactive state object — changes to any value (including arrays and nested objects) produce effects, typically pushing “node actions” to a component (an abstract map that resolves to DOM mutations).

Cougar batches dirty properties intelligently, tracks dependencies (a state value that, when changed, affects another), and uses a sophisticated architecture of JavaScript Proxies, getters, and setters to implement reactivity efficiently.

## State
State is what Cougar exposes: a reactive object with properties and values.
State in Cougar has advanced features, nuances, and caveats to know about.

### Primitives
Strings, numbers, and booleans can be assigned directly to state properties. Each change propagates to bound attributes.

### Arrays
Arrays in State are **usually** stateful; if another state function accesses an item from an array - it will be bound as a dependency. Changes on a State Map array will trigger reconcilation.
In some situation a plain, non-stateful Array will be returned (by design). Here is a clear summary of when an array on state is stateful and when it is plain:
- Arrays defined directly as values on State - are stateful.
- Getter functions returning an array - that array will be **plain** (non-stateful).
- Arrays returned from an SSH - be default are **non-stateful** - to make an array returned from an SSH stateful, provide either the option `stateful: true` or `stateMap: true` (the stateMap option explicitely sets the array as a state map array, providing specific optimizations for this scenario).
- Derived arrays, e.g. from methods just as `.filter` are **not** stateful.

Essentially if you need a "computed" array to be stateful, return it from an SSH with `stateMap: true` (if it's intended for `_map`), or `stateful: true`.
#### .length
The array's .length property can be considered its own dependency, e.g. if another function only references the array's length - then only when an array's length is changed - the function will be triggered (i.e., changing an existing item will not trigger it.)
#### Array methods
Sprout implements caching mechanisms for array mutation methods and array derivation (e.g. `filter`) - Make sure your callbacks for these methods are **pure functions** (self-scoped functions that don't rely on any external variables). If you need to derive an array in a non-pure way, return a newly created array.

### Objects
Objects are stateful and reactive at the scope of an object. Changing a property or a nested property marks the object dirty and the update propagates to bound attributes. You can change multiple properties before the updated object propagates. 
To bind object values on a State, use a getter that references them - that object will be saved as a dependency for the getter.

> NOTE: The entire object is saved as a dependency, this means that even if you change the value of a property not referenced in a getter that references 
the object - the getter WILL run again (however, in this case it will detect that bound values were not changed and will NOT trigger a re-render).

## Getters
Cougar auto‑detects and saves the state properties accessed in a getter as dependencies for that value. This happens once at initialization. If you include branching (`if` statements) in getters, the dependency list might not reflect dynamic access patterns; consider reevaluating dependencies when needed (see options in SSH below).

## State Set Hooks (SSH)
An SSH is a function that runs when a state property is accessed and computes its value. SSH values are memoized and recomputed when dependencies change. Use the `function` keyword so the state object can be bound as `this`.

### Options object
Available options on an SSH definition:
- `init` (default: `false`): compute the value at initialization (not only on first access).
- `deps` (default: `"auto"`): override automatic dependency detection by providing an array of property names.
- `reevaluate` (default: `false`): reevaluate dependencies on each run (useful for branching); slight overhead.
- `once` (default: `false`): run once and save the returned value as the property; subsequent accesses do not run the SSH.
- `statify` (default: `false`): make the computed result stateful/reactive; useful when you need to manually mutate it later.
- `stateMap` (default: `false`): mark the result array as a State Map to enable extra optimizations and caching (also implies `statify: true`).

# Demos
The `demos` folder contains several demo apps showcasing Sprout:
## Todo List MVC
An implementation of a Todo List according to [TodoMVC](https://todomvc.com) specs.
## Todo List
An implementation of the Todo List from [MDN’s tutorial for React](https://mdn.github.io/todo-react/).
## Tic‑Tac‑Toe
An implementation of the [Tic‑Tac‑Toe app from React’s tutorial](https://react.dev/learn/tutorial-tic-tac-toe)

# Tools
## create-sprout-app
A CLI for bootstrapping a Sprout app. It can create an empty scaffold or a “default demo app”.
To use, run:
`npx create-sprout-app`
and follow the instructions.

The tool installs required modules (including Vite) and defines `npm` commands to build Sprout and serve your app locally with hot reloading.

## sprout-build-app
A transpiler tool. It takes an app `src` folder and outputs a single, ready‑to‑go `.html` file that includes:
- Preloading Sprout’s core JavaScript
- Checking for Web Components and customized built‑in elements; injecting a polyfill if needed
- Injecting global app CSS
- Injecting complete template tags for all non‑Declarative Shadow DOM components
- Injecting the app’s global runtime script
- Injecting Sprout’s core runtime and calling `SproutInitApp` (binding templates to Sprout reactive components)

### Running
Run: `node ./sprout-build-app.mjs <src_directory> <build_directory>`

#### Options
- `--minify`: output minified JS, CSS, and HTML
- `--strict` (Strict Mode): use the strict version of Sprout Core (removes developer validation blocks). Strict mode should only be used in production when you’re absolutely confident in correct usage; many invalid situations will not be reported and will fail silently. Do not use Strict mode during development or debugging.

Note: `create-sprout-app` scaffolds `npm` commands to build different versions of Sprout and to serve them via a local dev server with hot reloading.

