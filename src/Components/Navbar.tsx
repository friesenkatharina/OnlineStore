import React from "react";
import { Container, Nav, Navbar as NavbarBs, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  const navigate = useNavigate();

  const isUserSignedIn = !!localStorage.getItem("token");

  // function for logout
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <NavbarBs sticky="top" className="bg-secondary shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" style={{ color: "#a3e635" }}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/store" style={{ color: "#a3e635" }}>
            Store
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about" style={{ color: "#a3e635" }}>
            About
          </Nav.Link>
          {isUserSignedIn ? (
            <>
              <Nav.Link as={NavLink} to="/account" style={{ color: "#a3e635" }}>
                Account
              </Nav.Link>
              <Button
                variant="outline-primary"
                onClick={handleSignOut}
                style={{ marginLeft: "0.5rem" }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              {/* <Nav.Link as={NavLink} to="/login" style={{ color: "#a3e635" }}>
                Login
              </Nav.Link> */}
              <Nav.Link as={NavLink} to="/signup" style={{ color: "#a3e635" }}>
                Signup
              </Nav.Link>
            </>
          )}
        </Nav>
        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            variant="outline-primary"
            style={{ position: "relative", width: "3rem", height: "3rem" }}
            className="rounded-circle"
          >
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavbarBs>
  );
}
