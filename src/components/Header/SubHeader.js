import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineSearch } from "react-icons/md";

const SubHeader = () => {
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
            />
          </span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-auto d-flex gap-5">
              <NavLink to="/shops" className="nav-link">
                Shop
              </NavLink>
              <NavLink to="/products" className="nav-link">
                Product
              </NavLink>
              <NavLink to="/post" className="nav-link">
                Post
              </NavLink>
              <NavLink to="/contact-information" className="nav-link">
                Contact Information
              </NavLink>
              <NavLink to="/carts" className="nav-link">
                <AiOutlineShoppingCart />
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default SubHeader;
