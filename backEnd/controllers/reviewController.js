const Review = require("../models/reviewModel")
const Product = require("../models/productModel")
const User = require("../models/userModel")
const wrapAsync = require("../utils/wrapAysnc")
const ExpressError = require("../utils/ExpressError")
const mongoose = require('mongoose');

module.exports.getAllReviews = wrapAsync(async (req, res) => {
    const reviews = await Review.find({}).populate("user").populate("product")
    res.status(200).json({
        success: null,
        reviews
    })
})
module.exports.getUserReviews = wrapAsync(async (req, res) => {
    const reviews = await Review.find({user:req.user._id}).populate("product")
    res.status(200).json({
        success: null,
        review:reviews
    })
})


module.exports.createReview = wrapAsync(async (req, res) => {
    const { product_id } = req.params
    console.log(req.body)
    const user = await User.findById(req.user._id)
    const product = await Product.findById(product_id)
    const review = new Review({ ...req.body, user, product })
    if (product.review.length === 0) {
        product.rating = review.rating;
    } else {
        product.rating = (product.rating + review.rating) / 2;
    }
    user.review.push(review)
    product.review.push(review)
    console.log(review, product)
    await review.save()
    await user.save()
    await product.save()
    const reviews = await Review.find()
    res.status(200).json({
        success: "Review Created Success",
        review: reviews
    })
})

module.exports.updateReview = wrapAsync(async (req, res) => {
    const { review_id } = req.params
    const review = await Review.findById(review_id)
    const updatedReview = await Review.findByIdAndUpdate(
        review_id,
        req.body,
        { new: true, runValidators: true })
    const product = await Product.findById(updatedReview.product)
    product.rating = (product.rating * product.review.length - review.rating + updatedReview.rating) / product.review.length
    await product.save()
    res.status(200).json({
        success: "updated review sccessfully",
        review: updatedReview
    })
})

module.exports.deleteReview = wrapAsync(async (req, res) => {
    const { review_id } = req.params
    const user = await User.findByIdAndUpdate(req.user._id, { $pull: { review: review_id } })
    const review = await Review.findByIdAndDelete(review_id)
    const product = await Product.findByIdAndUpdate(review.product, { $pull: { review: review_id } })
    if (product.review.length === 1) {
        product.rating = 0
    } else {
        product.rating = (product.rating * product.review.length - review.rating) / (product.review.length - 1)
    }
    await product.save()
    res.status(200).json({
        success:"deleted review Successfully",
        review
    })
})

module.exports.getReview = wrapAsync(async (req, res) => {
    const { review_id } = req.params
    const review = await Review.findOne({ product: review_id, user: req.user._id })
    res.status(200).json({
        success: null,
        review
    })
})


module.exports.searchReview = wrapAsync(async (req, res) => {
    const { q } = req.query;
    let review = [];
    if (mongoose.Types.ObjectId.isValid(q)) {
        review = await Review.find({ product: q }).populate("user").populate("product");
    } else {
        const user = await User.findOne({ username: q });
        review = await Review.find({ user: user._id }).populate("user").populate("product");
        if (!review || review.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No reviews found for the given query."
            });
        }
        console.log(review)
        return res.status(200).json({
            success: null,
            reviews: review
        });
    }

    return res.status(200).json({
        success: null,
        reviews: review
    });
});
