import React from 'react'

import selectClock from './select-time'
import Grid from '@material-ui/core/Grid'
import {Typography} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'

const PlanDetail = ({data, deletePlan, addPlan}) => {
  return Object.entries(data).map((key, index) => (
    <Grid key={index} item container alignItems='center'>
      <Typography variant="h4">{key[0]}</Typography>
      <Grid item>
        {key[1].length !== 0 && (
          <PlanList
            data={key[1]}
            workingPlan={data}
            day={key[0]}
            deleteTime={deletePlan}
          />
        )}
        <button
          type="button"
          className={
            key[1].length === 0
              ? 'm-2 mr-lg-10 btn btn-info font-weight-bold'
              : 'm-2 btn btn-info font-weight-bold'
          }
          onClick={() => selectClock(addPlan, key[0])}
        >
          <span className="badge">
           <AddIcon/>
          </span>
          <span>Add new Plan</span>
        </button>
      </Grid>
    </Grid>
  ))
}

function PlanList({data, deleteTime, day}) {
  if (typeof data !== 'object') return

  return data.map((value, key) => (
    <button
      key={key}
      type="button"
      onClick={() => deleteTime({index: key, day: day})}
      className="m-2 btn btn-info font-weight-bold"
    >
      <span className="m-1">
        {value.start}- {value.end}
      </span>
      <span className="badge badge-light">
        <ClearIcon/>
      </span>
    </button>
  ))
}

export default PlanDetail
