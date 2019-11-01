'use strict';

const lib = require("szachista-lib");

const removePath = (val) => {
    const arr = val.split("/");

    return arr[0] + "/*"
};

exports.handler = (event, context, callback) => {
    console.log("Event: ", event);

	const token = event.authorizationToken;

	lib.auth.authenticateToken(token)
	.then(response => {
		callback(null, lib.auth.generatePolicy('user', 'Allow', removePath(event.methodArn), response));
	})
	.catch((error) => {
		console.log(error);
		callback("Unauthorized");
	});
};
