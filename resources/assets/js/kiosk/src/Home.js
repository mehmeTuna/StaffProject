import React from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {resetServerContext} from 'react-beautiful-dnd'

const sweet = withReactContent(Swal)

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      loading: false,
      qrUrl: ''
    }

    this.renderImg = this.renderImg.bind(this)
    this.reload = this.reload.bind(this)
  }

  async componentDidMount() {
    this.setState({loading: true})
    const {data} = await Axios.post('/kiosk/me')

    if (data.status === true) {
      this.setState({data: data.data})
    }

    this.setState({loading: false})

    window.setInterval(this.renderImg, 120000)

    console.log(data)
  }

  renderImg() {
    this.setState({loading: true})

    var timer = setTimeout(() => this.setState({loading: false}), 2000)
    //clearTimeout(timer);
    console.log('refresh img')
  }

  reload() {
    window.location.reload()
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 mx-4 mt-4 d-flex justify-content-between align-items-center">
              <div>
                <button
                  className="btn btn-lg thema-background-color text-white"
                  onClick={this.reload}
                >
                  <i className="fas fa-redo-alt"></i> Refresh Qr
                </button>
              </div>
              <p className="display-4"> {this.state.data.businessName} </p>
              <div>
                <button
                  type="button"
                  className="btn btn-lg thema-background-color text-white"
                >
                  <i className="fas fa-sign-out-alt"></i>Logout
                </button>
              </div>
            </div>
            <div className="col-9 text-center container">
              {this.state.loading === true && (
                <img className="my-auto mt-16" src="/public/loading.gif" />
              )}
              {this.state.loading === false && <img src="/kiosk/generate" />}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
