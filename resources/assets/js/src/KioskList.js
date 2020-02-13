import React from 'react';
import Axios from 'axios';
import {Link} from "react-router-dom";

function KioskRender(data){

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
                                        <div className='card-title'> Remote Adress: <span className='text-muted'>{val.RemoteAddress}</span> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-9 d-flex grid-margin stretch-card'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='card-title'>Bu kisim icin farkli veriler gelebilir</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}


function KioskListTitle(props){

    return <React.Fragment>
                <div className='col-sm-12 mb-4 mb-xl-0'>
                    <h4 className='font-weight-bold text-dark'>Kiosk List</h4>
                </div>
                <div className='col-12 mt-3'>
                    <KioskRender data={props.data} />    
                </div>
            </React.Fragment>;
}

export default class KioskList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            listData: []
        };
    }

    async componentDidMount(){
        const {data} = await Axios.post('/business/kiosk/list');

        this.setState({listData: data});
    }

    render(){
        return(
            <React.Fragment>
                {this.state.listData === undefined || this.state.listData.length === 0
                    ? <div className='col-sm-12 col-md-12 grid-margin stretch-card'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <div className='card-title'>
                                        <h4 className='font-weight-bold text-dark'>Herhangi bir tanimli kiosk bulunamadi yeni bir tane tanimlamak istermisiniz</h4>
                                    </div>
                                    <div className="row display-3">
                                        <Link
                                            to={'/' + `${this.props.data.username + '/kiosk/create'}`}
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
                    : <KioskListTitle data={this.state.listData}/>}
            </React.Fragment>
        );
    }
}