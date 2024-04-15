import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import { Store } from "./pages/Store";
import About from "./pages/About";
import { Navbar } from "./Components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import CheckoutForm from "./Components/Checkouform";
import ContactForm from "./Components/ContactForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const stripePromise = loadStripe("VITE_REACT_APP_PUBLIC_STRIPE_KEY");

  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Elements stripe={stripePromise}>
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
            <Route path="/contact" element={<ContactForm />} />
            {/* <Route path="/register" element={<Register />} /> */}
          </Routes>
        </Elements>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
