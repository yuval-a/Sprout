export default {
    events: {
        ["todo-item"]: {
            dblclick(event, host, global) {
                host.state.editMode = true;
                requestAnimationFrame(()=> this.findElement("todo-edit-input").focus());
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
            inputChange(event, host, global) {
                host.state.completed = this.checked;
            }
        },
        ["button-destroy"](event, host, global) {
            const todoKey = host.state.key;
            const todos = global.todos;
            const todoIndex = todos.findIndex(todo=>todo.key === todoKey);
            todos.splice(todoIndex, 1);
        },
    }
}