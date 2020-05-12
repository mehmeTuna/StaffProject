import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import {makeStyles} from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'

import Btn from './assets/Button'
import {businessUpdate} from './../../api/business'
import theme from './theme'

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

export default function UpdatePhotoModal(props) {
  const classes = useStyles()

  const [open, setOpen] = React.useState(true)
  const [img, setImg] = React.useState([])

  const handleClose = () => {
    setOpen(false)
    props.updateTypeState('')
  }

  const handleSubmit = () => {
    console.log('submitted')
    if (img !== []) {
      let formData = new FormData()
      formData.set('img', img.file)
      formData.set('type', 'img')
      businessUpdate(formData)
    }
  }

  const handleChange = event => {
    setImg({
      url: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0]
    })
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          {img.length !== 0 ? (
            <img src={img.url} width="100%" />
          ) : (
            <React.Fragment>
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
            </React.Fragment>
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
