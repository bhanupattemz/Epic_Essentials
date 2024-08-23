import SideBar from "./SideBar.jsx"
import "./DashBoard.css"
import { Fragment, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import DashboardsalesChart from "./DashboardSalesChart.jsx"
import DashboardStockChart from "./DashboardStockChart.jsx"
import Loader from "../layout/Loader/Loader.jsx"
import { adminGetAllOrders } from "../../actions/Orderactions.jsx"
import { adminGetAllUsers } from "../../actions/UserAction.jsx"
import {adminGetAllProucts} from "../../actions/ProductAction.jsx"
export default function DashBoard() {
    const dispatch = useDispatch()
    const { products, loading } = useSelector(state => state.products)
    const { orders, ordersCount } = useSelector(state => state.allOrders)
    const { usersCount } = useSelector(state => state.allUsers)
    let totalamount = 0;
    orders && orders.forEach(element => {
        totalamount += element.totalPrice
    });
    useEffect(() => {
        if (!orders || orders.length === 0) {
            dispatch(adminGetAllOrders())
        }
        if (usersCount === 0) {
            dispatch(adminGetAllUsers())
            dispatch(adminGetAllProucts())
        }
    }, [dispatch, adminGetAllOrders, adminGetAllUsers])
    return (
        <Fragment>
            <main className="dashboard-main">
                <section className="dashboard-sidebar">
                    <SideBar />
                </section>
                <section className="dashborad-main-content">
                    {loading ? <Loader /> :
                        <Fragment>
                            <div>
                                <h2>Dashboard</h2>
                            </div>
                            <div className="dashboard-details">
                                <div className="dashboard-total-amount">
                                    <p>Total Amount </p>
                                    <p>₹{totalamount}</p>
                                </div>
                                <div className="dashboard-pou-details">
                                    <Link to={"/admin/products"}>
                                        <p>Products</p>
                                        <p>{products ? products.length : 0}</p>
                                    </Link>
                                    <Link to={"/admin/orders"}>
                                        <p>Orders</p>
                                        <p>{ordersCount}</p>
                                    </Link>
                                    <Link to={"/admin/users"}>
                                        <p>Users</p>
                                        <p>{usersCount}</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="dashboard-sales-chart">
                                <DashboardsalesChart orders={orders ? orders : []} />
                            </div>
                            <div className="dashboard-stock-chart">
                                <DashboardStockChart products={products} />
                            </div>

                        </Fragment>}
                </section>
            </main>
        </Fragment>
    )
}