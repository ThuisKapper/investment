const functions = require('firebase-functions');
const cors = require('cors')({ origin: '*' });

const { Client, Webhook, resources } = require('coinbase-commerce-node');
const coinbaseSecret = '75082fda-a5ea-422b-8127-d8eb4cc7b2c4';
Client.init(coinbaseSecret);

const { Charge } = resources;

exports.createCharge = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // TODO get real product data from database

    const chargeData = {
      name: 'Widget',
      description: 'Useless widget created by Fireship',
      local_price: {
        amount: 9.99,
        currency: 'USD',
      },
      pricing_type: 'fixed_price',
      metadata: {
        user: 'jeffd23',
      },
    };

    const charge = await Charge.create(chargeData);
    console.log(charge);

    res.send(charge);
  });
});

exports.webhookHandler = functions.https.onRequest(async (req, res) => {
  const rawBody = req.rawBody;
  const signature = req.headers['x-cc-webhook-signature'];
  const webhookSecret = '11b697f6-d972-44cc-9d8a-17e5440a588d';

  try {
    const event = Webhook.verifyEventBody(rawBody, signature, webhookSecret);

    if (event.type === 'charge:pending') {
      // TODO
      // user paid, but transaction not confirm on blockchain yet
    }

    if (event.type === 'charge:confirmed') {
      // TODO
      // all good, charge confirmed
    }

    if (event.type === 'charge:failed') {
      // TODO
      // charge failed or expired
    }

    res.send(`success ${event.id}`);

  } catch (error) {
    functions.logger.error(error);
    res.status(400).send('failure!');
  }
});
