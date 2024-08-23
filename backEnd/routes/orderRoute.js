const express = require("express")
const orderController = require("../controllers/orderController")
const { isLoggedIn,isAdmin } = require("../middleware")

const router = express.Router()

router.route("/order/new")
    .post(isLoggedIn, orderController.createOrder)

router.route("/orders")
    .get(isLoggedIn, orderController.AllUserOrders)

router.route("/order/:_id")
    .get(isLoggedIn,orderController.isUsersOrder, orderController.getSingleOrder)
    .put(isLoggedIn,isAdmin,orderController.isUsersOrder, orderController.updateOrder)
    .patch(isLoggedIn,orderController.isUsersOrder,orderController.cancelOrder)
    .delete(isLoggedIn,orderController.isUsersOrder, orderController.deleteOrder)


module.exports = router