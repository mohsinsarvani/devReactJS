const functions = require('firebase-functions');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const request = require('request-promise');
const parse = require('xml2js').parseString;
const envs = require('./envs');

// Automatically allow cross-origin requests.
app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define constants.
const email = envs.PAGSEGURO_EMAIL;
const token = envs.PAGSEGURO_TOKEN;
const checkoutUrl = envs.PAGSEGURO_URI;
const paymentUrl = checkoutUrl + '/payment.html?code=';

// Define routes.
app.get('/', (req, res, next) => {
  res.send('BoraAjudar Server!');
});

app.post('/donate', (req, res, next) => {
  const form = {
    token,
    email,
    currency: 'BRL',
    itemId1: 'campaignId',
    itemDescription1: 'Donation',
    itemQuantity1: 1,
    itemAmount1: 2.53,
  }
  
  const headers = {
    'Content-Type': 'application/x-www-urlencoded; charset=UTF-8'
  }

  request({
    uri: checkoutUrl,
    method: 'POST',
    form,
    headers
  })
  .then(data => {
    parse(data, (err, json) => {
      res.send({
        url: paymentUrl + json.checkout.code[0]
      });
    });
  });
});

exports.api = functions.https.onRequest(app);
