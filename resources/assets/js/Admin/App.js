import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Navbar from "./src/Navbar";
import Sidebar from "./src/Sidebar";
import Footer from "./src/Footer";
import StaffCreate from "./src/StaffCreate";
import StaffList from "./src/StaffList";
import Home from "./src/Home";
import ExperienceDefine from "./src/ExperienceDefine";
import ExperienceList from "./src/ExperienceList";
import KioskList from "./src/KioskList";
import KioskCreate from "./src/KioskCreate";

import { businessData } from "./api/business";

import Profile from "./src/components/profile";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      token: localStorage.getItem("businessToken")
    };
  }

  async componentDidMount() {
    const data = await businessData();
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
                <div className="">
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
                    <Route
                      path={"/" + `${this.state.data.username + "/profile"}`}
                    >
                      <Profile />
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
