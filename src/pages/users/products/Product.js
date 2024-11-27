import React, { useState, useEffect } from "react";
import "./Product.scss";
import ReactPaginate from "react-paginate";
import { getProducts } from "../../../services/apiService";

const Product = (props) => {
  const LIMIT_PRODUCTS = 6;

  // Giả sử có một danh sách sản phẩm (sử dụng useState và useEffect)
  const [listProducts, setListProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productId, setProductId] = useState("");
  const imageBaseUrl = "http://localhost:8088/api/v1/products/images/";

  const handlePageClick = (event) => {
    dirFetchListProduct(+event.selected);
    setCurrentPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected + 1}`);
  };

  useEffect(() => {
    dirFetchListProduct(0);
  }, []);

  const dirFetchListProduct = async (page) => {
    let data = await getProducts(page, LIMIT_PRODUCTS);
    setListProducts(data.products);
    setPageCount(data.totalPages);
  };

  return (
    <>
      <div className="product-list">
        {listProducts &&
          listProducts.length &&
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
                <a href="#" className="btn btn-primary">
                  View Product
                </a>
              </div>
            </div>
          ))}
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
    </>
  );
};

export default Product;
