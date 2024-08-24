export default {
    events: {
        jumpToBtn(_, host, global) {
            global.jumpTo(host.getState('move'));
        }
    }
}