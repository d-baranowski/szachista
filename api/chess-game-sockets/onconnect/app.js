console.log("Loading function");

const lib = require("szachista-lib");

exports.handler = async function (event, context, callback) {
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
      gameId :authData.authentity.authContext,
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

  let game;

  try {
    console.log("Fetching game by id " + authentity.gameId);
    const result = await lib.data.chess_lobby.getChessGame(authentity.gameId);
    game = result.Items[0];
  } catch(e) {
    console.log("Failed to fetch game", e);
    callback("Unauthorised");
    return;
  }

  await lib.data.chess_lobby.saveChessConnection(game, item).then(() => {
    console.log("Joined game");
    callback(null, {
      statusCode: 200,
      body: "Connected."
    });
  }).catch((error) => {
    console.log("Could not join game", error);
    callback(null, {
      statusCode: 500,
      body: "Failed to connect: " + JSON.stringify(error)
    });
  });
};
