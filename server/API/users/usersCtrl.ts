import express from "express";
import UserModel, { UserValidation } from "./userModel";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
const saltRounds = 10;

export async function register(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Not all fields are available from req.body");

    const { error } = UserValidation.validate({ email, password });
    if (error) throw error;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const userDB = new UserModel({ email, password: hash });
    await userDB.save();

    //creating cookie
    const cookie = { userId: userDB._id };
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const JWTCookie = jwt.encode(cookie, secret);    

    if (userDB) {
      res.cookie("userID", JWTCookie);
      res.send({ success: true, userDB });
    } else {
      res.send({ success: false });
    }
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

export async function login(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Not all fields are available from req.body");

    const userDB = await UserModel.findOne({ email });
    if (!userDB) throw new Error("User with that email can't be found");
    if (!userDB.password) throw new Error("No password in DB");

    const isMatch = await bcrypt.compare(password, userDB.password);
    if (!isMatch) throw new Error("Email or password do not match");

    //creating cookie
    const cookie = { userId: userDB._id };
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const JWTCookie = jwt.encode(cookie, secret);
    res.cookie("userID", JWTCookie);
    res.send({ success: true, userDB });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
}


export async function getUser(req: express.Request, res: express.Response) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userID } = req.cookies;
  
    if (!userID) throw new Error("Couldn't find user from cookies");

    const decodedUserId = jwt.decode(userID, secret);
    const { userId } = decodedUserId;

    const userDB = await UserModel.findById(userId);
    if (!userDB) throw new Error(`Couldn't find user id with the id: ${userID}`);
    userDB.password = undefined;
    res.send({ userDB });

  } catch (error:any) {
    res.status(500).send({ error: error.message });
  }
}


