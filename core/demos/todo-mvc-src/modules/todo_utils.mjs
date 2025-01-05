export const TODO_FILTERS = {
    All: ()=> true,
    Active: (item)=> !item.completed,
    Completed: (item)=> item.completed
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
