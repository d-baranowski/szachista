
exports.handler = () => async (event, context) => {
  console.log("Received Event", event);

  const authData = lib.auth.getAuthentity(event);

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

  try {
    await Promise.all(postCalls);
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  return { statusCode: 200, body: 'Data sent.' };
};
