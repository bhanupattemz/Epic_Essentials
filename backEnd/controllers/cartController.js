const ExpressError = require("../utils/ExpressError")
const wrapAsync = require("../utils/wrapAysnc")
const mongoose = require("mongoose")
const Cart = require("../models/cartModel")
const Product = require("../models/productModel")

module.exports.cartProducts = wrapAsync(async (req, res) => {
    const cartitems = await Cart.findOne({ user: req.user._id })
        .populate('products.product');
    if (!cartitems) {
       return  res.status(200).json({
            success: null,
            products: [],
            price: 0,
            gst: 0,
            discount:0,
            delivery:0,
            total: 0
        });
    }
    if (!cartitems) {
        throw new ExpressError('Cart not found', 404);
    }

    res.status(200).json({
        success: null,
        products: cartitems.products,
        price: cartitems.price,
        gst: cartitems.gst,
        discount: cartitems.discount,
        delivery: cartitems.delivery,
        total: cartitems.totalAmount
    });

});
module.exports.addProduct = wrapAsync(async (req, res) => {
    const { _id } = req.params;
    const { quantity } = req.body || 1;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        cart = new Cart({ user: req.user._id, products: [] });
    }
    const product = await Product.findById(_id);
    if (!product) {
        throw new ExpressError('Product not found', 404);
    }
    const productInCart = cart.products.find(item => item.product == _id);
    cart.price = cart.price + product.price * quantity
    cart.gst = cart.price * 0.18
    cart.delivery = cart.price > 1000 ? 0 : 40;
    cart.discount = cart.price > 10000 ? 5 : 0;
    cart.totalAmount = cart.price + cart.gst + cart.delivery - (cart.discount * cart.price / 100);
    if (!productInCart) {
        cart.products.push({ product: _id, quantity });
    } else {
        productInCart.quantity += quantity;
    }
    await cart.save();
    res.status(200).json({
        success: productInCart ? "change quantity of product" : "new product add to cart",
        products: cart.products,
        price: cart.price,
        gst: cart.gst,
        discount: cart.discount,
        delivery: cart.delivery,
        totalAmount: cart.totalAmount,
    });
});

module.exports.deleteProduct = wrapAsync(async (req, res) => {
    let cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
    const { _id } = req.params;
    const product = cart.products.filter((product) => product._id == _id)
    cart.products = cart.products.filter((product) => product._id != _id)
    cart.price = cart.price - product[0].product.price * product[0].quantity;
    cart.gst = cart.price * 0.18
    cart.delivery = cart.price > 1000 ? 0 : 40;
    cart.discount = cart.price > 10000 ? 5 : 0;
    await cart.save();
    res.status(200).json({
        success: "product removed from cart",
        products: cart.products,
        price: cart.price,
        gst: cart.gst,
        discount: cart.discount,
        delivery: cart.delivery,
        totalAmount: cart.totalAmount,
    });
})

module.exports.deleteallcartProducts = wrapAsync(async (req, res) => {
    const removedcartproducts = await Cart.findOneAndDelete({ user: req.user._id })
    res.status(200).json({
        success: null,
        products: [],
        price: 0,
        gst: 0,
        discount:0,
        delivery:0,
        total: 0
    });
})