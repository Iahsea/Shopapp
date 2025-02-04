import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const ViewUserOrder = (props) => {
  const { dataUserOrder } = props;

  console.log(">>>>> check data User Order", dataUserOrder);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        className="w-100"
        onClick={handleShow}
      >
        View
      </Button>

      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Order Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="confirm-order__section">
            <h3>Order Information</h3>
            <p>
              <strong>Order ID:</strong> {dataUserOrder.id}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {dataUserOrder.orderDate
                ? new Date(dataUserOrder.orderDate).toLocaleString()
                : "Not available"}
            </p>
            <p>
              <strong>Status:</strong> {dataUserOrder.status}
            </p>
            <p>
              <strong>Total Money:</strong>$
              {dataUserOrder.totalMoney
                ? dataUserOrder.totalMoney.toLocaleString()
                : "0"}
            </p>
            <p>
              <strong>Note:</strong> {dataUserOrder.note}
            </p>
          </div>

          <div className="confirm-order__section">
            <h3>User Information</h3>
            <p>
              <strong>Name:</strong> {dataUserOrder.fullName}
            </p>
            <p>
              <strong>Email:</strong> {dataUserOrder.email}
            </p>
            <p>
              <strong>Phone:</strong> {dataUserOrder.phoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {dataUserOrder.address}
            </p>
          </div>

          <div className="confirm-order__section">
            <h3>Shipping Details</h3>
            <p>
              <strong>Method:</strong>{" "}
              {dataUserOrder.shippingMethod || "Not specified"}
            </p>
            <p>
              <strong>Shipping Address:</strong>{" "}
              {dataUserOrder.shippingAddress || "Not specified"}
            </p>
            <p>
              <strong>Shipping Date:</strong> {dataUserOrder.shippingDate}
            </p>
            <p>
              <strong>Tracking Number:</strong>{" "}
              {dataUserOrder.trackingNumber || "Not available"}
            </p>
          </div>

          <div className="confirm-order__section">
            <h3>Payment Information</h3>
            <p>
              <strong>Payment Method:</strong>{" "}
              {dataUserOrder.paymentMethod || "Not specified"}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewUserOrder;
