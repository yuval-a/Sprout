export default {
    events: {
        "show-hide-btn": function(event, host, global) {
            global.isHidden = global.isHidden ? false : true
        }
    }
}