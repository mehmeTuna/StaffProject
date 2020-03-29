import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Redirect} from 'react-router-dom'

const sweet = withReactContent(Swal)

export default class KioskDefine extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hostName: '',
      tutorial: 0,
      code: '',
      kioskName: '',
      redirect: null
    }

    this.newKiosk = this.newKiosk.bind(this)
    this.KioskAddName = this.KioskAddName.bind(this)
  }

  componentDidMount() {
    this.setState({hostName: window.location.host})
  }

  async newKiosk() {
    this.setState({tutorial: 1})
    const {data} = await axios.post('/business/kiosk/code/generate')

    if (data.status === true) this.setState({code: data.code})
  }

  async KioskAddName() {
    if (this.state.kioskName === '') {
      sweet.fire('Kiosk Adlandirmadan kayit  yapilamaz')
      return
    }

    const {data} = await axios.post('/business/kiosk/add', {
      name: this.state.kioskName
    })
    console.log(data)

    if (data.status === false) {
      if (data.codeUsed === false) {
        sweet.fire('Kod herhangi bir cihazda kullanilmadi')
        return
      }
    }

    if (data.status === true) {
      sweet
        .fire('Kiosk eklendi artik giris cikis  islemlerinde kullanilabilir')
        .then(() =>
          this.setState({redirect: `/${this.props.data.username}/kiosk/list`})
        )
    }
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
                    onClick={this.newKiosk}
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
                    {' '}
                    Kiosk Tanimlanamak icin asagida yazan kodu eklemek
                    istediginiz cihazda giriniz
                  </li>
                  <li className="lead">
                    {' '}
                    Kiosk cihazinizda taryinicinizi acin ve bu{' '}
                    <span className="text-success">{`${this.state.hostName}/kiosk/ekle`}</span>{' '}
                    linki aciniz{' '}
                  </li>
                  <li className="lead"> Daha Sonra Kiosku Adlandirin</li>
                </ul>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Kiosk Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.kioskName}
                    onChange={e => this.setState({kioskName: e.target.value})}
                    placeholder="Kiosk Name"
                  />
                </div>
                <div className="mt-4 display-4 text-center">
                  Code: {this.state.code}
                </div>
                <div className="row display-3">
                  <button
                    type="button"
                    className="btn btn-success font-weight-bold mx-auto mt-4"
                    onClick={this.KioskAddName}
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
