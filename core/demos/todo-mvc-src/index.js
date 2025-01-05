const TODO_FILTERS = {
    All: ()=> true,
    Active: (item)=> !item.completed,
    Completed: (item)=> item.completed
}

let TODO_ID = 0;

const initState = {
    currentTodosFilterName: "All",
    todos: [],
    /*
    todos: [{
        key: TODO_ID++,
        title: "Write tests for your components framework!",
        completed: false,
        editMode: false,
    }],
    */
    // Used for batching todos loops into one
    set_todosMetadata: [function() {
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
                if (TODO_FILTERS[this.currentTodosFilterName](todo)) {
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
    }, ["todos", "currentTodosFilter"], true],
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
    
    addTodo(title) {
        this.todos.push({
            key: TODO_ID++,
            title,
            completed: false,
            editMode: false
        });
    }

}
this.setGlobalState(initState);