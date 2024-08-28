import SideBar from "./SideBar"
import React, { act, Fragment, useEffect } from "react"
import "./Products.css"
import { getProducts } from "../../actions/ProductAction"
import { useDispatch, useSelector } from "react-redux"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { adminDeleteProducts } from "../../actions/ProductAction"
import { useNavigate } from "react-router"
import { getProductDetails, adminGetAllProucts } from "../../actions/ProductAction"
import MetaData from "../layout/MetaData"
export default function Products() {
    const dispatch = useDispatch()
    const { products, loading, error } = useSelector(state => state.products)
    const updateProducthandler = (_id) => {
        dispatch(getProductDetails(_id));
        navigate(`/admin/product/update/${_id}`)
    }
    const navigate = useNavigate()
    const columns = [
        { field: "id", headerName: "Product Id", hide: true, flex: 0.5 },
        { field: "name", headerName: "Name", flex: 0.4 },
        { field: "stock", headerName: "Stock", type: "number", flex: 0.3 },
        { field: "price", headerName: "Price", type: "number", flex: 0.2 },
        {
            field: "action",
            headerName: "Action",
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <div className="data-grid-actions">
                        <p onClick={() => updateProducthandler(params.value._id)}><CiEdit /></p>
                        <p onClick={() => dispatch(adminDeleteProducts(params.value._id))}><MdDeleteOutline /></p>
                    </div>
                )
            }


        }
    ];

    const rows = products.map((prod) => {
        return {
            id: prod._id,
            name: prod.name,
            stock: prod.stock,
            price: prod.price,
            action: prod
        }
    })

    useEffect(() => {
        if (error) {
            console.log(error)
        }
        dispatch(adminGetAllProucts());

    }, [getProducts, dispatch, error])
    return (
        <Fragment>
            <MetaData title="Admin Products -- Epic Essentials" />
            <main className="admin-product-main">
                <section className="admin-product-slidebar">
                    <SideBar />
                </section>
                <section className="admin-product-details">
                    <h1 className="admin-product-details-heading">Products</h1>
                    <div className="admin-products-datagrid-container">

                    <Box sx={{ height: 480, minWidth: '600px' }}>
                        <DataGrid
                            columns={columns}
                            rows={rows}
                            loading={loading}
                            rowHeight={38}
                            disableRowSelectionOnClick
                        />
                    </Box>

                    </div>

                </section>
            </main>
        </Fragment>
    )
}