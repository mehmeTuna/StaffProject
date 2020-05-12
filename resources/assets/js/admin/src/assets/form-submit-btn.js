import React from 'react'

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
                <i className="icon-circle-plus" />
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
