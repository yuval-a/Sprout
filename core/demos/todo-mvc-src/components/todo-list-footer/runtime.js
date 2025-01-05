function setUrlHash(newHash) {
    if (window?.top?.location) {
        window.top.location.hash = newHash;
    }
}
export default {
    events: {
        ["filter-all"](event, host, global) {
            event.preventDefault();
            // global.currentTodosFilter = TODO_FILTERS.All;
            const newFilter = "All";
            global.currentTodosFilterName = newFilter;
            setUrlHash(newFilter.toLowerCase());
        },
        ["filter-active"](event, host, global) {
            event.preventDefault();
            // global.currentTodosFilter = TODO_FILTERS.Active;
            const newFilter = "Active";
            global.currentTodosFilterName = newFilter;
            setUrlHash(newFilter.toLowerCase());

        },
        ["filter-completed"](event, host, global) {
            event.preventDefault();
            // global.currentTodosFilter = TODO_FILTERS.Completed;
            const newFilter = "Completed";
            global.currentTodosFilterName = newFilter;
            setUrlHash(newFilter.toLowerCase());
        },
        ["button-clear-completed"](event, host, global) {
            global.todos = global.todos.filter(todo=> !todo.completed);
        }
    }
}