import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './core/Home';
import Base from './core/Base';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Userdashboard from './user/Userdashboard';
import Admindashboard from './user/Admindashboard';
import AdminRoute from './auth/Adminroute';
import PrivateRoute from './auth/Privateroute';
import Addcategory from './admin/Addcategory';
import ManageCategory from './admin/ManageCategory';
import ManageProduct from './admin/Manageproduct';
import AddProduct from './admin/Addproduct';
import Updateproducts from './admin/Updateproducts';
import Cart from './core/Cart';

const Newroutes = ()=>{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/signup' element={<Signup/>} />
                    <Route path='/signin' element={<Signin/>} />
                    <Route path='/signout' element={<Home/>} />
                    {/* <AdminRoute path='/user/dashboard' element={<Userdashboard/>}/>
                    <PrivateRoute path='/admin/dashboard' element={<Admindashboard/>}/> */}
                    <Route path='/admin/dashboard' element={
                        <AdminRoute>
                            <Admindashboard/>
                        </AdminRoute>
                    }/>
                    <Route path='/user/dashboard' element={
                        <PrivateRoute>
                            <Userdashboard/>
                        </PrivateRoute>
                    }/>
                    <Route path='/cart' element={
                        <PrivateRoute>
                            <Cart/>
                        </PrivateRoute>
                    }/>
                    <Route path='/admin/create/category' element={
                        <AdminRoute>
                            <Addcategory />
                        </AdminRoute>
                    }/>
                    <Route path='/admin/getAllCategory' element={
                        <AdminRoute>
                            <ManageCategory/>
                        </AdminRoute>
                    }/>
                    <Route path='/admin/create/product' element={
                        <AdminRoute>
                            <AddProduct/>
                        </AdminRoute>
                    }/>
                    <Route path='/admin/getAllProducts' element={
                        <AdminRoute>
                            <ManageProduct/>
                        </AdminRoute>
                    }/>
                    <Route path='/admin/product/update/:productid' element={
                        <AdminRoute>
                            <Updateproducts/>
                        </AdminRoute>
                    }/>
                    {/* <Route path='/admin/dashboard' element={<Admindashboard/>}/> */}
                </Routes>
            </BrowserRouter>
        </>
    )
} 

export default Newroutes;