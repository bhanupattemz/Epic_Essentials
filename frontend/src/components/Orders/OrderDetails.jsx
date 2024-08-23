import React, { useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import { getOrderDetails, cancelorderDetails } from "../../actions/Orderactions"
import { useParams } from "react-router-dom"
import Loader from "../layout/Loader/Loader"
import "./OrderDetails.css"
import OrderStatus from "./OrderStatus"
import CancelledOrderStatus from "./CancelOrderStatus"
export default function OrderDefault() {
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
            {!order && loading ? <Loader /> :
                <Fragment>
                    {order &&
                        <main className="order-details-main">
                            <h1>Order Details</h1>
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
                                        <p><b>Phone Number</b></p>
                                        <span>{order.shippingInfo.phoneNO}</span>
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
                                        {order.orderStatus !== "cancelled" || order.orderStatus !== "delivered" &&
                                            <div>
                                                <button onClick={OrderCancelhandler}>cancel Order</button>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </section>
                            <section>

                                <h3>Order Status</h3>
                                {order.orderStatus === "cancelled" ? <CancelledOrderStatus /> :
                                    <OrderStatus step={order.orderStatus} />
                                }


                            </section>
                            <section className="order-details-products">
                                {order.orderItems.map((item) => {
                                    return (
                                        <a href={`/products/${item.product}`} style={{ textDecoration: "none" }}>
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
                                        </a>
                                    )
                                })}
                                <div className="order-details-money">
                                    <div></div>
                                    <div></div>
                                    <div>
                                        <p><b>Total: ₹{order.totalPrice}</b></p>
                                    </div>

                                </div>
                            </section>
                        </main>}
                </Fragment>}
        </Fragment>
    )
}