import express from "express";

import { saveUser, loginUser, googleLogin } from "../controller/user.controller.js";
const userRouter = express.Router();

userRouter.post("/", saveUser);
userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);

export default userRouter;
