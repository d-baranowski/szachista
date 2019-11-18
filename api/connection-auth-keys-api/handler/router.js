
const router = (handlers) => (event, context, callback) =>  {
    if (event.httpMethod === "OPTIONS") {
        return handlers.optionsHandler(event, context, callback);
    }

    if (event.httpMethod === "POST") {
        return handlers.postHandler(event, context, callback);
    }

    return handlers.notFoundHandler(event, context, callback);
};


module.exports = router;
