const dbConnection = require('./db').connect;
const cors = require('cors');
const express = require('express');

const app = express();

// router modules
const api = require('./api');
const auth = require('./auth');

// middleware
app.use(cors());
app.use(express.json());

app.use('/api', api);
app.use('/auth', auth);

dbConnection(() => app.listen(process.env.PORT || 5001));

// const PLAID_PRODUCTS = 'auth,transactions,balance,identity';
// const PLAID_COUNTRY_CODES = 'US';


// const bodyParser = require('body-parser');
// const express = require('express');
// const plaid = require('plaid');
// const cors = require('cors');

// const plaidClient = new plaid.Client(process.env.CLIENT_ID,
//                                      process.env.SANDBOX_SECRET,
//                                      process.env.PUBLIC_KEY,
//                                      plaid.environments['sandbox']);

// let PUBLIC_TOKEN = '';
// let ACCESS_TOKEN = '';

// const app = express();
// app.use(cors());
// app.use(express.static(__dirname + '../public'));
// app.use(express.json());
// app.listen(process.env.PORT || 5002);

// app.get('/', (request, response) => {
//   return response.json({ public_key: process.env.PUBLIC_KEY });
// });

// // Accept the public_token sent from Link
// app.post('/get_access_token', (request, response) => {
//   PUBLIC_TOKEN = request.body.public_token;
//   plaidClient.exchangePublicToken(PUBLIC_TOKEN, (error, tokenResponse) => {
//     if (error != null) {
//       console.log('Could not exchange public_token!\n' + error);
//       return response.json({ 'error': error });
//     }
//     ACCESS_TOKEN = tokenResponse.access_token;
//     let ITEM_ID = tokenResponse.item_id;
//     console.log('Access Token: ' + ACCESS_TOKEN);
//     console.log('Item ID: ' + ITEM_ID);
//     response.json({ 'error': null });
//   });
// });

// // Send back item information
// app.post('/item/get', (request, response) => {
//   plaidClient.getItem(ACCESS_TOKEN, (err, result) => {
//     if (err != null) {
//       console.log('Could not retrieve item!\n' + err);
//       return response.json({ err: err });
//     }
//     return response.json({ item: result.item });
//   });
// });

// // Send back account information
// app.post('/accounts/get', (request, response) => {
//   plaidClient.getAccounts(ACCESS_TOKEN, (err, result) => {
//     if (err != null) {
//       console.log('Could not get accounts!\n' + err);
//       return response.json({ err: err });
//     }

//     return response.json({ accounts: result.accounts });
//   });
// });

// // Send back balance information on account(s)
// app.post('/accounts/balance/get', (request, response) => {
//   plaidClient.getBalance(ACCESS_TOKEN, (err, result) => {
//     if (err != null) {
//       console.log('Could not get balance!\n' + err);
//       return response.json({ err: err });
//     }
//     return response.json({ accounts: result.accounts });
//   });
// });

// // Send back transactional information on account(s)
// app.post('/transactions/get', (request, response) => {
//   plaidClient.getTransactions(ACCESS_TOKEN, '2019-01-19', '2019-04-27', {
//     count: 10,
//     offset: 0
//   }, (err, result) => {
//     if (err != null) {
//       console.log('Could not get balance!\n' + err);
//       return response.json({ err: err });
//     }
//     return response.json({ data: result });
//   });
// });

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
