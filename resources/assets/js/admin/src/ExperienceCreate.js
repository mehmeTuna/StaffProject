import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Redirect} from 'react-router-dom'

import PageTitle from './../assets/page-title'
import FormInputElement from './../assets/form-input'
import FormSubmitBtn from './../assets/form-submit-btn'
import PlanDetail from './../assets/plan-detail'

const sweet = withReactContent(Swal)

const SelectPlanText = ({onClick, value, data, Text}) => {
  return (
    <div
      style={{cursor: 'pointer'}}
      className="card-body display-4 btn-outline-success btn-fw"
      onClick={() => onClick(value)}
    >
      {data === value && <i className="icon-check icon-lg text-primary" />}
      {Text}
    </div>
  )
}

class ExperienceCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currencySymbolUtf8: this.props.data.data.currencySymbolUtf8,
      selectedStartTime: '08:30',
      selectedEndTime: '17:00',
      showDate: false,
      isMinWage: [],
      lang: '',
      name: '',
      pay: '',
      factor: 'hour',
      periode: '1',
      workingPlan: '',
      workingData: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      },
      selectedDay: '',
      planText: [
        {value: 'freeTime', text: 'Free Time'},
        {value: 'plannedTime', text: 'Planned Time'},
        {value: 'fullTime', text: 'Full Time'}
      ],
      alert: false,
      redirect: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.paymentFormat = this.paymentFormat.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    const {data} = await axios.post('/business/location/minWage')

    this.setState({isMinWage: data})
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  paymentFormat(e) {
    this.setState({
      pay: e
    })
  }

  handleSubmit() {
    if (
      this.state.name === '' ||
      this.state.pay === '' ||
      this.state.workingPlan === ''
    ) {
      this.setState({alert: true})
      return
    }
    axios
      .post(`/${this.props.data.username}/experience/create`, {
        experienceName: this.state.name,
        experiencePay: parseInt(this.state.pay),
        experienceFactor: this.state.factor,
        experiencePeriode: parseInt(this.state.periode),
        workingPlan: this.state.workingPlan,
        monday: this.state.workingData.monday,
        tuesday: this.state.workingData.tuesday,
        wednesday: this.state.workingData.wednesday,
        thursday: this.state.workingData.thursday,
        friday: this.state.workingData.friday,
        saturday: this.state.workingData.saturday,
        sunday: this.state.workingData.sunday
      })
      .then(res => {
        sweet.fire('Created').then(() =>
          this.setState({
            redirect: `/${this.props.data.username}/experience/list`
          })
        )
      })
      .catch(res => {
        let responseText = ''
        for (let [key, value] of Object.entries(res.response.data)) {
          responseText = responseText + ` ${value} <br>`
        }
        sweet.fire({html: responseText})
      })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <React.Fragment>
        <div className="container">
          <PageTitle>Experience Create</PageTitle>
          <div className="card">
            <div className="card-body">
              <form className="form-sample">
                <div className="row">
                  <FormInputElement
                    alert={this.state.name === '' && this.state.alert}
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={e => this.setState({name: e.target.value})}
                  />
                  <FormInputElement
                    alert={this.state.pay === '' && this.state.alert}
                    name={`Pay (${this.state.currencySymbolUtf8})`}
                    type="number"
                    value={this.state.pay}
                    onChange={e =>
                      this.setState({
                        pay: e.target.value > 0 ? e.target.value : 1
                      })
                    }
                  />
                </div>
                <div className="row">
                  <FormInputElement
                    name="Factor"
                    type="selectBox"
                    value={{
                      value: this.state.factor,
                      data: [
                        {value: 'hour', name: 'Hour'},
                        {value: 'week', name: 'Week'},
                        {value: 'month', name: 'Month'}
                      ]
                    }}
                    onChange={e => this.setState({factor: e.target.value})}
                  />
                  <FormInputElement
                    alert={this.state.periode === '' && this.state.alert}
                    name="Periode"
                    type="number"
                    value={this.state.periode}
                    onChange={e =>
                      this.setState({
                        periode: e.target.value > 0 ? e.target.value : 1
                      })
                    }
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="grid-margin row mt-2">
            <div
              className={
                this.state.workingPlan === ''
                  ? 'col-sm-12 col-md-12 grid-margin'
                  : 'col-sm-12 col-md-4 grid-margin'
              }
            >
              <div
                className={
                  this.state.workingPlan === '' && this.state.alert
                    ? 'card text-center border border-danger'
                    : 'card text-center'
                }
              >
                <div
                  className={
                    this.state.workingPlan === '' && this.state.alert
                      ? 'card-body text-danger'
                      : 'card-body'
                  }
                >
                  Working Plan Select
                </div>
                {this.state.planText.map((e, key) => (
                  <SelectPlanText
                    onClick={e => this.setState({workingPlan: e})}
                    value={e.value}
                    data={this.state.workingPlan}
                    Text={e.text}
                    key={key}
                  />
                ))}
              </div>
            </div>
            {this.state.workingPlan !== '' && (
              <div className="col-md-8 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <p className="card-description">
                      Defining a work plan depending on the chosen working
                      method
                    </p>
                    <PlanDetail
                      data={this.state.workingData}
                      deletePlan={e => {
                        let data = this.state.workingData
                        data[e.day].splice(e.index, 1)
                        this.setState({workingData: data})
                      }}
                      addPlan={e => {
                        let data = this.state.workingData
                        data[e.day].push({start: e.start, end: e.end})
                        this.setState({workingData: data})
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <FormSubmitBtn onClick={this.handleSubmit}>Create</FormSubmitBtn>
        </div>
      </React.Fragment>
    )
  }
}

export default ExperienceCreate
