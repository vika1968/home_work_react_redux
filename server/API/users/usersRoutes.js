"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersCtrl_1 = require("./usersCtrl");
const router = express_1.default.Router();
router
    //   .get("/:id", getUserByID)
    //   .get("/get-user-by-cookie", getUser)
    //   .post("/login", login)
    //   .post("/register", register)
    //   .put("/update-user", updateUser)
    //   .delete("/:id", deleteUser)
    // //  .get("/reducer/get-user-by-cookie", getUser)  
    .get("/:id", usersCtrl_1.getUserByID)
    .get("/retrieve/get-user-by-cookie", usersCtrl_1.getUser)
    .post("/login", usersCtrl_1.login)
    .post("/register", usersCtrl_1.register)
    .put("/update-user", usersCtrl_1.updateUser)
    .delete("/:id", usersCtrl_1.deleteUser);
exports.default = router;
