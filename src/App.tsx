import { Routes, Route } from "react-router-dom";
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
import { ThemeProvider } from "./context/ThemeContext";
import AccountPage from "./Components/Account";

function App() {
  return (
    <ThemeProvider>
      <ShoppingCartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
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
        </Routes>
      </ShoppingCartProvider>
    </ThemeProvider>
  );
}

export default App;
