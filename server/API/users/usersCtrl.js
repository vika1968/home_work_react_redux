"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getUserByID = exports.deleteUser = exports.updateUser = exports.getUser = exports.login = exports.register = void 0;
const userModel_1 = __importStar(require("./userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const bson_1 = require("bson");
const saltRounds = 10;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                throw new Error("Not all fields are available from req.body");
            const { error } = userModel_1.UserValidation.validate({ email, password });
            if (error) {
                return res.status(500).send({ success: false, error: "A user with this email address already exists." });
            }
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            const hash = bcrypt_1.default.hashSync(password, salt);
            const userDB = new userModel_1.default({ email, password: hash });
            yield userDB.save();
            //creating cookie
            const cookie = { userId: userDB._id };
            const secret = process.env.JWT_SECRET;
            if (!secret)
                throw new Error("Couldn't load secret from .env");
            const JWTCookie = jwt_simple_1.default.encode(cookie, secret);
            if (userDB) {
                res.cookie("userID", JWTCookie);
                res.send({ success: true, userDB });
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
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                throw new Error("Not all fields are available from req.body");
            const userDB = yield userModel_1.default.findOne({ email });
            if (!userDB)
                throw new Error("User with that email can't be found");
            if (!userDB.password)
                throw new Error("No password in DB");
            const isMatch = yield bcrypt_1.default.compare(password, userDB.password);
            if (!isMatch)
                throw new Error("Email or password don't match");
            //creating cookie
            const cookie = { userId: userDB._id };
            const secret = process.env.JWT_SECRET;
            if (!secret)
                throw new Error("Couldn't load secret from .env");
            const JWTCookie = jwt_simple_1.default.encode(cookie, secret);
            res.cookie("userID", JWTCookie);
            res.send({ success: true, userDB });
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.login = login;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret)
                throw new Error("Couldn't load secret from .env");
            const { userID } = req.cookies;
            if (!userID)
                throw new Error("Couldn't find user from cookies");
            const decodedUserId = jwt_simple_1.default.decode(userID, secret);
            const { userID: userId } = decodedUserId;
            const userDB = yield userModel_1.default.findById(decodedUserId.userId);
            if (!userDB)
                throw new Error(`Couldn't find user id with the id: ${decodedUserId.userId}`);
            userDB.password = undefined;
            res.send({ success: true, userDB });
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
}
exports.getUser = getUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, id } = req.body;
            if (!email || !password || !id) {
                throw new Error('No data received from the user.');
            }
            const { error } = userModel_1.UserValidation.validate({ email, password });
            if (error) {
                return res.status(500).send({
                    success: false,
                    error: error.message,
                });
            }
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            const hash = bcrypt_1.default.hashSync(password, salt);
            const filter = { _id: new bson_1.ObjectId(id) };
            const update = { $set: { email, password: hash } };
            const result = yield userModel_1.default.updateOne(filter, update);
            if (result.modifiedCount === 0) {
                return res.status(500).send({
                    success: false,
                    error: "Failed to update user data",
                });
            }
            const secret = process.env.JWT_SECRET;
            if (!secret)
                return res.status(500).send({ success: false, error: "Couldn't load secret code from .env" });
            const cookie = { userID: id };
            const JWTCookie = jwt_simple_1.default.encode(cookie, secret);
            res.cookie("userID", JWTCookie);
            res.send({ success: true, userArray: result });
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ error: "Missing user ID." });
            }
            const result = yield userModel_1.default.deleteOne({ _id: new bson_1.ObjectId(id) });
            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "No user found with the specified ID." });
            }
            res.clearCookie('userID');
            return res.status(200).json({ success: "The user has been deleted." });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });
}
exports.deleteUser = deleteUser;
function getUserByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ error: "Missing user ID." });
            }
            const user = yield userModel_1.default.findOne({ _id: new bson_1.ObjectId(id) });
            if (!user) {
                return res.status(404).json({ error: "No user found with the specified ID." });
            }
            return res.status(200).json({ success: "User found.", user: user });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });
}
exports.getUserByID = getUserByID;
