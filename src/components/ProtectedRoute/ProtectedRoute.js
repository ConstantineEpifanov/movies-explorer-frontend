import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.loggedIn === true ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default ProtectedRoute;
