import express from "express";
import { login, register, getUser, updateUser, deleteUser, getUserByID } from "./usersCtrl";

const router = express.Router();

router
//   .get("/:id", getUserByID)
//   .get("/get-user-by-cookie", getUser)
//   .post("/login", login)
//   .post("/register", register)
//   .put("/update-user", updateUser)
//   .delete("/:id", deleteUser)
// //  .get("/reducer/get-user-by-cookie", getUser)  
.get("/:id", getUserByID)
.get("/retrieve/get-user-by-cookie", getUser)
.post("/login", login)
.post("/register", register)
.put("/update-user", updateUser)
.delete("/:id", deleteUser)
 


export default router;
