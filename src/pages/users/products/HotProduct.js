import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./HotProduct.scss";

const HotProduct = (props) => {
  const {
    listProducts,

    imageBaseUrl,
  } = props;

  return (
    <>
      <div className="swiper-product">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={1} // Khoảng cách giữa các slide
          slidesPerView={3} // Hiển thị 3 sản phẩm mỗi lần
          navigation // Thêm nút "Prev" và "Next"
          // pagination={{ clickable: true }} // Hiển thị các dấu chấm phân trang
          style={{ padding: "0 10px" }}
        >
          {listProducts &&
            listProducts.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="card" style={{ width: "18rem" }}>
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
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default HotProduct;
