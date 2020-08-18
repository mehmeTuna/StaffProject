import React, {useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import StaffList from '../components/StaffList'
import {connect} from 'react-redux'
import {getStaffDefaultListAction} from '../../redux/actions/StaffActions'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import {Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import theme from '../components/theme'
import FilterListIcon from '@material-ui/icons/FilterList'
import Btn from '../components/assets/Button'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '900px',
    width: '-webkit-fill-available',
    height: '-webkit-fill-available',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  rootPage: {
    maxWidth: '900px',
    width: '-webkit-fill-available',
    height: '-webkit-fill-available',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    width: '-webkit-fill-available',
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

const InitialStaff = ({getAllList, staff, username, loading}) => {
  const classes = useStyles()

  useEffect(() => {
    getAllList()
  }, [])

  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    )
  }

  if (staff.length === 0) {
    return (
      <div className={classes.root}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography>
            Registered personnel could not be found. You can define a new one
          </Typography>
          <Link to={`/${username}/staff/create`}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
            >
              Staff Add
            </Button>
          </Link>
        </Grid>
      </div>
    )
  }

  return (
    <div className={classes.rootPage}>
      <div className={classes.header}>
        <Typography variant="h3" gutterBottom className={classes.headerTitle}>
          Staff List
        </Typography>
        <Btn
          style={{background: theme.colors.primary}}
          startIcon={<FilterListIcon />}
        >
          Filter
        </Btn>
      </div>
      <Paper className={classes.paper}>Filter</Paper>
      <StaffList staffList={staff} />
    </div>
  )
}

const mapStateProps = (state, ownProps) => {
  return {
    staff: state.staffReducer.staff,
    username: state.profileReducer.username,
    loading: state.staffReducer.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllList: data => {
      dispatch(getStaffDefaultListAction(data))
    }
  }
}

const StaffPage = connect(mapStateProps, mapDispatchToProps)(InitialStaff)

export default StaffPage
