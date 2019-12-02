"use strict";

const sampleEvent = require("./sampleEvent");
const sampleChessgame = require("./sampleChessgame");
const lib = require("../../../library/dependencies/library");
const makeSpy = require('../../../library/dependencies/test/makeSpy');
const assert = require('assert');
const lambda = require('../lambda');

(async () => {
    const callbackSpy = makeSpy();
    const websocketSendMessagesSpy = makeSpy();

    const newLib = {
        ...lib,
        now: () => 1574120031875,
        net: {
            websocketSendMessages: websocketSendMessagesSpy
        }
    };

    await lib.data.chess_lobby.createItem(sampleChessgame);

    const response = await lambda(newLib)(sampleEvent, {}, callbackSpy); /*?*/
    const expectedMessage = {action: 'PLAYER_READY_STATE_CHANGED', payload: {}};
    const actualMessage = websocketSendMessagesSpy.callArgs()[0][0].message; /*?*/

    assert.equal(response.statusCode, 200);
    assert.equal(response.body, 'Successfully updated player ready state');
    assert.equal(actualMessage.action, expectedMessage.action);
    assert.equal(actualMessage.payload.gameId, '3f9d8020-055f-11ea-becd-b110d3f5669b');
    assert.equal(actualMessage.payload.player, "playerOne");
})();
