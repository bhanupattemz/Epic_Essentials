import SideBar from "./SideBar"
import React, { Fragment, useEffect, useState } from "react"
import "./OrdersList.css"
import { useDispatch, useSelector } from "react-redux"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router"
import { adminGetAllReviews, deleteReview, adminfindReviews } from "../../actions/ReviewAction"

export default function ReviewsList() {
    const dispatch = useDispatch()
    const [deleteReviewPop, setDeleteReviewPop] = useState(false)
    const { reviews, loading, error } = useSelector(state => state.allReviews)
    const [review, setreview] = useState({})
    const [searchText, setsearchText] = useState("")
    const deleteReviewhandler = async () => {
        setDeleteReviewPop(false)
        console.log(review)
        dispatch(deleteReview(review._id))
        dispatch(adminGetAllReviews())
    }
    const searchSubmitHandler = () => {
        console.log(searchText)
        dispatch(adminfindReviews(searchText))
    }
    const navigate = useNavigate()

    const columns = [
        { field: "id", headerName: "Review Id", hide: true, flex: 0.7 },
        { field: "product", headerName: "Product", flex: 0.5 },
        { field: "username", headerName: "Username", flex: 0.5 },
        { field: "comment", headerName: "Comment", flex: 0.6 },
        {
            field: "rating",
            headerName: "Rating",
            flex: 0.3,
            renderCell: (params) => (
                <span >
                    {params.value}
                </span>
            )
        },
        {
            field: "action",
            headerName: "Action",
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <div className="data-grid-orders-actions">
                        <p onClick={() => {
                            setreview(params.value)
                            setDeleteReviewPop(true)
                        }}><MdDeleteOutline /></p>
                    </div>
                )
            }
        }
    ];
    let rows = reviews ? reviews.map((item) => ({
        id: item._id,
        product: item.product.name,
        username: item.user.username,
        comment: item.comment,
        rating: item.rating,
        action: item
    })) : [];
    useEffect(() => {
        rows = reviews ? reviews.map((item) => ({
            id: item._id,
            product: item.product.name,
            username: item.user.username,
            comment: item.comment,
            rating: item.rating,
            action: item
        })) : [];
    }, [reviews, rows])

    useEffect(() => {
        if (error) {
            console.log(error)
        }
        dispatch(adminGetAllReviews())
    }, [adminGetAllReviews, dispatch, error])
    return (
        <Fragment>
            <main className="admin-orders-main">
                {deleteReviewPop &&
                    <section className="admin-delete-user-conformation">
                        <div className="admin-delete-user-box">
                            <h3>Delete Review</h3>
                            <p>Are you sure you want to delete {review.user.username}'s review on {review.product.name}?
                            </p>
                            <div>
                                <button className="admin-update-user-delete-btn" onClick={deleteReviewhandler}>Delete</button>
                                <button className="admin-update-user-delete-cancel-btn" onClick={(e) => {
                                    e.preventDefault();
                                    setDeleteReviewPop(false)
                                }}>Cancel</button>
                            </div>
                        </div>
                    </section>}
                <section className="admin-orders-slidebar">
                    <SideBar />
                </section>
                {!deleteReviewPop &&
                    <section className="admin-orders-details">

                        <h2>All Reviews</h2>
                        <div>
                            <input type="text" name="username" id="username" onChange={(e) => setsearchText(e.target.value)} value={searchText} placeholder="Enter Username or productId" />
                            <button onClick={searchSubmitHandler}>search</button>
                        </div>
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
                }

            </main>
        </Fragment>
    )
}