import * as React from "react";
import { render } from "react-dom";
// import SignInSide from "./components/SignInSide";
// import SignUpSide from "./components/SignUpSide";
import Album from "./components/Album";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Album />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
