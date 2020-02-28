const db = require('./dbConfig').get;
const id = require('./dbConfig').Id;
const express = require('express');
const finRoute = express.Router();

finRoute.get('/accounts', async (req, res) => {
  let accounts = [];
  while ( req.query[accounts.length] ) {
    accounts.push( new id(req.query[accounts.length]) );
  }
  accounts = await db('fin_dash').collection('accounts').find({ "_id": { "$in": accounts } });
  accounts.toArray()
    .then(data => {
      console.log(data);
      res.status(200).json({ accounts: data }).end();
    })
    .catch(err => console.error(err));
});

module.exports = finRoute;
