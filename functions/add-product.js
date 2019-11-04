require("dotenv").config();
const fetch = require("node-fetch");

const PRODUCTS_ENDPOINT = process.env.PRODUCT_SERVER_HOST + "products";

exports.handler = async (event, context) => {
  template = JSON.parse(event.body);
  template.isFavorite = true;

  url = PRODUCTS_ENDPOINT + `/${template.id}`;

  console.log(url);
  console.log(template);
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { Accept: "application/json" },
      body: JSON.stringify(template)
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
