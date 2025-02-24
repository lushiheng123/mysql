import { executeQuery } from "./db.js";
import { getData } from "./read_xlsx_content.js";

export const insertData = async (req, res) => {
  try {
    const data = getData(); // 获取 Excel 数据
    const query = `
      INSERT INTO IDCARD (name, age, id_card_number, birth_date, email, create_time)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    for (let row of data) {
      const values = [
        row.name,
        row.age,
        row.id_card_number,
        row.birth_date,
        row.email,
      ];
      await executeQuery(query, values);
    }

    console.log("Data successfully inserted into MySQL!");
    res.status(200).send("Data successfully inserted into MySQL!");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Error inserting data: " + error.message);
  }
};
