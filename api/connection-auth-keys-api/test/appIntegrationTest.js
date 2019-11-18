"use strict";

console.log("Loading function");

const lib = require("../../library/dependencies/library");
const router = require("../handler/router");
const generateNewToken = require('../handler/generateNewToken');
const validateEvent = require('../handler/validateEvent');
const postHandler = require('../handler/postHandler');
const sampleEvent = require('./events/postMultiTokensSupport');
const makeSpy = require('../../library/dependencies/test/makeSpy');
const assert = require('assert');


const appRouter = router({
    optionsHandler: (/*event, context, callback*/) => {
        return lib.net.sendResponse(200, "", callback);
    },
    notFoundHandler: (event/*context, callback*/) => {
        return lib.net.sendResponse(404, `Unsupported method "${event.httpMethod}"`, callback);
    },

    postHandler: postHandler(lib, {
        generateNewToken: generateNewToken(lib),
        validateEvent: validateEvent(lib)
    })
});


const lambda = async (event, context, callback) => {
    console.log("Event", event);
    return appRouter(event, context, callback);
};


(async () => {
    const userData = JSON.parse(sampleEvent.requestContext.authorizer.stringified);
    const body = JSON.parse(sampleEvent.body);
    const callbackSpy = makeSpy();
    await lib.data.connection_auth_keys.deleteConnectionAuthKey(userData.Username, body.authContext);

    await lambda(sampleEvent, {}, callbackSpy);
    await lambda(sampleEvent, {}, callbackSpy);
    await lambda(sampleEvent, {}, callbackSpy);


    const connectionAuthData = await lib.data.connection_auth_keys.getConnectionAuth(userData.Username, body.authContext);
    assert.equal(JSON.parse(connectionAuthData.Item.authentity).Username, userData.Username);
    callbackSpy.callArgs().map(argsObject => JSON.parse(argsObject[1].body)).forEach(accessKey => {
        const collection = connectionAuthData.Item.accessKeys;
        let containsMatch = false;
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].accessKey === accessKey) {
                containsMatch = true;
                break;
            }
        }

        assert.equal(containsMatch, true)
    });
 })();
