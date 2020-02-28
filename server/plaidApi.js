const plaid = require('plaid');
const db = require('./dbConfig').get;
const id = require('./dbConfig').Id;
const express = require('express');
const plaidRoute = express.Router();

const plaidClient = new plaid.Client(
  process.env.CLIENT_ID,
  process.env.SANDBOX_SECRET,
  process.env.PUBLIC_KEY,
  plaid.environments['sandbox']
);

plaidRoute.get('/public_key', (req, res) => {
  process.env.PUBLIC_KEY
    ? res.status(200).json({ public_key: process.env.PUBLIC_KEY }).end()
    : res.status(500).json('no public key provided').end();
});

plaidRoute.post('/add-institution', async (req, res) => {
  let token = { access_token: '', item_id: '' };
  let accounts = await plaidClient.exchangePublicToken(req.body.public_token)
    .then(tokenResponse => {
      token.access_token = tokenResponse.access_token;
      token.item_id = tokenResponse.item_id;
      return plaidClient.getAuth(tokenResponse.access_token);
    })
    .catch(err => console.error(err));

  let institution = await plaidClient.getInstitutionById(accounts.item.institution_id, { include_optional_metadata: true })
    .then(data => { return { name: data.institution.name, color: data.institution.primary_color } })
    .catch(err => console.error(err));

  db('fin_dash').collection('accounts').insertOne({ ...accounts, ...institution, ...token })
    .then(res => db('fin_dash').collection('users').findOneAndUpdate({ email: req.body.email }, { $push: { "accounts": new id(res.insertedId) } }))
    .then(_ => res.status(200).send({ accounts: {'_id': res.insertedId, ...accounts, ...institution, ...token} }).end())
    .catch(err => console.error(err));
});

plaidRoute.post('/transactions', (req, res) => {
  const currDate = new Date();
  let dd = currDate.getDate();
  let mm = currDate.getMonth();
  let yyyy = currDate.getFullYear();

  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;

  let start_date = (yyyy - 1) + '-' + mm + '-' + dd;
  let end_date = yyyy + '-' + mm + '-' + dd;

  plaidClient.getTransactions(req.body.access_token, start_date, end_date, { count: 20 })
    .then(data => res.status(200).json(data).end())
    .catch(err => console.error(err));

});

module.exports = plaidRoute;
