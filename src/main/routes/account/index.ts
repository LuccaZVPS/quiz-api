import signup from "./add-account";
import auth from "./auth";

import { Router } from "express";
const router = Router();
router.use("/account", signup);
router.use("/auth", auth);
export default router;
