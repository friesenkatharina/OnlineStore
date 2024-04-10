import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";

interface ShippingData {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export const Payment = () => {
  const [shippingData, setShippingData] = useState<ShippingData>({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setShippingData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(shippingData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formFullName">
        <Form.Label>Vollständiger Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Vollständiger Name"
          name="fullName"
          value={shippingData.fullName}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Adresse</Form.Label>
        <Form.Control
          type="text"
          placeholder="Straße und Hausnummer"
          name="address"
          value={shippingData.address}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCity">
        <Form.Label>Stadt</Form.Label>
        <Form.Control
          type="text"
          placeholder="Stadt"
          name="city"
          value={shippingData.city}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formZipCode">
        <Form.Label>Postleitzahl</Form.Label>
        <Form.Control
          type="text"
          placeholder="PLZ"
          name="zipCode"
          value={shippingData.zipCode}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCountry">
        <Form.Label>Land</Form.Label>
        <Form.Control
          type="text"
          placeholder="Land"
          name="country"
          value={shippingData.country}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Weiter
      </Button>
    </Form>
  );
};
