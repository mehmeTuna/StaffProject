import React from "react";

import StaffDetail from "./StaffDetail";

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

const Staff = props => {
  const {
    Id,
    Image,
    FirstName,
    LastName,
    Experience,
    Email,
    Factor,
    Periode,
    Pay,
    Adress,
    Gsm,
    Gender,
    MartialStatus,
    workingPlan
  } = props.data;

  const [showData, setShowData] = React.useState(false);
  const fullName = `${FirstName} ${LastName}`;

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="col-sm-12 mb-4 mb-xl-0 d-flex justify-content-between legend-label">
            <div className="d-flex">
              <div>
                <img
                  src={Image}
                  style={{ width: "100px", height: "100px" }}
                  className="mx-auto"
                />
              </div>
              <div>
                <h5 className="font-weight-bold text-dark ml-2 mb-1">
                  {fullName}
                </h5>
                <h6 className="font-weight-bold text-muted ml-2 mb-1">
                  {Experience}
                </h6>
                <h6 className="font-weight-bold text-muted ml-2 mb-1">
                  {Email}
                </h6>
              </div>
            </div>
            <div className="">
              <button
                type="button"
                onClick={() => props.delete({ id: Id, username: fullName })}
                className="m-2 btn btn-success btn-icon-text font-weight-bold"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setShowData(!showData)}
                className="m-2 btn btn-success btn-icon-text font-weight-bold"
              >
                {showData === true ? "Hide Details" : "Details"}
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-xl-3 flex-column d-flex grid-margin stretch-card">
              <div className="row flex-grow">
                <div className="col-sm-12 grid-margin ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-dark">{Factor}</p>
                      <p className="text-dark">
                        Adress: <span className="text-muted">{Adress}</span>
                      </p>
                      <p className="text-dark">
                        GSM: <span className="text-muted">{Gsm}</span>
                      </p>
                      <p className="text-dark">
                        Gender: <span className="text-muted">{Gender}</span>
                      </p>
                      <p className="text-dark">
                        Martial Status:{" "}
                        <span className="text-muted">{MartialStatus}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 d-flex grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  {workingPlan === undefined && (
                    <div className="mx-auto display-4">Tanimli Plan Yok</div>
                  )}
                  <div className="card-title">Plan</div>
                  {workingPlan !== undefined &&
                    workingPlan.monday.length !== 0 && (
                      <h5>Monday {dayPlanList(workingPlan.monday)}</h5>
                    )}
                  {workingPlan !== undefined &&
                    workingPlan.tuesday.length !== 0 && (
                      <h5>Tuesday {dayPlanList(workingPlan.tuesday)}</h5>
                    )}
                  {workingPlan !== undefined &&
                    workingPlan.wednesday.length !== 0 && (
                      <h5>Wednesday {dayPlanList(workingPlan.wednesday)}</h5>
                    )}
                  {workingPlan !== undefined &&
                    workingPlan.thursday.length !== 0 && (
                      <h5>Thursday {dayPlanList(workingPlan.thursday)}</h5>
                    )}
                  {workingPlan !== undefined &&
                    workingPlan.friday.length !== 0 && (
                      <h5>Friday {dayPlanList(workingPlan.friday)}</h5>
                    )}
                  {workingPlan !== undefined &&
                    workingPlan.saturday.length !== 0 && (
                      <h5>Saturday {dayPlanList(workingPlan.saturday)}</h5>
                    )}
                  {workingPlan !== undefined &&
                    workingPlan.sunday.length !== 0 && (
                      <h5>Sunday {dayPlanList(workingPlan.sunday)}</h5>
                    )}
                </div>
              </div>
            </div>
          </div>
          {showData === true && <StaffDetail id={Id} />}
        </div>
      </div>
    </div>
  );
};

export default Staff;
