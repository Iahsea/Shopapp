import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const { isLoggedIn, setIsLoggedIn } = useContext(CartContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(doLogout());
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{ fontSize: "20px" }}
    >
      <Container>
        {/* <Navbar.Brand href="#home" style={{ fontSize: "30px" }}>
          IAHSEA Shop
        </Navbar.Brand> */}
        <NavLink to="/" className="navbar-brand" style={{ fontSize: "25px" }}>
          IAHSEA Shop
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              User
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              Admin
            </NavLink>

            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#user">User</Nav.Link>
            <Nav.Link href="#admin">Admin</Nav.Link> */}
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button className="btn-login" onClick={() => handleLogin()}>
                  Log in
                </button>
                <button
                  className="btn-signup"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => handleLogout()}>
                  {/* <button className="btn-logout" onClick={() => handleLogout()}> */}
                  Log out
                  {/* </button> */}
                </NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
