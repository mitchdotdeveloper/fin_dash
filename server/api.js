const plaid = require('plaid');
const db = require('./db').get;
const id = require('./db').Id;
const objId = require('./db');
const express = require('express');
const router = express.Router();

const plaidClient = new plaid.Client(process.env.CLIENT_ID,
                                     process.env.SANDBOX_SECRET,
                                     process.env.PUBLIC_KEY,
                                     plaid.environments['sandbox']);

router.get('/', (req, res) => {
  return res.status(200).json({ public_key: process.env.PUBLIC_KEY });
});

router.post('/get_access_token', async (req, res) => {
  let accounts = await plaidClient.exchangePublicToken(req.body.public_token)
    .then(tokenResponse => plaidClient.getAuth(tokenResponse.access_token))
    .then(data => data)
    .catch(err => console.error(err));

  let institution = await plaidClient.getInstitutionById(accounts.item.institution_id, {include_optional_metadata: true})
    .then(data => {return { name: data.institution.name, color: data.institution.primary_color }})
    .catch(err => console.error(err));

  db('fin_dash').collection('accounts').insertOne({...accounts, ...institution})
    .then(res => db('fin_dash').collection('users').findOneAndUpdate({ email: req.body.email }, { $push: { "accounts": new id(res.insertedId) } }) )
    .then(data => res.status(200).json({ error: null }).end())
    .catch(err => console.error(err));
});

router.post('/accounts', async (req, res) => {
  let accounts = await db('fin_dash').collection('accounts').find({"_id": { "$in" : req.body.accounts.map(acc => new id(acc))}});
  accounts.toArray()
    .then(data => res.status(200).json({ accounts: data }).end())
    .catch(err => console.error(err));
});

module.exports = router;
