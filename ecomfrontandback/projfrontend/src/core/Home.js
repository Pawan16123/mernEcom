import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../core/helper/CoreApiCalls';
import {API} from '../backendApi.js';
import Base from './Base.js';
import Card from './Card.jsx';

const Home = ()=>{
  const [allProducts, setAllProducts] = useState([]);
  useEffect(()=>{
    getAllProducts()
    .then(products=>{
      if(products.error){
        console.log('Unable to get the products');
      }else{
        setAllProducts(products.products);
      }
    })
    .catch(error=>{
      console.log('Unable to get homepage data:', error);
    })
  },[])
  return (
    <Base title='Home Page' description='Welcome to Ecom'>
      <div className="row">
        {allProducts[0] && allProducts.map((product,index) => {
            return (
              <div key={index}  className="col-xs-12 col-lg-4">
                <Card product={product}/>
              </div>
            )
        })}
      </div>
    </Base>
  )
}

export default Home;