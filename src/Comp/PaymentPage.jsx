import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get order details from Checkout page
  const order = location.state || {}; 
  const { paymentMethod, paymentNumber, note, total = 0 } = order;

  const orderNumber = Math.floor(Math.random() * 9000) + 1000;
  const today = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Simulate payment success/failure
  const paymentSuccess = paymentMethod === "cod" || !!paymentNumber;
  const errorMessage = paymentSuccess
    ? ""
    : "Payment failed: Please check your card/account details.";

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "60px 15%",
        fontFamily: "Arial, sans-serif",
        color: "#111",
      }}
    >
      <h2 style={{ marginBottom: "40px" }}>Order Summary</h2>

      {/* Order Details */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
          fontSize: "15px",
        }}
      >
        <div>
          <p style={{ color: "#777", marginBottom: "5px" }}>ORDER NUMBER:</p>
          <p style={{ fontWeight: "bold" }}>{orderNumber}</p>
        </div>
        <div>
          <p style={{ color: "#777", marginBottom: "5px" }}>DATE:</p>
          <p style={{ fontWeight: "bold" }}>{today}</p>
        </div>
        <div>
          <p style={{ color: "#777", marginBottom: "5px" }}>TOTAL:</p>
          <p style={{ fontWeight: "bold" }}>₹{total.toFixed(2)}</p>
        </div>
        <div>
          <p style={{ color: "#777", marginBottom: "5px" }}>PAYMENT METHOD:</p>
          <p style={{ fontWeight: "bold" }}>
            {paymentMethod} {paymentNumber && `(${paymentNumber})`}
          </p>
        </div>
      </div>

      {/* Note */}
      {note && (
        <div
          style={{
            marginBottom: "30px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: "#f8f8f8",
          }}
        >
          <h4>Note</h4>
          <p>{note}</p>
        </div>
      )}

      {/* Payment Status */}
      <div
        style={{
          padding: "20px",
          borderRadius: "4px",
          border: "1px solid #ddd",
          backgroundColor: paymentSuccess ? "#e6ffed" : "#ffe6e6",
          color: paymentSuccess ? "#0a0" : "#c00",
          fontWeight: "500",
          fontSize: "15px",
        }}
      >
        {paymentSuccess
          ? "Payment Successful! Your order has been placed."
          : errorMessage}
      </div>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#09a325",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
