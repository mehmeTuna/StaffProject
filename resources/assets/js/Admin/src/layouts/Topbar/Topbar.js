import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/styles'
import {AppBar, Toolbar, Badge, Hidden, IconButton} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import InputIcon from '@material-ui/icons/Input'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}))

const Topbar = props => {
  const {className, onSidebarOpen, ...rest} = props

  const classes = useStyles()

  const [notifications] = useState([])

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <Link to="/">SCI</Link>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <a href="/business/logout">
            <IconButton color="inherit">
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <ExitToAppIcon />
              </Badge>
            </IconButton>
          </a>
          <IconButton className={classes.signOutButton} color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <Link to="">
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          </Link>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
}

export default Topbar
