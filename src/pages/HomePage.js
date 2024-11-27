import React, { useState, useEffect } from "react";
import "./HomePage.scss";
import Banner from "../components/Banner/Banner";
import Product from "./users/products/Product";
import { getProducts } from "../services/apiService";

const HomePage = () => {
  const LIMIT_PRODUCT = 6;

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

    console.log("data", data);

    console.log(">>> check data", data.products);

    console.log(">>> check image", data.products[0].productImages);

    setListProducts(data.products);
    setPageCount(data.totalPages);
  };

  const handleAddToCart = (productId) => {
    console.log(`Product with ID ${productId} added to cart!`);
    // Thực hiện logic thêm vào giỏ hàng
  };
  return (
    <div className="homepage-container">
      {/* Main content */}
      <main>
        {/* Banner section */}
        <section className="banner">
          <Banner />
        </section>

        {/* Product section */}

        <section className="product-section">
          <h2 className="section-title">Sản phẩm nổi bật</h2>
          <div className="product-grid">
            <Product
              listProducts={listProducts}
              fetchListProduct={fetchListProduct}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageCount={pageCount}
              imageBaseUrl={imageBaseUrl}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Shop Online. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
