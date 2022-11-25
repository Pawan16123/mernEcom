import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../core/helper/CoreApiCalls';
import {API} from '../backendApi.js';
import Base from './Base.js';
import Card from './Card.jsx';

const Home = ()=>{
  const [allProducts, setAllProducts] = useState([]);
  console.count('rerender', allProducts, allProducts[0]);
  useEffect(()=>{
    getAllProducts()
    .then(products=>{
      if(products.error){
        console.log('Unable to get the products');
      }else{
        setAllProducts(products.products);
        console.log('got all the products', products);
      }
    })
  },[])
  return (
    <Base title='Home Page' description='Welcome to Ecom'>
      <div className="row">
        {allProducts[0] && allProducts.map((product,index) => {
            return (
              <div className="col-4">
                <Card key={index} product={product}/>
              </div>
            )
        })}
      </div>
    </Base>
  )
}

export default Home;