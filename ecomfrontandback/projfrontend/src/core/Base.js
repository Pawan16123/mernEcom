import React from 'react'
import Menu from './Menu';

function Base({
  title= 'My Title',
  description = 'My Description',
  className='bg-dark text-white p-4 text-center',
  style,
  children
}) {
  return (
      <>
        <Menu />
        <div className="container-fluid main-content">
          <div className="jumbotron bg-dark text-white text-center">
            <div className="display-5">{title}</div>
            <div className="lead">{description}</div>
          </div>
          <div style={style} className={className}>{children}</div>
        </div>
        <footer className="footer bg-dark mt-auto py-3 text-center">
            <div className="container-fluid">
              <h4>Got Question, Feel free to ask.</h4>
              <button className="btn btn-warning btn-lg">
                Contact Us
              </button>
            </div>
            <div className="container text-start">
              <span className="text-muted">
                Amazing <span className="text-white">Tshirt</span> at lowest price
              </span>
            </div>
        </footer>
      </>

    )
}

export default Base;