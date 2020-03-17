import React from 'react'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import Btn from './assets/Button'
import { businessUpdate } from './../../api/business'

export default function UpdateOtherDataModal(props) {
  const [maxWidth, setMaxWidth] = React.useState('md')

  const [open, setOpen] = React.useState(true)
  const [value, setValue] = React.useState('')

  const handleClose = () => {
    setOpen(false)
    props.updateTypeState('')
  }

  const handleUpdate = () => {
    const dataType = props.updateType
    handleClose()
    businessUpdate({
      data: value,
      type: dataType
    })
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        maxWidth={maxWidth}
        fullWidth={true}
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ textTransform: 'capitalize' }}
        >
          {props.updateType} Update
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={props.updateType}
            type={
              props.updateType === 'password'
                ? 'password'
                : props.updateType === 'email'
                ? 'email'
                : props.updateType === 'phone'
                ? 'number'
                : 'text'
            }
            fullWidth
            name={props.updateType}
            onChange={e => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Btn onClick={handleUpdate}>Update</Btn>
        </DialogActions>
      </Dialog>
    </div>
  )
}
