import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export default class Sidebar extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            staff: false,
            experience: false,
        }
    }

    render() {
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <div className="user-profile">
                    <div className="user-image">
                        {this.props.data.img != null && <img src={this.props.data.img}/>}
                    </div>
                    <div className="user-name"/>
                    <div className="user-designation">
                        {this.props.data.username}
                    </div>
                </div>
                <ul className="nav">
                    <li className="nav-item">
                        <Link to={'/' + `${this.props.data.username}`} className="nav-link">
                            <i className="icon-box menu-icon"/>
                            <span className="menu-title">AnaSayfa</span>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <a
                            className='nav-link'
                            data-toggle="collapse"
                            aria-expanded="false"
                            aria-controls="auth"
                            href="#auth">
                            <i className="icon-head menu-icon"/>
                            <span className="menu-title">Staff</span>
                            <i className="menu-arrow"/>
                        </a>
                        <div className="collapse" id="auth">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <Link to={'/' + `${this.props.data.username + '/staff/list'}`} className="nav-link">Staff
                                        List</Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to={'/' + `${this.props.data.username + '/staff/create'}`}
                                        className="nav-link">Staff Create</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li  className={this.state.experience === false ? 'nav-item' : 'nav-item active'}>
                        <a
                            className="nav-link"
                            data-toggle="collapse"
                            href="#ui-basic"
                            aria-expanded="false"
                            aria-controls="ui-basic">
                            <i className="icon-disc menu-icon"/>
                            <span className="menu-title">Experience</span>
                            <i className="menu-arrow"/>
                        </a>
                        <div className="collapse" id="ui-basic">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <Link
                                        to={'/' + `${this.props.data.username + '/experience/create'}`}
                                        className="nav-link">Experience Create</Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to={'/' + `${this.props.data.username + '/experience/list'}`}
                                        className="nav-link">Experience List</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/docs">
                            <i className="icon-book menu-icon"/>
                            <span className="menu-title">Documentation</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
};
