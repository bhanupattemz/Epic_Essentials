import Stepper from "./Stepper";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getCartProducts } from "../../actions/CartAction"
import Loader from "../layout/Loader/Loader";
import "./ConfirmOrder.css"
import { useNavigate } from "react-router-dom"
import MetaData from "../layout/MetaData";
export default function ConfirmOrder() {
    const shippinginfo = JSON.parse(localStorage.getItem("address"))
    const { products, loading, error, productsCount, gst, price, total, delivery, discount } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const proccedPaymendHandler = () => {
        navigate("/process/payment")
    }
    useEffect(() => {
        dispatch(getCartProducts())
        if (loading) {
            return <Loader />
        }
    }, [getCartProducts, dispatch])

    return (
        <Fragment>
            <MetaData title="Confirm Order -- Epic Essentials" />
            <main className="ConfirmOrder-main">
                <section>
                    <Stepper stepNo={1} />
                </section>
                <section className="confirmOrder-cointainer">
                    <div className="confirmOrder-left">
                        <div className="confirmOrder-address">
                            <h3>Shipping info</h3>
                            <div>
                                <p><b>Name : </b>{user.username}</p>
                                <p><b>Phone: </b>{shippinginfo.phoneNO}</p>
                                <p><b>Address: </b>{shippinginfo.address}</p>

                            </div>
                        </div>
                        <div className="confirmOrder-cartItem-box">
                            {products && products.map((item) => {
                                return (
                                    <div onClick={() => navigate(`/products/${item.product._id}`)} >
                                        <div className="confirmOrder-cartItem">
                                            <div className="confirmOrder-cartItem-product">
                                                <img src={item.product.images[0].url}
                                                    alt="product-img" className="confirm-order-cartItem-img" />
                                                <p >{item.product.name}</p>
                                            </div>
                                            <div className="ConfirmOrder-cartItem-pricing-container">
                                                <p className="ConfirmOrder-cartItem-pricing">
                                                    {`${item.quantity}*${item.product.price}=₹${item.quantity * item.product.price}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                    <div className="confirmOrder-right">
                        <div>
                            <h3>Order Summary</h3>
                        </div>
                        <div>
                            <p>Price{`(${productsCount} items)`}:</p>
                            <p>₹{price}</p>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <p>₹{delivery == 0 ? "Free" : delivery}</p>
                        </div>
                        <div>
                            <p>GST:</p>
                            <p>₹{gst}</p>
                        </div>
                        <div>
                            <p>Total:</p>
                            <p>₹{total}</p>
                        </div>
                        <button className="procced-to-pay-btn" onClick={proccedPaymendHandler}>Procced To Payment</button>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}