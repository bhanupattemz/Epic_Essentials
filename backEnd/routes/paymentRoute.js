const Express = require("express")
const Router = Express.Router()
const paymentController = require("../controllers/paymentController")
const { isLoggedIn } = require("../middleware")
Router.route("/stripe_api_key")
    .get(isLoggedIn, paymentController.getStripeApiKey)

Router.route("/process/payment")
    .post(isLoggedIn, paymentController.processPayment)

module.exports = Router