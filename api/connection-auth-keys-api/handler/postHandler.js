const postHandler = (lib, dependencies) => async (event, context, callback) => {

    const validationResult = dependencies.validateEvent(event);

    if (!validationResult.valid) {
        return lib.net.sendResponse(400, validationResult.msg, callback);
    }

    const authData = lib.auth.getAuthentity(event);

    let existingUserData;
    let authContext;

    try {
        authContext = JSON.parse(event.body).authContext;
        const response = await lib.data.connection_auth_keys.getConnectionAuth(authData.authentity.Username, authContext);
        existingUserData = response.Item;
    } catch (e) {
        console.log(e);
        return lib.net.sendResponse(500, "Unexpected error", callback);
    }

    try {
        let newKey = await dependencies.generateNewToken(existingUserData, authContext, authData);
        return lib.net.sendResponse(200, newKey, callback);
    } catch (err) {
        console.log(err);
        return lib.net.sendResponse(500, "Unexpected Error", callback)
    }

};

module.exports = postHandler;
