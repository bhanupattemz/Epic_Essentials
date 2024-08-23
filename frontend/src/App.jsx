import Header from "./components/layout/Header/Header.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/layout/Home/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import Products from "./components/Product/Products.jsx";
import Search from "./components/Product/Search.jsx";
import LoginSignup from "./components/LoginSignup/LoginSignUp.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./actions/UserAction.jsx";
import { useAlert } from "react-alert";
import Loader from "./components/layout/Loader/Loader.jsx";
import { clearErrors } from "./reducers/userReducer/UserReducer.jsx";
import store from "./store.jsx";
import UserOptions from "./components/User/UserOptions.jsx";
import Profile from "./components/User/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import UpdateProfile from "./components/User/UpdateProfile.jsx";
import UpdatePassword from "./components/User/UpdatePassword.jsx";
import Cart from "./components/Cart/Cart.jsx";
import ForgotPassword from "./components/User/ForgotPassword.jsx";
import ResetPassword from "./components/User/ResetPassword.jsx";
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import Payment from "./components/Cart/Payment.jsx";
import SuccessOrder from "./components/Cart/SuccessOrder.jsx";
import Orders from "./components/Orders/Orders.jsx";
import OrderDetails from "./components/Orders/OrderDetails.jsx";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getCartProducts } from "./actions/CartAction.jsx";
import { getProducts } from "./actions/ProductAction.jsx";
import DashBoard from "./components/Admin/DashBoard.jsx";
import AdminProducts from "./components/Admin/Products.jsx";
import NewProduct from "./components/Admin/NewProduct.jsx";
import UpdateProduct from "./components/Admin/UpdateProduct.jsx";
import OrderList from "./components/Admin/OrderList.jsx";
import ProcessOrder from "./components/Admin/ProcessOrder.jsx";
import UsersList from "./components/Admin/UsersList.jsx";
import AdminUpdateUser from "./components/Admin/AdminUpdateUser.jsx";
import ReviewsList from "./components/Admin/ReviewsList.jsx";
import Contact from "./components/Contact/Contact.jsx";
import PageNotFound from "./components/layout/PageNotFound/PageNotFound.jsx";
import AddAddress from "./components/Cart/AddAddress.jsx";
import UpdateAddress from "./components/Cart/UpdateAddress.jsx";
import ProfileAddress from "./components/User/Address.jsx"
import ProfileReviews from "./components/User/ProfileReviews.jsx"
function App() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { error, loading, isauthenticate, user } = useSelector(state => state.user);
  const { products } = useSelector(state => state.products);
  useEffect(() => {
    dispatch(getCartProducts());
    if (!products || products.length == 0) {
      dispatch(getProducts());
    }

    getStripeApiKey();
    // Clear errors on component mount
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);
  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser());
    }
  }, [getCurrentUser, dispatch])
  async function getStripeApiKey() {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get("http://localhost:8000/api/v1/stripe_api_key");
      setStripeApiKey(data.api_key);
    } catch (error) {
      console.error("Failed to fetch Stripe API key:", error);
    }
  }

  return (
    <Router>
      <Header />
      {isauthenticate && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/loginsignup" element={<LoginSignup />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/profile/address" element={<ProtectedRoute element={<ProfileAddress />} />} />
        <Route path="/profile/reviews" element={<ProtectedRoute element={<ProfileReviews />} />} />
        <Route path="/updateprofile" element={<ProtectedRoute element={<UpdateProfile />} />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/password/update/:id" element={<ProtectedRoute element={<UpdatePassword />} />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route path="/address/new" element={<ProtectedRoute element={<AddAddress />} />} />
        <Route path="/address/update/:_id" element={<ProtectedRoute element={<UpdateAddress />} />} />
        <Route path="/shipping" element={<ProtectedRoute element={<Shipping />} />} />
        <Route path="/order/confirm" element={<ProtectedRoute element={<ConfirmOrder />} />} />
        <Route path="/order/success" element={<ProtectedRoute element={<SuccessOrder />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
        <Route path="/orders/:_id" element={<ProtectedRoute element={<OrderDetails />} />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute isadmin={true} element={<DashBoard />} />} />
        <Route path="/admin/products" element={<ProtectedRoute isadmin={true} element={<AdminProducts />} />} />
        <Route path="/admin/product/new" element={<ProtectedRoute isadmin={true} element={<NewProduct />} />} />
        <Route path="/admin/product/update/:_id" element={<ProtectedRoute isadmin={true} element={<UpdateProduct />} />} />
        <Route path="/admin/orders" element={<ProtectedRoute isadmin={true} element={<OrderList />} />} />
        <Route path="/admin/orders/update/:_id" element={<ProtectedRoute isadmin={true} element={<ProcessOrder />} />} />
        <Route path="/admin/users" element={<ProtectedRoute isadmin={true} element={<UsersList />} />} />
        <Route path="/admin/user/update/:_id" element={<ProtectedRoute isadmin={true} element={<AdminUpdateUser />} />} />
        <Route path="/admin/reviews" element={<ProtectedRoute isadmin={true} element={<ReviewsList />} />} />
        {stripeApiKey && (
          <Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute element={<Payment />} /></Elements>} />
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
