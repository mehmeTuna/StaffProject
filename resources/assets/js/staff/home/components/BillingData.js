import React from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

function DataPaper({content, data, ...props}) {
  return (
    <Paper className={props.class}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Box fontWeight="fontWeightMedium">{content}</Box>
        </Grid>
        <Grid item>
          <Box fontSize="h6.fontSize">{data}</Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}))

export default function BillingData() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4}>
          <DataPaper class={classes.paper} content="Balance" data="100" />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <DataPaper class={classes.paper} content="Total Payment" data="100" />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <DataPaper class={classes.paper} content="Saatlik" data="10 tl" />
        </Grid>
      </Grid>
    </div>
  )
}
