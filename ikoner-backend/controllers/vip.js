import users from "../models/userModel.js";
import Vip from "../models/vipModel.js";

export const levelOne = async (req, res) => {
  const { username, balance, userId, vip } = req.body;
  const price = 15;
  const level = 1;
  const levelTime = 7;
  try {
    const match = await (balance >= price);
    if (!match) return res.status(401).json({ msg: "Insuficient Balance" });
    if (vip === 1) return res.status(400).json({ msg: "Owned Same Level" });

    console.log("Saving Data...");

    await Vip.create({
      username: username,
      level: level,
    });

    console.log("Updating Balance...");

    const updateBalance = await (balance - price);
    await users.update(
      {
        balance: updateBalance,
        vip: 1,
        levelTime: 7,
      },
      {
        where: {
          id: userId,
        },
      },
    );
    console.log("Done!");
    res.status(200).json({ msg: "Updated Success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Operation Failed" });
  }
};

export const levelTwo = async (req, res) => {
  const { username, balance, userId } = req.body;
  const price = 250;
  const level = 2;
  const levelTime = 7;

  try {
    const match = await (balance >= price);
    if (!match)
      return res
        .status(401)
        .json({ isAlert: "error", msg: "Insuficient Balance" });
    res.status(403).json({ msg: "Server Error Wait" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Operation Failed" });
  }
};

export const levelPremium = async (req, res) => {
  const { username, balance, userId } = req.body;
  try {
    res.status(401).json({ msg: "Waiting Event Soon" });
  } catch (error) {
    res.status(400).json({ msg: "Operation Failed" });
  }
};
