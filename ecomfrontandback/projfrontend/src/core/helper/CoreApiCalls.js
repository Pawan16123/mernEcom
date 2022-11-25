import { API } from "../../backendApi";

// Get all Products
export const getAllProducts = ()=>{
    return fetch(`${API}/product/get/getAllproducts?limit=30`,{method:"GET"})
    .then( res =>{
        return res.json();
    })
    .catch( error => {
        console.log(error);
    })
}