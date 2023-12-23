import { Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import axios from "axios";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductPage";
import FAQPage from "./pages/FAQPage";
import OrderSuccessPage from "./components/Order/OrderSuccessPage";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import AllOrders from "./components/Order/AllOrders";
import Address from "./components/Profile/Address";
import ProfileContent from "./components/Profile/ProfileContent";
import SellerRegister from "./components/Register/SellerRegister";
import SellerLogin from "./components/Login/SellerLogin";
import { useEffect } from "react";
import store from "./redux/store";
import { getUser } from "./redux/actions/user";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./components/Product/CreateProduct";


axios.defaults.withCredentials = true;

function App() {

    const { loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(getUser())
  }, [])



  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileContent />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/all-orders" element={<AllOrders />} />
          <Route path="/address" element={<Address />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!loading && ( isAuthenticated? <Navigate to="/profile" /> : <Login />)} />
        <Route path="/register" element={!loading && ( isAuthenticated? <Navigate to="/profile" /> : <Register />)} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/dashboard" element={<Dashboard />} />
        <Route path="/seller/create-product" element={<CreateProduct />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </>
  )
}

export default App
