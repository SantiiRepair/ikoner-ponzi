/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const [wait, setWait] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [show, setShow] = useState(true);
  const [wallet, setWallet] = useState(false);
  const [joke, setJoke] = useState(false);
  const [userId, setUserId] = useState("");
  // eslint-disable-next-line
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [bs, setBs] = useState("");
  // eslint-disable-next-line
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState("");
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
      setAddress(decoded.address);
      const str = decoded.address;
      // eslint-disable-next-line
      String.prototype.replaceAt = function (index, replacement) {
        if (index >= this.length) {
          return this.valueOf();
        }
        return (
          this.substring(0, index) + replacement + this.substring(index + 20)
        );
      };
      const strBs = await str.replaceAt(7, "••••••••••••••••••••");
      setBs(strBs);
      if (decoded.address === null) {
        return setWallet(false);
      } else {
        setWallet(true);
      }
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
        setAddress(decoded.address);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const SetAddress = async (e) => {
    e.preventDefault();
    try {
      setWait(true);
      const res = await axios.post("https://ikoner-node.glitch.me/address", {
        userId: userId,
        address: addresses,
      });
      setJoke(true);
      setMsg(res.data.msg);
      setTimeout(() => {
        navigate("/account");
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

  const onHide = () => {
    setShow(false);
    setConfirm(true);
  };

  const onShow = () => {
    setConfirm(false);
    setShow(true);
  };

  const Page = () => {
    document.title = "Wallet | Ikoner";
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

  const Confirm = () => {
    return (
      <div className="hero has-background-grey-light is-fullheight is-fullwidth">
        {joke && <Alert />}
        <form onSubmit={SetAddress} className="box coding-gor">
          <div>
            <label className="label">Confirm Operation</label>
          </div>
          <hr className="dotted" />
          <div>
            <input
              className="input"
              placeholder="Paste Address"
              value={addresses}
              onChange={(e) => setAddresses(e.target.value)}
            />
          </div>
          <hr className="dotted" />
          <div className="btn-position">
            <button className="button is-danger" disabled={wait}>
              Confirm
            </button>
            <button className="space-mg"></button>
            <button className="button is-danger" onClick={onShow}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  const OnAddress = () => {
    return (
      <div className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="bigpapa box-animation">
          <h1 className="wallet-text">Wallet Address</h1>
          <div className="container-wallet">
            <div className="separater-4"></div>
            <h1 className="">{wallet ? bs : "No set wallet address yet"}</h1>
          </div>
          {!wallet && (
            <button className="button is-red" onClick={onHide}>
              Set Wallet Address
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {show && <OnAddress />}
      {confirm && <Confirm />}
    </div>
  );
};

export default Wallet;
