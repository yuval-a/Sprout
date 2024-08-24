export default {
    events: {
        squareBtn(event, host, global) {
            if (this.getAttribute('value') !== "") return;

            if (global.calculateWinner()) {
                return;
            }

            const nextSquares = global.currentSquares.toArray();
            console.log ("NEXT SQUARES: ", nextSquares);
            const squareIndex = this.getAttribute("key");
            if (global.xIsNext) {
                nextSquares[squareIndex].value = 'X';
            } else {
                nextSquares[squareIndex].value = 'O';
            }
            global.handlePlay(nextSquares);
        }
    }
}