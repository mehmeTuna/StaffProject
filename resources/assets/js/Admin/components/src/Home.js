import React from 'react'
import axios from 'axios'

import {Alert} from './components/atoms/app'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      alert: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.post('data/home')
    this.setState({data: data.data})
  }

  render() {
    const {onlineStaff} = this.state.data
    const listDemo = onlineStaff
    return (
      <React.Fragment>
        <div className="container"></div>
        <div className="row w-100">
          <div className="col-sm-12 mb-4 mb-xl-0">
            <div className="row">
              <div className="col-sm-12 mb-4 mb-xl-0">
                <h4 className="font-weight-bold text-dark">
                  Merhaba, Mehmet Tuna
                </h4>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-xl-3 flex-column d-flex grid-margin stretch-card">
                <div className="row flex-grow">
                  <div className="col-sm-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Online Users</h4>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="d-flex justify-content-between mt-2 text-dark mb-2">
                              <div>
                                <span className="font-weight-bold"></span>{' '}
                                online {typeof listDemo}
                              </div>
                              <div>Total:</div>
                            </div>
                            <div className="progress progress-md grouped mb-2">
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{width: '50%'}}
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="traffic-source-legend">
                              <div className="d-flex justify-content-between mb-1 mt-2">
                                <div className="font-weight-bold">Name</div>
                                <div className="font-weight-bold">time</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Online Kiosk</h4>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="d-flex justify-content-between mt-2 text-dark mb-2">
                              <div>
                                <span className="font-weight-bold">4453</span>{' '}
                                online
                              </div>
                              <div>Total: 0</div>
                            </div>
                            <div className="progress progress-md grouped mb-2">
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{width: '50%'}}
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="traffic-source-legend">
                              <div className="d-flex justify-content-between mb-1 mt-2">
                                <div className="font-weight-bold">Name</div>
                                <div className="font-weight-bold">time</div>
                              </div>
                              <div className="d-flex justify-content-between legend-label">
                                <div>
                                  <span className="bg-light"></span>First Kiosk
                                </div>
                                <div>30dk</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 d-flex grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Website Audience Metrics</h4>
                    <div className="row">
                      <div className="col-lg-5">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit amet cumque cupiditate
                        </p>
                      </div>
                      <div className="col-lg-7"></div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="chartjs-size-monitor">
                          <div className="chartjs-size-monitor-expand">
                            <div className=""></div>
                          </div>
                          <div className="chartjs-size-monitor-shrink">
                            <div className=""></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <h4 className="card-title">Last Payment</h4>
                      <div className="dropdown">
                        <button
                          className="btn btn-sm dropdown-toggle text-dark pt-0 pr-0"
                          type="button"
                          id="dropdownMenuSizeButton3"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          This week
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuSizeButton3"
                        >
                          <h6 className="dropdown-header">This week</h6>
                          <h6 className="dropdown-header">This month</h6>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="traffic-source-legend">
                          <div className="d-flex justify-content-between mb-1 mt-2">
                            <div className="font-weight-bold">Name</div>
                            <div className="font-weight-bold">pay</div>
                          </div>
                          <div className="d-flex justify-content-between legend-label">
                            <div>
                              <span className="bg-light"></span>Mehmet
                              Tuna(garson)
                            </div>
                            <div>30 </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Last Log</h4>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="traffic-source-legend">
                          <div className="d-flex justify-content-between mb-1 mt-2">
                            <div className="font-weight-bold">Name</div>
                            <div className="font-weight-bold">pay</div>
                          </div>
                          <div className="d-flex justify-content-between legend-label">
                            <div>
                              <span className="bg-light"></span>Mehmet
                              Tuna(garson)
                            </div>
                            <div>30 </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title mb-3">Payment History</h4>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="traffic-source-legend">
                          <div className="d-flex justify-content-between mb-1 mt-2">
                            <div className="font-weight-bold">Name</div>
                            <div className="font-weight-bold">pay</div>
                          </div>
                          <div className="d-flex justify-content-between legend-label">
                            <div>
                              <span className="bg-light"></span>Mehmet
                              Tuna(garson)
                            </div>
                            <div>30 </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-9 grid-margin-lg-0 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Other Data</h4>
                    <div className="table-responsive mt-3">
                      <table className="table table-header-bg">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Count</th>
                            <th>Vs Last Month</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Staff</td>
                            <td>100</td>
                            <td>
                              <div className="text-success">
                                <i className="icon-arrow-up mr-2"></i>+60%
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 grid-margin-lg-0 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title mb-3">Upcoming Payments</h4>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="d-flex justify-content-between mt-2 text-dark mb-2">
                          <div>
                            <span className="font-weight-bold">4453</span>{' '}
                            online
                          </div>
                          <div>Total: 0</div>
                        </div>
                        <div className="progress progress-md grouped mb-2">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{width: '50%'}}
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="traffic-source-legend">
                          <div className="d-flex justify-content-between mb-1 mt-2">
                            <div className="font-weight-bold">Name</div>
                            <div className="font-weight-bold">time</div>
                          </div>
                          <div className="d-flex justify-content-between legend-label">
                            <div>
                              <span className="bg-light"></span>First Kiosk
                            </div>
                            <div>30dk</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
