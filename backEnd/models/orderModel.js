const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true },
        phoneNO: { type: Number, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true, default: "India" },
        pincode: { type: Number, required: true }
    },
    orderItems: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentInfo: {
        id: { type: String, required: true },
        status: { type: String, required: true },
        payedAt: { type: Date, required: true ,default:Date.now()}
    },
    itemPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    orderStatus: {
        type: String,
        required: true,
        default: "processing"
    },
    deliveredAt: Date,
    createdAt: { type: Date, default: Date.now },
    deliveredAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
