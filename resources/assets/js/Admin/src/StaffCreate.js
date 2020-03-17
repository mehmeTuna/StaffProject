import React from 'react'
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import TimeField from 'react-simple-timefield'
import DatePicker from 'react-date-picker'
import Input from 'react-phone-number-input/input'

const sweet = withReactContent(Swal)

function PlanList(props) {
  if (typeof props.data !== 'object') return

  return props.data.map((value, key) => (
    <button
      key={key}
      type="button"
      onClick={() => props.deleteTime(key, props.day)}
      className="m-2 btn btn-info font-weight-bold"
    >
      <span className="m-1">
        {value.start}- {value.end}
      </span>
      <span className="badge badge-light">
        <i className="icon-cross" />
      </span>
    </button>
  ))
}

function ExperinceSelect(data) {
  return data.map((value, key) => (
    <option key={key} value={key}>
      {value.identifier}
    </option>
  ))
}

class StaffCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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
      workingTimeConditions: '',
      workingConditions: '',
      selectedStartTime: '08:30',
      selectedEndTime: '17:00',
      showDate: false,
      pay: '',
      factor: '',
      periode: '1',
      workingData: [],
      selectedExperience: '',
      alert: false,
      redirect: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.customClock = this.customClock.bind(this)

    this.changeStartTime = this.changeStartTime.bind(this)
    this.changeEndTime = this.changeEndTime.bind(this)

    this.dataSet = this.dataSet.bind(this)

    this.deleteTime = this.deleteTime.bind(this)

    this.paymentControl = this.paymentControl.bind(this)

    this.compareTime = this.compareTime.bind(this)
    this.updateWorkingDataPay = this.updateWorkingDataPay.bind(this)
    this.updateWorkingDataFactor = this.updateWorkingDataFactor.bind(this)
    this.updateWorkingDataPeriode = this.updateWorkingDataPeriode.bind(this)
  }

  handleSubmit() {
    if (this.state.selectedExperience === '') {
      sweet.fire({
        title: 'Select Experince',
        timer: 1500
      })
      return
    }

    if (this.state.img.length === 0) {
      sweet.fire({
        title: 'Select Image',
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
    formData.set(
      'workingPlan',
      JSON.stringify(
        this.state.workingData[this.state.selectedExperience].workingPlan
      )
    )
    formData.set(
      'experience',
      this.state.workingData[this.state.selectedExperience].id
    )
    formData.set(
      'pay',
      this.state.workingData[this.state.selectedExperience].pay
    )
    formData.set(
      'factor',
      this.state.workingData[this.state.selectedExperience].factor
    )
    formData.set(
      'periode',
      this.state.workingData[this.state.selectedExperience].periode
    )

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
    const { data } = await axios.post('/business/experience/list')

    this.setState({ workingData: data })
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

  compareTime(str1, str2) {
    if (str1 === str2) {
      return 0
    }
    let time1 = str1.split(':')
    let time2 = str2.split(':')

    if (time1[0][0] == 0) {
      time1 = time1[0][1]
    }

    if (time2[0][0] == 0) {
      time2 = time2[0][1]
    }

    if (eval(time1[0]) > eval(time2[0])) {
      return 1
    } else if (
      eval(time1[0]) === eval(time2[0]) &&
      eval(time1[1]) > eval(time2[1])
    ) {
      return 1
    } else {
      return -1
    }
  }

  deleteTime(key, day) {
    switch (day) {
      case 'monday':
        let dataMonday = this.state.workingData
        dataMonday[this.state.selectedExperience].workingPlan.monday.splice(
          key,
          1
        )
        this.setState({ workingData: dataMonday })
        console.log(this.state.workingData)
        break
      case 'tuesday':
        let dataTuesday = this.state.workingData
        dataTuesday[this.state.selectedExperience].workingPlan.tuesday.splice(
          key,
          1
        )
        this.setState({ workingData: dataTuesday })
        break
      case 'wednesday':
        let dataWednesday = this.state.workingData
        dataWednesday[
          this.state.selectedExperience
        ].workingPlan.wednesday.splice(key, 1)
        this.setState({ workingData: dataWednesday })
        break
      case 'thursday':
        let dataThursday = this.state.workingData
        dataThursday[this.state.selectedExperience].workingPlan.thursday.splice(
          key,
          1
        )
        this.setState({ workingData: dataThursday })
        break
      case 'friday':
        let dataFriday = this.state.workingData
        dataFriday[this.state.selectedExperience].workingPlan.friday.splice(
          key,
          1
        )
        this.setState({ workingData: dataFriday })
        break
      case 'saturday':
        let dataSaturday = this.state.workingData
        dataSaturday[this.state.selectedExperience].workingPlan.saturday.splice(
          key,
          1
        )
        this.setState({ workingData: dataSaturday })
        break
      case 'sunday':
        let dataSunday = this.state.workingData
        dataSunday[this.state.selectedExperience].workingPlan.sunday.splice(
          key,
          1
        )
        this.setState({ workingData: dataSunday })
        break
    }
  }

  dataSet() {
    if (
      this.state.selectedStartTime === '' ||
      this.state.selectedEndTime === ''
    )
      return

    if (
      this.compareTime(
        this.state.selectedStartTime,
        this.state.selectedEndTime
      ) === 1
    ) {
      sweet
        .fire({
          position: 'top-end',
          icon: 'info',
          title: 'The exit time cannot be before the entry time',
          showConfirmButton: false,
          timer: 1500
        })
        .then(() => console.log('then'))
      return
    }

    switch (this.state.selectedDay) {
      case 'monday':
        let dataMonday = this.state.workingData
        dataMonday[this.state.selectedExperience].workingPlan.monday.push({
          start: this.state.selectedStartTime,
          end: this.state.selectedEndTime
        })
        this.setState({ workingData: dataMonday })
        break
      case 'tuesday':
        let dataTuesday = this.state.workingData
        dataTuesday[this.state.selectedExperience].workingPlan.tuesday.push({
          start: this.state.selectedStartTime,
          end: this.state.selectedEndTime
        })
        this.setState({ workingData: dataTuesday })
        break
      case 'wednesday':
        let dataWednesday = this.state.workingData
        dataWednesday[this.state.selectedExperience].workingPlan.wednesday.push(
          {
            start: this.state.selectedStartTime,
            end: this.state.selectedEndTime
          }
        )
        this.setState({ workingData: dataWednesday })
        break
      case 'thursday':
        let dataThursday = this.state.workingData
        dataThursday[this.state.selectedExperience].workingPlan.thursday.push({
          start: this.state.selectedStartTime,
          end: this.state.selectedEndTime
        })
        this.setState({ workingData: dataThursday })
        break
      case 'friday':
        let dataFriday = this.state.workingData
        dataFriday[this.state.selectedExperience].workingPlan.friday.push({
          start: this.state.selectedStartTime,
          end: this.state.selectedEndTime
        })
        this.setState({ workingData: dataFriday })
        break
      case 'saturday':
        let dataSaturday = this.state.workingData
        dataSaturday[this.state.selectedExperience].workingPlan.saturday.push({
          start: this.state.selectedStartTime,
          end: this.state.selectedEndTime
        })
        this.setState({ workingData: dataSaturday })
        break
      case 'sunday':
        let dataSunday = this.state.workingData
        dataSunday[this.state.selectedExperience].workingPlan.sunday.push({
          start: this.state.selectedStartTime,
          end: this.state.selectedEndTime
        })
        this.setState({ workingData: dataSunday })
        break
      default:
        console.log('dataSet foksiyion kismi default')
        break
    }
  }

  changeStartTime(time) {
    this.setState({ selectedStartTime: time.target.value })
  }

  changeEndTime(time) {
    this.setState({ selectedEndTime: time.target.value })
  }

  customClock(data) {
    this.setState({ selectedDay: data })
    sweet
      .fire({
        title: 'Specify Time',
        html: (
          <div className="row">
            <div className="col-8 mb-2 mx-auto">
              Login
              <TimeField
                input={<input type="text" className="form-control" />}
                value={this.state.selectedStartTime}
                onChange={this.changeStartTime}
              />
            </div>
            <div className="col-8 mx-auto">
              Exit
              <TimeField
                input={<input type="text" className="form-control" />}
                value={this.state.selectedEndTime}
                onChange={this.changeEndTime}
              />
            </div>
          </div>
        )
      })
      .then(result => {
        if (result.value === true) this.dataSet()
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
      this.setState({ alert: alert })
    } else {
      let alert = this.state.alert
      alert.pay.status = false
      this.setState({ alert: alert })
    }
  }

  updateWorkingDataPay(val) {
    let data = this.state.workingData
    data[this.state.selectedExperience].pay = val
    this.setState({ workingData: data })
  }

  updateWorkingDataPeriode(val) {
    let data = this.state.workingData
    data[this.state.selectedExperience].periode = val
    this.setState({ workingData: data })
  }

  updateWorkingDataFactor(val) {
    let data = this.state.workingData
    data[this.state.selectedExperience].factor = val
    this.setState({ workingData: data })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="col-12 grid-margin">
        <div className="col-sm-12 col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center display-4 ml-4">Staff Define</h4>
            </div>
          </div>
        </div>
        <div className="card grid-margin">
          <div className="card-body">
            <div className="text-center w-25 mx-auto">
              {this.state.img.length > 0 &&
                this.state.img.map(val => (
                  <img
                    src={val.url}
                    style={{ width: '100px', height: '100px' }}
                    className="img-thumbnail mx-auto"
                  />
                ))}
              {this.state.img.length === 0 && (
                <label htmlFor="upload">
                  <span
                    className="glyphicon glyphicon-folder-open align-self-center"
                    aria-hidden="true"
                  >
                    <p>Image Add</p>
                    <i className="icon-circle-plus icon-lg text-success" />
                  </span>
                  <input
                    type="file"
                    id="upload"
                    style={{ display: 'none' }}
                    onChange={this.handleChange}
                  />
                </label>
              )}
            </div>
            <form className="form-sample">
              <p className="card-description"></p>
              <div className="row">
                <div className="col-md-6 form-group row">
                  <label className="col-sm-2 col-form-label text-right pb-0">
                    First Name
                  </label>
                  <div className="col-sm-9 d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={e =>
                        this.setState({ firstName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6 form-group row">
                  <label className="col-sm-2 col-form-label text-right pb-0">
                    Last Name
                  </label>
                  <div className="col-sm-9 d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={e =>
                        this.setState({ lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group row">
                  <label className="col-sm-2 col-form-label text-right">
                    Gender
                  </label>
                  <div className="col-sm-9 d-flex align-items-center">
                    <select
                      value={this.state.gender}
                      onChange={e => this.setState({ gender: e.target.value })}
                      className="form-control"
                    >
                      <option value="unspecified">Unspecified</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6 form-group row">
                  <label className="col-sm-2 col-form-label text-right">
                    Date of Birth
                  </label>
                  <div className="col-sm-9 d-flex align-items-center">
                    <DatePicker
                      value={this.state.birthday}
                      calendarClassName="form-control"
                      onChange={e => this.setState({ birthday: e })}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group row">
                  <label className="col-sm-2 col-form-label text-right">
                    Martial Status
                  </label>
                  <div className="col-sm-9 d-flex align-items-center">
                    <select
                      value={this.state.martialStatus}
                      onChange={e =>
                        this.setState({ martialStatus: e.target.value })
                      }
                      className="form-control"
                    >
                      <option value="unspecified">Unspecified</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6 form-group row">
                  <label className="col-sm-2 col-form-label text-right">
                    E-mail
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group row">
                  <label className="col-sm-2 col-form-label text-right">
                    Address
                  </label>
                  <div className="col-sm-9 d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.address}
                      onChange={e => this.setState({ address: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-6 form-group row">
                  <label className="col-sm-2 col-form-label text-right">
                    GSM
                  </label>
                  <div className="col-sm-9 d-flex align-items-center">
                    <Input
                      className="form-control"
                      value={this.state.telephone}
                      onChange={e => this.setState({ telephone: e })}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group row">
                  <label className="col-sm-2 col-form-label text-right">
                    Password
                  </label>
                  <div className="col-sm-9 d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.password}
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6 form-group row">
                  <label className="col-sm-2 col-form-label text-right">
                    Change Experience
                  </label>
                  <div className="col-sm-9 d-flex align-items-center">
                    <select
                      value={this.state.selectedExperience}
                      onChange={e =>
                        this.setState({ selectedExperience: e.target.value })
                      }
                      className="form-control"
                    >
                      <option value="">Change Experience</option>
                      {ExperinceSelect(this.state.workingData)}
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {this.state.selectedExperience !== '' && (
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="text-center display-4 mb-3">
                  {
                    this.state.workingData[this.state.selectedExperience]
                      .identifier
                  }
                </h4>
                <form className="form-sample" onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 form-group row">
                      <label className="col-sm-2 col-form-label text-right">
                        Pay
                      </label>
                      <div className="col-sm-9 d-flex align-items-center">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Pay"
                          value={
                            this.state.workingData[
                              this.state.selectedExperience
                            ].pay
                          }
                          onChange={event =>
                            this.updateWorkingDataPay(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 form-group row">
                      <label className="col-sm-2 col-form-label text-right">
                        Factor
                      </label>
                      <div className="col-sm-9 d-flex align-items-cneter">
                        <select
                          value={
                            this.state.workingData[
                              this.state.selectedExperience
                            ].factor
                          }
                          onChange={event =>
                            this.updateWorkingDataFactor(event.target.value)
                          }
                          className="form-control"
                        >
                          <option value="hour">Hour</option>
                          <option value="week">Week</option>
                          <option value="month">Month</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 form-group row">
                      <label className="col-sm-2 col-form-label text-right">
                        Periode
                      </label>
                      <div className="col-sm-9 d-flex align-items-center">
                        <input
                          className="form-control"
                          type="number"
                          value={
                            this.state.workingData[
                              this.state.selectedExperience
                            ].periode
                          }
                          onChange={event =>
                            this.updateWorkingDataPeriode(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {this.state.selectedExperience !== '' && (
          <div className="row flex-grow col-md-12 grid-margin stretch-card">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <p className="card-description">
                    Defining a work plan depending on the chosen working method
                  </p>
                  <div className="row display-3">
                    <div className="col-3">Monday</div>
                    <div className="col-9">
                      {this.state.workingData[this.state.selectedExperience]
                        .workingPlan.monday.length !== 0 && (
                        <PlanList
                          data={
                            this.state.workingData[
                              this.state.selectedExperience
                            ].workingPlan.monday
                          }
                          day="monday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock('monday')}
                      >
                        <span className="badge">
                          <i className="icon-circle-plus" />
                        </span>
                        <span>Add new Plan</span>
                      </button>
                    </div>
                  </div>
                  <div className="row display-3">
                    <div className="col-3">Tuesday</div>
                    <div className="col-9">
                      {this.state.workingData[this.state.selectedExperience]
                        .workingPlan.tuesday.length !== 0 && (
                        <PlanList
                          data={
                            this.state.workingData[
                              this.state.selectedExperience
                            ].workingPlan.tuesday
                          }
                          day="tuesday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock('tuesday')}
                      >
                        <span className="badge">
                          <i className="icon-circle-plus" />
                        </span>
                        <span>Add new Plan</span>
                      </button>
                    </div>
                  </div>
                  <div className="row display-3">
                    <div className="col-3">Wednesday</div>
                    <div className="col-9">
                      {this.state.workingData[this.state.selectedExperience]
                        .workingPlan.wednesday.length !== 0 && (
                        <PlanList
                          data={
                            this.state.workingData[
                              this.state.selectedExperience
                            ].workingPlan.wednesday
                          }
                          day="wednesday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock('wednesday')}
                      >
                        <span className="badge">
                          <i className="icon-circle-plus" />
                        </span>
                        <span>Add new Plan</span>
                      </button>
                    </div>
                  </div>
                  <div className="row display-3">
                    <div className="col-3">Thursday</div>
                    <div className="col-9">
                      {this.state.workingData[this.state.selectedExperience]
                        .workingPlan.thursday.length !== 0 && (
                        <PlanList
                          data={
                            this.state.workingData[
                              this.state.selectedExperience
                            ].workingPlan.thursday
                          }
                          day="thursday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock('thursday')}
                      >
                        <span className="badge">
                          <i className="icon-circle-plus" />
                        </span>
                        <span>Add new Plan</span>
                      </button>
                    </div>
                  </div>
                  <div className="row display-3">
                    <div className="col-3">Friday</div>
                    <div className="col-9">
                      {this.state.workingData[this.state.selectedExperience]
                        .workingPlan.friday.length !== 0 && (
                        <PlanList
                          data={
                            this.state.workingData[
                              this.state.selectedExperience
                            ].workingPlan.friday
                          }
                          day="friday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock('friday')}
                      >
                        <span className="badge">
                          <i className="icon-circle-plus" />
                        </span>
                        <span>Add new Plan</span>
                      </button>
                    </div>
                  </div>
                  <div className="row display-3">
                    <div className="col-3">Saturday</div>
                    <div className="col-9">
                      {this.state.workingData[this.state.selectedExperience]
                        .workingPlan.saturday.length !== 0 && (
                        <PlanList
                          data={
                            this.state.workingData[
                              this.state.selectedExperience
                            ].workingPlan.saturday
                          }
                          day="saturday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock('saturday')}
                      >
                        <span className="badge">
                          <i className="icon-circle-plus" />
                        </span>
                        <span>Add new Plan</span>
                      </button>
                    </div>
                  </div>
                  <div className="row display-3">
                    <div className="col-3">Sunday</div>
                    <div className="col-9">
                      {this.state.workingData[this.state.selectedExperience]
                        .workingPlan.sunday.length !== 0 && (
                        <PlanList
                          data={
                            this.state.workingData[
                              this.state.selectedExperience
                            ].workingPlan.sunday
                          }
                          day="sunday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock('sunday')}
                      >
                        <span className="badge">
                          <i className="icon-circle-plus" />
                        </span>
                        <span>Add new Plan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="col-sm-12 col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row display-3">
                <button
                  type="button"
                  className="btn btn-success font-weight-bold mx-auto mt-4"
                  onClick={this.handleSubmit}
                >
                  <span className="badge">
                    <i className="icon-circle-plus" />
                  </span>
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StaffCreate
