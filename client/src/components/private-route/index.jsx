import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'universal-cookie';

export default function PrivateRoute() {

  const cookies = new Cookies();
  return cookies.get("access") ? (<div><Outlet/></div>) : <Navigate to="/login"/>
}
