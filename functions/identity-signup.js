require("dotenv").config();
const fetch = require("node-fetch");

const USERS_ENDPOINT = process.env.USER_SERVER_HOST + "users";
const PRODUCTS_ENDPOINT = process.env.PRODUCT_SERVER_HOST + "products";

const productTemplates = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1520089395365-001d26ba155b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    imageText: "iPhone image",
    title: "iPhone X",
    description: "Avoid drops and spills!",
    isFavorite: true
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1530173235220-f6825c107a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80",
    imageText: "Mountain bike image",
    title: "Mountain Bike",
    description: "Ride with confidence this weekend.",
    isFavorite: false
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1530173235220-f6825c107a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80",
    imageText: "Jacket image",
    title: "Favourite Jacket",
    description: "Keep your best clothing intact.",
    isFavorite: false
  }
];

exports.handler = async (event, context) => {
  const userData = JSON.parse(event.body).user;
  const email = userData.email;
  const mobileNumber = userData.mobileNumber;

  const userRequestBody = JSON.stringify({
    email: email,
    mobileNumber: mobileNumber,
    externalReference: mobileNumber
  });

  // persist the new user
  return fetch(USERS_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: userRequestBody
  })
    .then(response => response.json())
    .then(data => {
      userId = data.id;

      const allData = Promise.all(
        productTemplates
          .map(template => {
            template.userId = userId;
            return template;
          })
          .map(
            async template =>
              await await fetch(PRODUCTS_ENDPOINT, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: JSON.stringify(template)
              }).then(response => response.json())
          )
      );
      return {
        statusCode: 200,
        body: "All Good"
      };
    });
};
