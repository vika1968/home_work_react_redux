import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUser } from "../../features/user/userSlice";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [whatClicked, setWhatClicked] = useState(`Login`);

 const dispatch = useDispatch();

  const handleChange = (event: any) => {
    setError("");
  };

  const handleClick = () => {
    setError("");
    setIsActive((current) => !current);
    isActive ? setWhatClicked(`Register`) : setWhatClicked(`Login`);
  };

  const handleUpdateOrRemoveUser = async (event: any) => {
    try {
    
      setError("");
      if (!email) {
        alert("Please fill in the username field!");
        return;
      }

      if (!password) {
        alert("Please fill in the password field!");
        return;
      }
    
      const { data } = await axios.post("/api/users/login", { email, password });
      const { success, userDB } = data;    
    

      if (success) {
        const id = userDB._id;
        if (event.target.dataset.value === "RemoveUser") {
          const deleteResponse = await axios.delete(`/api/users/${id}`);
          if (deleteResponse.statusText === "OK") {
            alert("User was successfully deleted.");

            // Dispatch the resetUser action
            dispatch(resetUser());
          }
        } else {
          navigate(`/change-credentials/${id}`);
        }
      }
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  // async function handleSubmit(event: any) {
  //   try {
  //     event.preventDefault();
  //     if (!email) {
  //       alert(`Please, fill username field!`);
  //       return;
  //     }

  //     if (!password) {
  //       alert(`Please, fill password field!`);
  //       return;
  //     }

  //     let route: string;

  //     if (whatClicked === `Register`) {
  //       route = "/api/users/register";
  //     } else {
  //       route = "/api/users/login";
  //     }

  //     const { data } = await axios.post(route, { email, password });
  //     const { success, userDB } = data;

  //     if (success) {
  //       navigate(`/homepage`, { state: { email } });
  //     }
  //   } catch (error: any) {
  //     setError(error.response.data.error);
  //   }
  // }

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

      let route: string;

      if (whatClicked === `Register`) {
        route = "/api/users/register";
      } else {
        route = "/api/users/login";
      }
      const { data } = await axios.post(route, { email, password });
    
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

  //for (let i = 0; i < Cardsdata.length; i++) {
    //   insertProductsAll(product[i].rname, product[i].imgdata, product[i].address, product[i].delimg, product[i].somedata, product[i].price, product[i].rating, product[i].arrimg, product[i].qnty )
    //    console.log (product[i].rname, product[i].imgdata, product[i].address, product[i].delimg, product[i].somedata, product[i].price, product[i].rating, product[i].arrimg, product[i].qnty)
 // }
 //--------------------End of filling DataBase--------------------------------------------------------------

 return (
  <div className="login">
    <h2
      className="login__header--active"
      onClick={handleClick}
      style={{
        borderBottom: isActive ? `2px solid white` : `none`,
        color: isActive ? `white` : `rgba(255, 255, 255, 0.5)`,
      }}
    >
      login
    </h2>
    <h2
      className="register__header"
      onClick={handleClick}
      style={{
        borderBottom: !isActive ? `2px solid white` : `none`,
        color: !isActive ? `white` : `rgba(255, 255, 255, 0.5)`,
      }}
    >
      register
    </h2>
    <br />
    <form className="login__form" onSubmit={handleSubmit}>
      <input
        className="login__input-username input"
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
      <input
        className="login__input-password input"
        name="password"
        id="idPassword"
        value={password}
        type="password"
        placeholder="password"
        required
        onInput={(ev: any) => {
          setPassword(ev.target.value);
        }}
        onChange={(ev: any) => {
          handleChange(ev.target.value);
        }}
      />
      <span>password</span>
      <div className="login__error">{error ? error : ""} </div>
      <button className="login__button">
        {isActive ? "login" : "register"}
      </button>
      <div
        className="remove-update__button--container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          className="update__button"
          data-value="UpdateUser"
          onClick={handleUpdateOrRemoveUser}
        >
          change credentials
        </div>
        <div
          className="remove__button"
          data-value="RemoveUser"
          onClick={handleUpdateOrRemoveUser}
        >
          {" "}
          remove me{" "}
        </div>
      </div>{" "}
    </form>
  </div>
);
};

export default Login;
