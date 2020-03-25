import React from 'react'
import {Link} from 'react-router-dom'

import ChoosingPaymentPlan from './components/choosingPaymentPlan'

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      staff: false,
      experience: false,
      isShowPlan: false
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isShowPlan && (
          <ChoosingPaymentPlan isState={this.state.isShowPlan} />
        )}
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <div className="user-profile">
            {this.props.data.img != null && (
              <div className="user-image">
                <img src={this.props.data.img} alt={this.props.data.username} />
              </div>
            )}
            <div className="user-designation">{this.props.data.username}</div>
          </div>
          <ul className="nav">
            <li className="nav-item">
              <Link
                to={'/' + `${this.props.data.username}`}
                className="nav-link"
              >
                <i className="icon-box menu-icon" />
                <span className="menu-title">AnaSayfa</span>
              </Link>
            </li>
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
                  <li className="nav-item">
                    <Link
                      to={'/' + `${this.props.data.username + '/staff/list'}`}
                      className="nav-link"
                    >
                      Staff List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={'/' + `${this.props.data.username + '/staff/create'}`}
                      className="nav-link"
                    >
                      Staff Create
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li
              className={
                this.state.experience === false ? 'nav-item' : 'nav-item active'
              }
            >
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
                  <li className="nav-item">
                    <Link
                      to={
                        '/' +
                        `${this.props.data.username + '/experience/create'}`
                      }
                      className="nav-link"
                    >
                      Experience Create
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={
                        '/' + `${this.props.data.username + '/experience/list'}`
                      }
                      className="nav-link"
                    >
                      Experience List
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li
              className={
                this.state.experience === false ? 'nav-item' : 'nav-item active'
              }
            >
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
                  <li className="nav-item">
                    <Link
                      to={'/' + `${this.props.data.username + '/kiosk/create'}`}
                      className="nav-link"
                    >
                      Kiosk Create
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={'/' + `${this.props.data.username + '/kiosk/list'}`}
                      className="nav-link"
                    >
                      Kiosk List
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <Link
                to={'/' + `${this.props.data.username + '/profile'}`}
                className="nav-link"
              >
                <i className="icon-box menu-icon" />
                <span className="menu-title">Profile</span>
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link" style={{cursor: 'pointer'}}>
                <span className="menu-title">Payment Plan</span>
              </span>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/docs">
                <i className="icon-book menu-icon" />
                <span className="menu-title">Documentation</span>
              </a>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}
