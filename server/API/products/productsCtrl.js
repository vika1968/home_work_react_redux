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
exports.getProductByCategory = exports.getProductTitleById = exports.getProductById = exports.getAllProducts = exports.insertProducts = exports.showUser = exports.insertProductsAll = void 0;
const productsModel_1 = __importDefault(require("./productsModel"));
const userModel_1 = __importDefault(require("../users/userModel"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const saltRounds = 10;
function insertProductsAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { rname, imgdata, address, delimg, somedata, price, rating, arrimg, qnty } = req.body;
            //  if (!rname || !imgdata || !address || !delimg || !somedata || !price || !rating || !arrimg || !qnty) throw new Error("Problem on FUNCTION insertProducts in file productsCtrl");
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
function showUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret)
                throw new Error("Couldn't load secret from .env");
            const { userID } = req.cookies;
            //console.log(req.cookies);   
            if (!userID)
                throw new Error("Couldn't find user from cookies");
            const decodedUserId = jwt_simple_1.default.decode(userID, secret);
            const { userId } = decodedUserId;
            //const { userId } = userID;
            const userDB = yield userModel_1.default.findById(userId);
            if (!userDB)
                throw new Error(`Couldn't find user id with the id: ${userID}`);
            res.send({ userDB });
        }
        catch (error) {
            res.send({ error: error.message });
        }
    });
}
exports.showUser = showUser;
function insertProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { category, image, title, price } = req.body;
            if (!category || !image || !title || !price)
                throw new Error("Problem on FUNCTION insertProducts in file productsCtrl");
            const productsCollection = yield productsModel_1.default.create({ category, image, title, price });
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
exports.insertProducts = insertProducts;
//get All produsta
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
//get product by id
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prodID = yield productsModel_1.default.findById(req.params._id);
            res.send({ prodID });
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
}
exports.getProductById = getProductById;
function getProductTitleById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(`products`)   
            const { _id } = req.body;
            const data = yield productsModel_1.default.findById(_id);
            if (!data)
                throw new Error(`Couldn't find product title with the id: ${_id}`);
            if (data) {
                res.send({ success: true, data });
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
exports.getProductTitleById = getProductTitleById;
function getProductByCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { category: chosedCategory } = req.body;
            // const pattern = RegExp(chosedCategory)
            const productsDB = yield productsModel_1.default.find({ 'category': chosedCategory });
            // const productsDB = await ProductsModel.find({'category':{ $regex : pattern}})   
            if (productsDB) {
                res.send({ success: true, productsDB });
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
exports.getProductByCategory = getProductByCategory;
// export async function logout(req: express.Request, res: express.Response) {
//   try {
//     res.clearCookie("userID");
//     res.send({ logout: true });
//   } catch (error: any) {
//     res.status(500).send({ error: error.message });
//   }
// }
