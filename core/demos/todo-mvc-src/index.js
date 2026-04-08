import { TODO_FILTER_NAMES } from "./modules/todo_utils.mjs";

const commands = {
    sayhi() {
        alert ("HI!");
    }
}

this.setCommands(commands);

const TODO_FILTERS = {
    [TODO_FILTER_NAMES.All]: ()=> true,
    [TODO_FILTER_NAMES.Active]: (item)=> !item.completed,
    [TODO_FILTER_NAMES.Completed]: (item)=> item.completed
}

let TODO_ID = 0;

const initState = {
    currentTodosFilterName: "All",
    todos: [],
    get currentTodosFilter() {
        return TODO_FILTERS[this.currentTodosFilterName];
    },
    get todosEmpty() {
        return !this.todos.length
    },
    get todosNoun() {
        return this.incompleteTodosCount === 1 ? "item" : "items";
    },
    set_completedTodosCount: [function() {
        if (!this.todos.length) return 0;
        return this.todos.reduce((completeCount, todo)=> 
            todo.completed ? completeCount+1 : completeCount
            , 0);
    }, { init: true, reevaluate: true}],
    set_incompleteTodosCount: [function() {
        if (!this.todos.length) return 0;
        return this.todos.reduce((incompleteCount, todo)=> 
            !todo.completed ? incompleteCount+1 : incompleteCount
            , 0);
    }, { init: true, reevaluate: true }],
    set_completedTasksExist: [function() {
        if (!this.todos.length) return false;
        return this.completedTodosCount > 0;
        // return this.todos.some(todo=> todo.completed);
    }, { init: true, reevaluate: true }],
    set_todosFiltered: [function() {
        // Shortcut to avoid running "filter"
        if (this.currentTodosFilterName === "All") {
            // Fastest way to create a shallow copy
            return this.todos.slice();
        }
        else {
            return this.todos.filter(this.currentTodosFilter);
        }
    }, {
        init: true,
        reevaluate: false,
        // deps: ["todos", "todos.length", "currentTodosFilterName","currentTodosFilter"],
        stateMap: true
    }],
    /*
    todos: [{
        key: TODO_ID++,
        title: "Write tests for your components framework!",
        completed: false,
        editMode: false,
    }],
    */
    // Used for batching todos loops into one
    /*
    set_todosMetadata: [function() {
        function getTodosMetadata() {
            if (!this.todos.length) {
                return {
                    todosFiltered: [],
                    todosEmpty: true,
                    completedTasksExist: false,
                    incompleteTodosCount: 0,
                }
            }
            else {
                const todosFiltered = [];
                let incompleteTodosCount = 0;
                completedTasksExist = false;
                this.todos.forEach(todo=> {
                    if (this.currentTodosFilter(todo)) {
                        todosFiltered.push(todo);
                    }
                    if (!todo.completed) incompleteTodosCount++;
                    if (todo.completed) completedTasksExist = true;
                });

                return {
                    todosEmpty: false,
                    todosFiltered,
                    incompleteTodosCount,
                    completedTasksExist
                }
            }
        }
        if (!this.todosMetaData) { 
            return getTodosMetadata();
        }
        else {
            const todosMetadata = getTodosMetadata();
            if (todosEmpty !== todosMetadata.todosEmpty) todo
        }
    }, {
        reevaluate: true,
        init: true
    }],
    */

    /*
    get todosFiltered() {
        return this.todosMetadata.todosFiltered;
    },
    */


    /*
    set_currentTodosFilter: [function() {
        // this.todosMetadata.todosFiltered = this.todos.filter(TODO_FILTERS[this.currentTodosFilterName]);
        return TODO_FILTERS[this.currentTodosFilterName];
    }, ["currentTodosFilterName"], true],
    set_todosFiltered: [function() {
        return this.todosMetadata.todosFiltered;
    }, ["todosMetadata"], true],
    set_todosEmpty: [function() {
        return this.todosMetadata.todosEmpty
    }, ["todosMetadata"], true],
    set_incompleteTodosCount: [function() {
        return this.todosMetadata.incompleteTodosCount
    }, ["todosMetadata"], true],
    set_todosNoun: [function() {
        return this.incompleteTodosCount === 1 ? "item" : "items";
    }, ["incompleteTodosCount"], true],
    set_completedTasksExist: [function() {
        return this.todosMetadata.completedTasksExist
    }, ["todosMetadata"], true],
    */
    addTodo(title) {
        performance.mark("todo-todos-push");
        this.todos.push({
            key: TODO_ID++,
            title,
            completed: false,
            editMode: false
        });
    }

}

// for (let i=0;i<3;i++) { initState.addTodo("hi")};
this.setGlobalState(initState);
