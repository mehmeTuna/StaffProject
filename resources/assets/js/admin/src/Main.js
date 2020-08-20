import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {makeStyles, useTheme} from '@material-ui/styles'
import {useMediaQuery} from '@material-ui/core'

import {Sidebar, Topbar, Footer} from './layouts'
import {getBusinessProfileData} from '../redux/actions/ProfileActions'
import {connect} from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    flexWrap: 'wrap',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    height: 'calc(100vh - 90px)',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 100px)'
    }
  }
}))

const MainComponent = props => {
  const {getBusinessProfileData, username, children} = props

  const classes = useStyles()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  })

  const [openSidebar, setOpenSidebar] = useState(false)

  const handleSidebarOpen = () => {
    setOpenSidebar(true)
  }

  const handleSidebarClose = () => {
    setOpenSidebar(false)
  }

  useEffect(() => {
    getBusinessProfileData()
  }, [])

  const shouldOpenSidebar = isDesktop ? true : openSidebar

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        {children}
        {/* <Footer /> */}
      </main>
    </div>
  )
}

MainComponent.propTypes = {
  children: PropTypes.node
}

const mapStateProps = (state, ownProps) => {
  return {
    username: state.profileReducer.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBusinessProfileData: () => {
      dispatch(getBusinessProfileData())
    }
  }
}

const Main = connect(mapStateProps, mapDispatchToProps)(MainComponent)

export default Main
