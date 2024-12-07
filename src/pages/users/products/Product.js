import React, { useState, useEffect } from "react";
import "./Product.scss";
import ReactPaginate from "react-paginate";
import {
  getProductByCategoryId,
  getProducts,
} from "../../../services/apiService";
import { useNavigate, useParams } from "react-router-dom";
import CategoryList from "../categories/ListCategory";

const Product = (props) => {
  const LIMIT_PRODUCTS = 12;
  const params = useParams();
  const categoryId = params.categoryId;

  console.log("check param categoryId", categoryId);

  // Giả sử có một danh sách sản phẩm (sử dụng useState và useEffect)
  const [listProducts, setListProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productId, setProductId] = useState("");
  const imageBaseUrl = "http://localhost:8088/api/v1/products/images/";
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      fetchProductByCategory(categoryId, 0);
    } else {
      dirFetchListProduct(0);
    }
  }, [categoryId]);

  const dirFetchListProduct = async (page) => {
    let data = await getProducts(page, LIMIT_PRODUCTS);
    console.log(">>>>> check data product", data);

    setListProducts(data.products);
    setPageCount(data.totalPages);
  };

  const fetchProductByCategory = async (categoryId, page) => {
    let data = await getProductByCategoryId(categoryId, page, LIMIT_PRODUCTS);
    console.log(">>>>> check data with category", data);

    setListProducts(data.products);
    setPageCount(data.totalPages);
  };

  const handlePageClick = (event) => {
    const selectedPage = +event.selected;
    setCurrentPage(+event.selected + 1);
    if (categoryId) {
      fetchProductByCategory(categoryId, selectedPage);
    } else {
      dirFetchListProduct(selectedPage);
    }
    console.log(`User requested page number ${event.selected + 1}`);
  };

  return (
    <>
      <div className="product-container">
        {/* Category section */}
        <section className="category-section">
          <CategoryList />
        </section>

        {/* Product list container */}
        <div className="product-list-container">
          <div className="product-list">
            {listProducts && listProducts.length > 0 ? (
              listProducts.map((product, index) => (
                <div className="card" style={{ width: "18rem" }} key={index}>
                  <img
                    src={
                      product.productImages && product.productImages.length > 0
                        ? `${imageBaseUrl}${product.productImages[0]}`
                        : "default-image.jpg"
                    }
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="product-name">{product.name}</h5>
                    <p className="description">{product.description}</p>
                    <p className="price">${product.price}</p>
                    <a
                      className="btn btn-primary"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      View Product
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading products...</p>
            )}
          </div>

          <div className="user-pagination">
            <ReactPaginate
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< Prev"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={currentPage - 1}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
