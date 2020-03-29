import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Redirect} from 'react-router-dom'

const sweet = withReactContent(Swal)

export default class KioskCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hostName: '',
      tutorial: 0,
      registerCode: '',
      kioskName: '',
      redirect: null
    }

    this.newKiosk = this.newKiosk.bind(this)
    this.addCode = this.addCode.bind(this)
  }

  componentDidMount() {
    this.setState({hostName: window.location.host})
  }

  async newKiosk(val) {
    this.setState({tutorial: 1})
    const {data} = await axios.post('/kiosk/register', {
      code: this.state.registerCode,
      name: val
    })

    if (data.status === true) {
      this.setState({
        redirect: `/${this.props.data.username}/kiosk/list`
      })
    } else {
      sweet.fire({
        icon: 'warning',
        title: 'Geçerli bir code giriniz',
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
        title: 'Geçerli bir code giriniz',
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
          <h4 className="font-weight-bold text-dark">Kiosk Define</h4>
          <p className="font-weight-normal mb-2 text-muted"></p>
        </div>
        {this.state.tutorial === 0 && (
          <div className="col-sm-12 col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-title text-center mt-4">aciklama kismi</div>
              <div className="card-body">
                <div className="row display-3">
                  <button
                    type="button"
                    className="btn btn-success font-weight-bold mx-auto mt-4"
                    onClick={() => this.setState({tutorial: 1})}
                  >
                    <span className="badge">
                      <i className="icon-circle-plus" />
                    </span>
                    <span>New Kiosk Define</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.tutorial === 1 && (
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="mt-4">
                <ul className="list-arrow text-">
                  <li className="lead">
                    Eklemek istediginiz cihazdaki kodu giriniz.
                  </li>
                  <li className="lead">
                    Kodu nasil goruntuleyeceginizi bilmiyorsaniz
                    <span className="text-success">
                      {' '}
                      {`${this.state.hostName}/kiosk`}
                    </span>{' '}
                    sayfayi ziyaret ediniz
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Kod</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.registerCode}
                    onChange={e =>
                      this.setState({registerCode: e.target.value})
                    }
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
        )}
      </React.Fragment>
    )
  }
}
