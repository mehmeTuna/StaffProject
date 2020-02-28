import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function dayPlanList(data) {
  return data.map((value, key) => (
    <button
      key={key}
      type="button"
      className="m-2 btn btn-info font-weight-bold"
    >
      <span className="m-1">
        {value.start}- {value.end}
      </span>
    </button>
  ));
}

function ExperienceRender(data) {
  return data.data.map((val, key) => (
    <div key={key} className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="col-sm-12 mb-4 mb-xl-0">
            <h5 className="font-weight-bold">{val.experience.Identifier}</h5>
          </div>
          <div className="row mt-3">
            <div className="col-xl-3 flex-column d-flex grid-margin stretch-card">
              <div className="row flex-grow">
                <div className="col-sm-12 grid-margin ">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="text-dark">
                        Pay:{" "}
                        <span className="text-muted">{val.experience.Pay}</span>{" "}
                      </h5>
                      <h5 className="text-dark">
                        Factor:
                        <span className="text-muted">
                          {val.experience.Factor}
                        </span>
                      </h5>
                      <h5 className="text-dark">
                        Period:{" "}
                        <span className="text-muted">
                          {val.experience.Periode}
                        </span>{" "}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                val.staffList.length > 0
                  ? "col-xl-5 d-flex grid-margin stretch-card"
                  : "col-xl-9 d-flex grid-margin stretch-card"
              }
            >
              <div className="card">
                <div className="card-body">
                  <div className="card-title">Plan</div>
                  {val.experience.workingPlan !== undefined &&
                    val.experience.workingPlan.monday.length !== 0 && (
                      <h5>
                        Monday {dayPlanList(val.experience.workingPlan.monday)}
                      </h5>
                    )}
                  {val.experience.workingPlan !== undefined &&
                    val.experience.workingPlan.tuesday.length !== 0 && (
                      <h5>
                        Tuesday{" "}
                        {dayPlanList(val.experience.workingPlan.tuesday)}
                      </h5>
                    )}
                  {val.experience.workingPlan !== undefined &&
                    val.experience.workingPlan.wednesday.length !== 0 && (
                      <h5>
                        Wednesday{" "}
                        {dayPlanList(val.experience.workingPlan.wednesday)}
                      </h5>
                    )}
                  {val.experience.workingPlan !== undefined &&
                    val.experience.workingPlan.thursday.length !== 0 && (
                      <h5>
                        Thursday{" "}
                        {dayPlanList(val.experience.workingPlan.thursday)}
                      </h5>
                    )}
                  {val.experience.workingPlan !== undefined &&
                    val.experience.workingPlan.friday.length !== 0 && (
                      <h5>
                        Friday {dayPlanList(val.experience.workingPlan.friday)}
                      </h5>
                    )}
                  {val.experience.workingPlan !== undefined &&
                    val.experience.workingPlan.saturday.length !== 0 && (
                      <h5>
                        Saturday{" "}
                        {dayPlanList(val.experience.workingPlan.saturday)}
                      </h5>
                    )}
                  {val.experience.workingPlan !== undefined &&
                    val.experience.workingPlan.sunday.length !== 0 && (
                      <h5>
                        Sunday {dayPlanList(val.experience.workingPlan.sunday)}
                      </h5>
                    )}
                </div>
              </div>
            </div>
            {val.staffList.length > 0 && (
              <div className="col-xl-4 d-flex grid-margin stretch-card">
                <div className="col-sm-12">
                  <div className="traffic-source-legend">
                    <div className="d-flex justify-content-between mb-1 mt-2">
                      <div className="font-weight-bold ml-2">Staff</div>
                      <div className="font-weight-bold">Balance</div>
                    </div>
                    {val.staffList.map(val => (
                      <div className="d-flex justify-content-between legend-label">
                        <div className="d-flex align-items-center">
                          <img
                            src={val.img}
                            className="mr-1 rounded-circle z-depth-2"
                            style={{ width: "50px", height: "50px" }}
                          ></img>
                          <p> {val.username} </p>
                        </div>
                        <div className="d-flex align-items-center">
                          <p>{val.balance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ));
}

class ExperienceList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  async componentDidMount() {
    const { data } = await Axios.post("/business/experience/list/data");

    this.setState({ list: data });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.list.length === 0 ? (
          <div className="col-sm-12 col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-center">
                <div className="card-title">
                  <h4 className="font-weight-bold text-dark">
                    Herhangi bir tanimli Experience bulunamadi yeni bir tane
                    tanimlamak istermisiniz
                  </h4>
                </div>
                <div className="row display-3">
                  <Link
                    to={
                      "/" + `${this.props.data.username + "/experience/create"}`
                    }
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
          <ExperienceRender data={this.state.list} />
        )}
      </React.Fragment>
    );
  }
}

export default ExperienceList;
