'use strict';

const authenticateToken = require('./authenticate-token');

const removePath = (val) => {
    const arr = val.split("/");

    return arr[0] + "/*"
};

exports.handler = (event, context, callback) => {
    console.log("Event: ", event);

	const token = event.authorizationToken;

	authenticateToken.default(token)
	.then(response => {
		callback(null, generatePolicy('user', 'Allow', removePath(event.methodArn), response));
	})
	.catch((error) => {
		console.log(error);
		callback("Unauthorized");
	});	
};

const generatePolicy = function(principalId, effect, resource, context) {
    let authResponse = {};

    authResponse.principalId = principalId;
    if (effect && resource) {
        let policyDocument = {};
        policyDocument.Version = '2012-10-17'; 
        policyDocument.Statement = [];
        let statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }

    // Optional output with custom properties of the String, Number or Boolean type.
    authResponse.context = { stringified: JSON.stringify(context) };
    return authResponse;
};