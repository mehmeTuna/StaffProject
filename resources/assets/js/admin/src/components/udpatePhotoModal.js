import React from 'react'
import {connect} from 'react-redux'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import {makeStyles} from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'

import Btn from './assets/Button'
import theme from './theme'

import {businessProfileUpdateImg} from './../../redux/actions/ProfileActions'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  },
  content: {
    justifyContent: 'center',
    width: '100%'
  }
}))

const UpdatePhotoModalComponent = ({
  profileImg,
  profileUpdateImg,
  updateTypeState
}) => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(true)
  const [img, setImg] = React.useState({url: null, file: ''})
  const [change, updateChange] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
    updateTypeState('')
  }

  const handleSubmit = () => {
    if (change) {
      profileUpdateImg(img)
      setOpen(false)
      updateTypeState('')
    }
  }

  const handleChange = event => {
    setImg({
      url: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0]
    })
    updateChange(true)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          {img.url !== null ? (
            <img src={img.url} width="100%" />
          ) : (
            <>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={e => handleChange(e)}
              />
              <label htmlFor="icon-button-file" className={classes.content}>
                <IconButton aria-label="upload picture" component="span">
                  <PhotoCamera style={{fontSize: 40}} />
                </IconButton>
              </label>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Btn
            style={{backgroundColor: theme.colors.primary}}
            onClick={handleSubmit}
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
    profileImg: state.profileReducer.profileImg
  }
}

const mapDispatchToProps = dispatch => {
  return {
    profileUpdateImg: data => {
      dispatch(businessProfileUpdateImg(data))
    }
  }
}

const UpdatePhotoModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePhotoModalComponent)

export default UpdatePhotoModal
