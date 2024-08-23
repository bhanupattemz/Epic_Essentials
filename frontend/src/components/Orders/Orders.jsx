import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../actions/Orderactions";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import LaunchIcon from '@mui/icons-material/Launch';

export default function Orders() {
    const dispatch = useDispatch();
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
                <a href={`orders/${params.row.id}`}><LaunchIcon /></a>
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
        <Box sx={{ height: 520, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                loading={loading}
                rowHeight={38}
                disableRowSelectionOnClick
            />
        </Box>
    );
}
