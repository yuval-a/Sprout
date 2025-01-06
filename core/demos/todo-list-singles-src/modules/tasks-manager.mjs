// We start with 3 demo todos, so next one is 3
var TASK_ID = 3;

// Call the functions with a this context containing
// a state property with a state value

function getTaskById(id) {
    return this.state.tasks.find(task=> task.id === id);
}

export function addTask(name) {
    this.state.tasks.push(
        {
            id: `todo-task-${++TASK_ID}`,
            key: `todo-task-${TASK_ID}`,
            name,
            newName: "",
            isEditing: false,
            completed: false
        }
    );
}

export function editTask(id, newName) {
    const task = getTaskById.call(this, id);
    if (task) {
        task.name = newName;
    }
}

export function toggleTaskCompleted(id) {
    const task = getTaskById.call(this, id);
    if (task) task.completed = task.completed ? false : true;
}

export function deleteTask(id) {
    const taskIndex = this.state.tasks.findIndex(task=> task.id === id);
    if (taskIndex > -1) this.state.tasks.splice(taskIndex, 1);
    // if (taskIndex > -1) state.tasks.removeItemAt(taskIndex);
}
