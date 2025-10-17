import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "./context";
import Cart from "./Cart";

export default function Header() {
  const { show, setShow, showName, setShowName } = useContext(myContext);
  const navigate = useNavigate();

  // Cart count state
  const [cartCount, setCartCount] = useState(0);

  // Function to update cart count
  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];
    const count = cartItems.reduce(
      (acc, item) => acc + (item.quantity || 1),
      0
    );
    setCartCount(count);
  };

  // Initial load
  useEffect(() => {
    updateCartCount();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setShowName(false);
    navigate("/login");
  };

  const styling = {
    Navbar: {
      position: "sticky",
      top: 0,
      zIndex: 1,
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    cartButtonWrapper: {
      position: "fixed",
      bottom: "30px",
      right: "30px",
      zIndex: 2,
    },
    cartButton: {
      border: "none",
      backgroundColor: "#09a325",
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      cursor: "pointer",
      position: "relative",
      color: "#fff",
      fontSize: "20px",
    },
    badge: {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      backgroundColor: "red",
      color: "white",
      borderRadius: "50%",
      width: "18px",
      height: "18px",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
    },
  };

  return (
    <>
      <Navbar expand="lg" style={styling.Navbar} className="py-2">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="https://www.urbannecter.com/wp-content/uploads/2024/08/UN-logo-1-02.png"
              alt="logo"
              width="160px"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto align-items-center gap-3">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/menu">
                Menu
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>

              {showName && (
                <>
                  <span className="fw-bold text-success">{showName}</span>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: "black",
                      border: "none",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showName && (
        <div style={styling.cartButtonWrapper}>
          <button
            onClick={() => setShow(show === "cart" ? null : "cart")}
            style={styling.cartButton}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {cartCount > 0 && <span style={styling.badge}>{cartCount}</span>}
          </button>
        </div>
      )}

      {/* Mini Cart with updateCartCount prop */}
      {show === "cart" && <Cart updateCartCount={updateCartCount} />}
    </>
  );
}
