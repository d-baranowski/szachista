const Chess = require('chess.js').Chess;

const getStartingState = (playerOne, playerTwo, timestamp) => {
    const chess = new Chess();
    const white = Math.floor(Math.random() * 2) === 0 ? playerOne : playerTwo;

    return {
        fen: chess.fen(),
        white,
        turn: white,
        black: white === playerOne ? playerTwo : playerOne,
        log: [
            { timestamp, event: "GAME_START", turn: white }
        ]
    }
};

module.exports = getStartingState;
