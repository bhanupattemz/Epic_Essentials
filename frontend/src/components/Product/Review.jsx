import "./ProductDetails.css"
import StarRatings from "react-star-ratings"
export default function Review({ review }) {
    return (
        <div className="review-card">
            {review.user.avatar[0].url ?
                <img src={review.user.avatar[0].url} alt="profile-avatar" /> :
                <img src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721047699/Epic%20Essentials/pjlmvwy41tdhblpskhnj.png" alt="profile-avatar" />
            }

            <h4>{review.user.username}</h4>
            <StarRatings
                rating={review.rating}
                starDimension="20px"
                starRatedColor="gold"
                starSpacing="0px" />
            <p>{review.comment}</p>
        </div>
    )
}