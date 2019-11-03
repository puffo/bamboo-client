import netlifyIdentity from "netlify-identity-widget";

export default function register() {
  window.addEventListener("identity-signup", function() {
    console.log("New user signed up!");
  });
  window.netlifyIdentity = netlifyIdentity;
  // You must run this once before trying to interact with the widget
  netlifyIdentity.init();
}
