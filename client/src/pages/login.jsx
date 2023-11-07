import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const Login = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false)
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSubmit = (e) => {
    setLoading(true);
    let url = "/api/auth/login";

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
// berkaygkc7@gmail.com
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        if(json.success===true){
          cookies.set('access', json.access_token);
          navigate("/home");
          setErr(false)
        }else{
          setErr(json.message);
        }
      })
      .catch(setLoading(false));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="form">
      <label className="">
        <p className="ml-3">Username</p>
        <input
          id="username"
          type="username"
          placeholder="kullanici adi"
          onChange={handleChange}
        />
      </label>
      <label className="">
        <p className="ml-3">Password</p>
        <input
          id="password"
          type="password"
          placeholder="*******"
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSubmit}>{loading?"Loading..":"Sign IN"}</button>
      <Link onClick={()=>navigate("/register")}>{"Go to Register Page"}</Link>
      {err && (<p>{err.toString()}</p>)}
    </div>
  );
};

export default Login;
