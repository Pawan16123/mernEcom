import React, { useState } from 'react'
import Base from '../core/Base';
import { createCategoryReq } from './helper/AdminApicall';
import { isAuthenticatedFrontEnd } from '../auth/helper/Index';
import BackBtn from '../core/helper/BackBtn';

const Addcategory = () => {
    const [catName, setCatName] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    // const navigate = useNavigate();
    // const backBtn = () => {
    //     return(
    //         <button className='btn btn-sm btn-info mb-3 mt-3' onClick={()=>navigate(-1)} ><IoArrowBackCircleSharp/> Back </button>
    //     )
    // }
    const {user, token} = isAuthenticatedFrontEnd();
    const onSubmit = (event)=>{
        event.preventDefault();
        setSuccess(false);
        setError(false);
        createCategoryReq(user._id,token, {'name': catName })
        .then( res =>{
            if(res.error){
                setError(res.error);
                console.log('ERROR on submit category',res);
            }else{
                setSuccess(true);
                setCatName('');
                // console.log(res);
            }
        })
        .catch(err=>{
            console.log('FInal error',err);
        })
    }
    const successMsg = ()=>{
        return (
            <h5 className="text-success mt-4 w-50" style={{display: success ? 'inline-block' : 'none' }}>
                Category Created Successfully
            </h5>
        )
    }
    const failMsg = ()=>{
        return (
            <div className="text-danger mt-4 w-50" style={{display: error ? 'inline-block' : 'none' }}>
                {error}
            </div>
        )
    }
    const categoryForm = () => {
        return(
            <form action="">
                <div className="form-group">
                    <h2 className="">Enter the Category</h2>
                    <input type="text" 
                        className="form-control my-3" 
                        autoFocus
                        required
                        placeholder="Eg. Summer"
                        value={catName}
                        onChange={(e)=>setCatName(e.target.value)}
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info mb-3" >Create Category</button>
                </div>
            </form>
        )
    }
    return (
    <Base
    title='Create Category'
    description='Add new Category'
    className='container bg-infor p-4'
    >
        <div className="row bg-white rounded text-black">
            <div className="col-md-8 offset-md-2">
                <div>
                    <div className="category-status">
                        {successMsg()}
                        {failMsg()}
                    </div>
                    {categoryForm()}
                    {/* {backBtn()} */}
                    <BackBtn/>
                </div>
                
            </div>
        </div>
    </Base>
    )
}

export default Addcategory;