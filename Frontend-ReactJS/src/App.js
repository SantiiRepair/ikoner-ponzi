import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Account from "./components/Account.js";
import Personal from "./components/account/Personal";
import Security from "./components/account/Security";
import Wallet from "./components/account/Wallet";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
import Vip from "./components/Vip";
import WithdrawalsHistory from "./components/history/WithdrawHistory";
import RechargesHistory from "./components/history/RechargeHistory";
import TasksHistory from "./components/history/TasksHistory";
import ReferralList from "./components/history/TeamHistory";
import Withdraw from "./components/Withdraw";
import Recharge from "./components/Recharge";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/register"> 
          <Register/>
        </Route>    
        <Route path="/account">
          <Navbar/>
          <Account/>
        </Route>
        <Route path="/task"> 
          <Navbar/>
          <Tasks/>
        </Route>
         <Route path="/vip"> 
          <Navbar/>
          <Vip/>
        </Route>
        <Route path="/personal">
          <Navbar/>
          <Personal/>
        </Route>
        <Route path="/wallet">
          <Navbar/>
          <Wallet/>
        </Route>
        <Route path="/security">
          <Navbar/>
          <Security/>
        </Route>
        <Route path="/team">
          <Navbar/>
          <ReferralList/>
        </Route>
        <Route path="/withdraws/record">
          <Navbar/>
          <WithdrawalsHistory/>
        </Route>
         <Route path="/recharges/record">
          <Navbar/>
          <RechargesHistory/>
        </Route>
         <Route path="/tasks/record">
          <Navbar/>
          <TasksHistory/>
        </Route>
       <Route path="/withdraw">
          <Navbar/>
          <Withdraw/>
         </Route>
         <Route path="/recharge"> 
          <Navbar/>
          <Recharge/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
