console.log('Loading function');

const lib = require("/opt/library");
const lambda = require("./lambda");

exports.handler = lambda(lib);
