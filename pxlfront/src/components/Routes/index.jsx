import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../../screens/Home";
import Profil from "../../screens/Profil";
import Trending from "../../screens/Trending";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="profil" exact element={<Profil />} />
        <Route path="trending" exact element={<Trending />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
