import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/users/homePage/User";
import Admin from "./pages/admin/Admin";
import Web from "./Web";
import HomePage from "./pages/HomePage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Category from "./pages/users/categories/Category";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Web />}>
        <Route index element={<HomePage />} />
        <Route path="/users" element={<User />} />
        <Route path="/admins" element={<Admin />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/categories" element={<Category />} />
    </Routes>
  </BrowserRouter>
);
