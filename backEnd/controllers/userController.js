const wrapAsync = require("../utils/wrapAysnc")
const User = require("../models/userModel")
const sendMail = require("../utils/sendMail")
const { v4: uuid } = require('uuid')
const ExpressError = require("../utils/ExpressError")

module.exports.register = wrapAsync(async (req, res, next) => {
    try {
        const data = req.body;
        const password = data.password;
        delete data.password;
        const user = new User(data);
        const newUser = await User.register(user, password);
        req.logIn(newUser, (err) => {
            if (err) return next(err);
            res.status(200).json({
                success: true,
                message: newUser
            });
        });
    } catch (error) {
        next(error);
    }
});

module.exports.login = (req, res) => {
    res.status(200).json({
        sucess: true,
        message: req.user
    })
}

module.exports.logout = (req, res) => {
    req.logOut(function (err) {
        if (err) {
            next(err)
        }
        res.status(200).json({
            success: true,
            message: "logout Successfully",
            userdata: req.user
        })
    })
}

module.exports.createPasswordToken = wrapAsync(async (req, res) => {
    const token = uuid()
    const user = await User.findByIdAndUpdate(req.user._id, {
        resetPasswordToken: token,
        resetPasswordExpire: Date.now() + 30 * 60 * 1000
    })

    const link = `${req.protocol}://${req.get('host')}/api/v1/reset-password/${token}`
    const options = {
        mail: req.user.email,
        subject: "change Password",
        text: "change password",
        message: `
        <a href="${link}">Click here to reset your password</a>
        <p>If it's not you, please ignore this email.</p>
    `
    }
    const data = await sendMail(options)
    if (data) {
        res.status(200).json({
            success: true,
            message: "message sent"
        })
    } else {
        res.status(400).json({
            success: false,
            message: "message not sent"
        })
    }
})


module.exports.resetPassword = wrapAsync(async (req, res) => {
    const { newpassword, confirmPassword } = req.body
    if (newpassword != confirmPassword) {
        throw new ExpressError("password not match", 400)
    }
    const { token } = req.params;
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.setPassword(newpassword, async (err) => {
        if (err) return res.status(500).json({ message: 'Error setting password' });

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    });
});

module.exports.updatePassword = wrapAsync(async (req, res) => {
    const { _id } = req.params
    const passwords = req.body
    if (passwords.newpassword != passwords.confirmpassword) {
        throw new ExpressError("confirm password not match", 400)
    }
    const user = await User.findById(_id)
    if (!user) {
        throw new ExpressError("User not found", 404)
    }
    user.changePassword(passwords.oldpassword, passwords.newpassword, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('successfully change password')
        }
    })
})

module.exports.profile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
}
module.exports.deleteUser = wrapAsync(async (req, res) => {
    const user = await User.findOneAndDelete({ _id: req.user._id })
    req.logOut(function (err) {
        if (err) {
            next(err)
        }
        res.status(200).json({
            success: true,
            message: "logout Successfully",
            userdata: req.user
        })
    })
    res.status(200).json({
        success: true,
        message: "logout Successfully",
        userdata: req.user
    })
})
module.exports.updateUser = wrapAsync(async (req, res) => {
    const userdata = req.body
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        userdata,
        { new: true, runValidators: true })
    res.status(200).json({
        success: true,
        user: updatedUser
    })
})























module.exports.verifyMail = async (req, res, next) => {
    const options = {
        mail: req.body.email,
        subject: "Verify Mail",
        message: `${Math.floor(Math.random() * 9999 + 1000)}`
    }
    const data = await sendMail(options)
    if (data) {
        next()
    }
}
