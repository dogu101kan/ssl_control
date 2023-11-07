import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const Notfound = () => {
  
  const cookies = new Cookies();
  return (
    cookies.get("access") ? (<Navigate to="/home"/>) : (<Navigate to="/"/>)
  )
}

export default Notfound