"use strict";

const sampleEvent = require("./sampleEvent");
const lib = require("../../../library/dependencies/library");
const makeSpy = require('../../../library/dependencies/test/makeSpy');
const lambda = require("../lambda");
const assert = require('assert');


(async () => {
    const underTest = lambda(lib);
    const callbackSpy = makeSpy();
    lib.now = () => 1574120031875;

    await underTest(sampleEvent, {}, callbackSpy);

    console.log(callbackSpy.callArgs())
})();
