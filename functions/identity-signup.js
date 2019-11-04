require("dotenv").config();
const fetch = require("node-fetch");

const USERS_ENDPOINT = process.env.SERVER_HOST + "users";

exports.handler = async (event, context) => {
  const email = JSON.parse(event.body).user.email;
  const requestBody = JSON.stringify({
    email: email,
    mobileNumber: "unknown",
    externalReference: email
  });

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
