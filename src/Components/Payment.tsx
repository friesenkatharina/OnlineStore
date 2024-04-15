// import React, { useState, ChangeEvent, FormEvent } from "react";
// import { Button, Form } from "react-bootstrap";
// import axios from "axios";

// interface ShippingData {
//   fullName: string;
//   address: string;
//   city: string;
//   zipCode: string;
//   country: string;
// }

// export const Payment = () => {
//   const [shippingData, setShippingData] = useState<ShippingData>({
//     fullName: "",
//     address: "",
//     city: "",
//     zipCode: "",
//     country: "",
//   });

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setShippingData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault();

//     const authToken = sessionStorage.getItem("token");
//     console.log("Auth Token:", authToken);

//     if (!authToken) {
//       console.error("No auth token available. User might not be logged in.");

//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/shipping",
//         shippingData,
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );
//       console.log(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 403) {
//         console.error(
//           "Access Denied: You do not have permission to perform this action."
//         );
//       } else {
//         console.error("Error sending data:", error);
//       }
//     }
//   };

//   return (
//     <Form
//       onSubmit={handleSubmit}
//       style={{ background: "#166534", width: "600px" }}
//     >
//       <Form.Group
//         className="mb-3"
//         controlId="formFullName"
//         style={{ padding: "20px" }}
//       >
//         <Form.Label>Vollständiger Name</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Vollständiger Name"
//           name="fullName"
//           value={shippingData.fullName}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group
//         className="mb-3"
//         controlId="formAddress"
//         style={{ padding: "20px" }}
//       >
//         <Form.Label>Adresse</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Straße und Hausnummer"
//           name="address"
//           value={shippingData.address}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group
//         className="mb-3"
//         controlId="formCity"
//         style={{ padding: "20px" }}
//       >
//         <Form.Label>Stadt</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Stadt"
//           name="city"
//           value={shippingData.city}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group
//         className="mb-3"
//         controlId="formZipCode"
//         style={{ padding: "20px" }}
//       >
//         <Form.Label>Postleitzahl</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="PLZ"
//           name="zipCode"
//           value={shippingData.zipCode}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Form.Group
//         className="mb-3"
//         controlId="formCountry"
//         style={{ padding: "20px" }}
//       >
//         <Form.Label>Land</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Land"
//           name="country"
//           value={shippingData.country}
//           onChange={handleChange}
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit" style={{ margin: "50px" }}>
//         Weiter 🖖
//       </Button>
//     </Form>
//   );
// };
