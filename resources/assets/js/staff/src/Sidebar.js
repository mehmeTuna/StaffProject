import React from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      staff: false,
      experience: false
    };
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="user-profile">
          <div className="user-image"></div>
          <div className="user-name" />
          <div className="user-designation"></div>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/staff/home" className="nav-link">
              <i className="icon-box menu-icon" />
              <span className="menu-title">AnaSayfa</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
