import React, { useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getOrderDetails, cancelorderDetails } from "../../actions/Orderactions"
import { useParams,useNavigate } from "react-router-dom"
import Loader from "../layout/Loader/Loader"
import "./OrderDetails.css"
import OrderStatus from "./OrderStatus"
import CancelledOrderStatus from "./CancelOrderStatus"
import MetaData from "../layout/MetaData"
export default function OrderDefault() {
    const navigate=useNavigate()
    const { loading, error, order } = useSelector(state => state.orderDetails);
    const dispatch = useDispatch();
    const { _id } = useParams();
    const user = useSelector(state => state.user).user;
    useEffect(() => {
        dispatch(getOrderDetails(_id))
    }, [dispatch, _id, getOrderDetails])

    const OrderCancelhandler = () => {
        dispatch(cancelorderDetails(_id))
    }

    return (
        <Fragment>
              <MetaData title="Order Details -- Epic Essentials" />
            {!order && loading ? <Loader /> :
                <Fragment>
                    {order &&
                        <main className="order-details-main">
                            <h1>Order Details</h1>
                            <section className="order-details-products">
                                {order.orderItems.map((item) => {
                                    return (
                                        <div onClick={()=>navigate(`/products/${item.product._id}`)}  style={{ textDecoration: "none" }}>
                                            <div className="order-details-item">
                                                <div className="order-details-item-product">
                                                    <img src={item.image}
                                                        alt="product-img" className="order-details-Item-img" />
                                                    <p >{item.name}</p>
                                                </div>
                                                <div>
                                                    <p className="order-details-item-pricing">
                                                        {`${item.quantity}*${item.product.price}=₹${item.quantity * item.product.price}`}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </section>
                            <section>
                                <h3 className="order-status-h3">Order Status</h3>
                                {order.orderStatus === "cancelled" ? <CancelledOrderStatus /> :
                                    <OrderStatus step={order.orderStatus} />
                                }

                            </section>
                            <section className="order-details-details">
                                <div>
                                    <h3>Delivery Address</h3>
                                    <div><b>{user.username}</b></div>
                                    <div>
                                        <p>{`${order.shippingInfo.address}
                                     ${order.shippingInfo.city}-${order.shippingInfo.pincode} 
                                     ${order.shippingInfo.state}`}</p>
                                    </div>
                                    <div>
                                        <p><b>Phone Number:</b> <span>{order.shippingInfo.phoneNO}</span></p>
                                        
                                    </div>
                                </div>
                                <div>
                                    <h3>Payment Info</h3>
                                    <div>
                                        {order.paymentInfo.status === 'paid' ?
                                            <div>
                                                <span>Paid</span>
                                                <p><b>Transaction Id: </b> {order.paymentInfo.id}</p>
                                            </div> :
                                            <div>
                                                <p><span>Not Paid</span></p>
                                            </div>}
                                        {(order.orderStatus !== "cancelled" || order.orderStatus !== "delivered") &&
                                            <div >
                                                <button className="order-details-cancel-order-btn" onClick={OrderCancelhandler}>Cancel Order</button>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </section>


                            <section className="order-datails-price-details-section">
                                {order &&
                                    <div className="order-datails-price-details">
                                        <div><h3>PRICE DETAILS</h3></div>
                                        <div className="order-datails-prices-types">
                                            <div>
                                                <span>Price ({order.orderItems.length} items)</span>
                                                <span>₹{order.itemPrice}</span>
                                            </div>
                                            <div>
                                                <span>GST</span>
                                                <span>₹{order.taxPrice}</span>
                                            </div>
                                            <div>
                                                <span>Discount</span>
                                                <span>₹{Math.round(order.discount * 100 / order.itemPrice)}</span>
                                            </div>
                                            <div>
                                                <span>Delivery</span>
                                                <span>{order.shippingPrice === 0 ? "Free" : order.shippingPrice}</span>
                                            </div>

                                        </div>
                                        <div className="order-datails-page-total-amount">
                                            <h4><span>Total Amount</span><span>₹{order.totalPrice}</span></h4>

                                        </div>
                                        <span style={{ color: Math.round(order.discount * 100 / order.itemPrice + (order.shippingPrice == 0 ? 40 : 0)) > 0 ? "green" : "grey" }} className="cart-item-savings">You will save ₹{Math.round(order.discount * 100 / order.itemPrice + (order.shippingPrice == 0 ? 40 : 0))} on this order</span>
                                    </div>
                                }

                            </section>
                        </main>}
                </Fragment>}
        </Fragment>
    )
}