// src/contexts/CartContext.js
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Tạo context để chia sẻ dữ liệu liên quan đến giỏ hàng trong toàn bộ ứng dụng
export const CartContext = createContext();

// Tạo component CartProvider để cung cấp context giỏ hàng
export const CartProvider = ({ children }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    try {
      return savedCart ? JSON.parse(savedCart) : []; // Nếu có dữ liệu trong localStorage, dùng nó, nếu không dùng mảng rỗng
    } catch (error) {
      console.error("Dữ liệu giỏ hàng không hợp lệ:", error);
      localStorage.removeItem("cart");
      return [];
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    console.log("authToken", localStorage.getItem("authToken"));

    return !!localStorage.getItem("authToken");
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, product];
      toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
      localStorage.setItem("cart", JSON.stringify(newCart)); // Lưu giỏ hàng vào localStorage để giỏ hàng khi reload vẫn được lưu lại
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setIsRemoving(true);
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      toast.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
      const index = updatedCart.findIndex((item) => item.id === productId);

      if (index !== -1) {
        updatedCart.splice(index, 1); // Xóa chỉ một sản phẩm tại vị trí tìm thấy
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Cập nhật localStorage
      }

      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]); // Xóa giỏ hàng trong context
  };

  const getTotalItems = () => {
    return cart.length;
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getTotalItems,
        clearCart,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children} {/* Các component con được bọc bên trong */}
    </CartContext.Provider>
  );
};
