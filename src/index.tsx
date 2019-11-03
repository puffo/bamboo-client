import * as React from "react";
import { render } from "react-dom";
import MainPage from "./components/MainPage";

import registerServiceWorker from "./components/authentication/registerServiceWorker";
import netlifyIdentity from "netlify-identity-widget";

import "./styles.css";

window.netlifyIdentity = netlifyIdentity;
// You must run this once before trying to interact with the widget
netlifyIdentity.init();

function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

registerServiceWorker();
