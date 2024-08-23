const wrapAsync = require("../utils/wrapAysnc")
const User = require("../models/userModel")
const sendMail = require("../utils/sendMail")
const { v4: uuid } = require('uuid')
const ExpressError = require("../utils/ExpressError")
const passport = require("passport")
const { cloudinary } = require('../config/clodinary')
const Cart = require("../models/cartModel")
module.exports.register = wrapAsync(async (req, res, next) => {
    try {
        const data = req.body;
        const password = data.password;
        delete data.password;
        data.avatar = req.files.map(f => ({ public_id: f.filename, url: f.path }));
        if (data.avatar.length === 0) {
            data.avatar = [{
                public_id: "default",
                url: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721047699/Epic%20Essentials/pjlmvwy41tdhblpskhnj.png"
            }]

        }
        const user = new User(data);
        const newUser = await User.register(user, password);
        const cart = new Cart({ user })
        await cart.save()
        req.logIn(newUser, (err) => {
            if (err) return next(err);
            res.status(200).json({
                success: true,
                user: newUser,
                isauthenticate: true
            });
        });
    } catch (error) {
        next(error);
    }
});

module.exports.login = (req, res) => {
    res.status(200).json({
        sucess: true,
        user: req.user,
        isauthenticate: true
    })
}

module.exports.logout = (req, res) => {
    req.logOut((err) => {
        if (err) return next(err);
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    });

}

module.exports.createPasswordToken = wrapAsync(async (req, res) => {
    const token = uuid()
    const { email } = req.body
    const userData = await User.findOne({ email })
    if (!userData) {
        res.status(401).json({
            success: flase,
            message: "user not found"
        })
    }
    const user = await User.findOneAndUpdate({ email }, {
        resetPasswordToken: token,
        resetPasswordExpire: Date.now() + 30 * 60 * 1000
    })
    const link = `http://localhost:5173/password/reset/${token}`
    const options = {
        mail: email,
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
    const { newpassword, confirmpassword } = req.body
    if (newpassword != confirmpassword) {
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
        user: req.user,
        isauthenticate: true
    })
}
module.exports.deleteUser = wrapAsync(async (req, res) => {
    await User.findOneAndDelete({ _id: req.user._id });
    req.logOut((err) => {
        if (err) return next(err);
        res.clearCookie('session');
        res.status(200).json({
            success: true,
            message: "User deleted and logged out successfully"
        });
    });

})

module.exports.updateUser = wrapAsync(async (req, res) => {
    const userdata = req.body;
    const user = req.user;
    let updatedUser = user;

    let avatar = [];
    if (req.files && req.files.length > 0) {
        avatar = req.files.map(f => ({ public_id: f.filename, url: f.path }));
    }

    if (avatar.length === 0) {
        updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { ...userdata, avatar: user.avatar },
            { new: true, runValidators: true }
        );
    } else {
        for (let image of user.avatar) {
            if (image.public_id !== "default") {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }
        updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { ...userdata, avatar: avatar },
            { new: true, runValidators: true }
        );
    }
    req.user = updatedUser
    console.log(req.user)
    res.status(200).json({
        success: true,
        user: updatedUser
    });
});



module.exports.addAddress = wrapAsync(async (req, res) => {
    const user = await User.findById(req.user._id);
    user.shippingInfo.push(req.body)
    await user.save()
    res.status(200).json({
        success: true,
        user
    })
})

module.exports.updateAddress = wrapAsync(async (req, res) => {
    const { _id } = req.params
    const { address, phoneNO, city, state, country, pincode } = req.body;
    const user = await User.findById(req.user._id);
    const shippingInfo = user.shippingInfo.id(_id)
    if (!shippingInfo) {
        throw new ExpressError("Address Not Found", 404)
    }
    shippingInfo.address = address || shippingInfo.address;
    shippingInfo.phoneNO = phoneNO || shippingInfo.phoneNO;
    shippingInfo.city = city || shippingInfo.city;
    shippingInfo.state = state || shippingInfo.state;
    shippingInfo.country = country || shippingInfo.country;
    shippingInfo.pincode = pincode || shippingInfo.pincode
    await user.save();
    res.status(200).json({
        success: true,
        user
    })
})
module.exports.removeAddress = wrapAsync(async (req, res) => {
    const { _id } = req.params
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { shippingInfo: { _id } } },
        { new: true, runValidators: true }
    );
    await user.save()
    res.status(200).json({
        success: true,
        user
    })
})

module.exports.authenticateUser = wrapAsync(async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (user.isBlocked) {
            next(new ExpressError("You are Blocked By Admin", 401));
        }
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new ExpressError(info.message,401));
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return next();
        });
    })(req, res, next);

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
