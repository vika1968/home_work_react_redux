import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cardsdata from "../../components/CardsData";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [whatClicked, setwhatClicked] = useState(`Login`);

  const handleChange = (event: any) => {
    setError("");
  };

  const handleClick = () => {
    setError("");
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

      const { data } = await axios.post(rout, { email, password });

      const { success, userDB } = data;   

      if (success) {
        navigate("/card");
      }
    } catch (error: any) {
      setError(error.response.data.error);
    }
  }

  // ----------------A one-time function to populate a document in a database-------------------------------------

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
      const { data } = await axios.post("/api/products/insert-productsall", { rname, imgdata, address, delimg, somedata, price, rating, arrimg, qnty});
      const { success } = data;

      if (success) {
        console.log("All products were successfuly inserted");
      } else {
        console.log("Warning.Error!!!!");
      }
    } catch (error: any) {
      setError(error.response.data.error);  
    }
  }

  for (let i = 0; i < Cardsdata.length; i++) {
    //   insertProductsAll(product[i].rname, product[i].imgdata, product[i].address, product[i].delimg, product[i].somedata, product[i].price, product[i].rating, product[i].arrimg, product[i].qnty )
    //    console.log (product[i].rname, product[i].imgdata, product[i].address, product[i].delimg, product[i].somedata, product[i].price, product[i].rating, product[i].arrimg, product[i].qnty)
  }
 //--------------------End of filling DataBase--------------------------------------------------------------

  return ( 
    <div className="login">      
      <h2 className="login__header--active" onClick={handleClick} style={{ borderBottom: isActive ? `2px solid white` : `none`, color: isActive ? `white` : `rgba(255, 255, 255, 0.5)`, }}>login</h2>
      <h2 className="register__header" onClick={handleClick} style={{borderBottom: !isActive ? `2px solid white` : `none`, color: !isActive ? `white` : `rgba(255, 255, 255, 0.5)`,}}>register</h2>
      <br />
      <br />
      <form className="login__form" onSubmit={handleSubmit}>      
        <input className="login__input-username input" name="username" id="idUserName" value={email} type="email" placeholder="email" required onInput={(ev: any) => {setEmail(ev.target.value)}}/>
        <span>username</span>
        <br />
        <br />
        <input className="login__input-password input" name="password" id="idPassword" value={password} type="password" placeholder="password" required onInput={(ev: any) => {setPassword(ev.target.value)}} 
          onChange={(ev: any) => {handleChange(ev.target.value)}}/>
        <span>password</span>
        <div className="login__error">{error ? error : ""} </div>
        <br />
        <button className="login__button">{isActive ? "login" : "register"}</button>
      </form>
    </div>
  );
};

export default Login;
