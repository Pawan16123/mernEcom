import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper/Index';
import Base from '../core/Base';
import { resetStates } from '../core/helper/Helper';

function Signup() {
    const [values, setValue] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        error: '',
        success: false

    })
    const {firstName, lastName, email, password, error, success} = values;
    const handleChange = name => event => {
        setValue({...values, ...{[name]: event.target.value}});
    }
    const onsubmit = event =>{
        event.preventDefault();
        setValue({...values, error: false});
        signup({firstName, lastName, email, password})
        .then(data=>{
            if(data.error){
                setValue({...values, error: data.error, success:false});
            }else{
                setValue({...values, ...resetStates(values),success:true});
                // setValue({
                //     ...values,
                //     firstName: '',
                //     lastName: '',
                //     email: '',
                //     password:'',
                //     error: '',
                //     success: true
                // })
            }
        }) 
        .catch(err=>{
            console.log("error in frontEnd signUp: ", err)
        })
    }
    const successMessage = ()=>{
        return (
            <div className="alert alert-success mt-4 w-25 p-2" style={{display: success ? 'inline-block' : 'none' }}>
                Login to your account <Link to='/signin'>Sign In</Link>
            </div>
        )
    }
    const failMsg = ()=>{
        return (
            <div className="alert alert-danger mt-4 w-25 p-2" style={{display: error ? 'inline-block' : 'none' }}>
                Unable to sign up as {error}
            </div>
        )
    }
    const signupform = ()=>{
        return(
            <div className="signup-form">
            <form>
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input value={firstName} onChange={handleChange("firstName")} type="text" className="form-control" id="firstname" aria-describedby="first name" placeholder="First Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input value={lastName} onChange={handleChange("lastName")} type="text" className="form-control" id="lastName" aria-describedby="last name" placeholder="Last Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input value={email} onChange={handleChange("email")} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input value={password} onChange={handleChange("password")} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button onClick={onsubmit} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        )
    }
  return (
    <>
        <Base title='Sign UP Page' description='Please enter all required details to sign up'>
            {signupform()}
            <div className="signup-status">
                {successMessage()}
                {failMsg()}
            </div>
        </Base>
            {/* <p>{JSON.stringify(values)}</p> */}
    </>
  )
}

export default Signup;