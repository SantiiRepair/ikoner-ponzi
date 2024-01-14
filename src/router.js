import { createBrowserRouter } from "react-router-dom";

import Account from "./pages/Account.js";
import Personal from "./pages/account/Personal.js";
import Security from "./pages/account/Security.js";
import Wallet from "./pages/account/Wallet.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Navbar from "./components/Navbar.js";
import Tasks from "./pages/Tasks.js";
import Vip from "./pages/Vip.js";
import WithdrawalsHistory from "./pages/history/WithdrawHistory.js";
import RechargesHistory from "./pages/history/RechargeHistory.js";
import TasksHistory from "./pages/history/TasksHistory.js";
import ReferralList from "./pages/history/TeamHistory.js";
import Withdraw from "./pages/Withdraw.js";
import Recharge from "./pages/Recharge.js";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/user/account",
    element: (
      <div>
        <Navbar />
        <Account />
      </div>
    ),
  },
  {
    path: "/page/tasks",
    element: (
      <div>
        <Navbar />
        <Tasks />
      </div>
    ),
  },
    {
    path: "/page/vip",
    element: (
      <div>
        <Navbar />
        <Vip />
      </div>
    ),
  },
  {
    path: "/user/personal",
    element: (
      <div>
        <Navbar />
        <Personal />
      </div>
    ),
  },
    {
    path: "/user/wallet",
    element: (
      <div>
        <Navbar />
        <Wallet />
      </div>
    ),
  },
  {
    path: "/user/security",
    element: (
      <div>
        <Navbar />
        <Security />
      </div>
    ),
  },
    {
    path: "/user/team",
    element: (
      <div>
        <Navbar />
        <ReferralList />
      </div>
    ),
  },
  {
    path: "/withdrawals/record",
    element: (
      <div>
        <Navbar />
        <WithdrawalsHistory />
      </div>
    ),
  },
    {
    path: "/top-ups/record",
    element: (
      <div>
        <Navbar />
        <RechargesHistory />
      </div>
    ),
  },
    {
    path: "/tasks/record",
    element: (
      <div>
        <Navbar />
        <TasksHistory />
      </div>
    ),
  },
  {
    path: "/pages/withdraw",
    element: (
      <div>
        <Navbar />
        <Withdraw />
      </div>
    ),
  },
  {
    path: "/pages/top-up",
    element: (
      <div>
        <Navbar />
        <Recharge />
      </div>
    ),
  },
]);