const dbConnection = require('./dbConfig').connect;
const cors = require('cors');
const express = require('express');

const app = express();

// router modules
const finApi = require('./finApi');
const plaidApi = require('./plaidApi');
const auth = require('./auth');

// middleware
app.use(cors());
app.use(express.json());

app.use('/api/fin', finApi);
app.use('/api/plaid', plaidApi);
app.use('/auth', auth);

dbConnection(() => app.listen(process.env.PORT || 5001));
