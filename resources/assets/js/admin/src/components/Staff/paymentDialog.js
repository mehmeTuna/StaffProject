import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import {staffPayment} from '../../../api/staff'

export default function PaymentDialog(props) {
  const [open, setOpen] = React.useState(true)
  const [pay, setPay] = React.useState('')

  const handleClose = () => {
    setOpen(false)
    props.isOpen(false)
  }

  const handleChange = e => {
    if (e.target.value >= 0) {
      setPay(e.target.value)
    }
  }

  const handlePayment = async () => {
    if (pay === '' || pay <= 0) return

    const data = await staffPayment({id: props.userId, pay: pay})

    handleClose()
    window.location.reload()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Payment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          the amount will be deducted from your working balance
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="pay"
          label="Pay"
          type="number"
          value={pay}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handlePayment}>
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  )
}
