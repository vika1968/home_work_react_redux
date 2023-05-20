import express from "express";
import UserModel, { UserValidation } from "./userModel";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import { ObjectId } from 'bson';

const saltRounds = 10;

export async function register(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password)     
     throw new Error("Not all fields are available from req.body");

    
    const { error } = UserValidation.validate({ email, password });
    if (error) {
        return res.status(500).send({ success: false, error: "A user with this email address already exists." });
    }

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
    if (!isMatch) throw new Error("Email or password don't match");

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
    //console.log(userID)
    if (!userID) throw new Error("Couldn't find user from cookies");

    const decodedUserId = jwt.decode(userID, secret);
    const { userID: userId } = decodedUserId;   
    
    console.log(decodedUserId);
    console.log(userId);

    const userDB = await UserModel.findById(userId);  
    
    if (!userDB) throw new Error(`Couldn't find user id with the id: ${userId}`);
    userDB.password = undefined;
    res.send({ userDB });

  } catch (error:any) {
    res.status(500).send({ error: error.message });
  }
}


export async function updateUser(req: express.Request, res: express.Response) {
  try {
    const { email, password, id } = req.body;

 
    if (!email || !password || !id) {
      throw new Error('No data received from the user.');
    }
    const { error } = UserValidation.validate({ email, password });
    if (error) {
      return res.status(500).send({
        success: false,
        error: error.message,
      });
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

   
    const filter = { _id: new ObjectId(id) };
    const update = { $set: { email, password: hash } };

    const result = await UserModel.updateOne(filter, update);

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
    const JWTCookie = jwt.encode(cookie, secret);
    //console.log(cookie)
    res.cookie("userID", JWTCookie);
    res.send({ success: true, userArray: result });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
}


export async function deleteUser(req: express.Request, res: express.Response) {
  try {
    const id = req.params.id;  
    if (!id) {
      return res.status(400).json({ error: "Missing user ID." });
    }

    const result = await UserModel.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No user found with the specified ID." });
    }

    res.clearCookie('userID');
    return res.status(200).json({ success: "The user has been deleted." });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}


export async function getUserByID(req: express.Request, res: express.Response) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Missing user ID." });
    }

    const user = await UserModel.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ error: "No user found with the specified ID." });
    }

    return res.status(200).json({ success: "User found.", user: user });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
