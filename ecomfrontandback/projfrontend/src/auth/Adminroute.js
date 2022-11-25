import { Navigate, Route, useNavigate } from "react-router-dom";
import { isAuthenticatedFrontEnd } from "./helper/Index";


const  AdminRoute = ({ children}) => {
  let auth = isAuthenticatedFrontEnd() && isAuthenticatedFrontEnd().user.role === 1;
  // let auth = true;
  return (
    auth  ? children : <Navigate to="/"/>
  );
}

export default AdminRoute