const Chess = require('chess.js').Chess;
const calculatePlayersTimeUsed = require("./helpers/calculatePlayersTimeUsed");

const actionHandler = (lib) => async (messageContext) => {
    const now = Date.now();
    const chessGame = messageContext.chessGame;
    const username = messageContext.authentity.Username;
    const playerMove = messageContext.message.data.payload.move;
    const suggestedNewState = messageContext.message.data.payload.suggestedNewState;
    const gameState = messageContext.chessGame.gameState;
    const key = chessGame.key;
    const createdTime = chessGame.createdTime;

    if (gameState.turn !== username) {
        console.log("Wrong user's turn");
        return {
            statusCode: 400,
            body: "This is not this users turn"
        }
    }

    const chess = new Chess(gameState.fen);
    const moveResult = chess.move(playerMove);
    const nextFen = chess.fen();

    if (suggestedNewState !== nextFen) {
        console.log("Invalid state");
        return {
            statusCode: 400,
            body: "Unexpected game state"
        }
    }

    const nextPlayer = username === gameState.white ? gameState.black : gameState.white;

    if (!moveResult) {
        console.log("Invalid move");
        return {
            statusCode: 400,
            body: "Invalid move"
        }
    }

    gameState.log.push({
        timestamp: now,
        move: playerMove,
        fen: gameState.fen,
        event: "PLAYER_MOVED",
        turn: gameState.turn
    });

    const timesUsed = calculatePlayersTimeUsed(gameState.log);

    gameState.turn = nextPlayer;
    gameState.fen = nextFen;

    // Update the state
    try {
        console.log(await lib.data.chess_lobby.updateGameState(key, createdTime, gameState));
    } catch (e) {
        console.log(e);
        return {statusCode: 500, body: "Failed to update game state"}
    }

    const dropConnection = (connectionId) => {
        lib.data.chess_lobby.dropChessConnection(messageContext.chessGame, connectionId)
    };

    const message = {
        type: "MOVE_MADE",
        payload: {
            timestamp: now,
            move: playerMove,
            gameId: messageContext.chessGame.key,
            fen: nextFen,
            turn: nextPlayer,
            timesUsed
        }
    };


    if (timesUsed[chessGame.playerOneUsername] > chessGame.timeAllowed  || timesUsed[chessGame.playerTwoUsername] > chessGame.timeAllowed) {
        message.type = "PLAYER_OUT_OF_TIME"
    }

    try {
        console.log("Notifying plauers " + message);
        await lib.net.websocketSendMessages({
            postData: message,
            connections: messageContext.chessGame.playerConnections,
            dropConnection,
            event: messageContext.event
        })
    } catch (e) {
        console.log(e);
        return {statusCode: 500, body: "Failed to send socket messages to players "}
    }

    return {statusCode: 200, body: "Successfully notified other players about joining"}
};


module.exports = actionHandler;
