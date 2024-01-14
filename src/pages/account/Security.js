/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Security = () => {
  // eslint-disable-next-line
  const [userId, setUserId] = useState("");
  // eslint-disable-next-line
  const [pin, setPin] = useState("");
  // eslint-disable-next-line
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  // eslint-disable-next-line
  const [users, setUsers] = useState([]);
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
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const Page = () => {
    document.title = "Security | Ikoner";
  };

  return (
    <div className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="bigpapa">
        <div className="container-security">
          <h1 className="security-text">My Password: •••••••••••••</h1>
          <div className="methods3">
            <h1 className="the-security-text">Change Password:</h1>
            <a className="press-security-text" href="https://t.me/ShaoranLeX">
              Press to change
            </a>
          </div>
          <div className="methods3">
            <h1 className="the-security-text">User Pin: {pin}</h1>
            <a className="press-security-text">Press here to set</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
