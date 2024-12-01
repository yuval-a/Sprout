export default {
    state: {
        isShown: false
    },
    events: {
        btn(_, host) {
            host.state.isShown = host.state.isShown ? false : true
        }
    },

}