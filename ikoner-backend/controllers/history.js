import users from "../models/userModel.js";
import Widraw from "../models/withdrawalModel.js";
import Rechge from "../models/rechargeModel.js";
import Tasks from "../models/tasksModel.js";
import ora from "ora";

// Withdrawals History ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const WithdrawalsHistory = async (req, res) => {
  try {
    const load = ora({
      color: "green",
      hideCursor: true,
    }).start();
    const { userId, username } = req.body;
    const wthistory = await Widraw.findAll({
      where: {
        username: username,
      },
      attributes: ["id", "amount", "status", "updatedAt"],
    });
    res.json(wthistory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Operation Failed" });
  }
};

// Recharges History ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const RechargesHistory = async (req, res) => {
  try {
    const load = ora({
      color: "green",
      hideCursor: true,
    }).start();
    const { userId, username } = req.body;
    const rghistory = await Rechge.findAll({
      where: {
        username: username,
      },
      attributes: ["id", "amount", "status", "updatedAt"],
    });
    res.json(rghistory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Operation Failed" });
  }
};

// Tasks History ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const TasksHistory = async (req, res) => {
  try {
    const load = ora({
      color: "green",
      hideCursor: true,
    }).start();
    const { userId, username } = req.body;
    const tkhistory = await Tasks.findAll({
      where: {
        username: username,
      },
      attributes: ["id", "amountTask", "status", "updatedAt"],
    });
    res.json(tkhistory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Operation Failed" });
  }
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
