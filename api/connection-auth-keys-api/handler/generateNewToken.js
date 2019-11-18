const generateNewToken = (lib) => async (existingUserData, authContext, authData) => {
    let accessData;
    const newKey = lib.uuid();

    if (!authData) {
        throw {message: "Missing auth data"}
    }

    if (!authData.authentity || !authData.authentity.Username) {
        throw {message: "Missing username in authentity"};
    }

    if (existingUserData) {
        accessData = existingUserData;
        accessData.accessKeys.push({
            accessKey: newKey,
            timestamp: Date.now()
        })
    } else {
        accessData = {
            accessKeys: [{
                accessKey: newKey,
                timestamp: Date.now()
            }],
            authentity: JSON.stringify(authData.authentity),
            authContext: authContext,
            key: authData.authentity.Username,
        }
    }

    try {
        await lib.data.connection_auth_keys.saveItem(accessData);
        return Promise.resolve(newKey)
    } catch (e) {
        return Promise.reject(e);
    }
};


module.exports = generateNewToken;
