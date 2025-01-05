export default {
    beforeRender(global) {
        if (this.getAttribute("caching")) {
            if (typeof localStorage !== "undefined") {
                const todos = localStorage.getItem("todos-mvc");
                if (todos) {
                    global.todos = todos;
                }
            }

            const hashState = window?.top?.location?.hash.substring(1);
            switch (hashState) {
                case "active":
                    global.currentTodosFilterName = "Active";
                    // global.currentTodosFilter = TODO_FILTERS.Active;
                    break;
                case "completed":
                    global.currentTodosFilterName = "Completed";
                    // global.currentTodosFilter = TODO_FILTERS.Completed;
                    break;
                default:
                    global.currentTodosFilterName = "All";
                    // global.currentTodosFilter = TODO_FILTERS.All;
                    break;
            }
        }
    },
    ["toggle-all"](event, host, global) {
        global.todos = global.todos.map(todo=> { todo.completed = true; return todo; } );
    }


}