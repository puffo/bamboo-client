require("dotenv").config();
const fetch = require("node-fetch");

const PRODUCTS_ENDPOINT = process.env.PRODUCT_SERVER_HOST + "products";

exports.handler = async (event, context) => {
  return fetch(PRODUCTS_ENDPOINT, {
    method: "GET",
    headers: { Accept: "application/json" }
  })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
