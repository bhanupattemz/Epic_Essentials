const express = require("express")
const router = express.Router();
const productcontroller = require("../controllers/productController")
const {isProductIn,isAdmin}=require('../middleware')
const { storage } = require("../config/clodinary")
const multer=require("multer")
const upload = multer({ storage });

router.route("/products")
    .get(productcontroller.getAllProducts)
    .post(isAdmin,isProductIn,upload.array("images"),productcontroller.createNewProduct)
router.route("/products/:_id")
    .get(productcontroller.getSingleProduct)
    .patch(isAdmin,isProductIn,upload.array("images"),productcontroller.updateProduct)
    .delete(isAdmin,isProductIn,productcontroller.deleteProduct)

module.exports = router