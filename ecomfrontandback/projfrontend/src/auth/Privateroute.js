import { Route, useNavigate, Navigate } from "react-router-dom";
import { isAuthenticatedFrontEnd } from "./helper/Index";



const  PrivateRoute = ({ children}) => {
  let auth = isAuthenticatedFrontEnd();
  // console.log('auth: ', auth);
  return (
    auth  ? children : <Navigate to="/signin"/>
  );
}

// const  PrivateRoute = ({ component: Component, ...rest }) => {
//     let auth = isAuthenticated();
//     const navigate = useNavigate();
//     return (
//       <Route
//         {...rest}
//         render={(props) =>
//           auth ? (
//             <Component {...props}/>
//           ) : navigate('/')
//         }
//       />
//     );
//   }
  
  export default PrivateRoute