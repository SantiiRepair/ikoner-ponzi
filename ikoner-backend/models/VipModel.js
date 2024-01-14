import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Vip = db.define(
  "vip",
  {
    username: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  },
);

export default Vip;
