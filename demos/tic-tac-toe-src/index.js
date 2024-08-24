const initState = {
    // Should contain an array of 9-item arrays. NOTE, should be NATIVE arrays (not StatefulArrays), the history itself is a StatefulArray
    history: [ 
        Array.from({ length: 9 }, (_, index)=> ({ value: "", key: index }))
    ],
    currentMove: 0,
    
    set_xIsNext: [function() { 
        return this.currentMove % 2 === 0 
    }, ["currentMove"], true],

    set_currentSquares: [function() { 
        return [...this.history[this.currentMove]]; 
    }, ["currentMove"], true],

    set_status: [function() {
        const winner = this.calculateWinner();
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.xIsNext ? 'X' : 'O');
        }
        return status;
    }, ["currentSquares"], true],
    set_moves: [function() {
        return this.history.map((_, move) => {
            let description;
            if (move > 0) {
                description = 'Go to move #' + move;
            } else {
                description = 'Go to game start';
            }
            return  {
                move,
                description
            };
        });
    }, ["history"]],
    calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        const squares = this.currentSquares;
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
                return squares[a].value;
            }
        }
        if (squares.every(({value})=> value)) {
            return "TIE!";
        }
        return null;
    },
    handlePlay(nextSquares) {
        const nextHistory = [...this.history.slice(0, this.currentMove + 1), nextSquares];
        this.history = nextHistory;
        this.currentMove = nextHistory.length - 1;
    },
    jumpTo(nextMove) {
        this.currentMove = nextMove;
    }
}

this.setGlobalState(initState);
