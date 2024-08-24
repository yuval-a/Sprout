export default {
    events: {
        ['new-todo-input']: {
            keyup(event, host, global) {
                if (event.key === "Enter") {
                    const todoTitle = this.value.trim();
                    if (/\S/.test(todoTitle)) {
                        global.addTodo(todoTitle);
                        this.value = "";
                    }
                    this.focus();
                }
            }
        },
        ['toggle-all'](event, host, global) {
            const completedState = this.checked;
            global.todos.forEach(todo=> todo.completed = completedState);
        }
    }
}