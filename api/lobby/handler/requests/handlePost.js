const lib = require("szachista-lib");
const uuidv1 = require("uuid/v1");

module.exports = handlePost = (event, context, callback, accessData) => {
    const NOW = Date.now();
    let payload;

    try {
        payload = JSON.parse(event.body);
    } catch (err) {
        console.log(err);
        lib.net.sendResponse(400, "Bad body", callback)
    }

    if (!payload) {
        lib.net.sendResponse(400, "Body missing", callback)
    }

    const {
        timeAllowed,
        tokensToEnter,
        gameName,
        password
    } = payload;

    if (!timeAllowed) {
        lib.net.sendResponse(400, "Time allowed is missing", callback)
        return;
    }

    if (!Number.isInteger(timeAllowed)) {
        lib.net.sendResponse(400, "Time allowed is wrong format", callback)
        return;
    }

    if (timeAllowed < 60 * 1000 || timeAllowed > 60 * 60 * 1000) {
        lib.net.sendResponse(400, "Time allowed needs to be between 1 minute and 60 minutes", callback)
        return;
    }

    if (!Number.isInteger(tokensToEnter)) {
        lib.net.sendResponse(400, "Tokens to enter is wrong format", callback)
        return;
    }

    if (tokensToEnter < 0 || tokensToEnter > 9999) {
        lib.net.sendResponse(400, "Tokens to enter needs to be between 1 and 9999", callback)
        return;
    }

    if (typeof gameName !== "string") {
        lib.net.sendResponse(400, "Game name is wrong format", callback)
        return;
    }

    if (gameName.trim().length < 5 || gameName.trim().length > 25) {
        lib.net.sendResponse(400, "Game name needs to be between 5 and 25 characters", callback)
        return;
    }

    if (typeof password !== "string") {
        lib.net.sendResponse(400, "Password is wrong format", callback)
        return;
    }

    if (password.trim().length < 0 || password.trim().length > 50) {
        lib.net.sendResponse(400, "Password needs to be between 0 and 50 characters", callback)
        return;
    }

    const userAtributes = accessData.UserAttributes.reduce((object, value) => {
        return {
            ...object,
            [value.Name]: value.Value
        };
    }, {});

    const item = {
        key: uuidv1(),
        gameName: gameName.trim(),
        password: password.trim() || "NOTREQUIRED",
        createdTime: NOW,
        lastActivity: NOW,
        lastActivityDay: new Date().toISOString().substr(0, 10),
        timeAllowed,
        tokensToEnter,
        playerOneUsername: accessData.Username,
        playerOnePicture: userAtributes.picture,
        playerTwoUsername: null,
        playerTwoPicture: null
    };

    lib.data.chess_lobby.createItem(item)
        .then(() => {
            lib.net.sendResponse(200, {
                ...item,
                password: item.password ? "REQUIRED" : "NOTREQUIRED"
            }, callback)
        })
        .catch(err => {
            console.log(err);
            lib.net.sendResponse(500, "Unexpected error", callback)
        });
};
