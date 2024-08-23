const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController")
const passport = require("passport")
const { isLoggedIn, isAdmin } = require("../middleware")
const { storage } = require("../config/clodinary")
const multer = require("multer")
const upload = multer({ storage });

router.route("/register")
    .post(upload.array('avatar'), userController.register)

router.route("/login")
    .post(userController.authenticateUser, userController.login)

router.route("/logout")
    .post(isLoggedIn, userController.logout)

router.route("/password/forgot")
    .post(userController.createPasswordToken)

router.route("/password/forgot/:token")
    .put(userController.resetPassword)

router.route("/password/update/:_id")
    .put(isLoggedIn, userController.updatePassword)

router.route("/user")
    .get(isLoggedIn, userController.profile)
    .put(isLoggedIn, upload.array('avatar'), userController.updateUser)
    .delete(isLoggedIn, userController.deleteUser)

router.route("/user/address")
    .post(isLoggedIn, userController.addAddress)
router.route("/user/address/:_id")
    .put(isLoggedIn, userController.updateAddress)
    .delete(isLoggedIn, userController.removeAddress)
module.exports = router