export const TODO_FILTER_NAMES = {
    All: "All",
    Active: "Active",
    Completed: "Completed"
}

let TODO_ID = 0;

export function addTodo(title) {
    this.push({
        key: TODO_ID++,
        title,
        completed: false,
        editMode: false
    });
}
