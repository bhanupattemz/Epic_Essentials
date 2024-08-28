import SideBar from "./SideBar"
import React, { act, Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getOrderDetails } from "../../actions/Orderactions"
import { useParams } from "react-router-dom"
import Loader from "../layout/Loader/Loader"
import "./ProcessOrder.css"
import { adminUpdateOrders } from "../../actions/Orderactions"
import OrderStatus from "../Orders/OrderStatus"
import CancelledOrderStatus from "../Orders/CancelOrderStatus"
import MetaData from "../layout/MetaData"
import {useNavigate} from "react-router-dom"
export default function ProcessOrder() {
    const { loading, error, order } = useSelector(state => state.orderDetails);
    const { orders, loading: allordersLoading } = useSelector(state => state.allOrders)
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const [data, setData] = useState({
        orderStatus: ""
    })
    const { _id } = useParams();
    const user = useSelector(state => state.user).user;
    useEffect(() => {
        dispatch(getOrderDetails(_id))
    }, [dispatch, _id, getOrderDetails, orders])
    const updateSubmitHandler = (e) => {
        e.preventDefault();
        if (data.orderStatus !== "") {
            dispatch(adminUpdateOrders(data, _id))
        }
    }
    return (
        <Fragment>
            <MetaData title="Admin Process Order -- Epic Essentials" />
            <main className="admin-process-order-main">
                <section className="admin-process-order-slidebar">
                    <SideBar />
                </section>
                <section className="admin-process-order-details">
                    <Fragment>
                        {!order || loading || allordersLoading ? <Loader /> :
                            <Fragment>
                                {order &&
                                    <section className="admin-process-order-main-section">
                                        <h1>{order._id}'s Order Details</h1>
                                        <section className="admin-process-order-products">
                                            {order.orderItems.map((item) => {
                                                return (
                                                    <div onClick={()=>navigate(`/products/${item.product}`)}  style={{ textDecoration: "none" }}>
                                                        <div className="admin-process-order-item">
                                                            <div className="admin-process-order-item-product">
                                                                <img src={item.image}
                                                                    alt="product-img" className="admin-process-order-Item-img" />
                                                                <p >{item.name}</p>
                                                            </div>
                                                            <div>
                                                                <p className="admin-process-order-item-pricing">
                                                                    {`${item.quantity}*${item.price}=₹${item.quantity * item.price}`}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </section>
                                        <section className="admin-proccess-orders-status-container">
                                            <h2 className="admin-process-order-status">Order Status</h2>
                                            <div className="admin-proccess-orders-status">
                                                {order.orderStatus === "cancelled" ? <CancelledOrderStatus /> :
                                                    <OrderStatus step={order.orderStatus} />
                                                }
                                            </div>
                                        </section>
                                        <section className="admin-process-order-details">
                                            <div>
                                                <h2>Delivery Address</h2>
                                                <div><b>{user.username}</b>
                                                    <p>{order.shippingInfo.phoneNO}</p></div>
                                                <div>
                                                    <p>{`${order.shippingInfo.address}
                                                    ${order.shippingInfo.city}-${order.shippingInfo.pincode} 
                                                    ${order.shippingInfo.state}`}</p>
                                                </div>

                                            </div>
                                            <div>
                                                <h2>Payment Info</h2>
                                                <div>
                                                    {order.paymentInfo.orderStatus === 'paid' ?
                                                        <div>
                                                            <span>Paid</span>
                                                            <p><b>Transaction Id: </b> {order.paymentInfo.id}</p>
                                                        </div> :
                                                        <div>
                                                            <p><span>Not Paid</span></p>
                                                        </div>}
                                                    <div>
                                                        {order.orderStatus !== "delivered" && order.orderStatus !== "cancelled" ?
                                                            <form className="admin-update-order-btn" onSubmit={updateSubmitHandler}>
                                                                <select name="status" id="status" onChange={(e) => setData({ ...data, orderStatus: e.target.value })} required>
                                                                    <option >{data.orderStatus !== "" ? data.orderStatus : "Select Status"}</option>
                                                                    {order.orderStatus == "processing" && <option value="shipped">Shipped</option>}
                                                                    {order.orderStatus == "shipped" && <option value="out for delivery">Out For Delivery</option>}
                                                                    {order.orderStatus == "out for delivery" && <option value="delivered">Delivared</option>}
                                                                    <option value="cancelled">cancelled</option>
                                                                </select>
                                                                <button>Submit</button>
                                                            </form> :

                                                            order.orderStatus === "cancelled" ?
                                                                <p>cancelled at {order.deliveredAt.slice(0, 10)}</p> :
                                                                <p>delivered at {order.deliveredAt.slice(0, 10)}</p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <section className="admin-process-order-price-details-section">
                                            {order &&
                                                <div className="admin-process-order-price-details">
                                                    <div><h2>PRICE DETAILS</h2></div>
                                                    <div className="admin-process-order-prices-types">
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
                                                    <div className="admin-process-order-page-total-amount">
                                                        <h4><span>Total Amount</span><span>₹{order.totalPrice}</span></h4>

                                                    </div>
                                                    <span style={{ color: Math.round(order.discount * 100 / order.itemPrice + (order.shippingPrice == 0 ? 40 : 0)) > 0 ? "green" : "grey" }} className="cart-item-savings">You will save ₹{Math.round(order.discount * 100 / order.itemPrice + (order.shippingPrice == 0 ? 40 : 0))} on this order</span>
                                                </div>
                                            }

                                        </section>
                                    </section>}
                            </Fragment>}
                    </Fragment>
                </section>
            </main>
        </Fragment>
    )
}