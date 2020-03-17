import React from 'react'
import Axios from 'axios'

function dayPlanList(data) {
  return data.map((value, key) => (
    <button
      key={key}
      type="button"
      className="m-2 btn btn-info font-weight-bold"
    >
      <span className="m-1">
        {value.start} - {value.end}
      </span>
    </button>
  ))
}

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      userData: []
    }
  }

  async componentDidMount() {
    const { data } = await Axios.post('/staff/me')

    if (data[0].status === true) {
      this.setState({ user: data[0].user })
      this.setState({ userData: data[0].logHistory })
    }

    console.log(data[0].logHistory)
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="col-sm-12 mb-4 mb-xl-0 d-flex justify-content-between legend-label">
                <div className="d-flex">
                  <div>
                    <img
                      src={this.state.user.img}
                      style={{ width: '100px', height: '100px' }}
                      className="mx-auto"
                    />
                  </div>
                  <div>
                    <h5 className="font-weight-bold text-dark ml-2 mb-1">{`${this.state.user.username}`}</h5>
                    <h6 className="font-weight-bold text-muted ml-2 mb-1">
                      {this.state.user.experience}
                    </h6>
                    <h6 className="font-weight-bold text-muted ml-2 mb-1">
                      {this.state.user.email}
                    </h6>
                  </div>
                </div>
                <div className=""></div>
              </div>
              <div className="row mt-3">
                <div className="col-xl-3 flex-column d-flex grid-margin stretch-card">
                  <div className="row flex-grow">
                    <div className="col-sm-12 grid-margin ">
                      <div className="card">
                        <div className="card-body">
                          <p className="text-dark">{this.state.user.factor}</p>
                          <p className="text-dark">
                            Adress:{' '}
                            <span className="text-muted">
                              {this.state.user.adress}
                            </span>
                          </p>
                          <p className="text-dark">
                            GSM:{' '}
                            <span className="text-muted">
                              {this.state.user.phone}
                            </span>
                          </p>
                          <p className="text-dark">
                            Gender:{' '}
                            <span className="text-muted">
                              {this.state.user.gender}
                            </span>
                          </p>
                          <p className="text-dark">
                            Martial Status:{' '}
                            <span className="text-muted">
                              {this.state.user.martialStatus}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 d-flex grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      {this.state.user.workingPlan === undefined && (
                        <div className="mx-auto display-4">
                          Tanimli Plan Yok
                        </div>
                      )}
                      <div className="card-title">Plan</div>
                      {this.state.user.workingPlan !== undefined &&
                        this.state.user.workingPlan.monday.length !== 0 && (
                          <h5>
                            Monday{' '}
                            {dayPlanList(this.state.user.workingPlan.monday)}
                          </h5>
                        )}
                      {this.state.user.workingPlan !== undefined &&
                        this.state.user.workingPlan.tuesday.length !== 0 && (
                          <h5>
                            Tuesday{' '}
                            {dayPlanList(this.state.user.workingPlan.tuesday)}
                          </h5>
                        )}
                      {this.state.user.workingPlan !== undefined &&
                        this.state.user.workingPlan.wednesday.length !== 0 && (
                          <h5>
                            Wednesday{' '}
                            {dayPlanList(this.state.user.workingPlan.wednesday)}
                          </h5>
                        )}
                      {this.state.user.workingPlan !== undefined &&
                        this.state.user.workingPlan.thursday.length !== 0 && (
                          <h5>
                            Thursday{' '}
                            {dayPlanList(this.state.user.workingPlan.thursday)}
                          </h5>
                        )}
                      {this.state.user.workingPlan !== undefined &&
                        this.state.user.workingPlan.friday.length !== 0 && (
                          <h5>
                            Friday{' '}
                            {dayPlanList(this.state.user.workingPlan.friday)}
                          </h5>
                        )}
                      {this.state.user.workingPlan !== undefined &&
                        this.state.user.workingPlan.saturday.length !== 0 && (
                          <h5>
                            Saturday{' '}
                            {dayPlanList(this.state.user.workingPlan.saturday)}
                          </h5>
                        )}
                      {this.state.user.workingPlan !== undefined &&
                        this.state.user.workingPlan.sunday.length !== 0 && (
                          <h5>
                            Sunday{' '}
                            {dayPlanList(this.state.user.workingPlan.sunday)}
                          </h5>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-4 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <h5 className="card-title">Odeme Islemi</h5>
                      </div>
                      <div
                        id="chart-legends-market-trend"
                        className="chart-legends mt-1"
                      >
                        <div className="row">
                          <div className="col-6 ">
                            <div className="row">
                              <div className="col-sm-12 ml-sm-0 mr-sm-0 pr-md-0">
                                <h5 className="font-weight-bold text-dark">
                                  {this.state.userData.total} ₺
                                </h5>
                              </div>
                            </div>
                            <div className="row align-items-center">
                              <div className="col-12">
                                <p className="text-muted m-0">Toplam Odeme</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 ">
                            <div className="row">
                              <div className="col-sm-12 ml-sm-0 mr-sm-0 pr-md-0">
                                <h5 className="font-weight-bold text-dark">
                                  {this.state.userData.balance} ₺
                                </h5>
                              </div>
                            </div>
                            <div className="row align-items-center">
                              <div className="col-12">
                                <p className="text-muted m-0">Kazanc</p>
                              </div>
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
                      {!this.state.userData.logHistory ? (
                        <React.Fragment>
                          <p className="text-center text-dark">
                            Giris Cikis Islemleri
                          </p>
                          <p className="text-center">
                            Kullanici herhangi bir islemde bulunmadi
                          </p>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <p className="text-center mb-2">
                            Giris Cikis Islemleri Gecmisi
                          </p>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="d-flex justify-content-between mt-2 text-dark mb-2">
                                <div>
                                  Toplam: {this.state.userData.logCount}
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="traffic-source-legend">
                                <div className="d-flex justify-content-between mb-1 mt-2">
                                  <div className="font-weight-bold">Zaman</div>
                                  <div className="font-weight-bold">Islem</div>
                                </div>
                                {this.state.userData.logHistory.map(val => (
                                  <div className="d-flex justify-content-between legend-label">
                                    <div>{val.time}</div>
                                    <div
                                      className={
                                        val.traffic === 'Enter'
                                          ? 'badge badge-success'
                                          : 'badge badge-danger'
                                      }
                                    >
                                      {val.traffic}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 grid-margin stretch-card mx-auto">
                  <div className="card">
                    <div className="card-body">
                      {!this.state.userData.paymentHistory ? (
                        <React.Fragment>
                          <p className="text-center text-dark">Odeme Gecmisi</p>
                          <p className="text-center m-2">
                            Herhangi bir odeme gecmisiniz bulunmuyor
                          </p>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <p className="card-title mb-2">Odeme Gecmisi</p>
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="text-dark">
                                {this.state.userData.paymentHistory.map(val => (
                                  <div className="d-flex pb-3 border-bottom justify-content-between">
                                    <div className="mr-3">
                                      <i className="mdi mdi-signal-cellular-outline icon-md"></i>
                                    </div>
                                    <div className="font-weight-bold mr-sm-4 mt-2">
                                      <div>Ödeme</div>
                                      <div className="text-muted font-weight-normal mt-1">
                                        {val.created_at}
                                      </div>
                                    </div>
                                    <div>
                                      <h6 className="font-weight-bold text-info ml-sm-2">
                                        {val.pay} ₺
                                      </h6>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      )}
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
