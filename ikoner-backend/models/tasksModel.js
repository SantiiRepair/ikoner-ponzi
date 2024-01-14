import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Tasks = db.define(
  "tasks",
  {
    username: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.STRING,
    },
    amountTask: {
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

export default Tasks;
