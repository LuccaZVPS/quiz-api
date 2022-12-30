import signup from "./add-account";
import auth from "./auth";

import { Router } from "express";
const router = Router();
router.use("/account", signup);
router.use("/account", auth);
export default router;
