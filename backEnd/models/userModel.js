const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose");
const Review = require("./reviewModel")
const Product = require("./productModel")
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter valid email"]
    },
    role: {
        type: String,
        default: "user",
        required: [true, "Please enter valid role"]
    },
    avatar: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    resetPasswordToken: String,
    resetPasswordExpire: Date
})
userSchema.post("findOneAndDelete", async (user,next) => {
    if (user) {
        try {
            const review = await Review.deleteMany({ _id: { $in: user.review } });
            const products = await Product.find({ _id: { $in: user.product } });
            for (let product of products) {
                try {
                    await Review.deleteMany({ _id: { $in: product.review } });
                } catch (err) {
                    console.log("Error deleting reviews for product:", err);
                }
            }
            
            const productDeletionResult = await Product.deleteMany({ _id: { $in: user.product } });
            
            console.log("Reviews deleted:", review);
            console.log("Products deleted:", productDeletionResult);
        } catch (error) {
            console.log("Error during user cleanup:", error);
        }

    }
    next()
});
userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("User", userSchema)