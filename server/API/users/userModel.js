"use strict";
// import mongoose from "mongoose";
// import Joi from 'joi';
// import { joiPasswordExtendCore } from 'joi-password';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
// const joiPassword = Joi.extend(joiPasswordExtendCore);
// const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     unique: true,
//     requierd: [true, "user must have email"]
//   },
//   password: String,
// });
// const UserModel = mongoose.model("users", UserSchema);
// export default UserModel;
// export const UserValidation = Joi.object({  
// email: Joi.string().email().required(),
// // username: Joi.string().alphanum().min(3).max(16).required(),
// password: joiPassword
//     .string()
//     .min(6)
//     .max(16)
//     // .minOfSpecialCharacters(1)
//     // .minOfLowercase(1)
//     // .minOfUppercase(1)
//     // .minOfNumeric(1)
//     // .noWhiteSpaces()
//     .required(),
// repeatPassword: Joi.ref('password')});
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const joi_password_1 = require("joi-password");
const joiPassword = joi_1.default.extend(joi_password_1.joiPasswordExtendCore);
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
        requierd: [true, "user must have username (valid email address)"]
    },
    password: String
});
const UserModel = mongoose_1.default.model("users", UserSchema);
exports.default = UserModel;
exports.UserValidation = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joiPassword
        .string()
        .min(6)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .required()
});
