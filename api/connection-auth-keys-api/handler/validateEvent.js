
const validateEvent = (lib, callback) => (event) => {
    const authData = lib.auth.getAuthentity(event);

    if (authData.error) {
        console.log(authData);
        lib.net.sendResponse(401, "Invalid authentity", callback);
        return { valid: false, msg: "Invalid authentity" };
    }

    if (event.requestContext.domainName !== "api.gierki.net") {
        console.log("Access attempted from wrong domain", event.requestContext.domainName);
        lib.net.sendResponse(401, "Unauthorized Endpoint", callback);
        return { valid: false, msg: "Unauthorized Endpoint" };
    }

    if (event.requestContext.apiId !== "u28fta85u6") {
        console.log("Access attempted from wrong api", event.requestContext.apiId);
        lib.net.sendResponse(401, "Unauthorized Endpoint", callback);
        return { valid: false, msg: "Unauthorized Endpoint" };
    }

    return { valid: true, msg: "" }
};

module.exports = validateEvent;
