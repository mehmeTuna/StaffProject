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
import theme from '../components/theme'
import FilterListIcon from '@material-ui/icons/FilterList'
import Btn from '../components/assets/Button'
import PageLoading from '../assets/PageLoading'

const useStyles = makeStyles(theme => ({
  root: {
    width: 'inherit',
    height: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  rootPage: {
    maxWidth: '900px',
    width: 'inherit',
    height: 'inherit',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  newAdd: {
    width: '200px',
    height: '120px',
    color: theme.palette.black,
    display: 'flex',
    justifyContent: 'center',
    direction: 'column',
    border: '1px solid',
    borderColor: theme.palette.primary.main
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
    return <PageLoading />
  }

  if (staff.length === 0) {
    return (
      <div className={classes.root}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.newAdd}
          component={Link}
          to={`/${username}/staff/create`}
          startIcon={<AddIcon />}
        >
          <Typography>Staff Add</Typography>
        </Button>
      </div>
    )
  }

  return (
    <div className={classes.rootPage}>
      <div className={classes.header}>
        <div />
        <Typography variant="h3" gutterBottom className={classes.headerTitle}>
          Staff List
        </Typography>
      </div>
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
