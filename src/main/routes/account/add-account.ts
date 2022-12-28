import { makeSignupController } from "../../../../src/main/factories/signup-controller";
import { Router } from "express";
const router = Router();
router.post("/", async (req, res) => {
  const signUpController = makeSignupController();
  const response = await signUpController.handle(req);
  res.status(response.statusCode).json(response.body);
});
export default router;
