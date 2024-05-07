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
import Payment from "./Components/Payment";
import DragAndDrop from "./Components/DragandDrop";
import { ThemeProvider } from "./context/ThemeContext";
import Toggle from "./Components/Toogle";

function App() {
  return (
    <ThemeProvider>
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
            <Route path="/draganddrop" element={<DragAndDrop />} />
            <Route path="/toggle" element={<Toggle />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </ThemeProvider>
  );
}

export default App;
