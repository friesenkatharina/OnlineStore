import { Col, Row, Dropdown } from "react-bootstrap";
import { StoreItem } from "../Components/StoreItem";
import storeItems from "../items.json";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import DragAndDrop from "../Components/DragandDrop";

export function Store() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // const goToDragAndDrop = () => {
  //   navigate("/draganddrop");
  // };

  return (
    <>
      {userName && <h1>Welcome, {userName}!</h1>}

      {/* <Dropdown style={{ position: "absolute", top: "11%", right: "5%" }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          your own ShoppingList
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={goToDragAndDrop}>
            <DragAndDrop />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
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
