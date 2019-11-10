lib.log('Loading function');

const userPoolId = 'eu-west-1_zwqFAay0e';
const region = 'eu-west-1';
const AWS = require('aws-sdk');
AWS.config.region = region;
AWS.config.userPoolId = userPoolId;

const congito = new AWS.CognitoIdentityServiceProvider();

module.exports = function (token) {
    return new Promise((resolve, reject) => {
        let params = {
            AccessToken: token
        };

        congito.getUser(params, (err, data) => {
            if (err) {
                lib.log(err, err.stack); // an error occurred
                reject(err);
            }
            else {
                lib.log(data);
                resolve(data);
            }
        })
    });
};
