const wrapAsync = require("../utils/wrapAysnc")
const User = require("../models/userModel")
const sendMail = require("../utils/sendMail")
const { v4: uuid } = require('uuid')
const ExpressError = require("../utils/ExpressError")
const Order = require("../models/orderModel")

module.exports.allUser = wrapAsync(async (req, res) => {
    const users = await User.find()
    res.status(200).json({
        success: true,
        users
    })
})

module.exports.userDetails = wrapAsync(async (req, res) => {
    const user = await User.findById(req.params._id)
    if (!user) {
        throw new ExpressError("User Not Found", 404)
    }
    res.status(200).json({
        success: true,
        user
    })
})

module.exports.deleteUserByAdmin = wrapAsync(async (req, res) => {
    const user = await User.findOneAndDelete({ _id: req.params._id })
    if (!user) {
        throw new ExpressError("User Not Found", 404)
    }
    res.status(200).json({
        success: true,
        message: `delete user:${user.username} successfully`
    })
})

module.exports.updateUserRole = wrapAsync(async (req, res) => {
    const { _id } = req.params
    const user = await User.findById(_id)
    const role = user.role == "admin" ? "user" : "admin";
    console.log(role)
    const updateduser = await User.findByIdAndUpdate(
        _id,
        { role: role },
        { new: true, runValidators: true }
    )
    res.status(200).json({
        success: true,
        user: updateduser
    })
})

module.exports.allOrders = wrapAsync(async (req, res) => {
    const orders = await Order.find({});
    res.status(200).json({
        sucees: true,
        orders
    })
})