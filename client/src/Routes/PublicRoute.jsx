import React from "react";
import { authBackground } from "../components/images/projectImages"
import { useAuth } from "../contexts/AuthContext";
import AccessDenied from "../components/Pages/AccessDeniedPage"

export default function PublicRoute({ children }) {
  
  const { currentUser } = useAuth();
  
  return currentUser ? (
    <AccessDenied />
  ) : (
    <div className="public-router-layout">
      <img
        alt="layout"
        id="public-img"
        className="w-50 bgs-100"
        src={authBackground}
      />
      <div className="m-auto">{children}</div>
    </div>
  );
}
