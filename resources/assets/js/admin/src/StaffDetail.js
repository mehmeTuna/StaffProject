import React, {useEffect} from 'react'
import {useParams, Link as RouterLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {Grid, makeStyles} from '@material-ui/core'

import StaffAvatar from './../components/Staff/StaffAvatar'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Paper from '@material-ui/core/Paper'

import {staffPay, getStaffProfileData} from '../../redux/actions/StaffActions'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CircularProgress from '@material-ui/core/CircularProgress'
import LogHistoryTable from '../components/Staff/LogHistoryTable'
import PaymentHistoryTable from '../components/Staff/PaymentHistoryTable'
import Button from '@material-ui/core/Button'
import PaymentDialog from '../components/Staff/paymentDialog'

function NavBreadcrumbs({beforePageUrl}) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" component={RouterLink} to={beforePageUrl}>
        <ArrowBackIosIcon style={{fontSize: '1rem'}} />
        Back to staff List
      </Link>
    </Breadcrumbs>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '900px'
  },
  profileDetail: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  profileHero: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  heroTitle: {
    marginTop: theme.spacing(1),
    color: '#3A3B3F',
    fontSize: '14px'
  },
  heroSubTitle: {
    fontSize: '14px',
    color: '#66788A'
  },
  detail: {
    textAlign: 'right',
    marginRight: theme.spacing(1)
  },
  detailContent: {
    color: '#3A3B3F'
  },
  heroPaper: {
    padding: theme.spacing(2)
  },
  profileDataGrid: {
    display: 'flex'
  }
}))

const StaffDetailComponent = props => {
  const classes = useStyles()

  const {staffId} = useParams()
  const {getProfile, staffProfile, profileLoading, currencySymbolUtf8} = props
  const [tabChange, setTabChange] = React.useState(0)
  const [isPaymentShow, setIsPaymentShow] = React.useState(false)
  const [tabData, setTabData] = React.useState(0)

  useEffect(() => {
    getProfile(staffId)
  }, [])

  if (profileLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Grid container direction="column" spacing={2} className={classes.root}>
      {isPaymentShow && <PaymentDialog userId={staffId} isOpen={e => setIsPaymentShow(e)} />}
      <Grid
        item
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <NavBreadcrumbs
          beforePageUrl={`/${props.match.params.businessName}/staff/list`}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={e => setIsPaymentShow(true)}
        >
          Pay
        </Button>
      </Grid>
      <Grid item>
        <Paper variant="outlined" square className={classes.heroPaper}>
          <Grid item className={classes.profileDataGrid}>
            <Grid
              item
              container
              alignItems="center"
              spacing={4}
              xs={12}
              md={6}
              lg={6}
            >
              <Grid item>
                <StaffAvatar
                  src={staffProfile.image}
                  online={staffProfile.online}
                />
              </Grid>
              <Grid item>
                <Typography variant="h3">{`${staffProfile.firstName} ${staffProfile.lastName}`}</Typography>
                {staffProfile.experience_data !== null &&
                  typeof staffProfile.experience_data !== 'undefined' && (
                    <Typography variant="subtitle2">
                      {staffProfile.experience_data.identifier}
                    </Typography>
                  )}

                <Typography variant="subtitle2">{`${staffProfile.periode} ${staffProfile.factor} ${staffProfile.salary} ${currencySymbolUtf8}`}</Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={2}
              xs={12}
              md={6}
              lg={6}
            >
              <Grid item>
                <Typography>E-mail:</Typography>
                <Typography>Phone: </Typography>
                <Typography>Birthday: </Typography>
                <Typography>Martial Status: </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  {staffProfile.email}
                </Typography>
                <Typography variant="subtitle2">{staffProfile.gsm}</Typography>
                <Typography variant="subtitle2">
                  {staffProfile.birthday}
                </Typography>
                <Typography variant="subtitle2">
                  {staffProfile.martialStatus}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid>
        <Paper variant="outlined" square>
          <Tabs
            value={tabData}
            onChange={(e, newVal) => setTabData(newVal)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Plan" />
            <Tab label="Payment History" />
            <Tab label="Log History" />
          </Tabs>
        </Paper>
      </Grid>
      <Grid>
        {tabData === 0 && 'Editing'}
        {tabData === 2 && <LogHistoryTable rows={staffProfile.log_history} />}
        {tabData === 1 && (
          <PaymentHistoryTable rows={staffProfile.payment_history} />
        )}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    staffProfile: state.staffReducer.staffProfile,
    profileLoading: state.staffReducer.staffProfileLoading,
    currencySymbolUtf8: state.profileReducer.currencySymbolUtf8
  }
}

const mapDispatchToProps = dispatch => {
  return {
    staffPay: data => {
      dispatch(staffPay(data))
    },
    getProfile: id => {
      dispatch(getStaffProfileData(id))
    }
  }
}

const StaffDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffDetailComponent)

export default StaffDetail
