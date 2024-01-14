import express from "express";
import { register, login, logout } from "../controllers/users.js";
import { Withdraw } from "../controllers/withdraw.js";
import { Recharge } from "../controllers/recharge.js";
import {
  WithdrawalsHistory,
  RechargesHistory,
  TasksHistory,
} from "../controllers/history.js";
import { levelOne, levelTwo, levelPremium } from "../controllers/vip.js";
import { Task } from "../controllers/tasks.js";
import { Team } from "../controllers/referrals.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { setAddress } from "../controllers/utils.js";

const router = express.Router();

router.get("/users", verifyToken);
router.get("/token", refreshToken);
router.post("/levelOne", levelOne);
router.post("/levelTwo", levelTwo);
router.post("/levelPremium", levelPremium);
router.post("/address", setAddress);
router.post("/register", register);
router.post("/login", login);
router.post("/withdraw", Withdraw);
router.post("/recharge", Recharge);
router.post("/tasks", Task);
router.all("/withdraw/history", WithdrawalsHistory);
router.all("/recharge/history", RechargesHistory);
router.all("/tasks/history", TasksHistory);
router.all("/team", Team);
router.delete("/logout", logout);

export default router;
