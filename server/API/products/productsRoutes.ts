import express from "express";

import { getAllProducts, getProductById, showUser, insertProducts, getProductByCategory, insertProductsAll } from "./productsCtrl";

const router = express.Router();

router
  .get("", getAllProducts) 
  .get("/get-user-by-cookie", showUser)
  .get("/find/:_id", getProductById)
  .post("/insert-products", insertProducts) 
  .post("/insert-productsall", insertProductsAll) 
  .post("/chosed", getProductByCategory)

export default router; 

