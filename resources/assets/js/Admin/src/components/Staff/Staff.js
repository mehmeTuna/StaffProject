import React from 'react'

import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import DetailsIcon from '@material-ui/icons/Details'

import StaffDetail from './StaffDetail'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

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

const Staff = props => {
  const {
    id,
    image,
    firstName,
    lastName,
    experience,
    email,
    factor,
    address,
    gsm,
    gender,
    martialStatus,
    workingPlan
  } = props.data

  const classes = useStyles()
  const [showData, setShowData] = React.useState(false)
  const fullName = `${firstName} ${lastName}`

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div className="card">
        <div className="m-2">
          <div className="col-sm-12 mb-4 mb-xl-0 d-flex flex-sm-row flex-md-row flex-lg-row justify-content-between legend-label">
            <div className="d-flex flex-column flex-md-row flex-lg-row">
              <div>
                <img
                  src={image}
                  alt={fullName}
                  style={{ width: '100px', height: '100px' }}
                  className="mx-auto"
                />
              </div>
              <div className="mt-2">
                <h5 className="font-weight-bold text-dark ml-2 mb-1">
                  {fullName}
                </h5>
                <h6 className="font-weight-bold text-muted ml-2 mb-1">
                  {experience}
                </h6>
                <h6 className="font-weight-bold text-muted ml-2 mb-1">
                  {email}
                </h6>
              </div>
            </div>
            <div className="d-flex flex-column flex-sm-row justify-content-start">
              <div>
                <Button
                  variant="contained"
                  style={{ background: '#75B72B', color: 'white' }}
                  className={classes.button}
                  startIcon={<DetailsIcon />}
                  onClick={() => setShowData(!showData)}
                >
                  {showData === true ? 'Hide Details' : 'Details'}
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={() => props.delete({ id: id, username: fullName })}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-xl-3 flex-column d-flex grid-margin stretch-card">
              <div className="row flex-grow">
                <div className="col-sm-12 grid-margin ">
                  <div className="card">
                    <div className="card-body">
                      <p className="text-dark">{factor}</p>
                      <p className="text-dark">
                        Address: <span className="text-muted">{address}</span>
                      </p>
                      <p className="text-dark">
                        GSM: <span className="text-muted">{gsm}</span>
                      </p>
                      <p className="text-dark">
                        Gender: <span className="text-muted">{gender}</span>
                      </p>
                      <p className="text-dark">
                        Martial Status:{' '}
                        <span className="text-muted">{martialStatus}</span>
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
                    <div className="mx-auto display-4">No Defined Plan</div>
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
          {showData === true && <StaffDetail key={id} id={id} />}
        </div>
      </div>
    </div>
  )
}

export default Staff
