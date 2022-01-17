const { Router } = require('express');

const redirect_url = process.env['REDIRECT_URL'] + '/dashboard/product/payment';

const sk = process.env['STRIPE_SK'];
const stripe = require('stripe')(sk);

const connectRouter = Router();

connectRouter.post('/create', async (req, res) => {
  const userid = req.body['userid'];
  const email = req.body['useremail'];

  if ([userid, email].map((val) => typeof val).includes('undefined'))
    return res.status(400).send({
      message: 'All data not provided',
    });

  const connectedAccount = await stripe.accounts.create({
    type: 'express',
    country: 'GB',
    email: email,
  });

  const connectedAccountLink = await stripe.accountLinks.create({
    account: connectedAccount.id,
    refresh_url: `${redirect_url}/refresh?si=${userid}`,
    return_url: `${redirect_url}/connect?si=${connectedAccount.id}&ai=${userid}`,
    type: 'account_onboarding',
  });

  res.redirect(303, connectedAccountLink.url);
});

module.exports = connectRouter;
