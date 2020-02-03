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

plaidRoute.post('/get_access_token', async (req, res) => {
  let token = { access_token: '', item_id: '' };
  let accounts = await plaidClient.exchangePublicToken(req.body.public_token)
    .then(tokenResponse => {
      token.access_token = tokenResponse.access_token;
      token.item_id = tokenResponse.item_id;
      return plaidClient.getAuth(tokenResponse.access_token);
    })
    .then(_ => _)
    .catch(err => console.error(err));

  let institution = await plaidClient.getInstitutionById(accounts.item.institution_id, { include_optional_metadata: true })
    .then(data => { return { name: data.institution.name, color: data.institution.primary_color } })
    .catch(err => console.error(err));

  db('fin_dash').collection('accounts').insertOne({ ...accounts, ...institution, ...token })
    .then(res => db('fin_dash').collection('users').findOneAndUpdate({ email: req.body.email }, { $push: { "accounts": new id(res.insertedId) } }))
    .then(_ => res.status(200).send().end())
    .catch(err => console.error(err));
});

module.exports = plaidRoute;
