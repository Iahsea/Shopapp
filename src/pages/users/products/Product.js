import React from "react";
import "./Product.scss";
import ReactPaginate from "react-paginate";

const Product = (props) => {
  const { listProducts, pageCount, imageBaseUrl } = props;

  const handlePageClick = (event) => {
    props.fetchListProduct(+event.selected);
    props.setCurrentPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected + 1}`);
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
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  );
};

export default Product;
