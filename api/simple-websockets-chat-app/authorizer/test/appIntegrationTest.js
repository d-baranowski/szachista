"use strict";

const sampleEvent = require("./sampleEvent");
const sampleAuthentity = require("./sampleAuthentity");
const lib = require("../../../library/dependencies/library");
const makeSpy = require('../../../library/dependencies/test/makeSpy');
const lambda = require("../lambda");
const assert = require('assert');

const sampleAccessItem = {
    "accessKeys": [
        {
            "accessKey": "e0d79d30-0a5b-11ea-9be7-c554a7f65d5b",
            "timestamp": 1574120031875
        },
        {
            "accessKey": "2162e440-0408-11ea-ac2a-03352547950b",
            "timestamp": 1574120031895
        },
        {
            "accessKey": "d96374e0-055e-11ea-845d-edc5fea22a78",
            "timestamp": 1574120031947
        }
    ],
    "authentity": JSON.stringify(sampleAuthentity),
    "authContext": "chess-lobby",
    "key": "Google_108858650188719526842"
};


(async () => {
    const underTest = lambda(lib);
    const callbackSpy = makeSpy();
    lib.now = () => 1574120031875;

    await lib.data.connection_auth_keys.saveItem(sampleAccessItem);

    await underTest(sampleEvent, {}, callbackSpy);

    assert.equal(callbackSpy.callArgs()[0][1].principalId, "user");
})();
