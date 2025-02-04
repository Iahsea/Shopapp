import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { getOrderById } from "../../../services/apiService";
import "./ConfirmOrder.scss";
import UserOrder from "./UserOrder";
import ViewUserOrder from "./ViewUserOrder";
import { CartContext } from "../../../contexts/CartContext";

const ConfirmOrder = () => {
  const { removeAllItemsFromCart } = useContext(CartContext);
  const params = useParams();
  const orderId = params.orderId;
  const [order, setOrder] = useState({});
  const navigate = useNavigate("");
  const [showViewUserOrder, setShowViewUserOrder] = useState(false);
  const [dataView, setDataView] = useState({});

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    let data = await getOrderById(orderId);
    console.log(">>>>>> check data fetch Order", data);
    setOrder(data);
  };

  const handleConfirmOrder = () => {
    removeAllItemsFromCart();
    navigate("/orders/user");
  };

  return (
    <div className="confirm-order">
      <h2 className="confirm-order__title">Order Confirmation</h2>

      <div className="confirm-order__section">
        <h3>Order Information</h3>
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {order.orderDate
            ? new Date(order.orderDate).toLocaleString()
            : "Not available"}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Total Money:</strong>$
          {order.totalMoney ? order.totalMoney.toLocaleString() : "0"}
        </p>
        <p>
          <strong>Note:</strong> {order.note}
        </p>
      </div>

      <div className="confirm-order__section">
        <h3>User Information</h3>
        <p>
          <strong>Name:</strong> {order.fullName}
        </p>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Phone:</strong> {order.phoneNumber}
        </p>
        <p>
          <strong>Address:</strong> {order.address}
        </p>
      </div>

      <div className="confirm-order__section">
        <h3>Shipping Details</h3>
        <p>
          <strong>Method:</strong> {order.shippingMethod || "Not specified"}
        </p>
        <p>
          <strong>Shipping Address:</strong>{" "}
          {order.shippingAddress || "Not specified"}
        </p>
        <p>
          <strong>Shipping Date:</strong> {order.shippingDate}
        </p>
        <p>
          <strong>Tracking Number:</strong>{" "}
          {order.trackingNumber || "Not available"}
        </p>
      </div>

      <div className="confirm-order__section">
        <h3>Payment Information</h3>
        <p>
          <strong>Payment Method:</strong>{" "}
          {order.paymentMethod || "Not specified"}
        </p>
      </div>

      <div className="confirm-order__actions">
        <button
          className="btn btn-confirm"
          onClick={() => handleConfirmOrder()}
        >
          Confirm Order
        </button>
        <button className="btn btn-cancel" onClick={() => navigate("/carts")}>
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
