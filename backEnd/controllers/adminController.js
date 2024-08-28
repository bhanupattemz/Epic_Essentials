const wrapAsync = require("../utils/wrapAysnc")
const User = require("../models/userModel")
const sendMail = require("../utils/sendMail")
const { v4: uuid } = require('uuid')
const ExpressError = require("../utils/ExpressError")
const Order = require("../models/orderModel")
const Products = require("../models/productModel")

module.exports.allUser = wrapAsync(async (req, res) => {
    const users = await User.find()
    res.status(200).json({
        success: null,
        users
    })
})

module.exports.userDetails = wrapAsync(async (req, res) => {
    const user = await User.findById(req.params._id)
    if (!user) {
        throw new ExpressError("User Not Found", 404)
    }
    res.status(200).json({
        success: null,
        user
    })
})

module.exports.deleteUserByAdmin = wrapAsync(async (req, res) => {
    const user = await User.findOneAndDelete({ _id: req.params._id })
    const { msg } = req.body
    if (!user) {
        throw new ExpressError("User Not Found", 404)
    }
    const options = {
        mail: user.email,
        subject: "Account Deleted",
        text: "Account Deleted",
        message: `
                <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <h2 style="color: #e74c3c;">Your Epic Essentials Account Has Been Deleted</h2>
                    <p style="font-size: 16px;">${msg}</p>
                    <p style="font-size: 14px; margin-top: 20px;">
                        If you believe this is a mistake, please contact <a href="mailto:${req.user.email}" style="color: #3498db; text-decoration: none;">${req.user.email}</a> for assistance.
                    </p>
                </div>
            `
    }
    const data = await sendMail(options)
    const users = await User.find()
    res.status(200).json({
        success: `delete user:${user.username} successfully`,
        users
    })
})

module.exports.updateUserRole = wrapAsync(async (req, res) => {
    const { _id } = req.params;
    const { role, msg } = req.body;
    let user = await User.findById(_id);
    if (!user) {
        throw new ExpressError("User Not Found", 404);
    } else if (user.role === role) {
        throw new ExpressError("Bad request: User already in this role", 400);
    }
    user = await User.findByIdAndUpdate(
        _id,
        { role },
        { new: true, runValidators: true }
    );
    let options = {
        mail: user.email,
        subject: "",
        text: "",
        message: `
            <h2>Your Epic Essentials account was updated by Admin</h2>
        `
    };

    if (role === "admin") {
        options = {
            ...options,
            subject: "Congratulations! You've Been Promoted to Admin",
            text: "You have been promoted to admin",
            message: `
                <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <h2 style="color: #2ecc71;">Congratulations!</h2>
                    <p style="font-size: 16px;">Your Epic Essentials account has been upgraded to Admin status. ${msg || ""}</p>
                    <p style="font-size: 14px; margin-top: 20px;">
                        If you have any questions, please contact <a href="mailto:${req.user.email}" style="color: #3498db; text-decoration: none;">${req.user.email}</a> for help.
                    </p>
                </div>
            `
        };
    } else {
        options = {
            ...options,
            subject: "Account Update: You Are Now a Regular User",
            text: "Your admin rights have been removed",
            message: `
                <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <h2 style="color: #f39c12;">Admin Rights Revoked</h2>
                    <p style="font-size: 16px;">Your Epic Essentials account has been changed to a regular user. ${msg || ""}</p>
                    <p style="font-size: 14px; margin-top: 20px;">
                        If you have any questions, please contact <a href="mailto:${req.user.email}" style="color: #3498db; text-decoration: none;">${req.user.email}</a> for help.
                    </p>
                </div>
            `
        };
    }

    await sendMail(options);

    res.status(200).json({
        success: `${user.name}'s role changed`,
        user
    });
});

module.exports.blockAndUnblockUser = wrapAsync(async (req, res) => {
    const { _id } = req.params;
    const { block, msg } = req.body;
    let user = await User.findById(_id);

    if (!user) {
        throw new ExpressError("User Not Found", 404);
    } else if (user.isBlocked === block) {
        throw new ExpressError("Bad request: User already in this state", 400);
    }

    let options = {};

    user = await User.findByIdAndUpdate(_id, { isBlocked: block }, { new: true, runValidators: true });

    if (block) {
        options = {
            ...options,
            mail: user.email,
            subject: "Account Blocked",
            text: "Your account has been blocked",
            message: `
                <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <h2 style="color: #e74c3c;">Your Epic Essentials Account Has Been Blocked</h2>
                    <p style="font-size: 16px;">${msg || "Please contact support for more information."}</p>
                    <p style="font-size: 14px; margin-top: 20px;">
                        If you believe this is a mistake, please contact <a href="mailto:${req.user.email}" style="color: #3498db; text-decoration: none;">${req.user.email}</a> for assistance.
                    </p>
                </div>
            `
        };
    } else {
        options = {
            ...options,
            mail: user.email,
            subject: "Account Unblocked",
            text: "Your account has been unblocked",
            message: `
                <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                    <h2 style="color: #2ecc71;">Your Epic Essentials Account Has Been Unblocked</h2>
                    <p style="font-size: 16px;">${msg || "You can now access your account."}</p>
                    <p style="font-size: 14px; margin-top: 20px;">
                        If you have any questions, please contact <a href="mailto:${req.user.email}" style="color: #3498db; text-decoration: none;">${req.user.email}</a> for help.
                    </p>
                </div>
            `
        };
    }

    const data = await sendMail(options);

    res.status(200).json({
        success: `${user.name}'s ${block ? "blocked" : "unblocked"}`,
        user
    });
});


module.exports.allOrders = wrapAsync(async (req, res) => {
    const orders = await Order.find();
    res.status(200).json({
        success: null,
        orders
    })
})

module.exports.adminGetAllProducts = wrapAsync(async (req, res) => {
    const products = await Products.find({})
    res.status(200).json({
        success: null,
        currentPage: 1,
        results: products.length,
        data: products
    });
})