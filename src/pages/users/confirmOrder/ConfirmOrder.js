import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById } from "../../../services/apiService";
import "./ConfirmOrder.scss";

const ConfirmOrder = () => {
  const params = useParams();
  const orderId = params.orderId;

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    let data = await getOrderById(orderId);
    console.log(">>>>>> check data fetch Order", data);
  };

  return (
    <div>
      <h1>Order Confirmation</h1>
      {/* <p>
        <strong>Name:</strong> {order.fullname}
      </p>
      <p>
        <strong>Email:</strong> {order.email}
      </p>
      <p>
        <strong>Phone:</strong> {order.phone_number}
      </p>
      <p>
        <strong>Address:</strong> {order.address}
      </p>
      <p>
        <strong>Note:</strong> {order.note}
      </p>
      <p>
        <strong>Total Money:</strong> ${order.total_money}
      </p>
      <p>
        <strong>Shipping Method:</strong> {order.shipping_method}
      </p>
      <p>
        <strong>Payment Method:</strong> {order.payment_method}
      </p> */}
    </div>
  );
};

export default ConfirmOrder;
