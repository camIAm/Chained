require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))

const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_DATABASE)

db
  .createIndex({
  index: {
    fields: ['userName']
  }
})
  .then(() => {
    console.log('Created an index on the userName field.')
  })
  .catch(err => console.log(err));

db
  .createIndex({
  index: {
    fields: ['sender']
  }
})
  .then(() => {
    console.log('Created an index on the sender field.')
  })
  .catch(err => console.log(err))