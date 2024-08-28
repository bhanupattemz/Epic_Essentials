import React, { Fragment, useRef, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { MdVpnKey, MdEvent } from "react-icons/md";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Stepper from "./Stepper";
import "./Payment.css";
import { createOrder } from "../../actions/Orderactions"
import { Country, State, City } from 'country-state-city';
import Loader from "../layout/Loader/Loader"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MetaData from "../layout/MetaData";
export default function Payment() {
  const orderInfo = useSelector(state => state.cart);
  const shippingInfo = JSON.parse(localStorage.getItem("address"));
  if (shippingInfo) {
    const country = Country.getAllCountries().find(
      (country) => country.name.toLowerCase() === shippingInfo.country.toLowerCase()
    ).isoCode;
    const state = State.getStatesOfCountry(country).find(
      (state) => state.name.toLowerCase() === shippingInfo.state.toLowerCase()
    ).isoCode;
    shippingInfo.state = state
    shippingInfo.country = country
  }
  const { loading } = useSelector(state => state.order)
  const stripe = useStripe();
  const elements = useElements();
  const paybtn = useRef(null);
  const user = useSelector(state => state.user).user;
  const [cardHolderName, setCardHolderName] = useState(user.username)
  const alert = useAlert();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const paymentData = {
    amount: Math.round(orderInfo.price * 100)
  };

  const paymentSubmitHandler = async (e) => {
    e.preventDefault();
    paybtn.current.disabled = true;

    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/process/payment", paymentData);
      const clientSecret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: cardHolderName,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.country
            }
          }
        }
      });

      if (result.error) {
        alert.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        dispatch(createOrder(orderInfo, shippingInfo, result))
        navigate("/order/success");
      } else {
        alert.error("There was an issue processing your payment.");
      }
    } catch (error) {
      console.error("Error processing payment:", error.response?.data?.message || error.message);
      alert.error("Payment failed. Please try again.");
    } finally {
      paybtn.current.disabled = false;
    }
  };

  return (
    <Fragment>
      <MetaData title="Admin Payment -- Epic Essentials" />
      {loading ? <Loader /> :
        <main className="payment-main">
          <Stepper stepNo={2} />
          <section className="payment-page-payment-section">
            <div className="payment-page-card-style-container">

            </div>
            <div className="payment-page-card-img">
              <img src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724332307/Epic%20Essentials/tzrstxpxeihfdpdsfzke.png" alt="" />
            </div>
            <div className="payment-page-previous-btn" onClick={() => navigate("/order/confirm")}> <KeyboardBackspaceIcon /> Previous Page</div>
            <div className="payment-container">
              <h1>Your Payment Details</h1>
              <form className="payment-form" onSubmit={paymentSubmitHandler}>
                <div className="payment-page-input-container">
                  <label className="payment-page-label" htmlFor="name">CARDHOLDER NAME</label>
                  <div>
                    <input type="text" className="payment-page-cardholder-name" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} />
                  </div>
                </div>
                <div className="payment-page-input-container">
                  <label className="payment-page-label" htmlFor="name">CARD NUMBER</label>
                  <CardNumberElement />
                </div>
                <div className="payment-page-expi-cvv-container">
                  <div className="payment-page-input-container">
                    <label className="payment-page-label" htmlFor="name">EXPIRE DATE</label>
                    <CardExpiryElement />
                  </div>
                  <div className="payment-page-input-container">
                    <label className="payment-page-label" htmlFor="name">CVV</label>
                    <CardCvcElement />
                  </div>
                </div>

                <button className="payment-submit-button" type="submit" ref={paybtn}>
                  Pay ₹{orderInfo.price}
                </button>
              </form>
            </div>
          </section>

        </main>
      }

    </Fragment>
  );
}
