import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import Echo from 'laravel-echo'
import QRCode from 'react-qr-code'

require('./../bootstrap')

window.io = require('socket.io-client')

window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: window.location.hostname + ':' + window.laravel_echo_port
})

function Home() {
  const [isLogin, setIsLogin] = React.useState(false)
  const [code, setCode] = React.useState('')

  useEffect(() => {
    window.Echo.channel('create').listen('.KioskEvent', e => {
      setIsLogin(true)
      console.log(e)
    })
  }, [])

  return (
    <>
      <div className="container">
        <div className="row flex-sm-column-reverse flex-md-row flex-lg-row align-items-center justify-content-between">
          <div className="col-md-6">
            <h2 className="heading mb-3">Kiosk Define</h2>
            <div className="sub-heading">
              <p className="mb-4"></p>
              <p className="mb-5">
                <a
                  className="btn btn-success btn-lg pb_btn-pill smoothscroll"
                  href="#section-pricing"
                >
                  <span className="pb_font-14 text-uppercase pb_letter-spacing-1">
                    See Pricing
                  </span>
                </a>
              </p>
            </div>
          </div>

          <div className="col-md-5 relative align-self-center">
            {isLogin ? (
              <QRCode value="Hello, World! se se " />
            ) : (
              <div className="bg-white rounded pb_form_v1">
                <h4 className="mb-4 mt-0 text-center">CODE</h4>
                <h2 className="mb-4 mt-0 text-center">{code}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

if (document.getElementById('kiosk-app')) {
  ReactDOM.render(<Home />, document.getElementById('kiosk-app'))
}
