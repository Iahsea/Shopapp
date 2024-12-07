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
import Category from "./pages/users/categories/ListCategory";
import Product from "./pages/users/products/Product";
import ProductDetail from "./pages/users/productDetail/ProductDetail";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./components/Cart/Cart";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Web />}>
              <Route index element={<HomePage />} />
              <Route path="/users" element={<User />} />
              <Route path="/admins" element={<Admin />} />
              <Route path="/products" element={<Product />} />
              <Route
                path="/products/category/:categoryId"
                element={<Product />}
              />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/carts" element={<Cart />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories" element={<Category />} />
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </BrowserRouter>
      </CartProvider>
    </PersistGate>
  </Provider>
);
