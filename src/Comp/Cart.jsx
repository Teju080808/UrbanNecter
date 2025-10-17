import React, { useContext, useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteAction,
  incrementQuantity,
} from "./ReducCart/Action";
import { myContext } from "./context";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { show, setShow } = useContext(myContext);
  const handleClose = () => setShow(false);

  const data = useSelector((store) => store);
  const cartCount = data.reduce((acc, item) => acc + item.quantity, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Coupon State
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(data));
  }, [data]);

  function handleDelete(i) {
    dispatch(deleteAction(i));
  }

  // Price Calculation
  const totalPrice = data.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const gstAmount = totalPrice * 0.05; 
  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalAmount = totalPrice + gstAmount - discountAmount;

  // Coupon logic
  const applyCoupon = () => {
    const validCoupons = {
      FOOD10: 10,
      FOOD20: 20,
      FOOD50: 50,
    };
    const entered = coupon.toUpperCase();
    if (validCoupons[entered]) {
      setDiscountPercent(validCoupons[entered]);
      setMessage(`${validCoupons[entered]}% discount applied!`);
    } else {
      setDiscountPercent(0);
      setMessage("Invalid coupon code");
    }
  };

  // Checkout
  function handleCheckout() {
    if (data.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Save final amount
    localStorage.setItem("cartTotal", finalAmount);
    navigate("/checkout");
    setShow(false);
  }

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton style={{ backgroundColor: "#09a325" }}>
        <Offcanvas.Title>
          <h4 className="text-light">
            {cartCount} Item{cartCount > 1 ? "s" : ""} in Cart
          </h4>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="bg-light">
        {data.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          data.map((item, i) => (
            <div key={i} className="row align-items-center mb-3">
              <div className="col-12 col-md-6 mb-2 mb-md-0">
                <h6>{item.title}</h6>
                <p className="mb-1">Price: ₹{item.price}</p>
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => dispatch(decrementQuantity(i))}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => dispatch(incrementQuantity(i))}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-12 col-md-6 text-center">
                <span
                  style={{
                    cursor: "pointer",
                    color: "#dc3545",
                    fontSize: "1.2rem",
                  }}
                  onClick={() => handleDelete(i)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </span>
                <h6 className="mt-2">
                  Item Total: ₹{item.price * item.quantity}
                </h6>
              </div>
              <hr className="my-2" />
            </div>
          ))
        )}
      </Offcanvas.Body>

      {/* Coupon Section */}
      <div className="pt-5 ps-3 pe-3 border-top">
        <h6>Apply Coupon</h6>
        <div className="d-flex mb-2">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="form-control"
            style={{ marginRight: "10px" }}
          />
          <button
            className="btn text-white"
            style={{ backgroundColor: "#09a325" }}
            onClick={applyCoupon}
          >
            Apply
          </button>
        </div>
        {message && (
          <p
            className="mt-1"
            style={{
              color: discountPercent ? "#09a325" : "red",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
      </div>

      {/* Price Details */}
      {data.length > 0 && (
        <div className="ps-3">
          <p>Subtotal: ₹{totalPrice.toFixed(2)}</p>
          <p>GST (5%): ₹{gstAmount.toFixed(2)}</p>
          {discountPercent > 0 && (
            <p style={{ color: "red" }}>
              Discount ({discountPercent}%): -₹{discountAmount.toFixed(2)}
            </p>
          )}
          <h5>Final Amount: ₹{finalAmount.toFixed(2)}</h5>

          <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
            <button className="btn btn-secondary w-50" onClick={() => navigate("/cartpage")}>View Cart</button>
            <button
              className="btn btn-success w-50"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </Offcanvas>
  );
}

export default Cart;
