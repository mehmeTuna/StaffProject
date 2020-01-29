import React from "react";
import Axios from "axios";
import Swal from 'sweetalert2';
import {Link} from "react-router-dom";
import withReactContent from 'sweetalert2-react-content';

const sweet = withReactContent(Swal);

function dayPlanList(data){
    return data.map((value, key)=> <button
        key={key}
        type="button"
        className="m-2 btn btn-info font-weight-bold">
            <span className="m-1">
                {value.start}
                - {value.end}
            </span>
    </button>) ;
}

function StaffRender(data){
    return data.data.map((val, key)=><div key={key} className="col-lg-12 grid-margin stretch-card">
        <div className='card'>
            <div className='card-body'>
                <div className="col-sm-12 mb-4 mb-xl-0">
                <h4 className="font-weight-bold text-dark">{`${val.FirstName} ${val.LastName}`}</h4>
                </div>
                <div className='row mt-3'>
                    <div className='col-xl-3 flex-column d-flex grid-margin stretch-card'>
                        <div className='row flex-grow'>
                            <div className='col-sm-12 grid-margin '>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='text-dark'> Email: <span className='text-muted'>{val.Email}</span> </div>
                                        <div className='text-dark'> Adress: <span className='text-muted'>{val.Adress}</span> </div>
                                        <div className='text-dark'> GSM: <span className='text-muted'>{val.Gsm}</span> </div>
                                        <div className='text-dark'> Gender: <span className='text-muted'>{val.Gender}</span> </div>
                                        <div className='text-dark'> Martial Status: <span className='text-muted'>{val.MartialStatus}</span> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-9 d-flex grid-margin stretch-card'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='card-title'>Plan</div>
                                {val.workingPlan !== undefined && val.workingPlan.monday.length !== 0 && <h1 className='display-4'>Monday {dayPlanList(val.workingPlan.monday)}</h1>}
                                {val.workingPlan !== undefined && val.workingPlan.tuesday.length !== 0 && <h1 className='display-4'>Tuesday {dayPlanList(val.workingPlan.tuesday)}</h1>}
                                {val.workingPlan !== undefined && val.workingPlan.wednesday.length !== 0 && <h1 className='display-4'>Wednesday {dayPlanList(val.workingPlan.wednesday)}</h1>}
                                {val.workingPlan !== undefined && val.workingPlan.thursday.length !== 0 && <h1 className='display-4'>Thursday {dayPlanList(val.workingPlan.thursday)}</h1>}
                                {val.workingPlan !== undefined && val.workingPlan.friday.length !== 0 && <h1 className='display-4'>Friday {dayPlanList(val.workingPlan.friday)}</h1>}
                                {val.workingPlan !== undefined && val.workingPlan.saturday.length !== 0 && <h1 className='display-4'>Saturday {dayPlanList(val.workingPlan.saturday)}</h1>}
                                {val.workingPlan !== undefined && val.workingPlan.sunday.length !== 0 && <h1 className='display-4'>Sunday {dayPlanList(val.workingPlan.sunday)}</h1>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

function ExperienceStaffListTitle(props){

    return <React.Fragment>
                <div className='col-sm-12 mb-4 mb-xl-0'>
                    <h4 className='font-weight-bold text-dark'>Staff List</h4>
                </div>
                <div className='col-12 mt-3'>
                    <StaffRender data={props.staff} />    
                </div>
            </React.Fragment>;
}

class StaffList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            experience: [],
            staff: []
        };

        this.getExperience = this
            .getExperience
            .bind(this);
        this.getStaff = this
            .getStaff
            .bind(this);
    }

    async componentDidMount() {
        await this.getExperience();
        await this.getStaff();


        if(this.state.staff !== undefined && this.state.staff.length !== 0){
            sweet.fire({
                position: 'top-end',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              });
        }
    }

    async getExperience() {
        const {data} = await Axios.post('/business/experience/list');
        this.setState({experience: data});
    }

    async getStaff() {
        const {data} = await Axios.post('/business/staff/list');
        this.setState({staff: data});
    }

    render() {
        return (
            <React.Fragment>
                {this.state.staff === undefined || this.state.staff.length === 0
                    ? <div className='col-sm-12 col-md-12 grid-margin stretch-card'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <div className='card-title'>
                                        <h4 className='font-weight-bold text-dark'>Herhangi bir tanimli staff bulunamadi yeni bir tane tanimlamak istermisiniz</h4>
                                    </div>
                                    <div className="row display-3">
                                        <Link
                                            to={'/' + `${this.props.data.username + '/staff/create'}`}
                                            className="nav-link mx-auto">
                                            <button type="button" className="btn btn-success font-weight-bold mx-auto mt-4">
                                                <span className="badge">
                                                    <i className="icon-circle-plus"/>
                                                </span>
                                                <span>
                                                    Create
                                                </span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : <ExperienceStaffListTitle staff={this.state.staff} experience={this.state.experience} />}
            </React.Fragment>
        )
    };
};

export default StaffList;