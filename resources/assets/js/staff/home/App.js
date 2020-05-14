import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
require('./../../bootstrap')

const App = () => {
  return (
    <>
      <Header />
    </>
  )
}
if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'))
}
