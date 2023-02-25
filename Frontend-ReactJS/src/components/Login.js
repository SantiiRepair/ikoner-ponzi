import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [joke, setJoke] = useState(false);
    const [wait, setWait] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ip, setIp] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();


    useEffect(() => {
        Page();
        getIPv4();
     },[])


    const Auth = async (e) => {
        e.preventDefault();
        try {
            setWait(true);
            const res = await axios.post('https://ikoner-node.glitch.me/login', {
                email: email,
                password: password,
                ipv4: ip
            });
            setJoke(true);
            setMsg(res.data.msg);
            setTimeout(() => {
            history.push("/account");
            }, 2000);
       } catch (error) {
            if (error.response) {
                setWait(false);
                setJoke(true);
                setMsg(error.response.data.msg);
                setTimeout(() => {
                setJoke(false)
                }, 2000);
           }
        }
    }


   const Page = () => {
     document.title = 'Login | Ikoner';
    };


    const getIPv4 = async() => {
      /*const config = {
        method: 'GET',
        mode: 'cors',
        headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Headers': '*',
         'Access-Control-Allow-Methods': 'GET',
       }};*/
       const res = await axios.get('https://ipv4.jsonip.com/');
       console.log(res.data.ip);
       setIp(res.data.ip)
    }


    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className="box">
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input autoComplete="true" type="text" className="input" placeholder="user@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input autoComplete="true" type="password" className="input" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                              <a href="https://t.me/ShaoranLeX" target='_blank' rel="noreferrer">
                               <ul className="forget">Forget Password?</ul>
                              </a>
                               {joke && <div className="message is-danger"><h1 className="has-text-centered">{msg}</h1></div>}
                                <div className="field mt-5">
                                    <button disabled={wait} className="button is-danger is-fullwidth">Login</button>
                                </div>
                                <div className='content-align'>
                                  <a href='/register' className="register">Dont have an account? Register</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
