const product = require("../models/productModel")
const wrapAysnc = require("../utils/wrapAysnc")
const ApiFeatures = require("../Features/apiFeatures")
const User = require("../models/userModel")
const ExpressError = require("../utils/ExpressError")
const { cloudinary } = require("../config/clodinary")

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
    const data = req.body
    data.images = req.files.map(f => ({ public_id: f.filename, url: f.path }));
    if(data.specifications){
        data.specifications = JSON.parse(data.specifications)
    }
    const newProduct = new product({ ...data, user })
    user.product.push(newProduct)
    await newProduct.save()
    await user.save()
    const products = await product.find()
    res.status(200).json({
        message: "success",
        data: products
    })
})
module.exports.updateProduct = wrapAysnc(async (req, res) => {
    const { _id } = req.params;
    const data = req.body;
    const delImages = req.body.delImages;
    const productToupdate = await product.findById(_id)
    let tempimage = []
    data.images = req.files ? req.files.map(f => ({ public_id: f.filename, url: f.path })) : [];
    if(data.specifications){
        data.specifications = JSON.parse(data.specifications)
    }
    if (Array.isArray(delImages)) {
        const delImagesSet = new Set(delImages);
        console.log("data IMages", data.images)
        tempimage = productToupdate.images.filter(img => !delImagesSet.has(img.public_id));
        console.log("temp images", tempimage)
        for (let img of delImages) {
            await cloudinary.uploader.destroy(img)
        }
    } else if (delImages && delImages !== "") {
        const delImagesSet = new Set([delImages]);
        tempimage = productToupdate.images.filter(img => !delImagesSet.has(img.public_id));
        await cloudinary.uploader.destroy(delImages)
    }
    data.images = data.images.concat(tempimage)
    console.log("final images", data.images)
    const updatedProduct = await product.findByIdAndUpdate(_id, data, { runValidators: true, new: true })
    const products = await product.find()
    res.status(200).json(
        {
            success: true,
            data: products
        }
    )
});

module.exports.deleteProduct = wrapAysnc(async (req, res) => {
    const { _id } = req.params
    const updatedProduct = await product.findOneAndDelete({ _id: _id })
    const user = await User.findByIdAndUpdate(req.user._id, { $pull: { product: _id } })
    const products = await product.find()
    res.status(200).json({
        success: true,
        data: products
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

module.exports.adminGetAllProducts = wrapAysnc(async (req, res) => {
    const products = await product.find({})
    res.status(200).json({
        success: true,
        currentPage: 1,
        results: products.length,
        data: products
    });
})