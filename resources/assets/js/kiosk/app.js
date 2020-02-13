require('./../bootstrap');

import ReactDOM from 'react-dom'

window.React = require('react');

import Home from "./src/Home.js" ;

if (document.getElementById('root')) {
    ReactDOM.render(
        <Home/>, document.getElementById('root'));
}
