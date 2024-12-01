import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { AiOutlineDelete } from "react-icons/ai";
import "./Cart.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, removeFromCart, getTotalItems, clearCart } =
    useContext(CartContext);
  const imageBaseUrl = "http://localhost:8088/api/v1/products/images/";
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="empty-cart-message">
        Giỏ hàng của bạn hiện tại không có sản phẩm.
        <button onClick={() => navigate(`/`)} className="continue-shopping-btn">
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  const handleCheckOut = () => {
    clearCart();
    localStorage.removeItem("cart");
    toast.success("Thanh toán thành công, xin chân thành cảm ơn!");
    setTimeout(() => navigate("/"), 2000); // Điều hướng về trang chủ sau 2 giây
  };

  return (
    <>
      <div className="cart">
        <h2>Giỏ hàng của bạn</h2>
        <ul>
          {cart.map((product, index) => (
            <li key={`${product.id}+${index}`} className="cart-item">
              <div
                className="cart-item-info"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <img
                  src={
                    product.productImages && product.productImages.length > 0
                      ? `${imageBaseUrl}${product.productImages[0]}`
                      : "default-image.jpg"
                  }
                  alt={product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <p>Giá: {product.price} $</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(product.id)} // Gọi hàm xóa sản phẩm khi nhấn nút
                className="cart-item-remove"
              >
                <AiOutlineDelete />
              </button>
            </li>
          ))}
        </ul>

        <div className="cart-summary">
          <p>Tổng số lượng sản phẩm: {getTotalItems()}</p>
          <p>
            Tổng tiền:
            {cart
              .reduce((total, product) => total + product.price, 0)
              .toFixed(2)}
            $
          </p>
          <button className="checkout-button" onClick={() => handleCheckOut()}>
            Thanh toán
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
