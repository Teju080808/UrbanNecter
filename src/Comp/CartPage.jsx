import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItem");
    return saved ? JSON.parse(saved) : [];
  });

  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [message, setMessage] = useState("");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const gstAmount = totalPrice * 0.05;
  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalAmount = totalPrice + gstAmount - discountAmount;

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
    localStorage.setItem("cartTotal", finalAmount);
  }, [cartItems, finalAmount]);

  const applyCoupon = () => {
    const validCoupons = { FOOD10: 10, FOOD20: 20, FOOD50: 50 };
    const entered = coupon.toUpperCase();
    if (validCoupons[entered]) {
      setDiscountPercent(validCoupons[entered]);
      setMessage(`${validCoupons[entered]}% discount applied!`);
    } else {
      setDiscountPercent(0);
      setMessage("Invalid coupon code");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  const incrementQty = (index) => {
    const newItems = [...cartItems];
    newItems[index].quantity += 1;
    setCartItems(newItems);
  };

  const decrementQty = (index) => {
    const newItems = [...cartItems];
    if (newItems[index].quantity > 1) {
      newItems[index].quantity -= 1;
      setCartItems(newItems);
    }
  };

  const removeItem = (index) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "30px" }}>My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          
          {/* Cart Items Table */}
          <div style={{ flex: "2 1 60%", minWidth: "300px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #ddd" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>Product</th>
                  <th style={{ padding: "10px" }}>Price</th>
                  <th style={{ padding: "10px" }}>Quantity</th>
                  <th style={{ padding: "10px" }}>Total</th>
                  <th style={{ padding: "10px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px" }}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} 
                      />
                      <span>{item.title}</span>
                    </td>
                    <td style={{ textAlign: "center" }}>₹{item.price }</td>
                    <td style={{ textAlign: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                        <button className="btn btn-outline-success btn-sm" onClick={() => decrementQty(index)}>-</button>
                        <span>{item.quantity}</span>
                        <button className="btn btn-outline-success btn-sm" onClick={() => incrementQty(index)}>+</button>
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>₹{(item.price * item.quantity).toFixed(2)}</td>
                    <td style={{ textAlign: "center" }}>
                      <button 
                        onClick={() => removeItem(index)} 
                        style={{ color: "#dc3545", border: "none", background: "none", cursor: "pointer" }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Price Summary */}
          <div style={{ flex: "1 1 35%", minWidth: "250px", border: "1px solid #ddd", borderRadius: "6px", padding: "15px", height: "fit-content" }}>
            <h4>Price Summary</h4>
            <p>Subtotal: ₹{totalPrice.toFixed(2)}</p>
            <p>GST (5%): ₹{gstAmount.toFixed(2)}</p>
            {discountPercent > 0 && <p style={{ color: "red" }}>Discount ({discountPercent}%): -₹{discountAmount.toFixed(2)}</p>}
            <h3>Total: ₹{finalAmount.toFixed(2)}</h3>

            {/* Coupon */}
            <div style={{ marginTop: "15px" }}>
              <h5>Apply Coupon</h5>
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                style={{ padding: "5px", marginRight: "10px", width: "60%" }}
              />
              <button onClick={applyCoupon} style={{ padding: "5px 10px", backgroundColor: "#09a325", color: "#fff", border: "none" }}>
                Apply
              </button>
              {message && <p style={{ color: discountPercent ? "#09a325" : "red", fontWeight: "bold" }}>{message}</p>}
            </div>

            <button
              onClick={handleCheckout}
              style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#09a325", color: "#fff", border: "none", borderRadius: "3px", width: "100%" }}
            >
              Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default CartPage;
