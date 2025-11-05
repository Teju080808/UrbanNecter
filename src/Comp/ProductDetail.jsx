import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { myAction } from "./ReducCart/Action";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import "swiper/css";

function ProductDetail() {
  const [state, setState] = useState({});
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isHover, setIsHover] = useState(false);
  const { category, id } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();

  const styling = {
    img: {
      width: "100%",
      maxWidth: "550px",
      height: "500px",
      objectFit: "cover",
      borderRadius: "10px",
    },
    hoverBtn: {
      backgroundColor: isHover ? "#bd4a20" : "#066629",
      color: "white",
      border: "none",
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "1rem",
      transition: "all 0.3s",
    },
    
  };

  useEffect(() => {
    fetchProduct();
  }, [category, id]);

  async function fetchProduct() {
    try {
      const info = await axios.get(`https://urbannecter-api-86br.onrender.com/${category}/${id}`);
      const infoo = await axios.get(`https://urbannecter-api-86br.onrender.com/${category}`);
      setState(info.data);
      setProduct(infoo.data);
      setQuantity(1);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  }

  const relatedProduct = product.filter(
    (item) => item.category === state.category && item.id !== state.id
  );

  function AddToCart() {
    const cartStore = JSON.parse(localStorage.getItem("cartItem")) || [];
    const newCart = [...cartStore, { ...state, quantity }];
    localStorage.setItem("cartItem", JSON.stringify(newCart));
    dispatch(myAction({ ...state, quantity }));
    alert("Product added to cart");
  }

  function handleCart(item) {
    dispatch(myAction(item));
    alert("Product added to cart");
  }

  function handleView(item) {
    setSelectedProduct(item);
    setModalShow(true);
  }

  function handleDecQuantity() {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  }

  function handleIncQuantity() {
    setQuantity((prev) => prev + 1);
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-12 col-md-6 d-flex justify-content-center mb-4 mb-md-0">
          <img src={state.image} alt={state.title} style={styling.img} />
        </div>

        <div className="col-12 col-md-6">
          <p className="text-uppercase text-muted">{state.category}</p>
          <h1 className="mb-3">{state.title}</h1>
          <h4 className="text-success mb-3">₹{state.price}</h4>
          <p className="mb-4">{state.text}</p>

          <div className="py-3">
            <button className="btn btn-outline-success" onClick={handleDecQuantity}>-</button>
            <strong className="p-4">{quantity}</strong>
            <button  className="btn btn-outline-success" onClick={handleIncQuantity}>+</button>
          </div>

          <button
            style={styling.hoverBtn}
            onClick={AddToCart}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            Add To Cart
          </button>

          <p className="mt-3 text-muted">Category: {state.category}</p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <h3>Description</h3>
          <p>{state.Description}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Review</Accordion.Header>
              <Accordion.Body>
                <p>There are no reviews yet.</p>
                <p>Only logged-in customers who have purchased this product may leave a review.</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>

      <div className="row mt-5">
        <h3 className="mb-4">Related Products</h3>
        {relatedProduct.slice(0, 4).map((item) => (
          <div key={item.id} className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Link to={`/${item.category}/${item.id}`}>
                <Card.Img
                  variant="top"
                  src={item.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </Link>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="mb-1">{item.title}</Card.Title>
                  <Card.Text className="text-muted mb-2">₹{item.price}</Card.Text>
                </div>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleView(item)}
                  >
                    View
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

       {selectedProduct && (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          centered
          contentClassName="border-0 shadow-lg rounded-4 overflow-hidden"
        >
          <Modal.Body className="p-0 position-relative">
            {/*Close Button */}
            <button
              onClick={() => setModalShow(false)}
              className="btn-close position-absolute"
              style={{
                top: "15px",
                right: "15px",
                zIndex: 2,
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: "50%",
                padding: "8px",
              }}
            ></button>

            <div className="d-flex flex-column flex-md-row align-items-stretch">
              {/* Left Side - Image */}
              <div className="col-12 col-md-6 p-0 position-relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-100 h-100"
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    aspectRatio: "1/1",
                  }}
                />
              </div>

              {/* Right Side - Product Details */}
              <div className="col-12 col-md-6 p-4 d-flex flex-column justify-content-center">
                <p className="fw-semibold fs-5 mb-2">{selectedProduct.title}</p>

                <h5 className="text-success fw-bold mb-3">
                  ₹{Number(selectedProduct.price).toFixed(2)}
                </h5>

                <p className="text-muted" style={{ fontSize: "15px" }}>
                  {selectedProduct.Description || "No description available."}
                </p>

                {/* Quantity Selector */}
                <div className="d-flex align-items-center mb-3">
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() =>
                      setSelectedProduct((prev) => ({
                        ...prev,
                        quantity: Math.max((prev.quantity || 1) - 1, 1),
                      }))
                    }
                  >
                    −
                  </button>
                  <span className="mx-3 fw-semibold">
                    {selectedProduct.quantity || 1}
                  </span>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() =>
                      setSelectedProduct((prev) => ({
                        ...prev,
                        quantity: (prev.quantity || 1) + 1,
                      }))
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-success px-4 py-2 mt-2"
                  onClick={() => {
                    handleCart({
                      ...selectedProduct,
                      quantity: selectedProduct.quantity || 1,
                    });
                    setModalShow(false);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default ProductDetail;
