import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "../images/yammi.jpg";
import facebook from "../images/facebook.png";
import youtube from "../images/images.jpg";
import twitter from "../images/T.png";
import menuimg from "../images/icono-menu.png";
import { ReactNode, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Remove_Cart } from "../features/menu/cartSlice";
import { cartSelector } from "./../features/menu/cartSlice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const location = useLocation();  
  const [price, setPrice] = useState(0);
  const getdata = useSelector(cartSelector);   
  const dispatch = useDispatch();

  const [anchorElement, setAnchorElement] = useState(null);
  const handleClose = () => {   
    setAnchorElement(null);   
  };
 
  const [showDiv, setShowDiv] = useState(false);
  const toggleDiv = () => { setShowDiv(!showDiv) };

  const deleteCart = (element: any) => {
    dispatch(Remove_Cart(element));
  };

  const totalSum = () => {
    let price = 0;
      getdata.map((element: any, index: any) => {
       price = element.price * element.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    totalSum(); 
  }, [totalSum]);

  return (
    <header>
      <input type="checkbox" id="dws-menu" />
      <div className="leb-menu">
        <label htmlFor="dws-menu">
          <img src={menuimg} />
        </label>
      </div>

      <nav className="menu">
        <div className="section-logo">
          <div className="logo">
            <img src={logo} />
          </div>
        </div>

        <div className="section-main-menu">
          <ul>
            <li>
              <Link to="/card">Menu List</Link>
            </li>
            <li>
              <Link to="https://www.tripadvisor.com/Restaurant_Review-g737051-d12006693-Reviews-Yummy_Restaurant-Cat_Ba_Hai_Phong.html"
              target="_blank"
              >
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
        {/* --Shopping icon-- */}
        <div className="badge-wrapper" onClick={toggleDiv}>
          <FontAwesomeIcon className="badge-wrapper__shopping-cart-icon" icon={faCartShopping} />
          <div className="badge">{getdata.length}</div>
        </div>
        {/* --Shopping icon--*/}
        <div className="menu-container__global" onClick={handleClose}>
          {(showDiv && location.pathname === '/card') && (
            <div className="menu-container">
              {getdata.length ? (
                <div className="card-details">       
                   <table>                  
                     <thead>
                      <tr>
                        <th>Photo</th>
                        <th>Restaurant Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getdata.map((element) => {
                        return (
                          <tr key={element._id}>
                            <td>
                              <NavLink to={`/cart/${element._id}`} onClick={handleClose}>
                                <img src={element.imgdata} alt=""/>                       
                              </NavLink>
                            </td>
                            <td>
                              <p>{element.rname}</p>
                              <p>Price: ${element.price}</p>
                              <p>Quantity: {element.qnty}</p>
                            </td>
                            <td className="trash" onClick={() => deleteCart(element)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="price-total" >
                          <p className="price-total__sum">Total: ${price}</p>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <div className="card-details">
                  <FontAwesomeIcon className="close-icon" icon={faClose} onClick={toggleDiv} />                   
                   <p className="paragraph-empty-card">Your cart is empty</p>
                   <img className="emptycart-img" src="./cart.gif" alt=""/>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ---------------------------- */}
        <div className="section-social-networks">
          <button>
            <Link to="https://www.facebook.com/yummycatba" target="_blank">
              <img src={facebook} alt="Facebook" />
            </Link>
          </button>
          <button>
            <Link to="https://www.youtube.com/watch?v=Iwc6mEHQBFc" target="_blank">
              <img src={youtube} alt="Youtube" />
            </Link>
          </button>
          <button>
            <Link to="https://twitter.com/_restaurant_bot/status/1623938594514649088?lang=en" target="_blank">
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
