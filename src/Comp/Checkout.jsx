import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Checkout() {
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;

  const [email, setEmail] = useState(loggedInUser?.email || "");
  const [emailError, setEmailError] = useState("");

  const [billing, setBilling] = useState({
    name: "John Doe",
    street: "123 Street",
    state: "Uttar Pradesh, India",
    phone: "9876543210",
  });
  const [isEditingBilling, setIsEditingBilling] = useState(false);

  const [pickup, setPickup] = useState({
    name: "Spectrum Mall",
    address: "Metro Station Rd, Sector 75, Noida, Uttar Pradesh 201301, Delhi",
    floor: "Ground Floor",
    cost: "FREE",
  });
  const [isEditingPickup, setIsEditingPickup] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const [note, setNote] = useState("");

  useEffect(() => {
    const savedBilling = localStorage.getItem("billingAddress");
    if (savedBilling) setBilling(JSON.parse(savedBilling));

    const savedPickup = localStorage.getItem("pickupLocation");
    if (savedPickup) setPickup(JSON.parse(savedPickup));
  }, []);

  useEffect(() => {
    localStorage.setItem("billingAddress", JSON.stringify(billing));
  }, [billing]);

  useEffect(() => {
    localStorage.setItem("pickupLocation", JSON.stringify(pickup));
  }, [pickup]);

  const finalAmount = parseFloat(localStorage.getItem("cartTotal")) || 0;

  // Validate email
  const validateEmail = () => {
    if (!loggedInUser) {
      setEmailError("Please login first.");
      return false;
    }
    if (email.trim() !== loggedInUser.email) {
      setEmailError("Email does not match logged-in user.");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Validate payment
  const validatePayment = () => {
    if (paymentMethod === "card") {
      if (!/^\d{16}$/.test(paymentNumber)) {
        setPaymentError("Please enter a valid 16-digit card number.");
        return false;
      }
    } else if (paymentMethod === "netbanking") {
      if (!/^\d{10,}$/.test(paymentNumber)) {
        setPaymentError("Net banking account number must be at least 10 digits.");
        return false;
      }
    }
    setPaymentError("");
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateEmail()) return;
    if (paymentMethod !== "cod" && !validatePayment()) return;

    navigate("/payment", {
      state: {
        billing,
        pickup,
        paymentMethod,
        paymentNumber,
        note,
        total: finalAmount,
      },
    });
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", padding: "40px 15%", fontFamily: "Arial, sans-serif", color: "#111" }}>
      <h3 style={{ marginBottom: "30px" }}>Checkout</h3>

      {/* Contact Info */}
      <section style={{ marginBottom: "30px" }}>
        <h5>Contact information</h5>
        <span
          onClick={() => navigate("/login")}
          style={{ display: "flex", justifyContent: "flex-end", color: "#09a325", cursor: "pointer", marginBottom: "5px" }}
        >
          Login
        </span>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", border: emailError ? "1px solid red" : "1px solid #aaa", borderRadius: "3px" }}
        />
        {emailError && <p style={{ color: "red", marginTop: "5px" }}>{emailError}</p>}
      </section>

      {/* Pickup Location */}
      <section style={{ marginBottom: "30px" }}>
        <h5>Pickup Location</h5>
        <div style={{ border: "1px solid #aaa", padding: "15px", borderRadius: "4px", position: "relative" }}>
          {!isEditingPickup ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{pickup.name}</strong>
                <span style={{ color: "#09a325", fontWeight: "bold" }}>{pickup.cost}</span>
              </div>
              <p style={{ margin: "5px 0" }}>{pickup.address}</p>
              <p>{pickup.floor}</p>
              <span
                onClick={() => setIsEditingPickup(true)}
                style={{ position: "absolute", top: "15px", right: "15px", color: "#09a325", cursor: "pointer" }}
              >
                Edit
              </span>
            </>
          ) : (
            <>
              <input type="text" value={pickup.name} onChange={(e) => setPickup({ ...pickup, name: e.target.value })} placeholder="Pickup Name" style={{ width: "100%", padding: "8px", marginBottom: "8px" }} />
              <input type="text" value={pickup.address} onChange={(e) => setPickup({ ...pickup, address: e.target.value })} placeholder="Address" style={{ width: "100%", padding: "8px", marginBottom: "8px" }} />
              <input type="text" value={pickup.floor} onChange={(e) => setPickup({ ...pickup, floor: e.target.value })} placeholder="Floor / Details" style={{ width: "100%", padding: "8px", marginBottom: "8px" }} />
              <input type="text" value={pickup.cost} onChange={(e) => setPickup({ ...pickup, cost: e.target.value })} placeholder="Cost" style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
              <button onClick={() => setIsEditingPickup(false)} style={{ backgroundColor: "#09a325", color: "#fff", padding: "8px 20px", border: "none", borderRadius: "3px", cursor: "pointer" }}>Save</button>
            </>
          )}
        </div>
      </section>

      {/* Billing */}
      <section style={{ marginBottom: "30px" }}>
        <h5>Billing Address</h5>
        <div style={{ border: "1px solid #aaa", padding: "15px", borderRadius: "4px", position: "relative" }}>
          {!isEditingBilling ? (
            <>
              <strong>{billing.name}</strong>
              <p>{billing.street}, {billing.state}</p>
              <p>{billing.phone}</p>
              <span
                onClick={() => setIsEditingBilling(true)}
                style={{ position: "absolute", top: "15px", right: "15px", color: "#09a325", cursor: "pointer" }}
              >
                Edit
              </span>
            </>
          ) : (
            <>
              <input type="text" value={billing.name} onChange={(e) => setBilling({ ...billing, name: e.target.value })} placeholder="Full Name" style={{ width: "100%", padding: "8px", marginBottom: "8px" }} />
              <input type="text" value={billing.street} onChange={(e) => setBilling({ ...billing, street: e.target.value })} placeholder="Street / Area" style={{ width: "100%", padding: "8px", marginBottom: "8px" }} />
              <input type="text" value={billing.state} onChange={(e) => setBilling({ ...billing, state: e.target.value })} placeholder="State" style={{ width: "100%", padding: "8px", marginBottom: "8px" }} />
              <input type="text" value={billing.phone} onChange={(e) => setBilling({ ...billing, phone: e.target.value })} placeholder="Phone Number" style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
              <button onClick={() => setIsEditingBilling(false)} style={{ backgroundColor: "#09a325", color: "#fff", padding: "8px 20px", border: "none", borderRadius: "3px", cursor: "pointer" }}>Save</button>
            </>
          )}
        </div>
      </section>

      {/* Payment */}
      <section style={{ marginBottom: "30px" }}>
        <h5>Payment Options</h5>
        <label style={{ display: "block", marginBottom: "8px" }}>
          <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash on Delivery
        </label>
        <label style={{ display: "block", marginBottom: "8px" }}>
          <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={(e) => setPaymentMethod(e.target.value)} /> Card Payment
        </label>
        <label style={{ display: "block", marginBottom: "8px" }}>
          <input type="radio" name="payment" value="netbanking" checked={paymentMethod === "netbanking"} onChange={(e) => setPaymentMethod(e.target.value)} /> Net Banking
        </label>

        {paymentMethod !== "cod" && (
          <>
            <input
              type="text"
              placeholder={paymentMethod === "card" ? "Enter 16-digit card number" : "Enter net banking account number"}
              value={paymentNumber}
              onChange={(e) => setPaymentNumber(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "8px", border: paymentError ? "1px solid red" : "1px solid #aaa" }}
              maxLength={paymentMethod === "card" ? 16 : undefined}
            />
            {paymentError && <p style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>{paymentError}</p>}
          </>
        )}
      </section>

      {/* Note */}
      <section style={{ marginBottom: "30px" }}>
        <label>Add a note to your order</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type your note here..." style={{ width: "100%", height: "70px", padding: "8px", marginTop: "5px" }}></textarea>
      </section>

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/cart")} style={{ background: "none", border: "none", cursor: "pointer" }}>← Return to Cart</button>
        <button onClick={handlePlaceOrder} style={{ backgroundColor: "#09a325", color: "#fff", padding: "10px 25px", border: "none", borderRadius: "3px", cursor: "pointer" }}>Place Order</button>
      </div>
    </div>
  );
}

export default Checkout;
