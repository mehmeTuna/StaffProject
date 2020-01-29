import React from "react";
import axios from "axios";
import TimeKeeper from 'react-timekeeper';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Redirect } from "react-router-dom";

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
            selectedDay: "",
            alert: {
                pay: {
                    status: false,
                    text: 'minimum tutar giriniz'
                }
            },
            redirect: null
        };

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

        this.paymnetControl = this
            .paymentControl
            .bind(this);

        this.compareTime = this.compareTime.bind(this);
    }

    async componentDidMount() {
        const {data} = await axios.post('/business/location/minWage');

        this.setState({isMinWage: data});
    }

    compareTime(str1, str2){
        if(str1 === str2){
            return 0;
        }
        let time1 = str1.split(':');
        let time2 = str2.split(':');
        if(eval(time1[0]) > eval(time2[0])){
            return 1;
        } else if(eval(time1[0]) === eval(time2[0]) && eval(time1[1]) > eval(time2[1])) {
            return 1;
        } else {
            return -1;
        }
    }

    handleSubmit() {
        axios.post(`/${this.props.data.username}/experience/create`, {
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
        }).then((res) => {
            sweet
                .fire('Created')
                .then(() => this.setState({ redirect: `/${this.props.data.username}/experience/list`}));
        });
    }

    deleteTime(key, day) {
        switch (day) {
            case "monday":
                let dataMonday = this.state.monday;
                dataMonday.splice(key, 1);
                this.setState({monday: dataMonday});
                break;
            case "tuesday":
                let dataTuesday = this.state.tuesday;
                dataTuesday.splice(key, 1);
                this.setState({tuesday: dataTuesday});
                break;
            case "wednesday":
                let dataWednesday = this.state.wednesday;
                dataWednesday.splice(key, 1);
                this.setState({wednesday: dataWednesday});
                break;
            case "thursday":
                let dataThursday = this.state.thursday;
                dataThursday.splice(key, 1);
                this.setState({Thursday: dataThursday});
                break;
            case "friday":
                let dataFriday = this.state.friday;
                dataFriday.splice(key, 1);
                this.setState({friday: dataFriday});
                break;
            case "saturday":
                let dataSaturday = this.state.saturday;
                dataSaturday.splice(key, 1);
                this.setState({saturday: dataSaturday});
                break;
            case "sunday":
                let dataSunday = this.state.sunday;
                dataSunday.splice(key, 1);
                this.setState({sunday: dataSunday});
                break;
        }
    }

    dataSet() {
        if (this.state.selectedStartTime === "" || this.state.selectedEndTime === "") 
            return;

        if(this.compareTime(this.state.selectedStartTime, this.state.selectedEndTime) === 1){
            sweet.fire({
                position: 'top-end',
                icon: 'info',
                title: 'Cikis saati giris saatinden once olamaz',
                showConfirmButton: false,
                timer: 1500
            }).then(() => this.setState({selectedStartTime : '', selectedEndTime: ''}));
            return ;
        }

        switch (this.state.selectedDay) {
            case "monday":
                let dataMonday = this.state.monday;
                dataMonday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({monday: dataMonday});
                this.setState({selectedStartTime: '' , selectedEndTime: ''}) ;
                break;
            case "tuesday":
                let dataTuesday = this.state.tuesday;
                dataTuesday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({tuesday: dataTuesday});
                this.setState({selectedStartTime: '' , selectedEndTime: ''}) ;
                break;
            case "wednesday":
                let dataWednesday = this.state.wednesday;
                dataWednesday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({wednesday: dataWednesday});
                this.setState({selectedStartTime: '' , selectedEndTime: ''}) ;
                break;
            case "thursday":
                let dataThursday = this.state.thursday;
                dataThursday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({Thursday: dataThursday});
                this.setState({selectedStartTime: '' , selectedEndTime: ''}) ;
                break;
            case "friday":
                let dataFriday = this.state.friday;
                dataFriday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({friday: dataFriday});
                this.setState({selectedStartTime: '' , selectedEndTime: ''}) ;
                break;
            case "saturday":
                let dataSaturday = this.state.saturday;
                dataSaturday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({saturday: dataSaturday});
                this.setState({selectedStartTime: '' , selectedEndTime: ''}) ;
                break;
            case "sunday":
                let dataSunday = this.state.sunday;
                dataSunday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({sunday: dataSunday});
                this.setState({selectedStartTime: '' , selectedEndTime: ''}) ;
                break;
            default:
                console.log('dataSet foksiyion kismi default');
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

    paymentControl(val) {
        let min = this.state.isMinWage[0].Value;

        this
            .state
            .isMinWage
            .forEach((val, key) => val.Value < min
                ? min = val.Value
                : '');

        if (val < min) {
            let alert = this.state.alert;
            alert.pay.status = true;
            alert.pay.text = `minimum ${min} tutar giriniz`;
            this.setState({alert: alert});
        } else {
            let alert = this.state.alert;
            alert.pay.status = false;
            this.setState({alert: alert});
        }

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
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
                                            <label className="col-sm-3 col-form-label mb-4">Experience Name</label>
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
                                        {this.state.alert.pay.status === true && <p className='col-sm-6 mx-auto text-danger'>
                                            {this.state.alert.pay.text}</p>}
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
                                                        .replace(/[^0-9]+\.?[^0-9]/g, '')
                                                })}
                                                    onBlur={(e) => this.paymentControl(e.target.value)}/>
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
                            </form>
                        </div>
                    </div>
                </div>
                <div className='row flex-grow col-md-12 grid-margin stretch-card'>
                    <div className={this.state.workingPlan === '' ? 'col-sm-12 col-md-12 grid-margin stretch-card' : 'col-sm-12 col-md-4 grid-margin stretch-card'}>
                        <div className='card text-center'>
                            <div className="card-body">Working Plan Select</div>
                            <div className="card-body display-4 btn-outline-success btn-fw" onClick={(event) => this.setState({workingPlan: 'freeTime'})}>
                                {this.state.workingPlan === 'freeTime' && <i className='icon-check icon-lg text-primary'/>}
                                Free Time
                            </div>
                            <div className="card-body display-4 btn-outline-success btn-fw" onClick={(event) => this.setState({workingPlan: 'plannedTime'})}>
                                {this.state.workingPlan === 'plannedTime' && <i className='icon-check icon-lg text-primary'/>}
                                Planned Time
                            </div>
                            <div className="card-body display-4 btn-outline-success btn-fw" onClick={() => this.setState({workingPlan: 'fullTime'})}>
                                {this.state.workingPlan === 'fullTime' && <i className='icon-check icon-lg text-primary'/>}
                                Full Time
                            </div>
                        </div>
                    </div>
                    {this.state.workingPlan !== '' && <div className='col-md-8 grid-margin stretch-card'>
                        <div className='card'>
                            <div className='card-body'>
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
                                                <i className="icon-circle-plus"/>
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
                                        {this.state.tuesday.length !== 0 && <PlanList data={this.state.tuesday} day="tuesday" deleteTime={this.deleteTime}/>}
                                        <button
                                            type="button"
                                            className="m-2 btn btn-info font-weight-bold"
                                            onClick={() => this.customClock("tuesday")}>
                                            <span className="badge">
                                                <i className="icon-circle-plus"/>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="row display-3">
                                    <div className="col-3">Çarşamba
                                    </div>
                                    <div className="col-9">
                                        {this.state.wednesday.length !== 0 && <PlanList
                                            data={this.state.wednesday}
                                            day="wednesday"
                                            deleteTime={this.deleteTime}/>}
                                        <button
                                            type="button"
                                            className="m-2 btn btn-info font-weight-bold"
                                            onClick={() => this.customClock("wednesday")}>
                                            <span className="badge">
                                                <i className="icon-circle-plus"/>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="row display-3">
                                    <div className="col-3">Perşembe
                                    </div>
                                    <div className="col-9">
                                        {this.state.thursday.length !== 0 && <PlanList
                                            data={this.state.thursday}
                                            day="thursday"
                                            deleteTime={this.deleteTime}/>}
                                        <button
                                            type="button"
                                            className="m-2 btn btn-info font-weight-bold"
                                            onClick={() => this.customClock("thursday")}>
                                            <span className="badge">
                                                <i className="icon-circle-plus"/>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="row display-3">
                                    <div className="col-3">Cuma
                                    </div>
                                    <div className="col-9">
                                        {this.state.friday.length !== 0 && <PlanList data={this.state.friday} day="friday" deleteTime={this.deleteTime}/>}
                                        <button
                                            type="button"
                                            className="m-2 btn btn-info font-weight-bold"
                                            onClick={() => this.customClock("friday")}>
                                            <span className="badge">
                                                <i className="icon-circle-plus"/>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="row display-3">
                                    <div className="col-3">Cumartesi
                                    </div>
                                    <div className="col-9">
                                        {this.state.saturday.length !== 0 && <PlanList
                                            data={this.state.saturday}
                                            day="saturday"
                                            deleteTime={this.deleteTime}/>}
                                        <button
                                            type="button"
                                            className="m-2 btn btn-info font-weight-bold"
                                            onClick={() => this.customClock("saturday")}>
                                            <span className="badge">
                                                <i className="icon-circle-plus"/>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="row display-3">
                                    <div className="col-3">Pazar
                                    </div>
                                    <div className="col-9">
                                        {this.state.sunday.length !== 0 && <PlanList data={this.state.sunday} day="sunday" deleteTime={this.deleteTime}/>}
                                        <button
                                            type="button"
                                            className="m-2 btn btn-info font-weight-bold"
                                            onClick={() => this.customClock("sunday")}>
                                            <span className="badge">
                                                <i className="icon-circle-plus"/>
                                            </span>
                                            <span>
                                                Add new Plan
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
                <div className='col-sm-12 col-md-12 grid-margin stretch-card'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className="row display-3">
                                <button
                                    type="button"
                                    className="btn btn-success font-weight-bold mx-auto mt-4"
                                    onClick={this.handleSubmit}>
                                        <span className="badge">
                                            <i className="icon-circle-plus"/>
                                        </span>
                                        <span>
                                            Create
                                        </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    };
}

export default ExperienceDefine;