import { addTask } from "../../modules/tasks-manager.mjs";

export default {
    state: {
        newName: "",
        name: "",
    },
    events: {
        'todo-form-add': (event, host, global)=> {
            const $input = host.findElement("todo-form-input");
            const name = $input?.value;
            if (!name || !name.length || !/\S/.test(name)) return;
            addTask.call({ state: global }, name);
            $input.value = "";
            $input.focus();
        }
    }
}