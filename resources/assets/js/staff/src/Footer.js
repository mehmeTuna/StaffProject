import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="d-sm-flex justify-content-center justify-content-sm-between">
        <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
          Copyright © 2019
          <a href="#" target="_blank" className="text-muted">
            Demo
          </a>
          . Version 0.1.
        </span>
        <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"></span>
      </div>
    </footer>
  )
}

export default Footer
