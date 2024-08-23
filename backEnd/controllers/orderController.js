const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const ExpressError = require("../utils/ExpressError")
const wrapAsync = require("../utils/wrapAysnc")
const mongoose = require("mongoose")

module.exports.AllUserOrders = wrapAsync(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.status(200).json({
        success: true,
        orders
    })
})

module.exports.getSingleOrder = wrapAsync(async (req, res) => {
    const { _id } = req.params
    const singleOrder = await Order.findById(_id).populate('orderItems.product').exec();
    res.status(200).json({
        success: true,
        order: singleOrder
    })
})
module.exports.createOrder = wrapAsync(async (req, res) => {
    const { orderItems } = req.body;
    for (let item of orderItems) {
        if (!mongoose.Types.ObjectId.isValid(item.product)) {
            throw new ExpressError(`Invalid product ID: ${item.product}`, 400);
        }

        const product = await Product.findById(item.product);
        if (!product) {
            throw new ExpressError(`Product not found: ${item.product}`, 404);
        }
    }

    const order = new Order({ ...req.body, user: req.user._id, createdAt: Date.now() });
    await order.save();
    const orders = await Order.find()
    res.status(200).json({
        success: true,
        message: "Order created successfully",
        order: orders
    });
});


module.exports.updateOrder = wrapAsync(async (req, res) => {
    const { _id } = req.params;
    const order = await Order.findById(_id);
    if (order.orderStatus === "delivered") {
        throw new ExpressError("Order is already delivered", 400);
    }
    if (req.body.orderStatus === "delivered") {
        order.deliveredAt = Date.now();
    } else if (req.body.orderStatus === "shipped") {
        await updateProductQuantity(_id, "");
    } else if (req.body.orderStatus === "shipped") {
        await updateProductQuantity(_id, "cancelled")
    }
    const updatedOrder = await Order.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
    const orders = await Order.find()
    res.status(200).json({
        success: true,
        orders
    });
});

module.exports.cancelOrder = wrapAsync(async (req, res) => {
    const { _id } = req.params;
    const order = await Order.findById(_id);
    if (order.orderStatus === "delivered") {
        throw new ExpressError("Order is already delivered", 400);
    }
    const updatedOrder = await Order.findByIdAndUpdate(_id, {orderStatus:"cancelled"}, { new: true, runValidators: true });
    res.status(200).json({
        success: true,
        order:updatedOrder
    });
})

module.exports.deleteOrder = wrapAsync(async (req, res) => {
    const { _id } = req.params
    const deletedOrder = await Order.findByIdAndDelete(_id)
    const orders = await Order.find()
    res.status(200).json({
        success: true,
        orders
    })
})







async function updateProductQuantity(_id, type) {
    const order = await Order.findById(_id);
    if (order && order.orderItems) {
        for (const item of order.orderItems) {
            const product = await Product.findById(item.product);
            if (product && type !== "cancelled") {
                product.stock -= parseInt(item.quantity, 10);
                await product.save();
            } else if (product && type === "cancelled") {
                product.stock += parseInt(item.quantity, 10)
            }
        }
    }
}

module.exports.isUsersOrder = wrapAsync(async (req, res, next) => {
    const { _id } = req.params;
    const order = await Order.findById(_id).populate("user");
    if (!order) {
        throw new ExpressError("Order not found", 404);
    } else if (!order.user._id.equals(req.user._id) && req.user.role !== "admin") {
        throw new ExpressError("User is not allowed", 403);
    }
    next();
});
