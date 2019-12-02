"use strict";

const sampleEvent = require("./sample-put-event");
const sampleChessgame = require("./sample_chess_game");
const lib = require("../../library/dependencies/library");
const makeSpy = require('../../library/dependencies/test/makeSpy');
const assert = require('assert');
const lambda = require('../handler/lambda');

(async () => {
    const callbackSpy = makeSpy();
    const sendResponseSpy = makeSpy();

    const newLib = {
        ...lib,
        now: () => 1574120031875,
        net: {
            sendResponse: sendResponseSpy
        }
    };

    await lib.data.chess_lobby.createItem(sampleChessgame);
    const underTest = lambda(newLib);

    await underTest(sampleEvent, {}, callbackSpy);
    const result = sendResponseSpy.callArgs()[0];
    assert.equal(result[0], 200);
    assert.equal(result[1].playerTwoPicture, 'https://lh3.googleusercontent.com/a-/AAuE7mBWe1Nv4LxFR49rFB2ivmT8kHcau8HTZuwktORb=s96-c');
    assert.equal(result[1].playerTwoUsername, 'Google_109354484677663308178');
})();
