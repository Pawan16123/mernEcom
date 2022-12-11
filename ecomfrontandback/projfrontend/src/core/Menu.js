import React from 'react'
import {NavLink, useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticatedFrontEnd, signout } from '../auth/helper/Index'

function Menu() {
    const currentTab = (location, path)=>{
        if(location.pathname === path){
            return {color: 'black'}
        }
        return {color: "rgb(182 171 171)"}
    }
    let location = useLocation();
    let navigate = useNavigate();
    // let params = useParams();
    // console.log('Location: ',location, 'Navigate: ', navigate,'Params: ', params);
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">    
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <NavLink style={currentTab(location,'/')} className="nav-link" to="/">Home <span className="sr-only"></span></NavLink>
            </li>
            <li className="nav-item">
                <NavLink style={currentTab(location,'/cart')} className="nav-link" to="/cart">Cart</NavLink>
            </li>
            {isAuthenticatedFrontEnd()?.user?.role === 0 && <li className="nav-item">
                <NavLink style={currentTab(location,'/user/dashboard')} className="nav-link" to="/user/dashboard">Dashboard</NavLink>
            </li>}
            {isAuthenticatedFrontEnd()?.user?.role === 1 && <li className="nav-item">
                <NavLink style={currentTab(location,'/admin/dashboard')} className="nav-link" to="/admin/dashboard">Admin Dashboard</NavLink>
            </li>}
            {!isAuthenticatedFrontEnd() && <>
                <li className="nav-item">
                    <NavLink style={currentTab(location,'/signup')} className="nav-link" to="/signup">SignUp</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink style={currentTab(location,'/signin')} className="nav-link" to="/signin">SignIn</NavLink>
                </li>
            </>}
            {isAuthenticatedFrontEnd() && <li className="nav-item">
                <span style={currentTab(location,'/signout')} onClick={
                   () => {
                        navigate('/');
                        signout(()=>{
                            // console.log('USER SIGNED OUT SUCCESSFULLY');
                            
                        })
                    }
                } className="nav-link text-danger">SignOut</span>
            </li>}
            </ul>
        </div>
        </nav>
    </>
  )
}

export default Menu;