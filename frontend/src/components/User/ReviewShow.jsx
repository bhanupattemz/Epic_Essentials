import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReactStars from "react-rating-stars-component";
import React, { Fragment, useState } from "react"
import "./ProfileReview.css"
import { BsThreeDotsVertical } from "react-icons/bs";
import { deleteReview, updatereview } from "../../actions/ReviewAction"
import { useDispatch } from "react-redux"
import StarRatings from 'react-star-ratings';
import { IoMdCloseCircleOutline } from "react-icons/io";
export default function ReviewShow({ review }) {
    const [showEdits, setShowEdits] = useState(false)
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState(0);
    const dispatch = useDispatch()

    const updateReviewHandler = (e) => {
        e.preventDefault();
        setOpen(false);
        dispatch(updatereview({ rating, comment }, review._id));

    }
    const deleteReviewHandler = (review) => {
        dispatch(deleteReview(review._id))
    }
    return (
        <Fragment>
            <Dialog open={open} onClose={() => setOpen(false)}  onClick={(event) => event.stopPropagation()} >
                <DialogTitle>Review</DialogTitle>
                <DialogContent>
                    <div>
                        <label className="product-details-point-heading" htmlFor="rating">Rating:</label>
                        <ReactStars
                            count={5}
                            onChange={(rating) => setRating(rating)}
                            size={30}
                            activeColor="#ffd700"
                            isHalf={true}
                            value={rating}
                        />
                    </div>
                    <label className="product-details-point-heading" htmlFor="comment">Comment:</label>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="comment"
                        name="comment"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button  onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={updateReviewHandler}>Submit</Button>
                </DialogActions>
            </Dialog>
            <div className='profile-review-page-img-container'>
                {review.product &&
                    <img className="profile-review-page-img" src={review.product.images[0].url} alt={review.product.name + "img"} />
                }
            </div>

            <div className='profile-review-page-comment-container'>
                <h2>{review.product.name}</h2>
                <StarRatings
                    rating={review.rating}
                    starDimension="20px"
                    starRatedColor="gold"
                    starSpacing="0px"
                />
                <div className="profile-review-page-comment">
                    {review.comment}
                </div>
            </div>
            <div onClick={(event) => {
                event.stopPropagation();
                setShowEdits(val => !val)

            }} className="profile-review-show-verticaldots">
                {!showEdits &&
                    <div>
                        <BsThreeDotsVertical />
                    </div>}
                {showEdits &&
                    <div className="profile-review-edit-delete" >
                        <span className='profile-review-edit-delete-close-icon' onClick={()=>setOpen(false)}><IoMdCloseCircleOutline /></span>
                        <p onClick={() => {
                            setComment(review.comment)
                            setRating(review.rating)
                            setOpen(true)
                        }}>Edit</p>
                        <p onClick={() => () => deleteReviewHandler(review)}>Delete</p>
                    </div>}
            </div>
        </Fragment>

    )
}