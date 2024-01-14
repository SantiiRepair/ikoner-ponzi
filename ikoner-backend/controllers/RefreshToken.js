import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userId = user[0].id;
        const username = user[0].username;
        const user_code = user[0].user_code;
        const ref_code = user[0].ref_code;
        const address = user[0].address;
        const balance = user[0].balance;
        const vip = user[0].vip;
        const daily = user[0].daily;
        const email = user[0].email;
        const accessToken = jwt.sign(
          {
            userId,
            username,
            email,
            balance,
            address,
            vip,
            ref_code,
            user_code,
            daily,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          },
        );
        res.json({ accessToken });
      },
    );
  } catch (error) {
    console.log(error);
  }
};
