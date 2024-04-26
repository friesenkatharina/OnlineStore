import React, { useEffect } from "react";
import { Container, Nav, Navbar as NavbarBs, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
// import { useTheme } from "../context/ThemeContext";
import "../styles/index.css";
import Image from "/makrameeLogo.png";

export function Navbar() {
  const navigate = useNavigate();

  // const { theme, toggleTheme } = useTheme();

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
    let timer: NodeJS.Timeout;
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
      className="shadow-sm mb-4"
      style={{
        backgroundColor: "#14532d",
        opacity: "0.9",
        height: "100px",
        fontSize: "20px",
      }}
    >
      <Container>
        <img
          src={Image}
          alt="Logo"
          style={{
            width: "50px",
            position: "absolute",
            left: "5%",
            top: "70%",
          }}
        />
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
                variant="outline-success"
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

          {/* <Button
            variant="outline-success"
            onClick={toggleTheme}
            style={{ marginLeft: "0.5rem", height: "40px", width: "40px" }}
          >
            {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          </Button> */}
        </Nav>
      </Container>
    </NavbarBs>
  );
}
