import { Router } from "express";

import {
  registerController,
  loginController,
  logoutController,
  getCurrentController,
  updateAvatarController
} from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";

import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  registerController
);

authRouter.post("/login", validateBody(authLoginSchema), loginController);
authRouter.get("/current", authenticate, getCurrentController);
authRouter.post("/logout", authenticate, logoutController);
authRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatarController);

export default authRouter;