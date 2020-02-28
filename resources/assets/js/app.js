/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.React = require("react");

import App from "./src/App.js";
import ReactDOM from "react-dom";

if (document.getElementById("root")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}
