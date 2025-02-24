import express from "express";
import dotenv from "dotenv";
import { try_connect } from "./controller/db.js";

import get_current_table from "./routes/get_current_table.js";
import home_detect_connection from "./routes/home_detect_connection.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/", home_detect_connection);

app.use("/api/get_current_table", get_current_table);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  //   这里调用try_connect()
  try_connect();
});
