import React from "react";
import Swal from 'sweetalert2';
import axios from "axios";
import withReactContent from 'sweetalert2-react-content';
import TimeKeeper from "react-timekeeper";

const sweet = withReactContent(Swal);

function PlanList(props) {
    if (typeof props.data !== "object")
        return;

    return props
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
                <i className="icon-cross"/>
            </span>
        </button>);
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

function ExperinceSelect(data){
        return data.map((value, key)=>  <option key={key} value={key}>{value.Identifier}</option>);
}

class StaffCreate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            martialStatus: '',
            birthday: '',
            address: '',
            telephone: '',
            email: '',
            password: '',
            workingTimeConditions: '',
            workingConditions: '',
            selectedStartTime: "",
            selectedEndTime: "",
            showDate: false,
            pay: "",
            factor: "",
            periode: "1",
            workingData: [],
            selectedExperience: "",
            alert: {
                pay: {
                    status: false,
                    text: 'minimum tutar giriniz'
                }
            }
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
        this.updateWorkingDataPay = this.updateWorkingDataPay.bind(this);
        this.updateWorkingDataFactor = this.updateWorkingDataFactor.bind(this);
        this.updateWorkingDataPeriode = this.updateWorkingDataPeriode.bind(this);
    }


    handleSubmit() {
        axios.post(`/${this.props.data.username}/staff/create`, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            martialStatus: this.state.martialStatus,
            birthday: this.state.birthday,
            address: this.state.address,
            telephone: this.state.telephone,
            email: this.state.email,
            password: this.state.password,
            workingPlan : this.state.workingData[this.state.selectedExperience].workingPlan
        }).then((res) => {
            if(res.data.status === true){
                sweet
                .fire('Created')
                .then(()=> location.href = `/${this.props.data.username}/staff/list`);
            }else {
                sweet
                .fire('Gerekli alanlari doldurunuz');
            }
        });
    }

    async componentDidMount() {
        const {data} = await axios.post('/business/experience/list');

        this.setState({workingData: data});
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


    deleteTime(key, day) {
        switch (day) {
            case "monday":
                let dataMonday = this.state.workingData;
                dataMonday[this.state.selectedExperience].workingPlan.monday.splice(key, 1);
                this.setState({workingData: dataMonday});
                console.log(this.state.workingData);
                break;
            case "tuesday":
                let dataTuesday = this.state.workingData[this.state.selectedExperience];
                dataTuesday[this.state.selectedExperience].workingPlan.tuesday.splice(key, 1);
                this.setState({workingData: dataTuesday});
                break;
            case "wednesday":
                let dataWednesday = this.state.workingData[this.state.selectedExperience];
                dataWednesday[this.state.selectedExperience].workingPlan.wednesday.splice(key, 1);
                this.setState({workingData: dataWednesday});
                break;
            case "thursday":
                let dataThursday = this.state.workingData[this.state.selectedExperience];
                dataThursday[this.state.selectedExperience].workingPlan.thursday.splice(key, 1);
                this.setState({workingData: dataThursday});
                break;
            case "friday":
                let dataFriday = this.state.workingData[this.state.selectedExperience];
                dataFriday[this.state.selectedExperience].workingPlan.friday.splice(key, 1);
                this.setState({workingData: dataFriday});
                break;
            case "saturday":
                let dataSaturday = this.state.workingData[this.state.selectedExperience];
                dataSaturday[this.state.selectedExperience].workingPlan.saturday.splice(key, 1);
                this.setState({workingData: dataSaturday});
                break;
            case "sunday":
                let dataSunday = this.state.workingData[this.state.selectedExperience];
                dataSunday[this.state.selectedExperience].workingPlan.sunday.splice(key, 1);
                this.setState({workingData: dataSunday});
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
                let dataMonday = this.state.workingData;
                dataMonday[this.state.selectedExperience].workingPlan.monday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({workingData: dataMonday});
                this.setState({selectedStartTime: '' , selectedEndTime: ''}) ;
                break;
            case "tuesday":
                let dataTuesday = this.state.workingData[this.state.selectedExperience];
                dataTuesday[this.state.selectedExperience].workingPlan.tuesday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({workingData: dataTuesday});
                this.setState({selectedStartTime: '' , selectedEndTime: ''}) ;
                break;
            case "wednesday":
                let dataWednesday = this.state.workingData[this.state.selectedExperience];
                dataWednesday[this.state.selectedExperience].workingPlan.wednesday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({workingData: dataWednesday});
                this.setState({selectedStartTime: '' , selectedEndTime: ''}) ;
                break;
            case "thursday":
                let dataThursday = this.state.workingData[this.state.selectedExperience];
                dataThursday[this.state.selectedExperience].workingPlan.thursday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({workingData: dataThursday});
                this.setState({selectedStartTime: '' , selectedEndTime: ''}) ;
                break;
            case "friday":
                let dataFriday = this.state.workingData[this.state.selectedExperience];
                dataFriday[this.state.selectedExperience].workingPlan.friday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({workingData: dataFriday});
                this.setState({selectedStartTime: '' , selectedEndTime: ''}) ;
                break;
            case "saturday":
                let dataSaturday = this.state.workingData[this.state.selectedExperience];
                dataSaturday[this.state.selectedExperience].workingPlan.saturday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({workingData: dataSaturday});
                this.setState({selectedStartTime: '' , selectedEndTime: ''}) ;
                break;
            case "sunday":
                let dataSunday = this.state.workingData[this.state.selectedExperience];
                dataSunday[this.state.selectedExperience].workingPlan.sunday.push({start: this.state.selectedStartTime, end: this.state.selectedEndTime});
                this.setState({workingData: dataSunday});
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

    updateWorkingDataPay(val){
        let data = this.state.workingData;
        data[this.state.selectedExperience].Pay = val ;
        this.setState({workingData: data});
    }

    updateWorkingDataPeriode(val){
        let data = this.state.workingData;
        data[this.state.selectedExperience].Periode = val ;
        this.setState({workingData: data});
    }

    updateWorkingDataFactor(val){
        let data = this.state.workingData;
        data[this.state.selectedExperience].Factor = val ;
        this.setState({workingData: data});
    }

    render() {
        return (
            <div className="col-12 grid-margin">
                <div className="card grid-margin">
                    <div className="card-body">
                        <h4 className="card-title">Staff Define</h4>
                        <form className="form-sample">
                            <p className="card-description"></p>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">First Name</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.firstName}
                                                onChange={(e) => this.setState({firstName: e.target.value})}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Last Name</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.lastName}
                                                onChange={(e) => this.setState({lastName: e.target.value})}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Gender</label>
                                        <div className="col-sm-9">
                                            <select
                                                value={this.state.gender}
                                                onChange={(e) => this.setState({gender: e.target.value})}
                                                className="form-control">
                                                <option value='unspecified'>Unspecified</option>
                                                <option value='male'>Male</option>
                                                <option value='female'>Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Date of Birth</label>
                                        <div className="col-sm-9">
                                            <input
                                                className="form-control"
                                                placeholder="dd/mm/yyyy"
                                                value={this.state.birthday}
                                                onChange={(e) => this.setState({birthday: e.target.value})}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Martial Status</label>
                                        <div className="col-sm-9">
                                            <select
                                                value={this.state.martialStatus}
                                                onChange={(e) => this.setState({martialStatus: e.target.value})}
                                                className="form-control">
                                                <option value='unspecified'>Unspecified</option>
                                                <option value='single'>Single</option>
                                                <option value='married'>Married</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">E-mail</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.email}
                                                onChange={(e) => this.setState({email: e.target.value})}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Address
                                        </label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.address}
                                                onChange={(e) => this.setState({address: e.target.value})}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">GSM</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.telephone}
                                                onChange={(e) => this.setState({telephone: e.target.value})}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Password</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={this.state.password}
                                                onChange={(e) => this.setState({password: e.target.value})}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Change Experience</label>
                                        <div className="col-sm-9">
                                            <select
                                                value={this.state.selectedExperience}
                                                onChange={(e) => this.setState({selectedExperience: e.target.value})}
                                                className="form-control">
                                                <option value=''>Change Experience</option>
                                            {ExperinceSelect(this.state.workingData)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {this.state.selectedExperience !== '' && <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="text-center display-4 mb-3">{this.state.workingData[this.state.selectedExperience].Identifier}</h4>
                            <form className="form-sample" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        {this.state.alert.pay.status === true && <p className='col-sm-6 mx-auto text-danger'>
                                            {this.state.alert.pay.text}</p>}
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Pay</label>
                                            <div className="col-sm-9">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Pay"
                                                    value={this.state.workingData[this.state.selectedExperience].Pay}
                                                    onChange={(event) => this.updateWorkingDataPay(event.target.value)}/>
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
                                                    value={this.state.workingData[this.state.selectedExperience].Factor}
                                                    onChange={(event) => this.updateWorkingDataFactor(event.target.value)}
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
                                                    type='number'
                                                    value={this.state.workingData[this.state.selectedExperience].Periode}
                                                    onChange={(event) =>  this.updateWorkingDataPeriode(event.target.value)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                }
                {this.state.selectedExperience !== '' && <div className='row flex-grow col-md-12 grid-margin stretch-card'>
                    <div className='col-md-12 grid-margin stretch-card'>
                        <div className='card'>
                            <div className='card-body'>
                                <p className="card-description">
                                    Seçilen çalışma şekline bağlı çalışma planı tanımlama
                                </p>
                                <div className="row display-3">
                                    <div className="col-3">Pazartesi
                                    </div>
                                    <div className="col-9">
                                        {this.state.workingData[this.state.selectedExperience].workingPlan.monday.length !== 0 && <PlanList data={this.state.workingData[this.state.selectedExperience].workingPlan.monday} day="monday" deleteTime={this.deleteTime}/>}
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
                                        {this.state.workingData[this.state.selectedExperience].workingPlan.tuesday.length !== 0 && <PlanList data={this.state.workingData[this.state.selectedExperience].workingPlan.tuesday} day="tuesday" deleteTime={this.deleteTime}/>}
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
                                        {this.state.workingData[this.state.selectedExperience].workingPlan.wednesday.length !== 0 && <PlanList
                                            data={this.state.workingData[this.state.selectedExperience].workingPlan.wednesday}
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
                                        {this.state.workingData[this.state.selectedExperience].workingPlan.thursday.length !== 0 && <PlanList
                                            data={this.state.workingData[this.state.selectedExperience].workingPlan.thursday}
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
                                        {this.state.workingData[this.state.selectedExperience].workingPlan.friday.length !== 0 && <PlanList data={this.state.workingData[this.state.selectedExperience].workingPlan.friday} day="friday" deleteTime={this.deleteTime}/>}
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
                                        {this.state.workingData[this.state.selectedExperience].workingPlan.saturday.length !== 0 && <PlanList
                                            data={this.state.workingData[this.state.selectedExperience].workingPlan.saturday}
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
                                        {this.state.workingData[this.state.selectedExperience].workingPlan.sunday.length !== 0 && <PlanList data={this.state.workingData[this.state.selectedExperience].workingPlan.sunday} day="sunday" deleteTime={this.deleteTime}/>}
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
                    </div>
                </div>}
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
            </div>
        );
    }
}

export default StaffCreate;