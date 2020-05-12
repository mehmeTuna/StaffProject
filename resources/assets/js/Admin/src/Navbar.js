import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({data}) => {
  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        {data.img != null && (
          <Link
            to={'/' + `${data.businessName}`}
            className="navbar-brand brand-logo-mini"
          >
            <img src={data.img} alt={data.businessName} />
          </Link>
        )}
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span className="icon-menu"></span>
        </button>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item dropdown d-flex mr-4 ">
            <a
              className="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center"
              id="notificationDropdown"
              href="#"
              data-toggle="dropdown"
            >
              <i className="icon-head"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
              aria-labelledby="notificationDropdown"
            >
              <p className="mb-0 font-weight-normal float-left dropdown-header">
                Settings
              </p>
              <Link to="profile" className="dropdown-item preview-item">
                <i className="icon-head"></i>
                Profile
              </Link>
              <a href="/logout" className="dropdown-item preview-item">
                <i className="icon-inbox"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span className="icon-menu"></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
