import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { isAuthenticatedFrontEnd } from '../auth/helper/Index';
import StripeGateway from 'react-stripe-checkout';
import { emptyCart, loadCartProducts } from './helper/cardHelper';
import { API, STRIPE_PK } from '../backendApi';

function StripeCheckout(allProducts, remount, setRemount) {
    const [totalPrice, setTotalPrice] = useState('');
    const {user:{_id:userid}, token} = isAuthenticatedFrontEnd();
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })

    useEffect(()=>{
        const total = allProducts.reduce((accumulator, current)=>{
            return accumulator + current?.price;
        }, 0);
        // console.log(total, 'this is the total', allProducts);
        setTotalPrice(total);
    });
    
    const makePayment = token => {
        console.log('Payment is in progress;letsbeign');
        const body = {
            token,
            products: allProducts
        }
        const headers = {
            "Content-Type": "application/json"
        }
        emptyCart(()=>{
            console.log('cart is empty now lets reload')
        });
        setRemount(!remount);
        return fetch(`/payment/stripe`,{
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }).then((res)=>{
            console.log('Payment is in progress;')
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    const payWithStripe = ()=>{
        return isAuthenticatedFrontEnd() ? (
            <StripeGateway token={makePayment} stripeKey={STRIPE_PK} amount={totalPrice*100} name={'Buy Products'} shippingAddress billingAddress>
                <button className="btn btn-success">Pay with Stripe</button>
            </StripeGateway>
        ):(
            <Link className='btn btn-info' to = '/signin'>Sign In</Link>
        )
    }
  return (
    <>
        <h1>StripeCheckout value</h1>
        {totalPrice ? 
        <p className='lead fs-4 fw-bold text-success' >Price: ${totalPrice}</p> :
        <p className='lead fs-4 fw-bold text-danger' >Cart is empty</p> 
        }
        {payWithStripe()}
    </>
  )
}

export default StripeCheckout