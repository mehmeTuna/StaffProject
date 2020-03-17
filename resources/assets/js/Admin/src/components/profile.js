import React from 'react'

import {
  ButtonBase,
  Typography,
  Paper,
  Grid,
  IconButton,
  Box
} from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import UpdatePhotoModal from './udpatePhotoModal'
import UpdateOtherDataModal from './updateOtherDataModal'

const ProfileRow = withStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f4f7fa'
    }
  }
}))(Grid)

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2)
  },
  BoxTitle: {
    marginBottom: theme.spacing(2)
  },
  image: {
    width: 100,
    height: 100
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
}))

const Profile = props => {
  const classes = useStyles()

  const [updateType, setUpdateType] = React.useState('')

  const updateData = e => {
    setUpdateType(e.type)
  }

  return (
    <React.Fragment>
      {updateType === 'photo' && (
        <UpdatePhotoModal updateTypeState={setUpdateType} />
      )}
      {updateType.length !== 0 && updateType !== 'photo' && (
        <UpdateOtherDataModal
          updateTypeState={setUpdateType}
          updateType={updateType}
        />
      )}
      <div className={classes.root}>
        <Grid container spacing={3} direction="column" justify="space-between">
          <Box>
            <Typography align="center" variant="h5">
              Business Data
            </Typography>
            <Typography align="center" variant="h6">
              basic information you use in our services
            </Typography>
          </Box>
          <Grid item className={classes.root}>
            <Paper className={classes.paper}>
              <Typography
                align="left"
                variant="h6"
                className={classes.BoxTitle}
              >
                Profile
              </Typography>
              <Grid container item container direction="column">
                <ProfileRow
                  onClick={() => updateData({ type: 'photo' })}
                  container
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="body1">Photo</Typography>
                  </Grid>
                  <Grid item lg={8}>
                    <Typography variant="body1">
                      helps to personalize your photo account
                    </Typography>
                  </Grid>
                  <Grid item>
                    {props.businessData.img === null ? (
                      <IconButton aria-label="Name">
                        <KeyboardArrowRightIcon />
                      </IconButton>
                    ) : (
                      <img
                        className={classes.image}
                        alt="complex"
                        src={props.businessData.img}
                      />
                    )}
                  </Grid>
                </ProfileRow>
                <ProfileRow
                  container
                  justify="space-between"
                  alignItems="center"
                  onClick={() => updateData({ type: 'name' })}
                >
                  <Grid item>
                    <Typography variant="body1">Name</Typography>
                  </Grid>
                  <Grid item lg={8}>
                    <Typography variant="body1" align="left">
                      {props.businessData.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="Name">
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Grid>
                </ProfileRow>
                <ProfileRow
                  container
                  justify="space-between"
                  alignItems="center"
                  onClick={() => updateData({ type: 'password' })}
                >
                  <Grid item>
                    <Typography variant="body1">Password</Typography>
                  </Grid>
                  <Grid item lg={8}>
                    <Typography variant="body1" align="left">
                      ********
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="Password">
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Grid>
                </ProfileRow>
                <ProfileRow
                  container
                  justify="space-between"
                  alignItems="center"
                  onClick={() => updateData({ type: 'address' })}
                >
                  <Grid item>
                    <Typography variant="body1">Address</Typography>
                  </Grid>
                  <Grid item lg={8}>
                    <Typography variant="body1" align="left">
                      {props.businessData.address}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="Address">
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Grid>
                </ProfileRow>
              </Grid>
            </Paper>
          </Grid>
          <Grid item className={classes.root}>
            <Paper className={classes.paper}>
              <Typography
                align="left"
                variant="h6"
                className={classes.BoxTitle}
              >
                Contact information
              </Typography>
              <Grid container item container direction="column">
                <ProfileRow
                  container
                  justify="space-between"
                  alignItems="center"
                  onClick={() => updateData({ type: 'email' })}
                >
                  <Grid item>
                    <Typography variant="body1">Email</Typography>
                  </Grid>
                  <Grid item lg={8}>
                    <Typography variant="body1" align="left">
                      {props.businessData.email}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="Email">
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Grid>
                </ProfileRow>
                <ProfileRow
                  container
                  justify="space-between"
                  alignItems="center"
                  onClick={() => updateData({ type: 'webPage' })}
                >
                  <Grid item>
                    <Typography variant="body1">Web Page</Typography>
                  </Grid>
                  <Grid item lg={8}>
                    <Typography variant="body1" align="left">
                      {props.businessData.webPage}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="Web Page">
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Grid>
                </ProfileRow>
                <ProfileRow
                  container
                  justify="space-between"
                  alignItems="center"
                  onClick={() => updateData({ type: 'phone' })}
                >
                  <Grid item>
                    <Typography variant="body1">Phone</Typography>
                  </Grid>
                  <Grid item lg={8}>
                    <Typography variant="body1" align="left">
                      {props.businessData.phone}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="Phone">
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Grid>
                </ProfileRow>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )
}

export default Profile
