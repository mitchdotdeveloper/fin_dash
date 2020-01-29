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
