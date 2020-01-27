import React from "react";
import Swal from 'sweetalert2';
import axios from "axios";
import withReactContent from 'sweetalert2-react-content';

const sweet = withReactContent(Swal);

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
            workingConditions: ''
        }

        this.handleSubmit = this
        .handleSubmit
        .bind(this);
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
            workingConditions: this.state.workingConditions,
            workingTimeConditions: this.state.workingTimeConditions
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

    render() {
        return (
            <div className="col-12 grid-margin">
                <div className="card">
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
                                    <div className="form-group row text-center">
                                        <label className="col-sm-3 col-form-label">Working Time Conditions</label>
                                        <div className="col-sm-3">
                                            <div className="form-check" onClick={() => this.setState({workingConditions: 'freeTime'})}>
                                                <label className="form-check-label">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name="membershipRadios"
                                                        id="membershipRadios1"
                                                        checked={this.state.workingTimeConditions === 'free'}
                                                        onChange={(e) => this.setState({workingConditions: e.target.value})}
                                                        value="free"/>
                                                         {this.state.workingTimeConditions == 'freeTime' && <i className='icon-check icon-lg text-primary'></i>}
                                                    Free Time
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-check" onClick={() => this.setState({workingConditions: 'planned'})}>
                                                <label className="form-check-label">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name="membershipRadios"
                                                        id="membershipRadios2"
                                                        checked={this.state.workingTimeConditions === 'planned'}
                                                        onChange={(e) => this.setState({workingConditions: e.target.value})}
                                                        value="planned"/>
                                                          {this.state.workingTimeConditions == 'planned' && <i className='icon-check icon-lg text-primary'></i>}
                                                    Planned Time
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-check" onClick={() => this.setState({workingConditions: 'fullTime'})}>
                                                <label className="form-check-label">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name="membershipRadios"
                                                        id="membershipRadios2"
                                                        checked={this.state.workingTimeConditions === 'fullTime'}
                                                        onChange={(e) => this.setState({workingConditions: e.target.value})}
                                                        value="fullTime"/>
                                                          {this.state.workingTimeConditions == 'fullTime' && <i className='icon-check icon-lg text-primary'></i>}
                                                    Full Time
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="card-description">
                                Others
                            </p>
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
        );
    }
}

export default StaffCreate;