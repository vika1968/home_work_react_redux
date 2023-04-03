import { useState , useEffect} from "react";
import axios from "axios";
import { Link, useNavigate , redirect } from "react-router-dom";

import { usePWValidator } from "../../components/hooks/usePWValidator";
import PasswordChecker from "../../components/PasswordChecker";
import Cardsdata from "../../components/CardsData";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserByCookie } from "../../features/user/userAPI";
import { userSelector } from "../../features/user/userSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector); // user = null or empty

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  if (user) {
   // navigate("/card");
 //   <redirect to={{ pathname: "/login" }} />
    //<Link to={"/card"}>To example</Link>
   //console.log(user)
  
  }
  //-----------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(true);
  const [whatClicked, setwhatClicked] = useState(`Login`);
  // const passwordErrorMsg = usePWValidator(password);

  const handleClick = () => {
    setIsActive((current) => !current);
    isActive ? setwhatClicked(`Register`) : setwhatClicked(`Login`);
  };

  async function handleSubmit(event: any) {
    try {
      event.preventDefault();

      if (!email) {
        alert(`Please, fill username field!`);
        return;
      }

      if (!password) {
        alert(`Please, fill password field!`);
        return;
      }

      let rout: string;

      if (whatClicked === `Register`) {
        rout = "/api/users/register";
      } else {
        rout = "/api/users/login";
      }
      console.log(rout);
      const { data } = await axios.post(rout, { email, password });
      console.log(data);

      const { success, userDB } = data;

      if (!success) {
        if (whatClicked == `Register`) {
          throw new Error("Something went wrong.");
        } else {
          alert("UserName and Password don't match.");
        }
      } else {
        navigate("/card");
      }
    } catch (error) {
      console.error(error);
    }
  }

  for (let i = 0; i < Cardsdata.length; i++) {
    //   insertProductsAll(product[i].rname, product[i].imgdata, product[i].address, product[i].delimg, product[i].somedata, product[i].price, product[i].rating, product[i].arrimg, product[i].qnty )
    //  console.log (product[i].rname, product[i].imgdata, product[i].address, product[i].delimg, product[i].somedata, product[i].price, product[i].rating, product[i].arrimg, product[i].qnty)
  }

  async function insertProductsAll(
    rname: string,
    imgdata: string,
    address: string,
    delimg: string,
    somedata: string,
    price: number,
    rating: string,
    arrimg: string,
    qnty: number
  ) {
    try {
      //@ts-ignore
      const { data } = await axios.post("/api/products/insert-productsall", {
        rname,
        imgdata,
        address,
        delimg,
        somedata,
        price,
        rating,
        arrimg,
        qnty,
      });
      const { success } = data;

      if (!success) {
        console.log("All products were successfuly inserted");
      } else {
        console.log("Warning.Error!!!!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="loginDiv">
      <h2
        className="loginHeader"
        onClick={handleClick}
        style={{
          borderBottom: isActive ? `2px solid white` : `none`,
          color: isActive ? `white` : `rgba(255, 255, 255, 0.5)`,
        }}
      >
        login
      </h2>

      <h2
        className="registerHeader"
        onClick={handleClick}
        style={{
          borderBottom: !isActive ? `2px solid white` : `none`,
          color: !isActive ? `white` : `rgba(255, 255, 255, 0.5)`,
        }}
      >
        register
      </h2>

      <form className="frmLogin" onSubmit={handleSubmit}>
        {/* <input type="text" className="text" name="username" id="idUserName" /> */}
        <input
          className="text"
          name="username"
          id="idUserName"
          value={email}
          type="email"
          placeholder="email"
          required
          onInput={(ev: any) => {
            setEmail(ev.target.value);
          }}
        />
        <span>username</span>
        <br />
        <br />
        <input
          className="text"
          name="password"
          id="idPassword"
          value={password}
          type="password"
          placeholder="password"
          required
          onInput={(ev: any) => {
            setPassword(ev.target.value);
          }}
        />
        <span>password</span>
        <p className="passwordValidatorMsg"> </p>
        <br />
        <button className="signin">{isActive ? "login" : "register"}</button>
      </form>
    </div>
  );
};

export default Login;
