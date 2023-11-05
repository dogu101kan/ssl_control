import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Table from "../components/table";

const Home = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState();
  const [data, setData] = useState(false);

  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    let url = "/api/query/sslresults";
    let headers = new Headers();
    headers.append("authorization", "Bearer " + cookies.get("access_token"));

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.succes === false) {
          setData(false);
        } else {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const addWebsite = (e)=>{

    setLoading(true);
    let url = "/api/query/website";
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("authorization", "Bearer " + cookies.get("access_token"));

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        if(json.success===true){
          window.location.reload(false);
        }
      })
      .catch(setLoading(false));
  }

  const addMail = (e)=>{
    
    setLoading(true);
    let url = "/api/query/mail";
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("authorization", "Bearer " + cookies.get("access_token"));

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }
  const deleteMail = (e)=>{
    
    setLoading(true);
    let url = "/api/query/mail";
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("authorization", "Bearer " + cookies.get("access_token"));

    fetch(url, {
      method: "DELETE",
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap2">
          <label className="flex align-items gap03">
            <p className="ml-3">Mail</p>
            <input
              id="mail"
              type="email"
              placeholder="example@example.example"
              onChange={handleChange}
            />
            <button
            id="mailbtn"
              onClick={(e)=>addMail(e)}
            >
              Add
            </button>
          </label>

          <label className="flex align-items gap03">
            <p className="ml-3">Website</p>
            <input
              id="website"
              placeholder="example.com"
              onChange={handleChange}
            />
            <button
            id="websitebtn"
              onClick={(e)=>addWebsite(e)}
            >
              Add
            </button>
          </label>
          <label className="flex align-items gap03">
            <button
            id="websitebtn"
              onClick={(e)=>deleteMail(e)}
            >
              If you don't want to get informed press
            </button>
          </label>
        </div>
        <button
          onClick={() => {
            cookies.remove("access_token");
            setData(false)
            navigate("/");
          }}
        >
          Çıkış
        </button>
      </div>

      <div className="flex justify-between">
        <div>
          {loading && <p>Loading..</p>}
          {!data ? (
            <p>Session Expired</p>
          ) : (
            <div>
              {data.map((el, index) => (
                <>
                  <Table key={index} data={el} />
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
