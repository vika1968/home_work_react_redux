import express from "express";
import { login, register, getUser } from "./usersCtrl";

const router = express.Router();

router
  .get("/get-user-by-cookie", getUser)
  .post("/login", login)
  .post("/register", register);

export default router;
