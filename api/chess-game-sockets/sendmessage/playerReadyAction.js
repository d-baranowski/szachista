const playerReadyAction = (lib) => async (messageContext) => {
    try {
        await lib.data.chess_lobby.setPlayerReady(messageContext.message.data.gameId, messageContext.authentity.Username, messageContext.message.data.payload.readyState)
    } catch (e) {
        console.log(e);
        return {statusCode: 500, msg: "Failed to update game state"}
    }


    console.log("Connections: " + JSON.stringify(messageContext.chessGame.playerConnections));

    const dropConnection = (connectionId) => {
        lib.data.chess_lobby.dropChessConnection(messageContext.chessGame, connectionId)
    };

    const message = {
        type: "PLAYER_READY_STATE_CHANGED",
        payload: {
            player: messageContext.player,
            gameId: messageContext.chessGame.key,
            ready: messageContext.message.data.payload.readyState
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

module.exports = playerReadyAction;
