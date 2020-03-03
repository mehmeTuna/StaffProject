/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require("./bootstrap");

window.React = require("react");

import ReactDOM from "react-dom";
import App from "./Admin/components/App";
import configureStore from "./Admin/redux/configureStore";
import { Provider } from "react-redux";

const store = configureStore(undefined);

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById("root")
  );
};

render(App);
