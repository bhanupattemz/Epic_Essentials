const express = require("express")
const { isLoggedIn, isAdmin } = require("../middleware")
const reviewController = require("../controllers/reviewController")
const router = express.Router()

router.route("/admin/reviews")
    .get(isLoggedIn, isAdmin, reviewController.getAllReviews)
router.route("/admin/reviews/find")
    .get(isLoggedIn, isAdmin, reviewController.searchReview)

router.route("/reviews/user")
    .get(isLoggedIn, reviewController.getUserReviews)
    
router.route("/review/new/:product_id")
    .post(isLoggedIn, reviewController.createReview)

router.route("/review/:review_id")
    .get(isLoggedIn, reviewController.getReview)
    .put(isLoggedIn, reviewController.updateReview)
    .delete(isLoggedIn, reviewController.deleteReview)

module.exports = router