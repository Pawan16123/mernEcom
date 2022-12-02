import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API } from '../backendApi'
import Base from './Base'
import { addToCart, removeFromCart } from './helper/cardHelper';

function Card({product, addRemove = true, remount, setRemount, cartOrCard = true}) {
    // let imageUrl = product?._id ? `${API}/product/photo/${product._id}`: "https://c4.wallpaperflare.com/wallpaper/365/244/884/uchiha-itachi-naruto-shippuuden-anbu-silhouette-wallpaper-preview.jpg"
    const navigate = useNavigate();
    const [imgUrl, setImgUrl] = useState('');
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        fetch(`${API}/product/photo/${product._id}`)
        .then((el)=>{
            if(el.ok){
                setImgUrl(`${API}/product/photo/${product._id}`)
            }else{
                setImgUrl("https://c4.wallpaperflare.com/wallpaper/365/244/884/uchiha-itachi-naruto-shippuuden-anbu-silhouette-wallpaper-preview.jpg")
            }
        })
    },[])
    const redirectToCart = (redirect)=>{
        if(redirect) navigate('/cart');
    }
    const addProductToCart = (product) => {
        addToCart(product, ()=>{
            console.log(`${product.name} : added to cart`);
            setRedirect(true);
        })
    }
    const RemoveProductFromCart = (product) =>{
        removeFromCart(product,()=>{
            console.log(`I believe the product : ${product.name} is removed`, remount);
            setRemount(!remount);
        })
    }
    let addOrRemoveFromCart = ()=>{
        return(
                addRemove ? 
                <div className="row">
                    <div className="col-12">
                        <button onClick={()=>addProductToCart(product)} className='btn btn-block btn-outline-success mt-2 mb-2 w-100'>Add to cart</button>
                    </div>
                </div> :
                <div className="row">
                    <div className="col-12">
                        <button onClick={()=>RemoveProductFromCart(product)} className='btn btn-block btn-outline-danger mt-2 mb-2 w-100'>Remove from cart</button>
                    </div>
                </div>
        )
    }
    return(
        <>
        {cartOrCard ? <div className="card mb-2 text-white bg-dark border border-secondary">
                <div className="card-header bg-success lead">{product.name}</div>
                <div className="card-body">
                    <div className="rounded">
                        <img src={imgUrl} 
                        alt={`Product ${product._id}`} 
                        style={{maxHeight:'100%', maxWidth:'100%'}}
                        className="rounded"
                        />
                    </div>
                    <p className="lead font-weight-normal text-wrap">
                        {product.description}
                    </p>
                    <p className="btn btn-success rounded btn-sm px-4">${product.price}</p>
                    <div className="addremove-cart">
                    {addOrRemoveFromCart()}
                    {redirectToCart(redirect)}
                    </div>
                </div>
                </div> : <div className="card text-white text-start bg-dark border h-25 mb-2 border-secondary d-flex flex-lg-row flex-s=xm-column">
                <div className="card-header lead" style={{width:'200px'}}>{product.name}</div>
                <div className="card-body w-xs-100 w-lg-25 d-flex flex-row justify-content-between align-items-center">
                    <div className="">
                        <img src={imgUrl} 
                        alt={`Product ${product._id}`} 
                        style={{height:'60px', width:'100px'}}
                        className="rounded"
                        />
                    </div>
                    {/* <p className="bg-success font-weight-normal text-wrap text-start">
                        {product.description}
                    </p> */}
                    <p className="text-success rounded btn-sm px-4">${product.price}</p>
                    <div className="addremove-cart w-80 ">
                    {addOrRemoveFromCart()}
                    {redirectToCart(redirect)}
                    </div>
                </div>
            </div>  }
            
        </>
    )

}

export default Card