import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import Echo from 'laravel-echo'
import QRCode from 'react-qr-code'

require('./../bootstrap')

window.io = require('socket.io-client')

window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: window.location.hostname + ':' + window.laravel_echo_port
})

function Home() {
  const [kioskData, setKioskData] = useState(rootData)
  const [isLogin, setIsLogin] = useState(kioskData.isLogin)
  const [qrCode, setQrCode] = useState(kioskData.qrCode)
  const [businessData, setBusinessData] = useState(kioskData.business)


  useEffect(() => {
    connectSocketListenEvent(kioskData.roomId)
  }, [])

  const connectSocketListenEvent = channel => {
    window.Echo.channel(channel).listen('.KioskEvent', e => {
      if (e.isLogin) {
        setBusinessData(e.business)
        setQrCode(e.refreshQrCode)
        setIsLogin(e.isLogin)
      }
      if (!e.isLogin) {
        location.reload()
      }
    })
  }

  return (
    <>
      <div className="container">
        <div className="row flex-sm-column-reverse flex-md-row flex-lg-row align-items-center justify-content-between">
          {isLogin ? (
            <div className="col-md-6">
              <h2 className="heading mb-3">Hi, {businessData.businessName}</h2>
              <div className="sub-heading">
                <p className="mb-4"></p>
                <p className="mb-5"></p>
              </div>
            </div>
          ) : (
            <div className="col-md-6">
              <div className="sub-heading">
                <p className="mb-4">Kiosk Define</p>
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
          )}
          <div className="col-md-5 relative align-self-center">
            {isLogin ? (
              <QRCode value={qrCode} />
            ) : (
              <div className="bg-white rounded pb_form_v1">
                <h4 className="mb-4 mt-0 text-center">CODE</h4>
                <h2 className="mb-4 mt-0 text-center">{kioskData.code}</h2>
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
