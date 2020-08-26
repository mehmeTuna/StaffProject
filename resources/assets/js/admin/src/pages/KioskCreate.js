import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Redirect} from 'react-router-dom'
import PageTitle from './../assets/page-title'

const sweet = withReactContent(Swal)

export default class KioskCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hostName: '',
      registerCode: '',
      kioskName: '',
      redirect: null
    }

    this.newKiosk = this.newKiosk.bind(this)
    this.addCode = this.addCode.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
    this.setState({hostName: window.location.host})
  }

  async newKiosk(val) {
    const {data} = await axios.post('/v1/kiosk/register', {
      code: this.state.registerCode,
      name: val
    })

    if (data.status === true) {
      this.setState({
        redirect: `/${this.props.match.params.businessName}/kiosk/list`
      })
    } else {
      sweet.fire({
        icon: 'warning',
        title: 'Undefined Code',
        timer: 1500,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        showConfirmButton: false
      })
    }
  }

  addCode() {
    if (this.state.registerCode === '') {
      sweet.fire({
        icon: 'warning',
        title: 'Undefined Code',
        timer: 1500,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        showConfirmButton: false
      })
      return
    }

    sweet
      .fire({
        title: 'Kioks Name',
        input: 'text'
      })
      .then(val => {
        if (typeof val.value !== 'undefined') this.newKiosk(val.value)
      })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <React.Fragment>
        <div className="col-sm-12 mb-4 mb-xl-0">
          <PageTitle>Kiosk Add</PageTitle>
        </div>
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="mt-4">
              <ul className="list-arrow text-">
                <li className="lead">
                  Enter the code on the device you want to add.
                </li>
                <li className="lead">
                  If you don't know how to view the code
                  <a href='/kiosk' target='_blank'>
                    <span className="text-success">
                      {`${this.state.hostName}/kiosk`}
                    </span>
                  </a>
                  visit the page
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.registerCode}
                  onChange={e => this.setState({registerCode: e.target.value})}
                  placeholder="Code"
                />
              </div>
              <div className="row display-3 text-center">
                <button
                  type="button"
                  className="btn btn-success font-weight-bold mx-auto mt-4"
                  onClick={this.addCode}
                >
                  <span className="badge">
                    <i className="icon-circle-plus" />
                  </span>
                  <span>Kiosk Define Name</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
