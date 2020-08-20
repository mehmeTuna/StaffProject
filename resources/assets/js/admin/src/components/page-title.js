import React from 'react'

import {Typography, Grid, Box} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Btn from './assets/Button'
import theme from './theme'
import FilterListIcon from '@material-ui/icons/FilterList'

const useStyles = makeStyles(theme => ({
  head: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}))

export function PageHeader(props) {
  const classes = useStyles()
  return (
    <Box className={classes.head}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        {props.children}
      </Grid>
    </Box>
  )
}

export function PageTitle(props) {
  return (
    <Typography
      {...props}
      align="center"
      color="initial"
      variant="h3"
      component="p"
    >
      {props.children}
    </Typography>
  )
}

export function TitleLeftBtn(props) {
  return <Btn {...props}>{props.children}</Btn>
}

export function TitleRightBtn(props) {
  return (
    <Btn
      style={{background: theme.colors.primary}}
      startIcon={<FilterListIcon />}
      {...props}
    >
      {props.children}
    </Btn>
  )
}
