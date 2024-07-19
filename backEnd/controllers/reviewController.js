const Review = require("../models/reviewModel")
const Product = require("../models/productModel")
const User = require("../models/userModel")
const wrapAsync = require("../utils/wrapAysnc")
const ExpressError = require("../utils/ExpressError")

module.exports.getAllReviews=wrapAsync(async(req,res)=>{
    const reviews=await Review.find({}).populate("user")
    res.status(200).json({
        success:true,
        message:"All reviews",
        reviews
    })
})

module.exports.createReview = wrapAsync(async (req, res) => {
    const { product_id } = req.params
    const user = await User.findById(req.user._id)
    const product = await Product.findById(product_id)
    const review = new Review({ ...req.body, user, product })
    user.review.push(review)
    product.review.push(review)
    await review.save()
    await user.save()
    await product.save()
    res.status(200).json({
        success: true,
        review: review
    })
})

module.exports.updateReview = wrapAsync(async (req, res) => {
    const { review_id } = req.params
    const updatedReview = await Review.findByIdAndUpdate(
        review_id,
        req.body,
        { new: true, runValidators: true })
        res.status(200).json({
            sccess:true,
            message:"updated review sccessfully",
            updatedReview
        })
})

module.exports.deleteReview=wrapAsync(async(req,res)=>{
    const {review_id}=req.params
    const user=await User.findByIdAndUpdate(req.user._id,{ $pull: { review: review_id } })
    const review=await Review.findByIdAndDelete(review_id)
    const product=await Product.findByIdAndUpdate(review.product,{ $pull: { review: review_id } })
    res.status(200).json({
        success:true,
        message:"deleted review Successfully",
        review
    })
})