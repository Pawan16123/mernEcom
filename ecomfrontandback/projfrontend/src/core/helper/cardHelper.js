export const addToCart = (product, next)=>{
    let cart = [];
    if(typeof window !== undefined){
        let cartItems = localStorage?.cart;
        if(cartItems){
            cart = JSON.parse(cartItems);
        }
        cart.push(product);
        localStorage.setItem('cart',JSON.stringify(cart));
        next();
    }
}

export const removeFromCart = (product, next)=>{
    let cart = [];
    if(typeof window !== undefined){
        let cartItems = localStorage?.cart;
        if(cartItems){
            cart = JSON.parse(cartItems);
        }
        cart = cart.filter(el=>{
            if(el._id !== product._id){
                return el;
            }
        })
        localStorage.setItem('cart',JSON.stringify(cart));
        next();
    }
}

export const loadCartProducts = () => {
    let cartProducts = [];
    if(typeof window !== undefined){
        let cartItems = localStorage?.cart;
        if(cartItems){
            cartProducts = JSON.parse(cartItems);
        }
    }
    return cartProducts;
}

export const emptyCart = (next) =>{
    if(typeof window !== undefined){
        localStorage.removeItem('cart');
    }
    next();
}