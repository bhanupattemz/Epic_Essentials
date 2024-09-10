import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartProducts } from "../../actions/CartAction";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import "./Cart.css";
import CartItems from "./CartItems";
import Loader from "../layout/Loader/Loader";
import EmptyCart from "./EmptyCart";
import { useNavigate } from "react-router-dom"
import ProductBox from "../layout/Home/Product";
import MetaData from "../layout/MetaData";
export default function Cart() {
    const dispatch = useDispatch();
    const { loading, products, productsCount, price, gst, discount, delivery, total } = useSelector(state => state.cart);
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    let recentProducts = JSON.parse(localStorage.getItem("recent"))
    useEffect(() => {
        if (user) {
            dispatch(getCartProducts());
        }

    }, [dispatch, getCartProducts]);

    const placeOrderHandler = () => {
        navigate("/shipping")
    }
    return (
        <Fragment>
            <MetaData title="cart -- Epic Essentials" />
            {loading ? <Loader /> : (
                <Fragment>
                    {products && products.length == 0 ? <EmptyCart /> :
                        <main className="cart-main">
                            <section className="cart-page-cart-container">
                                <section className="cart-items">
                                    <div className="address-div">
                                        <div>
                                            <h4>Deliver to: </h4>
                                        </div>

                                        {user.shippingInfo && user.shippingInfo.length != 0 ?
                                            <div>
                                                <h4>{user.username}</h4>
                                                <div>
                                                    <span><b>{user.shippingInfo[0].phoneNO}</b></span>
                                                </div>
                                                <div>
                                                    <span>{user.shippingInfo[0].address} {user.shippingInfo[0].city} {user.shippingInfo[0].state} {user.shippingInfo[0].country}-{user.shippingInfo[0].pincode}</span>

                                                </div>
                                            </div>
                                            : <button className="cart-page-add-address-btn">ADD ADDRESS</button>}
                                    </div>
                                    <div className="cartProducts-div">
                                        {products.map(product => (
                                            <CartItems key={product._id} product={product} />
                                        ))}
                                    </div>
                                    <section className="cart-price-section cart-price-small">
                                        <div className="cart-price-details">
                                            <div><h3>PRICE DETAILS</h3></div>
                                            <div className="cart-prices-types">
                                                <div>
                                                    <span>Price ({productsCount} items)</span>
                                                    <span>₹{price}</span>
                                                </div>
                                                <div>
                                                    <span>GST</span>
                                                    <span>₹{gst}</span>
                                                </div>
                                                <div>
                                                    <span>Discount</span>
                                                    <span>₹{Math.round(discount * 100 / price)}</span>
                                                </div>
                                                <div>
                                                    <span>Delivery</span>
                                                    <span>{delivery === 0 ? "Free" : delivery}</span>
                                                </div>

                                            </div>
                                            <div className="cart-page-total-amount">
                                                <h4><span>Total Amount</span><span>₹{total}</span></h4>

                                            </div>
                                            <span style={{ color: Math.round(discount * 100 / price + (delivery == 0 ? 40 : 0)) > 0 ? "green" : "grey" }} className="cart-item-savings">You will save ₹{Math.round(discount * 100 / price + (delivery == 0 ? 40 : 0))} on this order</span>
                                        </div>
                                        <div className="verified-payment">
                                            <VerifiedUserIcon />
                                            <p>Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
                                        </div>
                                    </section>
                                    <div className="cart-order-btn">
                                        <button onClick={placeOrderHandler}>PLACE ORDER</button>
                                    </div>

                                </section>
                                <section className="cart-price-section cart-price-large">
                                    <div className="cart-price-details">
                                        <div><h3>PRICE DETAILS</h3></div>
                                        <div className="cart-prices-types">
                                            <div>
                                                <span>Price ({productsCount} items)</span>
                                                <span>₹{price}</span>
                                            </div>
                                            <div>
                                                <span>GST</span>
                                                <span>₹{gst}</span>
                                            </div>
                                            <div>
                                                <span>Discount</span>
                                                <span>₹{Math.round(discount * 100 / price)}</span>
                                            </div>
                                            <div>
                                                <span>Delivery</span>
                                                <span>{delivery === 0 ? "Free" : delivery}</span>
                                            </div>

                                        </div>
                                        <div className="cart-page-total-amount">
                                            <h4><span>Total Amount</span><span>₹{total}</span></h4>

                                        </div>
                                        <span style={{ color: Math.round(discount * 100 / price + (delivery == 0 ? 40 : 0)) > 0 ? "green" : "grey" }} className="cart-item-savings">You will save ₹{Math.round(discount * 100 / price + (delivery == 0 ? 40 : 0))} on this order</span>
                                    </div>
                                    <div className="verified-payment">
                                        <VerifiedUserIcon />
                                        <p>Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
                                    </div>
                                </section>
                            </section>
                            <section>
                                {recentProducts &&
                                    <section className="cart-page-recent-products">
                                        <h3>Recent Product</h3>
                                        <div className="cart-page-recent-products-container">
                                            {recentProducts.map((item, index) => {
                                                return (
                                                    <ProductBox prod={item} />
                                                )
                                            })}
                                        </div>
                                    </section>
                                }
                            </section>
                        </main>
                    }
                </Fragment>
            )}
        </Fragment>
    );
}