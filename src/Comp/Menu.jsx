import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { myAction } from "./ReducCart/Action";

function Menu() {
  const [state, setState] = useState([]);
  const dispatch = useDispatch();
  const { category } = useParams();
  const [cat, setCat] = useState("");
  const [search, setSearch] = useState("");

  const styling = {
    card: { padding: "20px", gap: "20px" },
    imgContainer: {
      width: "100%",
      height: "300px",
      overflow: "hidden",
      borderRadius: "10px",
    },
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
  };

  // FETCH PRODUCTS FROM LOCAL db.json
  async function fetchProduct() {
    try {
      const res = await axios.get("/db.json");
      const data = res.data;

      let finalData = [];

      // 1️⃣ ALL DATA (ALL CATEGORY)
      if (cat === "" || cat === "menu") {
        Object.keys(data).forEach((key) => {
          finalData = [...finalData, ...data[key]];
        });
      } else {
        // 2️⃣ SPECIFIC CATEGORY
        finalData = data[cat] || [];
      }

      // 3️⃣ SEARCH FILTER
      if (search.trim() !== "") {
        finalData = finalData.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      setState(finalData);
    } catch (err) {
      console.log("Error:", err);
    }
  }

  useEffect(() => {
    if (category) {
      setCat(category);
    }
  }, [category]);

  useEffect(() => {
    fetchProduct();
  }, [cat, search,category]);

  function handleCategory(category) {
    setCat(category);
  }

  function AddToCart(item) {
    dispatch(myAction(item));
    alert("Product added to cart");
  }

  return (
    <div>
      <div className="container p-5">
        <h3 className="text-center mb-4">Menu</h3>

        {/* Search */}
        <div className="d-flex justify-content-center mb-4">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control w-100 w-md-50"
            placeholder="Search..."
          />
        </div>

        {/* FULL ORIGINAL CATEGORIES */}
        <div className="mb-3">
          <ul className="d-flex flex-wrap gap-2 justify-content-center" style={{ listStyle: "none" }}>
            <li onClick={() => handleCategory("")} className="btn btn-outline-success btn-sm">ALL</li>
            <li onClick={() => handleCategory("salad")} className="btn btn-outline-success btn-sm">SALADS</li>
            <li onClick={() => handleCategory("pasta")} className="btn btn-outline-success btn-sm">PASTA</li>
            <li onClick={() => handleCategory("grills")} className="btn btn-outline-success btn-sm">GRILL</li>
            <li onClick={() => handleCategory("snacks")} className="btn btn-outline-success btn-sm">SNACKS</li>
            <li onClick={() => handleCategory("Waffle")} className="btn btn-outline-success btn-sm">WAFFLE</li>
            <li onClick={() => handleCategory("soup")} className="btn btn-outline-success btn-sm">SOUP</li>
            <li onClick={() => handleCategory("Sandwich")} className="btn btn-outline-success btn-sm">SANDWICH</li>
            <li onClick={() => handleCategory("HealthSpecial")} className="btn btn-outline-success btn-sm">HEALTH SPECIAL</li>
            <li onClick={() => handleCategory("porridge")} className="btn btn-outline-success btn-sm">PORRIDGE</li>
            <li onClick={() => handleCategory("oatmeal")} className="btn btn-outline-success btn-sm">OATMEAL</li>
          </ul>
        </div>

        <div className="mb-4">
          <ul className="d-flex flex-wrap gap-2 justify-content-center" style={{ listStyle: "none" }}>
            <li onClick={() => handleCategory("ricebowl")} className="btn btn-outline-success btn-sm">RICE BOWL</li>
            <li onClick={() => handleCategory("pudding")} className="btn btn-outline-success btn-sm">PUDDING</li>
            <li onClick={() => handleCategory("refresher")} className="btn btn-outline-success btn-sm">REFRESHER</li>
            <li onClick={() => handleCategory("smoothies")} className="btn btn-outline-success btn-sm">SMOOTHIES</li>
            <li onClick={() => handleCategory("juise")} className="btn btn-outline-success btn-sm">COLD PRESS JUICE</li>
            <li onClick={() => handleCategory("hot-beverages")} className="btn btn-outline-success btn-sm">HOT BEVERAGES</li>
            <li onClick={() => handleCategory("shakescoldcoffee")} className="btn btn-outline-success btn-sm">SHAKES & COLD COFFEE</li>
          </ul>
        </div>

        {/* Products */}
        <div className="row g-4">
          {state.map((item) => (
            <div
              className="col-lg-6 col-md-12"
              style={styling.card}
              key={item.id}
            >
              <div className="row g-3 align-items-center"   data-aos="fade-up"
              data-aos-anchor-placement="top-bottom">
                <div className="col-md-6 col-12" >
                  <Link to={`/${item.category}/${item.id}`}>
                    <div style={styling.imgContainer} className="img-hover-container">
                      <img src={item.image} alt={item.title} style={styling.img} className="zoom-img" />
                    </div>
                  </Link>
                </div>

                <div className="col-md-6 col-12">
                  <h4>{item.title} - ₹{item.price}</h4>
                  <p>{item.Description}</p>

                  <button className="btn btn-success p-2 mt-2" onClick={() => AddToCart(item)}>
                    <i className="fa-solid fa-cart-plus text-light fs-5"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <style>
          {`
            .img-hover-container:hover .zoom-img {
              transform: scale(1.2);
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default Menu;
