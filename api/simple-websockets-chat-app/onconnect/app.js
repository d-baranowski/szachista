console.log("Loading function");

const AWS = require("aws-sdk");
const getAuthentity = require("../../common/getAuthentity");

AWS.config.update({ region: process.env.AWS_REGION });
const DDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

exports.handler = function (event, context, callback) {
  console.log("Received event: ", event);

  const authData = getAuthentity(event);
  console.log("Ladies and gentlemen", authData);

  const putParams = {
    TableName: process.env.TABLE_NAME,
    Item: {
      connectionId: { S: event.requestContext.connectionId }
    }
  };

  DDB.putItem(putParams, function (err) {
    callback(null, {
      statusCode: err ? 500 : 200,
      body: err ? "Failed to connect: " + JSON.stringify(err) : "Connected."
    });
  });
};