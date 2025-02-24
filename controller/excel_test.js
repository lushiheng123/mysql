// Filename: write.js

import reader from "xlsx";

// Reading our test file
const file = reader.readFile("./data.xlsx");

// Sample data set
let student_data = [
  {
    Student: "Nikhil",
    Age: 22,
    Branch: "ISE",
    Marks: 70,
  },
  {
    Student: "Amitha",
    Age: 21,
    Branch: "EC",
    Marks: 80,
  },
];

const ws = reader.utils.json_to_sheet(student_data);

reader.utils.book_append_sheet(file, ws, "Sheet3");

// Writing to our file
reader.writeFile(file, "./data.xlsx");
