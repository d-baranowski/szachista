console.log('Loading function');

const jwt = require('jsonwebtoken');
const request = require('request');
const jwkToPem = require('jwk-to-pem');

const userPoolId = 'eu-west-1_zwqFAay0e';
const region = 'eu-west-1';
const iss = 'https://cognito-idp.' + region + '.amazonaws.com/' + userPoolId;


exports.default = function (token) {
    return new Promise((resolve, reject) => {
        //Download the JWKs and save it as PEM
        request({
            url: iss + '/.well-known/jwks.json',
            json: true
        }, function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }

            if (response.statusCode !== 200) {
                reject("Unexpected response " + JSON.stringify(response))
                return;
            }

            let pems = {};
            const keys = body['keys'];

            for (let i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                const key_id = keys[i].kid;
                const modulus = keys[i].n;
                const exponent = keys[i].e;
                const key_type = keys[i].kty;
                const jwk = {kty: key_type, n: modulus, e: exponent};
                pems[key_id] = jwkToPem(jwk);
            }


            //Fail if the token is not jwt
            const decodedJwt = jwt.decode(token, {complete: true});

            if (!decodedJwt) {
                reject("Not a valid JWT token");
                return;
            }

            //Fail if token is not from your UserPool
            if (decodedJwt.payload.iss !== iss) {
                reject("invalid issuer");
                return;
            }

            //Reject the jwt if it's not an 'Access Token'
         /*   if (decodedJwt.payload.token_use !== 'access') {
                reject("Not an access token");
                return;
            }*/

            //Get the kid from the token and retrieve corresponding PEM
            const kid = decodedJwt.header.kid;
            const pem = pems[kid];

            if (!pem) {
                reject('Invalid access token');
                return;
            }

            //Verify the signature of the JWT token to ensure it's really coming from your User Pool

            jwt.verify(token, pem, {issuer: iss}, function (err, payload) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(payload);
            });
        });
    });
};