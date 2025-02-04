import { useSelector } from "react-redux";
import { deleteOrder, getUserOrder } from "../../../services/apiService";
import { useEffect, useState } from "react";
import "./UserOrder.scss";
import { toast } from "react-toastify";
import ViewUserOrder from "./ViewUserOrder";

const UserOrder = () => {
  const account = useSelector((state) => state.user.account);
  const [userId, setUserId] = useState(account.id);
  console.log(">>>>> check userId", userId);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dataUserOrder, setDataUserOrder] = useState([]);

  console.log(">>>>>> check order in component User Order", orders);

  useEffect(() => {
    handleUserOrder();
  }, []);

  const handleUserOrder = async () => {
    try {
      let data = await getUserOrder(userId);
      console.log(">>>>>>> check data", data);

      setOrders(data);
      setDataUserOrder(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      let data = await deleteOrder(orderId); // Chuyển orderId vào đây
      console.log("====== check data", data);

      toast.success("Delete Order successfully");

      // Sau khi xóa, cập nhật lại danh sách orders
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order.");
    }
  };

  return (
    <div className="user-order">
      <h1 className="user-order__title">Your Orders</h1>
      {loading ? (
        <div className="user-order__loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="user-order__list">
          {orders
            .filter((order) => order.active)
            .map((order, index) => (
              <div className="user-order__card" key={order.id}>
                <h2 className="user-order__card-title">{order.fullName}</h2>
                <p className="user-order__card-text">
                  <strong>Status:</strong> {order.status} <br />
                  <strong>Total:</strong> ${order.totalMoney}
                </p>
                <div className="user-order__card-actions">
                  <button className="user-order__btn user-order__btn--primary">
                    <ViewUserOrder dataUserOrder={dataUserOrder[index]} />
                  </button>
                  <button
                    className="user-order__btn user-order__btn--danger"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserOrder;
