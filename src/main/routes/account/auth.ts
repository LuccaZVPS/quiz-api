import { makeAuthController } from "../../../../src/main/factories/auth-controller";
import { Router } from "express";
const router = Router();
router.post("/", async (req, res) => {
  const signUpController = makeAuthController();
  const response = await signUpController.handle(req);
  res.status(response.statusCode).json(response.body);
});
export default router;
