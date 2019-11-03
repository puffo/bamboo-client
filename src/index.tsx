import * as React from "react";
import { render } from "react-dom";
import MainPage from "./components/MainPage";

import registerServiceWorker from "./components/authentication/registerServiceWorker";
import authStarter from "./components/authentication/authStarter";
import "./styles.css";

authStarter();

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
