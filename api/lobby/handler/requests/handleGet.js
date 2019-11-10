const getActiveGames = (lib) => (event, context, callback/*, accessData */) => {
    const acceptedThreshold = Date.now() - 1000 * 60 * 5;

    lib.data.chess_lobby.getActiveGames(acceptedThreshold)
        .then((response) => {

            const mapped = response.Items.map((item) => {
                return {
                    ...item,
                    password: item.password ? "REQUIRED" : "NOTREQUIRED"
                }
            });

            lib.net.sendResponse(200, mapped, callback)
        })
        .catch(err => {
            lib.log(err);
            lib.net.sendResponse(500, "Unexpected error", callback)
        });
};

module.exports = handlePost = (lib) => (event, context, callback, accessData) => {
    if (event.resource === "/") {
        getActiveGames(lib)(event, context, callback, accessData);
    } else {
        lib.net.sendResponse(404, `Unsupported path "${event.path}"`, callback);
    }
};
