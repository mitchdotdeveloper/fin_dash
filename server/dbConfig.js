const MongoClient = require('mongodb').MongoClient;
const Id = require('mongodb').ObjectID;
let mongo = null;

const connect = cb => {
  if ( !mongo ) {
    MongoClient.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(client => {
        mongo = client;
        cb();
      })
      .catch(err => console.error(err));
  }
};

const get = dbName => {
  if ( mongo ) return mongo.db(dbName);
};

const close = () => {
  if ( mongo ) mongo.close();
};

module.exports = {
  connect,
  get,
  close,
  Id
};
