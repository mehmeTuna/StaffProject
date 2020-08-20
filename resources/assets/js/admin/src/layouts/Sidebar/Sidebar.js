import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/styles'
import {Divider, Drawer} from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import ImageIcon from '@material-ui/icons/Image'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import SettingsIcon from '@material-ui/icons/Settings'
import LockOpenIcon from '@material-ui/icons/LockOpen'

import {Profile, SidebarNav, UpgradePlan} from './components'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}))

const SidebarComponent = props => {
  const {username, open, variant, onClose, className} = props

  const classes = useStyles()

  const pages = [
    {
      title: 'AnaSayfa',
      href: `/${username}`,
      icon: <DashboardIcon />
    },
    {
      title: 'Staff List',
      href: `/${username}/staff/list`,
      icon: <PeopleIcon />
    },
    {
      title: 'Staff Create',
      href: `/${username}/staff/create`,
      icon: <ShoppingBasketIcon />
    },
    {
      title: 'Experience Create',
      href: `/${username}/experience/create`,
      icon: <LockOpenIcon />
    },
    {
      title: 'Experience List',
      href: `/${username}/experience/list`,
      icon: <TextFieldsIcon />
    },
    {
      title: 'Kiosk Create',
      href: `/${username}/kiosk/create`,
      icon: <ImageIcon />
    },
    {
      title: 'Kiosk List',
      href: `/${username}/kiosk/list`,
      icon: <AccountBoxIcon />
    },
    {
      title: 'Account',
      href: `/${username}/profile`,
      icon: <SettingsIcon />
    }
  ]

  return (
    <Drawer
      anchor="left"
      classes={{paper: classes.drawer}}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
        <UpgradePlan />
      </div>
    </Drawer>
  )
}

SidebarComponent.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.profileReducer.username
  }
}

const Sidebar = connect(mapStateToProps, null)(SidebarComponent)

export default Sidebar
