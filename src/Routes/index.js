import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import Login from "../Login";
import SignUp from "../Signup";
// import Sobre from "./Sobre";
// import Usuario from "./Usuario";

const ListRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login" exact />
        <Route element={<SignUp />} path="/register" exact />
        {/* <Route component = { Sobre }  path="/sobre" />
           <Route component = { Usuario }  path="/usuario" /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default ListRoutes;
