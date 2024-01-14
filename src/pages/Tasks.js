/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const DeathAdder =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/razer-viper.png?v=1670972557182";
const Kaira =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/razer-headset.png?v=1670972564920";

const Tasks = () => {
  // eslint-disable-next-line
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState("");
  const [vip, setVip] = useState("");
  const [daily, setDaily] = useState("");
  // eslint-disable-next-line
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  // eslint-disable-next-line
  const [msg, setMsg] = useState("");
  const [wait, setWait] = useState(false);
  const [joke, setJoke] = useState(false);
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
      setBalance(decoded.balance);
      setVip(decoded.vip);
      setDaily(decoded.daily);
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
        setVip(decoded.vip);
        setDaily(decoded.daily);
        setBalance(decoded.balance);
        setUsername(decoded.username);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const Task = async (e) => {
    e.preventDefault();
    try {
      setWait(true);
      const res = await axios.post("https://ikoner-node.glitch.me/tasks", {
        username: username,
        balance: balance,
        userId: userId,
        vip: vip,
        daily: daily,
      });
      setJoke(true);
      setMsg(res.data.msg);
      setTimeout(() => {
        navigate("/tasks/record");
      }, 2000);
    } catch (error) {
      if (error.response) {
        setWait(false);
        setJoke(true);
        setMsg(error.response.data.msg);
        setTimeout(() => {
          setJoke(false);
        }, 2000);
      }
    }
  };

  const Alert = () => {
    return (
      <div className="div-alert-msg">
        <div className="box-alert-msg">
          <h1 className="alert-msg" placeholder="">
            {msg}
          </h1>
        </div>
      </div>
    );
  };

  const Page = () => {
    document.title = "Task | Ikoner";
  };

  return (
    <div className="hero has-background-grey-light is-fullheight is-fullwidth">
      {joke && <Alert />}
      <div className="centered-tasks">
        <form onSubmit={Task} className="container-vip">
          <a className="top-of-vip-text">Razer DeathAdder V2 Halo Edition</a>
          <div className="container-td-vip">
            <img
              alt="razer-kaira"
              src={DeathAdder}
              width={105}
              className="level-one"
            />
            <div className="container-semi-vip">
              <a className="bottom-of-task-text">Get it by: 78 USDT</a>
              <a className="bottom-of-task-text">Ship on five days</a>
              <button className="button is-danger" disabled={wait}>
                Submit Task
              </button>
            </div>
          </div>
        </form>

        <form onSubmit={Task} className="container-vip-t">
          <a className="top-of-vip-text">Razer Kaira Pro Halo Edition</a>
          <div className="container-td-vip">
            <img
              alt="razer-mouse"
              src={Kaira}
              width={95}
              className="level-one"
            />
            <div className="container-semi-vip">
              <a className="bottom-of-task-text">Get it by: 108 USDT</a>
              <a className="bottom-of-task-text">Ship on four days</a>
              <button className="button is-danger" disabled={wait}>
                Submit Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tasks;
