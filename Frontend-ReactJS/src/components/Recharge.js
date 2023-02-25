/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from 'axios';

const Copy = 'https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/copy-outline.png?v=1670271766124';
const Checkmark = 'https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/checkmark-circle-outline.png?v=1671121742331';

const Recharge = () => {

    const to = 'TTjn5Vq•••••••••••••••836CAPV';
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState('');
    // eslint-disable-next-line
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    // eslint-disable-next-line
    const [users, setUsers] = useState([]);
    const [hash, setHash] = useState('');
    const [amount, setAmount] = useState('');
    const [msg, setMsg] = useState('');
    const [joke, setJoke] = useState(false);
    const [wait, setWait] = useState(false);
    const [copyEvent, setCopyEvent] = useState(false);  
    const history = useHistory();

    useEffect(() => {
        Page();
        refreshToken();
    }, []);


     const copy = async() => {
       await navigator.clipboard.writeText('TTjn5Vqqv7LZuht8KoLsvuKNts9836CAPV');
       setCopyEvent(true);
     }


    const refreshToken = async () => {
        try {
            const response = await axios.get('https://ikoner-node.glitch.me/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUserId(decoded.userId);
            setUsername(decoded.username);
            setBalance(decoded.balance);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('https://ikoner-node.glitch.me/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUserId(decoded.userId);
            setBalance(decoded.balance);
            setUsername(decoded.username);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

      const Recharge = async (e) => {
      e.preventDefault();
      try {
          setWait(true);
          const res = await axios.post('https://ikoner-node.glitch.me/recharge', {
                username: username,
                hash: hash,
                balance: balance,
                userId: userId,
                amount: amount
            });
            setJoke(true);
            setMsg(res.data.msg);
            setTimeout(() => {
            history.push("/recharges/record");
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
     document.title = 'Recharge | Ikoner';
    };


    const Alert = () => {

       return (
         <div className="div-alert-msg">
               <div className="box-alert-msg">
                   <h1 className="alert-msg" placeholder="">{msg}</h1>
               </div>
         </div>
       )
    }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            { joke && <Alert/> }
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Recharge} className="box">
                                 <div className="methods3">
                                  <h1 className='on-overflow'>{to}</h1>
                                  <img alt="copy" className="copy-red" src={ copyEvent ? Checkmark : Copy } onClick={copy}/>
                                  </div>
                                 <hr className="dotted"/>
                                <div className="field">
                                    <label className="label">Hash</label>
                                    <div className="controls">
                                        <input className="input" placeholder="Paste Hash" value={hash} onChange={(e) => setHash(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Amount</label>
                                    <div className="controls">
                                        <input type="number" className="input" placeholder="Minimum 6 USDT" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button type="submit" disabled={wait} className="button is-danger is-fullwidth">Recharge</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Recharge
