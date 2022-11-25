import React, { useEffect, useState } from 'react'
import { API } from '../backendApi'
import Base from './Base'

function Card({product, addRemove = true}) {
    // let imageUrl = product?._id ? `${API}/product/photo/${product._id}`: "https://c4.wallpaperflare.com/wallpaper/365/244/884/uchiha-itachi-naruto-shippuuden-anbu-silhouette-wallpaper-preview.jpg"
    const [imgUrl, setImgUrl] = useState('');
    useEffect(() => {
        fetch(`${API}/product/photo/${product._id}`)
        .then((el)=>{
            if(el.ok){
                setImgUrl(`${API}/product/photo/${product._id}`)
            }else{
                setImgUrl("https://c4.wallpaperflare.com/wallpaper/365/244/884/uchiha-itachi-naruto-shippuuden-anbu-silhouette-wallpaper-preview.jpg")
            }
            console.log(`${product._id}, ${el.status}`,el);
        })
    },[])

    let addOrRemoveFromCart = ()=>{
        return(
                addRemove ? 
                <div className="row">
                    <div className="col-12">
                        <button className='btn btn-block btn-outline-success mt-2 mb-2 w-100'>Add to cart</button>
                    </div>
                </div> :
                <div className="row">
                    <div className="col-12">
                        <button className='btn btn-block btn-outline-danger mt-2 mb-2 w-100'>Remove from cart</button>
                    </div>
                </div>
        )
    }
    return(
    <div className="card text-white bg-dark border border-info">
        <div className="card-header lead">{product.name}</div>
        <div className="card-body">
            <div className="rounded border border-success">
                <img src={imgUrl} 
                alt={`Product Image ${product._id}`} 
                style={{maxHeight:'100%', maxWidth:'100%'}}
                className="mb-3 rounded"
                />
            </div>
            <p className="lead bg-success font-weight-normal text-wrap">
                {product.description}
            </p>
            <p className="btn btn-success rounded btn-sm px-4">${product.price}</p>
            <div className="addremove-cart">
            {addOrRemoveFromCart()}
            </div>
        </div>
    </div>
    )

}

export default Card