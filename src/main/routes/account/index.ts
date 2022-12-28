import signup from "./add-account";
import { Router } from "express";
const router = Router();
router.use("/account", signup);
export default router;
