console.log("Loading function");

const lib = require("szachista-lib");

exports.handler = function (event, context, callback) {
  console.log("Received event: ", event);

  const sourceIp = event.requestContext.identity.sourceIp;
  const userAgent = event.requestContext.identity.userAgent;
  const authData = lib.auth.getAuthentity(event);

  if (authData.error) {
    callback(null, {
      statusCode: 500,
      body: "Authentity is missing"
    });
    return;
  }

  let authentity;

  try {
    authentity = {
      ...JSON.parse(authData.authentity.authentity),
      chatId :authData.authentity.chatId,
      accessKey: authData.authentity.accessKey,
      key: authData.authentity.key,
      requestId: authData.authentity.requestId,
      sourceIp: authData.authentity.sourceIp,
      userAgent : authData.authentity.userAgent
    }
  } catch(e) {
    console.log(e);
    callback("Unauthorised");
    return;
  }

  console.log(authentity);

  if (sourceIp !== authentity.sourceIp) {
    console.log("Wrong source ip", authentity.sourceIp);
    callback("Unauthorised");
    return;
  }

  if (userAgent !== authentity.userAgent) {
    console.log("Wrong user agent", authentity.userAgent);
    callback("Unauthorised");
    return;
  }

  const item = {
    connectionId: event.requestContext.connectionId,
    authentity
  };

  lib.data.simplechat_connections.saveItem(item).then(() => {
    callback(null, {
      statusCode: 200,
      body: "Connected."
    });
  }).catch((error) => {
    callback(null, {
      statusCode: 500,
      body: "Failed to connect: " + JSON.stringify(error)
    });
  });
};
