import React from 'react'

const PageTitle = ({ children }) => {
  return (
    <div className="col-sm-12 col-md-12 grid-margin stretch-card m-2">
      <div className="card">
        <div className="card-body">
          <h4 className="text-center display-4 ml-4">{children}</h4>
        </div>
      </div>
    </div>
  )
}

export default PageTitle
