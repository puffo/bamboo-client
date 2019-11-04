require("dotenv").config();
const fetch = require("node-fetch");

const { SERVER_HOST } = process.env;
const USERS_ENDPOINT = SERVER_HOST + "users";

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext;

  const requestBody = JSON.stringify({
    email: (user && user.email) || "blank",
    mobileNumber: "unknown",
    externalReference: (user && user.id) || "1231"
  });

  console.log(user);
  console.log(requestBody);
  console.log(USERS_ENDPOINT);
  return fetch(USERS_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: requestBody
  })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
