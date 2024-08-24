import { editTask, deleteTask, toggleTaskCompleted } from "../../modules/tasks-manager.mjs";

let wasEditing = false;

export default {
    state: {
        isEditing: false,
        newName: ""
    },

    onMount() {
        const state = this.state;
        if (!wasEditing && state.isEditing) {
            this.findElement('todo-edit-input').focus();
        }
        else if (wasEditing && !state.isEditing) {
            this.findElement('todo-edit-btn').focus();
        }
    },
    events: {
        'todo-edit-save': (event, host, global)=> {
            const newName = host.getAttribute("newName");
            if (!newName.length || !/\S/.test(newName)) return;
            editTask.call({state: global}, host.getAttribute('id'), newName);
            host.state.newName = "";
            host.state.isEditing = false;
        },
        'todo-edit-btn': (event, host)=> {
            host.state.isEditing = true;
        },
        'todo-edit-cancel': (event, host)=> {
            host.state.isEditing = false;
        },
        'todo-delete-btn': (event, host, global)=> {
            deleteTask.call({state: global}, host.getAttribute('id'));
        },
        'todo-checkbox': (event, host, global)=> {
            toggleTaskCompleted.call({state: global}, host.getAttribute('id'));
        }
    }
}