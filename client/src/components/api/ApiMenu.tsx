//https://dog.ceo/dog-api/
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_CART } from "../../features/menu/cartSlice";

interface CardMenu {
  _id:string,
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
const ApiMenu: FC<CardMenu> = ({
  _id,
  rname,
  imgdata,
  address,
  delimg,
  somedata,
  price,
  rating,
  arrimg,
  qnty,
}) => {
  //let urlWiki: string = `/wikisearch/`;
  const dispatch = useDispatch();
  const send = (e: any)=>{
    // console.log(e);
    dispatch(ADD_CART(e));
  }

  return (
    <div className="image-gallery">
      <div className="image-container">
        <img className="images" src={imgdata} alt="" />

        <div className="span-container">
          <span>
            <div className="dish-name">
              {rname}
              {/* <div className="">{address} </div>
              <img src={delimg} />
              <br />
              {somedata}*/}
              <br /> 
              price : {price}
              <br />
              {/* rating : {rating}
              <br />
              <img src={arrimg} />
              <br />
             you ordered : {qnty} */}
             <div className="button-div">
                    <button  className="button-add"
                     onClick={() => send({ _id, rname, imgdata, address, delimg, somedata, price, rating, arrimg, qnty})}
                     >Add to Cart</button>
             </div>
            </div>

            {/* <Link to={urlWiki + rname} state={rname} className="gotowiki">
              For more info click here ...
            </Link> */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApiMenu;

