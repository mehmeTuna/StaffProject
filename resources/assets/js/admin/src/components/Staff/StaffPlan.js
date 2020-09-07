import React from 'react'
import Typography from '@material-ui/core/Typography'
import {Grid} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'

export default function StaffPlan({data}) {
  return (
    <Grid item xs={12} md={8} style={{border: '1px solid #e4e6f6', paddingLeft: 14}}>
      {data.map((item, key) => {
        <Grid key={key} item container alignItems='center'>
          <Typography variant="h4">{key[0]}</Typography>
          <Grid item>
            {key[1].length !== 0 && (
              <PlanList
                data={key[1]}
                workingPlan={data}
                day={key[0]}
              />
            )}
            <button
              type="button"
              className={
                key[1].length === 0
                  ? 'm-2 mr-lg-10 btn btn-info font-weight-bold'
                  : 'm-2 btn btn-info font-weight-bold'
              }
            >
          <span className="badge">
           <AddIcon/>
          </span>
              <span>Add new Plan</span>
            </button>
          </Grid>
        </Grid>
      })}
    </Grid>
  )
}

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
      <span className="badge badge-light">
        <ClearIcon/>
      </span>
    </button>
  ))
}
