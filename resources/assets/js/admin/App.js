import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './redux/store'
import {ThemeProvider} from '@material-ui/styles'
import theme from './theme'
import Routes from './Routes'

require('../bootstrap')

const App = function() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}
if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'))
}
