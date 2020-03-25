import React from 'react'
import {
  Grid,
  TextField,
  DialogTitle,
  DialogContent,
  Dialog,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Btn from '../assets/Button'
import theme from '../theme'
import StaffPaymentHistory from './component/payment-history'
import StaffLogHistory from './component/log-history'
import {
  getStaffLogHistory,
  getStaffPaymentHistory,
  staffPayment
} from '../../../api/staff'

const sweet = withReactContent(Swal)

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}))

export default function StaffDetail(props) {
  const classes = useStyles()
  const [tabChange, setTabChange] = React.useState(0)
  const [staffBalance, setBalance] = React.useState('')
  const [tabData, setTabData] = React.useState([])
  const [state, setState] = React.useState({
    totalPayment: props.staff.totalPayment,
    balance: props.staff.balance
  })

  const payData = async () => {
    const data = await staffPayment({
      id: props.staff.id,
      pay: staffBalance,
      comment: 'payment'
    })

    setBalance('')

    let totalPayment = state.totalPayment + state.balance
    let balance = 0

    if (staffBalance < state.balance) {
      totalPayment = parseInt(state.totalPayment) + parseInt(staffBalance)
      balance = parseInt(state.balance) - parseInt(staffBalance)
    }

    setState({
      totalPayment: totalPayment,
      balance: balance
    })

    sweet.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Payment completed',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const changedTab = async newValue => {
    if (tabChange == newValue) return
    setTabChange(newValue)
    switch (newValue) {
      case 1:
        setTabData([])
        const pay = await getStaffPaymentHistory(props.staff.id)
        setTabData(pay)
        break
      case 2:
        setTabData([])
        const log = await getStaffLogHistory(props.staff.id)
        setTabData(log)
        break
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={props.isOpen}
        onClose={() => props.setOpen(false)}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          {`${props.staff.firstName} ${props.staff.lastName}`}{' '}
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => props.setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.root}>
          <Grid container spacing={2}>
            <Grid container item xs={12} sm={6} justify="flex-start">
              <Grid item sm={12} md={3}>
                <img
                  src={props.staff.image}
                  alt={`${props.staff.firstName} ${props.staff.lastName}`}
                  className="mx-auto"
                  style={{width: '100px', height: '100'}}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <p className="font-weight-bold text-dark ml-2 mb-1">
                  {props.staff.experience}
                </p>
                <p className="font-weight-bold text-dark ml-2 mb-1">
                  <span className="text-muted">E-mail: </span>
                  {props.staff.email}
                </p>
                <p className="font-weight-bold text-dark ml-2 mb-1">
                  <span className="text-muted">Phone: </span>
                  {props.staff.gsm}
                </p>
                <p className="font-weight-bold text-dark ml-2 mb-1">
                  <span className="text-muted">Address: </span>
                  {props.staff.address}
                </p>
                <p className="font-weight-bold text-dark ml-2 mb-1">
                  <span className="text-muted">Gender: </span>
                  {props.staff.gender}
                </p>
                <p className="font-weight-bold text-dark ml-2 mb-1">
                  <span className="text-muted">Martial Status: </span>
                  {props.staff.martialStatus}
                </p>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={6} justify="space-between">
              <Grid item xs={12} sm={6} md={6}>
                Total payment: {state.totalPayment}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                Amount to be paid: {state.balance}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  label="Amount to be paid"
                  type="number"
                  value={staffBalance}
                  onChange={e => {
                    if (e.target.value > 0) setBalance(e.target.value)
                    else setBalance('')
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Btn
                  style={{background: theme.colors.primary}}
                  startIcon={<AccountBalanceWalletIcon />}
                  onClick={() => payData()}
                >
                  Pay
                </Btn>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Tabs
                value={tabChange}
                onChange={(event, newValue) => changedTab(newValue)}
                indicatorColor="primary"
                textColor="inherit"
                centered
              >
                <Tab color={theme.colors.primary} label="Plan" />
                <Tab color={theme.colors.primary} label="Payment History" />
                <Tab color={theme.colors.primary} label="Log History" />
              </Tabs>
              {tabChange === 0 && <div>Plan Detail</div>}
              {tabChange === 1 && <StaffPaymentHistory data={tabData} />}
              {tabChange === 2 && <StaffLogHistory data={tabData} />}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
