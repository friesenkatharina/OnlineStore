import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-secondary text-light py-3 mt-auto">
      {" "}
      {/* Zusätzlichen Abstand oben und eine dunkle Hintergrundfarbe */}
      <Container>
        <Row>
          <Col className="text-center text-md-left mb-3 mb-md-0">
            &copy; {new Date().getFullYear()} Makramee Deco Store
          </Col>
          <Col className="text-center text-md-right">
            {/* Link-Beispiele, ersetzen Sie die href-Attribute durch Ihre tatsächlichen Pfade */}
            <NavLink to="/" className="text-light mx-2">
              Home
            </NavLink>
            <NavLink to="/about" className="text-light mx-2">
              About
            </NavLink>
            <NavLink to="/store" className="text-light mx-2">
              Store
            </NavLink>
            {/* Sie können weitere Links oder Informationen hinzufügen, wie es für Ihre Anwendung erforderlich ist */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
