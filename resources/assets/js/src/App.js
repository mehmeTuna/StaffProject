import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import StaffCreate from "./StaffCreate";
import StaffList from "./StaffList";

import ExperienceDefine from "./ExperienceDefine";
import ExperienceList from './ExperienceList';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bussData: {}
        }
    }

    async componentDidMount() {
        
        let self = this;
        await axios
            .post("/business/data")
            .then(response => {
                self.setState({bussData: response.data});
            });
    }
    render() {
        return (
            <Router>
                <div className="container-scroller">
                    <Navbar data={this.state.bussData}/>
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar data={this.state.bussData}/>
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="row">
                                    <Switch>
                                        <Route path={'/' + `${this.state.bussData.username + '/staff/create'}`}>
                                            <StaffCreate data={this.state.bussData}/>
                                        </Route>
                                        <Route path={'/' + `${this.state.bussData.username + '/experience/create'}`}>
                                            <ExperienceDefine data={this.state.bussData}/>
                                        </Route>
                                        <Route path={'/' + `${this.state.bussData.username + '/experience/List'}`}>
                                            <ExperienceList data={this.state.bussData}/>
                                        </Route>
                                        <Route path={'/' + `${this.state.bussData.username + '/staff/list'}`}> 
                                            <StaffList data={this.state.bussData}/>
                                        </Route>
                                        <Route path="/">
                                            <Home/>
                                        </Route>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

function Home() {
    return <h2>Home Bu kısma istatikler ve şirket verileri gelecek
    </h2>;
}

if (document.getElementById('root')) {
    ReactDOM.render(
        <App/>, document.getElementById('root'));
}
