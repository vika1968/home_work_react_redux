import express from "express";
import ProductsModel from "./productsModel";

// insert All produsta
export async function insertProductsAll(req: express.Request, res: express.Response) {
  try {

    const { rname, imgdata, address, delimg, somedata, price, rating, arrimg, qnty } = req.body;
  
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

// get All produsta
export async function getAllProducts(req: express.Request, res: express.Response) {
  try {
    
    const productsDB = await ProductsModel.find();
    res.send({ productsDB });

  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}


