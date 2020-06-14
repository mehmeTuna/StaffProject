import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'

import {store} from './redux/store'
import Navbar from './src/navbar'
import Sidebar from './src/sidebar'
import Footer from './src/Footer'
import StaffCreate from './src/StaffCreate'
import StaffList from './src/StaffList'
import Home from './src/Home'
import ExperienceCreate from './src/ExperienceCreate'
import ExperienceList from './src/ExperienceList'
import KioskList from './src/KioskList'
import KioskCreate from './src/KioskCreate'

import Profile from './src/profile'
import {getBusinessProfileData} from './redux/actions/ProfileActions'

require('../bootstrap')

export default class AppComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: rootData,
      token: localStorage.getItem('businessToken')
    }
  }

  componentDidMount() {
    this.props.getBusinessProfileData()
  }

  render() {
    return (
      <Router>
        <div className="container-scroller">
          <Navbar />
          <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
              <div className="mx-1 mt-4">
                <Switch>
                  <Route exact path={`/${this.state.data.username}`}>
                    <Home />
                  </Route>
                  <Route
                    path={'/' + `${this.state.data.username + '/staff/create'}`}
                  >
                    <StaffCreate data={this.state.data} />
                  </Route>
                  <Route
                    path={
                      '/' + `${this.state.data.username + '/experience/create'}`
                    }
                  >
                    <ExperienceCreate data={this.state.data} />
                  </Route>
                  <Route
                    path={
                      '/' + `${this.state.data.username + '/experience/List'}`
                    }
                  >
                    <ExperienceList data={this.state.data} />
                  </Route>
                  <Route
                    path={'/' + `${this.state.data.username + '/staff/list'}`}
                  >
                    <StaffList data={this.state.data} />
                  </Route>
                  <Route
                    path={'/' + `${this.state.data.username + '/kiosk/list'}`}
                  >
                    <KioskList data={this.state.data} />
                  </Route>
                  <Route
                    path={'/' + `${this.state.data.username + '/kiosk/create'}`}
                  >
                    <KioskCreate data={this.state.data} />
                  </Route>
                  <Route
                    path={'/' + `${this.state.data.username + '/profile'}`}
                  >
                    <Profile data={this.state.data} />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBusinessProfileData: () => {
      dispatch(getBusinessProfileData())
    }
  }
}

const App = connect(null, mapDispatchToProps)(AppComponent)

if (document.getElementById('root')) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}
