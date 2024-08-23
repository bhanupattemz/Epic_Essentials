const express = require("express")
const router = express.Router();
const cartController = require("../controllers/cartController")
const {isLoggedIn}=require("../middleware")
router.route("/cart")
    .get(isLoggedIn,cartController.cartProducts)
    .delete(isLoggedIn,cartController.deleteallcartProducts)
    
router.route("/cart/:_id")
    .post(isLoggedIn,cartController.addProduct)
    .delete(isLoggedIn,cartController.deleteProduct)
module.exports = router