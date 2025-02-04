import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineSearch } from "react-icons/md";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useDispatch } from "react-redux";
import { resetCategory } from "../../redux/action/categoryAction";
import { fetchKeyword } from "../../redux/action/keywordSearchAction";

const SubHeader = (props) => {
  const { cart, getTotalItems } = useContext(CartContext);
  const { orderId } = props;
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      dispatch(fetchKeyword(keyword));
      navigate("/products");
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ fontSize: "20px" }}
      >
        <Container>
          <span className="search_item">
            <MdOutlineSearch className="search_icon" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="search-bar"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={handleSearch}
            />
          </span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-auto d-flex gap-5">
              <NavLink
                to="/products"
                className="nav-link"
                onClick={() => {
                  dispatch(resetCategory());
                  dispatch(fetchKeyword(""));
                  setKeyword("");
                }}
              >
                Product
              </NavLink>
              <NavLink to="/post" className="nav-link">
                Post
              </NavLink>
              <NavLink to="/contact-information" className="nav-link">
                Contact Information
              </NavLink>
              <NavLink to="/carts" className="nav-link">
                <span className="cart-icon">
                  <AiOutlineShoppingCart />
                </span>
                <span className="cart-count">{getTotalItems()}</span>{" "}
                {/* Hiển thị số lượng sản phẩm */}
              </NavLink>

              <NavLink to={`/orders/user`} className="nav-link">
                Confirrm
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default SubHeader;
