import React from 'react';
import Axios from 'axios';

export default class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            username: '' ,
            password: '',
            alert: false,
            alertText: 'Kullanici adi veya parola hatali',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(){
        if(this.state.username === '' || this.state.password === ''){
            this.setState({alert: true});
            return;
        }

        const {data} = await Axios.post('/kiosk/staff/login', {username: this.state.username, password: this.state.password});

        if(data.status === false){
            this.setState({alert: true});
            this.setState({alertText: data.text});
        }

        if(data.status === true){
            this.setState({alert: false});
            window.location.href = '/staff/home';
        }
    }


    componentDidMount(){
        if(this.props.username === '' && this.props.password === ''){
            this.setState({alert: true});
        }
    }



    render(){
        return(
            <React.Fragment>
                  <div className="container-scroller">
                    <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="thema-background-color content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                            <div className="brand-logo">
                                Logo
                            </div>
                            <h4>Hello! let's get started</h4>
                            <h6 className="font-weight-light">Sign in to continue.</h6>
                            {this.state.alert === true && <h6 className="font-weight-light text-danger text-center">{this.state.alertText}</h6>}
                            <form className="pt-3">
                                <div className="form-group">
                                   <input type="email" className={(this.state.alert === true && this.state.username === '') ? 'form-control form-control-lg border border-danger' : 'form-control form-control-lg'} value={this.state.username} onChange={(e)=>this.setState({username: e.target.value})} placeholder="Username" />
                                </div>
                                <div className="form-group">
                                 <input type="password" className={(this.state.alert === true && this.state.password === '') ? 'form-control form-control-lg border border-danger' : 'form-control form-control-lg'} value={this.state.password} onChange={(e)=>this.setState({password: e.target.value})} placeholder="Password" />
                                </div>
                             </form>
                                <div className="mt-3">
                                 <button className="btn btn-block text-white thema-background-color btn-lg font-weight-medium auth-form-btn" onClick={this.handleSubmit}>SIGN IN</button>
                                </div>
                                <div className="my-2 d-flex justify-content-between align-items-center">
                                <div className="form-check">
                                    <label className="form-check-label text-muted">
                                    <input type="checkbox" className="form-check-input" />
                                    Keep me signed in
                                    </label>
                                </div>
                                <a href="#" className="auth-link text-black">Forgot password?</a>
                                </div>
                                <div className="text-center mt-4 font-weight-light">
                                Don't have an account? <a href="/" className="text-primary">Create</a>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}