import React from 'react'
import ReactDOM from 'react-dom'
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Header from './components/Header'
import HeroProfile from './components/HeroProfile'
import BillingData from './components/BillingData'
import Paper from '@material-ui/core/Paper'
require('./../../bootstrap')

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  heroProfile: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2)
  }
}))

const App = () => {
  const classes = useStyles()

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <CssBaseline />
      <Header />
      <CssBaseline />
      <Container className={classes.container} maxWidth="sm">
        <BillingData />
        <HeroProfile className={classes.heroProfile} />
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Working Plan" />
            <Tab label="Payment History" />
            <Tab label="Log History" />
          </Tabs>
        </Paper>
      </Container>
    </>
  )
}
if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'))
}
