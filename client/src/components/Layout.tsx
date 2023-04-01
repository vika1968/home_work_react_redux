import { Link, Outlet } from "react-router-dom";
import logo from "../images/yammi.jpg";
import facebook from "../images/facebook.png";
import youtube from "../images/images.jpg";
import twitter from "../images/T.png";
import menuimg from "../images/icono-menu.png";
import { ReactNode } from "react";
import IframeComponent from "./helpers/IframeComponent";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {

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
              <Link to="https://vacationishta.com/point-of-interest/vietnam/halongbay/eating/yummy+restaurant+%28c%C3%A1t+b%C3%A0+island%29-129668" target="_blank">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        <div className="section_social_networks">
          <button>
            <Link
              to="https://www.facebook.com/yummycatba"
              target="_blank"
            ><img src={facebook} alt="Facebook" />             
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
