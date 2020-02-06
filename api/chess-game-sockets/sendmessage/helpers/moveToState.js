const Chess = require('chess.js').Chess;

const moveToState = (state, move) => {
    const chess = new Chess(state);

    if (chess.game_over()) {
        throw new Error("Game is over")
    }

    const result = chess.move(move);

    if (result == null) {
        throw new Error("Not a valid move")
    }

    chess.turn()

    return chess.fen();
};

module.exports = moveToState;
