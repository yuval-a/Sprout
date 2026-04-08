export default {
    events: {
        squareBtn(event, host, global) {
            if (this.getAttribute('value') !== "") return;
            if (global.calculateWinner()) {
                return;
            }
            // If not "native" array convert to native array
            let nextSquares = global.currentSquares.toArray ? global.currentSquares.toArray() : global.currentSquares;
            // We have to "deep clone" because we are using objects as items
            nextSquares = nextSquares.map(squareObj=> ({
                ...squareObj
            }));
            const squareIndex = this.getAttribute('index');
            nextSquares[squareIndex].value = global.xIsNext ? 'X' : 'O';
            global.handlePlay(nextSquares);
        }
    }
}