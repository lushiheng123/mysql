import { executeQuery } from "./db.js";
export const get_table = async (req, res) => {
  console.log(`API called: ${req.method} ${req.url}`);
  try {
    const rows = await executeQuery("SELECT * FROM chat_data");
    res.json(rows);
  } catch (error) {
    res.status(500).send("Error executing query");
  }
};
