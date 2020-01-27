const plaid = require('plaid');
const express = require('express');
const router = express.Router();

const plaidClient = new plaid.Client(process.env.CLIENT_ID,
                                     process.env.SANDBOX_SECRET,
                                     process.env.PUBLIC_KEY,
                                     plaid.environments['sandbox']);

module.exports = router;
