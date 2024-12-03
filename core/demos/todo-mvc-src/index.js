import { TODO_FILTERS } from './modules/consts.mjs';

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
    set_currentTodosFilter: [function() {
        return TODO_FILTERS[this.currentTodosFilterName];
    }, ["currentTodosFilterName"], true],
    set_todosFiltered: [function() {
        return this.todos.filter(this.currentTodosFilter);
    }, ["todos", "currentTodosFilter"], true],
    set_todosEmpty: [function() {
        return this.todos.length === 0;
    }, ["todos"], true],
    set_incompleteTodosCount: [function() {
        return this.todos.filter(todo=> !todo.completed).length;
    }, ["todos"], true],
    set_todosNoun: [function() {
        return this.incompleteTodosCount === 1 ? "item" : "items";
    }, ["incompleteTodosCount"], true],
    set_completedTasksExist: [function() {
        return this.todos.some(todo=> todo.completed);
    }, ["todos"], true],

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