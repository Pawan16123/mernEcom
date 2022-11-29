import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { isAuthenticatedFrontEnd } from '../auth/helper/Index'
import Base from '../core/Base'
import BackBtn from '../core/helper/BackBtn'
import { createProductFront, getAllProducts, getCategories, getProduct, updateProduct } from './helper/AdminApicall'

const Updateproducts = () => {
    const {productid} =  useParams();
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
    const getAllProducts = ()=>{   
        getProduct(productid)
        .then(res => {
            if(res.error){
                console.log(res.error);
            }else{
                // console.log(res, res.category)
                const {name, description, price, sold} = res;
                setValues({
                    ...values,
                    name,
                    description,
                    price,
                    stock:23,
                    category:res.category._id,
                    formData: new FormData()
                });
            }
        })
    }

    

    const getAllCategories = ()=>{
        getCategories()
        .then(res => {
            console.log(res);
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
       getAllProducts();
    },[])

    // useEffect(()=>{
    //     console.log('herlper updated')
    //     getAllCategories();
    // },[values.helper])
    
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
        const value = field  === "photo" ? event.target?.files[0] : event.target.value;
        formData.append(field, value);
        setValues({...values, [field]:value});
    }
    const onSubmit = (event)=>{
        event.preventDefault();
        setValues({...values, error:"", loading: true});
        console.log('Data sending to the form', formData)
        updateProduct(user._id, productid, token, formData)
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
            onClick={getAllCategories} 
            >
            <option >Select Category</option>
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
            Update Product
        </button>
        </form>
    );
    const successMsg = ()=>{
        return (
            <h5 className="text-success mt-4 w-50" style={{display: createdProduct ? 'inline-block' : 'none' }}>
            {createdProduct} updated successfully
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
    // const preload = () => {
    //     Promise.all([getProduct(productId), getCategories()]).then(
    //       ([product, categories]) => {
    //         let error = product.error || categories.error;
    
    //         if (error) {
    //           setValues({ ...values, error: error });
    //         } else {
    //           setValues({
    //             ...values,
    //             name: product.name,
    //             description: product.description,
    //             price: product.price,
    //             stock: product.stock,
    //             categories: categories,
    //             formData: new FormData()
    //           });
    //         }
    //       }
    //     );
    //   };
    
    //   useEffect(() =&gt; {
    //     preload();
    //   }, []);
    
    return (
        <Base
            title='Add Products'
            description='Lets Add new Products to the store'
            className='container bg-primary p-4 baseCustombg'
        >
        <h3>ADD PRODUCT</h3>
        <div className="success-fail-status">
            {successMsg()}
            {failMsg()}
        </div>
        {createProductForm()}
        <BackBtn/>    
        </Base>
    )
}

export default Updateproducts;