export default {
    events: {
        'filter-btn': function(event, host, global) {
            global.filter = this.getAttribute("name");
        }
    }
}