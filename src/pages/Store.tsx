import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import { StoreItem } from "../Components/StoreItem";
import storeItems from "../items.json";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export function Store() {
  const [userName, setUserName] = useState("");
  const [isUserSignedIn, setIsUserSignedIn] = useState(false); // Zustandsvariable für den Anmeldestatus
  const navigate = useNavigate();
  const { openCart, cartQuantity } = useShoppingCart();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
      setIsUserSignedIn(true); //  true, wenn ein Benutzername gespeichert ist
    } else {
      setIsUserSignedIn(false); //  false, wenn kein Benutzername gespeichert ist
    }
  }, []);

  return (
    <>
      {userName && <h1>Welcome, {userName}!</h1>}
      {isUserSignedIn && cartQuantity > 0 && (
        <Button
          onClick={openCart}
          variant="outline-success"
          style={{
            position: "relative",
            left: "80%",
            width: "3rem",
            height: "3rem",
          }}
          className="rounded-circle"
        >
          <FontAwesomeIcon icon={faShoppingCart} style={{ color: "#63E6BE" }} />
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
      <Row md={2} xs={1} lg={2} className="g-3" style={{ marginTop: "50px" }}>
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
