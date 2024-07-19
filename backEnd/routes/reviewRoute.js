const express = require("express")
const { isloggedIn } = require("../middleware")
const reviewController = require("../controllers/reviewController")
const router = express.Router()

router.route("/reviews")
    .get(reviewController.getAllReviews)

router.route("/review/new/:product_id")
    .post(reviewController.createReview)
    
router.route("/review/:review_id")
    .put(reviewController.updateReview)
    .delete(reviewController.deleteReview)

module.exports = router