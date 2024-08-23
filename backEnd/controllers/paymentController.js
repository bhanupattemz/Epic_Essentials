const wrapAsync = require("../utils/wrapAysnc");
const ExpressError = require("../utils/ExpressError");
require('dotenv').config({ path: "./backEnd/config/.env" });
const Stripe = require("stripe")(process.env.STRIPE_SECRET_key);

module.exports.getStripeApiKey = wrapAsync(async (req, res) => {
    res.status(200).json({
        success: true,
        api_key: process.env.STRIPE_API_KEY
    });
});


module.exports.processPayment = wrapAsync(async (req, res) => {
    const { amount } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
        throw new ExpressError("Invalid amount specified.", 400);
    }

    try {
        const paymentIntent = await Stripe.paymentIntents.create({
            amount,
            currency: 'inr',
            payment_method_types: ['card'],
            description: 'Purchase Description',
            metadata: { integration_check: 'accept_a_payment' }
        });

        res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error("Stripe error:", error.message);
        res.status(500).json({
            success: false,
            message: "Payment processing failed. Please try again later.",
            error: error.message
        });
    }
});