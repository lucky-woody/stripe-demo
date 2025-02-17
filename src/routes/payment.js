// payment related endpoints
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create a Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  try {
    // e.g., item data might come from the frontend or your DB
    // Hard-coded example: $20.00 (in cents => 2000)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Example Product' },
            unit_amount: 2000, // 2000 cents = $20.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',  // or your domain
      cancel_url: 'http://localhost:3000/cancel',
    });

    // Return the session ID or URL to the client
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;