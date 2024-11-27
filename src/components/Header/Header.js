import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
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
            {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item>Log in</NavDropdown.Item>

              <NavDropdown.Item>Log out</NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
