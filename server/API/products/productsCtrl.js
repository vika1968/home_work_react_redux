"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.insertProductsAll = void 0;
const productsModel_1 = __importDefault(require("./productsModel"));
// insert All produsta
function insertProductsAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { rname, imgdata, address, delimg, somedata, price, rating, arrimg, qnty } = req.body;
            const productsCollection = yield productsModel_1.default.create({ rname, imgdata, address, delimg, somedata, price, rating, arrimg, qnty });
            if (!productsCollection)
                throw new Error("ProductsModel table with products wasn't created");
            if (productsCollection) {
                res.send({ success: true });
            }
            else {
                res.send({ success: false });
            }
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
}
exports.insertProductsAll = insertProductsAll;
// get All produsta
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productsDB = yield productsModel_1.default.find();
            res.send({ productsDB });
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
}
exports.getAllProducts = getAllProducts;
