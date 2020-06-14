import React from 'react'
import {connect} from 'react-redux'

const HomeComponent = ({
  username,
  onlineStaff,
  staff,
  onlineKiosk,
  kioskCount
}) => {
  return (
    <>
      <div className="row w-100">
        <div className="col-sm-12 mb-4 mb-xl-0">
          <div className="row">
            <div className="col-sm-12 mb-4 mb-xl-0">
              <h4 className="font-weight-bold text-dark">Hello {username}</h4>
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
                                {onlineStaff.length}
                              </span>
                              online
                            </div>
                            <div>Total: {staff.length}</div>
                          </div>
                          <div className="progress progress-md grouped mb-2">
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{
                                width: `${parseInt(
                                  (onlineStaff.length * 100) / staff.length
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
                            {onlineStaff.length !== 0 &&
                              onlineStaff.map((e, key) => (
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
                                {onlineKiosk.length}
                              </span>{' '}
                              online
                            </div>
                            <div>Total: {kioskCount}</div>
                          </div>
                          <div className="progress progress-md grouped mb-2">
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{
                                width: `${parseInt(
                                  (onlineKiosk.length * 100) / kioskCount
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
                            {onlineKiosk.length !== 0 &&
                              onlineKiosk.map((e, key) => (
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
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        amet cumque cupiditate
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
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.profileReducer.username,
    onlineStaff: state.staffReducer.onlineStaff,
    staff: state.staffReducer.staff,
    onlineKiosk: state.kioskReducer.onlineKiosk,
    kioskCount: state.kioskReducer.kiosk.length
  }
}

const Home = connect(mapStateToProps)(HomeComponent)

export default Home
