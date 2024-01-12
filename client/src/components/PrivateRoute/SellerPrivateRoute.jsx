// App.js
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const SellerPrivateRoute = () => {
  const { sellerLoading, isSellerAuthenticated } = useSelector((state) => state.seller);

  if (sellerLoading === false) {
    return isSellerAuthenticated === true ? <Outlet /> : <Navigate to="/seller/login" />
  }

};

