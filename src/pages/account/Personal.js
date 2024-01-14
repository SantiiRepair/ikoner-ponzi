/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Col =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/colombia-facebook.png?v=1671239894120";

const Personal = () => {
  // eslint-disable-next-line
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  // eslint-disable-next-line
  const [email, setEmail] = useState("");
  // eslint-disable-next-line
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  // eslint-disable-next-line
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Page();
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("https://ikoner-node.glitch.me/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setUserId(decoded.userId);
      setUsername(decoded.username);
      setEmail(decoded.email);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/pages/login");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("https://ikoner-node.glitch.me/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setUserId(decoded.userId);
        setEmail(decoded.email);
        setUsername(decoded.username);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const Page = () => {
    document.title = "Personal | Ikoner";
  };

  return (
    <div className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="bigpapa">
        <div className="container-personal">
          <div className="methods3">
            <h1 className="the-personal-text">My Username:</h1>
            <h1 className="personal-text">{username}</h1>
          </div>
          <div className="methods3">
            <h1 className="the-personal-text">My Email:</h1>
            <h1 className="personal-text">{email}</h1>
          </div>
          <div className="methods3">
            <h1 className="the-personal-text-1">Country:</h1>
            <h1 className="press-personal-text">Republic of Colombia</h1>
            {/* eslint-disable-next-line*/}
            <img alt="colombia" src={Col} width={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
