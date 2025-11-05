import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useDispatch } from "react-redux";
import { myAction } from "./ReducCart/Action";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category, id } = useParams();

  //  MySwiper
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetchProduct();
  }, [category, id]);
  const fetchProduct = async () => {
    const info = await axios.get("http://localhost:3000/slider");
    setProduct(info.data);
  };
  function AddToCart(item) {
    dispatch(myAction(item));
    alert("Product added to cart");
  }

  // VerticalSlider
  const slides = [
    {
      id: 1,
      name: "Elevate Your Wellness",
      image:
        "https://www.urbannecter.com/wp-content/uploads/2024/08/slide-11-min.jpg",
      description:
        "Dive into our top selections that perfectly blend flavor and nutrition, redefining what healthy eating can be.",
      text: "TASTE THE FRESHNESS",
    },
    {
      id: 2,
      name: "Health on Your Plate",
      image:
        "https://www.urbannecter.com/wp-content/uploads/2024/08/slide-55-min-2048x1270.jpg",
      description:
        "Experience a variety of balanced meals designed to support your healthy lifestyle without compromising on taste.",
      text: "TRY OVER ALL PICKS",
    },
    {
      id: 3,
      name: "Satisfy Your Cravings",
      image:
        "https://www.urbannecter.com/wp-content/uploads/2024/08/slide-33-min-2048x1270.jpg",
      description:
        "Enjoy our nutritious options that keep you on track while delivering delicious satisfaction.",
      text: "SAVOR THE GOODNESS",
    },
  ];
  const [current, setCurrent] = useState(0);
  const handlePrev = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };
  const handleNext = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  //  Home cards
  const homePage = [
    {
      title: "SALAD",
      image: "https://taste-now.vercel.app/images/Splashfood.png",
      category: "salad",
    },
    {
      title: "JUICE",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0vRwx3qVppim8v-9yQYUW1sHXxbW1vBdmB9wxDt3oUt4AXwRb",
      category: "juise",
    },
    {
      title: "HOT BEVERAGES",
      image:
        "https://nusacoffeecompany.com/cdn/shop/articles/How_to_Make_a_Cappuccino_-_Nusa_Coffee_Company_d73d6777-85b2-4cb8-b21d-60cd8ea0354f_1024x1024.jpg?v=1639978348",
      category: "hot-beverages",
    },
    {
      title: "WAFFLE",
      image:
        "https://img.freepik.com/free-photo/top-view-waffle-with-honey-fork_23-2148079611.jpg?semt=ais_items_boosted&w=740",
      category: "Waffle",
    },
    {
      title: "HEALTH SPECIALS",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcST3NfuTfeQnkHSA6tcc-D5b_szRm089svUMGe-3D6UnhxRN5ye",
      category: "HealthSpecial",
    },
  ];

  const handleClick = () => {
    navigate("/smoothies");
  };

  const styling = {
    Link: {
      position: "absolute",
      top: "80%",
      left: "0",
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      textDecoration: "none",
      color: "black",
      textAlign: "center",
      padding: "5px 0",
      cursor: "pointer",
    },
  };

  return (
    <>
      {/* VerticalSlider  */}
      <section
        data-aos="zoom-in"
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div
          className="d-flex flex-column flex-lg-row align-items-center"
          style={{
            transition: "all 0.7s ease",
            minHeight: "70vh",
            padding: "2rem",
          }}
        >
          <div
            className="text-section col-lg-5 text-center text-lg-start"
            style={{ padding: "1rem" }}
          >
            <h1 className="fw-bold mb-3">{slides[current].name}</h1>
            <p className="mb-3" style={{ fontSize: "1rem", color: "#555" }}>
              {slides[current].description}
            </p>
            <button className="btn btn-dark rounded-pill px-4 py-2">
              {slides[current].text}
            </button>
          </div>

          <div
            className="image-section col-lg-7 mt-4 mt-lg-0"
            style={{
              position: "relative",
              height: "100%",
              width: "100%",
              overflow: "hidden",
              borderRadius: "1rem",
            }}
          >
            <img
              src={slides[current].image}
              alt={slides[current].name}
              style={{
                width: "100%",
                height: "60vh",
                objectFit: "cover",
                borderRadius: "1rem",
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: "2%",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            zIndex: 2,
          }}
        >
          <button
            onClick={handlePrev}
            className="btn btn-light shadow-sm rounded-circle"
            style={{ width: "45px", height: "45px" }}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
          <button
            onClick={handleNext}
            className="btn btn-light shadow-sm rounded-circle"
            style={{ width: "45px", height: "45px" }}
          >
            <i className="fa-solid fa-arrow-down"></i>
          </button>
        </div>
      </section>

      {/*  Home cards */}
      <div className="container py-5">
        <h3
          className="text-center mb-4 p-4"
          style={{ textDecoration: "underline", fontFamily: "lobster-two" }}
        >
          Find Your Perfect Meal
        </h3>
        <div className="row g-3 justify-content-center">
          {homePage.map((item, i) => (
            <div
              data-aos="zoom-in-down"
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
              key={i}
            >
              <Card className="border-0 w-100">
                <Card.Img
                  src={item.image}
                  alt="Card image"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.ImgOverlay>
                  <Card.Title>
                    <Link to={`/${item.category}`} style={styling.Link}>
                      <h4>{item.title}</h4>
                    </Link>
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/*  MySwiper */}
      <div className="container py-5">
        <h3 className="text-center mb-4">Top Selling Products</h3>
        <Swiper
          spaceBetween={20}
          loop={true}
          slidesPerGroup={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            1200: { slidesPerView: 5 },
            992: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            576: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          className="mySwiper"
          style={{ paddingBottom: "70px" }}
        >
          {product.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="slider" data-aos="fade-right">
                <Link to={`/${item.category}`}>
                  <div
                    className="img-hover-container"
                    style={{
                      width: "100%",
                      height: "200px",
                      overflow: "hidden",
                      borderRadius: "5px",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="zoom-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                    />
                  </div>
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p style={{ margin: 0 }}>{item.title}</p>
                <button
                  onClick={() => AddToCart(item)}
                  className="btn btn-success p-2"
                >
                  <i className="fa-solid fa-cart-plus text-light fs-5"></i>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Hover Zoom Effect */}
        <style>
          {`
      .img-hover-container:hover .zoom-img {
        transform: scale(1.2);
      }
    `}
        </style>
      </div>

      {/* Product Section */}
      <div
        className="container py-5"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
      >
        <div className="row g-3">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="card" style={{ height: "100%" }}>
              <img
                src="https://www.urbannecter.com/wp-content/uploads/2024/08/slide-33-min-scaled.jpg"
                alt=""
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div
            className="col-lg-4 col-md-6 col-sm-12"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <div
              className="card"
              style={{ height: "100%", position: "relative" }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW8FpBfrQ7q3QSRjC4bUKsyajAA6bjF_BDZJGRuSMvzF3Cwlj4"
                alt="Card"
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
              <div className="card-img-overlay d-flex align-items-center justify-content-center p-0">
                <h2 onClick={handleClick} style={styling.Link}>
                  Smoothies
                </h2>
              </div>
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="500"
            className="col-lg-4 col-md-12"
            style={{ backgroundColor: "#95a6b1", padding: "20px" }}
          >
            <p style={{ fontSize: "20px", marginBottom: "10px" }}>
              Revive Your Nutritional Balance
            </p>
            <p>
              You don’t need complex diets to feel your best. Discover our meals
              that make healthy eating effortless, delicious, and satisfying.
            </p>
            <Link to="/menu" className="btn btn-outline-success mt-2">
              Order now
            </Link>
          </div>
        </div>
      </div>

      {/*Features Section */}
      <div
        className="container p-5"
        data-aos="fade-up"
        data-aos-duration="3000"
      >
        <div className="row g-4 text-center">
          <div className="col-lg-3 col-md-6 col-sm-12">
            <i
              className="fa-solid fa-parachute-box text-success"
              style={{ fontSize: "50px", padding: "10px" }}
            ></i>
            <p>Fast and Fresh Delivery</p>
            <p>
              Enjoy quick delivery of your healthy meals straight to your door.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <i
              className="fa-regular fa-heart text-success"
              style={{ fontSize: "50px", padding: "10px" }}
            ></i>
            <p>Satisfaction Guaranteed</p>
            <p>
              Experience top-quality dishes with our commitment to exceptional
              service.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <i
              className="fa-solid fa-recycle text-success"
              style={{ fontSize: "50px", padding: "10px" }}
            ></i>
            <p>Eco-Friendly Packaging</p>
            <p>
              Get your meals in sustainable packaging designed to keep your food
              fresh.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <i
              className="fa-solid fa-lock text-success"
              style={{ fontSize: "50px", padding: "10px" }}
            ></i>
            <p>Secure Payment Options</p>
            <p>
              Order with confidence using secure payment methods like UPI or
              COD.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
