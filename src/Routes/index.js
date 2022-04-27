import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "../Home";

import Login from "../Login";
import SignUp from "../Signup";
// import Sobre from "./Sobre";
// import Usuario from "./Usuario";

const ListRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route element={<Login />} path="/login" />
        <Route element={<SignUp />} path="/register" />
        {/*  <Route component = { Usuario }  path="/usuario" /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default ListRoutes;
