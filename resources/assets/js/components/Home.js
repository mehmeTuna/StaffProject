import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {trTR} from '@material-ui/core/locale'

import Header from './Header'
import Content from './Content'

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#75B72B'
      }
    }
  },
  trTR
)

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Switch>
        <Route path="/Staff-List" component={Content} />
        <Route path="/" component={Content} />
      </Switch>
    </ThemeProvider>
  )
}

export default Home
