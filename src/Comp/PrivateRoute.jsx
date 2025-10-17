import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return user ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
