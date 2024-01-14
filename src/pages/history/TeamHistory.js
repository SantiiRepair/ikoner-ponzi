/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Sync =
  "https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/sync-outline.png?v=1670271786767";

const ReferralList = () => {
  // eslint-disable-next-line
  const [userId, setUserId] = useState("");
  // eslint-disable-next-line
  const [user_code, setUser_Code] = useState("");
  // eslint-disable-next-line
  const [ref_code, setRef_Code] = useState("");
  // eslint-disable-next-line
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  // eslint-disable-next-line
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect((async) => {
    Page();
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("https://ikoner-node.glitch.me/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setUserId(decoded.userId);
      setUser_Code(decoded.user_code);
      setRef_Code(decoded.ref_code);
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
        setRef_Code(decoded.ref_code);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const getUsers = async () => {
    const response = await axios.post("https://ikoner-node.glitch.me/team", {
      user_code: user_code,
      ref_code: ref_code,
    });
    setUsers(response.data);
  };

  const Page = () => {
    document.title = "Team History | Ikoner";
  };

  return (
    <div className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="methods3">
        <h1 className="tasks-center">Team Record</h1>
        <img
          alt="sync"
          className="sync-red"
          src={Sync}
          onClick={getUsers}
          width={25}
        />
      </div>
      <table className="table is-striped is-fullwidth">
        <thead className="table-align">
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody className="table-align">
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td className="cash-ref">{user.balance}.00 USDT</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferralList;
