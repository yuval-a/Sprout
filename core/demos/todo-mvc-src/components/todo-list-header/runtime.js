export default {
    settings: {
        useDSD: true,
    },
    state: {
        markedAllCompleted: false
    },
    events: {
        ['new-todo-input']: {
            keyup(event, host, global) {
                if (event.key === "Enter") {
                    performance.mark("todo-enter-key");
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
            global.todos.forEach(todo=> todo.completed = this.checked);
            host.state.markedAllCompleted = this.checked;
        }
    }
}
