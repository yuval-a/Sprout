export const TODO_FILTERS = {
    All: (item)=> true,
    Active: (item)=> !item.completed,
    Completed: (item)=> item.completed
}