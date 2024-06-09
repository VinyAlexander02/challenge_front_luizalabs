// src/routes/AppRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
    </Routes>
  );
};

export default AppRoutes;
