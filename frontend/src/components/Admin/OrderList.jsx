import SideBar from "./SideBar"
import React, { Fragment, useEffect } from "react"
import "./OrdersList.css"
import { useDispatch, useSelector } from "react-redux"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router"
import { adminGetAllOrders, adminDeleteOrders } from "../../actions/Orderactions"
export default function OrderList() {
    const dispatch = useDispatch()
    const { products, error } = useSelector(state => state.products)
    const { orders, loading } = useSelector(state => state.allOrders);
    const updateOrdershandler = (_id) => {
        navigate(`/admin/orders/update/${_id}`)
    }
    const navigate = useNavigate()
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
            renderCell: (params) => {
                return (
                    <div className="data-grid-orders-actions">
                        <p onClick={() => updateOrdershandler(params.value._id)}><CiEdit /></p>
                        <p onClick={() => dispatch(adminDeleteOrders(params.value._id))}><MdDeleteOutline /></p>
                    </div>
                )
            }
        }
    ];
    let rows = orders ? orders.map((item) => ({
        id: item._id,
        date: item.createdAt.slice(0, 10),
        status: item.orderStatus,
        quantity: item.orderItems.length,
        totalPrice: item.totalPrice,
        action: item
    })) : [];
    useEffect(() => {
        rows = orders ? orders.map((item) => ({
            id: item._id,
            date: item.createdAt.slice(0, 10),
            status: item.orderStatus,
            quantity: item.orderItems.length,
            totalPrice: item.totalPrice,
            action: item
        })) : [];
    }, [orders, rows])


    useEffect(() => {
        if (error) {
            console.log(error)
        }
        dispatch(adminGetAllOrders());

    }, [adminGetAllOrders, dispatch, error])
    return (
        <Fragment>
            <main className="admin-orders-main">
                <section className="admin-orders-slidebar">
                    <SideBar />
                </section>
                <section className="admin-orders-details">
                    <h2>ORDERS</h2>
                    <Box sx={{ height: 480, width: '100%' }}>
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            loading={loading}
                            rowHeight={38}
                            disableRowSelectionOnClick
                        />
                    </Box>
                </section>
            </main>
        </Fragment>
    )
}