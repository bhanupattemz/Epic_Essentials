const wrapAysnc = require("./utils/wrapAysnc")
const ExpressError = require("./utils/ExpressError")
const Product = require("./models/productModel")
module.exports.isProductIn = wrapAysnc(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params._id)
        next()
    } catch (err) {
        throw new Error("product Not Found", 404)
    }


})

module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.isBlocked) {
            next(new ExpressError("You are Blocked By Admin", 401))
        }
        return next()
    }
    next(new ExpressError("must logged in", 401))
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role == "admin") {
        return next()
    }
    next(new ExpressError("Restricted page only admin will allowed", 401))
}