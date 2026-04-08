const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

var initState = {
    filter: "All",
    tasks: [
      { id: "todo-task-0", key: 0, name: "Eat", completed: true, isEditing: false },
      { id: "todo-task-1", key: 1, name: "Sleep", completed: false, isEditing: false },
      { id: "todo-task-2", key: 2, name: "Repeat", completed: false, isEditing: false, },
    ],
    // DO NOT USE ARROW FUNCTION HERE, because state object needs to be passed as THIS!
    set_tasksFiltered: [function() {
        return this.tasks.filter(FILTER_MAP[this.filter]);
    }, {
      init: true,
      stateMap: true
    }],
  
    set_filterButtonStates: [function() {
      return FILTER_NAMES.map((name, index)=> {
        // This value is used as a string value on bound attributes,
        // without casting to string, leaving as boolean, will cause
        // the attribute to be removed, if the value is false
        const isOn = String(name === this.filter);
        return {
          key: name,
          name,
          isOn
        }
      });
    }, {
      init: true,
      stateMap: true
    }],

    get tasksCount() {
      return this.tasksFiltered.length;
    },

    get tasksNoun() {
      return this.tasksCount !== 1 ? "tasks" : "task";
    },
}

// Tasks should also have an empty "newName" property (for edit logic)
initState.tasks = initState.tasks.map(task=> ({...task, newName: ""}));
this.setGlobalState(initState);