import React, {forwardRef, useState} from 'react'
import {NavLink as RouterLink} from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {makeStyles, useTheme} from '@material-ui/styles'
import {List, ListItem, Button, colors} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}))

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{flexGrow: 1}}>
    <RouterLink {...props} />
  </div>
))

const SidebarNav = props => {
  const {pages, className, ...rest} = props

  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const logout = () => {
    window.location.href = '/business/logout'
  }

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {pages.map(page => (
        <ListItem className={classes.item} disableGutters key={page.title}>
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
      {matches && (
        <ListItem
          className={classes.item}
          disableGutters
          key="logout"
          onClick={logout}
        >
          <Button className={classes.button}>
            <div className={classes.icon}>
              <ExitToAppIcon />
            </div>
            Logout
          </Button>
        </ListItem>
      )}
    </List>
  )
}

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
}

export default SidebarNav
