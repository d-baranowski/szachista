const databaseManager = require("../database-manager");
const sendResponse = require("../sendResponse");


const getActiveGames = (event, context, callback/*, accessData */) => {
    const acceptedThreshold = Date.now() - 1000 * 60 * 5;

    databaseManager.getActiveGames(acceptedThreshold)
        .then((items) => {

            const mapped = items.Items.map((item) => {
                return {
                    ...item,
                    password: item.password ? "REQUIRED" : "NOTREQUIRED"
                }
            });

            sendResponse(200, mapped, callback)
        })
        .catch(err => {
            console.log(err);
            sendResponse(500, "Unexpected error", callback)
        });
};

module.exports = handlePost = (event, context, callback, accessData) => {
    if (event.resource === "/") {
        getActiveGames(event, context, callback, accessData);
    } else {
        sendResponse(404, `Unsupported path "${event.path}"`, callback);
    }
};