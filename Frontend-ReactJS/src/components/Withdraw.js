/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

const Withdraw = () => {
   
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState('');
    const [vip, setVip] = useState('');
    // eslint-disable-next-line
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    // eslint-disable-next-line
    const [users, setUsers] = useState([]);
    const [address, setAddress] = useState('');
    const [bs, setBs] = useState('');
    const [amount, setAmount] = useState('');
    const [msg, setMsg] = useState('');
    const [joke, setJoke] = useState(false);
    const [wait, setWait] = useState(false);
    const [wallet, setWallet] = useState(false);
    const history = useHistory();

    useEffect(() => {
        Page();
        refreshToken();;
    }, []);


   const refreshToken = async () => {
        try {
            const response = await axios.get('https://ikoner-node.glitch.me/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUserId(decoded.userId);
            setUsername(decoded.username);
            setBalance(decoded.balance);
            setVip(decoded.vip);
            setAddress(decoded.address);
            const str = decoded.address;
            // eslint-disable-next-line
            String.prototype.replaceAt = function(index, replacement) {
            if (index >= this.length) {
            return this.valueOf();}
            return this.substring(0, index) + replacement + this.substring(index + 20);}
            const strBs = await str.replaceAt(7, '••••••••••••••••••••');
            setBs(strBs);
            if(decoded.address === null) {
            setTimeout(() => {
               history.push("/wallet")
            }, 2000)
              return setWallet(false);
            } else {
              setWallet(true);
            }
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
            setAddress(decoded.address);
            setVip(decoded.vip);
            setBalance(decoded.balance);
            setUsername(decoded.username);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });


      const Withdraw = async (e) => {
      e.preventDefault();
      try {
          setWait(true);
          const res = await axios.post('https://ikoner-node.glitch.me/withdraw', {
                username: username,
                toAddress: address,
                balance: balance,
                userId: userId,
                vip: vip,
                amount: amount
            });
            setJoke(true);
            setMsg(res.data.msg);
            setTimeout(() => {
            history.push("/withdraws/record");
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
     document.title = 'Withdraw | Ikoner';
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
                            <form onSubmit={Withdraw} className="box">
                                <div className="field">
                                    <label className="label">Address</label>
                                    <h1 className="wallet-text" placeholder="">
                                      { wallet ? bs : 'No set wallet address yet' }
                                    </h1>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Amount</label>
                                    <div className="controls">
                                        <input type="number" className="input" placeholder="Minimum 2 USDT" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button type="submit" disabled={wait} className="button is-danger is-fullwidth">Withdraw</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Withdraw
