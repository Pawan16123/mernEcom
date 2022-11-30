import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticatedFrontEnd } from '../auth/helper/Index'
import Base from '../core/Base'
import BackBtn from '../core/helper/BackBtn'
import { createProductFront, getAllProducts, getCategories } from './helper/AdminApicall'

const AddProduct = () => {
  const {user, token} = isAuthenticatedFrontEnd();
  const [values, setValues] = useState({
    photo: '',
    name: '',
    description:'',
    price: '',
    stock:'',
    photo:'',
    categories:[],
    category:'',
    loading: false,
    error:'',
    createdProduct:'',
    getRedirected: false,
    formData:''
  })
  const getAllCategories = ()=>{
    getCategories()
    .then(res => {
      // console.log(res);
      if(res.error){
        setValues({...values, error: res.error})
      } else{
        setValues({...values, categories: res, formData: new FormData()})
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getAllCategories();
  },[])
  const {name, description, price, stock, categories, category, loading, error, createdProduct, getRedirected, formData } = values;
  let navigate = useNavigate();
  useEffect(()=>{
    if(getRedirected){
      setTimeout(()=>{
        navigate(-1);
      },2000)
    }
  },[getRedirected])
  const handleChange = field => event =>{
    const value = field  === "photo" ? event.target.files[0] : event.target.value;
    formData.append(field, value);
    // for (var pair of formData.entries()) {
    //   console.log('Data to be storedd: ', pair[0], pair[1]); 
    // }
    // console.log('THEESE are fomr datas: ',formData)
    setValues({...values, [field]:value});
  }
  const onSubmit = (event)=>{
    event.preventDefault();
    setValues({...values, error:"", loading: true});
    console.log('Data sending to the form'. formData)
    createProductFront(user._id, token, formData)
    .then(data=>{
      if(data.error){
        setValues({...values, error:data.error, loading: false});
      }else{
        setValues({
          ...values,
          name: '',
          description:'',
          price: '',
          photo: '',
          stock: '',
          loading: false,
          createdProduct: data.name,
          error:'',
          getRedirected: true
        })
      }
    
    })
  }
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group mb-3">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mb-3">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mb-3">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select Category</option>
          {categories && 
            categories.map(option=> <option key={option._id} value={option._id}>{option.name}</option>)
          }
        </select>
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>
      
      <button type="submit" onClick={onSubmit} className="btn btn-outline-success">
        Create Product
      </button>
    </form>
  );
  const successMsg = ()=>{
    return (
        <h5 className="text-success mt-4 w-50" style={{display: createdProduct ? 'inline-block' : 'none' }}>
          {createdProduct} created successfully
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
  
  return (
    <Base
        title='Add Products'
        description='Lets Add new Products to the store'
        className='container bg-primary p-4 w-lg-50 w-xs-80 baseCustombg'
    >
      <div className="success-fail-status">
        {successMsg()}
        {failMsg()}
      </div>
      {createProductForm()}
      <BackBtn/>    
    </Base>
  )
}

export default AddProduct