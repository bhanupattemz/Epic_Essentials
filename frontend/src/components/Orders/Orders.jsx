import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../actions/Orderactions";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from "react-router-dom"
import "./OrderDetails.css"
import MetaData from "../layout/MetaData";
export default function Orders() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { orders: totalOrders, loading } = useSelector(state => state.order);
    const [orders, setOrders] = useState(totalOrders)
    useEffect(() => {
        setOrders(totalOrders)
    }, [totalOrders])
    useEffect(() => {
        dispatch(getUserOrders());
    }, [dispatch, getUserOrders]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'processing':
                return 'orange';
            case 'shipped':
                return 'blue';
            case 'delivered':
                return 'green';
            case 'cancelled':
                return 'red';
            case "out for delivery":
                return "purple";
            default:
                return 'grey';
        }
    };

    const columns = [
        { field: "id", headerName: "Order Id", hide: true, flex: 1 },
        { field: "date", headerName: "Order Placed At", flex: 0.5 },
        {
            field: "status",
            headerName: "Status",
            flex: 0.5,
            renderCell: (params) => (
                <span style={{ color: getStatusColor(params.value) }}>
                    {params.value}
                </span>
            )
        },
        { field: "quantity", headerName: "Quantity", type: "number", flex: 0.3 },
        { field: "totalPrice", headerName: "Price", type: "number", flex: 0.5 },
        {
            field: "action",
            headerName: "Action",
            flex: 0.5,
            renderCell: (params) => (
                <div onClick={()=>navigate(`/orders/${params.row.id}`)} ><LaunchIcon /></div>
            )
        }
    ];

    const rows = orders ? orders.map((item) => ({
        id: item._id,
        date: item.createdAt.slice(0, 10),
        status: item.orderStatus,
        quantity: item.orderItems.length,
        totalPrice: item.totalPrice,
    })) : [];

    return (
        <Fragment>
            <MetaData title="Orders -- Epic Essentials" />
            {
                orders && orders.length > 0 ?
                    <main className="orders-page-main">
                        <h1>My Orders</h1>
                        <div>
                            <Box sx={{ height: 520, width: '100%' }} >
                                <DataGrid
                                    columns={columns}
                                    rows={rows}
                                    loading={loading}
                                    rowHeight={38}
                                    disableRowSelectionOnClick
                                />
                            </Box >
                        </div>

                    </main>
                    :
                    <main className="emptyOrders-main">
                        <div className="emptyOrders">
                            <img
                                src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724667430/Epic%20Essentials/u2tjwwkpfa2dmwyeotyp.jpg"
                                alt="empty-cart" />
                            <h3>No Orders Placed Yet!</h3>
                            <p>You haven't placed any orders yet. Start shopping and place your first order now!</p>
                            <button onClick={() => navigate("/products")}>Shop now</button>
                        </div>
                    </main>
            }
        </Fragment>

    );
}
