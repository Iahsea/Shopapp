import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getProductById } from "../../../services/apiService";
import "./ProductDetail.scss"; // Bạn có thể sử dụng SCSS để tùy chỉnh CSS cho đẹp mắt
import { CartContext } from "../../../contexts/CartContext";

const ProductDetail = () => {
  const params = useParams();
  const productId = params.id;
  const imageBaseUrl = "http://localhost:8088/api/v1/products/images/";

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = async () => {
    let data = await getProductById(productId);
    console.log(">>> check", data);

    setProduct(data);
    if (data.productImages && data.productImages.length > 0) {
      setSelectedImage(data.productImages[0]); // Mặc định hiển thị ảnh đầu tiên
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail__container">
        {/* Ảnh chính của sản phẩm */}
        <div className="product-detail__main-image">
          <img
            src={
              selectedImage
                ? `${imageBaseUrl}${selectedImage}`
                : "default-image.jpg"
            }
            alt={product.name}
            className="product-detail__main-image-img"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="product-detail__info">
          <h1 className="product-detail__name">{product.name}</h1>
          <p className="product-detail__price">${product.price}</p>
          <p className="product-detail__description">{product.description}</p>
          <button
            className="product-detail__add-to-cart"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Các ảnh phụ hiển thị bên dưới */}
      <div className="product-detail__thumbnails">
        {product.productImages && product.productImages.length > 0 && (
          <>
            <h3>More Images</h3>
            <div className="product-detail__thumbnails__wrapper">
              {product.productImages.map((image, index) => (
                <img
                  key={index}
                  src={`${imageBaseUrl}${image}`}
                  alt={`product-thumbnail-${index}`}
                  className="product-detail__thumbnail"
                  onClick={() => setSelectedImage(image)} // Khi click vào ảnh nhỏ sẽ thay đổi ảnh chính
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
