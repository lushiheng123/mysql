import { Router } from "express";

const router = Router();
router.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(`API called: ${req.method} ${req.url}`);
});
export default router;
