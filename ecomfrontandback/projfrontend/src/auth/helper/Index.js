import { API } from "../../backendApi";

export const signup = user=>{
    return fetch(`/api/signup`, {
        method:'POST',
        body:JSON.stringify(user),
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json'
        }

    })
    .then((res)=>{
        return res.json();
    })
    .catch(error=>console.log(error, 'ERROR FROM AUTHINDEX'))
}
export const signinfetch = loginDetails=>{
    return fetch(`/api/signin`, {
        method:'POST',
        body:JSON.stringify(loginDetails),
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json'
        }

    })
    .then((res)=>{
        return res.json();
    })
    .catch(err=>console.log('Error in signin frontend: ', err))
}

export const authenticate = (data, next)=>{
    if(typeof window !== undefined){
        localStorage.setItem('jwt', JSON.stringify(data))
        // document.cookie = `jwt=${data}`;
        next();
    }
}
export const signout = next=>{
    if(typeof window !== undefined){
        localStorage.removeItem('jwt');
        next();

        return fetch(`/api/signout`,{
            method: 'GET'
        })
        .then(res=>{
            console.log('successfully signed out', res);
        })
        .catch(err=>{
            console.log('Error in signout frontend: ', err);
        })
    }
}

export const isAuthenticatedFrontEnd = ()=>{
    if(typeof window == undefined) return false;
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }else{
        return false;
    }
}
