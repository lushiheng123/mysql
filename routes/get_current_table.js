import { Router } from "express";
import { get_table } from "../controller/query_get_current_table.js";
const router = Router();

router.get("/", get_table);

export default router;
