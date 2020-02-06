const getStartingState = require("./helpers/getStartingState");

const gameStartAction = (lib) => async (messageContext) => {
    if (messageContext.player !== "playerOne") {
        return {statusCode: 400, body: "Only player one can start the game"}
    }

    if (messageContext.chessGame.gameStartTime) {
        return {statusCode: 400, body: "Game has already started"}
    }

    let dynamoResponse;
    try {
        dynamoResponse = await lib.data.chess_lobby.startTheGame(messageContext.message.data.gameId, getStartingState)
    } catch (e) {
        console.log(e);
        return {statusCode: 500, msg: "Failed to update game state"}
    }

    const gameState = dynamoResponse.Attributes.gameState;

    const dropConnection = (connectionId) => {
        lib.data.chess_lobby.dropChessConnection(messageContext.chessGame, connectionId)
    };

    const message = {
        type: "GAME_STARTED",
        payload: {
            gameId: messageContext.chessGame.key,
            fen: gameState.fen,
            turn: gameState.turn
        }
    };

    try {
        await lib.net.websocketSendMessages({
            postData: message,
            connections: messageContext.chessGame.playerConnections,
            dropConnection,
            event: messageContext.event
        })
    } catch (e) {
        return {statusCode: 500, body: "Failed to send socket messages to players "}
    }

    return {statusCode: 200, body: "Successfully updated player ready state"}
};

module.exports = gameStartAction;
