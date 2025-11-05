import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { myAction } from "./ReducCart/Action";
import Modal from "react-bootstrap/Modal";

function Category() {
  const [allProducts, setAllProducts] = useState([]); // Original data
  const [state, setState] = useState([]); // Filtered data
  const [sorted, seSorted] = useState("");
  const { category } = useParams();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const styling = {
    imgContainer: {
      width: "100%",
      height: "200px",
      overflow: "hidden",
      borderRadius: "10px",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    Card: {
      width: "100%",
      height: "100%",
      border: "none",
    },
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const info = await axios.get(`https://urbannecter-api-86br.onrender.com/${category}`);
        setAllProducts(info.data);
        setState(info.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProduct();
  }, [category]);

  function handlesort(e) {
    const value = e.target.value;
    let filteredData = [...allProducts]; // Always filter from original

    if (value === "0-100")
      filteredData = allProducts.filter((p) => p.price >= 0 && p.price <= 100);
    else if (value === "100-200")
      filteredData = allProducts.filter((p) => p.price > 100 && p.price <= 200);
    else if (value === "200-300")
      filteredData = allProducts.filter((p) => p.price > 200 && p.price <= 300);

    setState(filteredData);
    seSorted(value);
  }

  function handleCart(item) {
    const productToAdd = { ...item, quantity: item.quantity || 1 };
    dispatch(myAction(productToAdd));
    alert("Product added to cart");
  }

  function handleView(item) {
    setSelectedProduct({ ...item, quantity: 1 });
    setModalShow(true);
  }

  return (
    <div className="container p-5">
      {/* Filter */}
      <div className="d-flex justify-content-end mb-3">
        <select
          onChange={handlesort}
          value={sorted}
          className="form-control w-50 w-md-25"
        >
          <option value="">Filter by Price</option>
          <option value="0-100">0 - 100</option>
          <option value="100-200">100 - 200</option>
          <option value="200-300">200 - 300</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="row g-3">
        {state.map((item, i) => (
          <div className="col-lg-3 col-md-4 col-sm-6 text-center" key={i}>
            <Card className="h-100 shadow-sm">
              <Link to={`/${item.category}/${item.id}`}>
                <div style={styling.imgContainer} className="img-hover-container">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={styling.img}
                    className="zoom-img"
                  />
                </div>
              </Link>
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="fs-6">{item.title}</Card.Title>
                <Card.Text className="text-success fw-bold">₹{item.price}</Card.Text>
                <div className="d-flex justify-content-between mt-2">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleCart(item)}
                  >
                   <i class="fa-solid fa-cart-shopping"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-success"
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

      {/* Modal for Product View */}
      {selectedProduct && (
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          centered
          contentClassName="border-0 shadow-lg rounded-4 overflow-hidden"
        >
          <Modal.Body className="p-0 position-relative">
            {/* Floating Close Button */}
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
              <div className="col-12 col-md-6 p-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-100 h-100"
                  style={{ objectFit: "cover", height: "100%", aspectRatio: "1/1" }}
                />
              </div>

              {/* Right Side - Details */}
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
                  <span className="mx-3 fw-semibold">{selectedProduct.quantity}</span>
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
                    handleCart(selectedProduct);
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

      {/* Zoom Effect */}
      <style>
        {`
          .img-hover-container:hover .zoom-img {
            transform: scale(1.2);
          }
        `}
      </style>
    </div>
  );
}

export default Category;
