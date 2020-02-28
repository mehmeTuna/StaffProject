import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import StaffCreate from "./StaffCreate";
import StaffList from "./StaffList";

import Home from "./Home";
import ExperienceDefine from "./ExperienceDefine";
import ExperienceList from "./ExperienceList";
import KioskList from "./KioskList";
import KioskCreate from "./KioskCreate";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  async componentDidMount() {
    const { data } = await axios.post("/business/data");

    this.setState({ data });
  }

  render() {
    return (
      <Router>
        <div className="container-scroller">
          <Navbar data={this.state.data} />
          <div className="container-fluid page-body-wrapper">
            <Sidebar data={this.state.data} />
            <div className="main-panel">
              <div className="content-wrapper">
                <div className="row">
                  <Switch>
                    <Route
                      path={
                        "/" + `${this.state.data.username + "/staff/create"}`
                      }
                    >
                      <StaffCreate data={this.state.data} />
                    </Route>
                    <Route
                      path={
                        "/" +
                        `${this.state.data.username + "/experience/create"}`
                      }
                    >
                      <ExperienceDefine data={this.state.data} />
                    </Route>
                    <Route
                      path={
                        "/" + `${this.state.data.username + "/experience/List"}`
                      }
                    >
                      <ExperienceList data={this.state.data} />
                    </Route>
                    <Route
                      path={"/" + `${this.state.data.username + "/staff/list"}`}
                    >
                      <StaffList data={this.state.data} />
                    </Route>
                    <Route
                      path={"/" + `${this.state.data.username + "/kiosk/list"}`}
                    >
                      <KioskList data={this.state.data} />
                    </Route>
                    <Route
                      path={
                        "/" + `${this.state.data.username + "/kiosk/create"}`
                      }
                    >
                      <KioskCreate data={this.state.data} />
                    </Route>
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
    );
  }
}
