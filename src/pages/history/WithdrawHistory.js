/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Sync =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/sync-outline.png?v=1670271786767";

const WithdrawalsHistory = () => {
  // eslint-disable-next-line
  const [userId, setUserId] = useState("");
  // eslint-disable-next-line
  const [username, setUsername] = useState("");
  // eslint-disable-next-line
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  // eslint-disable-next-line
  const [story, setStory] = useState([]);
  // eslint-disable-next-line
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect((async) => {
    Page();
    refreshToken();
    getHistory();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("https://ikoner-node.glitch.me/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setUserId(decoded.userId);
      setUsername(decoded.username);
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
        setUsername(decoded.username);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const getHistory = async () => {
    const response = await axios.post(
      "https://ikoner-node.glitch.me/withdraw/history",
      {
        username: username,
      },
    );
    setStory(response.data);
  };

  const Page = () => {
    document.title = "Withdraw History | Ikoner";
  };

  return (
    <div className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="methods3">
        <h1 className="tasks-center">Withdraw Record</h1>
        <img
          alt="sync"
          className="sync-red"
          src={Sync}
          onClick={getHistory}
          width={25}
        />
      </div>
      {story && (
        <div className="">
          {story.map((wthistory, index) => (
            <div className="td-data-global" key={wthistory.id}>
              <div className="td-data-global-row">
                <div className="withdraw-mini">{wthistory.status}</div>
                <div className="separater2" />
                <h1 className="datetime">{wthistory.updatedAt}</h1>
              </div>
              <div className="td-data-global-row">
                <h1 className="amount-withdraw">Withdraw Amount</h1>
                <div className="separater2" />
                <h1 className="withdraw-amount">{wthistory.amount}.00 USDT</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WithdrawalsHistory;
