require("dotenv").config();
const fetch = require("node-fetch");

const LOGIN_ENDPOINT = process.env.USER_SERVER_HOST + "login";

exports.handler = async (event, context) => {
  const mobileNumber = JSON.parse(event.body).to;

  const userRequestBody = JSON.stringify({
    to: mobileNumber
  });

  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      headers: { Accept: "application/json" },
      method: "POST",
      body: userRequestBody
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
