export default {
    events: {
        "btn-counter-increase": function(event, host, global) {
            global.counter++;
        },
        "btn-counter-decrease": function(event, host, global) {
            global.counter--;
        }

    }
}
