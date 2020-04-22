import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import axios from 'axios'

import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

import Home from './Home'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="container-scroller">
          <Navbar />
          <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
              <div className="content-wrapper">
                <div className="row">
                  <Switch>
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}
