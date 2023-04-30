import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { verify } from "../Utils";

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState();

  useEffect(() => {
    verify().then((response) => setAuthorized(response));
  }, []);

  if (authorized === undefined) return null;

  return authorized ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
