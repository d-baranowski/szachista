const handlePost = require("./requests/handlePost");
const handleGet = require("./requests/handleGet");
const handlePut = require("./requests/handlePut");

/*
Use put to join games.
You can only join as player two.
If player one decides to leave just delete the game and notify player two that the game has ended to keep things simple.
If a player leaves after the game has started the other player get a win and the leaving player gets a loss.
 */

const lambda = (lib) => async (event, context, callback) => {
    console.log("Event", event);
    if (event.httpMethod === "OPTIONS") {
        lib.net.sendResponse(200, "", callback);
        return;
    }

    let authData;
    try {
        authData = lib.auth.getAuthentity(event);
    } catch (e) {
        console.log(e)
        lib.net.sendResponse(401, "Invalid authentity", callback);
        return;
    }

    if (authData.error) {
        console.log(authData);
        lib.net.sendResponse(401, "Invalid authentity", callback);
        return;
    }

    if (event.requestContext.domainName !== "api.gierki.net") {
        console.log("Access attempted from wrong domain", event.requestContext.domainName);
        lib.net.sendResponse(401, "Unauthorized Endpoint", callback);
        return;
    }

    switch (event.httpMethod) {
        case "GET":
            await handleGet(lib)(event, context, callback, authData.authentity);
            break;
        case "POST":
            await handlePost(lib)(event, context, callback, authData.authentity);
            break;
        case "PUT":
            await handlePut(lib)(event, context, callback, authData.authentity);
            break;
        default:
            lib.net.sendResponse(404, `Unsupported method "${event.httpMethod}"`, callback);
    }
};

module.exports = lambda;
