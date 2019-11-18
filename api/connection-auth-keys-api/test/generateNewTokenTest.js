const assert = require('assert');
const makespy = require('../../library/dependencies/test/makeSpy');
const generateNewToken = require('../handler/generateNewToken');


// Given there are no existing access keys save an element with a single access key
(async () => {
    const library = {
        uuid: makespy(() => "some-random-uuid"),
        net: {
            sendResponse: makespy()
        },
        data: {
            connection_auth_keys: {
                saveItem: makespy(() => Promise.resolve())
            }
        }
    };

    const underTest = generateNewToken(library);
    await underTest(null, "some-game-id", {authentity: {Username: "Some-Google-Id"}});

    assert.equal(library.data.connection_auth_keys.saveItem.callArgs()[0][0].accessKeys.length, 1);
    assert.equal(library.data.connection_auth_keys.saveItem.callArgs()[0][0].accessKeys[0].accessKey, "some-random-uuid");
})();


// Given there already exists an item add the second item to the array
(async () => {
    const library = {
        uuid: makespy(() => "some-random-uuid"),
        net: {
            sendResponse: makespy()
        },
        data: {
            connection_auth_keys: {
                saveItem: makespy(() => Promise.resolve())
            }
        }
    };

    const sampleConnectionAuthItem = {
        "accessKeys": [
            {
                "accessKey": "some-random-uuid",
                "timestamp": 1573900504525
            }
        ],
        "authentity": "{\"Username\":\"Some-Google-Id\"}",
        "authContext": "some-game-id",
        "key": "Some-Google-Id"
    };

    const underTest = generateNewToken(library);

    await underTest(sampleConnectionAuthItem, "some-game-id", {authentity: {Username: "Some-Google-Id"}});

    assert.equal(library.data.connection_auth_keys.saveItem.callArgs()[0][0].accessKeys.length, 2);
    assert.equal(library.data.connection_auth_keys.saveItem.callArgs()[0][0].accessKeys[0].accessKey, "some-random-uuid");
    assert.equal(library.data.connection_auth_keys.saveItem.callArgs()[0][0].accessKeys[1].accessKey, "some-random-uuid");

})();

