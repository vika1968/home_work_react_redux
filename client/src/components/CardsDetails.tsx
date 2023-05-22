import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Add_Cart, CartItem, Remove_Cart, Remove_Portion,} from "../features/menu/cartSlice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuScheme from "./api/MenuScheme";
import { RootState } from "../app/store";

const CardsDetails = () => {
  const [data, setData] = useState<MenuScheme[]>([]);
  const { id } = useParams();

  const history = useNavigate();
  const dispatch = useDispatch();
  const getdata = useSelector((state: RootState) => state.cart.carts);

  const compare = () => {
    let comparedata: MenuScheme[] = getdata.filter((element: MenuScheme) => {
      return element._id === id;
    });
    setData(comparedata);
  };

  // add data
  const send = (item: MenuScheme) => {
    dispatch(Add_Cart(item));
  };

  const deleteCart = (item: CartItem) => {  
    dispatch(Remove_Cart(item));
    history("/card");
  };

  // remove one
  const remove = (item: CartItem) => {  
    dispatch(Remove_Portion(item));
  };

  useEffect(() => {
    compare();
  }, [getdata, id]);

  return (
    <>
      <div className="card-container">
        <h2>Items Details Page</h2>

        <section className="section-container">
          <div className="items-details">
            {data.map((element: MenuScheme) => {
              return (
                <div key={element._id} className="main-container">
                  <div className="section-container__img">
                    <img src={element.imgdata} alt="" />
                  </div>

                  <div  className="section-container__details">
                    <table className="cart-item">
                    <tbody>
                      <tr>
                        <td className="cart-item__details">
                          <p className="cart-item__name">
                            <strong>Restaurant</strong> : {element.rname}
                          </p>
                          <p className="cart-item__price">
                            <strong>Price</strong> : $ {element.price}
                          </p>
                          <p className="cart-item__address">
                            <strong>Address</strong> : {element.address}
                          </p>
                          <p className="cart-item__total">
                            <strong>Total</strong> :${" "}
                            {element.price * element.qnty}
                          </p>
                          <div className="cart-item__quantity">
                            <span
                              className="cart-item__quantity-button minus"
                              onClick={
                                element.qnty <= 1
                                  ? () => deleteCart(element)
                                  : () => remove(element)
                              }
                            >
                              -
                            </span>
                            <span className="cart-item__quantity-count result">
                              {element.qnty}
                            </span>
                            <span
                              className="cart-item__quantity-button plus"
                              onClick={() => send(element)}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td className="cart-item__rating">
                          <p>
                            <strong>Rating :</strong>{" "}
                            <span className="cart-item__rating-value">
                              {element.rating} ★{" "}
                            </span>
                          </p>
                          <p>
                            <strong>Order Review :</strong>{" "}
                            <span className="cart-item__review">
                              {element.somedata}{" "}
                            </span>
                          </p>
                          <p>
                            <strong>Remove :</strong>{" "}
                            <span className="cart-item__remove">
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="fas fa-trash"
                                onClick={() => deleteCart(element)}
                              ></FontAwesomeIcon>{" "}
                            </span>
                          </p>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div >
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardsDetails;
