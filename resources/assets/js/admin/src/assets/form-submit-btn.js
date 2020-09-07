import React from 'react'
import AddIcon from '@material-ui/icons/Add'

const FormSubmitBtn = ({children, onClick}) => {
  return (
    <div className="grid-margin">
      <div className="card">
        <div className="card-body">
          <div className="row display-3">
            <button
              type="button"
              className="btn btn-success font-weight-bold mx-auto mt-4"
              onClick={onClick}
            >
              <span className="badge">
                <AddIcon/>
              </span>
              <span>{children}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormSubmitBtn
