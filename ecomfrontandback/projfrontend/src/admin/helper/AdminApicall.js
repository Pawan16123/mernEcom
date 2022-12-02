import { API } from "../../backendApi"

// Create category
export const createCategoryReq = (userid, token, categoryDetails)=>{
    return fetch(`/category/create/${userid}`, {
        method:'POST',
        headers:{
            Accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categoryDetails)
    })
    .then( res => {
        return res.json();
    })
    .catch( error => {
        console.log(error);
    })
}

// Get all categories
export const getCategories = ()=>{
    return fetch(`/category/getallcategory`,{method:"GET"})
    .then( res =>{
        return res.json();
    })
    .catch( error => {
        console.log(error);
    })
}

// Products Frontend calls
// Create product
export const createProductFront = (userid, token, productDetails)=>{
    return fetch(`/product/create/${userid}`,{
            method:"POST",
            headers:{
                Authorization: `Bearer ${token}`
            },
            body:productDetails
        })
        .then( res =>{
            return res.json();
        })
        .catch( error => {
            console.log(error);
        }

    )
}

// Get single product
export const getProduct = (productid)=>{
    return fetch(`/product/${productid}`,{method:"GET"})
    .then( res =>{
        return res.json();
    })
    .catch( error => {
        console.log(error);
    })
}

// Update a product
export const updateProduct = (userid, productid, token, productDetails)=>{
    return fetch(`/product/update/${productid}/${userid}`,{
            method:"PUT",
            headers:{
                Authorization: `Bearer ${token}`
            },
            body:productDetails
        })
        .then( res =>{
            return res.json();
        })
        .catch( error => {
            console.log(error);
        }

    )
}

// Delete a product

export const deleteProduct = (userid, productid, token)=>{
    return fetch(`/product/delete/${productid}/${userid}`,{
            method:"DELETE",
            headers:{
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then( res =>{
            return res.json();
        })
        .catch( error => {
            console.log(error);
        }

    )
}