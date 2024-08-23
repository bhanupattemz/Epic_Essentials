const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    price:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        default:0
    },
    gst:{
        type:Number,
        default:0
    },
    delivery:{
        type:Number,
        default:0
    },
    totalAmount:{
        type:Number,
        default:0
    }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
