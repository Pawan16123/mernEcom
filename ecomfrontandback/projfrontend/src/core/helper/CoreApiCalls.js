import { API } from "../../backendApi";

// Get all Products
export const getAllProducts = ()=>{
    return fetch(`/product/get/getAllproducts?limit=30`,{method:"GET"})
    .then( res =>{
        return res.json();
    })
    .catch( error => {
        console.log('Fetching home page data:',error);
    })
}