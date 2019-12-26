import React from "react";

const Navbar = () => {

    return (
        <div>
            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div
                    className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a className="navbar-brand brand-logo" href="index.html"><img src="images/logo.svg" alt="logo"/></a>
                    <a className="navbar-brand brand-logo-mini" href="index.html"><img src="images/logo-mini.svg" alt="logo"/></a>
                </div>
                <div
                    className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <button
                        className="navbar-toggler navbar-toggler align-self-center"
                        type="button"
                        data-toggle="minimize">
                        <span className="icon-menu"></span>
                    </button>
                    <ul className="navbar-nav mr-lg-2">
                        <li className="nav-item nav-search d-none d-lg-block">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="search">
                                        <i className="icon-search"></i>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Projects.."
                                    aria-label="search"
                                    aria-describedby="search"/>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item dropdown d-lg-flex d-none">
                            <button type="button" className="btn btn-info font-weight-bold">+ Create New</button>
                        </li>
                        <li className="nav-item dropdown d-flex">
                            <a
                                className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center"
                                id="messageDropdown"
                                href="#"
                                data-toggle="dropdown">
                                <i className="icon-air-play mx-0"></i>
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                                aria-labelledby="messageDropdown">
                                <p className="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src="images/faces/face4.jpg" alt="image" className="profile-pic"/>
                                    </div>
                                    <div className="preview-item-content flex-grow">
                                        <h6 className="preview-subject ellipsis font-weight-normal">David Grey
                                        </h6>
                                        <p className="font-weight-light small-text text-muted mb-0">
                                            The meeting is cancelled
                                        </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src="images/faces/face2.jpg" alt="image" className="profile-pic"/>
                                    </div>
                                    <div className="preview-item-content flex-grow">
                                        <h6 className="preview-subject ellipsis font-weight-normal">Tim Cook
                                        </h6>
                                        <p className="font-weight-light small-text text-muted mb-0">
                                            New product launch
                                        </p>
                                    </div>
                                </a>
                                <a className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <img src="images/faces/face3.jpg" alt="image" className="profile-pic"/>
                                    </div>
                                    <div className="preview-item-content flex-grow">
                                        <h6 className="preview-subject ellipsis font-weight-normal">
                                            Johnson
                                        </h6>
                                        <p className="font-weight-light small-text text-muted mb-0">
                                            Upcoming board meeting
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown d-flex mr-4 ">
                            <a
                                className="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center"
                                id="notificationDropdown"
                                href="#"
                                data-toggle="dropdown">
                                <i className="icon-cog"></i>
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                                aria-labelledby="notificationDropdown">
                                <p className="mb-0 font-weight-normal float-left dropdown-header">Settings</p>
                                <a className="dropdown-item preview-item">
                                    <i className="icon-head"></i>
                                    Profile
                                </a>
                                <a className="dropdown-item preview-item">
                                    <i className="icon-inbox"></i>
                                    Logout
                                </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown mr-4 d-lg-flex d-none">
                            <a
                                className="nav-link count-indicatord-flex align-item s-center justify-content-center"
                                href="#">
                                <i className="icon-grid"></i>
                            </a>
                        </li>
                    </ul>
                    <button
                        className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                        type="button"
                        data-toggle="offcanvas">
                        <span className="icon-menu"></span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;