import React from 'react'
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getAllProducts } from '../core/helper/CoreApiCalls';
import {API} from '../backendApi.js';
import Base from './Base.js';
import Card from './Card.jsx';
import { loadCartProducts } from './helper/cardHelper';
import BackBtn from './helper/BackBtn';
import StripeCheckout from './StripeCheckout';


const Cart = ()=>{
  const [allProducts, setAllProducts] = useState([]);
  const [remount, setRemount] = useState(false);
  useEffect(()=>{
    setAllProducts(loadCartProducts());
  },[remount]);

  const loadAllProducts = ()=>{
    return(
        <>
            {allProducts[0] && allProducts.map((product,index) => {
            return (
              <div key={index} className="col-12">
                <Card product={product} addRemove={false} remount = {remount} setRemount={setRemount} cartOrCard={false}/>
              </div>
            )
        })}
        </>
    )
  }

  return (
    <Base title='Cart' description='Proceed to checkout'>
      <div className="row text-center">
        <div className="col-xs-12 col-lg-6">
            {loadAllProducts()}
        </div>
        <div className="col-xs-12 col-lg-6">
            {StripeCheckout(allProducts, remount, setRemount)}
        </div>
      </div>
      <BackBtn path={'/'} />
    </Base>
  )
}

export default Cart;