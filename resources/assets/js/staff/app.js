require("./../bootstrap");

import ReactDOM from "react-dom";

window.React = require("react");

import App from "./src/App.js";

if (document.getElementById("root")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}
