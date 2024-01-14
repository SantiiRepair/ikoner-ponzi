import { createBrowserRouter, Navigate } from "react-router-dom";

import Account from "./pages/Account.js";
import Personal from "./pages/account/Personal.js";
import Security from "./pages/account/Security.js";
import Wallet from "./pages/account/Wallet.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Tasks from "./pages/Tasks.js";
import Vip from "./pages/Vip.js";
import WithdrawalsHistory from "./pages/history/WithdrawHistory.js";
import RechargesHistory from "./pages/history/RechargeHistory.js";
import TasksHistory from "./pages/history/TasksHistory.js";
import ReferralList from "./pages/history/TeamHistory.js";
import Withdraw from "./pages/Withdraw.js";
import Recharge from "./pages/Recharge.js";

import Navbar from "./components/Navbar.js";

export const router = createBrowserRouter([
  {
    path: "/pages/login",
    element: (
      <div>
        <Navigate replace to="/pages/login" />
      </div>
    ),
  },
  {
    path: "/pages",
    children: [
      {
        path: "login",
        element: (
          <div>
            <Login />
          </div>
        ),
      },
      {
        path: "register",
        element: (
          <div>
            <Register />
          </div>
        ),
      },
      {
        path: "tasks",
        element: (
          <div>
            <Navbar />
            <Tasks />
          </div>
        ),
        children: [
          {
            path: "record",
            element: (
              <div>
                <Navbar />
                <TasksHistory />
              </div>
            ),
          },
        ],
      },
      {
        path: "vip",
        element: (
          <div>
            <Navbar />
            <Vip />
          </div>
        ),
      },
      {
        path: "withdraw",
        element: (
          <div>
            <Navbar />
            <Withdraw />
          </div>
        ),
        children: [
          {
            path: "record",
            element: (
              <div>
                <Navbar />
                <WithdrawalsHistory />
              </div>
            ),
          },
        ],
      },
      {
        path: "top-up",
        element: (
          <div>
            <Navbar />
            <Recharge />
          </div>
        ),
        children: [
          {
            path: "record",
            element: (
              <div>
                <Navbar />
                <RechargesHistory />
              </div>
            ),
          },
        ],
      },
    ],
  },

  {
    path: "/user",
    element: <div></div>,
    children: [
      {
        path: "account",
        element: (
          <div>
            <Navbar />
            <Account />
          </div>
        ),
      },
      {
        path: "personal",
        element: (
          <div>
            <Navbar />
            <Personal />
          </div>
        ),
      },
      {
        path: "wallet",
        element: (
          <div>
            <Navbar />
            <Wallet />
          </div>
        ),
      },
      {
        path: "security",
        element: (
          <div>
            <Navbar />
            <Security />
          </div>
        ),
      },
      {
        path: "team",
        element: (
          <div>
            <Navbar />
            <ReferralList />
          </div>
        ),
      },
    ],
  },
]);
