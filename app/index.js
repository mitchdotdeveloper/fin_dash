const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const plaid = require('plaid');

const content = fs.readFileSync('../not_keys.json');
const credentials = JSON.parse(content);

const APP_PORT = 8000;
const PLAID_CLIENT_ID = credentials.client_id;
const PLAID_SECRET = credentials.sandbox_secret;
const PLAID_PUBLIC_KEY = credentials.public_key;
const PLAID_ENV = 'sandbox';

const PLAID_PRODUCTS = 'auth,transactions,balance,identity';
const PLAID_COUNTRY_CODES = 'US';

// Initialize client
const plaidClient = new plaid.Client(PLAID_CLIENT_ID,
                                     PLAID_SECRET,
                                     PLAID_PUBLIC_KEY,
                                     plaid.environments[PLAID_ENV]);
