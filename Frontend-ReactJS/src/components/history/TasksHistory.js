/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

const Sync = 'https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/sync-outline.png?v=1670271786767';

const TasksHistory = () => {

    // eslint-disable-next-line
    const [userId, setUserId] = useState('');
    // eslint-disable-next-line
    const [username, setUsername] = useState('');
    // eslint-disable-next-line
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    // eslint-disable-next-line
    const [story, setStory] = useState([]);
    // eslint-disable-next-line
    const [msg, setMsg] = useState('');
    const history = useHistory();

    useEffect((async)  => {
        Page();
        refreshToken();
        getHistory();             
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('https://ikoner-node.glitch.me/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setUserId(decoded.userId);
            setUsername(decoded.username);
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
            setUsername(decoded.username);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

   const getHistory = async () => {
      const response = await axios.post('https://ikoner-node.glitch.me/tasks/history', {
                username: username
           });
           setStory(response.data);
        }


   const Page = () => {
     document.title = 'Tasks History | Ikoner';
    };
   

   return (
     <div className="hero has-background-grey-light is-fullheight is-fullwidth">
          <div className="methods3">
          <h1 className="tasks-center">Tasks Record</h1>
          <img alt="sync" className="sync-red" src={Sync} onClick={getHistory} width={25}/>
          </div>
                { story && <div className="">
                {story.map((tkhistory, index) => (
                     <div className="td-data-global" key={tkhistory.id}>
                          <div className="td-data-global-row">
                            <div className="withdraw-mini">{tkhistory.status}</div>
                            <div className="separater2"/>
                            <h1 className="datetime">{tkhistory.updatedAt}</h1>
                          </div>
                          <div className="td-data-global-row">
                            <h1 className="amount-withdraw">Task Amount</h1>
                            <div className="separater2"/>
                            <h1 className="withdraw-amount">{tkhistory.amountTask}.00 USDT</h1>
                          </div>
                     </div>
                 ))}
            </div> }
         </div>
            
 )	
}

export default TasksHistory;
