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

/**
 * { accounts:
   [ { account_id: 'xyBayP7GPptxdx7lWWaZsqeQwwqRR6snawPzm',
       balances: [Object],
       mask: '0000',
       name: 'Plaid Checking',
       official_name: 'Plaid Gold Standard 0% Interest Checking',
       subtype: 'checking',
       type: 'depository' },
     { account_id: 'dBdoBp5kpqiEgE9dPPXVS1jaLL1bboCZ1NzbP',
       balances: [Object],
       mask: '1111',
       name: 'Plaid Saving',
       official_name: 'Plaid Silver Standard 0.1% Interest Saving',
       subtype: 'savings',
       type: 'depository' },
     { account_id: 'aKd1KM58MwClwlgZDDrVimBbzzm66Dc7m4JE7',
       balances: [Object],
       mask: '2222',
       name: 'Plaid CD',
       official_name: 'Plaid Bronze Standard 0.2% Interest CD',
       subtype: 'cd',
       type: 'depository' },
     { account_id: '4DvxDKozKXfGbGKkAA3XTGgneeGwwvcdy5VvJ',
       balances: [Object],
       mask: '3333',
       name: 'Plaid Credit Card',
       official_name: 'Plaid Diamond 12.5% APR Interest Credit Card',
       subtype: 'credit card',
       type: 'credit' },
     { account_id: 'N6wl6G5BGpFnknJMRR1buwq633w11pSWJZpGX',
       balances: [Object],
       mask: '4444',
       name: 'Plaid Money Market',
       official_name: 'Plaid Platinum Standard 1.85% Interest Money Market',
       subtype: 'money market',
       type: 'depository' },
     { account_id: 'P6eK6q5xqgFexemZQQKyTg9VZZgyypC7ld5eQ',
       balances: [Object],
       mask: '5555',
       name: 'Plaid IRA',
       official_name: null,
       subtype: 'ira',
       type: 'investment' },
     { account_id: 'jNZGNAl9AxFdzdnkooavSDV399D55AC1g4m7G',
       balances: [Object],
       mask: '6666',
       name: 'Plaid 401k',
       official_name: null,
       subtype: '401k',
       type: 'investment' },
     { account_id: '7mQ4mBExBwI5M5nbyyL4SyJvWWy11BcgkQy5j',
       balances: [Object],
       mask: '7777',
       name: 'Plaid Student Loan',
       official_name: null,
       subtype: 'student',
       type: 'loan' } ],
  item:
   { available_products:
      [ 'assets',
        'balance',
        'credit_details',
        'identity',
        'income',
        'liabilities' ],
     billed_products: [ 'auth', 'transactions' ],
     consent_expiration_time: null,
     error: null,
     institution_id: 'ins_1',
     item_id: 'D6Rg6M5LMNFXqXM3AA64cMVBkayyQ1cv81xjz',
     webhook: '' },
  numbers:
   { ach: [ [Object], [Object] ],
     bacs: [],
     eft: [],
     international: [] },
  request_id: '9Vk8wh8vaRqF71e',
  status_code: 200 }
 */

/**
 * CommandResult {
  result: { n: 1, ok: 1 },
  connection:
   Connection {
     _events:
      [Object: null prototype] {
        commandStarted: [Function],
        commandFailed: [Function],
        commandSucceeded: [Function],
        clusterTimeReceived: [Function] },
     _eventsCount: 4,
     _maxListeners: undefined,
     id: 1,
     address: '127.0.0.1:27017',
     bson: BSON {},
     socketTimeout: 360000,
     monitorCommands: false,
     closed: false,
     destroyed: false,
     lastIsMasterMS: 2,
     [Symbol(description)]:
      StreamDescription {
        address: '127.0.0.1:27017',
        type: 'Standalone',
        minWireVersion: 0,
        maxWireVersion: 8,
        maxBsonObjectSize: 16777216,
        maxMessageSizeBytes: 48000000,
        maxWriteBatchSize: 100000,
        compressors: [] },
     [Symbol(generation)]: 0,
     [Symbol(lastUseTime)]: 1580237429961,
     [Symbol(queue)]: Map {},
     [Symbol(messageStream)]:
      MessageStream {
        _readableState: [ReadableState],
        readable: true,
        _events: [Object],
        _eventsCount: 8,
        _maxListeners: undefined,
        _writableState: [WritableState],
        writable: true,
        allowHalfOpen: true,
        bson: BSON {},
        maxBsonMessageSize: 67108864,
        [Symbol(buffer)]: [BufferList] },
     [Symbol(stream)]:
      Socket {
        connecting: false,
        _hadError: false,
        _handle: [TCP],
        _parent: null,
        _host: 'localhost',
        _readableState: [ReadableState],
        readable: true,
        _events: [Object],
        _eventsCount: 8,
        _maxListeners: undefined,
        _writableState: [WritableState],
        writable: true,
        allowHalfOpen: false,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: null,
        _server: null,
        timeout: 360000,
        _peername: [Object],
        [Symbol(asyncId)]: 881,
        [Symbol(lastWriteQueueSize)]: 0,
        [Symbol(timeout)]:
         Timeout {
           _called: false,
           _idleTimeout: 360000,
           _idlePrev: [TimersList],
           _idleNext: [Timeout],
           _idleStart: 30489,
           _onTimeout: [Function: bound ],
           _timerArgs: undefined,
           _repeat: null,
           _destroyed: false,
           [Symbol(unrefed)]: true,
           [Symbol(asyncId)]: 893,
           [Symbol(triggerId)]: 881 },
        [Symbol(kBytesRead)]: 0,
        [Symbol(kBytesWritten)]: 0 },
     [Symbol(ismaster)]:
      { ismaster: true,
        maxBsonObjectSize: 16777216,
        maxMessageSizeBytes: 48000000,
        maxWriteBatchSize: 100000,
        localTime: 2020-01-28T18:50:10.540Z,
        logicalSessionTimeoutMinutes: 30,
        connectionId: 360,
        minWireVersion: 0,
        maxWireVersion: 8,
        readOnly: false,
        ok: 1 } },
  message:
   BinMsg {
     parsed: true,
     raw:
      <Buffer 2d 00 00 00 e6 1a 00 00 04 00 00 00 dd 07 00 00 00 00 00 00 00 18 00 00 00 10 6e 00 01 00 00 00 01 6f 6b 00 00 00 00 00 00 00 f0 3f 00>,
     data:
      <Buffer 00 00 00 00 00 18 00 00 00 10 6e 00 01 00 00 00 01 6f 6b 00 00 00 00 00 00 00 f0 3f 00>,
     bson: BSON {},
     opts:
      { promoteLongs: true,
        promoteValues: true,
        promoteBuffers: false },
     length: 45,
     requestId: 6886,
     responseTo: 4,
     opCode: 2013,
     fromCompressed: undefined,
     responseFlags: 0,
     checksumPresent: false,
     moreToCome: false,
     exhaustAllowed: false,
     promoteLongs: true,
     promoteValues: true,
     promoteBuffers: false,
     documents: [ [Object] ],
     index: 29 },
  ops:
   [ { accounts: [Array],
       item: [Object],
       numbers: [Object],
       request_id: '9BhiAZEH3o4oyXF',
       status_code: 200,
       name: 'PNC',
       color: '#0069aa',
       _id: 5e3082759f5a820c6dd0a1c3 } ],
  insertedCount: 1,
  insertedId: 5e3082759f5a820c6dd0a1c3 }
 */

// Accept the public_token sent from Link
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
    .then(data => console.log(data))
    .catch(err => console.error(err));
});

router.post('/accounts', async (req, res) => {
  let accounts = await db('fin_dash').collection('accounts').find({"_id": { "$in" : req.body.accounts.map(acc => new id(acc))}});
  accounts.toArray()
    .then(data => res.status(200).json({ accounts: data }))
    .catch(err => console.error(err));
});

// // Send back account information
// router.post('/accounts/get', (req, res) => {
//   plaidClient.getAccounts(req.body.access_token, (err, result) => {
//     if (err != null) {
//       console.log('Could not get accounts!\n' + err);
//       return res.json({ err: err });
//     }
//     console.log('Accounts:' + result.accounts);
//     return res.json({ accounts: result.accounts });
//   });
// });

module.exports = router;
