import ora from "ora";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import referralCodes from "referral-codes";

import users from "../models/userModel.js";

export const register = async (req, res) => {
  const load = ora({
    color: "green",
    hideCursor: true,
  }).start();
  const { password, confPassword } = req.body;
  const balance = 9;
  const verifyUsername = await users.findOne({
    where: { username: req.body.username },
  });
  if (verifyUsername) {
    res.status(400).json({ msg: "Username Already Registered" });
  } else {
    const verifyEmail = await users.findOne({
      where: { email: req.body.email },
    });
    if (verifyEmail) {
      res.status(400).json({ msg: "Email Already Registered" });
    } else {
      if (password !== confPassword)
        return res
          .status(400)
          .json({ isAlert: "error", msg: "Check Password" });
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const verifyCode = await users.findOne({
        where: { user_code: req.body.ref_code },
      });
      if (!verifyCode) {
        res.status(400).json({ msg: "Invitation Code Error" });
      } else {
        const generateCode = referralCodes.generate({
          length: 6,
          charset: referralCodes.charset(referralCodes.Charset.ALPHANUMERIC),
        });
        const user_code = generateCode.toString();
        try {
          await users.create({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            balance: balance,
            user_code: user_code,
            ref_code: req.body.ref_code,
            ipv4: req.body.ipv4,
          });
          res.status(200).json({ msg: "Register Success" });
        } catch (error) {
          console.log(error);
          res.status(404).json({ msg: "Operation Failed!" });
        }
      }
    }
  }
};

export const login = async (req, res) => {
  try {
    const user = await users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match)
      return res.status(400).json({ isAlert: "error", msg: "Wrong Password" });
    const userId = user[0].id;
    const username = user[0].username;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, username, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      },
    );
    const refreshToken = jwt.sign(
      { userId, username, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
    );
    await users.update(
      { refresh_token: refreshToken, ipv4: req.body.ipv4 },
      {
        where: {
          id: userId,
        },
      },
    );
    res.cookie("rt_se", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ accessToken, msg: "Login Success" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ isAlert: "error", msg: "Account Error" });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    },
  );
  res.clearCookie("rt_se");
  return res.sendStatus(200);
};
