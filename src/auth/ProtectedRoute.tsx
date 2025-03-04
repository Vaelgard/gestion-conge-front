import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedLayout: React.FC<{ allowedRoles: string[], children: React.ReactNode }> = ({ allowedRoles, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (!allowedRoles.includes(userRole || "")) {
      navigate("/unauthorized"); // Redirect if user role is not allowed
    }
  }, [navigate, allowedRoles]);

  return <>{children}</>; // Render children if access is granted
};

export default ProtectedLayout;
