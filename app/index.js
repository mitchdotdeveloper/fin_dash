'use-strict'

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

var PLAID_PRODUCTS = 'auth,transactions,balance,identity';
var PLAID_COUNTRY_CODES = 'US';//,CA,GB,FR,ES';
