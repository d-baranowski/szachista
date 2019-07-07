const getAuthentity = event => {
    let authentity;
    let error;

    try {
        authentity = {
            ...JSON.parse(JSON.parse(event.requestContext.authorizer.stringified).authentity),
            requestId: event.requestContext.requestId,
            sourceIp: event.requestContext.identity.sourceIp,
            userAgent: event.requestContext.identity.userAgent
        };
    } catch (e) {
        error = e;
    }

    return {
        error,
        authentity
    };
};

module.exports = getAuthentity;