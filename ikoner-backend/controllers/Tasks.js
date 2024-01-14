import Users from "../models/UserModel.js";
import Tasks from "../models/TasksModel.js";
import ora from "ora";

export const Task = async (req, res) => {
  try {
    const load = ora({
      color: "green",
      hideCursor: true,
    }).start();
    const { username, balance, userId, vip, daily } = req.body;
    const required = 1;
    const status = "Success";
    const amountTask = 1;
    const tryToday = 1;

    const isVip = await (required <= vip);
    if (!isVip)
      return res.status(401).json({ isAlert: "info", msg: "Havent Vip Level" });
    const maxTry = await (daily < 2);
    if (!maxTry)
      return res.status(401).json({ isAlert: "info", msg: "Try Today Over" });
    await Tasks.create({
      username: username,
      level: vip,
      amountTask: amountTask,
      status: status,
    });
    const updateBalance = await (balance + amountTask);
    const updateDaily = await (daily + tryToday);
    await Users.update(
      {
        balance: updateBalance,
        daily: updateDaily,
      },
      {
        where: {
          id: userId,
        },
      },
    );
    load.succeed("Task succeded!");
    res.status(200).json({ isAlert: "error", msg: "Success Operation!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ isAlert: "error", msg: "Operation Failed" });
  }
};
