import React from 'react'
import axios from 'axios'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      onlineStaff: [],
      onlineKiosk: [],
      lastLog: [],
      paymentHistory: [],
      staffCount: 0,
      alert: [],
      business: []
    }
  }

  async componentDidMount() {
    const { data } = await axios.post('/business/data/home')

    if (data.status === true) {
      this.setState({
        onlineStaff: data.data.staff.online,
        onlineKiosk: data.data.kiosk.online,
        lastLog: data.data.lastLog,
        paymentHistory: data.data.paymentHistory,
        staffCount: data.data.staff.count,
        kioskCount: data.data.kiosk.count
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="row w-100">
          <div className="col-sm-12 mb-4 mb-xl-0">
            <div className="row">
              <div className="col-sm-12 mb-4 mb-xl-0">
                <h4 className="font-weight-bold text-dark">
                  Hello, {this.props.business.username}
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
                                <span className="font-weight-bold">
                                  {this.state.onlineStaff.length}
                                </span>{' '}
                                online
                              </div>
                              <div>Total: {this.state.staffCount}</div>
                            </div>
                            <div className="progress progress-md grouped mb-2">
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{
                                  width: `${parseInt(
                                    (this.state.onlineStaff.length * 100) /
                                      this.state.staffCount
                                  )}%`
                                }}
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
                                <div className="font-weight-bold">login</div>
                              </div>
                              {this.state.onlineStaff.length !== 0 &&
                                this.state.onlineStaff.map((e, key) => (
                                  <div
                                    key={key}
                                    className="d-flex justify-content-between mb-1 mt-2"
                                  >
                                    <div className="font-weight-bold">
                                      {e.name}
                                    </div>
                                    <div className="font-weight-bold">
                                      {e.time}
                                    </div>
                                  </div>
                                ))}
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
                                <span className="font-weight-bold">
                                  {this.state.onlineKiosk.length}
                                </span>{' '}
                                online
                              </div>
                              <div>Total: {this.state.kioskCount}</div>
                            </div>
                            <div className="progress progress-md grouped mb-2">
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{
                                  width: `${parseInt(
                                    (this.state.onlineKiosk.length * 100) /
                                      this.state.kioskCount
                                  )}%`
                                }}
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
                              {this.state.onlineKiosk.length !== 0 &&
                                this.state.onlineKiosk.map((e, key) => (
                                  <div
                                    key={key}
                                    className="d-flex justify-content-between "
                                  >
                                    <div>{e.identifier}</div>
                                    <div>5 min</div>
                                  </div>
                                ))}
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
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="traffic-source-legend">
                          <div className="d-flex justify-content-between mb-1 mt-2">
                            <div className="font-weight-bold">Name</div>
                            <div className="font-weight-bold">pay</div>
                          </div>
                          {this.state.paymentHistory.length !== 0 &&
                            this.state.paymentHistory.map((e, key) => (
                              <div
                                key={key}
                                className="d-flex justify-content-between legend-label"
                              >
                                <div>
                                  <span className="bg-light"></span>
                                  {e.name}
                                </div>
                                <div>{e.balance} </div>
                              </div>
                            ))}
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
                            <div className="font-weight-bold">time</div>
                          </div>
                          {this.state.lastLog.length !== 0 &&
                            this.state.lastLog.map((e, key) => (
                              <div
                                key={key}
                                className="d-flex justify-content-between legend-label"
                              >
                                <div>
                                  <span className="bg-light"></span>
                                  {e.name}
                                </div>
                                <div>{e.time} </div>
                              </div>
                            ))}
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
                          {this.state.paymentHistory.length !== 0 &&
                            this.state.paymentHistory.map((e, key) => (
                              <div
                                key={key}
                                className="d-flex justify-content-between legend-label"
                              >
                                <div>
                                  <span className="bg-light"></span>
                                  {e.name}
                                </div>
                                <div>{e.balance}</div>
                              </div>
                            ))}
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
