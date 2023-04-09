import express from "express";

import { getAllProducts,  insertProductsAll } from "./productsCtrl";

const router = express.Router();

router
  .get("", getAllProducts) 
  .post("/insert-productsall", insertProductsAll) 

export default router; 

