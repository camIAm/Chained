const express = require('express')
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const app = express()
const applyRoutes = require('./app')

const port = process.env.PORT || 4000

applyRoutes(app)

if (process.env.NODE_ENV !== 'test') {
  console.log('not testing')
  app.listen(port, () => console.log(`App listening on port: ${port}`))
}

module.exports = app