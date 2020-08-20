import React from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import DetailsIcon from '@material-ui/icons/Details'

import theme from './../theme'
import StaffDetail from './staff-detail'
import Btn from '../assets/Button'
import StaffAvatar from '../assets/staff-avatar'

const Staff = props => {
  const {
    id,
    image,
    firstName,
    lastName,
    experience,
    email,
    gsm,
    online
  } = props.data

  const [showData, setShowData] = React.useState(false)
  const [showButton, setShowButton] = React.useState(false)
  const fullName = `${firstName} ${lastName}`

  return (
    <div className="col-lg-12 grid-margin stretch-card">
      <div
        style={{
          background: showButton ? theme.colors.bgGreen : '',
          cursor: 'pointer'
        }}
        className="card"
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
      >
        <div className="m-2">
          <div className="col-sm-12 mb-4 mb-xl-0 d-flex flex-sm-row flex-md-row flex-lg-row justify-content-between legend-label">
            <div className="d-flex flex-column flex-md-row flex-lg-row">
              <StaffAvatar img={image} name={fullName} online={online} />
              <div className="mt-2">
                <p className="font-weight-bold text-dark ml-2 mb-1">
                  {fullName}
                </p>
                <p className="font-weight-bold text-muted ml-2 mb-1">
                  {experience}
                </p>
                <p className="font-weight-bold text-muted ml-2 mb-1">{email}</p>
                <p className="font-weight-bold text-muted ml-2 mb-1">{gsm}</p>
              </div>
            </div>
            {showButton && (
              <div className="d-flex flex-column flex-sm-row justify-content-start align-items-center">
                <div>
                  <Btn
                    style={{background: theme.colors.primary}}
                    startIcon={<DetailsIcon />}
                    onClick={() => setShowData(true)}
                  >
                    Details
                  </Btn>
                </div>
                <div>
                  <Btn
                    style={{background: theme.colors.danger}}
                    startIcon={<DeleteIcon />}
                    onClick={() => props.delete({id: id, username: fullName})}
                  >
                    Delete
                  </Btn>
                </div>
              </div>
            )}
          </div>
          {showData === true && (
            <StaffDetail
              currencySymbolUtf8={props.currencySymbolUtf8}
              isOpen={showData}
              setOpen={setShowData}
              key={id}
              staff={props.data}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Staff
