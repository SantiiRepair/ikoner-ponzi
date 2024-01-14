/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Current =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/current.png?v=1670972338225";
const LevelOne =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/level-one.png?v=1670972349212";
const LevelTwo =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/level-two.png?v=1670972545149";
const LevelPremium =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/level-premium.png?v=1670972356141";
const Avatar =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/avatar_default.jpg?v=1670271759257";
const Arrow =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/arrow-slide.png?v=1670271756950";
const Wallet =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/wallet-outline.png?v=1670271834320";
const Config =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/settings-outline.png?v=1670271784774";
const Security =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/key-outline.png?v=1670271775178";
const RRecord =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/card-recharge-outline.png?v=1670271760791";
const WRecord =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/card-withdraw-outline.png?v=1670271763239";
const Copy =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/copy-outline.png?v=1670271766124";
const Checkmark =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/checkmark-circle-outline.png?v=1671121742331";
const Task =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/receipt-outline.png?v=1670271782979";
const Sync =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/sync-outline.png?v=1670271786767";

const Account = () => {
  const [copyEvent, setCopyEvent] = useState(false);
  const [level, setLevel] = useState(false);
  const [money, setMoney] = useState(false);
  const [name, setName] = useState(false);
  const [code, setCode] = useState(false);
  const [image, setImage] = useState("");
  // eslint-disable-next-line
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState("");
  const [user_code, setUser_Code] = useState("");
  const [vip, setVip] = useState("");
  // eslint-disable-next-line
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Page();
    refreshToken();
  }, []);

  const copy = async () => {
    await navigator.clipboard.writeText(user_code);
    setCopyEvent(true);
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get("https://ikoner-node.glitch.me/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setUserId(decoded.userId);
      setUsername(decoded.username);
      if (decoded.username === null) {
        setName(false);
      } else {
        setName(true);
      }
      setBalance(decoded.balance);
      if (decoded.balance === null) {
        setMoney(false);
      } else {
        setMoney(true);
      }
      setUser_Code(decoded.user_code);
      if (decoded.user_code === null) {
        setCode(false);
      } else {
        setCode(true);
      }
      setVip(decoded.vip);
      if (decoded.vip === null) {
        setImage(Current);
      }
      if (decoded.vip === 1) {
        setImage(LevelOne);
      }
      if (decoded.vip === 2) {
        setImage(LevelTwo);
      }
      if (decoded.vip === 3) {
        setImage(LevelPremium);
      }
      if (decoded.vip === null) {
        setLevel(false);
      } else {
        setLevel(true);
      }
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
        setUser_Code(decoded.user_code);
        setVip(decoded.vip);
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

  const Page = () => {
    document.title = "Account | Ikoner";
  };

  return (
    <div className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="bigmama">
        <div className="methods3">
          <div className="containerdata">
            <div className="userphoto">
              <img
                alt="avatar"
                className="photoavatar"
                src={Avatar}
                width={50}
              />
            </div>
            <div className="containervalues">
              <h1 className="userdata">{name ? username : "undefined"}</h1>
              <div className="methods3">
                <h1 className="user-data">
                  User Code: {code ? user_code : "null"}
                </h1>

                <img
                  alt="copy"
                  className="copy-red"
                  src={copyEvent ? Checkmark : Copy}
                  onClick={copy}
                />
              </div>
            </div>
          </div>
          <div className="separater2"></div>
          <img
            alt="sync"
            className="sync-logo"
            src={Sync}
            width={30}
            onClick={refreshToken}
          />
        </div>
        <div className="balance">
          <div className="methods3">
            <h1 className="assets">My total assets</h1>
            <div className="separater2"></div>
            {image && <img alt="vip" className="" src={image} width={15} />}
            <h1 className="subassets arrow-red">
              Vip Level: {level ? vip : "null"}
            </h1>
          </div>
          <h1 className="cash is-success">{money ? balance : "0"}.00 USDT</h1>
        </div>
        <div className="methods">
          <Link to="/recharge">
            <button className="button is-red">Recharge</button>
          </Link>
          <button className="space"></button>
          <Link to="/withdraw">
            <button className="button is-red">Withdraw</button>
          </Link>
        </div>
      </div>
      <hr className="solid" />
      <Link to="/personal">
        <div className="methods2">
          <img
            className="personal-red"
            alt="personal"
            src={Config}
            width={25}
          />
          <a className="data2">Personal Information</a>
          <div className="separater2"></div>
          <img className="arrow-red" alt="arrow" src={Arrow} width={15} />
        </div>
      </Link>
      <hr className="solid" />
      <Link to="/security">
        <div className="methods2">
          <img
            className="security-red"
            alt="security"
            src={Security}
            width={25}
          />
          <a className="data2">Security Center</a>
          <div className="separater2"></div>
          <img className="arrow-red" alt="arrow" src={Arrow} width={15} />
        </div>
      </Link>
      <hr className="solid" />
      <Link to="/wallet">
        <div className="methods2">
          <img className="wallet-red" alt="wallet" src={Wallet} width={25} />
          <a className="data2">Wallet Address</a>
          <div className="separater2"></div>
          <img className="arrow-red" alt="arrow" src={Arrow} width={15} />
        </div>
      </Link>
      <hr className="solid" />
      <Link to="/tasks/record">
        <div className="methods2">
          <img className="task-red" alt="task" src={Task} width={25} />
          <a className="data2">Tasks Record</a>
          <div className="separater2"></div>
          <img className="arrow-red" alt="arrow" src={Arrow} width={15} />
        </div>
      </Link>
      <hr className="solid" />
      <Link to="/withdraws/record">
        <div className="methods2">
          <img
            className="withdraw-red"
            alt="withdraw"
            src={WRecord}
            width={25}
          />
          <a className="data2">Withdraw Record</a>
          <div className="separater2"></div>
          <img className="arrow-red" alt="arrow" src={Arrow} width={15} />
        </div>
      </Link>
      <hr className="solid" />
      <Link to="/recharges/record">
        <div className="methods2">
          <img
            className="recharge-red"
            alt="recharge"
            src={RRecord}
            width={25}
          />
          <a className="data2">Recharge Record</a>
          <div className="separater2"></div>
          <img className="arrow-red" alt="arrow" src={Arrow} width={15} />
        </div>
      </Link>
      <hr className="solid" />
    </div>
  );
};

export default Account;
