const assert = require('assert');
const lambda = require('../handler/lambda');
const makespy = require('../../library/dependencies/test/makeSpy');

function willRespondWith200ToOptions() {
    const mock_lib = {
        net: {
            sendResponse: makespy()
        },
        log: makespy(),
    };

    const sample_options = require('./sample-options-event');
    const underTest = lambda(mock_lib);
    const sample_context = null;

    underTest(sample_options, sample_context, () => {
    });

    const sendResponseCalledArgs = mock_lib.net.sendResponse.callArgs()[0];

    assert.equal(sendResponseCalledArgs['0'], 200);
}

function willReturnLobbyGamesAfterAGetRequest() {
    const getAuthentity = require("../../library/dependencies/library/auth/getAuthentity");
    const sample_chess_lobby_items = require("./sample_chess_lobby_items");
    const mock_lib = {
        net: {
            sendResponse: makespy(() => {
                const args = mock_lib.net.sendResponse.callArgs()[0]
                assert.equal(args['0'], 200)
                assert.equal(args[1][0].password, "REQUIRED")
            })
        },
        log: makespy(),
        auth: {
            getAuthentity: makespy(getAuthentity)
        },
        data: {
            chess_lobby: {
                getActiveGames: makespy(() => Promise.resolve(sample_chess_lobby_items))
            }
        }
    };

    const sample_get = require('./sample-get-event');
    const underTest = lambda(mock_lib);
    const sample_context = null;

    underTest(sample_get, sample_context, () => {});
}

function willFailToReturnLobbyGamesAfterAGetRequest() {
    const getAuthentity = require("../../library/dependencies/library/auth/getAuthentity");
    const mock_lib = {
        net: {
            sendResponse: makespy(() => {
                const args = mock_lib.net.sendResponse.callArgs()[0]
                assert.equal(args['0'], 500)
            })
        },
        log: makespy(),
        auth: {
            getAuthentity: makespy(getAuthentity)
        },
        data: {
            chess_lobby: {
                getActiveGames: makespy(() => Promise.reject("Something went wrong"))
            }
        }
    };

    const sample_get = require('./sample-get-event');
    const underTest = lambda(mock_lib);
    const sample_context = null;

    underTest(sample_get, sample_context, () => {});
}

function willCreateItem() {
    const getAuthentity = require("../../library/dependencies/library/auth/getAuthentity");
    const mock_lib = {
        net: {
            sendResponse: makespy(() => {
                const args = mock_lib.net.sendResponse.callArgs()[0]
                assert.equal(args['0'], 200)
                assert.equal(args['1'].gameName, "Test1234");
                assert.equal(args['1'].key, "some_random_id");
                assert.equal(args['1'].password, "REQUIRED");
            })
        },
        log: makespy(),
        auth: {
            getAuthentity: makespy(getAuthentity)
        },
        data: {
            chess_lobby: {
                createItem: makespy(() => Promise.resolve())
            }
        },
        uuid: () => "some_random_id"
    };

    const sample_get = require('./sample-post-event');
    const underTest = lambda(mock_lib);
    const sample_context = null;

    underTest(sample_get, sample_context, () => {});
}

function willFailToCreateAnItem() {
    const getAuthentity = require("../../library/dependencies/library/auth/getAuthentity");
    const mock_lib = {
        net: {
            sendResponse: makespy(() => {
                const args = mock_lib.net.sendResponse.callArgs()[0]
                assert.equal(args['0'], 500)
            })
        },
        log: makespy(),
        auth: {
            getAuthentity: makespy(getAuthentity)
        },
        data: {
            chess_lobby: {
                createItem: makespy(() => Promise.reject())
            }
        },
        uuid: () => "some_random_id"
    };

    const sample_get = require('./sample-post-event');
    const underTest = lambda(mock_lib);
    const sample_context = null;

    underTest(sample_get, sample_context, () => {});
}

willRespondWith200ToOptions();
willReturnLobbyGamesAfterAGetRequest();
willFailToReturnLobbyGamesAfterAGetRequest();
willCreateItem();
willFailToCreateAnItem();
