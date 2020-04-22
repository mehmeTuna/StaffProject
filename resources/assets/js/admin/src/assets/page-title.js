import React from 'react'

const PageTitle = ({ children }) => {
  return (
    <div className="col-12 grid-margin">
      <p className="text-center display-4 p-4">{children}</p>
    </div>
  )
}

export default PageTitle
