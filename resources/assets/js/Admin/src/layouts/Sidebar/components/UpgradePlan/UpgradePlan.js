import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/styles'
import {Typography, Button, colors} from '@material-ui/core'
import {connect} from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: colors.grey[50],
    textAlign: 'center'
  },
  media: {
    paddingTop: theme.spacing(2),
    height: 80,
    textAlign: 'center',
    '& > img': {
      height: '100%',
      width: 'auto'
    }
  },
  content: {
    padding: theme.spacing(1, 2)
  },
  actions: {
    padding: theme.spacing(1, 2),
    display: 'flex',
    justifyContent: 'center'
  }
}))

const UpgradePlanComponent = props => {
  const {packagePrice, packageName, className} = props
  const classes = useStyles()

  return (
    <>
      <div className={clsx(classes.root, className)}>
        {typeof packagePrice === 'undefined' ? (
          <CircularProgress />
        ) : (
          <>
            <div className={classes.content}>
              <Typography align="center" gutterBottom variant="h6">
                {packageName} {packagePrice}
              </Typography>
              {packagePrice === 0 && (
                <>
                  <Typography align="center" gutterBottom variant="h6">
                    Upgrade to PRO
                  </Typography>
                  <Typography align="center" variant="body2">
                    Upgrade to Devias Kit PRO and get even more components
                  </Typography>
                </>
              )}
            </div>
            {packagePrice === 0 && (
              <>
                <div className={classes.actions}>
                  <Button
                    color="primary"
                    component="a"
                    href="/pricing"
                    variant="contained"
                  >
                    Upgrade
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

UpgradePlanComponent.propTypes = {
  className: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  return {
    packagePrice: state.profileReducer.packagePrice,
    packageName: state.profileReducer.packageName
  }
}

const UpgradePlan = connect(mapStateToProps, null)(UpgradePlanComponent)

export default UpgradePlan
