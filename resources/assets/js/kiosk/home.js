import React, {useEffect, useState} from 'react'
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
  const [isLogin, setIsLogin] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [registerCode, setRegisterCode] = useState('')
  const [kioskData, setKioskData] = useState(localStorage.getItem('kioskId'))
  const [businessData, setBusinessData] = useState({})
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await Axios.post('/v1/kiosk/me', {
        webKiosk: kioskData
      })

      setIsLogin(data.data.isLogin)
      updateKioskId(data.data.kioskId)
      if (data.data.isLogin) {
        setQrCode(data.data.qrCode)
        setBusinessData(data.data.business)
      } else {
        setRegisterCode(data.data.code)
      }
      connectSocketListenEvent(data.data.kioskId)
    }

    fetchData()
  }, [])

  const connectSocketListenEvent = channel => {
    window.Echo.channel(channel).listen('.KioskEvent', e => {
      if (e.isLogin) {
        setIsLogin(true)
        setBusinessData(e.business)
        setQrCode(e.refreshQrCode)
      }
      if (!e.isLogin) {
        location.reload()
      }
    })
  }

  const updateKioskId = (id = '') => {
    setKioskData(id)
    localStorage.setItem('kioskId', id)
  }

  return (
    <>
      <div className="container">
        <div className="row flex-sm-column-reverse flex-md-row flex-lg-row align-items-center justify-content-between">
          {isLogin ? (
            <div className="col-md-6">
              <h2 className="heading mb-3">Hi, {businessData.username}</h2>
              <div className="sub-heading">
                <p className="mb-4"></p>
                <p className="mb-5"></p>
              </div>
            </div>
          ) : (
            <div className="col-md-6">
              {isDeleted ? (
                <h2 className="heading mb-3">Deleted Kiosk</h2>
              ) : (
                <h2 className="heading mb-3">Kiosk Define</h2>
              )}
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
          )}
          <div className="col-md-5 relative align-self-center">
            {isLogin ? (
              <QRCode value={qrCode} />
            ) : (
              <div className="bg-white rounded pb_form_v1">
                <h4 className="mb-4 mt-0 text-center">CODE</h4>
                <h2 className="mb-4 mt-0 text-center">{registerCode}</h2>
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
