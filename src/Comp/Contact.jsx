import React, { useState } from "react";

function Contact() {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [showForth, setShowForth] = useState(false);

  const faqStyle = {
    cursor: "pointer",
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
    transition: "0.3s ease",
  };

  const faqTextStyle = {
    paddingTop: "10px",
    color: "#333",
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 mb-4">
          <h1>Need Assistance?</h1>
          <p>
            Our team is dedicated to helping you make the best choices for
            your health and wellness. Whether you’re exploring our menu online
            or dining with us in person, we’re here to share our passion for
            nutritious, delicious meals and the benefits they bring.
          </p>
          <p>
            Many of your questions might be answered in our FAQs. If you need
            further assistance, don’t hesitate to reach out by filling out our
            contact form or calling our customer service team at 778 568 999.
          </p>
        </div>

        <div className="col-md-6 bg-light p-4 mb-4 rounded">
          <ul style={{ listStyle: "none", textAlign: "center", padding: 0 }}>
            <li className="mb-3">
              <h5>STORE ADDRESS</h5>
              <p>
                Ground floor Shop no IN 1, Spectrum Metro Mall Noida Sector
                75, 201307.
              </p>
            </li>
            <li className="mb-3">
              <h5>OPENING HOURS</h5>
              <p>Monday – Sunday, 10AM to 11PM</p>
            </li>
            <li className="mb-3">
              <h5>CONTACT</h5>
              <p>+91 70 427 995 57</p>
              <p>info@urbannecter.com</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-12 col-md-8">
          <h1 className="pb-3 text-center">Popular Questions</h1>

          <div style={faqStyle} onClick={() => setShowFirst(!showFirst)}>
            <h5>How can I track my order?</h5>
            {showFirst && (
              <p style={faqTextStyle}>
                Authoritatively morph cross functional potentialities with
                cutting-edge communities. Energistically visualize covalent
                materials rather than professional vortals. Enthusiastically
                reconceptualize team driven internal or “organic” sources.
              </p>
            )}
          </div>

          <div style={faqStyle} onClick={() => setShowSecond(!showSecond)}>
            <h5>How do I know that I have successfully placed an order?</h5>
            {showSecond && (
              <p style={faqTextStyle}>
                Authoritatively morph cross functional potentialities with
                cutting-edge communities. Energistically visualize covalent
                materials rather than professional vortals.
              </p>
            )}
          </div>

          <div style={faqStyle} onClick={() => setShowThird(!showThird)}>
            <h5>How do I return an item for an exchange or refund?</h5>
            {showThird && (
              <p style={faqTextStyle}>
                Authoritatively morph cross functional potentialities with
                cutting-edge communities. Energistically visualize covalent
                materials rather than professional vortals.
              </p>
            )}
          </div>

          <div style={faqStyle} onClick={() => setShowForth(!showForth)}>
            <h5>How do I cancel an order?</h5>
            {showForth && (
              <p style={faqTextStyle}>
                Authoritatively morph cross functional potentialities with
                cutting-edge communities. Energistically visualize covalent
                materials rather than professional vortals.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <div style={{ width: "100%", height: "400px", borderRadius: "15px", overflow: "hidden" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7007.597706369105!2d77.37533299112624!3d28.57580227471822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sGround%20floor%20Shop%20no%20IN%201%2C%20Spectrum%20Metro%20Mall%20Noida%20Sector%2075%2C%20201307.!5e0!3m2!1sen!2sin!4v1757253665101!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
