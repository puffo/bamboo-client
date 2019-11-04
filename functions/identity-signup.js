import fetch from "node-fetch";

const { SERVER_HOST } = process.env;
const USERS_ENDPOINT = SERVER_HOST + "users";

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext;
  console.log(user);
  return fetch(USERS_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: JSON.stringify({
      email: user.email,
      mobileNumber: "unknown",
      externalReference: user.id
    })
  })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: data
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
