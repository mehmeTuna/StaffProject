import React from "react";
import axios from "axios";
import TimeKeeper from 'react-timekeeper';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const sweet = withReactContent(Swal);

function PlanList(props) {
    if (typeof props.data !== "object") 
        return;
    
    const response = props
        .data
        .map((value, key) => <button
            key={key}
            type="button"
            onClick={() => props.deleteTime(key, props.day)}
            className="m-2 btn btn-info font-weight-bold">
            <span className="m-1">
                {value.start}
                - {value.end}
            </span>
            <span className="badge badge-light">
                <i className="icon-cross"></i>
            </span>
        </button>);

    return response;
}

function ShowStartClock(props) {
    return <div className="row">
        <div className="mx-auto">
            <h3>Select Start Clock</h3>
            <TimeKeeper
                switchToMinuteOnHourSelect={true}
                onChange={(event) => props.selected(event)}/>
        </div>
    </div>;
}

function ShowEndClock(props) {
    return <div className="row">
        <div className="mx-auto">
            <h3>Select End Clock"</h3>
            <TimeKeeper
                switchToMinuteOnHourSelect={true}
                onChange={(event) => props.selected(event)}/>
        </div>
    </div>;
}

class ExperienceDefine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedStartTime: "",
            selectedEndTime: "",
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
            selectedDay: ""
        };

        this.createExperience = this
            .createExperience
            .bind(this);

        this.handleSubmit = this
            .handleSubmit
            .bind(this);

        this.customClock = this
            .customClock
            .bind(this);

        this.setSelectedStartTime = this
            .setSelectedStartTime
            .bind(this);

        this.setSelectedEndTime = this
            .setSelectedEndTime
            .bind(this);

        this.dataSet = this
            .dataSet
            .bind(this);

        this.deleteTime = this
            .deleteTime
            .bind(this);
    }

    async componentDidMount() {
        const {data} = await axios.post("/business/location/minWage");
        this.setState({isMinWage: data});

    }

    handleSubmit() {
        console.log(this.state);
    }

    deleteTime(key, day) {
        switch (day) {
            case "monday":
                let data = this.state.monday;
                data.splice(key, 1);
                this.setState({data});
                break;
            case "tuesday":
                console.log(data);
                break;
            case "wednesday":
                console.log(data);
                break;
            case "thursday":
                console.log(data);
                break;
            case "friday":
                console.log(data);
                break;
            case "saturday":
                console.log(data);
                break;
            case "sunday":
                console.log(data);
                break;
        }
    }

    dataSet() {
        if (this.state.selectedStartTime === "" || this.state.selectedEndTime === "") 
            return;
        switch (this.state.selectedDay) {
            case "monday":
                let data = this.state.monday;
                data.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({data});
                break;
            case "tuesday":
                console.log(data);
                break;
            case "wednesday":
                console.log(data);
                break;
            case "thursday":
                console.log(data);
                break;
            case "friday":
                console.log(data);
                break;
            case "saturday":
                console.log(data);
                break;
            case "sunday":
                console.log(data);
                break;
        }
    }

    setSelectedStartTime(data) {
        this.setState({selectedStartTime: data.formatted24});
    }

    setSelectedEndTime(data) {
        this.setState({selectedEndTime: data.formatted24});
    }

    customClock(data) {
        this.setState({selectedDay: data});
        sweet
            .fire(<ShowStartClock selected={this.setSelectedStartTime}/>)
            .then(() => {
                return sweet
                    .fire(<ShowEndClock dataSet={this.dataSet} selected={this.setSelectedEndTime}/>)
                    .then(() => this.dataSet())
            });
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
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Pay"
                                                    value={this.state.pay}
                                                    onChange={(event) => this.setState({
                                                    pay: event
                                                        .target
                                                        .value
                                                        .replace(/\D/, '')
                                                })}/>
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
                                <div className="row display-3">
                                    <div className="col-3">Pazartesi
                                    </div>
                                    <div className="col-9">
                                        {this.state.monday.length !== 0 && <PlanList data={this.state.monday} day="monday" deleteTime={this.deleteTime}/>}
                                        <button
                                            type="button"
                                            className="m-2 btn btn-info font-weight-bold"
                                            onClick={() => this.customClock("monday")}>
                                            <span className="badge">
                                                <i className="icon-circle-plus"></i>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="row display-3">
                                    <div className="col-3">Salı
                                    </div>
                                    <div className="col-9">
                                        <button
                                            type="button"
                                            className="m-2 btn btn-info font-weight-bold"
                                            onClick={() => this.customClock("tuesday")}>
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
                                        <button
                                            type="button"
                                            className="m-2 btn btn-info font-weight-bold"
                                            onClick={() => this.customClock("wednesday")}>
                                            <span className="badge">
                                                <i className="icon-circle-plus"></i>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                        {this.state.wednesday !== 0 && PlanList(this.state.wednesday)}
                                    </div>
                                </div>
                                <div className="row display-3">
                                    <div className="col-3">Perşembe
                                    </div>
                                    <div className="col-9">
                                        <button
                                            type="button"
                                            className="m-2 btn btn-info font-weight-bold"
                                            onClick={() => this.customClock("thursday")}>
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
                                        <button
                                            type="button"
                                            className="m-2 btn btn-info font-weight-bold"
                                            onClick={() => this.customClock("friday")}>
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
                                        <button
                                            type="button"
                                            className="m-2 btn btn-info font-weight-bold"
                                            onClick={() => this.customClock("saturday")}>
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
                                        <button
                                            type="button"
                                            className="m-2 btn btn-info font-weight-bold"
                                            onClick={() => this.customClock("sunday")}>
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
                                <div className="row display-3">
                                    <button
                                        type="button"
                                        className="btn btn-success font-weight-bold mx-auto mt-4"
                                        onClick={this.handleSubmit}>
                                        <span className="badge">
                                            <i className="icon-circle-plus"></i>
                                        </span>
                                        <span>
                                            Create
                                        </span>
                                    </button>
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