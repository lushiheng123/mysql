import reader from "xlsx";

// 读取 Excel 文件
const file = reader.readFile("./data.xlsx");

let data = [];

const sheets = file.SheetNames;

for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]], {
    header: 1,
  }); // 保留表头为数组，便于跳过

  // 跳过第一行（表头），从第二行开始处理数据
  for (let j = 1; j < temp.length; j++) {
    const row = temp[j];
    if (row.length > 0) {
      // 确保行不为空
      // 假设 Excel 列顺序：名字（A）、年龄（B）、身份证号（C）、出生日期（D）、Email（E）
      const name = row[0]; // 名字
      const age = row[1] ? parseInt(row[1], 10) : null; // 年龄，转换为整数或 NULL
      const idCardNumber = row[2] ? row[2].toString() : null; // 身份证号，转换为字符串或 NULL
      const birthDate = row[3] ? formatDate(row[3]) : null; // 出生日期，转换为 YYYY-MM-DD 或 NULL
      const email = row[4] ? row[4].toString() : null; // Email，转换为字符串或 NULL

      data.push({
        name,
        age,
        id_card_number: idCardNumber,
        birth_date: birthDate,
        email,
      });
    }
  }
}

// 日期格式化函数：将各种日期格式转换为 YYYY-MM-DD
function formatDate(dateValue) {
  if (!dateValue) return null;
  // 如果是字符串（如 "1999/12/10" 或 "2000-02-09"）
  if (typeof dateValue === "string") {
    // 尝试解析多种格式
    const parsedDate = new Date(dateValue);
    if (isNaN(parsedDate.getTime())) {
      // 如果解析失败，尝试特定格式（如 MM/DD/YYYY 或 YYYY/MM/DD）
      const parts = dateValue.split(/[/-]/);
      if (parts.length === 3) {
        const year =
          parseInt(parts[0], 10) > 1900
            ? parseInt(parts[0], 10)
            : parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10) - 1; // 月份从 0 开始
        const day =
          parseInt(parts[0], 10) < 32
            ? parseInt(parts[0], 10)
            : parseInt(parts[1], 10);
        parsedDate = new Date(year, month, day);
      }
    }
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString().split("T")[0]; // 转换为 YYYY-MM-DD
    }
  }
  // 如果是 Excel 日期序列号（如 44197 表示 2020-12-31），需要转换
  if (typeof dateValue === "number") {
    const excelEpoch = new Date(1899, 11, 30); // Excel 的基准日期
    const date = new Date(
      excelEpoch.getTime() + (dateValue - 1) * 24 * 60 * 60 * 1000
    );
    return date.toISOString().split("T")[0];
  }
  return null; // 无法解析时返回 NULL
}
//可以看一眼输出data
// console.log(data);
export const read_xlsx_content = (req, res) => {
  res.json(data);
};

export const getData = () => {
  return data;
};
