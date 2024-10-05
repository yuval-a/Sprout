# Introduction
Sprout is a client-side Javascript framework that introduces **state** management and **reactivity** into native HTML elements, 
by using the native [Web Components API](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), extending the [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) class, adding additional capabilities to it, allowing you to define "[custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)" that reacts to state changes, using native browser features such as the [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) element, while also adding these capabilities to exisiting native HTML elements.

Watch some [live demos](#demos), or read on for more information.

# Quick Usage Highlights

## State Attributes
```html
<div 
    is="reactive-div" 
    ref="todo-item" 
    class="todo-item" 
    completed="$completed" 
    editing="$editMode"
    title="$title">
</div>
```

Might be rendered to:
```html
<div
    is="reactive-div" 
    ref="todo-item" 
    class="todo-item" 
    completed 
    title="The value of the title State property here">
</div>
```
`completed`, `editing`, and `title` attributes becomes **State Attributes** when their values start with a Dollar sign (`$`). Now they are **reactively bound** to the State properties: `completed`, `editing` and `title` respectively. Their values will always **automatically reflect** the values of those properties within an associated State object; changing the values in the State object - will automatically change the values in the attributes.
In this specific example, they are both boolean values, Sprout knows how to handle that accordingly, e.g. if `editing` is `true` it will simply appear on the element as `editing`, where if it's `false` it will not be included as an attribute on the element.
The `title` value in the example is a string, and will auto reflect the value of the State property `title`.
**Notice the usage of the `is="reactive-div"`** attribute. Specifying the attribute `is`, is what enables the **reactive behavior** on the element. 
The `is` attribute is part of the Web Components / Custom Elements API.

The `ref` attribute is a Sprout attribute that is used to create associations between elements and event handlers.

### Special operators in State Attributes
```html
<div is="reactive-div" hidden="$!editMode"></div>
```

If the result of the value of `hidden` resolves to `true` then the `div` element will be hidden.

the `!` operator is used as a **negation operator** ("not editMode"). The value will be `true` if `editMode` is falsy
and `false` if it's truthy. The hidden attribute is a native built-in attribute in HTML, but using a State value on it, also turns it to a
State attribute. This is an example for how you can easily **control the visibility of an element** via **State**.

## Command Attributes
These are attribute names starting with an underscore (`_`) character. Commands can be used to influence the UI according to State properties.

### `_map`

```html
<ul is="reactive-ul" class="todo-list" _map="todos:todo-item"></ul>
```

Might render to:
```html
<ul is="reactive-ul" class="todo-list" _map="todos:todo-item">
    <li><todo-item> <!-- Shadow DOM of the todo-item component instance here --> </todo-item></li>
    <li><todo-item> <!-- Shadow DOM of the todo-item component instance here --> </todo-item></li>
    ...
</ul>
```

The `_map` command will "map" the objects inside the array assigned to the State property `todos` to `<todo-item>`
custom element components. Each of the array items - an object - will be used as the State Object for the `<todo-item>` component.

### `_text`

```html
<span is="reactive-span" _text="todo-title"></span>
```

Might be rendered as:
```html
<span is="reactive-span" _text="todo-title">The value of toto-title property as the text content here</span>
```

The `_text` command controls the textual content of an element, associating it to a state property, reactively binding them.

Read on to learn further, or watch some [demos](#demos).

# Main Concepts
## ReactiveElement
At the heart of Sprout is the `ReactiveElement` class, this is a base class, extending the `HTMLElement` class, effectivily extending HTML Elements with the features Sprout supports.

"Building" an app with Sprout initially entails defining "Components", that eventually uses `<template>` elements, that encapsulates within them the three aspects of a component: the UI (HTML), the styling (its look - CSS), and the logic (Javascript). Sprout's core library passes this information to a new instance of a `ReactiveElement`, and then defines a new "Custom Element" based off of this. When you use that custom element in your HTML structure - it already supports Sprout's features. When working on an app in a **[development environment](#development-environment)** and using the [App Builder Script](#app-builder-script) - these `<template>` elements will be automatically generated for you (amongst other things the builder script does).

### Reactive Native HTML Elements, using the `is` attribute
Other than "custom elements" - Sprout also makes sure to extend ALL native HTML elements subclasses with the `ReactiveElement` class, this allows you to enable Sprout's features even for native HTML elements, you do this by using the [`is`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is) attribute on a native element - the value of the attribute should be in the form of: `reactive-[tag-name]` where `[tag-name]` is the name of the element's tag (lower-cased). So, for example: for a `<div>` element you would use `is="reactive-div"`, for a `<span>`: `is="reactive-span"`, for a `<ul>`: `is="reactive-ul"`, for an `<input>`: `is="reactive-input` and so on.

> **Note**: Safari browsers still doesn't support extending specific native HTML elements and the `is` attribute ("custom native elements"). This is auto detected by the framework and a polyfill script is automatically added in these cases, which enables full support for these features on browsers that don't natively support it.

You can use "native reactive HTML elements" within the templates of your components - and you will most likely do that when building your app - so whenever you use a Sprout feature on an element - **remember** to put an `is` attribute on it -- otherwise it will be treated as a "normal" HTML element, and using features like State Attributes or Commands - won't work.

HTML elements within a component are rendered into the ["Shadow DOM"](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) of a rendered custom element.

Note, since eventually you use custom elements, and the Web Components API, it is also possible to make use of ["Slots"](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots) in your templates - allowing for "loosely coupled" templates, where certain parts of it can be "plugged into" with different kinds of other elements.

## State Attributes
One of Sprout's core features is the concept of **State Attributes** which is supported on any HTML element which is part of a component's template (and has an `is="reactive..."` attribute), and also on custom elements ("components") defined using Sprout. <br>
A State Attribute is an attribute specified on an element as part of a component's **template** (which represents the "prototype" of a component - the  "unrendered" form of a component) - the values of a State Attribute is a string that always start with a Dollar sign (`$`) (and this is what will make Sprout treat it as a State Attribute). State attributes are **bound** to **State Properties** (See [State Objects](#state-objects) for more information), the string value after the dollar sign should be equal to an existing state property. This creates a **binding** between the value of that attribute - on the rendered component - and the value of a state property.
So, whenever the value of that **state property** changes --- the value of the bound State Attribute will also automatically change to reflect the change (it will "react to the state change").
You can use any attribute that you can normally use on an element as a State Attribute - simply by specifing a state property prefixed with a dollar sign as its value. This includes, for example, attributes such as `hidden` - giving a state property that returns a truthy or falsy value -  will enable you to easily control the visibility of an element, via the component state. (Sprout knows how to treat "boolean attributes" corretly, for example, with `hidden` - a truthy value will set `hidden=""`, and a falsy value will remove the `hidden` attribute from the element (but the association/binding will **still remain**, changing the state value back to `true` will bring back `hidden=""` to the element)). 

**NOTE**: the values of State Attributes should **never** be written to directly. Their goal is to be completely controlled by manipulating the state objects.

## State Objects
### Local State
Every Sprout component has a `state` property - representing its **local state**. The local state should only represent state related to that component. Anything that is related to a state that is shared between several components, or a "global app state" - should be moved to the ["Global State" object](#global-state).

To initialize a local state object, you can define an object under the `state` property in the [Runtime Object of a component](#runtimejs).

### Global State
The global state is an object representing the "app state". Any "state" value that is not specific to a single component, or is shared between several components should be used in the global state.

To initialize a global state object, call the `this.setGlobalState` function within the global runtime of your app, passing it an object representing the initial state of your app. Note, the `this` in the Global Runtime context is equal to the ["App Scope"](#app-scope).
(See an example in the "global runtime"[#indexjs] section).

### State Object structure and features
A state object is a JS object, with some extra features related to how Sprout handles state changes and reactivity.

#### Primitive State values
You can directly set state properties to primitive values, such as strings, numbers and booleans (e.g. `filter: "All"`).

#### Stateful Arrays
If the value of a state property is an array of objects, each of these objects will also automatically become a "state object" - these kind of arrays are called "Stateful Arrays" and are usually used along with the [`_map`](#_map) command to "map" an array of "State objects" into a series of rendered custom elements (usually the elements within a list element). In this case, the initial local state of each of these components will be initialized to the values of the equavilent object in the array. Manipulating one of these local states directly - will affect the specific rendered component, manipulating **the objects within the array**, by changing the array values of the state property in the state object - will lead to new equvilent renderings and DOM manipulations to the rendered components list (removing elements, adding new ones, and so on...).

#### Objects
To be decided / tested...

#### Getter functions
You can use getter functions in a state object, like you would normally use with any object (e.g. `get tasksCount() { return this.tasks.length; });`)
Using `this` inside a getter function will reference the actual live state object itself. This will also create a "dependency" between the getter property and the other state property value it accesses. **Sprout knows to analyze these dependencies**, and remember the bindings between them - so, for example if the value of the `tasks` state property is changed - Sprout will know to call the `getter` function again in all the appropriate places.

Note that the dependency check goes "one level deep" - so, even if, like in the example above, the function accesses `this.tasks.length` - whenever `tasks` is changed or manipulated - the getter will be recalled - **even if the length property itself won't change**.

Also note, that as part of this "dependency analysis" - Sprout will call state getter functions as part of the initialization process. 

Because of these aspects, it is recommended to use ["State Setter Hooks"](#state-setter-hooks) (SSHs) - which allow for finer control over state dependencies.

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
In the example you can see two "dependencies" defined: `tasks` (an array defined on the state object) and `filter` (a string defined on the state object) - whenever any of them changes - the SSH function will run, resulting in a new value for the `taskFiltered` state property (which contains an array of "tasks" objects filtered from the `tasks` array defined on the state object. The third `true` argument will make the SSH function run when the state first becomes "live".

#### `onStateChange` functions
You can also declare functions on the state object, named like `on_[stateProp]Change` - where `stateProp` is a state property name (e.g. `on_todosChange`) - each of these functions will be called when the equivalent state value will change. In the majority of cases you can handle state dependency by using SSHs (preferred) or getter functions - and you will mostly not need to define onStateChange functions. Using those functions can add a lot of extra clutter to your state object, and is generally discouraged.

#### A state object example:
Here is an example of the initial local state of a `todo-item` component, from the [Todo List App demo]:

```javascript
state: {
    isEditing: false,
    newName: ""
}
```

In here is an example of the global state of the Todo List App demo, showing the usage of more advanced features of it:
```javascript
const initState = {
    filter: "All",
    tasks: [
      { id: "todo-task-0", name: "Eat", completed: true, isEditing: false },
      { id: "todo-task-1", name: "Sleep", completed: false, isEditing: false },
      { id: "todo-task-2", name: "Repeat", completed: false, isEditing: false, },
    ],
    // DO NOT USE ARROW FUNCTION HERE, because state object needs to be passed as THIS!
    set_tasksFiltered: [function() {
        return this.tasks.filter(FILTER_MAP[this.filter]);
    }, ["tasks", "filter"], true],
  
    set_filterButtonStates: [function() {
      return FILTER_NAMES.map(name=> {
        return {
          name,
          // This value is used as a string value on bound attributes,
          // without casting to string, leaving as boolean, will cause
          // the attribute to be removed, if the value is false
          isOn: String(name === this.filter)
        }
      });
    }, ["filter"], true],

    get tasksCount() {
      return this.tasksFiltered.length;
    },

    get tasksNoun() {
      return this.tasksCount !== 1 ? "tasks" : "task";
    },


}
this.setGlobalState(initState);
```

#### Special state values on State Attributes
When you specify values on State Attributes, there are some special "operators" you can use within the value:

##### Negation operator (`!`):
You can use the `!` character before a state property name (e.g. `$!isSomething`) - this will return a boolean `true` if `isSomething` resolves to a "falsy" value, or `true` if it's "truthy"

##### Eqaulity operator (`is_`)
You can prefix a state property name with `is_` to check for "equality", comparing one state value to another, the two state property names should be separated by a colon (`:`) character, so `$is_currentFilterName:Active` will return true if the state value of `currentFilterName` is equal (`===`) to the string `"Active"`. For now only strings are supported for the equality check value, but it might be extended in the future.
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

**Note** Only components themselves have "state". "Native HTML elements" won't have "state" on their own (their "state" is the state of their host).
Since you will mostly access state from event handlers - the host is passed as a second argument to Sprout's [Event Handler Definition](#events) functions, accessing its state is then just a matter of accessing `host.getState` or `host.state`.

#### Reading State directly
If you know that a property exists on a local state, you can access it directly from `host.state[propertyName]` (or `host.state.propertyName`).

#### Accessing global state from local state
Whenever you have access to a local state, you can also access the global state by accessing the `_global` property which directly references the global state object.
**Note** that if you are inside a local state SSH or getter, you can access the global state by accessing `this._global` --- **This will also create a dependency/binding between the accessed global state property and the local state property function it was accessed from**; In other words: if a local state getter or SSH accesses a global state property - whenever that global state property value changes - the getter function or the SSH function will be called again.

### Writing to state
You can directly manipulate state values by assigning to `host.state`, or `host.state._global`. In event handlers you also get the global state as the third argument, so you can simply access it (e.g. `global.stateProp = something`).
You can directly manipulate Stateful Arrays in state objects, including using native JS Array functions on them.

## Commands
Another important core feature in Sprout are "**Commands**", commands can be declared on elements by defining an attribute with the name of a command. All command names start with an underscore (`_`) character. Commands usually creates effects that affects how the UI is rendered. The values of commands are usually related to State Objects, sometimes they are directly state property names.
These are the commands currently supported:

### `_text`
#### Expected value syntax: `<state property name>`
Pass the name of a state property to the `_text` command (**without** a dollar sign prefix). The text content of that element will be bound to that state property, so whenever that state property will be changed to a different string, the text content will automatically change to reflect it.

### `_bind`
#### Expected value syntax: `<attribute-name>:<state-property-name>`
`_bind` can be used for "reversed binding". It binds "normal" attribute values (not State Attributes) into the value of state properties. <br>
The syntax of the value is `<attribute-name>:<state-property-name>` - the name of a normal attribute followed by a colon character and then the name of a state property name.
** Be careful when using this command. You shouldn't specifiy a State Attribute as the attribute name, this could lead to "infinite loops".

### `_map`
#### Expected value syntax: `<state property name>:<custom element name>`.
`_map` maps an array of state objects to rendered components.
The syntax of the value is `<state property name>:<custom element name>`. <br>
The state property should contain an array of "state objects", and "custom element name" is the name of the custom element to render to.
You can set the `_map` command on the "parent element". The rendered elements mapped from the state objects array will be appended to that parent element.


# App development

## Development Environment
You will usually develop your app in a "development environment". Sprout supplies a "builder" script - that will eventually consolidate all the app "parts" into a single "compiled  HTML" file. The next section will describe how this "compiled" file is structured - you will usually won't need to create that structure "manually" yourself, as mentioned, as you can use the automatic builder script to create it for you (along with minification, bundling and so on), but we will still describe it here, for clarity, you SHOULD go over it, to understand the structure of how a "compiled app" looks like, and also to know about concepts such as "app scope".

## Compiled HTML

### App Scope
Sprout maintains everything related to your app, including its own runtime script in a separate "scope", this also allows you to run several different "apps" in the same page.
Tags related to your app that sits within the `<head>` part of the "compiled" HTML file supports the `app` attribute, where you can specifiy a name for your app (Again, those are added automatically by the 'builder script "compiler"'). Tags having the same value for the `app` attribute, are all "part of the same app".
For debugging purposes - you may "expose" access to the app scopes of existing sprout apps on your page, by including the `allowappscopeaccess` attribute on the `<script>` element that loads `sprout-core.js`. To add this attribute automatically when building using the app builder script, add the command line argument `--allowAppScopeAccess`.

### Global App Elements
"Global App Elements" can include a `<style>` element containing the global style declrations of your app, and a `<script>` tag containing the global runtime code of your app - where the logic is returned from a "self invoking function".
These should have an `app` attribute set to the name of your app.

### `<template>` elements
The `<head>` part of the html should include a `<template>` element per each seperate reusable component in your app. Each template can encompass the style declarations for it (in a child `<style>` element), the HTML UI "prototype" description (including "unresolved" State Attributes, and Command Attributes) directly inside the `<template>` and a `<script>` tag containg the logic for that component, also saved to a variable named `<componentName (camel-cased)>Runtime` (e.g. todoItemRuntime) returned from a self invoking function.

Other than the `app` attribute - `<template>` tags describing components, **must** also include a `for` attribute, where the value describes a "name" for the component that the template describes - that name will eventually be defined as the name of a custom element. Note, that those names must adhere to the naming rules of custom elements (lowercased strings with hyphens as word seperators).

### Sprout runtime script - `SprountInitApp` and the "Build Function"
The `<head>` should include a script tag that loads the `sprout-core.js` library.
This script exposes the global function `SproutInitApp` - that function can receive an "app name", calling it, runs and initializes all the neccesary parts of your app (it takes into account the values of the `app` attribute in the relevant tags), and it returns a "Build Function" - which you can save into a variable, e.g.: `const build_todo_listApp = SproutInitApp("todo_list");`

### Custom Elements
One of the things the SproutInitApp does, is taking into account the `<template>` definitions and their content, and defining new "custom elements" (named after the value put into the `for` attribute), which you can use in the HTML's `<body>` and can support State Attributes, Command Attributes and other features Sprout makes available.

### Native HTML elements as "Reactive elements"
Another thing loading the runtime does is extending all native HTML element classes with Sprout's "Reactive Element" class, allowing you to give the power of state and reactivity even to native HTML elements (besides custom elements which represents your components) - to make a native element "reactive", you use the Web Components' `is` attribute, giving it the value `"reactive-[tag-name]` according to which tag you use. For example, for a `<div>` element you would use `is="reactive-div"`, for a `<span>`: `is="reactive-span"`, for a `<ul>`: `is="reactive-ul"`, for an `<input>`: `is="reactive-input` and so on.
Using this attribute will allow you to use State Attributes and Commands on that element.
You should also do the same for native HTML elements that are part of the template of your components and needs to make use of one or more of Sprout's features (State Attributes, Command Attributes...).

### Build
Once you call the build function - your app becomes "live" on the page.

### App Body
the `<body>` part of the "compiled" HTML should contain the main "skeleton" of your app, this is the place where you can use the custom elements defined from the initializations in the `<head>` part. Using Command Attributes and State Attributes - Sprout will also know to render additional expected DOM elements. Custom Elements will render their content with Shadow DOM, and their logic will be handled by Sprout's runtime.


# Development
You will mostly develop your app within a "development" environment.
Your app should reside in its own seperate folder (possibly within a `src` folder).

## Folder structure of an app

### `components`
Your app needs to have a `components` sub-folder where all of the definitions for your components should reside.
Each "component" should be defined within its own subfolder - **named after the component name** - this would also be the name defined for the "custom element" - so, it should adhere to the [custom elements naming restrictions](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#name).

A component folder can contain the following:
#### `template.html`
This file is an HTML file describing the component UI.
Within it you can put any HTML elements. Those elements supports `State Attributes` and `Commands` (remember to put the `is="reactive-..."` attribute if you need to use those).

#### `style.css`
This is a CSS file where you can specify any styling rules for the component. Those styling rules will only apply in the scope of that component. <br>
Note, that as a component is rendered as a custom element with Shadow DOM, you can also use the `:host` psuedo-class.

#### `runtime.js`
This file should contain the "logic" of your component. You should `export` an object as a default export (`export default`). That object can contain the following properties and values:

##### `state`
This can be an object representing the initial state of the **local state** of the component.

##### `onMount`
This can be a function - that will be exectued when the component is first mounted. <br>
The `this` context in the function is the rendered component, so you can access `this.state` or `this.getState()` and so on...
The global state object is passed as the first argument of the function. You can access it directly via the argument or via `this.state._global`.

##### `events`
This object is where you specifiy Event Handlers for the component's elements.
The properties of the `events` object are element's "ref" names. if you want to add an event handler to an element in your component you need to define a `ref` attribute on that element. A `ref` attribute is a way to identify an element in "Sprout's context", you can give it any name you'd like.
The values in the `events` object can be either a function or an object.

If the value is a function - that function will be used as the `onclick` handler function for the element.
If the value is an object, then the properties should be standard DOM elements event names, and the values are functions that will be used as event handlers.

###### Notes:
Each event handler function receives 3 arguments:
* `event`: The native Javascript Event object.
* `host`: The "host" of the element, which is actually the rendered component instance - which is a `ReactiveElement` class instance, from which you can access things like `state`, `getState` and so on. Read more in `ReactiveElement instance methods`.
* `global`: The global state object.

The `this` context inside the function is **The element that triggered the event**.

##### Example `runtime.js`
As an example, here is the content of the `runtime.js` of the `todo-item` component in the Todo List demo app:

```javascript
import { editTask, deleteTask, toggleTaskCompleted } from "../../modules/tasks-manager.mjs";

let wasEditing = false;

export default {
    state: {
        isEditing: false,
        newName: ""
    },

    onMount() {
        const state = this.state;
        if (!wasEditing && state.isEditing) {
            this.findElement('todo-edit-input').focus();
        }
        else if (wasEditing && !state.isEditing) {
            this.findElement('todo-edit-btn').focus();
        }
    },
    events: {
        'todo-edit-save': (event, host, global)=> {
            const newName = host.getAttribute("newName");
            if (!newName.length || !/\S/.test(newName)) return;
            editTask.call({state: global}, host.getAttribute('id'), newName);
            host.state.newName = "";
            host.state.isEditing = false;
        },
        'todo-edit-btn': (event, host)=> {
            host.state.isEditing = true;
        },
        'todo-edit-cancel': (event, host)=> {
            host.state.isEditing = false;
        },
        'todo-delete-btn': (event, host, global)=> {
            deleteTask.call({state: global}, host.getAttribute('id'));
        },
        'todo-checkbox': (event, host, global)=> {
            toggleTaskCompleted.call({state: global}, host.getAttribute('id'));
        }
    }
}
```
### Root Folder
The root folder of your app, should contain any "global" parts of your app, and can have the following files:

#### `index.html`
An HTML file containing the general "global skeleton" template of your app. This is where you can use custom elements named after your components.

#### `head.html`
You can optionally include a `head.html` file that can include additional content that will be added to the `<head>` part of the compiled HTML when you build the app.

#### `index.css`
A CSS file containing the "global" styling rules for your app. These rules will apply to any UI part of your app, including those within components.

#### `index.js`
This file can contain "global" logic for your app. You will generally only use it to initialize the first state of the "global state" object, by calling:
```javascript
this.setGlobalState(initState)
```
Where `initState` is an object with Sprout's "state object" format.
Anything in the global runtime will actually be called when calling the "app build function" - at which point `setGlobalState` will also be called - which will actually make the global state "live" (meaning things dependant on it will react to changes).

##### Example
here is an example of the `index.js` global runtime of the Todo List demo app:

```javascript
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const initState = {
    filter: "All",
    tasks: [
      { id: "todo-task-0", name: "Eat", completed: true, isEditing: false },
      { id: "todo-task-1", name: "Sleep", completed: false, isEditing: false },
      { id: "todo-task-2", name: "Repeat", completed: false, isEditing: false, },
    ],
    // DO NOT USE ARROW FUNCTION HERE, because state object needs to be passed as THIS!
    set_tasksFiltered: [function() {
        return this.tasks.filter(FILTER_MAP[this.filter]);
    }, ["tasks", "filter"], true],
  
    set_filterButtonStates: [function() {
      return FILTER_NAMES.map(name=> {
        return {
          name,
          // This value is used as a string value on bound attributes,
          // without casting to string, leaving as boolean, will cause
          // the attribute to be removed, if the value is false
          isOn: String(name === this.filter)
        }
      });
    }, ["filter"], true],

    get tasksCount() {
      return this.tasksFiltered.length;
    },

    get tasksNoun() {
      return this.tasksCount !== 1 ? "tasks" : "task";
    },


}
this.setGlobalState(initState);
```

### Folder structure example
Here is an example of the folder structure of the Todo List app demo:
![Example Sprout App Folder Structure](https://github.com/yuval-a/Sprout/blob/main/Sprout-Todo-List-App-Folder-Structure.png?raw=true)

## ReactiveElement class instance methods and properties
When you have access to an instance of a ReactiveElement which is a "rendered component instance" you also have access to its public methods and properties, which this section will specify:

### `getState(stateProp, returnStateObject=false)`
This function can be used to get the value of a state property `stateProp`. If the second argument is `false` the function returns the value of the state prop directly, or `undefined` if it can't find it, if the second argument is `true` the function returns both the state value and the state object (e.g. `const [stateVal, stateObj] = host.getState("someprop", true);`).
The function first tries to retrieve a value from the local state of the component, and if it can't find one - it tries to retrieve from the global state, or undefined if it can't find one.

### `state`
You can directly access the local state from the `state` property

### findElement(refName)
This function can return a DOM element that has `refName` defined as a `ref` attribute.
Using this function can be faster than calling `querySelector[ref="refName"]` - as DOM elements that has a `ref` attributes are saved internally on a component instance, and this function leverages that to access them more directly.

### `host`
`host` is a property you can access from "Reactive native HTML elements" - i.e. elements that are part of your component and have an `is="reactive..."` attribute. <br>
The `host` will contain the containing rendered custom element (the "rendered component"). For the custom elements/rendered components themselves - the value of this property will be `null`

### `isNativeElement`
A property with `true` for reactive native HTML elements (elements having the `is="reactive..."` attribute, `false` for host components (rendered components as custom elements).

## Lifecycle of a component
This section will specify the "life cycle" of a component.
On a "compiled HTML" file, Sprout's core runtime, takes the component's definitions from the equivalent `<template>` elements, and basically defines the required **custom elements** based on a class extending the `ReactiveElement` class - 
at this point the constructor method of the class is called for each component.
The constructor basically saves the UI template, styling and script logic into the instance.
Sprout runtime also extends native HTML element classes with `ReactiveElement` to enable the usage of the `is="reactive-..."` attribute on them and make them reactive - 
at this point their constructors gets called as well, but they don't need to save all the information that a constructor for a "component element" does.

Most of the actual "lifecycle" occurs when the browser's HTML parser encounters custom elements used in the body of an HTML, and "mounts" (or "renders") them to the DOM tree of the document, 
when this happens, the following occurs, in this order:

1. **State becomes live**: If the component was given an "initial state" object (via its runtime) - that state becomes "live" - and things dependent on it will react to changes on it.
2. **State Attributes are resolved and bound to state**: Any State Attribute values are **resolved** to equavilent values from state objects (either local or global). At this stage Sprout's also makes sure to create the "binding" between state properties and their equivalent "State Attribute" nodes.
3. **Commands are run**: Any Command Attributes are handled and are actually run - this MAY result in additional DOM elements (usually custom elements representing defined components) added to the DOM tree.
4 **UI rendering** At this stage the UI part (saved when a component instance was first constructed) - is actually rendered: a Shadow DOM root is created, and the relevant UI is attached to it.
5. **Styling is implemented** by using `adoptedStyleSheets`.
6 **Events are bound** - Event handlers are bound to the component. Sprout leverages "event bubbling" - it doesn't attach a "separate" event handler directly to each element - rather there is a SINGLE GLOBAL event handler (per each specified type in the component's runtime) - this event checks if the element that triggered the event has a relevant handler function defined in the `events` object on the component's runtime 
7. **onMount()** is called. if an `onMount` function is declared on the component's runtime - it is called at this stage, binding the rendered component itself as its `this` context.

# Building

## App Builder Script
This version of Sprout comes with a "builder script" - which can take a folder with your app's "development environment" and "build" it, turning it to a single "compiled HTML" - simply loading that HTML in a browser will run your app.

### Using the app builder script.
1. Make sure you have your app ready in its own sub-folder (e.g. `src/appname`) - with the correct folder and file structure.
2. Make sure both `./dist/sprout-core.js` and `sprout-core.js.map` exist as the builder script needs to copy them to the app dist folder. If you just cloned the repo (or if you made any changes to Sprout) - you should build the Sprout Core library first, by running `npm run build` - it will create the two `sprout-core.js` and `sprout-core.js.map` files mentioned above.
3. Run: <br>
```
node ./sprout-build-app.mjs [app-src-folder] [app-build-folder] <--app app-name> <--minify>
```

The first argument should be the folder with the app "source", the second argument should be a destination folder for the "build" - where the "compiled" version will be written to.

#### `--app`
You can optionally give your app's name using the `--app` command line argument - if the argument is not given - a **random** name will be used for the app - so, **it is recommended** to use that option and specify a meaningful name for your app. That name will be used wherever an "app name" is needed on the compiled app (See: "App Scope").

#### `--minify`
If you include this argument - the compiled build will also minify any HTML, CSS and JS that's created in the compiled file. <br>
You should include this argument for "compiled" builds, and omit it for "development builds" - where you'll probably want an easy way to debug it.

# Demos
This repo includes several ready-made Sprout apps for demonstrations purposes. It is recommended to study them - to see where all the aspects of a Sprout App come into action in a practical way.
These are the demos included:

### Tic-Tac-Toe game (`demos/tic-tac-toe-src`)
This is an implementation based on the Tic-Tac-Toe game app from [React's tutorial](https://react.dev/learn/tutorial-tic-tac-toe) - including the "time travel" feature - which allows you to "go back" to any previous move in the game. Comparing this Sprout implementation to the React implementation might help you grasp the attitude and concepts of Sprout - especially if you are familiar with React and its concepts and have used it before.
#### Live Version
[Link to live version](https://jssprout.com/demos/tictactoe/)

### Todo List (`demos/todo-list-src`)
This is a "Todo List" app implementation based on [MDN's implementation of a Todo List app in React](https://github.com/mdn/todo-react) (the result of [this tutorial](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning).
#### Live Version
[Link to live version](https://jssprout.com/demos/todo-list/)

### Todo MVC (`demos/todo-mvc-src`)
This is an implentation of the "Todo List app" that can be seen on https://todomvc.com/ - a popular site that compares between frameworks by showing implementations of a Todo List app - in different frameworks 
#### Live Version
[Link to live version](https://jssprout.com/demos/todo-mvc/)

## Building and compiling
`package.json` defines some npm scripts you can run for building and compiling both the runtime and core parts of Sprout and/or the included app demos. Use `npm run [script-name]` to run a script.
These are the available scripts:

### `build`: builds the Sprout's core library which includes its "runtime" part and the "builder" part. The script will be compiled into `dist/sprout-core.js` along with a source-map at `dist/sprout-core.js.map` for easier debugging.

* `build-todo-app` runs the `sprout-build-app.mjs` to build the Todo List App (Unminified) into `demos/todo-list-build`.
* `build-todomvc-app` runs the `sprout-build-app.mjs` to build the Todo List MVC App (Unminified) into `demos/todo-list-build`.
* `build-ttt-app` runs the `sprout-build-app.mjs` to build the Tic-Tac-Toe App (Unminified) into `demos/todo-list-build`.
* `serve-todo-app`: Serves the build of the Todo List App in a localhost Webpack dev server.
* `serve-todomvc-app`: Serves the build of the Todo List MVC App in a localhost Webpack dev server.
* `serve-ttt-app`: Serves the build of the Tic-Tac-Toe in a localhost Webpack dev server.

You only need to build Sprout's core if you make changes to it, of-course, and also - build it when you first clone the repo. **The `sprout-build-app` expects both `./dist/sprout-core.js` and `sprout-core.js.map` to exist**

There are also .sh (bash) files for each of the demos, running each will:
1. Build Sprout's core.
2. Build the demo app from source.
3. Serve it on a localhost Webpack server.

The files are: `serve-todo-app.sh`, `serve-todomvc-app.sh`, `serve-ttt-app.sh` <br>
Enjoy!

# Contributing
Feel free to make contributions by branching and pushing a PR.
Read the [architecture.MD](https://github.com/yuval-a/Sprout/blob/main/architecture.MD) MD file to read about the general architecture of the framework, from a development perspective.

# Contact
For questions or queries you can open a new "issue" or send a message via Github.
