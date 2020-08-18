import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/styles'
import {Avatar, Typography} from '@material-ui/core'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}))

const ProfileComponent = props => {
  const {username, businessName, profileImg, className} = props
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={profileImg.url}
        to={`/${username}/profile`}
      />
      <Typography className={classes.name} variant="h4">
        {businessName}
      </Typography>
      <Typography variant="body2">{username}</Typography>
    </div>
  )
}

ProfileComponent.propTypes = {
  className: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.profileReducer.username,
    businessName: state.profileReducer.businessName,
    profileImg: state.profileReducer.profileImg
  }
}

const Profile = connect(mapStateToProps, null)(ProfileComponent)

export default Profile
