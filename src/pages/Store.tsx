import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../Components/StoreItem";
import storeItems from "../data/items.json";
import React, { useEffect, useState } from "react";

export function Store() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <>
      {userName && <h1>Welcome, {userName}!</h1>}
      <Row md={2} xs={1} lg={2} className="g-3">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} imgUrl={item.imgUrl} />
          </Col>
        ))}
      </Row>
      <br />
      <Row md={2} xs={1} lg={2} className="g-3">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} imgUrl={item.imgUrl} />
          </Col>
        ))}
      </Row>
      <br />
      <Row md={2} xs={1} lg={2} className="g-3">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} imgUrl={item.imgUrl} />
          </Col>
        ))}
      </Row>
    </>
  );
}
