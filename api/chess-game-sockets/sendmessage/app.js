console.log("Loading function");

const lib = require("/opt/library");
const lambda = require("./lambda");


exports.handler = async (event, context) => {
    let response;
    try {
        response = await lambda(lib)(event, context);
    } catch (e) {
        console.log(e);
        return {statusCode: 500, error: e}
    }

    return response;
};
