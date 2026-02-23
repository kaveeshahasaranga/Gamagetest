const Stripe = require('stripe');
const Order = require('../models/Order');

// @desc    Create Stripe PaymentIntent
// @route   POST /api/payment/create-payment-intent
// @access  Private
exports.createPaymentIntent = async (req, res) => {
    try {
        const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
        const { orderId } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Stripe expects amount in cents
        const amount = Math.round(order.totalPrice * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.error("Stripe Error: ", error);
        res.status(500).json({ message: error.message });
    }
};
