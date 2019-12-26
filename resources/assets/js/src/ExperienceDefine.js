import React from "react";
import {TimePicker, KeyboardTimePicker} from "@material-ui/pickers";
import {Select} from "@material-ui/core";

class ExperienceDefine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            pay: "",
            factor: "hour",
            periode: "",
            workingPlan: "",
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        };

    }

    render() {
        return (
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Experience Define</h4>
                        <form className="form-sample">
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
                                            <input className="form-control" placeholder="Periode"/>
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
                                                        name="membershipRadios"
                                                        id="membershipRadios1"
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
                                                        name="membershipRadios"
                                                        id="membershipRadios2"
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
                                                        name="membershipRadios"
                                                        id="membershipRadios2"
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
                                    <button type="button" className="btn btn-primary m-1">
                                        Notifications
                                        <span className="badge badge-light">
                                            <i className="icon-cross"></i>
                                        </span>
                                    </button>
                                    <button type="button" className="btn btn-primary m-1">
                                        Notifications
                                        <span className="badge badge-light">
                                            <i className="icon-cross"></i>
                                        </span>
                                    </button>
                                    <button type="button" className="btn btn-primary m-1">
                                        Notifications
                                        <span className="badge badge-light">
                                            <i className="icon-cross"></i>
                                        </span>
                                    </button>
                                    <button type="button" className="btn btn-primary m-1">
                                        Notifications
                                        <span className="badge badge-light">
                                            <i className="icon-cross"></i>
                                        </span>
                                    </button>
                                    <button type="button" className="btn btn-primary m-1">
                                        Notifications
                                        <span className="badge badge-light">
                                            <i className="icon-cross"></i>
                                        </span>
                                    </button>
                                    <button type="button" className="btn btn-primary m-1">
                                        Notifications
                                        <span className="badge badge-light">
                                            <i className="icon-cross"></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="row display-3">
                                <div className="col-3">Salı
                                </div>
                                <div className="col-9">tanımlanmış çalışma</div>
                            </div>
                            <div className="row display-3">
                                <div className="col-3">Çarşamba
                                </div>
                                <div className="col-9">tanımlanmış çalışma</div>
                            </div>
                            <div className="row display-3">
                                <div className="col-3">Perşembe
                                </div>
                                <div className="col-9">tanımlanmış çalışma</div>
                            </div>
                            <div className="row display-3">
                                <div className="col-3">Cuma
                                </div>
                                <div className="col-9">tanımlanmış çalışma</div>
                            </div>
                            <div className="row display-3">
                                <div className="col-3">Cumartesi
                                </div>
                                <div className="col-9">tanımlanmış çalışma</div>
                            </div>
                            <div className="row display-3">
                                <div className="col-3">Pazar
                                </div>
                                <div className="col-9">tanımlanmış çalışma</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    };
}

export default ExperienceDefine;