// Possible endpoints

// Link - /item/public_token/exchange
//        /item/public_token/create
// https://plaid.com/docs/#integrating-with-link

// Item management - /accounts/get
//                   /item/get
//                   /item/webhook/update
//                   /item/access_token/invalidate
//                   /item/remove
// https://plaid.com/docs/#accounts

// Product access  - /auth/get
//                   /transactions/get
//                   /accounts/balance/get
//                   /identity/getsf
//                   /income/get
//                   /asset_report/get
//                   /asset_report/pdf/get
//                   /investments/holdings/get
//                   /investments/transactions/get
// https://plaid.com/docs/#auth

// Report management - /asset_report/create
//                     / asset_report/remove
//                     /asset_report/audit_copy/create
//                     /asset_report/audit_copy/remove
// https://plaid.com/docs/#asset-report-errors-and-warnings

// Institutions - /institutions/get
//                /institutions/get_by_id
//                /institutions/search
// https://plaid.com/docs/#institution-overview

// Categories - /categories/get
// https://plaid.com/docs/#category-overview

// const PLAID_PRODUCTS = 'auth,transactions,balance,identity';
// const PLAID_COUNTRY_CODES = 'US';

const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const plaid = require('plaid');

const connection = require('./mysql_credentials');

const content = fs.readFileSync('not_keys.json');
const credentials = JSON.parse(content);

const APP_PORT = 3000;
const PLAID_CLIENT_ID = credentials.client_id;
const PLAID_SECRET = credentials.sandbox_secret;
const PLAID_PUBLIC_KEY = credentials.public_key;
const PLAID_ENV = 'sandbox';

let PUBLIC_TOKEN = '';
let ACCESS_TOKEN = '';

// Initialize client
const plaidClient = new plaid.Client(PLAID_CLIENT_ID, PLAID_SECRET,
  PLAID_PUBLIC_KEY, plaid.environments[PLAID_ENV]);

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.listen(APP_PORT);

app.post('/', (request, response) => {
  return response.json({ public_key: PLAID_PUBLIC_KEY });
})

// Accept the public_token sent from Link
app.post('/get_access_token', (request, response) => {
  PUBLIC_TOKEN = request.body.public_token;
  plaidClient.exchangePublicToken(PUBLIC_TOKEN, (error, tokenResponse) => {
    if (error != null) {
      console.log('Could not exchange public_token!\n' + error);
      return response.json({ error: error });
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    let ITEM_ID = tokenResponse.item_id;
    // console.log('Access Token: ' + ACCESS_TOKEN);
    // console.log('Item ID: ' + ITEM_ID);
    response.json({ 'error': null });
  });
});

// Send back item information
app.post('/item/get', (request, response) => {
  plaidClient.getItem(ACCESS_TOKEN, (err, result) => {
    if (err != null) {
      console.log('Could not retrieve item!\n' + err);
      return response.json({ err: err });
    }

    return response.json({ item: result.item });
  });
});

// Send back account information
app.post('/accounts/get', (request, response) => {
  plaidClient.getAccounts(ACCESS_TOKEN, (err, result) => {
    if (err != null) {
      console.log('Could not get accounts!\n' + err);
      return response.json({ err: err });
    }

    return response.json({ accounts: result.accounts });
  });
});

// Send back balance information on account(s)
app.post('/accounts/balance/get', (request, response) => {
  plaidClient.getBalance(ACCESS_TOKEN, (err, result) => {
    if (err != null) {
      console.log('Could not get balance!\n' + err);
      return response.json({ err: err });
    }
    return response.json({ accounts: result.accounts });
  });
});

// Send back transactional information on account(s)
app.post('/transactions/get', (request, response) => {
  plaidClient.getTransactions(ACCESS_TOKEN, '2019-01-19', '2019-04-27', {
    count: 10,
    offset: 0
  }, (err, result) => {
    if (err != null) {
      console.log('Could not get balance!\n' + err);
      return response.json({ err: err });
    }
    return response.json({ data: result });
  });
});
