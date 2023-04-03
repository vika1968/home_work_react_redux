import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../images/yammi.jpg";
import facebook from "../images/facebook.png";
import youtube from "../images/images.jpg";
import twitter from "../images/T.png";
import menuimg from "../images/icono-menu.png";
import { ReactNode, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RMV_CART } from "../features/menu/cartSlice";

import cartSlice from "../../src/features/menu/cartSlice";
import { cartSelector } from "./../features/menu/cartSlice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { isAbsolute } from "path";
type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const [price, setPrice] = useState(0);
  // console.log(price);

  //const getdata = useSelector((state: any) => cartSlice);
  const getdata = useSelector(cartSelector);

  console.log(getdata);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (_id: any) => {
    dispatch(RMV_CART(_id));
  };

  const total = () => {
    let price = 0;
    getdata.map((element: any, k: any) => {
      price = element.price * element.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  return (
    <header>
      <input type="checkbox" id="dws-menu" />
      <div className="leb-menu">
        <label htmlFor="dws-menu">
          <img src={menuimg} />
        </label>
      </div>

      <nav className="menu">
        <div className="section_logo">
          <div className="logo">
            <img src={logo} />
          </div>
        </div>

        <div className="section_main_menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="https://www.tripadvisor.com/Restaurant_Review-g737051-d12006693-Reviews-Yummy_Restaurant-Cat_Ba_Hai_Phong.html">
                Tripadvicor
              </Link>
            </li>
            <li>
              <Link
                to="https://vacationishta.com/point-of-interest/vietnam/halongbay/eating/yummy+restaurant+%28c%C3%A1t+b%C3%A0+island%29-129668"
                target="_blank"
              >
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        {/* --Shopping icon  */}
        <div className="badge-wrapper" onClick={handleClick}>
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{ fontSize: 25, cursor: "pointer" }}
          />
          <div className="badge">{getdata.length}</div>
        </div>
        {/* --Shopping icon  */}
        <div>
          {open && (
            <div className="menu-container">
              {getdata.length ? (
                <div
                  className="card-details"
                  style={{
                    width: "24rem",
                    padding: 10,
                    position: "absolute",
                    top: 55,
                    right: -10,
                    zIndex: 100,
                    color: "black",
                    border: "1px solid black",
                  }}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>Photo</th>
                        <th>Restaurant Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getdata.map((e) => {
                        return (
                          <tr key={e._id}>
                            <td>
                              <NavLink
                                to={`/cart/${e._id}`}
                                onClick={handleClose}
                              >
                                <img
                                  src={e.imgdata}
                                  style={{ width: "5rem", height: "5rem" }}
                                  alt=""
                                />
                              </NavLink>
                            </td>
                            <td>
                              <p>{e.rname}</p>
                              <p>Price: ${e.price}</p>
                              <p>Quantity: {e.qnty}</p>
                              <p
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                                onClick={() => dlt(e._id)}
                              >                               
                              </p>
                            </td>
                            <td
                              className="mt-5"
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => dlt(e._id)}
                            >
                              {/* <i className="fas fa-trash largetrash"></i> */}
                              <FontAwesomeIcon icon={faTrash} />
                            </td>
                          </tr>
                        );
                      })}
                      <p className="text-center">Total: ${price}</p>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div
                  className="card-details"
                  style={{ width: "24rem", padding: 10, position: "relative" }}
                >
                  <FontAwesomeIcon
                    icon={faClose}
                    onClick={handleClose}
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 20,
                      fontSize: 23,
                      cursor: "pointer",
                    }}
                  />
                  <p style={{ fontSize: 22 }}>Your cart is empty</p>
                  <img
                    src="./cart.gif"
                    alt=""
                    className="emptycart-img"
                    style={{ width: "5rem", 
                    padding: 10 }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/*  */}
        <div className="section_social_networks">
          <button>
            <Link to="https://www.facebook.com/yummycatba" target="_blank">
              <img src={facebook} alt="Facebook" />
            </Link>
          </button>
          <button>
            <Link
              to="https://www.youtube.com/watch?v=Iwc6mEHQBFc"
              target="_blank"
            >
              <img src={youtube} alt="Youtube" />
            </Link>
          </button>
          <button>
            <Link
              to="https://twitter.com/_restaurant_bot/status/1623938594514649088?lang=en"
              target="_blank"
            >
              <img src={twitter} alt="Twitter" />
            </Link>
          </button>
        </div>
      </nav>
      {children}
      <Outlet />
    </header>
  );
}

export default Layout;
