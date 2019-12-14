const putHandler = (lib) => async (event, context, callback, accessData) => {
    let payload;

    try {
        payload = JSON.parse(event.body);
    } catch (err) {
        lib.log(err);
        lib.net.sendResponse(400, "Bad body", callback);
        return;
    }

    if (!payload) {
        lib.net.sendResponse(400, "Body missing", callback);
        return;
    }

    if (!payload.gameId) {
        lib.net.sendResponse(400, "Game id missing from the body", callback);
        return;
    }

    const userAtributes = accessData.UserAttributes.reduce((object, value) => {
        return {
            ...object,
            [value.Name]: value.Value
        };
    }, {});

    let chessGame;

    try {
        const response = await lib.data.chess_lobby.getChessGame(payload.gameId);
        chessGame = response.Items[0] /*?*/
    } catch (e) {
        lib.net.sendResponse(500, "Failed to fetch the chess game " + payload.gameId, callback)
        return;
    }

    if (!chessGame) {
        lib.net.sendResponse(400, "Chess game not found" + payload.gameId, callback);
        return;
    }

    const joiningPlayer = {
        username: accessData.Username,
        picture: userAtributes.picture
    };

    const {
        key,
        createdTime,
        playerOneUsername,
        playerTwoUsername,
    } = chessGame;

    if (joiningPlayer.username === playerOneUsername) {
        console.log("Game creator tried joining the game", joiningPlayer, playerOneUsername);
        lib.net.sendResponse(400, "Cant join the game you created", callback);
        return;
    }

    if (playerTwoUsername === joiningPlayer.username) {
        console.log("Player already joined this game");
        lib.net.sendResponse(200, chessGame, callback);
        return;
    }

    if (playerTwoUsername) {
        console.log("Another player already joined this game", playerTwoUsername);
        lib.net.sendResponse(400, "Can't join this game another player already joined", callback);
        return;
    }

    let joinedGame;
    try {
        const response = await lib.data.chess_lobby.joinGame({
            gameId: key,
            gameCreatedTime: createdTime,
            playerUsername: joiningPlayer.username,
            playerPicture: joiningPlayer.picture
        });

        joinedGame = response.Attributes;
    } catch (e) {
        console.log("Exception caught when trying to join the game", e)
    }

    console.log("Succesfully joiend the game");

    // console.log("Connections: " + JSON.stringify(joinedGame.playerConnections));
    //
    // const dropConnection = (connectionId) => {
    //     lib.data.chess_lobby.dropChessConnection(joinedGame, connectionId)
    // };
    //
    // const message = {
    //     type: "PLAYER_JOINED_GAME",
    //     payload: {
    //         key: joinedGame.key,
    //         gameName: joinedGame.gameName,
    //         joiningPlayer: joinedGame.playerTwoUsername,
    //         playerOneUsername: joinedGame.playerOneUsername,
    //         playerTwoUsername: joinedGame.playerTwoUsername,
    //         playerOnePicture: joinedGame.playerOnePicture,
    //         playerTwoPicture: joinedGame.playerTwoPicture
    //     }
    // };
    //
    // try {
    //     await lib.net.websocketSendMessages({
    //         postData: message,
    //         connections: joinedGame.playerConnections,
    //         dropConnection,
    //         event: event
    //     })
    // } catch (e) {
    //     console.log("Failed to notify players about the join event", e);
    // }

    const joinedGameResponse = { ...joinedGame, playerConnections: null };

    lib.net.sendResponse(200, joinedGameResponse, callback);
};

module.exports = putHandler;
