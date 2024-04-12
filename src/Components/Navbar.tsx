import React, { useEffect } from "react";
import { Container, Nav, Navbar as NavbarBs, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();
  const navigate = useNavigate();

  const isUserSignedIn = !!localStorage.getItem("token");

  // Function for logout
  const handleSignOut = () => {
    alert("Du wurdest ausgeloggt. (Timeout)");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  // Timer for auto logout
  useEffect(() => {
    let timer;
    const handleActivity = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (isUserSignedIn) {
          handleSignOut();
        }
      }, 1000000); // 1000000 milliseconds = 16 minutes and 40 seconds
    };
    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("mousedown", handleActivity);
    document.addEventListener("keypress", handleActivity);
    document.addEventListener("touchmove", handleActivity);
    document.addEventListener("scroll", handleActivity);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("mousedown", handleActivity);
      document.removeEventListener("keypress", handleActivity);
      document.removeEventListener("touchmove", handleActivity);
      document.removeEventListener("scroll", handleActivity);
    };
  }, [isUserSignedIn, handleSignOut]);

  return (
    <NavbarBs
      sticky="top"
      className="shadow-sm mb-3"
      style={{ backgroundColor: "#14532d", opacity: "0.9" }} // Slight change for better visibility on various backgrounds
    >
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
                variant="outline-success" // Changed for a bit more visibility
                onClick={handleSignOut}
                style={{ marginLeft: "0.5rem", color: "#a3e635" }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Nav.Link as={NavLink} to="/signup" style={{ color: "#a3e635" }}>
              Signup
            </Nav.Link>
          )}
        </Nav>
        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            variant="outline-success" // Consistency in button style
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
