import "./ProductDetails.css"
import StarRatings from "react-star-ratings"
import { useDispatch } from "react-redux"
import { deleteReview } from "../../actions/ReviewAction"
export default function Review({ review, user_id, setisReviewChanged }) {
    const dispatch = useDispatch()
    const deleteReviewHandler = () => {
        dispatch(deleteReview(review._id))
        setisReviewChanged.setisReviewChanged(!setisReviewChanged.isReviewChanged)
    }
    return (
        <div className="review-card">
            <div className="review-card-user-details">
                {review.user.avatar[0].url ?
                    <img src={review.user.avatar[0].url} alt="profile-avatar" /> :
                    <img src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721047699/Epic%20Essentials/pjlmvwy41tdhblpskhnj.png" alt="profile-avatar" />
                }

                <h4>{review.user.username}</h4>
                <div>
                    <StarRatings
                        rating={review.rating}
                        starDimension="20px"
                        starRatedColor="gold"
                        starSpacing="0px" />
                </div>

            </div>

            <p>{review.comment}</p>
            {user_id === review.user._id && <button onClick={deleteReviewHandler}>delete review</button>}

        </div>
    )
}