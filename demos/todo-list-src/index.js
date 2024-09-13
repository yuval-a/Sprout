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

// Tasks should also have an empty "newName" property (for edit logic)
initState.tasks = initState.tasks.map(task=> ({...task, newName: ""}));
this.setGlobalState(initState);