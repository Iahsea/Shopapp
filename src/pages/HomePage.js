import React, { useState, useEffect } from "react";
import "./HomePage.scss";
import Banner from "../components/Banner/Banner";
import { getProductById, getProducts } from "../services/apiService";
import HotProduct from "./users/products/HotProduct";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRefreshToken } from "../services/apiService";
import CategoryList from "./users/categories/ListCategory";

const HomePage = () => {
  const LIMIT_PRODUCT = 100;

  // Giả sử có một danh sách sản phẩm (sử dụng useState và useEffect)
  const [listProducts, setListProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productId, setProductId] = useState("");
  const imageBaseUrl = "http://localhost:8088/api/v1/products/images/";
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const handleRefreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      // toast.error("No refresh token available");
      navigate("/");
      return;
    }

    try {
      const response = await postRefreshToken(refreshToken);

      if (response && response.token && response.refresh_token) {
        const { token, refresh_token: newRefreshToken } = response;
        localStorage.setItem("authToken", token);
        localStorage.setItem("refreshToken", newRefreshToken);

        // toast.success("Token refresh successfully");

        return token;
      }
    } catch (error) {
      console.log("Failed to refresh token", error);
      toast.error("Failed to refresh token");
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // if (!token) {
    handleRefreshToken();
    // }
  }, []);

  // if (!token) {
  //   navigate("/login");
  // }

  useEffect(() => {
    // const authToken = localStorage.getItem("authToken");

    // if (!authToken) {
    //   toast.error("Please log in to continue");
    //   // navigate("/login");
    //   return;
    // }

    fetchListProduct(0);
  }, [navigate]);

  // Chuyển logic kiểm tra token vào useEffect
  // useEffect(() => {
  //   fetchListProduct(0);
  // }, []); // Thêm dependency token và navigate vào mảng phụ thuộc

  const fetchListProduct = async (page) => {
    let data = await getProducts(page, LIMIT_PRODUCT);
    setListProducts(data.products);
    setPageCount(data.totalPages);
  };

  return (
    <div className="homepage-container">
      <h2 className="welcome">Welcome to IAHSEA SHOP</h2>
      <main>
        {/* Banner section */}
        <section className="banner">
          <Banner />
        </section>

        {/* Category section */}
        {/* <section className="category-section">
          <CategoryList />
        </section> */}

        {/* Product section */}

        <section className="product-section">
          <h2 className="section-title">SẢN PHẦM NỔI BẬT</h2>
          <div className="product-grid">
            <HotProduct
              listProducts={listProducts}
              pageCount={pageCount}
              currentPage={currentPage}
              imageBaseUrl={imageBaseUrl}
              fetchListProduct={fetchListProduct}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
