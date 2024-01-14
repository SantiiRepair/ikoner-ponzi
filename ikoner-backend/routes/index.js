import express from "express";
import { Register, Login, Logout } from "../controllers/Users.js";
import { Withdraw } from "../controllers/Withdraw.js";
import { Recharge } from "../controllers/Recharge.js";
import {
  WithdrawalsHistory,
  RechargesHistory,
  TasksHistory,
} from "../controllers/History.js";
import { levelOne, levelTwo, levelPremium } from "../controllers/Vip.js";
import { Task } from "../controllers/Tasks.js";
import { Team } from "../controllers/Referrals.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { SetAddress } from "../controllers/Utils.js";

const router = express.Router();

router.get("/users", verifyToken);
router.get("/token", refreshToken);
router.post("/levelOne", levelOne);
router.post("/levelTwo", levelTwo);
router.post("/levelPremium", levelPremium);
router.post("/address", SetAddress);
router.post("/register", Register);
router.post("/login", Login);
router.post("/withdraw", Withdraw);
router.post("/recharge", Recharge);
router.post("/tasks", Task);
router.all("/withdraw/history", WithdrawalsHistory);
router.all("/recharge/history", RechargesHistory);
router.all("/tasks/history", TasksHistory);
router.all("/team", Team);
router.delete("/logout", Logout);

export default router;
