const handlePost = require("./requests/handlePost");
const handleGet = require("./requests/handleGet");

const lambda = (lib) => (event, context, callback) => {
    lib.log("Event", event);
    if (event.httpMethod === "OPTIONS") {
        lib.net.sendResponse(200, "", callback);
        return;
    }

    const authData = lib.auth.getAuthentity(event);

    if (authData.error) {
        lib.log(authData);
        lib.net.sendResponse(401, "Invalid authentity", callback);
        return;
    }

    if (event.requestContext.domainName !== "api.gierki.net") {
        lib.log("Access attempted from wrong domain", event.requestContext.domainName);
        lib.net.sendResponse(401, "Unauthorized Endpoint", callback);
        return;
    }

    switch (event.httpMethod) {
        case "GET":
            handleGet(lib)(event, context, callback, authData.authentity);
            break;
        case "POST":
            handlePost(lib)(event, context, callback, authData.authentity);
            break;
        case "PUT":
            break;
        default:
            lib.net.sendResponse(404, `Unsupported method "${event.httpMethod}"`, callback);
    }
};

module.exports = lambda;
