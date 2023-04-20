import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Add_Cart, CartItem } from "../../features/menu/cartSlice";
import  MenuScheme  from "./MenuScheme"

const ApiMenu: FC<MenuScheme> = ({
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

  const dispatch = useDispatch();
  const send = (element: CartItem)=>{
    dispatch(Add_Cart(element));
  }

return (
<div className="image-gallery">
  <div className="image-container">
    <img className="image-container__image" src={imgdata} alt="" />

    <div className="image-container__caption">
      <span>
        <div className="caption__dish-name">
          {rname}             
          <br /> 
          <span className="caption__price">Price : ${price}</span>
          <br />             
          <div className="caption__button-container">
            <button className="caption__button-add" onClick={() => send({ _id, rname, imgdata, address, delimg, somedata, price, rating, arrimg, qnty})}>Add to Cart</button>
          </div>
        </div>        
      </span>
    </div>
  </div>
</div>
    
  );
};

export default ApiMenu;

