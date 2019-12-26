import React from 'react';
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom';
import axios from "axios";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import StaffCreate from "./StaffCreate";
import StaffList from "./StaffList";

import ExperienceDefine from "./ExperienceDefine";


const App = () => {
    return (
        <div className="container-scroller">
            <Navbar/>
            <div className="container-fluid page-body-wrapper">
                <Sidebar/>
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            {false && <StaffCreate/>}
                            {true && <ExperienceDefine/>}
                            {false && <StaffList/>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

if (document.getElementById('root')) {
    ReactDOM.render(
        <App/>, document.getElementById('root'));
}
