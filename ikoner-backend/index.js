import ora from "ora";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import router from "./routes/index.js";
import db from "./config/database.js";
import reloadApp from "./controllers/reloadApp.js";

dotenv.config();

const load = ora({
  color: "green",
  hideCursor: true,
}).start();

const app = express();

try {
  await db.authenticate();
  load.succeed("Database Connected...");
  reloadApp();
} catch (error) {
  console.error(error);
}

app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => load.succeed("Server running at port 5000"));
