const mongoose = require("mongoose")
const Review = require("./reviewModel")
const { cloudinary } = require('../config/clodinary')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "product Name required"],
        trim: true
    },
    discription: {
        type: String,
        required: [true, "product discription required"]
    },
    price: {
        type: Number,
        required: [true, "product Price required"],
        maxLength: [8, "price can't exceets 8 charecters"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
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
    category: {
        type: String,
        required: [true, "please enter category of product"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter items instock"]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    specifications: [
        {
            key: { type: String, required: true },
            value: { type: String, require: true }
        }
    ]

})
productSchema.post("findOneAndDelete", async (product) => {
    if (product) {
        try {
            const review = await Review.deleteMany({ _id: { $in: product.review } });
            for (let image of product.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        } catch (error) {
            console.log(error)
        }

    }
})

module.exports = mongoose.model("Products", productSchema)