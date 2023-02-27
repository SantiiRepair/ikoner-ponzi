import {Sequelize} from "sequelize";

const db = new Sequelize('ikonerdb','ikoner','ikoner1234',{
    host: "db4free.net",
    dialect: "mysql"
});

export default db;
