import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.MYSQL_HOST,
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export const try_connect = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to the MySQL database");
    await connection.end();
  } catch (error) {
    console.log("Error connecting to the MySQL database:", error);
  }
};

export const executeQuery = async (query, params) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(query, params);
    await connection.end();
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
};
