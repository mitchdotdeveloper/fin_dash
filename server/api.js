const plaid = require('plaid');
// const db = require('./db').get;
const express = require('express');
const router = express.Router();

const plaidClient = new plaid.Client(process.env.CLIENT_ID,
                                     process.env.SANDBOX_SECRET,
                                     process.env.PUBLIC_KEY,
                                     plaid.environments['sandbox']);

router.get('/', (req, res) => {
  return res.status(200).json({ public_key: process.env.PUBLIC_KEY });
});

// Accept the public_token sent from Link
router.post('/get_access_token', (request, response) => {
  plaidClient.exchangePublicToken(request.body.public_token, (error, tokenResponse) => {
    if (error != null) {
      console.log('Could not exchange public_token!\n' + error);
      return response.json({ 'error': error });
    }
    console.log('Access Token: ' + tokenResponse.access_token);
    console.log('Item ID: ' + tokenResponse.item_id);
    response.json({ 'error': null });
  });
});

// // Send back account information
// router.post('/accounts/get', (request, response) => {
//   plaidClient.getAccounts(ACCESS_TOKEN, (err, result) => {
//     if (err != null) {
//       console.log('Could not get accounts!\n' + err);
//       return response.json({ err: err });
//     }

//     return response.json({ accounts: result.accounts });
//   });
// });

module.exports = router;
