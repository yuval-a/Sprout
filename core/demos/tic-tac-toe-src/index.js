const initState = {
    // Should contain an array of 9-item arrays. NOTE, should be NATIVE arrays (not StatefulArrays), the history itself is a StatefulArray
    history: [ 
        Array.from({ length: 9 }, (_, index)=> ({ value: "", key: index, index }))
    ],
    currentMove: 0,
    
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
        const nextMove = this.currentMove+1;
        // Make key unique (index-nextMove)
        nextSquares = nextSquares.map((square, index)=> ({
            ...square,
            index: square.index ?? index,
            key: `${index}-${nextMove}`
        }));
        const nextHistory = [...this.history.slice(0, nextMove), nextSquares];
        this.history = nextHistory;
        this.currentMove = nextMove;
        //this.currentMove = nextHistory.length - 1;
    },
    jumpTo(nextMove) {
        this.currentMove = nextMove;
    },

    get xIsNext() {
        return this.currentMove % 2 === 0 
    },
    set_currentSquares: [function() {
        return this.history[this.currentMove]; 
    }, { 
        init: true,
        // stateMap: true
    }], 

    set_status: [function() {
        const winner = this.calculateWinner();
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.xIsNext ? 'X' : 'O');
        }
        return status;
    }, {
        reevaluate: true,
        init: true
    }],
    set_moves: [function() {
        return this.history.map((_, move) => {
            let description;
            if (move > 0) {
                description = 'Go to move #' + move;
            } else {
                description = 'Go to game start';
            }
            return  {
                key: move,
                move,
                description
            };
        });
    }, {
        reevaluate: true,
        init: true,
        stateMap: true
    }]
}

this.setGlobalState(initState);
