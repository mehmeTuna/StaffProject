import React from "react";
import Axios from "axios";


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

function ExperienceRender(data){

    return data.data.map((val, key)=><div key={key} className="col-lg-12 grid-margin stretch-card">
        <div className='card'>
            <div className='card-body'>
                <div className="col-sm-12 mb-4 mb-xl-0">
                    <h4 className="font-weight-bold text-dark">{val.Identifier}</h4>
                </div>
                <div className='row mt-3'>
                    <div className='col-xl-3 flex-column d-flex grid-margin stretch-card'>
                        <div className='row flex-grow'>
                            <div className='col-sm-12 grid-margin '>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='card-title'> Pay: <span className='text-muted'>{val.Pay}</span> </div>
                                        <div className='card-title'> Factor:<span className='text-muted'>{val.Factor}</span></div>
                                        <div className='card-title'> Period: <span className='text-muted'>{val.Periode}</span> </div>
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
class ExperienceList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: []
        }
    }

    async componentDidMount() {
        const {data} = await Axios.post("/business/experience/list");

        this.setState({list: data});
    }

    render() {
        return (
            <React.Fragment>
                {this.state.list.length === 0
                    ? <div className="col-lg-12 grid-margin stretch-card">
                            Tanımlı Experience bulunamadı
                        </div>
                    : <ExperienceRender data={this.state.list} />}
            </React.Fragment>
        )
    };
};

export default ExperienceList;