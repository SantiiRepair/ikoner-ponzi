import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Widraw = db.define(
  "withdrawals",
  {
    username: {
      type: DataTypes.STRING,
    },
    to: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    updatedAt: {
      type: DataTypes.toString(),
    },
  },
  {
    freezeTableName: true,
  },
);

export default Widraw;
