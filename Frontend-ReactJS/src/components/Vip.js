/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const levelOne = 'https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/level-one.png?v=1670972349212';
const levelTwo = 'https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/level-two.png?v=1670972545149';
const levelPremium = 'https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/level-premium.png?v=1670972356141';

const Vip = () => {
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState('');
    const [userId, setUserId] = useState('');
    const [vip, setVip] = useState('');
    // eslint-disable-next-line
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    // eslint-disable-next-line
    const [msg, setMsg] = useState('');
    const [wait, setWait] = useState(false);
    const [joke, setJoke] = useState(false);
    const history = useHistory();

      useEffect(() => {
        Page();
        refreshToken();
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
            setVip(decoded.vip);
            setUserId(decoded.userId);
            setUsername(decoded.username);
            setBalance(decoded.balance);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

  const OneLevel = async (e) => {
      e.preventDefault();
      try {
          setWait(true);
          const res = await axios.post('https://ikoner-node.glitch.me/levelOne', {
                username: username,
                balance: balance,
                userId: userId,
                vip: vip
            });
            setJoke(true);
            setMsg(res.data.msg);
            setTimeout(() => {
            history.push("/account")
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

    const TwoLevel = async (e) => {
      e.preventDefault();
      try {
          setWait(true);
          await axios.post('https://ikoner-node.glitch.me/levelTwo', {
                username: username,
                balance: balance,
                userId: userId 
            });
            history.push("/account");
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

     const PremiumLevel = async (e) => {
      e.preventDefault();
      try {
          setWait(true);
          await axios.post('https://ikoner-node.glitch.me/levelPremium', {
                username: username,
                balance: balance,
                userId: userId 
            });
            history.push("/account");
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


    const Alert = () => {

       return (
         <div className="div-alert-msg">
               <div className="box-alert-msg">
                   <h1 className="alert-msg" placeholder="">{msg}</h1>
               </div>
         </div>
       )
    }


   const Page = () => {
     document.title = 'Vip | Ikoner';
    };


    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            { joke && <Alert/> }
                 <div className="centered-tasks">
                     
                <form onSubmit={OneLevel} className="container-vip">
                   <a className="top-of-vip-text">Starter Package</a>
                   <div className="container-td-vip">
                   <img alt="levelOne" src={levelOne} width={85} className="level-one"/>
                   <div className="container-semi-vip">
                   <a className="bottom-of-task-text">Daily gain: 2 USDT</a>
                   <a className="bottom-of-task-text">Price: 15 USDT</a>
                   <button className="button is-danger" disabled={wait}>Buy Now</button>
                   </div>     
                  </div>             
                </form> 

             
               <form onSubmit={TwoLevel} className="container-vip-t">
                   <a className="top-of-vip-text">Pro Package</a>
                   <div className="container-td-vip">
                   <img alt="levelTwo" src={levelTwo} width={85} className="level-one"/>
                   <div className="container-semi-vip">
                   <a className="bottom-of-task-text">Daily gain: 45 USDT</a>
                   <a className="bottom-of-task-text">Price: 250 USDT</a>
                   <button className="button is-danger" disabled={wait}>Buy Now</button>
                   </div>     
                  </div>             
                </form> 
        

                <form onSubmit={PremiumLevel} className="container-vip-t">
                   <a className="top-of-vip-text">Premium Package</a>
                   <div className="container-td-vip">
                   <img alt="levelPremium" src={levelPremium} width={85} className="level-one"/>
                   <div className="container-semi-vip">
                   <a className="bottom-of-task-text">Daily gain: 55 USDT</a>
                   <a className="bottom-of-task-text">Event to unblock</a>
                   <button className="button is-danger" disabled={wait}>Blocked</button>
                   </div>     
                  </div>             
                </form> 
        
               </div>
          </section>
    )
}

export default Vip
