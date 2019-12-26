import React from "react";

const Sidebar = () => {

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <div className="user-profile">
                <div className="user-image">
                    <img src="images/faces/face28.png"/>
                </div>
                <div className="user-name">
                    Edward Spencer
                </div>
                <div className="user-designation">
                    Developer
                </div>
            </div>
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <i className="icon-box menu-icon"></i>
                        <span className="menu-title">Dashboard</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-toggle="collapse"
                        href="#auth"
                        aria-expanded="false"
                        aria-controls="auth">
                        <i className="icon-head menu-icon"></i>
                        <span className="menu-title">Staff</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="auth">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <a className="nav-link" href="staff/list">
                                    Staff List
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="staff/create">
                                    Staff Create
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-toggle="collapse"
                        href="#ui-basic"
                        aria-expanded="false"
                        aria-controls="ui-basic">
                        <i className="icon-disc menu-icon"></i>
                        <span className="menu-title">Experience</span>
                        <i className="menu-arrow"></i>
                    </a>
                    <div className="collapse" id="ui-basic">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item">
                                <a className="nav-link" href="experience/create">Experience Create</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="experience/list">Experience List</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="docs/documentation.html">
                        <i className="icon-book menu-icon"></i>
                        <span className="menu-title">Documentation</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;