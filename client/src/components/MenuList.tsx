import React from "react";
import { useState, useEffect, FC } from "react";
import axios from "axios";
import ApiMenu from "./api/ApiMenu";

interface CardMenu {
  _id: string;
  rname: string;
  imgdata: string;
  address: string;
  delimg: string;
  somedata: string;
  price: number;
  rating: string;
  arrimg: string;
  qnty: number;
}
const MenuList = () => {
  const [menu, setMenu] = useState<CardMenu[]>([]);

  async function handleMenu() {
    try {
      const { data } = await axios.get("/api/products");
      const productsArray = data.productsDB;
      setMenu(productsArray);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleMenu();
  }, []);

  return (
    <div className="img-box">
      {menu.map((element, index) => {
        return (
          <ApiMenu
            _id={element._id}
            key={index}
            rname={element.rname}
            imgdata={element.imgdata}
            address={element.address}
            delimg={element.delimg}
            somedata={element.somedata}
            price={element.price}
            rating={element.rating}
            arrimg={element.arrimg}
            qnty={element.qnty}
          />
        );
      })}
    </div>
  );
};

export default MenuList;
