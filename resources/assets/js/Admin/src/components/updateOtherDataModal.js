import React from 'react'
import {connect} from 'react-redux'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import {
  businessProfileUpdateUsername,
  businessProfileUpdateAddress,
  businessProfileUpdateEmail,
  businessProfileUpdateWebpage,
  businessProfileUpdatePhone
} from './../../redux/actions/ProfileActions'
import Btn from './assets/Button'
import theme from './theme'

const UpdateOtherDataModalComponent = ({
  updateType,
  updateTypeState,
  username,
  email,
  phone,
  profileUpdateUsername,
  profileUpdateAddress,
  profileUpdateEmail,
  profileUpdateWebpage,
  profileUpdatePhone
}) => {
  const [maxWidth, setMaxWidth] = React.useState('md')

  const [open, setOpen] = React.useState(true)
  const [value, setValue] = React.useState(
    updateType === 'name'
      ? username
      : updateType === 'email'
      ? email
      : updateType === 'phone'
      ? phone
      : ''
  )

  const handleClose = () => {
    setOpen(false)
    updateTypeState('')
  }

  const handleUpdate = () => {
    handleClose()
    if (updateType === 'name') {
      profileUpdateUsername(value)
    } else if (updateType === 'address') {
      profileUpdateAddress(value)
    } else if (updateType === 'email') {
      profileUpdateEmail(value)
    } else if (updateType === 'webPage') {
      profileUpdateWebpage(value)
    } else if (updateType === 'phone') {
      profileUpdatePhone(value)
    }
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
          style={{textTransform: 'capitalize'}}
        >
          {updateType} Update
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            value={value}
            type={
              updateType === 'password'
                ? 'password'
                : updateType === 'email'
                ? 'email'
                : updateType === 'phone'
                ? 'number'
                : 'text'
            }
            fullWidth
            name={updateType}
            onChange={e => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Btn
            style={{backgroundColor: theme.colors.primary}}
            onClick={handleUpdate}
          >
            Update
          </Btn>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.profileReducer.username,
    email: state.profileReducer.email,
    phone: state.profileReducer.phone
  }
}

const mapDispatchToProps = dispatch => {
  return {
    profileUpdateUsername: data => {
      dispatch(businessProfileUpdateUsername(data))
    },
    profileUpdateAddress: data => {
      dispatch(businessProfileUpdateAddress(data))
    },
    profileUpdateEmail: data => {
      dispatch(businessProfileUpdateEmail(data))
    },
    profileUpdateWebpage: data => {
      dispatch(businessProfileUpdateWebpage(data))
    },
    profileUpdatePhone: data => {
      dispatch(businessProfileUpdatePhone(data))
    }
  }
}

const UpdateOtherDataModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateOtherDataModalComponent)

export default UpdateOtherDataModal
