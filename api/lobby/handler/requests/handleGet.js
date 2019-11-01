const lib = require("szachista-lib");

const getActiveGames = (event, context, callback/*, accessData */) => {
    const acceptedThreshold = Date.now() - 1000 * 60 * 5;

    lib.data.chess_lobby.getActiveGames(acceptedThreshold)
        .then((items) => {

            const mapped = items.Items.map((item) => {
                return {
                    ...item,
                    password: item.password ? "REQUIRED" : "NOTREQUIRED"
                }
            });

            lib.net.sendResponse(200, mapped, callback)
        })
        .catch(err => {
            console.log(err);
            lib.net.sendResponse(500, "Unexpected error", callback)
        });
};

module.exports = handlePost = (event, context, callback, accessData) => {
    if (event.resource === "/") {
        getActiveGames(event, context, callback, accessData);
    } else {
        lib.net.sendResponse(404, `Unsupported path "${event.path}"`, callback);
    }
};
