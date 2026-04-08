export default {
    state: {
        set_row1: [function() {
            const squares = this._global.currentSquares;
            return squares.slice(0,3);
        }, {
            init: true,
            stateMap: true
        }],
        set_row2: [function() { 
            const squares = this._global.currentSquares;
            return squares.slice(3,6);
        }, {
            init: true,
            stateMap: true
        }],
        set_row3: [function() {
            const squares = this._global.currentSquares;
            return squares.slice(6,9);
        }, {
            init: true,
            stateMap: true
        }]
    }
}
