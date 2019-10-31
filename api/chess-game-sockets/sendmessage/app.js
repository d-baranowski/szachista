console.log("Loading function");

const AWS = require('aws-sdk');
const getAuthentity = require("./getAuthentity");

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

const { TABLE_NAME } = process.env;

exports.handler = async (event, context) => {
  console.log("Received Event", event);

  let connectionData;
  
  try {
    connectionData = await ddb.scan({ TableName: TABLE_NAME, ProjectionExpression: 'connectionId' }).promise();
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }
  
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
  });

  const authData = getAuthentity(event);

  if (authData.error) {
    console.log(authData);
    throw authData.error;
  }

  console.log(authData);

  const userAttributes = authData.authentity.UserAttributes.reduce((accumulator, currentValue) => {
    accumulator[currentValue.Name] = currentValue.Value;
    return accumulator;
  }, {});



  const postData = JSON.parse(JSON.parse(event.body).data);


  postData.author.picture = userAttributes.picture;
  postData.author.name = userAttributes.name;
  postData.author.given_name = userAttributes.given_name;
  postData.author.family_name = userAttributes.family_name;
  postData.author.email = userAttributes.email;
  
  const postCalls = connectionData.Items.map(async ({ connectionId }) => {
    try {
      await apigwManagementApi.postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify(postData)
      }).promise();
    } catch (e) {
      if (e.statusCode === 410) {
        console.log(`Found stale connection, deleting ${connectionId}`);
        await ddb.delete({ TableName: TABLE_NAME, Key: { connectionId } }).promise();
      } else {
        throw e;
      }
    }
  });
  
  try {
    await Promise.all(postCalls);
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  return { statusCode: 200, body: 'Data sent.' };
};
