require('./../bootstrap')

import ReactDOM from 'react-dom'
import React from 'react'
import Axios from 'axios'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      businessName: '',
      telephone: '',
      email: '',
      password: '',
      alert: false,
      businessNameAlert: '',
      telephoneAlert: '',
      emailAlert: '',
      passwordAlert: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let val = e.target.value
    this.setState({[e.target.name]: val})
  }

  async handleSubmit(event) {
    event.preventDefault()
    if (
      this.state.businessName === '' ||
      this.state.telephone === '' ||
      this.state.email === '' ||
      this.state.password === ''
    ) {
      this.setState({alert: true})
      return
    }

    try {
      const {data} = await Axios.post('/business/register', {
        businessName: this.state.businessName,
        telephone: this.state.telephone,
        email: this.state.email,
        password: this.state.password
      })

      window.location.href = `/${data.data.businessSlugName}`
    } catch (error) {
      if (typeof error.response.data.businessName !== undefined) {
        let businessNameAlert = error.response.data.businessName
        this.setState({businessNameAlert})
      }
      if (typeof error.response.data.email !== undefined) {
        let emailAlert = error.response.data.email
        this.setState({emailAlert})
      }
      if (typeof error.response.data.password !== undefined) {
        let passwordAlert = error.response.data.password
        this.setState({passwordAlert})
      }
      if (typeof error.response.data.telephone !== undefined) {
        let telephoneAlert = error.response.data.telephone
        this.setState({telephoneAlert})
      }
    }
  }

  render() {
    return (
      <form
        className="bg-white rounded pb_form_v1 needs-validation"
        onSubmit={this.handleSubmit}
      >
        <h2 className="mb-4 mt-0 text-center">Sign Up for Free</h2>
        <div className="form-group">
          <small className="form-text text-muted text-danger m-1">
            {this.state.businessNameAlert}
          </small>
          <input
            type="text"
            className={
              this.state.alert == true && this.state.businessName === ''
                ? 'form-control pb_height-50 reverse border border-danger'
                : 'form-control pb_height-50 reverse'
            }
            name="businessName"
            value={this.state.businessName}
            onChange={this.handleChange}
            placeholder="Business Name"
          />
        </div>
        <div className="form-group">
          <small className="form-text text-muted text-danger m-1">
            {this.state.telephoneAlert}
          </small>
          <input
            type="text"
            className={
              this.state.alert == true && this.state.telephone === ''
                ? 'form-control pb_height-50 reverse border border-danger'
                : 'form-control pb_height-50 reverse'
            }
            value={this.state.telephone}
            onChange={this.handleChange}
            name="telephone"
            placeholder="Telephone"
          />
        </div>
        <div className="form-group">
          <small className="form-text text-muted text-danger m-1">
            {this.state.emailAlert}
          </small>
          <input
            type="text"
            className={
              this.state.alert == true && this.state.email === ''
                ? 'form-control pb_height-50 reverse border border-danger'
                : 'form-control pb_height-50 reverse'
            }
            onChange={this.handleChange}
            value={this.state.email}
            name="email"
            placeholder="Business Email"
          />
        </div>
        <div className="form-group">
          <small className="form-text text-muted text-danger m-1">
            {this.state.passwordAlert}
          </small>
          <input
            type="password"
            className={
              this.state.alert == true && this.state.password === ''
                ? 'form-control pb_height-50 reverse border border-danger'
                : 'form-control pb_height-50 reverse'
            }
            onChange={this.handleChange}
            value={this.state.password}
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-lg btn-block pb_btn-pill  btn-shadow-blue">
            Register
          </button>
        </div>
      </form>
    )
  }
}

if (document.getElementById('businessForm')) {
  ReactDOM.render(<App />, document.getElementById('businessForm'))
}
