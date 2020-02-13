require('./../../bootstrap');

import ReactDOM from 'react-dom'

window.React = require('react');

import Login from "./src/app.js" ;

if (document.getElementById('root')) {
    ReactDOM.render(
        <Login/>, document.getElementById('root'));
}
