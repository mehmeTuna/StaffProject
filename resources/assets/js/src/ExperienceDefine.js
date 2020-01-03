import React from "react";
import axios from "axios";
import TimeKeeper from 'react-timekeeper';

function PlanList(data) {

    const response = data.map((value, key) => <button key={key} type="button" className="btn btn-info font-weight-bold">
        <span className="m-1">
            {value.started}
            - {value.end}
        </span>
        <span className="badge badge-light">
            <i className="icon-cross"></i>
        </span>
    </button>);

    return response;
}

class ExperienceDefine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDate: false,
            isMinWage: [],
            lang: "",
            name: "",
            pay: "",
            factor: "hour",
            periode: "1",
            workingPlan: "",
            isCurrentDayDate: {
                day: "",
                start: "",
                end: "",
                name: ""
            },
            workingPlanData: [
                [], //monday
                [], //tuesday
                [], //wednesday
                [], //thursday
                [], //friday
                [], //saturday
                [], //sunday
            ]
        };

        this.createExperience = this
            .createExperience
            .bind(this);

        this.selectCustomDate = this
            .selectCustomDate
            .bind(this);

    }

    async componentDidMount() {
        const {data} = await axios.post("/business/location/minWage");
        this.setState({isMinWage: data});

    }

    handleSubmit(event) {
        console.log(this.state);
    }

    createExperience() {
        axios.post("/business/experience/create", {
            name: this.state.name,
            pay: this.state.pay,
            factor: this.state.factor,
            periode: this.state.periode,
            working: 1,
            workingPlanData: 1
        });
    }

    selectCustomDate(data) {
        let hour = data.clock.hour;
        let minute = data.clock.minute;
        let day = data.day;

        let customizeDate = {
            day: day,
            start: hour + " " + minute,
            end: "",
            name: ""
        };

        if (this.state.isCurrentDayDate.day !== "" && this.state.isCurrentDayDate.start !== "" && this.state.isCurrentDayDate.end !== "") {
            let data = this.state.workingPlanData;
            data.push(customizeDate);
            this.setState({workingPlanData: data});
        }
        this.setState({isCurrentDayDate: customizeDate});
        console.log(data.clock.hour);
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Experience Define</h4>
                            <form className="form-sample" onSubmit={this.handleSubmit}>
                                <p className="card-description">
                                    Experience info
                                </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Experience Name</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={this.state.name}
                                                    onChange={(event) => this.setState({name: event.target.value})}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Pay</label>
                                            <div className="col-sm-9">
                                                <input
                                                    className="form-control"
                                                    placeholder="Pay"
                                                    value={this.state.pay}
                                                    onChange={(event) => this.setState({pay: event.target.value})}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Factor</label>
                                            <div className="col-sm-9">
                                                <select
                                                    value={this.state.factor}
                                                    onChange={(event) => this.setState({factor: event.target.value})}
                                                    className="form-control">
                                                    <option value="hour">Hour</option>
                                                    <option value="week">Week</option>
                                                    <option value="month">Month</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Periode</label>
                                            <div className="col-sm-9">
                                                <input
                                                    className="form-control"
                                                    value={this.state.periode}
                                                    onChange={(event) => this.setState({periode: event.target.value})}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-9">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Working Plan</label>
                                            <div className="col-sm-3">
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            checked={this.state.workingPlan === "freeTime"}
                                                            onChange={(event) => this.setState({workingPlan: event.target.value})}
                                                            value="freeTime"/>
                                                        Free Time
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            checked={this.state.workingPlan === "plannedTime"}
                                                            onChange={(event) => this.setState({workingPlan: event.target.value})}
                                                            value="plannedTime"/>
                                                        Planned Time
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            checked={this.state.workingPlan === "fullTime"}
                                                            onChange={(event) => this.setState({workingPlan: event.target.value})}
                                                            value="fullTime"/>
                                                        Full Time
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="card-description">
                                    Seçilen çalışma şekline bağlı çalışma planı tanımlama
                                </p>
                                <div className="row display-2">
                                    <div className="col-3">Pazartesi
                                    </div>
                                    <div className="col-9">
                                        {this.state.showDate === true && <TimeKeeper
                                            switchToMinuteOnHourSelect={true}
                                            closeOnMinuteSelect={true}
                                            onChange={(event) => this.selectCustomDate({day: 0, clock: event})}
                                            onDoneClick={() => this.setState({showDate: false})}/>}
                                        <button
                                            type="button"
                                            className="btn btn-info font-weight-bold"
                                            onClick={() => {
                                            this.setState({showDate: true})
                                        }}>
                                            <span className="badge">
                                                <i className="icon-circle-plus"></i>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                        {this.state.monday !== 0 && PlanList(this.state.monday)}
                                    </div>
                                </div>
                                <div className="row display-3">
                                    <div className="col-3">Salı
                                    </div>
                                    <div className="col-9">
                                        <button type="button" className="btn btn-info font-weight-bold">
                                            <span className="badge">
                                                <i className="icon-circle-plus"></i>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                        {this.state.tuesday !== 0 && PlanList(this.state.tuesday)}
                                    </div>
                                </div>
                                <div className="row display-3">
                                    <div className="col-3">Çarşamba
                                    </div>
                                    <div className="col-9">
                                        <button type="button" className="btn btn-info font-weight-bold">
                                            <span className="badge">
                                                <i className="icon-circle-plus"></i>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                        {this.state.wednesday !== 0 && PlanList(this.state.tuesday)}
                                    </div>
                                </div>
                                <div className="row display-3">
                                    <div className="col-3">Perşembe
                                    </div>
                                    <div className="col-9">
                                        <button type="button" className="btn btn-info font-weight-bold">
                                            <span className="badge">
                                                <i className="icon-circle-plus"></i>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                        {this.state.thursday !== 0 && PlanList(this.state.thursday)}
                                    </div>
                                </div>
                                <div className="row display-3">
                                    <div className="col-3">Cuma
                                    </div>
                                    <div className="col-9">
                                        <button type="button" className="btn btn-info font-weight-bold">
                                            <span className="badge">
                                                <i className="icon-circle-plus"></i>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                        {this.state.friday !== 0 && PlanList(this.state.friday)}
                                    </div>
                                </div>
                                <div className="row display-3">
                                    <div className="col-3">Cumartesi
                                    </div>
                                    <div className="col-9">
                                        <button type="button" className="btn btn-info font-weight-bold">
                                            <span className="badge">
                                                <i className="icon-circle-plus"></i>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                        {this.state.saturday !== 0 && PlanList(this.state.saturday)}
                                    </div>
                                </div>
                                <div className="row display-3">
                                    <div className="col-3">Pazar
                                    </div>
                                    <div className="col-9">
                                        <button type="button" className="btn btn-info font-weight-bold">
                                            <span className="badge">
                                                <i className="icon-circle-plus"></i>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                        {this.state.sunday !== 0 && PlanList(this.state.sunday)}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    };
}

export default ExperienceDefine;