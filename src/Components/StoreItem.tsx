import React from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
// import { CartSearchField } from "./CartSearchField";
import "../styles/button.css";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  const handleSearchTermChange = (term: string) => {
    console.log(term);
  };

  return (
    <>
      {/* <CartSearchField onSearchTermChange={handleSearchTermChange} /> */}
      <Card
        className="card-custom"
        style={{ backgroundColor: "#d9f99d", padding: "20px" }}
      >
        <Card.Img
          variant="top"
          src={imgUrl}
          width="350px"
          height="400px"
          style={{
            objectFit: "contain",
            padding: "20px",
            border: "2px solid green",
          }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
            <span style={{ color: "#422006" }} className="fs-2">
              {name}
            </span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>
          </Card.Title>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                className="btn-glow"
                onClick={() => increaseCartQuantity(id)}
              >
                + Add To Cart
              </Button>
            ) : (
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button
                    onClick={() => decreaseCartQuantity(id)}
                    className="btn-glow"
                  >
                    -
                  </Button>
                  <div>
                    <span className="fs-3">{quantity}</span> in cart
                  </div>
                  <Button
                    onClick={() => increaseCartQuantity(id)}
                    className="btn-glow"
                  >
                    +
                  </Button>
                </div>
                <Button
                  onClick={() => removeFromCart(id)}
                  className="btn-glow"
                  variant="danger"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
