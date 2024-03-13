import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const isLoggedIn: boolean = localStorage.getItem("userInfo") !== null;

  if (!isLoggedIn) {
    // Redirect to the login page and save the current location
    toast.error("You need to be logged in", {
      duration: 4000,
      icon: <InformationCircleIcon className="w-6 h-6" />,
      id: "must-be-logged-in-toast",
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
