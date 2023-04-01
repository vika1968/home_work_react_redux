// import express from "express";
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import UserModel from "./userModel";
// const saltRounds = 10;
import express from "express";
import ProductsModel from "./productsModel";
import UserModel from "../users/userModel";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
const saltRounds = 10;

export async function insertProductsAll(req: express.Request, res: express.Response) {
  try {

    const { rname, imgdata, address, delimg, somedata, price, rating, arrimg, qnty } = req.body;

  //  if (!rname || !imgdata || !address || !delimg || !somedata || !price || !rating || !arrimg || !qnty) throw new Error("Problem on FUNCTION insertProducts in file productsCtrl");

    const productsCollection = await ProductsModel.create({ rname, imgdata, address, delimg, somedata, price, rating, arrimg, qnty });
    if (!productsCollection) throw new Error("ProductsModel table with products wasn't created")

    if (productsCollection) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

export async function showUser(req: express.Request, res: express.Response) {
  try {

    const secret = process.env.JWT_SECRET;

    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userID } = req.cookies;

    //console.log(req.cookies);   

    if (!userID) throw new Error("Couldn't find user from cookies");

    const decodedUserId = jwt.decode(userID, secret);
    const { userId } = decodedUserId;

    //const { userId } = userID;

    const userDB = await UserModel.findById(userId);
    if (!userDB)
      throw new Error(`Couldn't find user id with the id: ${userID}`);

    res.send({ userDB });

  } catch (error: any) {
    res.send({ error: error.message });
  }
}

export async function insertProducts(req: express.Request, res: express.Response) {
  try {

    const { category, image, title, price } = req.body;

    if (!category || !image || !title || !price) throw new Error("Problem on FUNCTION insertProducts in file productsCtrl");

    const productsCollection = await ProductsModel.create({ category, image, title, price });
    if (!productsCollection) throw new Error("ProductsModel table with products wasn't created")

    if (productsCollection) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

//get All produsta
export async function getAllProducts(req: express.Request, res: express.Response) {
  try {
    
    const productsDB = await ProductsModel.find();
    res.send({ productsDB });

  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

//get product by id
export async function getProductById(req: express.Request, res: express.Response) {
  try {
    const prodID = await ProductsModel.findById(req.params._id);
    res.send({ prodID });

  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

export async function getProductTitleById(req: express.Request, res: express.Response) {
  try {
    // console.log(`products`)   

    const { _id } = req.body;

    const data = await ProductsModel.findById(_id);
    if (!data)
      throw new Error(`Couldn't find product title with the id: ${_id}`);

    if (data) {
      res.send({ success: true, data });
    } else {
      res.send({ success: false });
    }

  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

export async function getProductByCategory(req: express.Request, res: express.Response) {
  try {

    const { category: chosedCategory } = req.body
    // const pattern = RegExp(chosedCategory)

    const productsDB = await ProductsModel.find({ 'category': chosedCategory })
    // const productsDB = await ProductsModel.find({'category':{ $regex : pattern}})   

    if (productsDB) {
      res.send({ success: true, productsDB });
    } else {
      res.send({ success: false });
    }

  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}

// export async function logout(req: express.Request, res: express.Response) {
//   try {
//     res.clearCookie("userID");
//     res.send({ logout: true });
//   } catch (error: any) {
//     res.status(500).send({ error: error.message });
//   }
// }


