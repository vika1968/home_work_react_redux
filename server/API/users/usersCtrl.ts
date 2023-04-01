import express from "express";
import UserModel, { UserValidation } from "./userModel";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
const saltRounds = 10;

export async function register(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Couldn't get all fields from req.body");

    const { error } = UserValidation.validate({ email, password });
    if (error) throw error;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const userDB = new UserModel({ email, password: hash });
    await userDB.save();

    //sending cookie
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

//---- Register new user -----
// export async function register(req: express.Request, res: express.Response) {
//   try {

//     const { username, password } = req.body;

//     if (!username || !password) throw new Error("Not all requered fields from client on FUNCTION register in file userCtrl");

//     const { error } = UserValidation.validate({
//       username,
//       password
//     });
//     if (error) throw error;

//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hash = bcrypt.hashSync(password, salt);

//     const userDB = new UserModel({ username, password: hash });
//     await userDB.save();

//     const cookie = { userId: userDB._id };
//     const secret = process.env.JWT_SECRET;
//     if (!secret) throw new Error("Couldn't load secret from .env");
//     if (!userDB) throw new Error("No user was created");

//     const JWTCookie = jwt.encode(cookie, secret);

//     if (userDB) {
//       res.cookie("userID", JWTCookie);
//       res.send({ success: true, userDB });
//     } else {
//       res.send({ register: false });
//     }

//   } catch (error: any) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// }
// export async function login(req: express.Request, res: express.Response) {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       throw new Error("Couldn't get all fields from req.body");

//     const userDB = await UserModel.findOne({ email }); // userDB: {email: gili@gili.com, password: dfjkghfudhgvukzdfhgvz}
//     if (!userDB) throw new Error("User with that email can't be found");
//     if (!userDB.password) throw new Error("No password in DB");

//     const isMatch = await bcrypt.compare(password, userDB.password);
//     if (!isMatch) throw new Error("Email or password do not match");

//     //sending cookie
//     const cookie = { userId: userDB._id };
//     const secret = process.env.JWT_SECRET;
//     if (!secret) throw new Error("Couldn't load secret from .env");

//     const JWTCookie = jwt.encode(cookie, secret);
//     userDB.password = undefined //not on DB: userDB: {email: gili@gili.com, password: undefiend}
//     res.cookie("userID", JWTCookie);
//     res.send({ login: true, userDB });
//   } catch (error: any) {
//     res.status(500).send({ error: error.message });
//   }
// }

//---- Login user -----
export async function login(req: express.Request, res: express.Response) {
  try {
    console.log('req')
    const { email, password } = req.body;

    const userDB = await UserModel.findOne({ email });
    if (!userDB) throw new Error("Username (email) don't match");

    const isMatch = await bcrypt.compare(email, userDB.email!);
    if (!isMatch) throw new Error("Username (email) and Password don't match");

    const cookie = { userId: userDB._id };
    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error("Couldn't load secret from .env");
    const JWTCookie = jwt.encode(cookie, secret);

    res.cookie("userID", JWTCookie);
    res.send({ success: true, userDB: userDB });
    
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
}

export async function logout(req: express.Request, res: express.Response) {
  try {
    res.clearCookie("userID");
    res.send({ logout: true });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
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
    if (!userDB)
      throw new Error(`Couldn't find user id with the id: ${userId}`);
    userDB.password = undefined;
    res.send({ userDB });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

//get All documents
export async function getAllUsers(req: express.Request, res: express.Response) {
  try {
    const usersDB = await UserModel.find();
    res.send({ usersDB });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}
export async function getUserByCookie(req: express.Request, res: express.Response) {
  try {
    res.send({ test: "test" });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

//get user by id
export async function getUserById(req: express.Request, res: express.Response) {
  try {
    const userDB = await UserModel.findById(req.params.id);
    res.send({ userDB });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

export async function updateUserByID(req: express.Request, res: express.Response) {
  try {
    //who to change? // to what information // option - send new doc / run the validations again
    const userDB = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send({ userDB });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

export async function deleteUserByID(req: express.Request, res: express.Response) {
  try {
    //who to change? // to what information // option - send new doc
    const userDB = await UserModel.findByIdAndDelete(req.params.id);
    res.send({ userDB });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}
