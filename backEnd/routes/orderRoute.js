const express = require("express")
const orderController = require("../controllers/orderController")
const { isLoggedIn } = require("../middleware")

const router = express.Router()

router.route("/order/new")
    .post(isLoggedIn, orderController.createOrder)

router.route("/orders")
    .get(isLoggedIn, orderController.AllUserOrders)

router.route("/order/:_id")
    .get(isLoggedIn,orderController.isUsersOrder, orderController.getSingleOrder)
    .put(isLoggedIn,orderController.isUsersOrder, orderController.updateOrder)
    .delete(isLoggedIn,orderController.isUsersOrder, orderController.deleteOrder)


module.exports = router