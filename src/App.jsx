import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import { Store } from "./pages/Store";
import About from "./pages/About";
import { Navbar } from "./Components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import SignUp from "./Components/SignUp";
import Account from "./Components/Account";
import Login from "./Components/Login";

function App() {
  const isUserSignedIn = !!localStorage.getItem("token");

  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          {isUserSignedIn && <Route path="/account" element={<Account />} />}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
