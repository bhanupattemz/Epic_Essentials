import SideBar from "./SideBar"
import React, { act, Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import { getOrderDetails } from "../../actions/Orderactions"
import { useParams } from "react-router-dom"
import Loader from "../layout/Loader/Loader"
import "./ProcessOrder.css"
import { adminUpdateOrders } from "../../actions/Orderactions"
import OrderStatus from "../Orders/OrderStatus"
import CancelledOrderStatus  from "../Orders/CancelOrderStatus"

export default function ProcessOrder() {
    const { loading, error, order } = useSelector(state => state.orderDetails);
    const dispatch = useDispatch();
    const [data, setData] = useState({
        orderStatus: ""
    })
    const { _id } = useParams();
    const user = useSelector(state => state.user).user;
    useEffect(() => {
        dispatch(getOrderDetails(_id))
    }, [dispatch, _id, getOrderDetails])
    const updateSubmitHandler = (e) => {
        e.preventDefault();
        console.log(data, _id)
        if (data.orderStatus !== "") {
            dispatch(adminUpdateOrders(data, _id))
        }

    }
    return (
        <Fragment>
            <main className="admin-process-order-main">
                <section className="admin-process-order-slidebar">
                    <SideBar />
                </section>
                <section className="admin-process-order-details">
                    <Fragment>
                        {!order && loading ? <Loader /> :
                            <Fragment>
                                {order &&
                                    <main className="order-details-main">
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
                                                    {order.paymentInfo.orderStatus === 'paid' ?
                                                        <div>
                                                            <span>Paid</span>
                                                            <p><b>Transaction Id: </b> {order.paymentInfo.id}</p>
                                                        </div> :
                                                        <div>
                                                            <p><span>Not Paid</span></p>
                                                        </div>}
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
                                                                    {`${item.quantity}*${item.price}=₹${item.quantity * item.price}`}
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
                                        <section>
                                            {order.orderStatus !== "delivered" && order.orderStatus !== "cancelled" ?
                                                <form onSubmit={updateSubmitHandler}>
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

                                        </section>
                                    </main>}
                            </Fragment>}
                    </Fragment>
                </section>
            </main>
        </Fragment>
    )
}