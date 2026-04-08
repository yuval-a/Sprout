import { TODO_FILTER_NAMES } from "../../modules/todo_utils.mjs";

function setUrlHash(newHash) {
    if (window?.top?.location) {
        window.top.location.hash = newHash;
    }
}

export default {
    settings: {
        useDSD: true
    },
    events: {
        ["filter-all"](event, host, global) {
            event.preventDefault();
            const newFilter = TODO_FILTER_NAMES.All;
            global.currentTodosFilterName = newFilter;
            setUrlHash(newFilter.toLowerCase());
        },
        ["filter-active"](event, host, global) {
            event.preventDefault();
            const newFilter =TODO_FILTER_NAMES.Active;
            global.currentTodosFilterName = newFilter;
            setUrlHash(newFilter.toLowerCase());
        },
        ["filter-completed"](event, host, global) {
            event.preventDefault();
            const newFilter = TODO_FILTER_NAMES.Completed;;
            global.currentTodosFilterName = newFilter;
            setUrlHash(newFilter.toLowerCase());
        },
        ["button-clear-completed"](event, host, global) {
            function clearCompleted(todo) {
                return !todo.completed;
            }
            global.todos = global.todos.filter(clearCompleted);
            // If you check the "mark all completed"
            // and then click "clear completed"
            // the 'mark all' will stay checked - so uncheck it
            document.querySelector('[tagName="todo-list-header"]')
            .findElement("toggle-all")
            .checked = false;
        }
    }
}