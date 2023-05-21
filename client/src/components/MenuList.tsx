import { useState, useEffect } from "react";
import axios from "axios";
import ApiMenu from "./api/ApiMenu";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { getUserByCookieMain } from "../features/user/userAPI";
import  MenuScheme  from "../../src/components/api/MenuScheme"

const MenuList = () => {

  const [menu, setMenu] = useState<MenuScheme[]>([]);

  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  useEffect(() => {  

    if (!user) {
      dispatch(getUserByCookieMain());
    }

    handleMenu();
  }, []);


  async function handleMenu() {
    try {
      const { data } = await axios.get("/api/products");
      const productsArray = data.productsDB;
      setMenu(productsArray);
    } catch (error: any) {
      console.error(error.response.data.error);
    }
  }

  if (!user) {
    return (
      <div>
        <p>no user matched</p>
      </div>
    );
  } else {
    return (
      <div className="img-box">
        {menu.map((element, index) => {
          return (
            <ApiMenu
              key={index}
              _id={element._id}
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
  }
};

export default MenuList;
