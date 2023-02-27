import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import ora from 'ora';
import db from "./config/Database.js";
import reloadApp from "./controllers/ReloadApp.js";
import router from "./routes/index.js";
dotenv.config();

const load = ora({
    color: 'green',
    hideCursor: true
 }).start();

const app = express();

try {
    await db.authenticate();
    load.succeed('Database Connected...');
    reloadApp();
} catch (error) {
    console.error(error);
}

app.use(cors({ credentials:true, origin:'https://vshop.uno' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, ()=> load.succeed('Server running at port 5000'));
