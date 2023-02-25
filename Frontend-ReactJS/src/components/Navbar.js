import React from 'react'
import axios from 'axios';
import {slide as Menu} from 'react-burger-menu';
import { useHistory as history } from 'react-router-dom';

const IK = 'https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/ik.png?v=1670271772665';
const Account = 'https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/person-outline.png?v=1670271780609';
const Task = 'https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/clipboard-outline.png?v=1670271764687';
const Vip = 'https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/diamond-outline.png?v=1670271767921';
const People = 'https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/people-outline.png?v=1670271778786';
const Unlog = 'https://cdn.glitch.global/c58699df-f192-4af9-bca5-0e1daf50c2f9/log-out-outline.png?v=1670271776935';

 
 const Logout = async () => { 
        try {
            await axios.delete('https://ikoner-node.glitch.me/logout');
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }     

 const Navigate = () => {
  return (
     <Menu width={300} right isOpen={false}>
      <div className="align-icon-text"><img alt="account" className="navbar-icons" src={Account} width={20}/><a id="account" className="" href="/account">Account Center</a></div>
      <div className="align-icon-text"><img alt="task" className="navbar-icons" src={Task} width={20}/><a id="task" className="" href="/task">Task Center</a></div>
      <div className="align-icon-text"><img alt="vip" className="navbar-icons" src={Vip} width={20}/><a id="vip" className="" href="/vip">Level Center</a></div>
      <div className="align-icon-text"><img alt="team" className="navbar-icons" src={People} width={20}/><a id="team" className="" href="/team">Team Center</a></div>
      <div className="align-icon-text"><img alt="logout" className="navbar-icons" src={Unlog} width={20}/><a id="logout" onClick={Logout} className="" href="/">Logout</a></div>
     </Menu>
    )
  }

  const Navbar = () => {
    return (
     <nav className="navbar is-dark is-fullwidth">
      <img alt="logo" className="nav-icon" src={IK} width={40} />
      <Navigate/>
     </nav>
   );
}


export default Navbar;
