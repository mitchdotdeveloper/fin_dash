const crypto = require('crypto');
const db = require('./db').get;
const express = require('express');
const router = express.Router();

const userExists = email => {
  return db('fin_dash').collection('users').countDocuments({ email }, { limit: 1 })
    .then(count => count === 1)
    .catch(err => console.error(err));
};

const authenticate = async (email, password) => {
  let user = await db('fin_dash').collection('users').findOne({ email })
               .then(user => user)
               .catch(err => console.error(err.message));
  let response = { user, authenticated: false };

  if ( user !== null ) {
    let key = crypto.scryptSync(password, user.salt, 64).toString('hex');
    response.authenticated = key === user.password;
  }
  if ( !response.authenticated ) {
    response.message = 'email and/or password is incorrect';
  }
  return response;
};

router.post('/sign-in', async (req, res) => {
  let { email, password } = req.body;
  let response = await authenticate(email, password);
  res.send(JSON.stringify(response)).end();
});

router.post('/sign-up', async (req, res) => {
  let user = req.body;
  if ( await userExists(user.email) ) {
    res.send(JSON.stringify({authenticated: false, message: 'an account with this email is already in user'})).end();
  } else {
    let pass = user.password;
    user.salt = crypto.randomBytes(32).toString('hex');
    user.password = crypto.scryptSync(user.password, user.salt, 64).toString('hex');
    db('fin_dash').collection('users').insertOne(user, async (err, result) => {
      if ( err !== null ) {
        res.status(500).send('couldn\'t create user : ', err.message).end();
      } else {
        res.status(200).send(JSON.stringify(await authenticate(user.email, pass))).end();
      }
    });
  }
});

module.exports = router;
