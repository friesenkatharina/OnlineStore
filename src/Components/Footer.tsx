import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="text-light py-3 mt-auto"
      style={{ backgroundColor: "#14532d", opacity: "0.7" }}
    >
      <Container>
        <Row>
          <Col className="text-center text-md-left mb-3 mb-md-0">
            &copy; {new Date().getFullYear()} Makramee Deco Store
          </Col>
          <Col className="text-center text-md-right">
            <NavLink to="/" className="text-light mx-2">
              Home
            </NavLink>
            <NavLink to="/about" className="text-light mx-2">
              About
            </NavLink>
            <NavLink to="/store" className="text-light mx-2">
              Store
            </NavLink>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
