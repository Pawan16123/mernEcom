import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { authenticate, isAuthenticatedFrontEnd, signinfetch, signout } from '../auth/helper/Index';
import Base from '../core/Base'
import { resetStates } from '../core/helper/Helper';


function Signin() {
    // nwus@gmail.com
    const [values, setValue] = useState({
        email:'adminHssere@gmail.scom',
        password:'password',
        error:'',
        success: false,
        loading:false,
        didRedirect: false
    });
    const [callAfterSubmit, setCallAfterSubmit] = useState(false);
    const [user, setUser] = useState();
    const {email, password, error,success, loading, didRedirect} = values;
    const handleChange = key => event => {setValue({...values, [key]:event.target.value})};

    const onsubmit = (event)=>{
        event.preventDefault();
        setValue({...values, error: false, loading:true});
        signinfetch({email, password})
        .then(res=>{
            if(res.error){
                setValue({...values, error: res.error, success:false});
            }else{
                authenticate(res,()=>{
                    setValue({...values, ...resetStates(values), error:false, success:true, didRedirect:true});
                })
                // console.log('My token: ',isAuthenticatedFrontEnd());
            }
            let data = isAuthenticatedFrontEnd();
            setUser(data.user);
        })
        .catch(err=>{
            console.log('FrontEnd signIn error:', err);
        })
        setCallAfterSubmit(true);
    }
    const successMessage = ()=>{
        return (
            <div className="alert alert-success mt-4 w-25 p-2" style={{display: success ? 'inline-block' : 'none' }}>
                Successfully logged in to your account
            </div>
        )
    }
    const redirectTo = ()=>{
        if(didRedirect){
            if(user?.role === 0){
                return<Navigate to='/user/dashboard' />
            }else{
                return <Navigate to='/admin/dashboard' />
            }
        }
        if(isAuthenticatedFrontEnd()){
            return <Navigate to='/'/>
        }

    }
    const failMsg = ()=>{
        return (
            <div className="alert alert-danger mt-4 w-25 p-2" style={{display: error ? 'inline-block' : 'none' }}>
                Unable to sign up as {error}
            </div>
        )
    }
    const signin = ()=>{
        return (
            <div className="signin-form">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input value = {email} onChange={handleChange("email")} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input value = {password} onChange={handleChange("password")} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button onClick={onsubmit} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
    return (
        <Base title='Sign In Page' description='Please enter your email id and password to sign in'>
        <div className="signin-status">
            {successMessage()}
            {failMsg()}
            {callAfterSubmit && redirectTo()}
        </div>
        {signin()}
        </Base>
    )
}

export default Signin;