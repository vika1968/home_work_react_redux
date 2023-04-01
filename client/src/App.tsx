import "./App.scss";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import Home from "./views/home/Home";
import ExampleA from "./components/ExampleA";

import Page404 from "./views/Page404";
// import CardsDetails from "./components/CardsDetails";
// import Cards from "./components/Cards";
// import Header from "./components/Header";
import Layout from  "./components/Layout";
import MenuList from "./components/MenuList";
//https://stackoverflow.com/questions/47281850/how-to-hide-navbar-in-login-page-in-react-router

function App() {
  return (
    <BrowserRouter>  
      {/* <Routes>     
      <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Login />} />        
        <Route path="/home" element={<Home />} />
       <Route path="/example" element={<ExampleA/>}/> 
        <Route path='/card' element={<Cards />} />
      </Routes> */}

    {/* <Routes>
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="/card" element={<Cards />} />
        
      </Route>
    </Routes> */}

<Routes>
  <Route path="*" element={<Page404 />} />
  <Route path="/">
    <Route index element={<Login />} />
    <Route path="/card" element={<Layout><MenuList /></Layout>} />
  </Route>
</Routes>






     
   {/* <Header />
   <Routes>
     <Route path='/' element={<Cards />} />
     <Route path='/cart/:id' element={<CardsDetails />} />
   </Routes> */}
 
    </BrowserRouter>
  );
}

export default App;

