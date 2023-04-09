"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsCtrl_1 = require("./productsCtrl");
const router = express_1.default.Router();
router
    .get("", productsCtrl_1.getAllProducts)
    .post("/insert-productsall", productsCtrl_1.insertProductsAll);
exports.default = router;
