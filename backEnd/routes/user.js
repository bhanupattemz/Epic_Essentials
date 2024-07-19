const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController")
const passport = require("passport")
const { isLoggedIn, isAdmin } = require("../middleware")

router.route("/register")
    .post(userController.register)

router.route("/login")
    .post(passport.authenticate("local", {failureRedirect: "/api/v1/products" }), userController.login)

router.route("/logout")
    .post(isLoggedIn, userController.logout)

router.route("/password/forgot")
    .post(isLoggedIn, userController.createPasswordToken)

router.route("/password/forgot/:token")
    .put(isLoggedIn, userController.resetPassword)

router.route("/password/update/:_id")
    .put(isLoggedIn, userController.updatePassword)

router.route("/user")
    .get(isLoggedIn, userController.profile)
    .put(isLoggedIn, userController.updateUser)
    .delete(isLoggedIn, userController.deleteUser)


module.exports = router