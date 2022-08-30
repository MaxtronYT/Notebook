import React from "react";
import { Navigate, Outlet, useLocation, Route } from "react-router-dom";

export default function ProtectedRoute(props) {
  return props.login ? <Outlet></Outlet> : <Navigate to={"/"}></Navigate>;
}
