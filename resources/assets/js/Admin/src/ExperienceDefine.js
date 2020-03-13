import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import TimeField from "react-simple-timefield";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Redirect } from "react-router-dom";

const sweet = withReactContent(Swal);

function PlanList(props) {
  if (typeof props.data !== "object") return;

  const response = props.data.map((value, key) => (
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
        <i className="icon-cross"></i>
      </span>
    </button>
  ));

  return response;
}

class ExperienceDefine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStartTime: "08:30",
      selectedEndTime: "17:00",
      showDate: false,
      isMinWage: [],
      lang: "",
      name: "",
      pay: "",
      factor: "hour",
      periode: "1",
      workingPlan: "",
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
      selectedDay: "",
      alert: {
        pay: {
          status: false,
          text: "minimum tutar giriniz"
        }
      },
      redirect: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    this.customClock = this.customClock.bind(this);

    this.dataSet = this.dataSet.bind(this);

    this.deleteTime = this.deleteTime.bind(this);

    this.compareTime = this.compareTime.bind(this);
    this.paymentFormatpaymentFormat = this.paymentFormat.bind(this);

    this.changeStartTime = this.changeStartTime.bind(this);
    this.changeEndTime = this.changeEndTime.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.post("/business/location/minWage");

    this.setState({ isMinWage: data });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  compareTime(str1, str2) {
    if (str1 === str2) {
      return 0;
    }
    let time1 = str1.split(":");
    let time2 = str2.split(":");

    if (time1[0][0] == 0) {
      time1 = time1[0][1];
    }

    if (time2[0][0] == 0) {
      time2 = time2[0][1];
    }

    if (eval(time1[0]) > eval(time2[0])) {
      return 1;
    } else if (
      eval(time1[0]) === eval(time2[0]) &&
      eval(time1[1]) > eval(time2[1])
    ) {
      return 1;
    } else {
      return -1;
    }
  }

  paymentFormat(e) {
    this.setState({
      pay: e
    });
  }

  handleSubmit() {
    axios
      .post(`/${this.props.data.username}/experience/create`, {
        experienceName: this.state.name,
        experiencePay: parseInt(this.state.pay),
        experienceFactor: this.state.factor,
        experiencePeriode: parseInt(this.state.periode),
        workingPlan: this.state.workingPlan,
        monday: this.state.monday,
        tuesday: this.state.tuesday,
        wednesday: this.state.wednesday,
        thursday: this.state.thursday,
        friday: this.state.friday,
        saturday: this.state.saturday,
        sunday: this.state.sunday
      })
      .then(res => {
        sweet.fire("Created").then(() =>
          this.setState({
            redirect: `/${this.props.data.username}/experience/list`
          })
        );
      });
  }

  deleteTime(key, day) {
    switch (day) {
      case "monday":
        let dataMonday = this.state.monday;
        dataMonday.splice(key, 1);
        this.setState({ monday: dataMonday });
        break;
      case "tuesday":
        let dataTuesday = this.state.tuesday;
        dataTuesday.splice(key, 1);
        this.setState({ tuesday: dataTuesday });
        break;
      case "wednesday":
        let dataWednesday = this.state.wednesday;
        dataWednesday.splice(key, 1);
        this.setState({ wednesday: dataWednesday });
        break;
      case "thursday":
        let dataThursday = this.state.thursday;
        dataThursday.splice(key, 1);
        this.setState({ Thursday: dataThursday });
        break;
      case "friday":
        let dataFriday = this.state.friday;
        dataFriday.splice(key, 1);
        this.setState({ friday: dataFriday });
        break;
      case "saturday":
        let dataSaturday = this.state.saturday;
        dataSaturday.splice(key, 1);
        this.setState({ saturday: dataSaturday });
        break;
      case "sunday":
        let dataSunday = this.state.sunday;
        dataSunday.splice(key, 1);
        this.setState({ sunday: dataSunday });
        break;
    }
  }

  dataSet() {
    console.log(this.state.selectedStartTime);
    console.log(this.state.selectedEndTime);
    if (
      this.state.selectedStartTime === "" ||
      this.state.selectedEndTime === ""
    )
      return;

    if (
      this.compareTime(
        this.state.selectedStartTime,
        this.state.selectedEndTime
      ) === 1
    ) {
      sweet
        .fire({
          position: "top-end",
          icon: "info",
          title: "Cikis saati giris saatinden once olamaz",
          showConfirmButton: false,
          timer: 1500
        })
        .then(() => console.log("hatali saat"));
      return;
    }

    switch (this.state.selectedDay) {
      case "monday":
        let dataMonday = this.state.monday;
        dataMonday.push({
          start: this.state.selectedStartTime,
          end: this.state.selectedEndTime
        });
        this.setState({ monday: dataMonday });
        break;
      case "tuesday":
        let dataTuesday = this.state.tuesday;
        dataTuesday.push({
          start: this.state.selectedStartTime,
          end: this.state.selectedEndTime
        });
        this.setState({ tuesday: dataTuesday });
        break;
      case "wednesday":
        let dataWednesday = this.state.wednesday;
        dataWednesday.push({
          start: this.state.selectedStartTime,
          end: this.state.selectedEndTime
        });
        this.setState({ wednesday: dataWednesday });
        break;
      case "thursday":
        let dataThursday = this.state.thursday;
        dataThursday.push({
          start: this.state.selectedStartTime,
          end: this.state.selectedEndTime
        });
        this.setState({ Thursday: dataThursday });
        break;
      case "friday":
        let dataFriday = this.state.friday;
        dataFriday.push({
          start: this.state.selectedStartTime,
          end: this.state.selectedEndTime
        });
        this.setState({ friday: dataFriday });
        break;
      case "saturday":
        let dataSaturday = this.state.saturday;
        dataSaturday.push({
          start: this.state.selectedStartTime,
          end: this.state.selectedEndTime
        });
        this.setState({ saturday: dataSaturday });
        break;
      case "sunday":
        let dataSunday = this.state.sunday;
        dataSunday.push({
          start: this.state.selectedStartTime,
          end: this.state.selectedEndTime
        });
        this.setState({ sunday: dataSunday });
        break;
      default:
        console.log("dataSet foksiyion kismi default");
        break;
    }
  }

  changeStartTime(time) {
    this.setState({ selectedStartTime: time.target.value });
  }

  changeEndTime(time) {
    this.setState({ selectedEndTime: time.target.value });
  }

  customClock(data) {
    this.setState({ selectedDay: data });
    sweet
      .fire({
        title: "Saat Belirtiniz",
        html: (
          <div className="row">
            <div className="col-8 mb-2 mx-auto">
              Giris
              <TimeField
                input={<input type="text" className="form-control" />}
                value={this.state.selectedStartTime}
                onChange={this.changeStartTime}
              />
            </div>
            <div className="col-8 mx-auto">
              Cikis
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
        if (result.value === true) this.dataSet();
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <React.Fragment>
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center display-4">Experience Define</h4>
              <form className="form-sample" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label mb-4 text-right pb-0">
                        Name
                      </label>
                      <div className="col-sm-9 p-0 d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 form-group row">
                    {this.state.alert.pay.status === true && (
                      <p className="col-sm-6 mx-auto text-danger">
                        {this.state.alert.pay.text}
                      </p>
                    )}
                    <label className="col-sm-2 col-form-label text-right">
                      Pay
                    </label>
                    <div className="col-sm-9 p-0 d-flex align-items-center">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Pay"
                        value={this.state.pay}
                        onChange={e => this.paymentFormat(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label text-right">
                        Factor
                      </label>
                      <div className="col-sm-9 p-0 d-flex align-items-center">
                        <select
                          name="factor"
                          value={this.state.factor}
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="hour">Hour</option>
                          <option value="week">Week</option>
                          <option value="month">Month</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 form-group row">
                    <label className="col-sm-2 col-form-label text-right">
                      Periode
                    </label>
                    <div className="col-sm-9 p-0 d-flex align-items-center">
                      <input
                        className="form-control"
                        name="periode"
                        value={this.state.periode}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row col-12 grid-margin m-0 p-0">
          <div
            className={
              this.state.workingPlan === ""
                ? "col-sm-12 col-md-12 grid-margin stretch-card"
                : "col-sm-12 col-md-4 grid-margin stretch-card"
            }
          >
            <div className="card text-center">
              <div className="card-body">Working Plan Select</div>
              <div
                className="card-body display-4 btn-outline-success btn-fw"
                onClick={event => this.setState({ workingPlan: "freeTime" })}
              >
                {this.state.workingPlan === "freeTime" && (
                  <i className="icon-check icon-lg text-primary" />
                )}
                Free Time
              </div>
              <div
                className="card-body display-4 btn-outline-success btn-fw"
                onClick={event => this.setState({ workingPlan: "plannedTime" })}
              >
                {this.state.workingPlan === "plannedTime" && (
                  <i className="icon-check icon-lg text-primary" />
                )}
                Planned Time
              </div>
              <div
                className="card-body display-4 btn-outline-success btn-fw"
                onClick={() => this.setState({ workingPlan: "fullTime" })}
              >
                {this.state.workingPlan === "fullTime" && (
                  <i className="icon-check icon-lg text-primary" />
                )}
                Full Time
              </div>
            </div>
          </div>
          {this.state.workingPlan !== "" && (
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <p className="card-description">
                    Seçilen çalışma şekline bağlı çalışma planı tanımlama
                  </p>
                  <div className="row display-3">
                    <div className="col-3">Pazartesi</div>
                    <div className="col-9">
                      {this.state.monday.length !== 0 && (
                        <PlanList
                          data={this.state.monday}
                          day="monday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock("monday")}
                      >
                        <span className="badge">
                          <i className="icon-circle-plus" />
                        </span>
                        <span>Add new Plan</span>
                      </button>
                    </div>
                  </div>
                  <div className="row display-3">
                    <div className="col-3">Salı</div>
                    <div className="col-9">
                      {this.state.tuesday.length !== 0 && (
                        <PlanList
                          data={this.state.tuesday}
                          day="tuesday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock("tuesday")}
                      >
                        <span className="badge">
                          <i className="icon-circle-plus" />
                        </span>
                        <span>Add new Plan</span>
                      </button>
                    </div>
                  </div>
                  <div className="row display-3">
                    <div className="col-3">Çarşamba</div>
                    <div className="col-9">
                      {this.state.wednesday.length !== 0 && (
                        <PlanList
                          data={this.state.wednesday}
                          day="wednesday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock("wednesday")}
                      >
                        <span className="badge">
                          <i className="icon-circle-plus" />
                        </span>
                        <span>Add new Plan</span>
                      </button>
                    </div>
                  </div>
                  <div className="row display-3">
                    <div className="col-3">Perşembe</div>
                    <div className="col-9">
                      {this.state.thursday.length !== 0 && (
                        <PlanList
                          data={this.state.thursday}
                          day="thursday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock("thursday")}
                      >
                        <span className="badge">
                          <i className="icon-circle-plus" />
                        </span>
                        <span>Add new Plan</span>
                      </button>
                    </div>
                  </div>
                  <div className="row display-3">
                    <div className="col-3">Cuma</div>
                    <div className="col-9">
                      {this.state.friday.length !== 0 && (
                        <PlanList
                          data={this.state.friday}
                          day="friday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock("friday")}
                      >
                        <span className="badge">
                          <i className="icon-circle-plus" />
                        </span>
                        <span>Add new Plan</span>
                      </button>
                    </div>
                  </div>
                  <div className="row display-3">
                    <div className="col-3">Cumartesi</div>
                    <div className="col-9">
                      {this.state.saturday.length !== 0 && (
                        <PlanList
                          data={this.state.saturday}
                          day="saturday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock("saturday")}
                      >
                        <span className="badge">
                          <i className="icon-circle-plus" />
                        </span>
                        <span>Add new Plan</span>
                      </button>
                    </div>
                  </div>
                  <div className="row display-3">
                    <div className="col-3">Pazar</div>
                    <div className="col-9">
                      {this.state.sunday.length !== 0 && (
                        <PlanList
                          data={this.state.sunday}
                          day="sunday"
                          deleteTime={this.deleteTime}
                        />
                      )}
                      <button
                        type="button"
                        className="m-2 btn btn-info font-weight-bold"
                        onClick={() => this.customClock("sunday")}
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
          )}
        </div>
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
      </React.Fragment>
    );
  }
}

export default ExperienceDefine;
