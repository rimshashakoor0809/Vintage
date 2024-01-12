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
import { useSelector } from "react-redux";
import CreateProduct from "./components/Product/CreateProduct";
import { UserPrivateRoute } from "./components/PrivateRoute/UserPrivateRoute";
import { SellerPrivateRoute } from "./components/PrivateRoute/SellerPrivateRoute";
import { getSeller } from "./redux/actions/seller";
import AllSellerProducts from "./components/Product/AllSellerProducts";
import Statistics from "./pages/Statistics";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ProductDetailsPage from "./components/Product/ProductDetails";
import SellerProfile from "./components/Profile/SellerProfile";
import CheckoutPage from "./pages/CheckoutPage";


axios.defaults.withCredentials = true;

function App() {

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { sellerLoading, isSellerAuthenticated } = useSelector((state) => state.seller);

  useEffect(() => {
    store.dispatch(getUser())
    store.dispatch(getSeller())
  }, [])



  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<UserPrivateRoute />}>
          <Route path="/profile" element={<ProfileContent />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/all-orders" element={<AllOrders />} />
          <Route path="/address" element={<Address />} />
        </Route>
        <Route element={<SellerPrivateRoute />}>
          <Route path="/seller/dashboard" element={<Statistics />} />
          <Route path="/seller/create-product" element={<CreateProduct />} />
          <Route path="/seller/all-products" element={<AllSellerProducts />} />
          <Route path="/seller/all-orders" element={<AllSellerProducts />} />
          <Route path="/seller/profile" element={<SellerProfile />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={!loading && (isAuthenticated ? <Navigate to="/profile" /> : <Login />)} />
        <Route path="/register" element={!loading && (isAuthenticated ? <Navigate to="/profile" /> : <Register />)} />
        <Route path="/forgot-password" element={ <ForgotPassword />} />
        <Route path="/reset-password/:id" element={ <ResetPassword />} />
        <Route path="/seller/login" element={!sellerLoading && (isSellerAuthenticated ? <Navigate to="/seller/dashboard" /> : <SellerLogin />)} />
        <Route path="/seller/register" element={!sellerLoading && (isSellerAuthenticated ? <Navigate to="/seller/dashboard" /> : <SellerRegister />)}  />

        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </>
  )
}

export default App
