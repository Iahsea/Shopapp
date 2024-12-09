import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./Order.scss";
import { useNavigate } from "react-router-dom";
import { postOrder, postOrderDetail } from "../../../services/apiService";
import { useSelector } from "react-redux";
import { CartContext } from "../../../contexts/CartContext";

const Order = () => {
  const account = useSelector((state) => state.user.account);
  const { cart } = useContext(CartContext);

  const [userId, setUserId] = useState(account.id);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate();

  const totalMoney = cart
    .reduce((total, product) => total + product.price, 0)
    .toFixed(2);

  const handleSubmitOrder = async () => {
    let data = await postOrder(
      userId,
      fullName,
      email,
      phoneNumber,
      address,
      note,
      totalMoney,
      shippingMethod,
      paymentMethod
    );

    if (data && data.id) {
      const orderId = data.id;

      // Lặp qua các sản phẩm trong giỏ hàng và gọi API postOrderDetail
      const promises = cart.map((item) => {
        return postOrderDetail(
          orderId, // ID của đơn hàng vừa tạo
          item.id, // ID sản phẩm từ giỏ hàng
          item.price, // Giá sản phẩm
          1, // Số lượng
          item.price, // Tổng giá
          "#ff00ff" // Màu (nếu có)
        );
      });

      // Đợi tất cả các lời gọi API hoàn tất
      const orderDetailsResponses = await Promise.all(promises);

      // In ra kết quả để kiểm tra
      console.log("Order created successfully:", data);
      console.log("Order details created successfully:", orderDetailsResponses);

      // Điều hướng người dùng đến trang xác nhận (nếu cần)
      navigate("/order-confirmation");
    } else {
      console.error("Failed to create order.");
    }
  };

  // Đồng bộ local state với Redux state khi account thay đổi
  // useEffect(() => {
  //   setUserId(account.id);
  // }, [account]);

  return (
    <>
      <div className="order-container">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <h2 className="text-center mb-4">Place Your Order</h2>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitOrder();
                }}
              >
                <Form.Group className="mb-3" controlId="fullname">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullname"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(event) => {
                      setFullName(event.target.value);
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone_number">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone_number"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="note">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="note"
                    placeholder="Any special instructions"
                    value={note}
                    onChange={(event) => {
                      setNote(event.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="total_money">
                  <Form.Label>Total Money</Form.Label>
                  <Form.Control
                    type="number"
                    name="total_money"
                    placeholder="Enter total amount"
                    value={totalMoney}
                    // onChange={(event) => setTotalMoney(event.target.value)}
                    // required
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="shipping_method">
                  <Form.Label>Shipping Method</Form.Label>
                  <Form.Select
                    name="shipping_method"
                    value={shippingMethod}
                    onChange={(event) => {
                      setShippingMethod(event.target.value);
                    }}
                  >
                    <option value="express">Express</option>
                    <option value="standard">Standard</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="payment_method">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    name="payment_method"
                    value={paymentMethod}
                    onChange={(event) => {
                      setPaymentMethod(event.target.value);
                    }}
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="online">Online Payment</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Submit Order
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Order;
