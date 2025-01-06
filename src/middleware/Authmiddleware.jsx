import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectToken } from "../redux/features/auth/authSlice";

const Authmiddleware = (props) => {
  const token = useAppSelector(selectToken);
  if (!token) {
    return <Navigate to={{ pathname: "/login" }} />;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Authmiddleware;
