import React from 'react'
import Grid from '@material-ui/core/Grid'
import {Typography} from '@material-ui/core'

function PlanList({data}) {
  if (typeof data !== 'object') return

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
  ))
}

export default function StaffPlanShow({data}) {
  return Object.entries(data).map((key, index) => (
    <Grid key={index} item container alignItems="center">
      {key[1].length !== 0 && <Typography variant="h4">{key[0]}</Typography>}
      <Grid item>
        {key[1].length !== 0 && <PlanList data={key[1]} day={key[0]} />}
      </Grid>
    </Grid>
  ))
}
