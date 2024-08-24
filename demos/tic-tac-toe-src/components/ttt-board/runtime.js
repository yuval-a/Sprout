export default {
    state: {
        get row1() {
            const squares = this._global.currentSquares;
            return squares.slice(0,3);
        },
       get row2() { 
            const squares = this._global.currentSquares;
            return squares.slice(3,6);
        },
        get row3() {
            const squares = this._global.currentSquares;
            return squares.slice(6,9);
        }
    }

}