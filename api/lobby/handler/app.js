"use strict";

console.log("Loading function");

const lib = require("/opt/library");
const lambda = require("./lambda");


module.exports.handler = lambda(lib);
