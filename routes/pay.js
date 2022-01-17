const { Router } = require('express');

// Gathering a redirect url
const redirect_url = process.env['REDIRECT_URL'];

// Creating a stripe instance
const sk = process.env['STRIPE_SK'];
const stripe = require('stripe')(sk);

// Create a router for payments
const payRouter = Router();

payRouter.post('/', async (req, res) => {
  const product_name = req.body['prod_name'];
  const unit_amount = req.body['unit_amount'];
  const quantity = req.body['quantity'];

  // Validate if required data is provided to create a payment
  if ([product_name, unit_amount, quantity].map((val) => typeof val).includes('undefined'))
    return res.status(400).send({
      message: 'All data not provided',
    });

  /**
   * Create a stripe session for dynamically processing price.
   */
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: product_name,
          },
          unit_amount: unit_amount * 1.2 * 100,
          // tax_rates: 'txr_1K1VnKHcAo9oqUk4LmlAsFUn'
        },
        quantity: quantity,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/dashboard/transaction/success',
    cancel_url: 'http://localhost:4242/cancel.html',
  });

  res.redirect(303, session.url);
});

module.exports = payRouter;
