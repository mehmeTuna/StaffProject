import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const HeroProfile = ({url, name}) => (
  <div className="user-profile">
    {url != null && (
      <div className="user-image">
        <img src={url} alt={name} />
      </div>
    )}
    <div className="user-designation">{name}</div>
  </div>
)

const MenuListItem = ({icon, url, name}) => (
  <li className="nav-item">
    <Link to={url} className="nav-link">
      <i className={icon} />
      <span className="menu-title">{name}</span>
    </Link>
  </li>
)

const SidebarComponent = ({...props}) => {
  const {username, packageName, packagePrice, currencySymbolUtf8} = props
  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <MenuListItem
            url={`/${username}`}
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
                  url={`/${username}/staff/list`}
                  name="Staff List"
                />
                <MenuListItem
                  url={`/${username}/staff/create`}
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
                  url={`/${username}/experience/create`}
                  name="Experience Create"
                />
                <MenuListItem
                  url={`/${username}/experience/list`}
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
                  url={`/${username}/kiosk/create`}
                  name="Kiosk Create"
                />
                <MenuListItem
                  url={`/${username}/kiosk/list`}
                  name="Kiosk List"
                />
              </ul>
            </div>
          </li>
          <MenuListItem
            url={`/${username}/profile`}
            icon="icon-box menu-icon"
            name="Profile"
          />
          <MenuListItem
            url={`/${username}/docs`}
            icon="icon-box menu-icon"
            name="Documentation"
          />
          <li className="nav-item">
            <div className="billing-plan justify-content-between align-items-center">
              <div className="row justify-content-start align-items-center">
                <span className="billing-plan-title">{packageName}</span>
                <span className="billing-plan-desc">
                  {`${packagePrice} ${currencySymbolUtf8}`}
                </span>
              </div>
              <Link to={`/${username}/pricing`}>
                <Button style={{color: 'white'}}>Yukselt</Button>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.profileReducer.username,
    packageName: state.profileReducer.packageName,
    packagePrice: state.profileReducer.packagePrice,
    currencySymbolUtf8: state.profileReducer.currencySymbolUtf8
  }
}

const Sidebar = connect(mapStateToProps)(SidebarComponent)

export default Sidebar
