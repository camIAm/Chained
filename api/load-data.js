require('dotenv').config()
const PouchDB = require('pouchdb')
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

console.log("loading data to :", process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

const users = []

const tx = []

db
  .bulkDocs(users)
  .then(res => console.log("Successfully loaded users data!"))
  .catch("An error has occurred will loading data");

db
  .bulkDocs(tx)
  .then(res => console.log("Successfully loaded TX data!"))
  .catch("An error has occurred will loading data")