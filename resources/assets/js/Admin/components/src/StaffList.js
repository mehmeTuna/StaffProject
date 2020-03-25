import React, { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";

import { connect } from "react-redux";
import { staffGetItems } from "../../redux/reducers/StaffReducer";

import { Loading } from "./components/app";

const sweet = withReactContent(Swal);

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
  ));
}

function StaffDetail(data, staffPayment) {
  return (
    <React.Fragment>
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
                          {data.paymentHistoryData.total} ₺
                        </h5>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-12">
                        <p className="text-muted m-0">Toplam Odeme</p>
                      </div>
                    </div>
                    <div className="row text-center">
                      <button
                        type="button"
                        className="m-2 btn btn-success btn-icon-text font-weight-bold"
                        onClick={staffPayment}
                      >
                        Odeme Yap
                      </button>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="row">
                      <div className="col-sm-12 ml-sm-0 mr-sm-0 pr-md-0">
                        <h5 className="font-weight-bold text-dark">
                          {data.balance} ₺
                        </h5>
                      </div>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-12">
                        <p className="text-muted m-0">Odenmesi gereken tutar</p>
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
              {data.logHistory.length == 0 ? (
                <React.Fragment>
                  <p className="text-center text-dark">Giris Cikis Islemleri</p>
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
                        <div>Toplam: {data.logCount}</div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="traffic-source-legend">
                        <div className="d-flex justify-content-between mb-1 mt-2">
                          <div className="font-weight-bold">Zaman</div>
                          <div className="font-weight-bold">Islem</div>
                        </div>
                        {data.logHistory.map(val => (
                          <div className="d-flex justify-content-between legend-label">
                            <div>{val.Hour}</div>
                            <div
                              className={
                                val.Traffic === "Enter"
                                  ? "badge badge-success"
                                  : "badge badge-danger"
                              }
                            >
                              {val.Traffic}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
            {data.logHistory.length !== 0 && (
              <nav aria-label="row Page navigation example">
                <ul className="col-sm-12 pagination justify-content-center mt-4">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
        <div className="col-xl-4 grid-margin stretch-card mx-auto">
          <div className="card">
            <div className="card-body">
              {data.paymentHistory.length === 0 ? (
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
                        {data.paymentHistory.map(val => (
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
            {data.paymentHistory.length !== 0 && (
              <nav aria-label="row Page navigation example">
                <ul className="col-sm-12 pagination justify-content-center mt-4">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>{" "}
    </React.Fragment>
  );
}

class StaffRender extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logList: "",
      isLoading: false,
      user: [],
      userData: []
    };

    this.getUserDetail = this.getUserDetail.bind(this);

    this.staffPayment = this.staffPayment.bind(this);
    this.userBalancePay = this.userBalancePay.bind(this);
  }

  componentDidMount() {
    this.setState({ user: this.props.val });
  }

  async getUserDetail(refresh) {
    console.log(this.state.user.Experience.Identifier);
    if (refresh === false && this.state.logList !== "") {
      this.setState({ logList: "" });
      return;
    }
    this.setState({ isLoading: true, logList: "" });
    const { data } = await Axios.post("/user/data", {
      userId: this.state.user.Id,
      type: "log"
    });

    if (data.status === true) {
      this.setState({ isLoading: false, userData: data, logList: "log" });
    }
  }

  async userBalancePay(value) {
    const { data } = await Axios.post("/user/balance/payment", {
      userId: this.state.user.Id,
      pay: value
    });
    this.getUserDetail(true);
  }

  staffPayment() {
    sweet
      .fire({
        title: "Odemek istediginiz tutar",
        input: "number"
      })
      .then(result => {
        if (result.value !== "") {
          this.userBalancePay(result.value);
        }
      });
  }

  render() {
    return (
      <div
        key={this.state.user.Id}
        className="col-lg-12 grid-margin stretch-card"
      >
        <div className="card">
          <div className="card-body">
            <div className="col-sm-12 mb-4 mb-xl-0 d-flex justify-content-between legend-label">
              <div className="d-flex">
                <div>
                  <img
                    src={this.state.user.Image}
                    style={{ width: "100px", height: "100px" }}
                    className="mx-auto"
                  />
                </div>
                <div>
                  <h5 className="font-weight-bold text-dark ml-2 mb-1">{`${this.state.user.FirstName} ${this.state.user.LastName}`}</h5>
                  <h6 className="font-weight-bold text-muted ml-2 mb-1">
                    {this.state.user.Experience}
                  </h6>
                  <h6 className="font-weight-bold text-muted ml-2 mb-1">
                    {this.state.user.Email}
                  </h6>
                </div>
              </div>
              <div className="">
                <button
                  type="button"
                  onClick={() =>
                    this.props.delete(
                      this.state.user.Id,
                      `${this.state.user.FirstName} ${this.state.user.LastName}`
                    )
                  }
                  className="m-2 btn btn-success btn-icon-text font-weight-bold"
                >
                  Sil
                </button>
                <button
                  type="button"
                  onClick={() => this.getUserDetail(false)}
                  className="m-2 btn btn-success btn-icon-text font-weight-bold"
                >
                  {this.state.logList === "" ? "Detaylar" : "Detaylari Gizle"}
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-xl-3 flex-column d-flex grid-margin stretch-card">
                <div className="row flex-grow">
                  <div className="col-sm-12 grid-margin ">
                    <div className="card">
                      <div className="card-body">
                        <p className="text-dark">{this.state.user.Factor}</p>
                        <p className="text-dark">
                          Adress:{" "}
                          <span className="text-muted">
                            {this.state.user.Adress}
                          </span>
                        </p>
                        <p className="text-dark">
                          GSM:{" "}
                          <span className="text-muted">
                            {this.state.user.Gsm}
                          </span>
                        </p>
                        <p className="text-dark">
                          Gender:{" "}
                          <span className="text-muted">
                            {this.state.user.Gender}
                          </span>
                        </p>
                        <p className="text-dark">
                          Martial Status:{" "}
                          <span className="text-muted">
                            {this.state.user.MartialStatus}
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
                      <div className="mx-auto display-4">Tanimli Plan Yok</div>
                    )}
                    <div className="card-title">Plan</div>
                    {this.state.user.workingPlan !== undefined &&
                      this.state.user.workingPlan.monday.length !== 0 && (
                        <h5>
                          Monday{" "}
                          {dayPlanList(this.state.user.workingPlan.monday)}
                        </h5>
                      )}
                    {this.state.user.workingPlan !== undefined &&
                      this.state.user.workingPlan.tuesday.length !== 0 && (
                        <h5>
                          Tuesday{" "}
                          {dayPlanList(this.state.user.workingPlan.tuesday)}
                        </h5>
                      )}
                    {this.state.user.workingPlan !== undefined &&
                      this.state.user.workingPlan.wednesday.length !== 0 && (
                        <h5>
                          Wednesday{" "}
                          {dayPlanList(this.state.user.workingPlan.wednesday)}
                        </h5>
                      )}
                    {this.state.user.workingPlan !== undefined &&
                      this.state.user.workingPlan.thursday.length !== 0 && (
                        <h5>
                          Thursday{" "}
                          {dayPlanList(this.state.user.workingPlan.thursday)}
                        </h5>
                      )}
                    {this.state.user.workingPlan !== undefined &&
                      this.state.user.workingPlan.friday.length !== 0 && (
                        <h5>
                          Friday{" "}
                          {dayPlanList(this.state.user.workingPlan.friday)}
                        </h5>
                      )}
                    {this.state.user.workingPlan !== undefined &&
                      this.state.user.workingPlan.saturday.length !== 0 && (
                        <h5>
                          Saturday{" "}
                          {dayPlanList(this.state.user.workingPlan.saturday)}
                        </h5>
                      )}
                    {this.state.user.workingPlan !== undefined &&
                      this.state.user.workingPlan.sunday.length !== 0 && (
                        <h5>
                          Sunday{" "}
                          {dayPlanList(this.state.user.workingPlan.sunday)}
                        </h5>
                      )}
                  </div>
                </div>
              </div>
            </div>
            {this.state.isLoading === true && <Loading />}
            {this.state.logList !== "" &&
              StaffDetail(this.state.userData, this.staffPayment)}
          </div>
        </div>
      </div>
    );
  }
}

class StaffList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Loading: false,
      experience: [],
      staff: []
    };

    this.getExperience = this.getExperience.bind(this);
    this.getStaff = this.getStaff.bind(this);
    this.deleteStaff = this.deleteStaff.bind(this);
    this.delete = this.delete.bind(this);
  }

  async componentDidMount() {
    this.setState({ Loading: true });
    await this.getExperience();
    await this.getStaff();

    this.setState({ Loading: false });
  }

  async getExperience() {
    const { data } = await Axios.post("/business/experience/list");
    this.setState({ experience: data });
  }

  async getStaff() {
    const { data } = await Axios.post("/business/staff/list");
    this.setState({ staff: data });
  }

  deleteStaff(id, username) {
    sweet
      .fire({
        title: `${username} silmek istediğinize eminmisiniz ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sil"
      })
      .then(result => {
        if (result.value) {
          this.delete({ id, username });
        }
      });
  }

  async delete({ id, username }) {
    const { staff } = this.state;
    const result = staff.filter(e => e.Id != id);
    this.setState({ staff: result });
    const { data } = await Axios.post("/business/staff/delete", {
      id: id
    });

    if (data.status === true) {
      sweet.fire({
        title: `${username} silindi`,
        timer: 1500
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.Loading === true ? (
          <Loading />
        ) : this.state.staff === undefined || this.state.staff.length === 0 ? (
          <div className="col-sm-12 col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-center">
                <div className="card-title">
                  <h5 className="font-weight-bold text-dark">
                    Herhangi bir tanimli staff bulunamadi yeni bir tane
                    tanimlamak istermisiniz
                  </h5>
                </div>
                <div className="row display-3">
                  <Link
                    to={"/" + `${this.props.data.username + "/staff/create"}`}
                    className="nav-link mx-auto"
                  >
                    <button
                      type="button"
                      className="btn btn-success font-weight-bold mx-auto mt-4"
                    >
                      <span className="badge">
                        <i className="icon-circle-plus" />
                      </span>
                      <span>Create</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div className="col-sm-12 mb-4 mb-xl-0">
              <h5 className="font-weight-bold text-dark">Staff List</h5>
            </div>
            <div className="col-12 mt-3">
              {this.state.staff.map(val => (
                <StaffRender key={val.Id} val={val} delete={this.deleteStaff} />
              ))}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetStaff: () => dispatch(staffGetItems())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffList);