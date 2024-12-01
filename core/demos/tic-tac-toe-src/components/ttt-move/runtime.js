export default {
    events: {
        jumpToBtn(_, host, global) {
            const jumpToMove = Number(this.getAttribute('move'));
            global.jumpTo(jumpToMove);
        }
    }
}
