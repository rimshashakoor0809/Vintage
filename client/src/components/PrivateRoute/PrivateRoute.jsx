// App.js
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading === false) {
    return isAuthenticated === true ? <Outlet /> : <Navigate to="/login" />
  }

};

