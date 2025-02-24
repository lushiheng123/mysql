import { Router } from "express";
import { read_xlsx_content } from "../controller/read_xlsx_content.js";
import { insertData } from "../controller/add_to_mysql.js";
const router = Router();
router.get("/", read_xlsx_content);
// 这里创建了post的接口
router.post("/", insertData);
export default router;
