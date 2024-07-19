const product = require("../models/productModel")
const wrapAysnc = require("../utils/wrapAysnc")
const ApiFeatures = require("../Features/apiFeatures")
const User = require("../models/userModel")
const ExpressError = require("../utils/ExpressError")

module.exports.getAllProducts = wrapAysnc(async (req, res, next) => {
    const productsCount = new ApiFeatures(product.find().populate("user"), req.query).search().filter()
    const productsLength = await productsCount.query.exec()
    const features = new ApiFeatures(product.find().populate("user"), req.query).search().filter().pagenation(12)
    const products = await features.query.exec();
    const { page } = req.query
    res.status(200).json({
        success: true,
        currentPage: page || 1,
        results: productsLength.length,
        data: products
    });
})
module.exports.createNewProduct = wrapAysnc(async (req, res) => {
    const user = await User.findById(req.user._id)
    const newProduct = new product({ ...req.body, user })
    user.product.push(newProduct)
    await newProduct.save()
    await user.save()
    res.status(200).json({
        message: "success",
        data: newProduct
    })
})

module.exports.updateProduct = wrapAysnc(async (req, res) => {
    const { _id } = req.params
    const updatedProduct = await product.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    res.status(200).json({
        success: true,
        data: updatedProduct
    })
})
module.exports.deleteProduct = wrapAysnc(async (req, res) => {
    const { _id } = req.params
    const updatedProduct = await product.findOneAndDelete({ _id: _id })
    const user = await User.findByIdAndUpdate(req.user._id, { $pull: { product: _id } })
    res.status(200).json({
        success: true,
        data: updatedProduct
    })
})

module.exports.getSingleProduct = wrapAysnc(async (req, res) => {
    const { _id } = req.params
    const singleProduct = await product.findById(_id).populate("review").populate({ path: "review", populate: { path: "user" } })

    res.status(200).json({
        success: true,
        data: singleProduct
    })
})