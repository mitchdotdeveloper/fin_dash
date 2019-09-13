const fs = require('fs');
const bodyParser = require('body-parser');
var express = require('express');
const plaid = require('plaid');

var content = fs.readFileSync('../not_keys.json');
const credentials = JSON.parse(content);
console.log(credentials);

var APP_PORT = 8000;
var PLAID_CLIENT_ID = credentials.client_id;
var PLAID_SECRET = credentials.sandbox_secret;
var PLAID_PUBLIC_KEY = credentials.public_key;
var PLAID_ENV = 'sandbox';


// var APP_PORT = envvar.number('APP_PORT', 8000);
// var PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID');
// var PLAID_SECRET = envvar.string('PLAID_SECRET');
// var PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY');
// var PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox');

// // PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// // Link. Note that this list must contain 'assets' in order for the app to be
// // able to create and retrieve asset reports.
// var PLAID_PRODUCTS = envvar.string('PLAID_PRODUCTS', 'transactions');

// // PLAID_PRODUCTS is a comma-separated list of countries for which users
// // will be able to select institutions from.
// var PLAID_COUNTRY_CODES = envvar.string('PLAID_COUNTRY_CODES', 'US,CA,GB,FR,ES');
