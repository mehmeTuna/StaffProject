import React from 'react'
import {Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import withReactContent from 'sweetalert2-react-content'

import PlanDetail from './assets/plan-detail'
import PageTitle from './assets/page-title'
import FormInputElement from './assets/form-input'
import FormSubmitBtn from './assets/form-submit-btn'

const sweet = withReactContent(Swal)

class StaffCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currencySymbolUtf8: this.props.data.currencySymbolUtf8,
      img: [],
      firstName: '',
      lastName: '',
      gender: 'unspecified',
      martialStatus: 'unspecified',
      birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
      address: '',
      telephone: '',
      email: '',
      password: '',
      pay: '',
      factor: '',
      periode: '1',
      workingData: '',
      workingPlan: {},
      selectedExperience: {},
      alert: false,
      redirect: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.paymentControl = this.paymentControl.bind(this)
    this.selectExperience = this.selectExperience.bind(this)
  }

  selectExperience(event) {
    let data = this.state.workingData.filter(e => e.value == event.target.value)

    this.setState({
      selectedExperience: data[0],
      workingPlan: data[0].workingPlan
    })
  }

  handleSubmit() {
    if (this.state.selectedExperience === '' || this.state.img.length === 0) {
      sweet.fire({
        title: 'Select Experince',
        timer: 1500
      })
      return
    }

    let formData = new FormData()

    if (this.state.img.length > 0) {
      for (let a = 0; a < this.state.img.length; a++) {
        formData.set('img' + a, this.state.img[a].file)
      }
    }

    let customDate = new Date(this.state.birthday)

    let date = JSON.stringify(customDate)
    date = date.slice(1, 11)

    formData.set('firstName', this.state.firstName)
    formData.set('lastName', this.state.lastName)
    formData.set('gender', this.state.gender)
    formData.set('martialStatus', this.state.martialStatus)

    formData.set('birthday', date)
    formData.set('address', this.state.address)
    formData.set('telephone', this.state.telephone)
    formData.set('email', this.state.email)
    formData.set('password', this.state.password)
    formData.set('workingPlan', JSON.stringify(this.state.workingPlan))
    formData.set('experience', this.state.selectedExperience.value)
    formData.set('pay', this.state.selectedExperience.pay)
    formData.set('factor', this.state.selectedExperience.factor)
    formData.set('periode', this.state.selectedExperience.periode)

    axios
      .post(`/${this.props.data.username}/staff/create`, formData, {
        headers: {
          'content-type': 'multipart/form-data' // do not forget this
        }
      })
      .then(res => {
        if (res.data.status === true) {
          sweet.fire('Created').then(() =>
            this.setState({
              redirect: `/${this.props.data.username}/staff/list`
            })
          )
        } else {
          sweet.fire('Fill in the required fields')
        }
      })
  }

  async componentDidMount() {
    const {data} = await axios.post('/business/experience/list')

    this.setState({workingData: data.data})
  }

  handleChange(event) {
    if (this.state.img.length >= 4) return
    let images = this.state.img
    images.push({
      url: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0]
    })
    this.setState({
      img: images
    })
  }

  paymentControl(val) {
    let min = this.state.isMinWage[0].Value

    this.state.isMinWage.forEach((val, key) =>
      val.Value < min ? (min = val.Value) : ''
    )

    if (val < min) {
      let alert = this.state.alert
      alert.pay.status = true
      alert.pay.text = `minimum ${min} tutar giriniz`
      this.setState({alert: alert})
    } else {
      let alert = this.state.alert
      alert.pay.status = false
      this.setState({alert: alert})
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="col-12 grid-margin">
        <PageTitle>Staff Create</PageTitle>
        <div className="card grid-margin">
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <label htmlFor="upload">
                {this.state.img.length > 0 ? (
                  this.state.img.map(val => (
                    <img
                      src={val.url}
                      style={{width: '100px', height: '100px'}}
                      className="img-thumbnail mx-auto"
                    />
                  ))
                ) : (
                  <span
                    className="glyphicon glyphicon-folder-open align-self-center"
                    aria-hidden="true"
                  >
                    <p>Select image</p>
                    <i className="mx-auto icon-circle-plus icon-lg text-success" />
                  </span>
                )}

                <input
                  type="file"
                  id="upload"
                  style={{display: 'none'}}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <form>
              <div className="row justify-content-between">
                <FormInputElement
                  name="First Name"
                  type="text"
                  value={this.state.firstName}
                  onChange={e => this.setState({firstName: e.target.value})}
                />
                <FormInputElement
                  name="Last Name"
                  type="text"
                  value={this.state.lastName}
                  onChange={e => this.setState({lastName: e.target.value})}
                />
              </div>
              <div className="row">
                <FormInputElement
                  name="Gender"
                  type="selectBox"
                  value={{
                    value: this.state.gender,
                    data: [
                      {value: 'unspecified', name: 'Unspecified'},
                      {value: 'male', name: 'Male'},
                      {value: 'female', name: 'Female'}
                    ]
                  }}
                  onChange={e => this.setState({gender: e.target.value})}
                />
                <FormInputElement
                  name="Date of Birth"
                  type="date"
                  value={this.state.birthday}
                  onChange={e => this.setState({birthday: e})}
                />
              </div>
              <div className="row">
                <FormInputElement
                  name="Martial Status"
                  type="selectBox"
                  value={{
                    value: this.state.martialStatus,
                    data: [
                      {value: 'unspecified', name: 'Unspecified'},
                      {value: 'single', name: 'Single'},
                      {value: 'married', name: 'Married'}
                    ]
                  }}
                  onChange={e => this.setState({martialStatus: e.target.value})}
                />
                <FormInputElement
                  name="E-mail"
                  type="text"
                  value={this.state.email}
                  onChange={e => this.setState({email: e.target.value})}
                />
              </div>
              <div className="row">
                <FormInputElement
                  name="Address"
                  type="text"
                  value={this.state.address}
                  onChange={e => this.setState({address: e.target.value})}
                />
                <FormInputElement
                  name="GSM"
                  type="phone"
                  value={this.state.telephone}
                  onChange={e => this.setState({telephone: e})}
                />
              </div>
              <div className="row">
                <FormInputElement
                  name="Password"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({password: e.target.value})}
                />
                <FormInputElement
                  name="Change Experience"
                  type="selectBox"
                  value={{
                    value: this.state.selectedExperience.value,
                    data: this.state.workingData
                  }}
                  onChange={this.selectExperience}
                />
              </div>
            </form>
          </div>
        </div>
        {typeof this.state.selectedExperience.value !== 'undefined' && (
          <>
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <PageTitle>{this.state.selectedExperience.name}</PageTitle>
                  <form className="form-sample">
                    <div className="row">
                      <FormInputElement
                        name="Pay"
                        type="number"
                        value={this.state.selectedExperience.pay}
                        onChange={e =>
                          this.setState({
                            selectedExperience: Object.assign(
                              {},
                              this.state.selectedExperience,
                              {pay: e.target.value > 0 ? e.target.value : 1}
                            )
                          })
                        }
                      />
                      <FormInputElement
                        name="Factor"
                        type="selectBox"
                        value={{
                          value: this.state.selectedExperience.factor,
                          data: [
                            {value: 'hour', name: 'Hour'},
                            {value: 'week', name: 'Week'},
                            {value: 'month', name: 'Month'}
                          ]
                        }}
                        onChange={e =>
                          this.setState({
                            selectedExperience: Object.assign(
                              {},
                              this.state.selectedExperience,
                              {factor: e.target.value}
                            )
                          })
                        }
                      />
                    </div>
                    <div className="row">
                      <FormInputElement
                        name="Periode"
                        type="number"
                        value={this.state.selectedExperience.periode}
                        onChange={e =>
                          this.setState({
                            selectedExperience: Object.assign(
                              {},
                              this.state.selectedExperience,
                              {periode: e.target.value > 0 ? e.target.value : 1}
                            )
                          })
                        }
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <p className="card-description">
                    Defining a work plan depending on the chosen working method
                  </p>
                  <PlanDetail
                    data={this.state.workingPlan}
                    deletePlan={e => {
                      let data = this.state.workingPlan
                      data[e.day].splice(e.index, 1)
                      this.setState({workingPlan: data})
                    }}
                    addPlan={e => {
                      let data = this.state.workingPlan
                      data[e.day].push({start: e.start, end: e.end})
                      this.setState({workingPlan: data})
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <FormSubmitBtn onClick={this.handleSubmit}>Create</FormSubmitBtn>
      </div>
    )
  }
}

export default StaffCreate
