import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import Page404 from "./views/Page404";
import Layout from "./components/Layout";
import MenuList from "./components/MenuList";
import CardsDetails from "./components/CardsDetails";
import ChangeCredentials from "./views/changecredentials/ChangeCredentials";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/">
          <Route index element={<Login />} />
            <Route path="/change-credentials/:user" element={<ChangeCredentials />}/>
          <Route path="/card"  element={<Layout><MenuList /> </Layout>}/>
          <Route path="/cart/:id" element={<Layout><CardsDetails /></Layout>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
