export default {
    events: {
        ["todo-item"]: {
            dblclick(event, host, global) {
                host.state.editMode = true;
                setTimeout(()=> {
                    const $input = this.findElement("todo-edit-input");
                    $input.focus();
                    $input.select();
                }, 50);
            }
        },
        ["todo-edit-input"]: {
            inputChange(event, host) {
                host.state.title = this.value;
            },
            blur(event, host) {
                host.state.editMode = false;
            },
            keyup(event, host) {
                if (event.key === "Enter") {
                    host.state.editMode = false;
                    this.blur();
                }
            }
        },
        ["task-completed-checkbox"]: {
            inputChange(event, host) {
                const completed = this.checked;
                host.state.completed = completed;
            }
        },
        ["button-destroy"](event, host, global) {
            const todoKey = host.state.key;
            const todos = global.todos;
            const todoIndex = todos.findIndex(todo=>todo.key === todoKey);
            // todos.remove(todoIndex, 1);
            todos.splice(todoIndex, 1);
        },
    }
}