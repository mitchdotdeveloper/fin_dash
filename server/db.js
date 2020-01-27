const MongoClient = require('mongodb').MongoClient;
let mongo;

const connect = callback => {
  MongoClient.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(client => {
      mongo = client;
      callback();
    })
    .catch(err => console.error(err));
};

const get = dbName => mongo.db(dbName);

const close = () => mongo.close();

module.exports = {
  connect,
  get,
  close
};
