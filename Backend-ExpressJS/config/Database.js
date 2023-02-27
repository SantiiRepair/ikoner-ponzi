import {Sequelize} from "sequelize";

const db = new Sequelize('ikoner','ikoner','ikoner1234',{
    host: "db4free.net",
    dialect: "mysql"
});

export default db;
