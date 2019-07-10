
function sendResponse(statusCode, message, callback) {
    const response = {
        statusCode: statusCode,
        body: JSON.stringify(message),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
            "Access-Control-Allow-HEADERS": "Authorization, Content-Type"
        }
    };
    callback(null, response);
}

module.exports = sendResponse;