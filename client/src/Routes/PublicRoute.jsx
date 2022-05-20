import React from "react";
import { authBackground, error403 } from "../components/images/projectImages"
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  
  const { currentUser } = useAuth();
  
  return currentUser ? (
    <Navigate to="/homepage" />
  ) : (
    <div className="public-router-layout container1">
      <img
        alt="layout"
        id="public-img"
        className="w-50 bgs-100"
        src={authBackground}
        onError={error403}
      />
      <div className="m-auto">{children}</div>
    </div>
  );
}
