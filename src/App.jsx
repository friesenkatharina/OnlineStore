import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import { Store } from "./pages/Store";
import About from "./pages/About";
import { Navbar } from "./Components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ProtectedRoute from "../src/Components/ProtectedRoute";
import CheckoutForm from "../src/Components/Checkouform";
import ContactForm from "../src/Components/ContactForm";
import Payment from "./Components/Payment";
import DragAndDrop from "./Components/DragandDrop";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/store"
            element={
              <ProtectedRoute>
                <Store />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkoutform" element={<CheckoutForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/draganddrop" element={<DragAndDrop />} />{" "}
          {/* Route für DragAndDrop hinzufügen */}
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
