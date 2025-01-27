import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AddShowcase from "../pages/addShowcase";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/add-showcase" element={< AddShowcase/>} />
    </Routes>
  );
};

export default AppRoutes;
