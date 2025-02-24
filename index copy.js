import express from "express";
import dotenv from "dotenv";

import mysql from "mysql2/promise";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const dbConfig = {
  host: process.env.MYSQL_HOST,
  // 端口不加似乎也行
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const try_connect = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to the MySQL database");
    await connection.end();
  } catch (error) {
    console.log("Error connecting to the MySql database:", error);
  }
};

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(`API called: ${req.method} ${req.url}`);
});
app.get("/data", async (req, res) => {
  console.log(`API called: ${req.method} ${req.url}`);
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM chat_data");
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  //   这里调用try_connect()
  try_connect();
});
