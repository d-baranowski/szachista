console.log('Loading function');

var jwt = require('jsonwebtoken');
var request = require('request'); 
var jwkToPem = require('jwk-to-pem');

var userPoolId = 'eu-west-1_zwqFAay0e';
var region = 'eu-west-1'; //e.g. us-east-1
var iss = 'https://cognito-idp.' + region + '.amazonaws.com/' + userPoolId;
var pems;

/* Event
{
    "type": "REQUEST",
    "methodArn": "arn:aws:execute-api:eu-west-1:277265293752:7vc2qsma27/prod/$connect",
    "headers": {
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,pl;q=0.7",
        "Cache-Control": "no-cache",
        "Connection": "upgrade",
        "content-length": "0",
        "Host": "7vc2qsma27.execute-api.eu-west-1.amazonaws.com",
        "Origin": "http://localhost:3000",
        "Pragma": "no-cache",
        "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
        "Sec-WebSocket-Key": "H8o+ZMhMU0zsK6p/erqEZw==",
        "Sec-WebSocket-Version": "13",
        "Upgrade": "websocket",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
        "X-Amzn-Trace-Id": "Root=1-5cf1a61f-320f8288cdae56438255ae54",
        "X-Forwarded-For": "88.98.243.200",
        "X-Forwarded-Port": "443",
        "X-Forwarded-Proto": "https"
    },
    "multiValueHeaders": {
        "Accept-Encoding": [
            "gzip, deflate, br"
        ],
        "Accept-Language": [
            "en-GB,en-US;q=0.9,en;q=0.8,pl;q=0.7"
        ],
        "Cache-Control": [
            "no-cache"
        ],
        "Connection": [
            "upgrade"
        ],
        "content-length": [
            "0"
        ],
        "Host": [
            "7vc2qsma27.execute-api.eu-west-1.amazonaws.com"
        ],
        "Origin": [
            "http://localhost:3000"
        ],
        "Pragma": [
            "no-cache"
        ],
        "Sec-WebSocket-Extensions": [
            "permessage-deflate; client_max_window_bits"
        ],
        "Sec-WebSocket-Key": [
            "H8o+ZMhMU0zsK6p/erqEZw=="
        ],
        "Sec-WebSocket-Version": [
            "13"
        ],
        "Upgrade": [
            "websocket"
        ],
        "User-Agent": [
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
        ],
        "X-Amzn-Trace-Id": [
            "Root=1-5cf1a61f-320f8288cdae56438255ae54"
        ],
        "X-Forwarded-For": [
            "88.98.243.200"
        ],
        "X-Forwarded-Port": [
            "443"
        ],
        "X-Forwarded-Proto": [
            "https"
        ]
    },
    "queryStringParameters": {
        "QueryAuth1": "queryValue1",
        "Authorizer": "12345"
    },
    "multiValueQueryStringParameters": {
        "QueryAuth1": [
            "queryValue1"
        ],
        "Authorizer": [
            "12345"
        ]
    },
    "stageVariables": {
        "test": "this",
        "whyIsThisSoHard": "whyIsThisSoHard"
    },
    "requestContext": {
        "routeKey": "$connect",
        "messageId": null,
        "eventType": "CONNECT",
        "extendedRequestId": "akbk5GhrjoEFSOw=",
        "requestTime": "31/May/2019:22:09:35 +0000",
        "messageDirection": "IN",
        "stage": "prod",
        "connectedAt": 1559340575324,
        "requestTimeEpoch": 1559340575321,
        "identity": {
            "cognitoIdentityPoolId": null,
            "cognitoIdentityId": null,
            "principalOrgId": null,
            "cognitoAuthenticationType": null,
            "userArn": null,
            "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
            "accountId": null,
            "caller": null,
            "sourceIp": "88.98.243.200",
            "accessKey": null,
            "cognitoAuthenticationProvider": null,
            "user": null
        },
        "requestId": "akbk5GhrjoEFSOw=",
        "domainName": "7vc2qsma27.execute-api.eu-west-1.amazonaws.com",
        "connectionId": "akbk5fZMjoECFYw=",
        "apiId": "7vc2qsma27"
    }
}
*/

/* context
{
    "callbackWaitsForEmptyEventLoop": true,
    "functionVersion": "$LATEST",
    "functionName": "szachista-chat-AuthorizerFunction-J51TWGCGEBRZ",
    "memoryLimitInMB": "256",
    "logGroupName": "/aws/lambda/szachista-chat-AuthorizerFunction-J51TWGCGEBRZ",
    "logStreamName": "2019/05/31/[$LATEST]b6392025bf4142d4bf92e96940a20f3a",
    "invokedFunctionArn": "arn:aws:lambda:eu-west-1:277265293752:function:szachista-chat-AuthorizerFunction-J51TWGCGEBRZ",
    "awsRequestId": "4c0be1fc-7f90-4d31-a07b-e08102b127a4"
}
*/

exports.handler = function(event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    console.log('Received context:', JSON.stringify(context, null, 2));


    //Download PEM for your UserPool if not already downloaded
    if (!pems) {
    //Download the JWKs and save it as PEM
    request({
       url: iss + '/.well-known/jwks.json',
       json: true
     }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            pems = {};
            var keys = body['keys'];
            for(var i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent};
                pems[key_id] = jwkToPem(jwk);
            }
            //Now continue with validating the token
            ValidateToken(pems, event, context);
        } else {
            //Unable to download JWKs, fail the call
            context.fail("error");
        }
    });
    } else {
        //PEMs are already downloaded, continue with validating the token
        ValidateToken(pems, event, context);
    };
};

function ValidateToken(pems, event, context) {
    var token = event.queryStringParameters.Authorizer;
    //Fail if the token is not jwt
    var decodedJwt = jwt.decode(token, {complete: true});
    if (!decodedJwt) {
        console.log("Not a valid JWT token");
        context.fail("Unauthorized");
        return;
    }

    //Fail if token is not from your UserPool
    if (decodedJwt.payload.iss !== iss) {
        console.log("invalid issuer");
        context.fail("Unauthorized");
        return;
    }

    //Reject the jwt if it's not an 'Access Token'
    if (decodedJwt.payload.token_use !== 'access') {
        console.log("Not an access token");
        context.fail("Unauthorized");
        return;
    }

    //Get the kid from the token and retrieve corresponding PEM
    var kid = decodedJwt.header.kid;
    var pem = pems[kid];
    if (!pem) {
        console.log('Invalid access token');
        context.fail("Unauthorized");
        return;
    }

    //Verify the signature of the JWT token to ensure it's really coming from your User Pool

    jwt.verify(token, pem, { issuer: iss }, function(err, payload) {
      if(err) {
        context.fail("Unauthorized");
      } else {
        //Valid token. Generate the API Gateway policy for the user
        //Always generate the policy on value of 'sub' claim and not for 'username' because username is reassignable
        //sub is UUID for a user which is never reassigned to another user.
        var principalId = payload.sub;

        //Get AWS AccountId and API Options
        var apiOptions = {};
        var tmp = event.methodArn.split(':');
        var apiGatewayArnTmp = tmp[5].split('/');
        var awsAccountId = tmp[4];
        apiOptions.region = tmp[3];
        apiOptions.restApiId = apiGatewayArnTmp[0];
        apiOptions.stage = apiGatewayArnTmp[1];
        var method = apiGatewayArnTmp[2];
        var resource = '/'; // root resource
        if (apiGatewayArnTmp[3]) {
            resource += apiGatewayArnTmp[3];
        }
        //For more information on specifics of generating policy, refer to blueprint for API Gateway's Custom authorizer in Lambda console
        var policy = new AuthPolicy(principalId, awsAccountId, apiOptions);
        policy.allowAllMethods();
        context.succeed(policy.build());
      }
    });
}

/**
 * AuthPolicy receives a set of allowed and denied methods and generates a valid
 * AWS policy for the API Gateway authorizer. The constructor receives the calling
 * user principal, the AWS account ID of the API owner, and an apiOptions object.
 * The apiOptions can contain an API Gateway RestApi Id, a region for the RestApi, and a
 * stage that calls should be allowed/denied for. For example
 * {
 *   restApiId: "xxxxxxxxxx",
 *   region: "us-east-1",
 *   stage: "dev"
 * }
 *
 * var testPolicy = new AuthPolicy("[principal user identifier]", "[AWS account id]", apiOptions);
 * testPolicy.allowMethod(AuthPolicy.HttpVerb.GET, "/users/username");
 * testPolicy.denyMethod(AuthPolicy.HttpVerb.POST, "/pets");
 * context.succeed(testPolicy.build());
 *
 * @class AuthPolicy
 * @constructor
 */
function AuthPolicy(principal, awsAccountId, apiOptions) {
    /**
     * The AWS account id the policy will be generated for. This is used to create
     * the method ARNs.
     *
     * @property awsAccountId
     * @type {String}
     */
    this.awsAccountId = awsAccountId;

    /**
     * The principal used for the policy, this should be a unique identifier for
     * the end user.
     *
     * @property principalId
     * @type {String}
     */
    this.principalId = principal;

    /**
     * The policy version used for the evaluation. This should always be "2012-10-17"
     *
     * @property version
     * @type {String}
     * @default "2012-10-17"
     */
    this.version = "2012-10-17";

    /**
     * The regular expression used to validate resource paths for the policy
     *
     * @property pathRegex
     * @type {RegExp}
     * @default '^\/[/.a-zA-Z0-9-\*]+$'
     */
    this.pathRegex = new RegExp('^[/.a-zA-Z0-9-\*]+$');

    // these are the internal lists of allowed and denied methods. These are lists
    // of objects and each object has 2 properties: A resource ARN and a nullable
    // conditions statement.
    // the build method processes these lists and generates the approriate
    // statements for the final policy
    this.allowMethods = [];
    this.denyMethods = [];

    if (!apiOptions || !apiOptions.restApiId) {
        this.restApiId = "*";
    } else {
        this.restApiId = apiOptions.restApiId;
    }
    if (!apiOptions || !apiOptions.region) {
        this.region = "*";
    } else {
        this.region = apiOptions.region;
    }
    if (!apiOptions || !apiOptions.stage) {
        this.stage = "*";
    } else {
        this.stage = apiOptions.stage;
    }
};

/**
 * A set of existing HTTP verbs supported by API Gateway. This property is here
 * only to avoid spelling mistakes in the policy.
 *
 * @property HttpVerb
 * @type {Object}
 */
 AuthPolicy.HttpVerb = {
     GET     : "GET",
     POST    : "POST",
     PUT     : "PUT",
     PATCH   : "PATCH",
     HEAD    : "HEAD",
     DELETE  : "DELETE",
     OPTIONS : "OPTIONS",
     ALL     : "*"
 };

AuthPolicy.prototype = (function() {
    /**
     * Adds a method to the internal lists of allowed or denied methods. Each object in
     * the internal list contains a resource ARN and a condition statement. The condition
     * statement can be null.
     *
     * @method addMethod
     * @param {String} The effect for the policy. This can only be "Allow" or "Deny".
     * @param {String} he HTTP verb for the method, this should ideally come from the
     *                 AuthPolicy.HttpVerb object to avoid spelling mistakes
     * @param {String} The resource path. For example "/pets"
     * @param {Object} The conditions object in the format specified by the AWS docs.
     * @return {void}
     */
    var addMethod = function(effect, verb, resource, conditions) {
        if (verb != "*" && !AuthPolicy.HttpVerb.hasOwnProperty(verb)) {
            throw new Error("Invalid HTTP verb " + verb + ". Allowed verbs in AuthPolicy.HttpVerb");
        }

        if (!this.pathRegex.test(resource)) {
            throw new Error("Invalid resource path: " + resource + ". Path should match " + this.pathRegex);
        }

        var cleanedResource = resource;
        if (resource.substring(0, 1) == "/") {
                cleanedResource = resource.substring(1, resource.length);
        }
        var resourceArn = "arn:aws:execute-api:" +
            this.region + ":" +
            this.awsAccountId + ":" +
            this.restApiId + "/" +
            this.stage + "/" +
            verb + "/" +
            cleanedResource;

        if (effect.toLowerCase() == "allow") {
            this.allowMethods.push({
                resourceArn: resourceArn,
                conditions: conditions
            });
        } else if (effect.toLowerCase() == "deny") {
            this.denyMethods.push({
                resourceArn: resourceArn,
                conditions: conditions
            })
        }
    };

    /**
     * Returns an empty statement object prepopulated with the correct action and the
     * desired effect.
     *
     * @method getEmptyStatement
     * @param {String} The effect of the statement, this can be "Allow" or "Deny"
     * @return {Object} An empty statement object with the Action, Effect, and Resource
     *                  properties prepopulated.
     */
    var getEmptyStatement = function(effect) {
        effect = effect.substring(0, 1).toUpperCase() + effect.substring(1, effect.length).toLowerCase();
        var statement = {};
        statement.Action = "execute-api:Invoke";
        statement.Effect = effect;
        statement.Resource = [];

        return statement;
    };

    /**
     * This function loops over an array of objects containing a resourceArn and
     * conditions statement and generates the array of statements for the policy.
     *
     * @method getStatementsForEffect
     * @param {String} The desired effect. This can be "Allow" or "Deny"
     * @param {Array} An array of method objects containing the ARN of the resource
     *                and the conditions for the policy
     * @return {Array} an array of formatted statements for the policy.
     */
    var getStatementsForEffect = function(effect, methods) {
        var statements = [];

        if (methods.length > 0) {
            var statement = getEmptyStatement(effect);

            for (var i = 0; i < methods.length; i++) {
                var curMethod = methods[i];
                if (curMethod.conditions === null || curMethod.conditions.length === 0) {
                    statement.Resource.push(curMethod.resourceArn);
                } else {
                    var conditionalStatement = getEmptyStatement(effect);
                    conditionalStatement.Resource.push(curMethod.resourceArn);
                    conditionalStatement.Condition = curMethod.conditions;
                    statements.push(conditionalStatement);
                }
            }

            if (statement.Resource !== null && statement.Resource.length > 0) {
                statements.push(statement);
            }
        }

        return statements;
    };

    return {
        constructor: AuthPolicy,

        /**
         * Adds an allow "*" statement to the policy.
         *
         * @method allowAllMethods
         */
        allowAllMethods: function() {
            addMethod.call(this, "allow", "*", "*", null);
        },

        /**
         * Adds a deny "*" statement to the policy.
         *
         * @method denyAllMethods
         */
        denyAllMethods: function() {
            addMethod.call(this, "deny", "*", "*", null);
        },

        /**
         * Adds an API Gateway method (Http verb + Resource path) to the list of allowed
         * methods for the policy
         *
         * @method allowMethod
         * @param {String} The HTTP verb for the method, this should ideally come from the
         *                 AuthPolicy.HttpVerb object to avoid spelling mistakes
         * @param {string} The resource path. For example "/pets"
         * @return {void}
         */
        allowMethod: function(verb, resource) {
            addMethod.call(this, "allow", verb, resource, null);
        },

        /**
         * Adds an API Gateway method (Http verb + Resource path) to the list of denied
         * methods for the policy
         *
         * @method denyMethod
         * @param {String} The HTTP verb for the method, this should ideally come from the
         *                 AuthPolicy.HttpVerb object to avoid spelling mistakes
         * @param {string} The resource path. For example "/pets"
         * @return {void}
         */
        denyMethod : function(verb, resource) {
            addMethod.call(this, "deny", verb, resource, null);
        },

        /**
         * Adds an API Gateway method (Http verb + Resource path) to the list of allowed
         * methods and includes a condition for the policy statement. More on AWS policy
         * conditions here: http://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html#Condition
         *
         * @method allowMethodWithConditions
         * @param {String} The HTTP verb for the method, this should ideally come from the
         *                 AuthPolicy.HttpVerb object to avoid spelling mistakes
         * @param {string} The resource path. For example "/pets"
         * @param {Object} The conditions object in the format specified by the AWS docs
         * @return {void}
         */
        allowMethodWithConditions: function(verb, resource, conditions) {
            addMethod.call(this, "allow", verb, resource, conditions);
        },

        /**
         * Adds an API Gateway method (Http verb + Resource path) to the list of denied
         * methods and includes a condition for the policy statement. More on AWS policy
         * conditions here: http://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html#Condition
         *
         * @method denyMethodWithConditions
         * @param {String} The HTTP verb for the method, this should ideally come from the
         *                 AuthPolicy.HttpVerb object to avoid spelling mistakes
         * @param {string} The resource path. For example "/pets"
         * @param {Object} The conditions object in the format specified by the AWS docs
         * @return {void}
         */
        denyMethodWithConditions : function(verb, resource, conditions) {
            addMethod.call(this, "deny", verb, resource, conditions);
        },

        /**
         * Generates the policy document based on the internal lists of allowed and denied
         * conditions. This will generate a policy with two main statements for the effect:
         * one statement for Allow and one statement for Deny.
         * Methods that includes conditions will have their own statement in the policy.
         *
         * @method build
         * @return {Object} The policy object that can be serialized to JSON.
         */
        build: function() {
            if ((!this.allowMethods || this.allowMethods.length === 0) &&
                    (!this.denyMethods || this.denyMethods.length === 0)) {
                throw new Error("No statements defined for the policy");
            }

            var policy = {};
            policy.principalId = this.principalId;
            var doc = {};
            doc.Version = this.version;
            doc.Statement = [];

            doc.Statement = doc.Statement.concat(getStatementsForEffect.call(this, "Allow", this.allowMethods));
            doc.Statement = doc.Statement.concat(getStatementsForEffect.call(this, "Deny", this.denyMethods));

            policy.policyDocument = doc;

            return policy;
        }
    };

})();