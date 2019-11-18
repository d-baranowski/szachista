console.log("Loading function");

const AWS = require('aws-sdk');
const lib = require("/opt/library");


exports.handler = async (event, context) => {
  console.log("Received Event", event);

  return { statusCode: 200, body: 'Data sent.' };
};
