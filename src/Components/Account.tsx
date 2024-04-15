import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";


interface ShippingData {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}


  return (
    <Form
      onSubmit={handleSubmit}
      style={{ background: "#166534", width: "600px" }}
    >
      <Form.Group
        className="mb-3"
        controlId="formFullName"
        style={{ padding: "20px" }}
      >
        <Form.Label>Vollständiger Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Vollständiger Name"
          name="fullName"
          value={shippingData.fullName}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formAddress"
        style={{ padding: "20px" }}
      >
        <Form.Label>Adresse</Form.Label>
        <Form.Control
          type="text"
          placeholder="Straße und Hausnummer"
          name="address"
          value={shippingData.address}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formCity"
        style={{ padding: "20px" }}
      >
        <Form.Label>Stadt</Form.Label>
        <Form.Control
          type="text"
          placeholder="Stadt"
          name="city"
          value={shippingData.city}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formZipCode"
        style={{ padding: "20px" }}
      >
        <Form.Label>Postleitzahl</Form.Label>
        <Form.Control
          type="text"
          placeholder="PLZ"
          name="zipCode"
          value={shippingData.zipCode}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formCountry"
        style={{ padding: "20px" }}
      >
        <Form.Label>Land</Form.Label>
        <Form.Control
          type="text"
          placeholder="Land"
          name="country"
          value={shippingData.country}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" style={{ margin: "50px" }}>
        Weiter 🖖
      </Button>
    </Form>
  );
};
