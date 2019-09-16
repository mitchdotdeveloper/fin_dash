const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const plaid = require('plaid');

const content = fs.readFileSync('./not_keys.json');
const credentials = JSON.parse(content);

const APP_PORT = 8000;
const PLAID_CLIENT_ID = credentials.client_id;
const PLAID_SECRET = credentials.sandbox_secret;
const PLAID_PUBLIC_KEY = credentials.public_key;
const PLAID_ENV = 'sandbox';

// const PLAID_PRODUCTS = 'auth,transactions,balance,identity';
// const PLAID_COUNTRY_CODES = 'US';

var PUBLIC_TOKEN = '';
var ACCESS_TOKEN = '';

// Initialize client
const plaidClient = new plaid.Client(PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]);

const app = express();
app.use(express.static(__dirname + '/client/public'));
app.listen(APP_PORT);
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Accept the public_token sent from Link
app.post('/get_access_token', function (request, response) {
  PUBLIC_TOKEN = request.body.public_token;
  plaidClient.exchangePublicToken(PUBLIC_TOKEN, function (error,
    tokenResponse) {
    if (error != null) {
      console.log('Could not exchange public_token!\n' + error);
      return response.json({ error: error });
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    var ITEM_ID = tokenResponse.item_id;
    console.log('Access Token: ' + ACCESS_TOKEN);
    console.log('Item ID: ' + ITEM_ID);
    response.json({ 'error': null });
  });
});
