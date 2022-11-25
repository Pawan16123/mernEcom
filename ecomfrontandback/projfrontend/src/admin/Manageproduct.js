import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticatedFrontEnd } from '../auth/helper/Index';
import Base from '../core/Base';
import BackBtn from '../core/helper/BackBtn';
import { deleteProduct } from './helper/AdminApicall';
import { getAllProducts } from '../core/helper/CoreApiCalls';

const Manageproduct = () => {
    const [products, setProduct] = useState([{name:'hideitpro'}]);
    const {user, token} = isAuthenticatedFrontEnd();
    const preLoad = () =>{
        // console.log('PRELAOD CALLED');
        getAllProducts().then(res=>{
            if(res.error){
                console.log('Error found product',res.error);
            }else{
                // console.log(res);
                setProduct(res.products);
            }
        })
    }
    const deleteProductonClick = (productid)=>{
        console.log(productid);
        deleteProduct(user._id, productid, token)
        .then(res=>{
            if(res.error){
                console.log('Unable to delete the product',res.error);
            }else{
                console.log(res.message,res.deletedProduct);
                preLoad();
            }
        })
    }
    useEffect(()=>{
        preLoad();
    },[])
  return (
    
    <Base 
    title="Welcome admin" 
    description="Manage products"
    >
    {/* <h2 className="mb-4">All products:</h2> */}
    <div className="row">
      <div className="col-12">
        <h2 className="text-center text-white my-3">Total {products.length} products</h2>

        {products.map((product, index) => {
          return (
            <div key={index} className="row text-center mb-2 ">
              <div className="col-4  ps-5">
                <h3 className="text-white text-start">{product.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${product._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    deleteProductonClick(product._id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <div className="alignBackButton text-start ps-4 mt-3">
        <BackBtn/>
    </div>
  </Base>
  )
}

export default Manageproduct;