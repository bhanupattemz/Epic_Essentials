const express = require("express")
const router = express.Router();
const productcontroller = require("../controllers/productController")
const {isProductIn,isAdmin}=require('../middleware')

router.route("/products")
    .get(productcontroller.getAllProducts)
    .post(isAdmin,isProductIn,productcontroller.createNewProduct)
router.route("/products/:_id")
    .get(productcontroller.getSingleProduct)
    .patch(isAdmin,isProductIn,productcontroller.updateProduct)
    .delete(isAdmin,isProductIn,productcontroller.deleteProduct)

module.exports = router