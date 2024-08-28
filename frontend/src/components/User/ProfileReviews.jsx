import React, { useEffect, Fragment, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "../layout/Loader/Loader"
import MetaData from "../layout/MetaData"
import SideBar from "./SideBar"
import "./ProfileReview.css"
import { getAllUserReview, deleteReview, updatereview } from "../../actions/ReviewAction"
import ReviewShow from "./ReviewShow"

export default function ProfileReviews() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, review: reviews } = useSelector(state => state.review)
    if(!Array.isArray(reviews)){
        dispatch(getAllUserReview())
    }
    const { user } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getAllUserReview())
    }, [dispatch, getAllUserReview])
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <main className="profile-reviews-page-main profile-page-main">
                        <MetaData title={`${user.username} --Epic Essentials`} />
                        <section className="profile-reviews-page-side-bar">
                            <SideBar curent_place={"review"} />
                        </section>
                        
                        <section className="profile-reviews-page-content">
                            <h1>My Reviews</h1>
                            
                            <div className="profile-reviews-page-container">
                            {reviews.length>0?reviews  && reviews.map((review, index) => {
                                    return (
                                        <div key={index} onClick={()=>navigate(`/products/${review.product._id}`)} className="profile-review-page-container">
                                            <ReviewShow review={review} />
                                        </div>
                                    )
                                }):
                                <div className="my-reviews-page-no-reviews-conatainer">
                                    <img className="my-reviews-page-no-reviews-img" src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724818627/Epic%20Essentials/kn88b0zvrvxz2w8k9trs.jpg" alt="reviews-img" />
                                    <p>You have not review any product yet!</p>
                                    
                                </div>
                                }
                                
                            </div>
                        </section >
                    </main>
                </Fragment>
            }

        </Fragment>
    )
}