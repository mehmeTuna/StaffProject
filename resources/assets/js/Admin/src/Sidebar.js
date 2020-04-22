import React from 'react'
import { Link } from 'react-router-dom'

const HeroProfile = ({ url, name }) => (
  <div className="user-profile">
    {url != null && (
      <div className="user-image">
        <img src={url} alt={name} />
      </div>
    )}
    <div className="user-designation">{name}</div>
  </div>
)

const MenuListItem = ({ icon, url, name }) => (
  <li className="nav-item">
    <Link to={url} className="nav-link">
      <i className={icon} />
      <span className="menu-title">{name}</span>
    </Link>
  </li>
)

const Sidebar = ({ data }) => {
  return (
    <React.Fragment>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <HeroProfile url={data.img} name={data.username} />
        <ul className="nav">
          <MenuListItem
            url={'/' + `${data.username}`}
            icon="icon-box menu-icon"
            name="AnaSayfa"
          />
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls="auth"
              href="#auth"
            >
              <i className="icon-head menu-icon" />
              <span className="menu-title">Staff</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="auth">
              <ul className="nav flex-column sub-menu">
                <MenuListItem
                  url={'/' + `${data.username + '/staff/list'}`}
                  name="Staff List"
                />
                <MenuListItem
                  url={'/' + `${data.username + '/staff/create'}`}
                  name="Staff Create"
                />
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#ui-basic"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <i className="icon-disc menu-icon" />
              <span className="menu-title">Experience</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <MenuListItem
                  url={'/' + `${data.username + '/experience/create'}`}
                  name="Experience Create"
                />
                <MenuListItem
                  url={'/' + `${data.username + '/experience/list'}`}
                  name="Experience List"
                />
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#kiosk"
              aria-expanded="false"
              aria-controls="kiosk"
            >
              <i className="icon-disc menu-icon" />
              <span className="menu-title">Kiosk</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="kiosk">
              <ul className="nav flex-column sub-menu">
                <MenuListItem
                  url={'/' + `${data.username + '/kiosk/create'}`}
                  name="Kiosk Create"
                />
                <MenuListItem
                  url={'/' + `${data.username + '/kiosk/list'}`}
                  name="Kiosk List"
                />
              </ul>
            </div>
          </li>
          <MenuListItem
            url={'/' + `${data.username + '/profile'}`}
            icon="icon-box menu-icon"
            name="Profile"
          />
          <li className="nav-item">
            <span className="nav-link" style={{ cursor: 'pointer' }}>
              <span className="menu-title">Payment Plan</span>
            </span>
          </li>
          <MenuListItem
            url={'/' + `${data.username + '/docs'}`}
            icon="icon-box menu-icon"
            name="Documentation"
          />
        </ul>
      </nav>
    </React.Fragment>
  )
}

export default Sidebar
