import React from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import { isAuthenticatedFrontEnd } from '../auth/helper/Index'

const Admindashboard = ()=> {
    const {user:{firstName,lastName, email}} = isAuthenticatedFrontEnd();

    const adminMenu = ()=>{

        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Menu</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to='/admin/create/category' className='nav-link text-info' >Create Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/admin/getAllCategory' className='nav-link text-info' >Manage Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/admin/create/product' className='nav-link text-info' >Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/admin/getAllProducts' className='nav-link text-info' >Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/admin/orders' className='nav-link text-info' >Manage Order</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const adminContent = ()=>{
        return(
            <>
                <div className="card mb-4">
                    <h4 className="card-header bg-dark text-white">Admin Information</h4>
                    <ul className="list-group">
                        <li className="list-group-item"><span className="badge text-bg-success me-2">Name:</span>{`${firstName} ${lastName}`}</li>
                        <li className="list-group-item"><span className="badge text-bg-success me-2">Email:</span>{email}</li>
                    </ul>
                </div>
                
            </>
        )
    }
  return (

    <Base
        title='Admin Dashboard'
        description='Manage all your products here'
        className='container bg-success p-3'
    >
        <div className="row">
            <div className="col-3">
                {adminMenu()}
            </div>
            <div className="col-9">
                {adminContent()}
            </div>
        </div>
    </Base>
  )
}

export default Admindashboard