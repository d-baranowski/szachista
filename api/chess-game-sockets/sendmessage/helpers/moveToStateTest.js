"use strict";

const moveToState = require("./moveToState");

(() => {
    const result = moveToState('8/5k2/8/8/4r3/2n5/8/2K5 b - - 9 123', {
        "color": "w",
        "from": "f2",
        "to": "f4",
        "flags": "b",
        "piece": "p",
        "san": "f4"
    });

    console.log(result)
})();
