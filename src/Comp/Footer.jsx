import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="container-fluid p-5 bg-light">
      <div className="row justify-content-center text-center text-md-start">
        <div className="col-lg-4 col-md-6 p-3 mb-4 mb-md-0">
          <img
            className="img-fluid"
            src="https://www.urbannecter.com/wp-content/uploads/2024/08/UN-logo-1-02.png"
            alt="logo"
          />
        </div>

        <div className="col-lg-4 col-md-6 p-3 mb-4 mb-md-0">
          <ul className="list-unstyled p-0 m-0 text-center text-md-start">
            <li className="mb-2">
              <Link to="/" style={{ textDecoration: "none", color: "black", fontSize: "18px" }}>
                Home
              </Link>
            </li>
            <li className="mb-2">
              <a href="#" style={{ textDecoration: "none", color: "black", fontSize: "18px" }}>
                Shipping & Return
              </a>
            </li>
            <li className="mb-2">
              <a href="#" style={{ textDecoration: "none", color: "black", fontSize: "18px" }}>
                Privacy Policy
              </a>
            </li>
            <li className="mb-2">
              <a href="#" style={{ textDecoration: "none", color: "black", fontSize: "18px" }}>
                Terms & Condition
              </a>
            </li>
            <li className="mb-2">
              <a href="#" style={{ textDecoration: "none", color: "black", fontSize: "18px" }}>
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="col-lg-4 col-md-12 p-3 mb-4 mb-md-0">
          <div className="row g-2 justify-content-center">
            <div className="col-4">
              <img
                src="https://www.urbannecter.com/wp-content/uploads/elementor/thumbs/Tiramisu-Cold-Coffee-1-qurewv77718z1oyem39cy3mhsbtngmp8r0004jy8yw.jpg"
                alt=""
                className="img-fluid rounded"
              />
            </div>
            <div className="col-4">
              <img
                src="https://www.urbannecter.com/wp-content/uploads/elementor/thumbs/grill-sandwich-qurdwabb856980397s11etxpji4ewohapy0qrw6t48.jpg"
                alt=""
                className="img-fluid rounded"
              />
            </div>
            <div className="col-4">
              <img
                src="https://www.urbannecter.com/wp-content/uploads/elementor/thumbs/mixed-fruit-juice-qurd84ulme40wp678u74ufcc235w4nll2ekluxzyzs.jpg"
                alt=""
                className="img-fluid rounded"
              />
            </div>
            <div className="col-4">
              <img
                src="https://www.urbannecter.com/wp-content/uploads/elementor/thumbs/Veg-club-qurdby31c7bvzrmuzhinygpmscdhcgqe99thxcchrc.jpg"
                alt=""
                className="img-fluid rounded"
              />
            </div>
            <div className="col-4">
              <img
                src="https://www.urbannecter.com/wp-content/uploads/elementor/thumbs/Peanut-Banana-Smoothie-quoa6j4vm1ozz7wwfupbi7gti6u9u7e443tj05a9rc.webp"
                alt=""
                className="img-fluid rounded"
              />
            </div>
            <div className="col-4">
              <img
                src="https://www.urbannecter.com/wp-content/uploads/elementor/thumbs/Irish-Cold-Coffee-quo8m4thjwhndhu1rh35wft6dwtfzzhwcyoqegwn3c.jpg"
                alt=""
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="row p-3 justify-content-center text-center text-md-start">
        <div className="col-md-6 mb-3 mb-md-0">
          <p>Copyright ©2024 All rights reserved. Designed By OreoDigi</p>
        </div>
        <div className="col-md-6">
          <ul className="list-unstyled d-flex justify-content-center justify-content-md-end gap-3 mb-0">
            <li>FOLLOW US:</li>
            <li>
              <a href="https://www.facebook.com/" className="text-dark">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" className="text-dark">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://www.pinterest.com/" className="text-dark">
                <i className="fa-brands fa-square-pinterest"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
