import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [joke, setJoke] = useState(false);
  const [wait, setWait] = useState(false);
  const [username, setUserame] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [ref_code, setRef_Code] = useState("");
  const [ip, setIp] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Page();
    getIPv4();
  }, []);

  const Register = async (e) => {
    e.preventDefault();
    try {
      setWait(true);
      const res = await axios.post("https://ikoner-node.glitch.me/register", {
        username: username,
        email: email,
        password: password,
        confPassword: confPassword,
        ref_code: ref_code,
        ipv4: ip,
      });
      setJoke(true);
      setMsg(res.data.msg);
      setTimeout(() => {
        navigate.push("/");
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

  const Page = () => {
    document.title = "Register | Ikoner";
  };

  const getIPv4 = async () => {
    /*const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Headers': '*',
         'Access-Control-Allow-Methods': 'GET',
       }};*/
    const res = await axios.get("https://ipv4.jsonip.com/");
    console.log(res.data.ip);
    setIp(res.data.ip);
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Register} className="box">
                <div className="field">
                  <label className="label">Username</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="User"
                      value={username}
                      onChange={(e) => setUserame(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="user@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Confirm Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="********"
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Referral Code</label>
                  <div className="controls">
                    <input
                      type=""
                      className="input"
                      placeholder="Invitation Code"
                      value={ref_code}
                      onChange={(e) => setRef_Code(e.target.value)}
                    />
                  </div>
                </div>
                {joke && (
                  <div className="message is-danger">
                    <h1 className="has-text-centered">{msg}</h1>
                  </div>
                )}
                <div className="field mt-5">
                  <button
                    disabled={wait}
                    className="button is-danger is-fullwidth"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
