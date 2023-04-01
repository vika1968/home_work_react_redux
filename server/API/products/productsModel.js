"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductsSchema = new mongoose_1.default.Schema({
    rname: {
        type: String,
        unique: false,
        requiered: true
    },
    imgdata: {
        type: String,
        unique: false,
        requiered: true
    },
    address: {
        type: String,
        unique: false,
        requiered: true
    },
    delimg: {
        type: String,
        unique: false,
        requiered: true
    },
    somedata: {
        type: String,
        unique: false,
        requiered: true
    },
    price: {
        type: Number,
        unique: false,
        requiered: true
    },
    rating: {
        type: String,
        unique: false,
        requiered: true
    },
    arrimg: {
        type: String,
        unique: false,
        requiered: true
    },
    qnty: {
        type: Number,
        unique: false,
        requiered: true
    },
});
const ProductsModel = mongoose_1.default.model("products", ProductsSchema);
exports.default = ProductsModel;
