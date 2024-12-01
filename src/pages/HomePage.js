import React, { useState, useEffect } from "react";
import "./HomePage.scss";
import Banner from "../components/Banner/Banner";
import { getProductById, getProducts } from "../services/apiService";
import HotProduct from "./users/products/HotProduct";
import Footer from "../components/Footer/Footer";

const HomePage = () => {
  const LIMIT_PRODUCT = 100;

  // Giả sử có một danh sách sản phẩm (sử dụng useState và useEffect)
  const [listProducts, setListProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productId, setProductId] = useState("");
  const imageBaseUrl = "http://localhost:8088/api/v1/products/images/";

  useEffect(() => {
    fetchListProduct(0);
  }, []);

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
