import users from "../models/userModel.js";
import ora from "ora";

export const Team = async (req, res) => {
  try {
    const load = ora({
      color: "green",
      hideCursor: true,
    }).start();
    const { userId, user_code, ref_code } = req.body;
    const users = await users.findAll({
      where: {
        ref_code: user_code,
      },
      attributes: ["id", "username", "balance"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Operation Failed" });
  }
};
