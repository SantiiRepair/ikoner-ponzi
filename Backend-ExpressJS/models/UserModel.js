import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    username:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
    balance:{
        type: DataTypes.INTEGER
    },
    vip:{
        type: DataTypes.INTEGER
    },
    levelTime:{
        type: DataTypes.INTEGER
    },
    daily:{
        type: DataTypes.INTEGER
    },
    ref_code:{
        type: DataTypes.STRING
    },
    user_code:{
        type: DataTypes.STRING
    },
    ipv4:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    }
    
},{
    freezeTableName:true
});

export default Users;
