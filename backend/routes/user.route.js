import express from "express";

import { saveUser, loginUser } from "../controller/user.controller.js";
const userRouter = express.Router();

userRouter.post("/", saveUser);
userRouter.post("/login", loginUser);

export default userRouter;
